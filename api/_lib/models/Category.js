import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: String,
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
