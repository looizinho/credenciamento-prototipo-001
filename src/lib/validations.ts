import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres." }).max(120, { message: "O nome não pode ter mais de 120 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  message: z.string().min(10, { message: "A mensagem deve ter pelo menos 10 caracteres." }),
});

export const registerSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Email inválido." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

export const eventSchema = z.object({
  name: z.string().min(3, { message: "O nome do evento deve ter pelo menos 3 caracteres." }).max(120, { message: "O nome do evento não pode ter mais de 120 caracteres." }),
  date: z.date({
    required_error: "A data do evento é obrigatória.",
  }).refine((date) => date > new Date(), {
    message: "A data do evento deve ser no futuro.",
  }),
  location: z.string().min(3, { message: "O local deve ter pelo menos 3 caracteres." }).max(140, { message: "O local não pode ter mais de 140 caracteres." }),
  maxParticipants: z.coerce.number().int().min(0, { message: "A quantidade de participantes não pode ser negativa." }).default(0),
  descriptionHtml: z.string().optional(),
});
