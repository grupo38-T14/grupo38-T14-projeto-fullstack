import { z } from "zod";
import { schemaComments } from "./comment.schema";
import { retrieveUserSchema } from "./user.schema";
import { DeepPartial } from "react-hook-form";

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

export const schemaRequestAdvert = z.object({
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
});

export const schemaCreateAdvert = schemaRequestAdvert
	.omit({ year: true, km: true, table_fipe_price: true, price: true })
	.extend({
		year: z.number(),
		km: z.number(),
		table_fipe_price: z.number(),
		price: z.number(),
	});

export const schemaUpdateRequestAdvert = z.object({
	brand: z.string(),
	model: z.string(),
	year: z.string(),
	fuel: z.optional(z.string()),
	km: z.string(),
	color: z.string(),
	table_fipe_price: z.string(),
	price: z.string(),
	description: z.string(),
	is_active: z.string(),
	image_cape: z.string(),
	image_gallery1: z.string().optional(),
	image_gallery2: z.string().optional(),
	image_gallery3: z.string().optional(),
	image_gallery4: z.string().optional(),
});

export const schemaUpdateAdvert = schemaUpdateRequestAdvert
	.omit({
		year: true,
		km: true,
		table_fipe_price: true,
		price: true,
		is_active: true,
	})
	.extend({
		year: z.number(),
		km: z.number(),
		table_fipe_price: z.number(),
		price: z.number(),
		is_active: z.boolean(),
	})
	.partial();

export const schemaAdvertPagination = z.object({
	total: z.number(),
	lastPage: z.number(),
	currentPage: z.number(),
	perPage: z.number(),
	prev: z.number(),
	next: z.number(),
	data: schemaAdvert.array(),
});

export type image = z.infer<typeof schemaGallery>;
export type requestAdvertType = z.infer<typeof schemaRequestAdvert>;
export type createAdvertType = z.infer<typeof schemaCreateAdvert>;
export type requestUpdateAdvertType = z.infer<typeof schemaUpdateRequestAdvert>;
export type requestUpdateAdvertPartialType =
	DeepPartial<requestUpdateAdvertType>;
export type updateAdvertType = z.infer<typeof schemaUpdateAdvert>;
export type retrieveAdvertType = z.infer<typeof schemaAdvert>;
export type retrieveAdvertPaginationType = z.infer<
	typeof schemaAdvertPagination
>;
export type listRetrieveAdvertsType = retrieveAdvertType[];

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
