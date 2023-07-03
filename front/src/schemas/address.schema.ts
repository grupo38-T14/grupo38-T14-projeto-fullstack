import { z } from "zod";

export const schemaAddress = z.object({
  id: z.string(),
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string(),
  created_at: z.date(),
  userId: z.string(),
});

export const editAddressSchema = z.object({
  cep: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
})

export type retrieveAddressType = z.infer<typeof schemaAddress>;
export type EditAddressType = z.infer<typeof editAddressSchema>;
