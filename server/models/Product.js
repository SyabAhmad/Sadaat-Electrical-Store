import mongoose from 'mongoose';

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

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  mainImage: String,
  thumbnails: [String],
  description: String,
}, { timestamps: true });

productSchema.pre('save', function (next) {
  if (!this.slug) this.slug = slugify(this.name);
  next();
});

productSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.name && !update.slug) {
    update.slug = slugify(update.name);
  }
  next();
});

productSchema.index({ category: 1 });
productSchema.index({ createdAt: -1 });

export default mongoose.model('Product', productSchema);
