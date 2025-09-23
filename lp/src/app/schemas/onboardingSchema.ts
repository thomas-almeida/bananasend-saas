import { z } from "zod";

export const onboardingSchema = z.object({
  id: z.string(),
  age: z.number().min(16, "Idade mínima 16 anos"),
  occupation: z.string().min(2, "Digite sua profissão"),
  linkedinUrl: z.string().optional(),
  workspace: z.string().min(2, "Selecione o workspace"),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;