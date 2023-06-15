import { z } from "zod";

export const registerDataSchema = z.object({
	name: z.string().max(127).nonempty("Nome é obrigatório"),
	email: z
		.string()
		.max(127)
		.nonempty("Email é obrigatório")
		.email("Deve ser um e-mail válido"),
	cpf: z.string().nonempty("CPF é obrigatório"),
	phone: z.string().nonempty("Celular é obrigatório"),
	birth: z.string().optional(),
	description: z.string().max(255).optional(),
	account_type: z.boolean(),
	password: z.string().max(127).nonempty("Senha é obrigatória"),
	avatar_url: z.string().optional(),
	cep: z.string().max(127).nonempty("CEP é obrigatório"),
	state: z.string().max(127).nonempty("Estado é obrigatório"),
	city: z.string().max(127).nonempty("Cidade é obrigatória"),
	street: z.string().max(127).nonempty("Rua é obrigatória"),
	number: z.string().max(127).nonempty("Número é obrigatório"),
	complement: z.string().max(127).optional(),
});

export const registerSchema = registerDataSchema
	.omit({
		account_type: true,
	})
	.extend({
		account_type: z.string().nonempty("Escolha um opção"),
		confirmPassword: z.string().max(127),
	})
	.refine((data) => (data.password === data.confirmPassword ? true : false), {
		message: "As senhas devem ser iguais",
		path: ["confirmPassword"],
	});

export type RegisterData = z.infer<typeof registerSchema>;
export type CreateRegisterData = z.infer<typeof registerDataSchema>;
