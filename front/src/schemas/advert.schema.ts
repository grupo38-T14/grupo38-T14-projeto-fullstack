import { z } from "zod";

const fuelTypes = ["ELECTRIC", "ETHANOL", "HYBRID"] as const;
const FuelEnum = z.enum(fuelTypes);

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

const retrieveUser = schemaUser.omit({ password: true });

export const schemaGallery = z.object({
  id: z.string(),
  image_url: z.string(),
  advertId: z.string(),
});

export const schemaComments = z.object({
  id: z.string(),
  comment: z.string(),
  created_at: z.string(),
  userId: z.string(),
  advertId: z.string(),
});

export const schemaAdvert = z.object({
  id: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.number(),
  fuel: FuelEnum,
  km: z.number(),
  color: z.string(),
  table_fipe_price: z.number(),
  price: z.number(),
  description: z.string(),
  image_cape: z.string(),
  userId: z.string(),
  gallery: z.array(schemaGallery),
  comments: z.array(schemaComments),
  user: retrieveUser,
});

export const schemaCreateAdvert = schemaAdvert.omit({ id: true });
export const schemaUpdateAdvert = schemaAdvert.omit({ id: true }).deepPartial();

export type createAdvertType = z.infer<typeof schemaCreateAdvert>;
export type retrieveAdvertType = z.infer<typeof schemaAdvert>;
export type listRetrieveAdvertsType = retrieveAdvertType[];
export type updateAdvertType = z.infer<typeof schemaUpdateAdvert>;
