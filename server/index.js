import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productsRouter from './routes/products.js';
import analyticsRouter from './routes/analytics.js';
import authRouter from './routes/auth.js';
import uploadRouter from './routes/upload.js';
import postsRouter from './routes/posts.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const REQUIRED_ENV_VARS = ['MONGODB_URI', 'JWT_SECRET', 'JWT_REFRESH_SECRET'];
const missing = REQUIRED_ENV_VARS.filter(v => !process.env[v]);
if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan('short'));

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts, please try again later' },
});

const analyticsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://sadaat-electrical-store.vercel.app',
    'https://sadaatelectricalstore.com',
  ],
}));
app.use(express.json({ limit: '1mb' }));

// Apply rate limiters
app.use('/api/auth', authLimiter);
app.use('/api/analytics', analyticsLimiter);
app.use('/api', (req, res, next) => {
  if (req.path.startsWith('/auth') || req.path.startsWith('/analytics')) return next();
  apiLimiter(req, res, next);
});

// Routes
app.use('/api/products', productsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/posts', postsRouter);

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

const server = await connectDB().then(() => {
  return app.listen(PORT, () => console.log(`API running on port ${PORT}`));
});

const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    const { default: mongoose } = await import('mongoose');
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Forced shutdown after 10s timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
