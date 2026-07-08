import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import mktEdu from "@/assets/market-education.jpg.asset.json";
import mktHealth from "@/assets/market-health.jpg.asset.json";
import mktLaw from "@/assets/market-law.jpg.asset.json";
import mktAcc from "@/assets/market-accounting.jpg.asset.json";
import mktBiz from "@/assets/market-business.jpg.asset.json";

const PHOTO = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

type MarketData = {
  title: string;
  subtitle: string;
  text: string;
  image: string;
  examples: { title: string; text: string }[];
  audience: string[];
  gallery: string[];
};

export const MARKETS: Record<string, MarketData> = {
  educacao: {
    title: "Educação",
    subtitle: "Aprendizado personalizado em escala",
    text: "Plataformas inteligentes que personalizam trilhas de aprendizado, ampliam o alcance de bons professores e reduzem lacunas de conhecimento em todos os níveis — do ensino básico à pós-graduação.",
    image: mktEdu.url,
    examples: [
      { title: "Trilhas adaptativas", text: "Currículos que se ajustam ao ritmo, estilo e nível de cada aluno, sugerindo revisões e desafios no momento certo — como um tutor particular disponível 24/7." },
      { title: "Correção assistida", text: "Redações, provas dissertativas e exercícios corrigidos com rubricas transparentes, devolvendo tempo ao professor para acompanhar casos que realmente exigem atenção humana." },
      { title: "Simulados e imersões", text: "Ambientes de estudo com simulação de vestibulares, ENEM, OAB, residências médicas e concursos, com análise de desempenho e plano de recuperação." },
      { title: "Pesquisa acadêmica", text: "Revisão de literatura, síntese de artigos, formatação em normas ABNT/APA e apoio na estruturação de dissertações e teses." },
      { title: "Formação corporativa", text: "Programas de onboarding, requalificação e educação continuada para empresas, com trilhas por cargo, avaliações e certificação." },
      { title: "Acessibilidade", text: "Transcrição automática, tradução em tempo real e adaptação de materiais para estudantes com deficiência visual, auditiva ou dificuldades específicas de aprendizagem." },
    ],
    audience: ["Universidades e faculdades", "Escolas de ensino básico e médio", "Cursos preparatórios", "Plataformas EdTech", "Departamentos de T&D", "Pesquisadores"],
    gallery: [PHOTO("photo-1523240795612-9a054b0db644"), PHOTO("photo-1509062522246-3755977927d7"), PHOTO("photo-1427504494785-3a9ca7044f45")],
  },
  saude: {
    title: "Saúde",
    subtitle: "Cuidado ampliado por inteligência",
    text: "Diagnóstico assistido, medicina de precisão, gestão clínica e apoio à decisão médica para ampliar o alcance e a qualidade do cuidado humano em hospitais, clínicas e sistemas públicos.",
    image: mktHealth.url,
    examples: [
      { title: "Prontuário inteligente", text: "Sumários clínicos, evolução médica e cartas de alta gerados a partir de anamnese e exames, com rastreabilidade total de citações." },
      { title: "Triagem e pré-diagnóstico", text: "Classificação de urgência em pronto atendimento e triagem inicial em telemedicina, sempre com médico como responsável final pela decisão." },
      { title: "Análise de imagens", text: "Suporte a laudos radiológicos, dermatológicos e patológicos, sinalizando achados relevantes e sugerindo comparações com exames anteriores." },
      { title: "Medicina de precisão", text: "Cruzamento de histórico, exames, genética e literatura médica atualizada para personalizar condutas terapêuticas." },
      { title: "Gestão hospitalar", text: "Otimização de escalas, ocupação de leitos, previsão de demanda e conciliação de faturamento com convênios." },
      { title: "Farmacovigilância", text: "Monitoramento de interações medicamentosas, alergias e efeitos adversos em tempo real durante a prescrição." },
    ],
    audience: ["Hospitais e redes de saúde", "Clínicas e consultórios", "Laboratórios", "Operadoras de saúde", "Farmácias", "Profissionais autônomos e telemedicina"],
    gallery: [PHOTO("photo-1579684385127-1ef15d508118"), PHOTO("photo-1516549655169-df83a0774514"), PHOTO("photo-1551076805-e1869033e561")],
  },
  direito: {
    title: "Direito",
    subtitle: "Análise jurídica assistida",
    text: "Pesquisa jurisprudencial, revisão de contratos, due diligence e produção de peças com rigor e rastreabilidade — potencializando escritórios, departamentos jurídicos e tribunais.",
    image: mktLaw.url,
    examples: [
      { title: "Pesquisa de jurisprudência", text: "Localização de precedentes por tribunal, tese e período, com resumo do caso, votação e citações verificáveis." },
      { title: "Revisão contratual", text: "Comparação de minutas com playbooks internos, identificação de cláusulas de risco e sugestão de redações alternativas." },
      { title: "Petições e pareceres", text: "Estruturação de peças processuais, memoriais e pareceres com base em fatos, provas e teses fornecidos pelo advogado." },
      { title: "Due diligence", text: "Análise em massa de contratos, atas, certidões e processos em operações de M&A, com mapa de riscos consolidado." },
      { title: "Compliance e LGPD", text: "Monitoramento regulatório, gestão de políticas internas e resposta a incidentes com trilhas de auditoria." },
      { title: "Atendimento ao cidadão", text: "Explicações em linguagem clara sobre direitos, prazos e procedimentos para uso em defensorias e portais públicos." },
    ],
    audience: ["Escritórios de advocacia", "Departamentos jurídicos", "Tribunais e MP", "Defensorias públicas", "Cartórios", "Estudantes e concurseiros"],
    gallery: [PHOTO("photo-1589994965851-a8f479c573a9"), PHOTO("photo-1450101499163-c8848c66ca85"), PHOTO("photo-1505664194779-8beaceb93744")],
  },
  contabilidade: {
    title: "Contabilidade",
    subtitle: "Precisão e conformidade automatizadas",
    text: "Classificação contábil, conciliação, apuração fiscal e relatórios gerenciais assistidos por IA — liberando profissionais para análise estratégica e consultoria de valor.",
    image: mktAcc.url,
    examples: [
      { title: "Classificação automática", text: "Lançamentos contábeis inferidos a partir de notas fiscais, extratos e boletos, com plano de contas customizado por cliente." },
      { title: "Conciliação bancária", text: "Cruzamento entre razão, extrato e cartões em minutos, apontando divergências e sugerindo ajustes." },
      { title: "Apuração fiscal", text: "SPED, DCTF, EFD, DIRF e obrigações municipais preparadas com verificação de consistência antes da entrega." },
      { title: "Relatórios gerenciais", text: "DRE, fluxo de caixa e KPIs setoriais gerados sob demanda em linguagem executiva para donos e conselheiros." },
      { title: "Consultoria tributária", text: "Análise de regime tributário, oportunidades de créditos e simulações de reforma tributária." },
      { title: "Atendimento ao cliente", text: "Respostas rápidas a dúvidas recorrentes de folha, notas e obrigações, com escalonamento humano quando necessário." },
    ],
    audience: ["Escritórios contábeis", "BPO financeiro", "Departamentos financeiros", "MEIs e pequenas empresas", "Startups", "Auditorias independentes"],
    gallery: [PHOTO("photo-1554224155-6726b3ff858f"), PHOTO("photo-1554224154-26032ffc0d07"), PHOTO("photo-1450101499163-c8848c66ca85")],
  },
  negocios: {
    title: "Negócios",
    subtitle: "Decisão executiva orientada a dados",
    text: "Inteligência de mercado, planejamento estratégico, análise financeira e apoio à tomada de decisão para empresas de todos os portes — do fundador ao conselho.",
    image: mktBiz.url,
    examples: [
      { title: "Inteligência competitiva", text: "Monitoramento de concorrentes, notícias, patentes e movimentos de mercado consolidados em briefings executivos." },
      { title: "Planejamento estratégico", text: "Construção de OKRs, cenários e roadmaps a partir de metas, restrições e histórico da empresa." },
      { title: "Análise financeira", text: "Modelos de valuation, projeções de fluxo de caixa e análise de investimentos com premissas transparentes e ajustáveis." },
      { title: "Vendas e CRM", text: "Enriquecimento de leads, priorização de pipeline, resumo de reuniões e follow-ups gerados a partir de gravações." },
      { title: "Atendimento e sucesso", text: "Assistentes que resolvem dúvidas em primeiro nível, priorizam filas e identificam risco de churn." },
      { title: "Governança e conselho", text: "Preparação de atas, dossiês e materiais para reuniões de conselho, com síntese de indicadores por área." },
    ],
    audience: ["Founders e C-level", "Consultorias", "Times comerciais e RevOps", "Áreas de estratégia e M&A", "Conselhos e board advisors", "PMEs em crescimento"],
    gallery: [PHOTO("photo-1552664730-d307ca884978"), PHOTO("photo-1600880292203-757bb62b4baf"), PHOTO("photo-1521737604893-d14cc237f11d")],
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
  const d = Route.useLoaderData() as MarketData & { slug: string };
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
          <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">Exemplos práticos em {d.title.toLowerCase()}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">Aplicações reais que já estão redefinindo o dia a dia dos profissionais do setor.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {d.examples.map((h) => (
            <div key={h.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-medium">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Para quem</span>
              <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">Quem se beneficia</h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Ferramentas modulares que se adaptam ao porte, à maturidade tecnológica e às restrições regulatórias de cada organização em {d.title.toLowerCase()}.
              </p>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {d.audience.map((a) => (
                <li key={a} className="flex items-center gap-3 py-4">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-base text-foreground">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="overflow-hidden rounded-2xl border border-border sm:col-span-2 aspect-[16/9]">
            <img src={d.image} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="grid gap-3">
            {d.gallery.slice(0, 2).map((g) => (
              <div key={g} className="overflow-hidden rounded-2xl border border-border aspect-square">
                <img src={g} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          {d.gallery[2] && (
            <div className="overflow-hidden rounded-2xl border border-border sm:col-span-3 aspect-[21/9]">
              <img src={d.gallery[2]} alt="" className="h-full w-full object-cover" />
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
