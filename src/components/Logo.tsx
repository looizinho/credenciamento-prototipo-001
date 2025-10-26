import Link from 'next/link';
import { Ticket } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Voltar para a página inicial">
      <Ticket className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold tracking-tight text-foreground">
        EventMaster
      </span>
    </Link>
  );
}
