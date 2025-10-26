'use server';

import { z } from 'zod';
import { dbConnect } from '@/lib/mongo';
import ContactMessage from '@/models/ContactMessage';
import { contactSchema } from '@/lib/validations';

type State = {
  success: boolean;
  error?: string;
}

export async function submitContactForm(values: z.infer<typeof contactSchema>): Promise<State> {
  const validatedFields = contactSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Dados inválidos. Por favor, verifique os campos.',
    };
  }

  try {
    await dbConnect();
    await ContactMessage.create(validatedFields.data);
    return { success: true };
  } catch (error) {
    console.error('Failed to save contact message:', error);
    return {
      success: false,
      error: 'Ocorreu um erro no servidor. Tente novamente mais tarde.',
    };
  }
}
