import connectDB from './_lib/db.js';
import { verifyToken } from './_lib/auth.js';
import Analytics from './_lib/models/Analytics.js';

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === 'POST') {
      await Analytics.create(req.body);
      return res.json({ ok: true });
    }

    if (req.method === 'GET') {
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
        const user = verifyToken(req);
        if (!user) return res.status(401).json({ error: 'Unauthorized' });

        const events = await Analytics.find(dateFilter).sort({ createdAt: -1 }).limit(500);
        return res.json(events);
      }

      // Stats: aggregated data (used by fetchProductStats — /api/analytics?days=N)
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

      return res.json({ productStats, daily: dailyMap });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}