import connectDB from '../_lib/db.js';
import Post from '../_lib/models/Post.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    const { slug } = req.query;
    const post = await Post.findOne({ slug, published: true });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    return res.json(post);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
