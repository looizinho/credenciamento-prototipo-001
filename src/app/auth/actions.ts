'use server';

import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { dbConnect } from '@/lib/mongo';
import User from '@/models/User';
import { registerSchema } from '@/lib/validations';

type State = {
  success: boolean;
  error?: string;
};

export async function registerUser(values: z.infer<typeof registerSchema>): Promise<State> {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Dados inválidos.",
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    await dbConnect();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, error: 'Um usuário com este email já existe.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      hashedPassword,
    });

    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: 'Não foi possível criar a conta. Tente novamente.',
    };
  }
}
