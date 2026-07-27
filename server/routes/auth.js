import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { loginSchema, refreshSchema } from '../validators/auth.js';

const router = Router();

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken };
};

// POST /api/auth - handles login, refresh, logout
router.post('/', async (req, res, next) => {
  try {
    const { logout } = req.body;

    // Logout
    if (logout) {
      return res.json({ ok: true });
    }

    // Login
    if (req.body.email && req.body.password) {
      validate(loginSchema)(req, res, () => {});
      if (res.headersSent) return;
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      if (user.isLocked()) {
        const minutes = Math.ceil((user.lockUntil - Date.now()) / 60000);
        return res.status(429).json({ error: `Account locked. Try again in ${minutes} minute(s).` });
      }
      if (!(await bcrypt.compare(password, user.password))) {
        await user.incrementLoginAttempts();
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      await user.resetLoginAttempts();
      const tokens = generateTokens(user);
      return res.json({ ...tokens, user: { id: user._id, email: user.email, role: user.role } });
    }

    // Refresh
    if (req.body.refreshToken) {
      validate(refreshSchema)(req, res, () => {});
      if (res.headersSent) return;
      const { refreshToken } = req.body;
      try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(401).json({ error: 'User not found' });

        const tokens = generateTokens(user);
        return res.json(tokens);
      } catch {
        return res.status(401).json({ error: 'Invalid refresh token' });
      }
    }

    return res.status(400).json({ error: 'Invalid auth request' });
  } catch (err) { next(err); }
});

// GET /api/auth - get current user
router.get('/', authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  } catch (err) { next(err); }
});

// Keep backward-compatible routes
router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (user.isLocked()) {
      const minutes = Math.ceil((user.lockUntil - Date.now()) / 60000);
      return res.status(429).json({ error: `Account locked. Try again in ${minutes} minute(s).` });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      await user.incrementLoginAttempts();
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    await user.resetLoginAttempts();
    const tokens = generateTokens(user);
    res.json({ ...tokens, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) { next(err); }
});

router.post('/refresh', validate(refreshSchema), async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ error: 'User not found' });
    res.json(generateTokens(user));
  } catch {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

router.post('/logout', (req, res) => {
  res.json({ ok: true });
});

router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  } catch (err) { next(err); }
});

export default router;
