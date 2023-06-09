import { z } from "zod";
import { retrieveUser } from "./user.schema";
import { schemaComments } from "./comment.schema";

const fuelTypes = ["ELECTRIC", "ETHANOL", "HYBRID"] as const;
const FuelEnum = z.enum(fuelTypes);

export const schemaGallery = z.object({
  id: z.string(),
  image_url: z.string(),
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

export const schemaAdvertPagination = z.object({
  total: z.number(),
  lastPage: z.number(),
  currentPage: z.number(),
  perPage: z.number(),
  prev: z.number(),
  next: z.number(),
  data: schemaAdvert.array(),
});

export type createAdvertType = z.infer<typeof schemaCreateAdvert>;
export type retrieveAdvertType = z.infer<typeof schemaAdvert>;
export type retrieveAdvertPaginationType = z.infer<typeof schemaAdvertPagination>;
export type listRetrieveAdvertsType = retrieveAdvertType[];
export type updateAdvertType = z.infer<typeof schemaUpdateAdvert>;
