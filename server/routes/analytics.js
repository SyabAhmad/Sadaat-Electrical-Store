import { Router } from 'express';
import Analytics from '../models/Analytics.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { trackEventSchema } from '../validators/analytics.js';

const router = Router();

// Batch analytics buffer
let analyticsBuffer = [];
let bufferTimer = null;

const flushAnalytics = async () => {
  const batch = analyticsBuffer.splice(0);
  if (batch.length === 0) return;
  try {
    await Analytics.insertMany(batch);
  } catch (err) {
    console.error('Analytics batch insert error:', err.message);
  }
};

const scheduleFlush = () => {
  if (bufferTimer) return;
  bufferTimer = setTimeout(() => {
    bufferTimer = null;
    flushAnalytics();
  }, 5000);
};

// POST /api/analytics — public (fire-and-forget, batched)
router.post('/', validate(trackEventSchema), async (req, res, next) => {
  try {
    analyticsBuffer.push(req.body);
    if (analyticsBuffer.length >= 50) {
      flushAnalytics();
    } else {
      scheduleFlush();
    }
    res.json({ ok: true });
  } catch (err) { next(err); }
});

// GET /api/analytics — public stats or admin events
router.get('/', async (req, res, next) => {
  try {
    const { days, admin } = req.query;
    const dayLimit = parseInt(days) || 0;
    let dateFilter = {};
    if (dayLimit > 0) {
      const since = new Date();
      since.setDate(since.getDate() - dayLimit);
      dateFilter = { createdAt: { $gte: since } };
    }

    // Admin: /api/analytics?admin=true - returns raw events
    if (admin === 'true') {
      const authed = authenticate(req, res);
      if (!authed) return;
      const events = await Analytics.find(dateFilter).sort({ createdAt: -1 }).limit(500).lean();
      return res.json(events);
    }

    // Stats: /api/analytics?days=N — aggregated via MongoDB pipeline
    const matchStage = {
      $match: {
        eventType: { $in: ['product_view', 'add_to_cart', 'page_view', 'checkout'] },
        ...dateFilter,
      },
    };

    // Daily aggregation
    const dailyPipeline = [
      matchStage,
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          pageViews: { $sum: { $cond: [{ $eq: ['$eventType', 'page_view'] }, 1, 0] } },
          productViews: { $sum: { $cond: [{ $eq: ['$eventType', 'product_view'] }, 1, 0] } },
          addToCart: { $sum: { $cond: [{ $eq: ['$eventType', 'add_to_cart'] }, 1, 0] } },
          checkouts: { $sum: { $cond: [{ $eq: ['$eventType', 'checkout'] }, 1, 0] } },
        },
      },
      { $sort: { _id: 1 } },
    ];

    // Product stats aggregation
    const productStatsPipeline = [
      {
        $match: {
          eventType: { $in: ['product_view', 'add_to_cart'] },
          'eventData.productId': { $exists: true },
          ...dateFilter,
        },
      },
      {
        $group: {
          _id: '$eventData.productId',
          productName: { $first: '$eventData.productName' },
          views: { $sum: { $cond: [{ $eq: ['$eventType', 'product_view'] }, 1, 0] } },
          cartAdds: { $sum: { $cond: [{ $eq: ['$eventType', 'add_to_cart'] }, 1, 0] } },
        },
      },
    ];

    const [dailyResult, productStatsResult] = await Promise.all([
      Analytics.aggregate(dailyPipeline),
      Analytics.aggregate(productStatsPipeline),
    ]);

    const daily = {};
    dailyResult.forEach(d => {
      daily[d._id] = {
        pageViews: d.pageViews,
        productViews: d.productViews,
        addToCart: d.addToCart,
        checkouts: d.checkouts,
      };
    });

    const productStats = {};
    productStatsResult.forEach(p => {
      productStats[p._id] = {
        views: p.views,
        cartAdds: p.cartAdds,
        productName: p.productName || '',
      };
    });

    res.json({ productStats, daily });
  } catch (err) { next(err); }
});

export default router;
