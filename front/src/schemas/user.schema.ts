import { z } from "zod";

export const schemaUser = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  cpf: z.string(),
  phone: z.string(),
  birth: z.date(),
  description: z.string(),
  password: z.string(),
  account_type: z.boolean(),
  created_at: z.date(),
});

export const retrieveUser = schemaUser.omit({ password: true });
