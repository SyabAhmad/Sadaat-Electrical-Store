import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1).max(200),
  price: z.number().positive(),
  category: z.string().min(1).max(100),
  mainImage: z.string().url().optional().nullable(),
  thumbnails: z.array(z.string().url()).optional().default([]),
  description: z.string().max(5000).optional().default(''),
});

export const updateProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200).optional(),
  price: z.number().positive().optional(),
  category: z.string().min(1).max(100).optional(),
  mainImage: z.string().url().optional().nullable(),
  thumbnails: z.array(z.string().url()).optional(),
  description: z.string().max(5000).optional(),
});

export const createCategorySchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  icon: z.string().optional().nullable(),
});

export const updateCategorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100).optional(),
  slug: z.string().min(1).max(100).optional(),
  icon: z.string().optional().nullable(),
});