import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import mktEdu from "@/assets/market-education.jpg.asset.json";
import mktHealth from "@/assets/market-health.jpg.asset.json";
import mktLaw from "@/assets/market-law.jpg.asset.json";
import mktAcc from "@/assets/market-accounting.jpg.asset.json";
import mktBiz from "@/assets/market-business.jpg.asset.json";

export const MARKETS: Record<string, { title: string; subtitle: string; text: string; image: string }> = {
  educacao: {
    title: "Educação",
    subtitle: "Aprendizado personalizado em escala",
    text: "Plataformas inteligentes que personalizam trilhas de aprendizado, ampliam o alcance de bons professores e reduzem lacunas de conhecimento em todos os níveis — do ensino básico à pós-graduação.",
    image: mktEdu.url,
  },
  saude: {
    title: "Saúde",
    subtitle: "Cuidado ampliado por inteligência",
    text: "Diagnóstico assistido, medicina de precisão, gestão clínica e apoio à decisão médica para ampliar o alcance e a qualidade do cuidado humano em hospitais, clínicas e sistemas públicos.",
    image: mktHealth.url,
  },
  direito: {
    title: "Direito",
    subtitle: "Análise jurídica assistida",
    text: "Pesquisa jurisprudencial, revisão de contratos, due diligence e produção de peças com rigor e rastreabilidade — potencializando escritórios, departamentos jurídicos e tribunais.",
    image: mktLaw.url,
  },
  contabilidade: {
    title: "Contabilidade",
    subtitle: "Precisão e conformidade automatizadas",
    text: "Classificação contábil, conciliação, apuração fiscal e relatórios gerenciais assistidos por IA — liberando profissionais para análise estratégica e consultoria de valor.",
    image: mktAcc.url,
  },
  negocios: {
    title: "Negócios",
    subtitle: "Decisão executiva orientada a dados",
    text: "Inteligência de mercado, planejamento estratégico, análise financeira e apoio à tomada de decisão para empresas de todos os portes — do fundador ao conselho.",
    image: mktBiz.url,
  },
};

export const Route = createFileRoute("/mercados/$slug")({
  loader: ({ params }) => {
    const d = MARKETS[params.slug];
    if (!d) throw notFound();
    return { ...d, slug: params.slug };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Mercados — Aura` },
          { name: "description", content: loaderData.text.slice(0, 160) },
        ]
      : [{ title: "Mercados — Aura" }],
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
  component: MercadoSlugPage,
});

function MercadoSlugPage() {
  const d = Route.useLoaderData();
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
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center text-white">
          <h1 className="font-heading text-5xl font-medium sm:text-6xl">{d.title}</h1>
          <p className="mt-3 text-lg text-white/85">{d.subtitle}</p>
          <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">{d.text}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/entrar" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-white/90">
              Saiba mais <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">O que muda</span>
          <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">Aplicações práticas</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Produtividade", text: `Automação de rotinas repetitivas em ${d.title.toLowerCase()}, liberando tempo para o trabalho de maior valor.` },
            { title: "Qualidade", text: `Padronização, revisão e checagem contínua reduzem erros críticos no setor de ${d.title.toLowerCase()}.` },
            { title: "Escala", text: `Ampliação do alcance de bons profissionais e boas práticas em ${d.title.toLowerCase()}.` },
          ].map((h) => (
            <div key={h.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-medium">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="overflow-hidden rounded-2xl border border-border sm:col-span-2 aspect-[16/9]">
            <img src={d.image} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="grid gap-3">
            <div className="overflow-hidden rounded-2xl border border-border aspect-square">
              <img src={`https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&q=80&auto=format&fit=crop`} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-border aspect-square">
              <img src={`https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80&auto=format&fit=crop`} alt="" className="h-full w-full object-cover" />
            </div>
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
