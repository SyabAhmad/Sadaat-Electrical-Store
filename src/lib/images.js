const CLOUDINARY_REGEX = /^https?:\/\/res\.cloudinary\.com\/.+\/image\/upload\//;

export function optimizeImageUrl(url, options = {}) {
  if (!url || !CLOUDINARY_REGEX.test(url)) return url;

  const { width, quality = 'auto', format = 'auto' } = options;

  const parts = url.split('/image/upload/');
  if (parts.length !== 2) return url;

  let transforms = [];
  if (format) transforms.push(`f_${format}`);
  if (quality) transforms.push(`q_${quality}`);
  if (width) transforms.push(`w_${width}`);

  return `${parts[0]}/image/upload/${transforms.join(',')}/${parts[1]}`;
}

export function getOptimizedProductImage(url, size = 400) {
  return optimizeImageUrl(url, { width: size, format: 'auto', quality: 'auto' });
}