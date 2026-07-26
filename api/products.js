import connectDB from './_lib/db.js';
import { verifyToken } from './_lib/auth.js';
import Product from './_lib/models/Product.js';
import Category from './_lib/models/Category.js';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    + '-' + Date.now().toString(36);
}

// In-memory cache for product count (resets on cold start, which is fine for Vercel)
let productCountCache = { count: null, timestamp: 0 };
const CACHE_TTL = 60 * 1000; // 1 minute

async function getProductCount() {
  const now = Date.now();
  if (productCountCache.count !== null && now - productCountCache.timestamp < CACHE_TTL) {
    return productCountCache.count;
  }
  const count = await Product.countDocuments();
  productCountCache = { count, timestamp: now };
  return count;
}

export default async function handler(req, res) {
  try {
    await connectDB();

    // Admin: GET /api/products?admin=true - all products
    if (req.method === 'GET' && req.query?.admin === 'true') {
      const user = verifyToken(req);
      if (!user) return res.status(401).json({ error: 'Unauthorized' });
      const products = await Product.find().sort({ createdAt: -1 });
      return res.json({ products, total: products.length });
    }

    // Public: GET /api/products?id=xxx or ?slug=xxx - single product
    if (req.method === 'GET' && (req.query?.id || req.query?.slug)) {
      const product = req.query.id
        ? await Product.findById(req.query.id)
        : await Product.findOne({ slug: req.query.slug });
      if (!product) return res.status(404).json({ error: 'Not found' });
      res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=600');
      return res.json(product);
    }

    // Public: GET /api/products?page=1&limit=12&category=lighting&search=gold&sort=latest
    if (req.method === 'GET' && !req.query?.categories) {
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 12));
      const skip = (page - 1) * limit;
      const { category, search, sort } = req.query;

      // Build filter
      const filter = {};
      if (category && category !== 'all') filter.category = category;
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      // Build sort
      let sortOption = { createdAt: -1 };
      if (sort === 'price-low') sortOption = { price: 1 };
      else if (sort === 'price-high') sortOption = { price: -1 };

      const [products, total] = await Promise.all([
        Product.find(filter).sort(sortOption).skip(skip).limit(limit),
        Product.countDocuments(filter),
      ]);

      for (const product of products) {
        if (!product.slug) {
          product.slug = slugify(product.name);
          await product.save();
        }
      }

      const totalPages = Math.ceil(total / limit);

      // Cache control headers
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

      return res.json({ products, total, page, totalPages, limit });
    }

    // Public: GET /api/products?categories=true - all categories
    if (req.method === 'GET' && req.query?.categories === 'true') {
      const categories = await Category.find().sort({ createdAt: 1 });
      res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
      return res.json(categories);
    }

    // Admin: POST /api/products?backfill-slugs=true - assign slugs to products missing them
    if (req.method === 'POST' && req.query?.['backfill-slugs'] === 'true') {
      const user = verifyToken(req);
      if (!user) return res.status(401).json({ error: 'Unauthorized' });
      const products = await Product.find({ $or: [{ slug: { $exists: false } }, { slug: null }] });
      let count = 0;
      for (const product of products) {
        product.slug = slugify(product.name);
        await product.save();
        count++;
      }
      return res.json({ success: true, updated: count });
    }

    // Admin operations
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    if (req.method === 'POST' && !req.query?.categories) {
      const product = await Product.create(req.body);
      productCountCache.count = null; // Invalidate cache
      return res.status(201).json(product);
    }

    if (req.method === 'POST' && req.query?.categories === 'true') {
      const category = await Category.create(req.body);
      return res.status(201).json(category);
    }

    if (req.method === 'PUT' && !req.query?.categories) {
      const { id, ...data } = req.body;
      const product = await Product.findByIdAndUpdate(id, data, { new: true });
      if (!product) return res.status(404).json({ error: 'Not found' });
      return res.json(product);
    }

    if (req.method === 'PUT' && req.query?.categories === 'true') {
      const { id, ...data } = req.body;
      const category = await Category.findByIdAndUpdate(id, data, { new: true });
      if (!category) return res.status(404).json({ error: 'Not found' });
      return res.json(category);
    }

    if (req.method === 'DELETE' && !req.query?.categories) {
      await Product.findByIdAndDelete(req.body.id);
      productCountCache.count = null; // Invalidate cache
      return res.json({ success: true });
    }

    if (req.method === 'DELETE' && req.query?.categories === 'true') {
      await Category.findByIdAndDelete(req.body.id);
      return res.json({ success: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
