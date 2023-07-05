import { z } from "zod";

export const registerDataSchema = z.object({
	name: z.string().max(127).nonempty("Nome é obrigatório"),
	email: z
		.string()
		.max(127)
		.nonempty("Email é obrigatório")
		.email("Deve ser um e-mail válido"),
	cpf: z
		.string()
		.nonempty("CPF é obrigatório")
		.min(14, "verifique se preencheu corretamente o cpf"),
	phone: z
		.string()
		.nonempty("Celular é obrigatório")
		.min(15, "verifique se preencheu corretamente o celular"),
	birth: z.string().nullable(),
	description: z.string().max(255).optional(),
	account_type: z.boolean(),
	password: z.string().max(127).nonempty("Senha é obrigatória"),
	avatar_url: z.string().optional(),
	reset_token: z.string().nullish(),
});

export const registerSchema = registerDataSchema
	.omit({
		account_type: true,
	})
	.extend({
		account_type: z.string().nonempty("Escolha um opção"),
		confirmPassword: z
			.string()
			.max(127)
			.nonempty("A confirmação de senha é obrigatória"),
		cep: z.string().max(127).nonempty("CEP é obrigatório"),
		state: z.string(),
		city: z.string(),
		street: z.string(),
		number: z
			.string()
			.max(127)
			.nonempty("Número é obrigatório")
			.regex(new RegExp("^[0-9]+$"), "Digite somente números"),
		complement: z.string().max(127).optional(),
	})
	.refine((data) => (data.password === data.confirmPassword ? true : false), {
		message: "As senhas devem ser iguais",
		path: ["confirmPassword"],
	});

export const registerUserAddressSchema = registerDataSchema.extend({
	address: z.object({
		cep: z.string().max(127).nonempty("CEP é obrigatório"),
		state: z.string(),
		city: z.string(),
		street: z.string(),
		number: z.string().max(127).nonempty("Número é obrigatório"),
		complement: z.string().max(127).optional(),
	}),
});

export type RegisterData = z.infer<typeof registerSchema>;
export type CreateRegisterData = z.infer<typeof registerUserAddressSchema>;
