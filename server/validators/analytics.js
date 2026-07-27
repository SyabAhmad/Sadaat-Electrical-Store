import { z } from 'zod';

const allowedEventTypes = ['product_view', 'add_to_cart', 'page_view', 'checkout', 'search'];

export const trackEventSchema = z.object({
  eventType: z.enum(allowedEventTypes),
  eventData: z.record(z.unknown()).optional().default({}),
  userAgent: z.string().optional().nullable(),
  referrer: z.string().optional().nullable(),
});