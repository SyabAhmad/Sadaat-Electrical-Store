import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

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

await mongoose.connect(process.env.MONGODB_URI);

const products = await Product.find({ slug: { $exists: false } });
console.log(`Found ${products.length} products without slugs`);

for (const product of products) {
  product.slug = slugify(product.name);
  await product.save();
  console.log(`  ${product.name} → ${product.slug}`);
}

await mongoose.disconnect();
console.log('Done');
