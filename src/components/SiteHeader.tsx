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
  { title: "Hefesto", items: "Engenharia · Gestão de projetos · CADs" },
  { title: "Atlas", items: "Contabilidade · RH · Financeiro" },
  { title: "Atendimento", items: "Atendimento ao cliente" },
  { title: "Muse", items: "Produção Criativa · Conteúdo · Design" },
  { title: "Dev & Tech", items: "Programação · Segurança · Redes" },
];

const rigsSections = [
  { slug: "research", title: "Research", tag: "Para Universidades" },
  { slug: "industry", title: "Industry", tag: "Para Empresas" },
  { slug: "government", title: "Government", tag: "Para Governos" },
  { slug: "society", title: "Society", tag: "Para Pessoas" },
];

const marketSections = [
  { slug: "educacao", title: "Educação", tag: "Aprendizado em escala" },
  { slug: "saude", title: "Saúde", tag: "Cuidado ampliado" },
  { slug: "direito", title: "Direito", tag: "Análise jurídica" },
  { slug: "contabilidade", title: "Contabilidade", tag: "Precisão e conformidade" },
  { slug: "negocios", title: "Negócios", tag: "Decisão executiva" },
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

type MenuKey = "produtos" | "rigs" | "atuacao" | null;

export function SiteHeader() {
  const dark = useDark();
  const [open, setOpen] = useState<MenuKey>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const openMenu = (k: MenuKey) => {
    cancelClose();
    setOpen(k);
  };

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const navLink = "transition text-foreground/70 hover:text-foreground";

  return (
    <div ref={wrapRef} onMouseLeave={scheduleClose}>
      <header className="fixed inset-x-0 top-0 z-50 glass-nav">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={dark ? logoLight.url : logoDark.url} alt="Aura" className="h-10 w-auto sm:h-12" />
          </Link>
          <nav className="hidden items-center gap-8 text-sm md:flex">
            <Link to="/" hash="sobre" onMouseEnter={() => openMenu(null)} className={navLink}>Sobre</Link>
            <Link to="/" hash="principios" onMouseEnter={() => openMenu(null)} className={navLink}>Princípios</Link>
            <button
              onMouseEnter={() => openMenu("rigs")}
              onClick={() => setOpen(open === "rigs" ? null : "rigs")}
              className={`inline-flex items-center gap-1 ${navLink}`}
            >
              RIGS <ChevronDown className={`h-3.5 w-3.5 transition ${open === "rigs" ? "rotate-180" : ""}`} />
            </button>
            <button
              onMouseEnter={() => openMenu("produtos")}
              onClick={() => setOpen(open === "produtos" ? null : "produtos")}
              className={`inline-flex items-center gap-1 ${navLink}`}
            >
              Produtos <ChevronDown className={`h-3.5 w-3.5 transition ${open === "produtos" ? "rotate-180" : ""}`} />
            </button>
            <button
              onMouseEnter={() => openMenu("atuacao")}
              onClick={() => setOpen(open === "atuacao" ? null : "atuacao")}
              className={`inline-flex items-center gap-1 ${navLink}`}
            >
              Atuação <ChevronDown className={`h-3.5 w-3.5 transition ${open === "atuacao" ? "rotate-180" : ""}`} />
            </button>
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

      {open && (
        <div
          className="glass-nav fixed inset-x-0 top-20 z-40 text-foreground shadow-xl"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="mx-auto max-w-7xl px-6 py-10">
            {open === "produtos" && (
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                <div>
                  <p className="px-2 pb-3 text-[10px] uppercase tracking-widest text-foreground/60">Modelos</p>
                  <div className="grid grid-cols-2 gap-1">
                    {products.map((p) => (
                      <Link
                        key={p.slug}
                        to="/modelos/$slug"
                        params={{ slug: p.slug }}
                        onClick={() => setOpen(null)}
                        className="flex flex-col rounded-lg px-3 py-2 text-left transition hover:bg-foreground/10"
                      >
                        <span className="font-heading text-sm font-medium">{p.name}</span>
                        <span className="text-xs text-foreground/60">{p.tag}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="px-2 pb-3 text-[10px] uppercase tracking-widest text-foreground/60">Soluções</p>
                  <div className="grid grid-cols-2 gap-1">
                    {solutions.map((s) =>
                      s.to ? (
                        <Link key={s.title} to={s.to} onClick={() => setOpen(null)} className="rounded-lg px-3 py-2 text-left transition hover:bg-foreground/10">
                          <p className="font-heading text-sm font-medium">{s.title}</p>
                          <p className="text-xs text-foreground/60">{s.items}</p>
                        </Link>
                      ) : (
                        <div key={s.title} className="rounded-lg px-3 py-2 text-left transition hover:bg-foreground/10">
                          <p className="font-heading text-sm font-medium">{s.title}</p>
                          <p className="text-xs text-foreground/60">{s.items}</p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            )}

            {open === "rigs" && (
              <div>
                <p className="px-2 pb-3 text-[10px] uppercase tracking-widest text-foreground/60">Framework RIGS</p>
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
                  {rigsSections.map((r) => (
                    <Link
                      key={r.slug}
                      to="/rigs/$slug"
                      params={{ slug: r.slug }}
                      onClick={() => setOpen(null)}
                      className="flex flex-col rounded-lg px-3 py-2 text-left transition hover:bg-foreground/10"
                    >
                      <span className="font-heading text-sm font-medium">{r.title}</span>
                      <span className="text-xs text-foreground/60">{r.tag}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {open === "atuacao" && (
              <div>
                <p className="px-2 pb-3 text-[10px] uppercase tracking-widest text-foreground/60">Mercados de Atuação</p>
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-5">
                  {marketSections.map((m) => (
                    <Link
                      key={m.slug}
                      to="/mercados/$slug"
                      params={{ slug: m.slug }}
                      onClick={() => setOpen(null)}
                      className="flex flex-col rounded-lg px-3 py-2 text-left transition hover:bg-foreground/10"
                    >
                      <span className="font-heading text-sm font-medium">{m.title}</span>
                      <span className="text-xs text-foreground/60">{m.tag}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
