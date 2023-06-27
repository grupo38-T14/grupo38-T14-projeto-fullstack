import { z } from "zod";

export const schemaComments = z.object({
  id: z.string(),
  comment: z.string(),
  created_at: z.string(),
  userId: z.string(),
  advertId: z.string(),
});


export type comment = z.infer<typeof schemaComments>