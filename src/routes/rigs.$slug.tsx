import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import rigsResearch from "@/assets/rigs-research-v3.jpg.asset.json";
import rigsIndustry from "@/assets/rigs-industry-v3.jpg.asset.json";
import rigsGov from "@/assets/rigs-government-v3.jpg.asset.json";
import rigsSociety from "@/assets/rigs-society-v3.jpg.asset.json";

const PHOTO = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

type RigsData = {
  title: string;
  subtitle: string;
  text: string;
  image: string;
  intro: string[];
  gallery: string[];
  highlights: { title: string; text: string }[];
  initiatives: string[];
};

const DATA: Record<string, RigsData> = {
  research: {
    title: "Research",
    subtitle: "Para Universidades",
    text: "A produção de conhecimento científico, tecnológico e intelectual. Universidades, centros de pesquisa, laboratórios e instituições dedicadas à descoberta compõem a base sobre a qual se constroem os avanços de longo prazo.",
    image: rigsResearch.url,
    intro: [
      "A pesquisa é o motor silencioso do progresso. Cada descoberta em uma bancada de laboratório, cada artigo revisado por pares e cada tese defendida contribui para o repertório coletivo que a sociedade usará décadas depois.",
      "A Aura desenvolve ferramentas que respeitam o rigor acadêmico, ampliam a capacidade de investigação e criam pontes reais entre o conhecimento gerado nas universidades e sua aplicação em empresas, governos e comunidades.",
    ],
    gallery: [PHOTO("photo-1523240795612-9a054b0db644"), PHOTO("photo-1532094349884-543bc11b234d"), PHOTO("photo-1554475901-4538ddfbccc2")],
    highlights: [
      { title: "Ciência aberta", text: "Revisão de literatura, escrita colaborativa, dados abertos e pré-prints com rastreabilidade completa das citações." },
      { title: "Formação avançada", text: "Trilhas para graduação, mestrado e doutorado com apoio contínuo em metodologia, redação e defesa." },
      { title: "Transferência de tecnologia", text: "Pontes estruturadas entre laboratório, indústria e mercado, com apoio a patentes e spin-offs." },
      { title: "Financiamento à pesquisa", text: "Preparação de projetos para CNPq, FAPESPs, ERC e agências internacionais com verificação de aderência a editais." },
      { title: "Laboratórios digitais", text: "Simulações, análise de dados experimentais e reprodutibilidade de estudos assistida por IA." },
      { title: "Bibliometria e impacto", text: "Mapas de colaboração, análise de citações e medição de impacto científico e social." },
    ],
    initiatives: ["Bolsas para pesquisadores em IA", "Parcerias com programas de pós-graduação", "Repositórios abertos de datasets", "Prêmios de ciência aplicada"],
  },
  industry: {
    title: "Industry",
    subtitle: "Para Empresas",
    text: "A transformação do conhecimento em soluções, produtos, serviços e desenvolvimento econômico. Empresas, startups e organizações que convertem descoberta em valor prático e escalável.",
    image: rigsIndustry.url,
    intro: [
      "A indústria é onde o conhecimento vira riqueza distribuída — em empregos, produtos e serviços que melhoram a vida cotidiana. É também o principal vetor de escala das transformações tecnológicas.",
      "A Aura acredita numa indústria produtiva, competitiva e responsável, capaz de crescer sem abrir mão da governança de dados, da segurança da informação e do impacto positivo sobre trabalhadores e cadeias produtivas.",
    ],
    gallery: [PHOTO("photo-1497366216548-37526070297c"), PHOTO("photo-1521737604893-d14cc237f11d"), PHOTO("photo-1454165804606-c3d57bc86b40")],
    highlights: [
      { title: "Produtividade", text: "Automação assistida em operações críticas, do back ao front-office, com ganhos mensuráveis em ciclos, custos e qualidade." },
      { title: "Novos mercados", text: "Ampliação da fronteira de produtos e serviços possíveis, incluindo modelos de negócio antes inviáveis." },
      { title: "Escala responsável", text: "Crescimento com governança de dados, IA responsável e conformidade com regulações locais e internacionais." },
      { title: "Cadeias de valor", text: "Visibilidade ponta a ponta de fornecedores, estoques, logística e distribuição." },
      { title: "Requalificação", text: "Programas de reskilling e upskilling para preparar o time para trabalhar com IA no dia a dia." },
      { title: "Pesquisa aplicada", text: "Áreas de P&D corporativa conectadas a universidades e centros de excelência." },
    ],
    initiatives: ["Programas de aceleração para startups", "Consórcios setoriais de dados", "Laboratórios de inovação aberta", "Certificações de IA responsável"],
  },
  government: {
    title: "Government",
    subtitle: "Para Governos",
    text: "A coordenação institucional necessária para garantir estabilidade, planejamento estratégico, investimento público e desenvolvimento de capacidades nacionais.",
    image: rigsGov.url,
    intro: [
      "Governos definem as regras do jogo, distribuem serviços essenciais e coordenam esforços coletivos que nenhum ator privado conseguiria realizar sozinho. Sua eficiência e legitimidade são condições para o progresso.",
      "A Aura desenvolve tecnologia que respeita a soberania, protege dados sensíveis do cidadão e amplia a capacidade do Estado de planejar, executar e avaliar políticas públicas com transparência.",
    ],
    gallery: [PHOTO("photo-1541872703-74c5e44368f9"), PHOTO("photo-1589829545856-d10d557cf95f"), PHOTO("photo-1591189863430-ab87e120f312")],
    highlights: [
      { title: "Serviços públicos", text: "Atendimento ao cidadão com prontidão, transparência e escala, do balcão físico ao portal digital." },
      { title: "Políticas orientadas a dados", text: "Instrumentação de indicadores, avaliação de impacto e simulação de cenários antes da tomada de decisão." },
      { title: "Capacidades nacionais", text: "Soberania tecnológica em setores estratégicos como saúde, defesa, energia e infraestrutura crítica." },
      { title: "Integridade e controle", text: "Auditoria de gastos públicos, detecção de fraudes e apoio a tribunais de contas." },
      { title: "Segurança pública", text: "Análise de dados para prevenção, resposta e planejamento operacional respeitando direitos fundamentais." },
      { title: "Educação e saúde universais", text: "Ampliação do alcance e da qualidade das redes públicas com apoio de IA." },
    ],
    initiatives: ["Padrões abertos de interoperabilidade", "Programas de dados abertos", "Formação de servidores em IA", "Cooperação técnica internacional"],
  },
  society: {
    title: "Society",
    subtitle: "Para Pessoas",
    text: "O conjunto de indivíduos, comunidades e organizações que orientam os valores, prioridades e necessidades que impulsionam o progresso.",
    image: rigsSociety.url,
    intro: [
      "A sociedade é a razão de tudo. Ciência, indústria e governo só fazem sentido quando resultam em vidas mais longas, mais livres e mais plenas — para famílias, comunidades e futuras gerações.",
      "A Aura desenvolve tecnologia para pessoas: acessível, compreensível, respeitosa com o tempo e a atenção de quem a usa, e capaz de fortalecer laços comunitários em vez de erodi-los.",
    ],
    gallery: [PHOTO("photo-1529156069898-49953e39b3ac"), PHOTO("photo-1517649763962-0c623066013b"), PHOTO("photo-1509099836639-18ba1795216d")],
    highlights: [
      { title: "Acesso", text: "Democratização de ferramentas de conhecimento, saúde e produtividade para quem antes não tinha alcance a elas." },
      { title: "Cidadania digital", text: "Educação, participação e proteção em ambientes conectados, com apoio a idosos e populações vulneráveis." },
      { title: "Bem-estar", text: "Tecnologias que reforçam laços comunitários, saúde mental e qualidade de vida cotidiana." },
      { title: "Cultura e criatividade", text: "Ferramentas para artistas, educadores e criadores independentes ampliarem seu alcance." },
      { title: "Terceiro setor", text: "Apoio a ONGs, movimentos sociais e iniciativas de impacto na gestão e mobilização de recursos." },
      { title: "Sustentabilidade", text: "Monitoramento ambiental, agricultura de precisão e consumo consciente com métricas claras." },
    ],
    initiatives: ["Programas gratuitos para escolas públicas", "Parcerias com ONGs", "Fundo de bolsas para talentos", "Alfabetização em IA para famílias"],
  },
};

export const Route = createFileRoute("/rigs/$slug")({
  loader: ({ params }) => {
    const d = DATA[params.slug];
    if (!d) throw notFound();
    return { ...d, slug: params.slug };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — RIGS — Aura` },
          { name: "description", content: loaderData.text.slice(0, 160) },
        ]
      : [{ title: "RIGS — Aura" }],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <Link to="/" className="text-sm underline">Voltar</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <p>Erro.</p>
    </div>
  ),
  component: RigsSlugPage,
});

function RigsSlugPage() {
  const d = Route.useLoaderData() as RigsData & { slug: string };
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
        if (entry.isIntersecting && entry.intersectionRatio > 0.35) root.classList.add("dark");
        else restore();
      },
      { threshold: [0, 0.35, 0.6, 1] }
    );
    io.observe(hero);
    return () => { io.disconnect(); restore(); };
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section id="top" className="relative flex min-h-[85vh] items-center justify-center overflow-hidden pt-24">
        <img src={d.image} alt={d.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center text-white">
          <h1 className="font-heading text-5xl font-medium sm:text-6xl">{d.title}</h1>
          <p className="mt-3 text-lg text-white/85">{d.subtitle}</p>
          <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">{d.text}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/manifesto" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-white/90">
              Saiba mais <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Contexto</span>
        <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">Por que {d.title} importa</h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
          {d.intro.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section className="border-t border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Impacto</span>
            <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">Onde {d.title} atua</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {d.highlights.map((h) => (
              <div key={h.title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-heading text-lg font-medium">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Iniciativas</span>
            <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">Como participamos</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Programas e parcerias ativas que aproximam a Aura da comunidade de {d.title.toLowerCase()}.
            </p>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {d.initiatives.map((it) => (
              <li key={it} className="flex items-center gap-3 py-4">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-base text-foreground">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-3 sm:grid-cols-3">
          {d.gallery.map((g, i) => (
            <div key={g} className={`overflow-hidden rounded-2xl border border-border ${i === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-square"}`}>
              <img src={g} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
