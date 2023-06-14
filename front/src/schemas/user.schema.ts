import { z } from "zod";

export const schemaAddress = z.object({});

export const schemaUser = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  cpf: z.string(),
  phone: z.string(),
  birth: z.date(),
  description: z.string(),
  account_type: z.boolean(),
  avatar_url: z.string().optional(),
  is_active: z.boolean().default(true),
  password: z.string(),
  created_at: z.date(),
  address: schemaAddress || null,
});

export const retrieveUserSchema = schemaUser.omit({ password: true });
export type retrieveUser = z.infer<typeof retrieveUserSchema>;
