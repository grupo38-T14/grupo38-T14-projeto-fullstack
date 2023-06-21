import { z } from "zod";

export const RecoverySchema = z.object({
  email: z
    .string()
    .nonempty("E-mail é obrigatório")
    .email("Deve ser um e-mail válido"),
});

export type RecoveryPasswordData = z.infer<typeof RecoverySchema>;
