import { Router } from 'express';
import Post from '../models/Post.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// GET /api/posts — public (supports ?slug= for single post, ?admin=true for admin)
router.get('/', async (req, res, next) => {
  try {
    const { slug, admin } = req.query;

    // Single post by slug
    if (slug) {
      const post = await Post.findOne({ slug, published: true });
      if (!post) return res.status(404).json({ error: 'Post not found' });
      return res.json(post);
    }

    // Admin: all posts
    if (admin === 'true') {
      const user = authenticate(req, res);
      if (!user) return res.status(401).json({ error: 'Unauthorized' });
      const posts = await Post.find().sort({ createdAt: -1 });
      return res.json(posts);
    }

    // Default: published posts list
    const posts = await Post.find({ published: true }).select('-content').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) { next(err); }
});

// POST /api/posts — admin (create post)
router.post('/', authenticate, async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) { next(err); }
});

// PUT /api/posts — admin (update post)
router.put('/', authenticate, async (req, res, next) => {
  try {
    const { id, ...data } = req.body;
    const post = await Post.findByIdAndUpdate(id, data, { new: true });
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (err) { next(err); }
});

// DELETE /api/posts — admin (delete post)
router.delete('/', authenticate, async (req, res, next) => {
  try {
    const { id } = req.body;
    await Post.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) { next(err); }
});

export default router;
