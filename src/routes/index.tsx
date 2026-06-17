import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Brain,
  Cpu,
  Database,
  Workflow,
  FlaskConical,
  Compass,
  GraduationCap,
  HeartPulse,
  Zap,
  Shield,
  Network,
  Radio,
  Landmark,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

import logoDark from "@/assets/aura-logo-dark.png.asset.json";
import logoLight from "@/assets/aura-logo-light.png.asset.json";
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
import area1 from "@/assets/area-1.jpg";
import area2 from "@/assets/area-2.jpg";
import area3 from "@/assets/area-3.jpg";
import area4 from "@/assets/area-4.jpg";

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
        content:
          "Tecnologias responsáveis, acessíveis e centradas na experiência humana.",
      },
    ],
  }),
  component: Home,
});

const principles = [
  {
    title: "Desenvolvimento Humano em Primeiro Lugar",
    text: "A tecnologia é um meio, não um fim. Toda inovação deve ser avaliada pela sua capacidade de melhorar a vida das pessoas, fortalecer comunidades, ampliar oportunidades e promover bem-estar individual e coletivo.",
    image: p3,
  },
  {
    title: "Excelência como Compromisso",
    text: "Buscamos os mais altos padrões de qualidade técnica, rigor intelectual e responsabilidade. Excelência não é um objetivo final, mas um processo contínuo de aprendizado, aprimoramento e evolução.",
    image: p2,
  },
  {
    title: "Inovação Responsável",
    text: "Tecnologias transformadoras devem ser desenvolvidas com responsabilidade. Consideramos os impactos sociais, econômicos, ambientais e éticos de longo prazo em todas as nossas iniciativas.",
    image: p1,
  },
  {
    title: "Transparência e Integridade",
    text: "Construímos relações baseadas em confiança, clareza e responsabilidade. Instituições fortes dependem de transparência, prestação de contas e compromisso com a verdade.",
    image: p4,
  },
  {
    title: "Sustentabilidade",
    text: "O desenvolvimento sustentável exige equilíbrio entre crescimento econômico, preservação ambiental, estabilidade institucional e prosperidade social. Progresso genuíno beneficia gerações presentes sem comprometer as futuras.",
    image: p5,
  },
];

const products = [
  {
    name: "Aristoteles",
    tag: "Raciocínio & Decisão",
    text: "Modelo especializado em raciocínio lógico, análise crítica, tomada de decisão e resolução estruturada de problemas. Projetado para apoiar atividades que exigem coerência, argumentação e pensamento estratégico.",
    image: pAristoteles,
  },
  {
    name: "Herodotus",
    tag: "História & Geopolítica",
    text: "Modelo especializado em história, geopolítica, relações internacionais, cultura e ciências humanas. Desenvolvido para compreender processos históricos, fenômenos sociais e contextos institucionais complexos.",
    image: pHerodotus,
  },
  {
    name: "Pythagoras",
    tag: "Matemática & Análise",
    text: "Modelo especializado em matemática, estatística, lógica aplicada, modelagem quantitativa e análise formal. Projetado para tarefas que exigem precisão analítica e raciocínio matemático avançado.",
    image: pPythagoras,
  },
  {
    name: "Archimedes",
    tag: "Engenharia & Sistemas",
    text: "Modelo especializado em engenharia, tecnologia, sistemas físicos e resolução de desafios técnicos complexos. Desenvolvido para apoiar atividades de projeto, inovação e desenvolvimento tecnológico.",
    image: pArchimedes,
  },
];

const areas = [
  { name: "Inteligência Artificial", icon: Brain, image: area1 },
  { name: "Sistemas Inteligentes", icon: Cpu, image: area1 },
  { name: "Ciência de Dados", icon: Database, image: area1 },
  { name: "Engenharia de Conhecimento", icon: Network, image: area1 },
  { name: "Automação", icon: Workflow, image: area1 },
  { name: "Pesquisa Aplicada", icon: FlaskConical, image: area2 },
  { name: "Inteligência Estratégica", icon: Compass, image: area2 },
  { name: "Educação e Capacitação", icon: GraduationCap, image: area4 },
  { name: "Saúde", icon: HeartPulse, image: area2 },
  { name: "Energia", icon: Zap, image: area3 },
  { name: "Defesa", icon: Shield, image: area3 },
  { name: "Infraestrutura", icon: Landmark, image: area3 },
  { name: "Comunicações", icon: Radio, image: area1 },
  { name: "Governança Digital", icon: Sparkles, image: area4 },
  { name: "Transformação Institucional", icon: Network, image: area4 },
];

const rigs = [
  {
    letter: "R",
    title: "Research",
    text: "A produção de conhecimento científico, tecnológico e intelectual. Universidades, centros de pesquisa, laboratórios e instituições dedicadas à descoberta.",
  },
  {
    letter: "I",
    title: "Industry",
    text: "A transformação do conhecimento em soluções, produtos, serviços e desenvolvimento econômico. A capacidade produtiva e inovadora da sociedade.",
  },
  {
    letter: "G",
    title: "Government",
    text: "A coordenação institucional necessária para garantir estabilidade, planejamento estratégico, investimento público e desenvolvimento de capacidades nacionais.",
  },
  {
    letter: "S",
    title: "Society",
    text: "O conjunto de indivíduos, comunidades e organizações que orientam os valores, prioridades e necessidades que impulsionam o progresso.",
  },
];

function Carousel({ children }: { children: React.ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };
  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={() => scroll(-1)}
          aria-label="Anterior"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:bg-accent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Próximo"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:bg-accent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Logo() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const update = () => setDark(document.documentElement.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return (
    <img
      src={dark ? logoLight.url : logoDark.url}
      alt="Aura"
      className="h-10 w-auto sm:h-12"
      width={180}
      height={48}
    />
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 glass-nav">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2">
            <Logo />
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#sobre" className="transition hover:text-foreground">Sobre</a>
            <a href="#principios" className="transition hover:text-foreground">Princípios</a>
            <a href="#rigs" className="transition hover:text-foreground">RIGS</a>
            <a href="#produtos" className="transition hover:text-foreground">Produtos</a>
            <a href="#atuacao" className="transition hover:text-foreground">Atuação</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#manifesto"
              className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:inline-flex"
            >
              Manifesto
            </a>
          </div>
        </div>
      </header>

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
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
            Aura
          </div>
          <h1 className="text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            Inteligência para o<br />
            <span className="italic font-light text-muted-foreground">Desenvolvimento Humano</span>
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
      <section id="sobre" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">01 — Sobre</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">Tecnologia centrada nas pessoas.</h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground md:col-span-8">
            <p>
              Nossa atuação está fundamentada na criação de tecnologias responsáveis, acessíveis,
              sustentáveis e centradas na experiência humana. Acreditamos que o verdadeiro valor da
              inovação não está apenas em sua sofisticação técnica, mas em sua capacidade de ampliar
              as possibilidades das pessoas, fortalecer instituições e contribuir para uma sociedade
              mais próspera, justa e resiliente.
            </p>
            <p>
              Vivemos um período de transformação sem precedentes. Defendemos uma visão em que
              inovação e responsabilidade caminham juntas, e em que o desenvolvimento tecnológico é
              avaliado não apenas pelo que é capaz de produzir, mas pelos benefícios que gera para
              indivíduos, organizações e comunidades.
            </p>
            <p className="text-foreground">
              Mais do que acompanhar o futuro, buscamos ajudar a construí-lo de forma consciente,
              responsável e orientada ao desenvolvimento humano.
            </p>
          </div>
        </div>

        {/* Mission / Vision */}
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <div
            className="relative overflow-hidden rounded-3xl p-10 text-foreground"
            style={{ backgroundImage: `url(${gradient1.url})`, backgroundSize: "cover" }}
          >
            <div className="absolute inset-0 bg-background/10" />
            <div className="relative">
              <span className="text-xs uppercase tracking-widest text-neutral-900/70">Nossa Missão</span>
              <p className="mt-4 font-display text-xl leading-snug text-neutral-900 sm:text-2xl">
                Desenvolver tecnologias e sistemas inteligentes que ampliem as capacidades humanas e
                promovam prosperidade sustentável para indivíduos, organizações e sociedades.
              </p>
            </div>
          </div>
          <div
            className="relative overflow-hidden rounded-3xl p-10"
            style={{ backgroundImage: `url(${gradient2.url})`, backgroundSize: "cover" }}
          >
            <div className="absolute inset-0 bg-background/10" />
            <div className="relative">
              <span className="text-xs uppercase tracking-widest text-neutral-900/70">Nossa Visão</span>
              <p className="mt-4 font-display text-xl leading-snug text-neutral-900 sm:text-2xl">
                Construir um futuro em que conhecimento, tecnologia e instituições atuem em harmonia
                para promover o florescimento humano, o desenvolvimento sustentável e o progresso
                coletivo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Princípios */}
      <section id="principios" className="border-t border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">02 — Princípios</span>
              <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
                Cinco princípios que orientam tudo o que construímos.
              </h2>
            </div>
          </div>
          <Carousel>
            {principles.map((p) => (
              <article
                key={p.title}
                className="group flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-border bg-card text-card-foreground sm:w-[55%] lg:w-[36%]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-lg">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Filosofia */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">03 — Filosofia</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">Conhecimento é infraestrutura.</h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground md:col-span-8">
            <p>
              Ao longo da história, os maiores avanços da humanidade ocorreram quando ciência,
              tecnologia, instituições e pessoas foram capazes de atuar de forma coordenada em torno
              de objetivos comuns. A Aura nasce dessa convicção.
            </p>
            <p>
              Os desafios mais importantes do século XXI não serão resolvidos apenas por avanços
              tecnológicos isolados, mas pela capacidade de integrar conhecimento, inovação,
              governança e participação social.
            </p>
            <p className="text-foreground">
              Não buscamos automatizar a humanidade. Buscamos potencializá-la.
            </p>
          </div>
        </div>
      </section>

      {/* RIGS */}
      <section id="rigs" className="border-y border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">04 — Framework</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">O Framework RIGS</h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Uma visão sistêmica do desenvolvimento baseada em quatro domínios fundamentais que
              sustentam sociedades inovadoras e resilientes. A Aura opera precisamente na interseção
              entre eles.
            </p>
          </div>
          <div className="relative">
            {rigs.map((r, i) => (
              <div
                key={r.title}
                className="sticky top-24 mb-6"
                style={{ zIndex: i + 1 }}
              >
                <div className="overflow-hidden rounded-3xl border border-border bg-card p-10 text-card-foreground shadow-xl sm:p-14">
                  <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr]">
                    <div className="font-display text-[120px] font-light leading-none text-muted-foreground/30 sm:text-[160px]">
                      {r.letter}
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">
                        0{i + 1} — {r.title}
                      </span>
                      <h3 className="mt-3 text-2xl sm:text-3xl">{r.title}</h3>
                      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {r.text}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-[60vh]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos */}
      <section id="produtos" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">05 — Produtos</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">Modelos especializados para o pensamento.</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Inteligência não é uma capacidade única, mas um conjunto de competências complementares
            que se fortalecem mutuamente. Conheça nossa família de modelos.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((prod) => (
            <article
              key={prod.name}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card text-card-foreground"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-[10px] uppercase tracking-widest text-foreground backdrop-blur">
                  {prod.tag}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl">{prod.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{prod.text}</p>
                <a
                  href="#manifesto"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  Teste agora <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Áreas */}
      <section id="atuacao" className="border-t border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">06 — Atuação</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">Áreas de Atuação</h2>
            <p className="mt-5 text-lg text-muted-foreground">
              A Aura atua no desenvolvimento e aplicação de tecnologias avançadas em múltiplos
              setores e domínios estratégicos.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {areas.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.name}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1"
                >
                  <Icon className="h-5 w-5 text-muted-foreground transition group-hover:text-foreground" />
                  <p className="mt-8 text-sm font-medium text-card-foreground">{a.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Por que existimos */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">07 — Propósito</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">Por que existimos.</h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              A humanidade enfrenta desafios cada vez mais complexos. Questões relacionadas à saúde,
              educação, sustentabilidade, governança, energia, segurança e desenvolvimento econômico
              exigem novas formas de pensar e agir.
            </p>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {[
                "Desenvolver tecnologias que ampliem capacidades.",
                "Transformar conhecimento em ação.",
                "Conectar pesquisa, indústria, governo e sociedade.",
                "Contribuir com um futuro mais inteligente, sustentável, próspero e humano.",
              ].map((item, i) => (
                <li key={item} className="flex items-baseline gap-5 py-5">
                  <span className="font-display text-sm text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section
        id="manifesto"
        className="relative overflow-hidden border-t border-border"
      >
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{ backgroundImage: `url(${gradient2.url})`, backgroundSize: "cover" }}
        />
        <div className="absolute inset-0 -z-10 bg-background/40 dark:bg-background/60" />
        <div className="mx-auto max-w-4xl px-6 py-32 text-center">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Manifesto</span>
          <div className="mt-8 space-y-5 font-display text-xl leading-snug text-foreground sm:text-2xl">
            <p>Máquinas processam informações.</p>
            <p>Pessoas atribuem significado.</p>
            <p className="text-muted-foreground">
              A tecnologia mais avançada do mundo não possui valor intrínseco se não contribuir para
              melhorar a condição humana.
            </p>
            <p>Acreditamos em uma inovação que fortalece pessoas em vez de substituí-las.</p>
            <p className="text-muted-foreground">
              Acreditamos em conhecimento aberto à colaboração, na ciência como instrumento de
              progresso e na tecnologia como ferramenta de desenvolvimento.
            </p>
            <p>Acreditamos que excelência e responsabilidade devem caminhar juntas.</p>
            <p className="text-muted-foreground">
              Acreditamos que o futuro pode ser construído de forma mais inteligente, mais
              sustentável e mais humana.
            </p>
            <p className="pt-4">A Aura existe para ajudar a tornar esse futuro possível.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-12 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Aura
            </span>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <a href="#sobre" className="hover:text-foreground">Sobre</a>
            <a href="#principios" className="hover:text-foreground">Princípios</a>
            <a href="#rigs" className="hover:text-foreground">RIGS</a>
            <a href="#produtos" className="hover:text-foreground">Produtos</a>
            <a href="#atuacao" className="hover:text-foreground">Atuação</a>
            <a href="#manifesto" className="hover:text-foreground">Manifesto</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
