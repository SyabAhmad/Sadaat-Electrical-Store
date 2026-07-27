import { Router } from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  createProductSchema,
  updateProductSchema,
  createCategorySchema,
  updateCategorySchema,
} from '../validators/product.js';
import cache from '../config/cache.js';

const router = Router();

const CACHE_TTL = 60;
const CACHE_PREFIX = 'products:';

function getCacheKey(query) {
  const { id, slug, categories, page, limit, category, search, sort } = query;
  return `${CACHE_PREFIX}${JSON.stringify({ id, slug, categories, page, limit, category, search, sort })}`;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// GET /api/products — public (supports ?id=, ?categories=true, ?page=, ?limit=, ?category=, ?search=, ?sort=)
router.get('/', async (req, res, next) => {
  try {
    const { id, slug, categories, admin, page, limit, category, search, sort } = req.query;

    // Categories
    if (categories === 'true') {
      const cacheKey = `${CACHE_PREFIX}categories`;
      const cached = cache.get(cacheKey);
      if (cached) return res.json(cached);

      const cats = await Category.find().sort({ createdAt: 1 }).lean();
      cache.set(cacheKey, cats, CACHE_TTL);
      return res.json(cats);
    }

    // Single product by id or slug
    if (id || slug) {
      const product = id
        ? await Product.findById(id).lean()
        : await Product.findOne({ slug }).lean();
      if (!product) return res.status(404).json({ error: 'Not found' });
      return res.json(product);
    }

    // Admin: paginated products
    if (admin === 'true') {
      const authed = authenticate(req, res);
      if (!authed) return;

      const pageNum = Math.max(1, parseInt(page) || 1);
      const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 50));
      const skip = (pageNum - 1) * limitNum;

      const [products, total] = await Promise.all([
        Product.find().sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
        Product.countDocuments(),
      ]);

      return res.json({ products, total, page: pageNum, totalPages: Math.ceil(total / limitNum), limit: limitNum });
    }

    // Check cache for public product lists
    const cacheKey = getCacheKey({ page, limit, category, search, sort });
    const cached = cache.get(cacheKey);
    if (cached) {
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
      return res.json(cached);
    }

    // Paginated products
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 12));
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter = {};
    if (category && category !== 'all') filter.category = category;
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort
    let sortOption = { createdAt: -1 };
    if (sort === 'price-low') sortOption = { price: 1 };
    else if (sort === 'price-high') sortOption = { price: -1 };

    const [products, total] = await Promise.all([
      Product.find(filter)
        .select('name slug price mainImage thumbnails category')
        .sort(sortOption).skip(skip).limit(limitNum).lean(),
      Product.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    const result = { products, total, page: pageNum, totalPages, limit: limitNum };
    cache.set(cacheKey, result, CACHE_TTL);

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    res.json(result);
  } catch (err) { next(err); }
});

// POST /api/products — admin (supports ?categories=true for categories)
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { categories } = req.query;

    if (categories === 'true') {
      validate(createCategorySchema)(req, res, () => {});
      if (res.headersSent) return;
      const category = await Category.create(req.body);
      cache.del(`${CACHE_PREFIX}categories`);
      return res.status(201).json(category);
    }

    validate(createProductSchema)(req, res, () => {});
    if (res.headersSent) return;
    const product = await Product.create(req.body);
    cache.flushAll();
    res.status(201).json(product);
  } catch (err) { next(err); }
});

// PUT /api/products — admin
router.put('/', authenticate, async (req, res, next) => {
  try {
    const { id, categories } = { ...req.body, ...req.query };

    if (categories === 'true') {
      validate(updateCategorySchema)(req, res, () => {});
      if (res.headersSent) return;
      const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
      if (!category) return res.status(404).json({ error: 'Not found' });
      cache.del(`${CACHE_PREFIX}categories`);
      return res.json(category);
    }

    validate(updateProductSchema)(req, res, () => {});
    if (res.headersSent) return;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Not found' });
    cache.flushAll();
    res.json(product);
  } catch (err) { next(err); }
});

// DELETE /api/products — admin
router.delete('/', authenticate, async (req, res, next) => {
  try {
    const { categories } = req.query;
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'id required' });

    if (categories === 'true') {
      await Category.findByIdAndDelete(id);
      cache.del(`${CACHE_PREFIX}categories`);
      return res.json({ success: true });
    }

    await Product.findByIdAndDelete(id);
    cache.flushAll();
    res.json({ success: true });
  } catch (err) { next(err); }
});

export default router;
