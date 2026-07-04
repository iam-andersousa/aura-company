import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

type Product = {
  slug: string;
  name: string;
  kicker: string;
  tagline: string;
  intro: string;
  paragraphs: string[];
  image: string;
  gallery: string[];
  features: { title: string; text: string }[];
  audience: string[];
};

const PHOTO = (id: string) =>
  `https://images.unsplash.com/${id}?w=1600&q=80&auto=format&fit=crop`;

export const PRODUCTS: Record<string, Product> = {
  vector: {
    slug: "vector",
    name: "Vector",
    kicker: "Front-office",
    tagline: "A plataforma de crescimento para times que falam com o mercado.",
    intro:
      "Vector unifica marketing, vendas, atendimento e customer success em um único sistema inteligente — do primeiro toque à retenção.",
    paragraphs: [
      "Chega de dados fragmentados entre CRM, automações, help desk e ferramentas de campanha. Vector consolida a jornada inteira do cliente em uma visão contínua, em tempo real.",
      "Com inteligência aplicada em cada etapa do funil, seu time ganha contexto, foco e velocidade — e cada interação com o mercado se torna uma decisão informada.",
    ],
    image: PHOTO("photo-1552664730-d307ca884978"),
    gallery: [
      PHOTO("photo-1553877522-43269d4ea984"),
      PHOTO("photo-1556761175-5973dc0f32e7"),
      PHOTO("photo-1521737604893-d14cc237f11d"),
    ],
    features: [
      { title: "CRM inteligente", text: "Roteamento, priorização e enriquecimento automático de leads e contas." },
      { title: "Campanhas assistidas", text: "Criação, segmentação e otimização de campanhas multicanal com IA." },
      { title: "Atendimento omnichannel", text: "Central única de tickets, chats, e-mail e voz com respostas sugeridas." },
      { title: "Sucesso do cliente", text: "Health score, churn preditivo e playbooks acionáveis." },
    ],
    audience: [
      "Times de Marketing",
      "Times de Vendas",
      "Times de Atendimento",
      "Times de Customer Success",
    ],
  },
  axis: {
    slug: "axis",
    name: "Axis",
    kicker: "Back-office",
    tagline: "O sistema operacional para as engrenagens da sua empresa.",
    intro:
      "Axis entrega soluções integradas de Finanças, Contabilidade, RH, TI, Logística e Operações — automatizando rotinas críticas e liberando pessoas para o trabalho de maior valor.",
    paragraphs: [
      "As operações internas concentram grande parte do custo e do risco corporativo. Axis coordena essas áreas em um mesmo tecido de dados, com controles auditáveis e automações confiáveis.",
      "De conciliações contábeis a fluxos de admissão, do inventário logístico ao provisionamento de infraestrutura de TI, cada processo passa a operar com precisão e previsibilidade.",
    ],
    image: PHOTO("photo-1454165804606-c3d57bc86b40"),
    gallery: [
      PHOTO("photo-1450101499163-c8848c66ca85"),
      PHOTO("photo-1521791136064-7986c2920216"),
      PHOTO("photo-1560179707-f14e90ef3623"),
    ],
    features: [
      { title: "Financeiro & Contábil", text: "Fluxo de caixa, contas a pagar/receber, apuração e relatórios gerenciais." },
      { title: "Recursos Humanos", text: "Ciclo completo do colaborador — atração, admissão, folha e desenvolvimento." },
      { title: "TI & Segurança", text: "Gestão de ativos, acessos, endpoints e conformidade contínua." },
      { title: "Logística & Operações", text: "Inventário, malha logística e planejamento de suprimentos." },
    ],
    audience: [
      "Diretoria financeira",
      "Contabilidade e Fiscal",
      "RH e Departamento Pessoal",
      "TI, Logística e Operações",
    ],
  },
  pulse: {
    slug: "pulse",
    name: "Pulse",
    kicker: "Saúde & Bem-estar",
    tagline: "Inteligência dedicada ao cuidado, do consultório ao hospital.",
    intro:
      "Pulse conecta hospitais, laboratórios, clínicas, farmácias, profissionais autônomos e pacientes em um ecossistema seguro e centrado em desfechos clínicos.",
    paragraphs: [
      "Prontuários unificados, apoio à decisão clínica, agendamento inteligente e continuidade do cuidado — tudo com rastreabilidade, privacidade e conformidade com a LGPD e normas do setor.",
      "Da medicina especializada ao acompanhamento nutricional, do laboratório à terapia, Pulse amplia o alcance dos profissionais de saúde e bem-estar sem substituir o cuidado humano.",
    ],
    image: PHOTO("photo-1576091160399-112ba8d25d1d"),
    gallery: [
      PHOTO("photo-1519494026892-80bbd2d6fd0d"),
      PHOTO("photo-1579684385127-1ef15d508118"),
      PHOTO("photo-1512069772995-ec65ed45afd6"),
    ],
    features: [
      { title: "Prontuário eletrônico", text: "Histórico clínico unificado, seguro e acessível entre unidades." },
      { title: "Apoio à decisão clínica", text: "Sugestões baseadas em evidência, alertas e checklists dinâmicos." },
      { title: "Agenda & telemedicina", text: "Marcação inteligente, lembretes e consultas remotas integradas." },
      { title: "Bem-estar & prevenção", text: "Programas personalizados para nutrição, atividade física e saúde mental." },
    ],
    audience: [
      "Hospitais e clínicas",
      "Laboratórios e farmácias",
      "Médicos e terapeutas",
      "Personal trainers e psicólogos",
    ],
  },
  genius: {
    slug: "genius",
    name: "Genius",
    kicker: "Educação",
    tagline: "Um hub de aprendizado para todas as etapas do conhecimento.",
    intro:
      "Genius reúne alunos, professores, escolas, universidades e pesquisadores em um ambiente vivo para aulas, imersões, validação de conhecimento e produção acadêmica.",
    paragraphs: [
      "Trilhas de aprendizado personalizadas, avaliações adaptativas, coautoria com IA e acompanhamento pedagógico permitem que cada estudante avance no seu próprio ritmo, com apoio contínuo.",
      "Instituições ganham visibilidade sobre o desempenho, criam experiências imersivas e conectam pesquisa e sala de aula em um mesmo espaço.",
    ],
    image: PHOTO("photo-1523240795612-9a054b0db644"),
    gallery: [
      PHOTO("photo-1509062522246-3755977927d7"),
      PHOTO("photo-1503676260728-1c00da094a0b"),
      PHOTO("photo-1524178232363-1fb2b075b655"),
    ],
    features: [
      { title: "Trilhas adaptativas", text: "Personalização por objetivos, pré-requisitos e estilo de aprendizado." },
      { title: "Validação de conhecimento", text: "Provas, projetos e certificações com correção assistida por IA." },
      { title: "Aulas & imersões", text: "Salas ao vivo, gravações interativas e simulações realistas." },
      { title: "Pesquisa acadêmica", text: "Revisão de literatura, escrita assistida e análise de dados." },
    ],
    audience: [
      "Escolas e universidades",
      "Professores e coordenadores",
      "Estudantes de todas as etapas",
      "Grupos de pesquisa",
    ],
  },
  codex: {
    slug: "codex",
    name: "Codex",
    kicker: "Direito",
    tagline: "Inteligência jurídica para todo o ciclo de processos e operações.",
    intro:
      "Codex apoia advogados, escritórios, departamentos jurídicos, estudantes e cidadãos em cada etapa da atividade jurídica — da pesquisa à execução.",
    paragraphs: [
      "Pesquisa jurisprudencial contextual, revisão inteligente de contratos, produção assistida de peças e monitoramento processual em tempo real, com rastreabilidade completa.",
      "Codex respeita o sigilo profissional, mantém as decisões em mãos humanas e amplia a capacidade analítica de quem atua no Direito, público ou privado.",
    ],
    image: PHOTO("photo-1589829545856-d10d557cf95f"),
    gallery: [
      PHOTO("photo-1450101499163-c8848c66ca85"),
      PHOTO("photo-1521791055366-0d553872125f"),
      PHOTO("photo-1505664194779-8beaceb93744"),
    ],
    features: [
      { title: "Pesquisa jurisprudencial", text: "Busca semântica em leis, súmulas e decisões, com citação verificada." },
      { title: "Revisão de contratos", text: "Análise de riscos, cláusulas críticas e padronização documental." },
      { title: "Produção de peças", text: "Rascunhos assistidos, controle de versões e trilha de auditoria." },
      { title: "Gestão de processos", text: "Andamentos, prazos e alertas integrados ao seu fluxo." },
    ],
    audience: [
      "Advogados e escritórios",
      "Departamentos jurídicos",
      "Estudantes de Direito",
      "População civil e setor público",
    ],
  },
};

export const Route = createFileRoute("/produtos/$slug")({
  loader: ({ params }) => {
    const p = PRODUCTS[params.slug];
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — ${loaderData.kicker} — Aura` },
          { name: "description", content: loaderData.intro.slice(0, 160) },
          { property: "og:title", content: `${loaderData.name} — Aura` },
          { property: "og:description", content: loaderData.intro.slice(0, 160) },
          { property: "og:image", content: loaderData.image },
        ]
      : [{ title: "Produtos — Aura" }],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <Link to="/" className="text-sm underline">Voltar</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <p>Erro ao carregar.</p>
    </div>
  ),
  component: ProdutoPage,
});

function ProdutoPage() {
  const p = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" /> {p.kicker}
              </span>
              <h1 className="mt-5 font-heading text-5xl font-medium leading-[1.05] sm:text-6xl">{p.name}</h1>
              <p className="mt-5 text-lg text-muted-foreground">{p.tagline}</p>
              <p className="mt-6 text-base leading-relaxed text-foreground/80">{p.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/entrar" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">
                  Testar agora <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/docs/$slug" params={{ slug: p.slug }} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium transition hover:bg-accent">
                  Documentação
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Paragraphs */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          {p.paragraphs.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="border-y border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Funcionalidades</span>
            <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">O que {p.name} entrega</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-medium">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience + gallery */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Para quem</span>
            <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">Feito para toda a operação</h2>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {p.audience.map((a, i) => (
                <li key={a} className="flex items-baseline gap-5 py-4">
                  <span className="font-heading text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg text-foreground">{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {p.gallery.map((g, i) => (
              <div key={g} className={`overflow-hidden rounded-2xl border border-border ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}>
                <img src={g} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <h2 className="font-heading text-3xl font-medium sm:text-4xl">Pronto para colocar {p.name} em produção?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Comece agora ou fale com nosso time para uma demonstração guiada.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/cadastrar" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">
            Criar conta <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/chat" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium transition hover:bg-accent">
            Falar com um modelo
          </Link>
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
