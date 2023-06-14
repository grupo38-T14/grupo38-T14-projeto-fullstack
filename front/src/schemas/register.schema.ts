import { z } from "zod";

export const registerSchema = z
	.object({
		name: z.string().nonempty("Nome é obrigatório"),
		email: z
			.string()
			.nonempty("Email é obrigatório")
			.email("Deve ser um e-mail válido"),
		cpf: z.string().nonempty("CPF é obrigatório"),
		phone: z.string().nonempty("Celular é obrigatório"),
		birth: z.string().optional(),
		description: z.string().optional(),
		account_type: z.string().nonempty("Escolha um opção"),
		password: z.string().nonempty("Senha é obrigatória"),
		confirmPassword: z.string(),
		//avatar_url: z.string().optional(),
		cep: z.string().nonempty("CEP é obrigatório"),
		state: z.string().nonempty("Estado é obrigatório"),
		city: z.string().nonempty("Cidade é obrigatória"),
		street: z.string().nonempty("Rua é obrigatória"),
		number: z.string().nonempty("Número é obrigatório"),
		complement: z.string().optional(),
	})
	.refine((data) => (data.password === data.confirmPassword ? true : false), {
		message: "As senhas devem ser iguais",
		path: ["confirmPassword"],
	});

export type RegisterData = z.infer<typeof registerSchema>;
