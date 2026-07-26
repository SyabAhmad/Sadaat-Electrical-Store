import { Router } from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { authenticate } from '../middleware/auth.js';

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

const router = Router();

// GET /api/products — public (supports ?id=, ?categories=true, ?page=, ?limit=, ?category=, ?search=, ?sort=)
router.get('/', async (req, res, next) => {
  try {
    const { id, slug, categories, admin, page, limit, category, search, sort } = req.query;

    // Categories
    if (categories === 'true') {
      const cats = await Category.find().sort({ createdAt: 1 });
      return res.json(cats);
    }

    // Single product by id or slug
    if (id || slug) {
      const product = id
        ? await Product.findById(id)
        : await Product.findOne({ slug });
      if (!product) return res.status(404).json({ error: 'Not found' });
      return res.json(product);
    }

    // Admin: all products
    if (admin === 'true') {
      const user = authenticate(req, res);
      if (!user) return res.status(401).json({ error: 'Unauthorized' });
      const products = await Product.find().sort({ createdAt: -1 });
      return res.json({ products, total: products.length });
    }

    // Paginated products
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 12));
    const skip = (pageNum - 1) * limitNum;

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
      Product.find(filter).sort(sortOption).skip(skip).limit(limitNum),
      Product.countDocuments(filter),
    ]);

    // Backfill slugs for old products missing them
    for (const product of products) {
      if (!product.slug) {
        product.slug = slugify(product.name);
        await product.save();
      }
    }

    const totalPages = Math.ceil(total / limitNum);

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    res.json({ products, total, page: pageNum, totalPages, limit: limitNum });
  } catch (err) { next(err); }
});

// POST /api/products — admin (supports ?categories=true for categories)
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { categories } = req.query;

    if (categories === 'true') {
      const category = await Category.create(req.body);
      return res.status(201).json(category);
    }

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) { next(err); }
});

// PUT /api/products — admin
router.put('/', authenticate, async (req, res, next) => {
  try {
    const { id, categories } = { ...req.body, ...req.query };

    if (categories === 'true') {
      const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
      if (!category) return res.status(404).json({ error: 'Not found' });
      return res.json(category);
    }

    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Not found' });
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
      return res.json({ success: true });
    }

    await Product.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) { next(err); }
});

// POST /api/products/backfill-slugs — admin (assign slugs to all products missing them)
router.post('/backfill-slugs', authenticate, async (req, res, next) => {
  try {
    const products = await Product.find({ $or: [{ slug: { $exists: false } }, { slug: null }] });
    let count = 0;
    for (const product of products) {
      product.slug = slugify(product.name);
      await product.save();
      count++;
    }
    res.json({ success: true, updated: count });
  } catch (err) { next(err); }
});

export default router;
