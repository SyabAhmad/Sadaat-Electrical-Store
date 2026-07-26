import { trackEvent, fetchProductStats } from './api';

export { trackEvent, fetchProductStats };

export const trackPageView = (page) => trackEvent('page_view', { page });
export const trackProductView = (productId, productName) =>
  trackEvent('product_view', { productId, productName });
export const trackAddToCart = (productId, productName, quantity) =>
  trackEvent('add_to_cart', { productId, productName, quantity });
export const trackRemoveFromCart = (productId, productName) =>
  trackEvent('remove_from_cart', { productId, productName });
export const trackCheckout = (total, itemCount) =>
  trackEvent('checkout', { total, itemCount });
