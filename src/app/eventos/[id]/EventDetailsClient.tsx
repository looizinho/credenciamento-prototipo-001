'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventForm from '../EventForm';
import { FileText, Users, Edit, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { deleteEvent } from '../actions';

type EventData = {
  id: string;
  name: string;
  date: Date;
  location: string;
  maxParticipants: number;
  descriptionHtml?: string;
};

type EventDetailsClientProps = {
  event: EventData;
};

export default function EventDetailsClient({ event }: EventDetailsClientProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, startDeleteTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = () => {
    startDeleteTransition(async () => {
      const result = await deleteEvent(event.id);
      if (result.success) {
        toast({
          title: 'Evento Excluído',
          description: `O evento "${event.name}" foi excluído com sucesso.`,
        });
        router.push('/dashboard');
        router.refresh();
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro ao excluir',
          description: result.error,
        });
        setIsDeleteDialogOpen(false);
      }
    });
  };

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        {isEditing ? (
          <Card>
            <CardHeader>
              <CardTitle>Editando: {event.name}</CardTitle>
              <CardDescription>
                Faça as alterações necessárias e salve para atualizar o evento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EventForm event={event} />
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="details" className="w-full">
            <div className="flex items-center justify-between mb-4">
                <TabsList>
                    <TabsTrigger value="details">
                        <FileText className="mr-2 h-4 w-4" /> Detalhes
                    </TabsTrigger>
                    <TabsTrigger value="participants">
                        <Users className="mr-2 h-4 w-4" /> Participantes
                    </TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" /> Editar
                    </Button>
                    <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Deletar
                    </Button>
                </div>
            </div>
            
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>{event.name}</CardTitle>
                  <CardDescription>
                    {new Date(event.date).toLocaleDateString('pt-BR', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Local</h3>
                    <p className="text-muted-foreground">{event.location}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Máximo de Participantes</h3>
                    <p className="text-muted-foreground">{event.maxParticipants > 0 ? event.maxParticipants : 'Ilimitado'}</p>
                  </div>
                  {event.descriptionHtml && (
                    <div>
                      <h3 className="font-semibold">Descrição</h3>
                      <div
                        className="prose prose-sm dark:prose-invert max-w-none mt-2"
                        dangerouslySetInnerHTML={{ __html: event.descriptionHtml }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="participants">
              <Card>
                <CardHeader>
                  <CardTitle>Participantes</CardTitle>
                  <CardDescription>
                    Lista de pessoas inscritas no evento.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Funcionalidade em desenvolvimento.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o evento "{event.name}" e todos os seus dados associados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Excluindo...' : 'Sim, excluir evento'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
