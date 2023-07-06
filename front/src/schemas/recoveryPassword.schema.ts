import { z } from "zod";

export const RecoverySchema = z.object({
  email: z
    .string()
    .nonempty("E-mail é obrigatório")
    .email("Deve ser um e-mail válido"),
});
export const CreateNewPasswordSchema = z
  .object({
    password: z.string(),
    confirm: z.string().min(1, "A confirmação de senha é obrigatória"),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "As senhas devem ser iguais",
    path: ["confirm"],
  });

export type RecoveryPasswordData = z.infer<typeof RecoverySchema>;
export type CreateNewPasswordData = z.infer<typeof CreateNewPasswordSchema>;
