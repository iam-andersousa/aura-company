import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import rigsResearch from "@/assets/rigs-research.png.asset.json";
import rigsIndustry from "@/assets/rigs-industry.png.asset.json";
import rigsGov from "@/assets/rigs-government.png.asset.json";
import rigsSociety from "@/assets/rigs-society.png.asset.json";
import mktEdu from "@/assets/market-education.jpg.asset.json";
import mktBiz from "@/assets/market-business.jpg.asset.json";
import mktLaw from "@/assets/market-law.jpg.asset.json";
import mktHealth from "@/assets/market-health.jpg.asset.json";

const DATA: Record<string, { title: string; subtitle: string; text: string; image: string }> = {
  research: {
    title: "Research",
    subtitle: "Para Universidades",
    text: "A produção de conhecimento científico, tecnológico e intelectual. Universidades, centros de pesquisa, laboratórios e instituições dedicadas à descoberta compõem a base sobre a qual se constroem os avanços de longo prazo. É onde nascem hipóteses, teorias, experimentos e ideias que redefinem o que é possível.",
    image: mktEdu.url,
  },
  industry: {
    title: "Industry",
    subtitle: "Para Empresas",
    text: "A transformação do conhecimento em soluções, produtos, serviços e desenvolvimento econômico. A capacidade produtiva e inovadora da sociedade — empresas, startups e organizações que convertem descoberta em valor prático e escalável para pessoas, mercados e nações.",
    image: mktBiz.url,
  },
  government: {
    title: "Government",
    subtitle: "Para Governos",
    text: "A coordenação institucional necessária para garantir estabilidade, planejamento estratégico, investimento público e desenvolvimento de capacidades nacionais. Governos definem regras, incentivos, prioridades e visão de longo prazo que orientam o esforço coletivo em direção ao progresso.",
    image: mktLaw.url,
  },
  society: {
    title: "Society",
    subtitle: "Para Pessoas",
    text: "O conjunto de indivíduos, comunidades e organizações que orientam os valores, prioridades e necessidades que impulsionam o progresso. É a sociedade que legitima, direciona e se beneficia de tudo o que é construído — o propósito último de qualquer avanço.",
    image: rigsSociety.url,
  },
};

// keep asset imports referenced
void rigsResearch; void rigsIndustry; void rigsGov;

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
