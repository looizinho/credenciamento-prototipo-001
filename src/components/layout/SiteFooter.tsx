import Link from "next/link";
import Logo from "../Logo";

export default function SiteFooter() {
  return (
    <footer className="w-full border-t bg-card">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} EventMaster. Todos os direitos reservados.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/#recursos" className="transition-colors hover:text-foreground">Recursos</Link>
            <Link href="/contato" className="transition-colors hover:text-foreground">Contato</Link>
        </div>
      </div>
    </footer>
  );
}
