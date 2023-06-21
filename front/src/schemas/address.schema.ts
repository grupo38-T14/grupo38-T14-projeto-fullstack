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

export const editAddressSchema = schemaAddress
  .omit({
    id: true,
    created_at: true,
  })
  .partial();

export type retrieveAddressType = z.infer<typeof schemaAddress>;
export type editAddressType = z.infer<typeof editAddressSchema>;
