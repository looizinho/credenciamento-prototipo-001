import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { dbConnect } from '@/lib/mongo';
import Event from '@/models/Event';
import EventDetailsClient from './EventDetailsClient';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

async function getEvent(eventId: string, userId: string) {
  await dbConnect();
  try {
    const event = await Event.findById(eventId).lean();
    if (!event) return { notFound: true };

    if (event.ownerId.toString() !== userId) {
      return { unauthorized: true };
    }
    
    return { event: JSON.parse(JSON.stringify(event)) };
  } catch (error) {
    // Invalid ObjectId format
    return { notFound: true };
  }
}

export default async function EventPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect('/auth');
  }

  const { event, notFound, unauthorized } = await getEvent(params.id, session.user.id);
  
  if (notFound) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-2xl font-bold">Evento não encontrado</h1>
        <p className="text-muted-foreground">O evento que você está procurando não existe.</p>
        <Link href="/dashboard" className="text-primary hover:underline mt-4 inline-block">Voltar para o Dashboard</Link>
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="container py-24">
        <Alert variant="destructive" className="max-w-xl mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Acesso Negado</AlertTitle>
          <AlertDescription>
            Você não tem permissão para ver este evento.
            <Link href="/dashboard" className="font-bold hover:underline ml-2">Voltar para o Dashboard</Link>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (event) {
    const eventWithDate = {
        ...event,
        date: new Date(event.date),
    }

    return <EventDetailsClient event={{...eventWithDate, id: event._id}} />;
  }

  return null; // Should not be reached
}
