import { Router } from 'express';
import Analytics from '../models/Analytics.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// POST /api/analytics — public (fire-and-forget)
router.post('/', async (req, res, next) => {
  try {
    await Analytics.create(req.body);
    res.json({ ok: true });
  } catch (err) { next(err); }
});

// GET /api/analytics — public stats, admin events, or recent events
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
      const user = authenticate(req, res);
      if (!user) return res.status(401).json({ error: 'Unauthorized' });
      const events = await Analytics.find(dateFilter).sort({ createdAt: -1 }).limit(500);
      return res.json(events);
    }

    // Stats: /api/analytics?days=N - aggregated data
    const events = await Analytics.find({
      eventType: { $in: ['product_view', 'add_to_cart', 'page_view', 'checkout'] },
      ...dateFilter,
    }).sort({ createdAt: 1 });

    const productStats = {};
    const dailyMap = {};

    events.forEach(e => {
      const pid = e.eventData?.productId;
      const day = new Date(e.createdAt).toISOString().split('T')[0];

      if (!dailyMap[day]) dailyMap[day] = { pageViews: 0, productViews: 0, addToCart: 0, checkouts: 0 };
      if (e.eventType === 'page_view') dailyMap[day].pageViews++;
      else if (e.eventType === 'product_view') dailyMap[day].productViews++;
      else if (e.eventType === 'add_to_cart') dailyMap[day].addToCart++;
      else if (e.eventType === 'checkout') dailyMap[day].checkouts++;

      if (!pid) return;
      if (!productStats[pid]) productStats[pid] = { views: 0, cartAdds: 0, productName: e.eventData?.productName || '' };
      if (e.eventType === 'product_view') productStats[pid].views += 1;
      if (e.eventType === 'add_to_cart') productStats[pid].cartAdds += 1;
    });

    res.json({ productStats, daily: dailyMap });
  } catch (err) { next(err); }
});

export default router;
