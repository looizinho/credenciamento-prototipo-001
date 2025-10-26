'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Users, BarChart, ArrowRight, Info } from 'lucide-react';
import type { IEvent, DashboardMetrics } from './types';

type DashboardClientProps = {
  events: IEvent[];
  metrics: DashboardMetrics;
};

const MetricCard = ({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

export default function DashboardClient({ events, metrics }: DashboardClientProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Total de Eventos" value={metrics.totalEvents} icon={<BarChart className="h-4 w-4 text-muted-foreground" />} />
        <MetricCard title="Total de Participantes" value={metrics.totalParticipants} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
        <MetricCard title="Próximos Eventos" value={metrics.upcomingEvents} icon={<Calendar className="h-4 w-4 text-muted-foreground" />} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome do Evento</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Local</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => {
                    const eventDate = new Date(event.date);
                    const isPast = eventDate < new Date();
                    return (
                      <TableRow key={event._id}>
                        <TableCell className="font-medium">{event.name}</TableCell>
                        <TableCell>{format(eventDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={isPast ? 'secondary' : 'default'}>
                            {isPast ? 'Realizado' : 'Próximo'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/eventos/${event._id}`}>
                              Ver detalhes <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <Info className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-xl font-semibold">Nenhum evento criado</h3>
                <p className="text-muted-foreground">Você ainda não criou nenhum evento.</p>
                <Button asChild className="mt-4">
                    <Link href="/eventos/novo">Criar meu primeiro evento</Link>
                </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
