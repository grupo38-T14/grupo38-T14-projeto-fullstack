import { z } from "zod";

export const schemaComments = z.object({
  id: z.string(),
  comment: z.string(),
  created_at: z.string(),
  userId: z.string(),
  advertId: z.string(),
});

export type comment = z.infer<typeof schemaComments>;
export const editCommentSchema = schemaComments.omit({
  id: true,
  created_at: true,
  userId: true,
  advertId: true,
});
export type editCommentType = z.infer<typeof editCommentSchema>;
