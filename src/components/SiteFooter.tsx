import { Instagram } from "lucide-react";
import logoLight from "@/assets/aura-logo-light.png.asset.json";
import sloganWhite from "@/assets/slogan-white.png.asset.json";

const products = [
  { slug: "vector", name: "Vector" },
  { slug: "axis", name: "Axis" },
  { slug: "pulse", name: "Pulse" },
  { slug: "genius", name: "Genius" },
  { slug: "codex", name: "Codex" },
];
const rigs = [
  { slug: "research", title: "Research" },
  { slug: "industry", title: "Industry" },
  { slug: "government", title: "Government" },
  { slug: "society", title: "Society" },
];
const markets = [
  { slug: "educacao", title: "Educação" },
  { slug: "saude", title: "Saúde" },
  { slug: "direito", title: "Direito" },
  { slug: "contabilidade", title: "Contabilidade" },
  { slug: "negocios", title: "Negócios" },
];

type SitemapItem = { label: string; to?: string };
const sitemap: { title: string; items: SitemapItem[] }[] = [
  { title: "Produtos", items: products.map((p) => ({ label: p.name, to: `/produtos/${p.slug}` })) },
  { title: "RIGS", items: rigs.map((r) => ({ label: r.title, to: `/rigs/${r.slug}` })) },
  { title: "Atuação", items: markets.map((m) => ({ label: m.title, to: `/mercados/${m.slug}` })) },
  { title: "Recursos", items: [{ label: "Documentação", to: "/docs/vector" }, { label: "Blog" }, { label: "Tutoriais" }, { label: "Casos de uso" }] },
  { title: "Ajuda e Segurança", items: [{ label: "Central de Ajuda" }, { label: "Segurança" }, { label: "Status" }, { label: "Contato" }] },
  { title: "Sobre a Empresa", items: [{ label: "Sobre" }, { label: "Manifesto", to: "/manifesto" }, { label: "Carreiras", to: "/carreiras" }, { label: "Imprensa" }] },
  { title: "Termos e Políticas", items: [{ label: "Termos de Uso", to: "/termos" }, { label: "Privacidade", to: "/privacidade" }, { label: "Cookies", to: "/cookies" }, { label: "DPA", to: "/dpa" }] },
];

function SocialIcon({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <a href="#" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground">
      {children}
    </a>
  );
}
function XIcon({ className }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.84l-4.84-6.32L5.7 22H2.44l8.02-9.17L1.5 2h7l4.38 5.79L18.24 2zm-2.4 18h1.84L7.27 4H5.34l10.5 16z" /></svg>);
}
function LinkedinFilled({ className }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 11.01-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" /></svg>);
}
function YoutubeFilled({ className }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" /></svg>);
}

export function SiteFooter() {
  return (
    <footer className="dark bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-start gap-8 border-b border-border pb-12 sm:flex-row sm:items-center sm:gap-10">
          <img src={logoLight.url} alt="Aura" className="h-16 w-auto sm:h-20" />
          <div className="hidden h-16 w-px bg-border sm:block" />
          <img src={sloganWhite.url} alt="For humanity, to the stars." className="h-24 w-auto sm:h-32 md:h-40" />
        </div>
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-7">
          {sitemap.map((col) => (
            <div key={col.title}>
              <p className="font-heading text-xs font-semibold uppercase tracking-widest text-foreground">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.to ?? "#"} className="text-sm text-muted-foreground transition hover:text-foreground">
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <SocialIcon label="LinkedIn"><LinkedinFilled className="h-4 w-4" /></SocialIcon>
            <SocialIcon label="YouTube"><YoutubeFilled className="h-4 w-4" /></SocialIcon>
            <SocialIcon label="X"><XIcon className="h-3.5 w-3.5" /></SocialIcon>
            <SocialIcon label="Instagram"><Instagram className="h-4 w-4" /></SocialIcon>
          </div>
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} Aura</span>
        </div>
      </div>
    </footer>
  );
}
