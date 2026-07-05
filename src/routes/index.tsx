import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft, Instagram } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

import logoLight from "@/assets/aura-logo-light.png.asset.json";
import sloganWhite from "@/assets/slogan-white.png.asset.json";
import gradient1 from "@/assets/aura-gradient-1.png.asset.json";
import gradient2 from "@/assets/aura-gradient-2.png.asset.json";

import heroThinker from "@/assets/hero-thinker.jpg.asset.json";

import mktEdu from "@/assets/market-education.jpg.asset.json";
import mktHealth from "@/assets/market-health.jpg.asset.json";
import mktLaw from "@/assets/market-law.jpg.asset.json";
import mktAcc from "@/assets/market-accounting.jpg.asset.json";
import mktBiz from "@/assets/market-business.jpg.asset.json";

import rigsResearch from "@/assets/rigs-research-v2.png.asset.json";
import rigsIndustry from "@/assets/rigs-industry-v2.png.asset.json";
import rigsGovernment from "@/assets/rigs-government-v2.png.asset.json";
import rigsSociety from "@/assets/rigs-society-v2.png.asset.json";

const PHOTO = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aura — Inteligência para o Desenvolvimento Humano" },
      { name: "description", content: "A Aura desenvolve tecnologias avançadas e sistemas inteligentes orientados ao desenvolvimento humano." },
      { property: "og:title", content: "Aura — Inteligência para o Desenvolvimento Humano" },
      { property: "og:description", content: "Tecnologias responsáveis, acessíveis e centradas na experiência humana." },
    ],
  }),
  component: Home,
});

const principles = [
  { title: "Desenvolvimento Humano em Primeiro Lugar", text: "A tecnologia é um meio, não um fim. Toda inovação deve ser avaliada pela sua capacidade de melhorar a vida das pessoas.", image: PHOTO("photo-1529156069898-49953e39b3ac") },
  { title: "Excelência como Compromisso", text: "Buscamos os mais altos padrões de qualidade técnica, rigor intelectual e responsabilidade.", image: PHOTO("photo-1519681393784-d120267933ba") },
  { title: "Inovação Responsável", text: "Tecnologias transformadoras desenvolvidas com responsabilidade — considerando impactos sociais, econômicos e éticos.", image: PHOTO("photo-1451187580459-43490279c0fa") },
  { title: "Transparência e Integridade", text: "Construímos relações baseadas em confiança, clareza e responsabilidade.", image: PHOTO("photo-1507525428034-b723cf961d3e") },
  { title: "Sustentabilidade", text: "Equilíbrio entre crescimento econômico, preservação ambiental e prosperidade social.", image: PHOTO("photo-1470071459604-3b5ec3a7fe05") },
];

const rigs = [
  { slug: "research", title: "Research", subtitle: "Para Universidades", image: rigsResearch.url, text: "A produção de conhecimento científico, tecnológico e intelectual." },
  { slug: "industry", title: "Industry", subtitle: "Para Empresas", image: rigsIndustry.url, text: "A transformação do conhecimento em soluções, produtos e desenvolvimento econômico." },
  { slug: "government", title: "Government", subtitle: "Para Governos", image: rigsGovernment.url, text: "A coordenação institucional para estabilidade e capacidades nacionais." },
  { slug: "society", title: "Society", subtitle: "Para Pessoas", image: rigsSociety.url, text: "Indivíduos, comunidades e organizações que orientam valores, prioridades e necessidades." },
];

const markets = [
  { slug: "educacao", title: "Educação", subtitle: "Aprendizado personalizado em escala", image: mktEdu.url },
  { slug: "saude", title: "Saúde", subtitle: "Cuidado ampliado por inteligência", image: mktHealth.url },
  { slug: "direito", title: "Direito", subtitle: "Análise jurídica assistida", image: mktLaw.url },
  { slug: "contabilidade", title: "Contabilidade", subtitle: "Precisão e conformidade automatizadas", image: mktAcc.url },
  { slug: "negocios", title: "Negócios", subtitle: "Decisão executiva orientada a dados", image: mktBiz.url },
];

const products = [
  { slug: "vector", name: "Vector" },
  { slug: "axis", name: "Axis" },
  { slug: "pulse", name: "Pulse" },
  { slug: "genius", name: "Genius" },
  { slug: "codex", name: "Codex" },
];

const missionVision = [
  { label: "Nossa Missão", text: "Desenvolver tecnologias e sistemas inteligentes que ampliem as capacidades humanas e promovam prosperidade sustentável.", bg: gradient1.url },
  { label: "Nossa Visão", text: "Construir um futuro em que conhecimento, tecnologia e instituições atuem em harmonia para promover o florescimento humano.", bg: gradient2.url },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-xs uppercase tracking-widest text-muted-foreground">{children}</span>;
}

function MissionVisionRotator() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % missionVision.length), 10000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative mx-auto mt-16 max-w-3xl">
      <div className="relative h-[300px] sm:h-[260px]">
        {missionVision.map((item, i) => (
          <div
            key={item.label}
            className={`absolute inset-0 overflow-hidden rounded-3xl p-10 text-center transition-opacity duration-1000 sm:p-14 ${i === idx ? "opacity-100" : "pointer-events-none opacity-0"}`}
            style={{ backgroundImage: `url(${item.bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 bg-background/10" />
            <div className="relative flex h-full flex-col items-center justify-center">
              <span className="text-xs uppercase tracking-widest text-neutral-900/70">{item.label}</span>
              <p className="mx-auto mt-4 max-w-2xl font-display text-lg leading-snug text-neutral-900 sm:text-xl">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {missionVision.map((m, i) => (
          <button key={m.label} onClick={() => setIdx(i)} aria-label={m.label} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-foreground" : "w-3 bg-muted-foreground/40"}`} />
        ))}
      </div>
    </div>
  );
}

function MarketsCarousel() {
  const [idx, setIdx] = useState(0);
  const total = markets.length;
  const prev = () => setIdx((p) => (p - 1 + total) % total);
  const next = () => setIdx((p) => (p + 1) % total);

  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % total), 10000);
    return () => clearInterval(id);
  }, [total]);

  return (
    <div>
      <div className="mb-8 flex items-center justify-end gap-2">
        <button onClick={prev} aria-label="Anterior" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card transition hover:bg-accent">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button onClick={next} aria-label="Próximo" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card transition hover:bg-accent">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div className="relative overflow-hidden rounded-3xl">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {markets.map((m) => (
            <Link
              key={m.slug}
              to="/mercados/$slug"
              params={{ slug: m.slug }}
              className="group relative flex aspect-[21/9] w-full shrink-0 flex-col justify-end overflow-hidden border border-border"
            >
              <img src={m.image} alt={m.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />
              <div className="relative p-10 text-white sm:p-14">
                <h3 className="font-heading text-4xl font-medium sm:text-5xl">{m.title}</h3>
                <p className="mt-2 max-w-xl text-base text-white/85 sm:text-lg">{m.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {markets.map((m, i) => (
          <button key={m.slug} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-foreground" : "w-3 bg-muted-foreground/40"}`} />
        ))}
      </div>
    </div>
  );
}

function PrinciplesAccordion() {
  const [active, setActive] = useState(0);
  // Text renders only once the card has finished expanding (delay = duration).
  const [textVisible, setTextVisible] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setTextVisible(active), 700);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="flex h-[460px] w-full gap-3 sm:h-[520px]">
      {principles.map((p, i) => {
        const isActive = i === active;
        const showText = isActive && textVisible === i;
        return (
          <button
            key={p.title}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`group relative overflow-hidden rounded-3xl border border-border text-left transition-all duration-700 ease-out ${isActive ? "flex-[5]" : "flex-[1]"}`}
            style={{ minWidth: 0 }}
          >
            <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className={`absolute inset-0 ${isActive ? "bg-gradient-to-t from-black/95 via-black/55 to-black/15" : "bg-black/70"}`} />
            <div className="relative flex h-full flex-col justify-between p-5 sm:p-7">
              <span className="font-heading text-3xl font-light text-white/90 sm:text-4xl">{String(i + 1).padStart(2, "0")}</span>
              {showText && (
                <div>
                  <h3 className="font-heading text-xl font-medium text-white sm:text-2xl">{p.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">{p.text}</p>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

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

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section id="top" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div
          className="absolute inset-0 -z-10 opacity-40 dark:opacity-50"
          style={{
            backgroundImage: `url(${heroThinker.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: "radial-gradient(ellipse at center, black 45%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 45%, transparent 85%)",
          }}
        />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="font-heading text-balance text-4xl font-medium leading-[1.1] sm:text-5xl md:text-6xl">
            Inteligência para o Desenvolvimento Humano
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
            A Aura é uma organização dedicada ao desenvolvimento de tecnologias avançadas, sistemas inteligentes e soluções de alto impacto orientadas para o desenvolvimento humano.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#sobre" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">
              Conheça a Aura <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#rigs" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium text-foreground transition hover:bg-surface">
              Framework RIGS
            </a>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="mx-auto max-w-4xl px-6 py-24 text-center">
        <SectionLabel>Sobre</SectionLabel>
        <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">Tecnologia centrada nas pessoas.</h2>
        <div className="mx-auto mt-10 space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>Nossa atuação está fundamentada na criação de tecnologias responsáveis, acessíveis, sustentáveis e centradas na experiência humana.</p>
          <p>Defendemos uma visão em que inovação e responsabilidade caminham juntas, em que o desenvolvimento tecnológico é avaliado pelos benefícios que gera.</p>
          <p className="text-foreground">Mais do que acompanhar o futuro, buscamos ajudar a construí-lo de forma consciente e orientada ao desenvolvimento humano.</p>
        </div>
        <MissionVisionRotator />
      </section>

      {/* Princípios */}
      <section id="principios" className="border-t border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <SectionLabel>Princípios</SectionLabel>
            <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">Cinco princípios que orientam tudo o que construímos.</h2>
          </div>
          <PrinciplesAccordion />
        </div>
      </section>

      {/* Filosofia */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <SectionLabel>Filosofia</SectionLabel>
        <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">Conhecimento é infraestrutura.</h2>
        <div className="mx-auto mt-10 space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>Ao longo da história, os maiores avanços ocorreram quando ciência, tecnologia, instituições e pessoas atuaram de forma coordenada em torno de objetivos comuns.</p>
          <p className="text-foreground">Não buscamos automatizar a humanidade. Buscamos potencializá-la.</p>
        </div>
      </section>

      {/* RIGS */}
      <section id="rigs" className="border-y border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <SectionLabel>Framework</SectionLabel>
            <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">O Framework RIGS</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">Uma visão sistêmica do desenvolvimento baseada em quatro domínios fundamentais.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rigs.map((r) => (
              <Link
                key={r.slug}
                to="/rigs/$slug"
                params={{ slug: r.slug }}
                className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-3xl border border-border"
              >
                <img src={r.image} alt={r.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />
                <div className="relative flex flex-col gap-2 p-6 text-white">
                  <h3 className="font-heading text-2xl font-medium sm:text-3xl">{r.title}</h3>
                  <p className="text-sm font-medium text-white/85">{r.subtitle}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">{r.text}</p>
                </div>
                <span className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-neutral-900 shadow-lg transition group-hover:scale-110">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mercados */}
      <section id="atuacao" className="border-t border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <SectionLabel>Atuação</SectionLabel>
            <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">Potencializando mercados inteiros</h2>
          </div>
          <MarketsCarousel />
        </div>
      </section>

      {/* Propósito */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <SectionLabel>Propósito</SectionLabel>
            <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">Por que existimos.</h2>
            <p className="mt-6 text-lg text-muted-foreground">Uma organização dedicada ao desenvolvimento humano.</p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              A humanidade enfrenta desafios cada vez mais complexos. Saúde, educação, sustentabilidade, governança, energia, segurança e desenvolvimento econômico exigem novas formas de pensar e agir.
            </p>
          </div>
          <div>
            <ul className="divide-y divide-border border-y border-border">
              {[
                "Desenvolver tecnologias que ampliem capacidades.",
                "Transformar conhecimento em ação.",
                "Conectar pesquisa, indústria, governo e sociedade.",
                "Contribuir com um futuro mais inteligente e humano.",
              ].map((item, i) => (
                <li key={item} className="flex items-baseline gap-5 py-5">
                  <span className="font-heading text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/manifesto" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">
                Ler nosso Manifesto <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}
