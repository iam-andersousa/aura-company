import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Brain,
  Database,
  Workflow,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Zap,
  Shield,
  Landmark,
  Instagram,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SiteHeader } from "@/components/SiteHeader";

import logoDark from "@/assets/aura-logo-dark.png.asset.json";
import logoLight from "@/assets/aura-logo-light.png.asset.json";

import sloganWhite from "@/assets/slogan-white.png.asset.json";
import gradient1 from "@/assets/aura-gradient-1.png.asset.json";
import gradient2 from "@/assets/aura-gradient-2.png.asset.json";

import heroBg from "@/assets/hero-bg.jpg";
import p1 from "@/assets/principle-1.jpg";
import p2 from "@/assets/principle-2.jpg";
import p3 from "@/assets/principle-3.jpg";
import p4 from "@/assets/principle-4.jpg";
import p5 from "@/assets/principle-5.jpg";
import pAristoteles from "@/assets/product-aristoteles.jpg";
import pHerodotus from "@/assets/product-herodotus.jpg";
import pPythagoras from "@/assets/product-pythagoras.jpg";
import pArchimedes from "@/assets/product-archimedes.jpg";

import areaIa from "@/assets/area-ia.jpg";
import areaData from "@/assets/area-data.jpg";
import areaAuto from "@/assets/area-auto.jpg";
import areaResearch from "@/assets/area-research.jpg";
import areaEdu from "@/assets/area-edu.jpg";
import areaHealth from "@/assets/area-health.jpg";
import areaEnergy from "@/assets/area-energy.jpg";
import areaDefense from "@/assets/area-defense.jpg";
import areaInfra from "@/assets/area-infra.jpg";

import rigsResearchImg from "@/assets/rigs-research.png";
import rigsIndustryImg from "@/assets/rigs-industry.png";
import rigsGovImg from "@/assets/rigs-government.png";
import rigsSocietyImg from "@/assets/rigs-society.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aura — Inteligência para o Desenvolvimento Humano" },
      {
        name: "description",
        content:
          "A Aura desenvolve tecnologias avançadas e sistemas inteligentes orientados ao desenvolvimento humano.",
      },
      { property: "og:title", content: "Aura — Inteligência para o Desenvolvimento Humano" },
      {
        property: "og:description",
        content: "Tecnologias responsáveis, acessíveis e centradas na experiência humana.",
      },
    ],
  }),
  component: Home,
});

const principles = [
  {
    title: "Desenvolvimento Humano em Primeiro Lugar",
    text: "A tecnologia é um meio, não um fim. Toda inovação deve ser avaliada pela sua capacidade de melhorar a vida das pessoas, fortalecer comunidades e ampliar oportunidades.",
    image: p1,
  },
  {
    title: "Excelência como Compromisso",
    text: "Buscamos os mais altos padrões de qualidade técnica, rigor intelectual e responsabilidade. Excelência é um processo contínuo de aprendizado e evolução.",
    image: p2,
  },
  {
    title: "Inovação Responsável",
    text: "Tecnologias transformadoras devem ser desenvolvidas com responsabilidade — considerando impactos sociais, econômicos, ambientais e éticos de longo prazo.",
    image: p3,
  },
  {
    title: "Transparência e Integridade",
    text: "Construímos relações baseadas em confiança, clareza e responsabilidade. Instituições fortes dependem de transparência e prestação de contas.",
    image: p4,
  },
  {
    title: "Sustentabilidade",
    text: "Equilíbrio entre crescimento econômico, preservação ambiental, estabilidade institucional e prosperidade social. Progresso que beneficia gerações futuras.",
    image: p5,
  },
];

const products = [
  { slug: "aristoteles", name: "Aristoteles", tag: "Raciocínio & Decisão", text: "Raciocínio lógico, análise crítica e pensamento estratégico.", image: pAristoteles },
  { slug: "herodotus", name: "Herodotus", tag: "História & Geopolítica", text: "História, geopolítica, relações internacionais e ciências humanas.", image: pHerodotus },
  { slug: "pythagoras", name: "Pythagoras", tag: "Matemática & Análise", text: "Matemática, estatística e modelagem quantitativa avançada.", image: pPythagoras },
  { slug: "archimedes", name: "Archimedes", tag: "Engenharia & Sistemas", text: "Engenharia, sistemas físicos e desafios técnicos complexos.", image: pArchimedes },
];

const solutions: { title: string; items: string[]; to?: string }[] = [
  { title: "Midas", items: ["Marketing", "Vendas", "Customer Success"], to: "/solucoes/midas" },
  { title: "Engenharia", items: ["Gestão de projetos", "CADs e Desenhos Técnicos"] },
  { title: "Backoffice", items: ["Contabilidade", "RH", "Gestão financeira"] },
  { title: "Atendimento", items: ["Atendimento ao cliente"] },
  { title: "Produção Criativa", items: ["Conteúdo e Design"] },
  { title: "Desenvolvimento e Tecnologia", items: ["Programação", "Segurança", "Redes"] },
];

const areas = [
  { name: "Inteligência Artificial", icon: Brain, image: areaIa, desc: "Modelos fundacionais e agentes que ampliam capacidades humanas em escala." },
  { name: "Ciência de Dados", icon: Database, image: areaData, desc: "Transformamos dados em decisões com rigor estatístico e inteligência aplicada." },
  { name: "Automações", icon: Workflow, image: areaAuto, desc: "Sistemas autônomos que orquestram processos críticos com precisão e segurança." },
  { name: "Pesquisa Aplicada", icon: FlaskConical, image: areaResearch, desc: "Conectamos descoberta científica à resolução de problemas reais do mundo." },
  { name: "Educação", icon: GraduationCap, image: areaEdu, desc: "Plataformas inteligentes que personalizam o aprendizado em todos os níveis." },
  { name: "Saúde", icon: HeartPulse, image: areaHealth, desc: "Diagnóstico assistido e medicina de precisão para ampliar o cuidado humano." },
  { name: "Energia", icon: Zap, image: areaEnergy, desc: "Otimização de redes e modelagem para uma matriz energética sustentável." },
  { name: "Defesa", icon: Shield, image: areaDefense, desc: "Inteligência estratégica e sistemas críticos para soberania tecnológica." },
  { name: "Infraestrutura", icon: Landmark, image: areaInfra, desc: "Modelagem e operação inteligente da infraestrutura física do século XXI." },
];

const rigs = [
  { letter: "R", title: "Research", image: rigsResearchImg, text: "A produção de conhecimento científico, tecnológico e intelectual. Universidades, centros de pesquisa, laboratórios e instituições dedicadas à descoberta." },
  { letter: "I", title: "Industry", image: rigsIndustryImg, text: "A transformação do conhecimento em soluções, produtos, serviços e desenvolvimento econômico. A capacidade produtiva e inovadora da sociedade." },
  { letter: "G", title: "Government", image: rigsGovImg, text: "A coordenação institucional necessária para garantir estabilidade, planejamento estratégico, investimento público e desenvolvimento de capacidades nacionais." },
  { letter: "S", title: "Society", image: rigsSocietyImg, text: "O conjunto de indivíduos, comunidades e organizações que orientam os valores, prioridades e necessidades que impulsionam o progresso." },
];

const missionVision = [
  { label: "Nossa Missão", text: "Desenvolver tecnologias e sistemas inteligentes que ampliem as capacidades humanas e promovam prosperidade sustentável para indivíduos, organizações e sociedades.", bg: gradient1.url },
  { label: "Nossa Visão", text: "Construir um futuro em que conhecimento, tecnologia e instituições atuem em harmonia para promover o florescimento humano, o desenvolvimento sustentável e o progresso coletivo.", bg: gradient2.url },
];

function useDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const update = () => setDark(document.documentElement.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

function Logo({ size = "default" }: { size?: "default" | "lg" | "xl" }) {
  const dark = useDark();
  const cls = size === "xl" ? "h-20 w-auto sm:h-24" : size === "lg" ? "h-14 w-auto sm:h-16" : "h-10 w-auto sm:h-12";
  return (
    <img
      src={dark ? logoLight.url : logoDark.url}
      alt="Aura"
      className={cls}
      width={size === "xl" ? 320 : size === "lg" ? 240 : 180}
      height={size === "xl" ? 96 : size === "lg" ? 64 : 48}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs uppercase tracking-widest text-muted-foreground">{children}</span>
  );
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
            className={`absolute inset-0 overflow-hidden rounded-3xl p-10 text-center transition-opacity duration-1000 sm:p-14 ${
              i === idx ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            style={{ backgroundImage: `url(${item.bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 bg-background/10" />
            <div className="relative flex h-full flex-col items-center justify-center">
              <span className="text-xs uppercase tracking-widest text-neutral-900/70">{item.label}</span>
              <p className="mx-auto mt-4 max-w-2xl font-display text-lg leading-snug text-neutral-900 sm:text-xl">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {missionVision.map((m, i) => (
          <button
            key={m.label}
            onClick={() => setIdx(i)}
            aria-label={m.label}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-8 bg-foreground" : "w-3 bg-muted-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ProductsDropdown moved to SiteHeader


function PrinciplesAccordion() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex h-[460px] w-full gap-3 sm:h-[520px]">
      {principles.map((p, i) => {
        const isActive = i === active;
        return (
          <button
            key={p.title}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`group relative overflow-hidden rounded-3xl border border-border text-left transition-all duration-700 ease-out ${
              isActive ? "flex-[5]" : "flex-[1]"
            }`}
            style={{ minWidth: 0 }}
          >
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                isActive
                  ? "bg-gradient-to-t from-black/95 via-black/55 to-black/15"
                  : "bg-black/70"
              }`}
            />
            <div className="relative flex h-full flex-col justify-between p-5 sm:p-7">
              <span className="font-heading text-3xl font-light text-white/90 sm:text-4xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                className={`transition-all duration-500 ${
                  isActive ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"
                }`}
              >
                <h3 className="font-heading text-xl font-medium text-white sm:text-2xl">{p.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">{p.text}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function SocialIcon({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground"
    >
      {children}
    </a>
  );
}

// Filled brand icons
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.84l-4.84-6.32L5.7 22H2.44l8.02-9.17L1.5 2h7l4.38 5.79L18.24 2zm-2.4 18h1.84L7.27 4H5.34l10.5 16z" />
    </svg>
  );
}
function LinkedinFilled({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 11.01-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
function YoutubeFilled({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
    </svg>
  );
}

type SitemapItem = { label: string; to?: string };
const sitemap: { title: string; items: SitemapItem[] }[] = [
  { title: "Produtos", items: [{ label: "Plataforma Aura" }, { label: "API" }, { label: "Aura Studio" }, { label: "Enterprise" }] },
  { title: "Modelos", items: products.map((p) => ({ label: p.name, to: `/modelos/${p.slug}` })) },
  { title: "Soluções", items: [{ label: "Midas", to: "/solucoes/midas" }, ...solutions.slice(1).map((s) => ({ label: s.title }))] },
  { title: "Recursos", items: [{ label: "Documentação", to: "/docs/aristoteles" }, { label: "Blog" }, { label: "Tutoriais" }, { label: "Casos de uso" }] },
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
          className="absolute inset-0 -z-10 opacity-[0.18] dark:opacity-[0.35]"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="font-heading text-balance text-4xl font-medium leading-[1.1] sm:text-5xl md:text-6xl">
            Inteligência para o Desenvolvimento Humano
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
            A Aura é uma organização dedicada ao desenvolvimento de tecnologias avançadas, sistemas
            inteligentes e soluções de alto impacto orientadas para o desenvolvimento humano.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#sobre"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Conheça a Aura <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#produtos"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium text-foreground transition hover:bg-surface"
            >
              Nossos Modelos
            </a>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="mx-auto max-w-4xl px-6 py-24 text-center">
        <SectionLabel>Sobre</SectionLabel>
        <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">
          Tecnologia centrada nas pessoas.
        </h2>
        <div className="mx-auto mt-10 space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            Nossa atuação está fundamentada na criação de tecnologias responsáveis, acessíveis,
            sustentáveis e centradas na experiência humana.
          </p>
          <p>
            Defendemos uma visão em que inovação e responsabilidade caminham juntas, em que o
            desenvolvimento tecnológico é avaliado pelos benefícios que gera para indivíduos,
            organizações e comunidades.
          </p>
          <p className="text-foreground">
            Mais do que acompanhar o futuro, buscamos ajudar a construí-lo de forma consciente,
            responsável e orientada ao desenvolvimento humano.
          </p>
        </div>
        <MissionVisionRotator />
      </section>

      {/* Princípios */}
      <section id="principios" className="border-t border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <SectionLabel>Princípios</SectionLabel>
            <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">
              Cinco princípios que orientam tudo o que construímos.
            </h2>
          </div>
          <PrinciplesAccordion />
        </div>
      </section>

      {/* Filosofia */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <SectionLabel>Filosofia</SectionLabel>
        <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">
          Conhecimento é infraestrutura.
        </h2>
        <div className="mx-auto mt-10 space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            Ao longo da história, os maiores avanços ocorreram quando ciência, tecnologia,
            instituições e pessoas atuaram de forma coordenada em torno de objetivos comuns.
          </p>
          <p>
            Os desafios mais importantes do século XXI não serão resolvidos apenas por avanços
            tecnológicos isolados, mas pela capacidade de integrar conhecimento, inovação,
            governança e participação social.
          </p>
          <p className="text-foreground">Não buscamos automatizar a humanidade. Buscamos potencializá-la.</p>
        </div>
      </section>

      {/* RIGS */}
      <section id="rigs" className="border-y border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <SectionLabel>Framework</SectionLabel>
            <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">O Framework RIGS</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Uma visão sistêmica do desenvolvimento baseada em quatro domínios fundamentais.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {rigs.map((r) => (
              <div
                key={r.title}
                className="overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-sm transition hover:shadow-xl"
              >
                <div className="relative aspect-[5/3] overflow-hidden bg-gradient-to-br from-neutral-900/5 to-neutral-900/15 dark:from-white/5 dark:to-white/10">
                  <img
                    src={r.image}
                    alt={r.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain p-4 contrast-125 saturate-125"
                    style={{ filter: "contrast(1.18) saturate(1.25)" }}
                  />
                </div>
                <div className="p-7 text-center sm:p-8 sm:text-left">
                  <SectionLabel>{r.letter} — {r.title}</SectionLabel>
                  <h3 className="mt-3 font-heading text-2xl font-medium sm:text-3xl">{r.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{r.text}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Produtos */}
      <section id="produtos" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <SectionLabel>Produtos</SectionLabel>
          <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">
            Modelos especializados para o pensamento.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Inteligência não é uma capacidade única, mas um conjunto de competências complementares.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((prod) => (
            <article
              key={prod.slug}
              className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-3xl border border-border"
            >
              <img
                src={prod.image}
                alt={prod.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/15" />
              <div className="relative flex flex-col gap-3 p-6 text-center text-white">
                <span className="mx-auto rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-widest backdrop-blur">
                  {prod.tag}
                </span>
                <h3 className="font-heading text-2xl font-medium">{prod.name}</h3>
                <p className="text-sm leading-relaxed text-white/85">{prod.text}</p>
                <div className="mt-2 flex flex-col gap-2">
                  <Link
                    to="/entrar"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-medium text-neutral-900 transition hover:bg-white/90"
                  >
                    Teste agora <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    to="/modelos/$slug"
                    params={{ slug: prod.slug }}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-white/10"
                  >
                    Ver detalhes
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Áreas — carousel */}
      <section id="atuacao" className="border-t border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <SectionLabel>Atuação</SectionLabel>
            <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">Áreas de Atuação</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Atuamos no desenvolvimento e aplicação de tecnologias avançadas em múltiplos setores
              estratégicos.
            </p>
          </div>
          <Carousel opts={{ align: "start", loop: true }} className="mx-auto w-full max-w-6xl">
            <CarouselContent>
              {areas.map((a) => {
                const Icon = a.icon;
                return (
                  <CarouselItem key={a.name} className="sm:basis-1/2 lg:basis-1/3">
                    <article className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
                      <img
                        src={a.image}
                        alt={a.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />
                      <div className="relative flex h-full flex-col justify-between p-6 text-white">
                        <Icon className="h-6 w-6 text-white/90" />
                        <div>
                          <h3 className="font-heading text-2xl font-medium">{a.name}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-white/85">{a.desc}</p>
                          <a
                            href="#"
                            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-neutral-900 transition hover:bg-white/90"
                          >
                            Saiba mais <ArrowRight className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </article>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Por que existimos */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <SectionLabel>Propósito</SectionLabel>
        <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">Por que existimos.</h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          A humanidade enfrenta desafios cada vez mais complexos. Saúde, educação, sustentabilidade,
          governança, energia, segurança e desenvolvimento econômico exigem novas formas de pensar e
          agir.
        </p>
        <ul className="mx-auto mt-10 max-w-2xl divide-y divide-border border-y border-border text-left">
          {[
            "Desenvolver tecnologias que ampliem capacidades.",
            "Transformar conhecimento em ação.",
            "Conectar pesquisa, indústria, governo e sociedade.",
            "Contribuir com um futuro mais inteligente, sustentável, próspero e humano.",
          ].map((item, i) => (
            <li key={item} className="flex items-baseline gap-5 py-5">
              <span className="font-heading text-sm text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-lg text-foreground">{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Link
            to="/manifesto"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Ler nosso Manifesto <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer — always dark */}
      <footer className="dark bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-6 py-16">
          {/* Top: logo + slogan side by side */}
          <div className="flex flex-col items-start gap-8 border-b border-border pb-12 sm:flex-row sm:items-center sm:gap-10">
            <img src={logoLight.url} alt="Aura" className="h-16 w-auto sm:h-20" />
            <div className="hidden h-16 w-px bg-border sm:block" />
            <img
              src={sloganWhite.url}
              alt="For humanity, to the stars."
              className="h-24 w-auto sm:h-32 md:h-40"
            />
          </div>

          {/* Sitemap */}
          <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-7">
            {sitemap.map((col) => (
              <div key={col.title}>
                <p className="font-heading text-xs font-semibold uppercase tracking-widest text-foreground">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((it) => (
                    <li key={it.label}>
                      {it.to ? (
                        <a href={it.to} className="text-sm text-muted-foreground transition hover:text-foreground">
                          {it.label}
                        </a>
                      ) : (
                        <a href="#" className="text-sm text-muted-foreground transition hover:text-foreground">
                          {it.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom: socials + copy */}
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

