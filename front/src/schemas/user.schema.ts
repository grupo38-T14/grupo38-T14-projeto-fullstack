import { z } from "zod";
import { schemaAddress } from "./address.schema";

export const schemaUser = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  cpf: z.string(),
  phone: z.string(),
  birth: z.string(),
  description: z.string(),
  account_type: z.boolean(),
  avatar_url: z.string().optional(),
  is_active: z.boolean().default(true),
  password: z.string(),
  created_at: z.date(),
  address: schemaAddress || null,
});

export const retrieveUserSchema = schemaUser.omit({ password: true });
export const editUserSchema = retrieveUserSchema.omit({
  id: true,
  account_type: true,
  avatar_url: true,
  password: true,
  created_at: true,
  address: true,
});
export type retrieveUser = z.infer<typeof retrieveUserSchema>;
export type editUserType = z.infer<typeof editUserSchema>;
