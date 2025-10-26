import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { dbConnect } from '@/lib/mongo';
import Event from '@/models/Event';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import DashboardClient from './DashboardClient';
import type { IEvent } from './types';

async function getEvents(userId: string) {
  await dbConnect();
  const events = await Event.find({ ownerId: userId }).sort({ date: -1 }).lean();
  
  // Serialize data to pass from Server to Client component
  return JSON.parse(JSON.stringify(events)) as IEvent[];
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect('/auth');
  }

  const events = await getEvents(session.user.id);
  
  const totalEvents = events.length;
  const totalParticipants = events.reduce((acc, event) => acc + (event.maxParticipants || 0), 0);
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).length;

  const metrics = {
    totalEvents,
    totalParticipants,
    upcomingEvents,
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Seus eventos</h1>
        <Button asChild>
          <Link href="/eventos/novo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Evento
          </Link>
        </Button>
      </div>
      <DashboardClient events={events} metrics={metrics} />
    </div>
  );
}
