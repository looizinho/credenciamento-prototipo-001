import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  const features = [
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Criação de Eventos Simplificada",
      description: "Adicione nome, data, local e descrição com um editor de texto rico. Tudo em uma única tela.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Gestão de Participantes",
      description: "Controle o número máximo de inscritos e visualize a lista de participantes com facilidade.",
    },
    {
      icon: <MapPin className="h-10 w-10 text-primary" />,
      title: "Dashboard Centralizado",
      description: "Tenha uma visão geral dos seus eventos, total de participantes e próximas datas importantes.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center text-center bg-secondary">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover opacity-20"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="container px-4 md:px-6 z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary-foreground drop-shadow-md">
              Credenciamento rápido, do jeito certo.
            </h1>
            <p className="mt-4 text-lg md:text-xl text-primary-foreground/90 drop-shadow">
              Crie eventos, gerencie inscrições e organize tudo em minutos.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/auth">Começar agora</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Como funciona</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Nosso sistema foi projetado para ser intuitivo e poderoso. Siga estes três passos simples para começar.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
            <div className="grid gap-1 text-center">
              <h3 className="text-lg font-bold">1. Crie sua Conta</h3>
              <p className="text-sm text-muted-foreground">
                Cadastre-se gratuitamente para ter acesso a todas as nossas ferramentas de organização de eventos.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <h3 className="text-lg font-bold">2. Publique seu Evento</h3>
              <p className="text-sm text-muted-foreground">
                Preencha os detalhes do seu evento, como data, local e descrição, e publique para o mundo.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <h3 className="text-lg font-bold">3. Gerencie Participantes</h3>
              <p className="text-sm text-muted-foreground">
                Acompanhe as inscrições em tempo real e prepare-se para um evento de sucesso.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="recursos" className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Recursos Poderosos</h2>
                <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Tudo que você precisa para gerenciar seus eventos com eficiência.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader className="flex flex-row items-center gap-4">
                            {feature.icon}
                            <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{feature.description}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
