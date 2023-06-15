import { z } from "zod";
import { schemaComments } from "./comment.schema";
import { retrieveUserSchema } from "./user.schema";

const fuelTypes = ["ELECTRIC", "ETHANOL", "HYBRID"] as const;
const FuelEnum = z.enum(fuelTypes, {
	errorMap: (issue, ctx) => ({ message: "o campo Combustível é obrigatório" }),
});

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
	user: retrieveUserSchema,
	is_active: z.boolean(),
});

const brand = z.string().refine((str) => str == "Selecione a Marca", {
	message: "Marca é obrigatória",
});

export const schemaCreateAdvert = z.object({
  brand: z.string().nonempty("o campo Marca é obrigatório"),
  model: z.string().nonempty("o campo Modelo é obrigatório"),
  year: z.string(),
  fuel: z.optional(z.string()),
  km: z.string().nonempty("o campo Quilometragem é obrigatório"),
  color: z.string().nonempty("o campo Cor é obrigatório"),
  table_fipe_price: z.string(),
  price: z.string().nonempty("o campo Preço é obrigatório"),
  description: z.string(),
  image_cape: z.string().nonempty("o campo Imagem de Capa é obrigatório"),
  image_gallery1: z.string().optional(),
  image_gallery2: z.string().optional(),
  image_gallery3: z.string().optional(),
  image_gallery4: z.string().optional(),
})

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
export type retrieveAdvertPaginationType = z.infer<
	typeof schemaAdvertPagination
>;
export type listRetrieveAdvertsType = retrieveAdvertType[];
export type updateAdvertType = z.infer<typeof schemaUpdateAdvert>;

export interface IPageProps {
	current: number;
	last: number;
	next: number;
	prev: number;
	filter?: string;
	filterName?: string | number;
	filterMin?: string;
	filterMax?: string;
	filterValueMin?: number;
	filterValueMax?: number;
}
