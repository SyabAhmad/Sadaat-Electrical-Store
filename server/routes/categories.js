import { Router } from 'express';
import Category from '../models/Category.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });
    res.json(categories);
  } catch (err) { next(err); }
});

export default router;
