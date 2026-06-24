import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoDark from "@/assets/aura-logo-dark.png.asset.json";
import logoLight from "@/assets/aura-logo-light.png.asset.json";

const products = [
  { slug: "aristoteles", name: "Aristoteles", tag: "Raciocínio & Decisão" },
  { slug: "herodotus", name: "Herodotus", tag: "História & Geopolítica" },
  { slug: "pythagoras", name: "Pythagoras", tag: "Matemática & Análise" },
  { slug: "archimedes", name: "Archimedes", tag: "Engenharia & Sistemas" },
];

const solutions: { title: string; items: string; to?: string }[] = [
  { title: "Midas", items: "Marketing · Vendas · Customer Success", to: "/solucoes/midas" },
  { title: "Engenharia", items: "Gestão de projetos · CADs" },
  { title: "Backoffice", items: "Contabilidade · RH · Financeiro" },
  { title: "Atendimento", items: "Atendimento ao cliente" },
  { title: "Muse", items: "Produção Criativa · Conteúdo · Design" },
  { title: "Desenvolvimento e Tecnologia", items: "Programação · Segurança · Redes" },
];

function useDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const u = () => setDark(document.documentElement.classList.contains("dark"));
    u();
    const o = new MutationObserver(u);
    o.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => o.disconnect();
  }, []);
  return dark;
}

export function SiteHeader() {
  const dark = useDark();
  const [productsOpen, setProductsOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setProductsOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={wrapRef}>
      <header className="fixed inset-x-0 top-0 z-50 glass-nav">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={dark ? logoLight.url : logoDark.url} alt="Aura" className="h-10 w-auto sm:h-12" />
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <Link to="/" hash="sobre" className="transition hover:text-foreground">Sobre</Link>
            <Link to="/" hash="principios" className="transition hover:text-foreground">Princípios</Link>
            <Link to="/" hash="rigs" className="transition hover:text-foreground">RIGS</Link>
            <button
              onClick={() => setProductsOpen((o) => !o)}
              className="inline-flex items-center gap-1 transition hover:text-foreground"
            >
              Produtos <ChevronDown className={`h-3.5 w-3.5 transition ${productsOpen ? "rotate-180" : ""}`} />
            </button>
            <Link to="/" hash="atuacao" className="transition hover:text-foreground">Atuação</Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/entrar"
              className="hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:inline-flex"
            >
              Entrar
            </Link>
          </div>
        </div>
      </header>

      {productsOpen && (
        <div className="glass-nav fixed inset-x-0 top-20 z-40 shadow-xl">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-10 sm:grid-cols-2">
            <div>
              <p className="px-2 pb-3 text-[10px] uppercase tracking-widest text-muted-foreground">Modelos</p>
              <div className="grid grid-cols-2 gap-1">
                {products.map((p) => (
                  <Link
                    key={p.slug}
                    to="/modelos/$slug"
                    params={{ slug: p.slug }}
                    onClick={() => setProductsOpen(false)}
                    className="flex flex-col rounded-lg px-3 py-2 text-left transition hover:bg-accent"
                  >
                    <span className="font-heading text-sm font-medium text-foreground">{p.name}</span>
                    <span className="text-xs text-muted-foreground">{p.tag}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="px-2 pb-3 text-[10px] uppercase tracking-widest text-muted-foreground">Soluções</p>
              <div className="grid grid-cols-2 gap-1">
                {solutions.map((s) =>
                  s.to ? (
                    <Link key={s.title} to={s.to} onClick={() => setProductsOpen(false)} className="rounded-lg px-3 py-2 text-left transition hover:bg-accent">
                      <p className="font-heading text-sm font-medium text-foreground">{s.title}</p>
                      <p className="text-xs text-muted-foreground">{s.items}</p>
                    </Link>
                  ) : (
                    <div key={s.title} className="rounded-lg px-3 py-2 text-left transition hover:bg-accent">
                      <p className="font-heading text-sm font-medium text-foreground">{s.title}</p>
                      <p className="text-xs text-muted-foreground">{s.items}</p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
