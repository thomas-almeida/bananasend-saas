import { z } from "zod";

export const onboardingSchema = z.object({
  id: z.string(),
  age: z.number().min(16, "Idade mínima 16 anos"),
  occupation: z.string().min(2, "Digite sua profissão"),
  mail: z
    .email("Digite um email válido")
    .refine((val) => val.endsWith('@bananasend.top'), {
      message: 'Seu email deve terminar com @bananasend.top',
    }),
  linkedinUrl: z.string()
    .refine((val) => val.startsWith('https://www.linkedin.com/in/'), {
      message: 'Insira um link valido',
    }),
  workspace: z.string().min(2, "Selecione o workspace"),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;