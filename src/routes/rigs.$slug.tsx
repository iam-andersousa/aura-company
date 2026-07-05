import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import rigsResearch from "@/assets/rigs-research-v2.png.asset.json";
import rigsIndustry from "@/assets/rigs-industry-v2.png.asset.json";
import rigsGov from "@/assets/rigs-government-v2.png.asset.json";
import rigsSociety from "@/assets/rigs-society-v2.png.asset.json";

const PHOTO = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const DATA: Record<string, { title: string; subtitle: string; text: string; image: string; gallery: string[]; highlights: { title: string; text: string }[] }> = {
  research: {
    title: "Research",
    subtitle: "Para Universidades",
    text: "A produção de conhecimento científico, tecnológico e intelectual. Universidades, centros de pesquisa, laboratórios e instituições dedicadas à descoberta compõem a base sobre a qual se constroem os avanços de longo prazo.",
    image: rigsResearch.url,
    gallery: [PHOTO("photo-1523240795612-9a054b0db644"), PHOTO("photo-1532094349884-543bc11b234d"), PHOTO("photo-1554475901-4538ddfbccc2")],
    highlights: [
      { title: "Ciência aberta", text: "Ferramentas para revisão de literatura, escrita colaborativa e dados abertos." },
      { title: "Formação avançada", text: "Trilhas para graduação, mestrado e doutorado com apoio de IA." },
      { title: "Transferência de tecnologia", text: "Pontes estruturadas entre laboratório, indústria e mercado." },
    ],
  },
  industry: {
    title: "Industry",
    subtitle: "Para Empresas",
    text: "A transformação do conhecimento em soluções, produtos, serviços e desenvolvimento econômico. Empresas, startups e organizações que convertem descoberta em valor prático e escalável.",
    image: rigsIndustry.url,
    gallery: [PHOTO("photo-1497366216548-37526070297c"), PHOTO("photo-1521737604893-d14cc237f11d"), PHOTO("photo-1454165804606-c3d57bc86b40")],
    highlights: [
      { title: "Produtividade", text: "Automação assistida em operações críticas, do back ao front-office." },
      { title: "Novos mercados", text: "Ampliação da fronteira de produtos e serviços possíveis." },
      { title: "Escala responsável", text: "Crescimento com governança de dados e IA responsável." },
    ],
  },
  government: {
    title: "Government",
    subtitle: "Para Governos",
    text: "A coordenação institucional necessária para garantir estabilidade, planejamento estratégico, investimento público e desenvolvimento de capacidades nacionais.",
    image: rigsGov.url,
    gallery: [PHOTO("photo-1541872703-74c5e44368f9"), PHOTO("photo-1589829545856-d10d557cf95f"), PHOTO("photo-1591189863430-ab87e120f312")],
    highlights: [
      { title: "Serviços públicos", text: "Atendimento ao cidadão com prontidão, transparência e escala." },
      { title: "Políticas orientadas a dados", text: "Instrumentação de indicadores, avaliação de impacto e simulações." },
      { title: "Capacidades nacionais", text: "Soberania tecnológica em setores estratégicos." },
    ],
  },
  society: {
    title: "Society",
    subtitle: "Para Pessoas",
    text: "O conjunto de indivíduos, comunidades e organizações que orientam os valores, prioridades e necessidades que impulsionam o progresso.",
    image: rigsSociety.url,
    gallery: [PHOTO("photo-1529156069898-49953e39b3ac"), PHOTO("photo-1517649763962-0c623066013b"), PHOTO("photo-1509099836639-18ba1795216d")],
    highlights: [
      { title: "Acesso", text: "Democratização de ferramentas de conhecimento, saúde e produtividade." },
      { title: "Cidadania digital", text: "Educação, participação e proteção em ambientes conectados." },
      { title: "Bem-estar", text: "Tecnologias que reforçam laços comunitários e qualidade de vida." },
    ],
  },
};

void rigsResearch; void rigsIndustry; void rigsGov; void rigsSociety;

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
  const d = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden pt-24">
        <img src={d.image} alt={d.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
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

      <footer className="dark bg-background py-16 text-foreground">
        <div className="mx-auto max-w-7xl px-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Aura — For humanity, to the stars.
        </div>
      </footer>
    </div>
  );
}
