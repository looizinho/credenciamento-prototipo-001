import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Fale com a gente</CardTitle>
            <CardDescription>
              Tem alguma dúvida ou sugestão? Preencha o formulário abaixo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
