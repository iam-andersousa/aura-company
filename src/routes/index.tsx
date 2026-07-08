import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

import gradient1 from "@/assets/aura-gradient-1.png.asset.json";
import gradient2 from "@/assets/aura-gradient-2.png.asset.json";

import heroThinker from "@/assets/hero-dev.jpg.asset.json";
import principleHands from "@/assets/principle-hands.jpg.asset.json";
import principleTablet from "@/assets/principle-tablet.jpg.asset.json";
import principleMacaw from "@/assets/principle-macaw.jpg.asset.json";

import mktEdu from "@/assets/market-education.jpg.asset.json";
import mktHealth from "@/assets/market-health.jpg.asset.json";
import mktLaw from "@/assets/market-law.jpg.asset.json";
import mktAcc from "@/assets/market-accounting.jpg.asset.json";
import mktBiz from "@/assets/market-business.jpg.asset.json";

import rigsResearch from "@/assets/rigs-research-v3.jpg.asset.json";
import rigsIndustry from "@/assets/rigs-industry-v3.jpg.asset.json";
import rigsGovernment from "@/assets/rigs-government-v3.jpg.asset.json";
import rigsSociety from "@/assets/rigs-society-v3.jpg.asset.json";

const PHOTO = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aura — O futuro começa aqui" },
      { name: "description", content: "Desenvolvendo tecnologia responsável para potencializar pessoas e instituições." },
      { property: "og:title", content: "Aura — O futuro começa aqui" },
      { property: "og:description", content: "Desenvolvendo tecnologia responsável para potencializar pessoas e instituições." },
    ],
  }),
  component: Home,
});

const principles = [
  { title: "Desenvolvimento Humano em Primeiro Lugar", text: "A tecnologia é um meio, não um fim. Toda inovação deve ser avaliada pela sua capacidade de melhorar a vida das pessoas.", image: principleHands.url },
  { title: "Excelência como Compromisso", text: "Buscamos os mais altos padrões de qualidade técnica, rigor intelectual e responsabilidade.", image: PHOTO("photo-1522071820081-009f0129c71c") },
  { title: "Inovação Responsável", text: "Tecnologias transformadoras desenvolvidas com responsabilidade — considerando impactos sociais, econômicos e éticos.", image: principleTablet.url },
  { title: "Transparência e Integridade", text: "Construímos relações baseadas em confiança, clareza e responsabilidade.", image: PHOTO("photo-1475721027785-f74eccf877e2") },
  { title: "Sustentabilidade", text: "Equilíbrio entre crescimento econômico, preservação ambiental e prosperidade social.", image: principleMacaw.url },
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




function Home() {
  // Force dark theme while the hero is in view; restore user preference when leaving.
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const root = document.documentElement;
    const restore = () => {
      let pref: string | null = null;
      try { pref = localStorage.getItem("aura-theme"); } catch {}
      root.classList.toggle("dark", pref !== "light");
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
          root.classList.add("dark");
        } else {
          restore();
        }
      },
      { threshold: [0, 0.35, 0.6, 1] }
    );
    io.observe(hero);
    return () => { io.disconnect(); restore(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section id="top" className="relative flex min-h-[85vh] items-center justify-center overflow-hidden pt-24">
        <img src={heroThinker.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center text-white">
          <h1 className="font-heading text-4xl font-medium sm:text-5xl">
            O futuro começa aqui
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            Desenvolvendo tecnologia responsável para potencializar pessoas e instituições.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#sobre" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-white/90">
              Conheça a Aura <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#rigs" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
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
                <span className="absolute right-5 top-5 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-150">
                  <ArrowRight className="h-6 w-6" strokeWidth={2} />
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

      <SiteFooter />
    </div>
  );
}
