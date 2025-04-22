import { z } from "zod";

export const postCreateSchema = z.object({
  title: z.string().min(3, "Title too short"),
  content: z.string().min(10, "Content too short"),
});

export const postUpdateSchema = z.object({
  id: z.coerce.number(),
  title: z.string().min(3, "Title too short").max(100),
  content: z.string().min(10, "Content too short").max(5000),
});

export const postDeleteSchema = z.object({
  id: z.coerce.number(),
});

export const toggleBookmarkSchema = z.object({
  postId: z.coerce.number(),
});

export const postQuerySchema = z.object({
  query: z.string().min(2, "Query must be at least 2 characters"),
});
