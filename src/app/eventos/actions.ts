'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { dbConnect } from '@/lib/mongo';
import Event from '@/models/Event';
import { eventSchema } from '@/lib/validations';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

type State = {
  success: boolean;
  error?: string;
}

const window = new JSDOM('').window;
const purify = DOMPurify(window);

async function checkAuth() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }
    return session.user.id;
}

export async function createEvent(values: z.infer<typeof eventSchema>): Promise<State> {
  try {
    const ownerId = await checkAuth();
    
    const validatedFields = eventSchema.safeParse(values);
    if (!validatedFields.success) {
      return { success: false, error: 'Dados inválidos.' };
    }
    
    const { descriptionHtml, ...rest } = validatedFields.data;
    const sanitizedDescription = descriptionHtml ? purify.sanitize(descriptionHtml) : '';

    await dbConnect();
    await Event.create({ 
        ...rest, 
        descriptionHtml: sanitizedDescription,
        ownerId 
    });

    revalidatePath('/dashboard');
    return { success: true };

  } catch (error: any) {
    return { success: false, error: error.message === 'Unauthorized' ? 'Acesso negado.' : 'Falha ao criar evento.' };
  }
}


export async function updateEvent(eventId: string, values: z.infer<typeof eventSchema>): Promise<State> {
  try {
    const ownerId = await checkAuth();
    
    const validatedFields = eventSchema.safeParse(values);
    if (!validatedFields.success) {
      return { success: false, error: 'Dados inválidos.' };
    }

    const { descriptionHtml, ...rest } = validatedFields.data;
    const sanitizedDescription = descriptionHtml ? purify.sanitize(descriptionHtml) : '';

    await dbConnect();
    const event = await Event.findById(eventId);
    if (!event || event.ownerId.toString() !== ownerId) {
        return { success: false, error: 'Evento não encontrado ou acesso negado.' };
    }

    await Event.updateOne({ _id: eventId }, {
        ...rest,
        descriptionHtml: sanitizedDescription,
    });
    
    revalidatePath('/dashboard');
    revalidatePath(`/eventos/${eventId}`);
    return { success: true };

  } catch (error: any) {
    return { success: false, error: 'Falha ao atualizar evento.' };
  }
}

export async function deleteEvent(eventId: string): Promise<State> {
    try {
      const ownerId = await checkAuth();
      
      await dbConnect();
      const event = await Event.findById(eventId);
      if (!event || event.ownerId.toString() !== ownerId) {
          return { success: false, error: 'Evento não encontrado ou acesso negado.' };
      }
  
      await Event.deleteOne({ _id: eventId });
      
      revalidatePath('/dashboard');
      return { success: true };
  
    } catch (error: any) {
      return { success: false, error: 'Falha ao excluir evento.' };
    }
}
