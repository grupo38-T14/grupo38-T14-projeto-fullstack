import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.nonempty("E-mail é obrigatório")
		.email("Deve ser um e-mail válido"),
	password: z.string().nonempty("Senha é obrigatória"),
});

export type LoginData = z.infer<typeof loginSchema>;
