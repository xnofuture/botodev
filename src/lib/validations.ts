import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email обязателен')
    .email('Неверный формат email'),
  password: z
    .string()
    .min(1, 'Пароль обязателен')
    .min(6, 'Пароль должен содержать минимум 6 символов'),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Имя обязательно')
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов'),
  email: z
    .string()
    .min(1, 'Email обязателен')
    .email('Неверный формат email'),
  password: z
    .string()
    .min(1, 'Пароль обязателен')
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Пароль должен содержать минимум одну строчную, одну заглавную букву и цифру'
    ),
});

export const consultationSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа'),
  email: z
    .string()
    .email('Неверный формат email')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .min(5, 'Телефон должен содержать минимум 5 символов'),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z
    .string()
    .min(10, 'Сообщение должно содержать минимум 10 символов'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ConsultationFormData = z.infer<typeof consultationSchema>;