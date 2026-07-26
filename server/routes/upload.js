import { Router } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { authenticate } from '../middleware/auth.js';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB raw upload
});

router.post('/', authenticate, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file provided' });

    // Compress and resize image
    const compressed = await sharp(req.file.buffer)
      .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 75 })
      .toBuffer();

    const b64 = compressed.toString('base64');
    const dataURI = `data:image/jpeg;base64,${b64}`;

    res.json({ url: dataURI });
  } catch (err) { next(err); }
});

export default router;
