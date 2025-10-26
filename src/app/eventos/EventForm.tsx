'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { eventSchema } from '@/lib/validations';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createEvent, updateEvent } from './actions';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';

type EventFormValues = z.infer<typeof eventSchema>;

type EventFormProps = {
  event?: EventFormValues & { id: string };
};

export default function EventForm({ event }: EventFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isEditMode = !!event;

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: isEditMode
      ? { ...event, date: new Date(event.date) }
      : {
          name: '',
          location: '',
          maxParticipants: 0,
          descriptionHtml: '',
        },
  });

  function onSubmit(data: EventFormValues) {
    startTransition(async () => {
      const action = isEditMode
        ? updateEvent.bind(null, event.id, data)
        : createEvent.bind(null, data);
      
      const result = await action();

      if (result.success) {
        toast({
          title: `Evento ${isEditMode ? 'Atualizado' : 'Criado'}!`,
          description: `O evento "${data.name}" foi ${isEditMode ? 'atualizado' : 'salvo'} com sucesso.`,
        });
        router.push('/dashboard');
        router.refresh();
      } else {
        toast({
          variant: 'destructive',
          title: `Erro ao ${isEditMode ? 'atualizar' : 'criar'} evento`,
          description: result.error,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Evento</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Conferência Anual de Tecnologia" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel>Data do Evento</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                        >
                        {field.value ? (
                            format(field.value, "PPP", { locale: ptBR })
                        ) : (
                            <span>Escolha uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date <= new Date()}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Local</FormLabel>
                <FormControl>
                    <Input placeholder="Ex: São Paulo, SP" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <FormField
            control={form.control}
            name="maxParticipants"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Quantidade de Participantes</FormLabel>
                <FormControl>
                    <Input type="number" min="0" {...field} />
                </FormControl>
                <FormDescription>
                    Deixe 0 para ilimitado.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />

        <FormField
          control={form.control}
          name="descriptionHtml"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva seu evento, incluindo programação, palestrantes, etc."
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Este campo suporta texto rico. No futuro, será um editor completo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
                {isPending ? (isEditMode ? 'Atualizando...' : 'Salvando...') : (isEditMode ? 'Atualizar Evento' : 'Salvar Evento')}
            </Button>
        </div>
      </form>
    </Form>
  );
}
