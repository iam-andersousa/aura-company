import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GitMerge, LineChart, Users, Megaphone, Workflow, Target, Headphones, Repeat } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import gradient1 from "@/assets/aura-gradient-1.png.asset.json";

export const Route = createFileRoute("/solucoes/midas")({
  head: () => ({
    meta: [
      { title: "Midas — RevOps & Operações Comerciais — Aura" },
      { name: "description", content: "Midas: plataforma de RevOps com visão holística de leads e clientes, integração com CRMs, Ads e pipelines de vendas." },
    ],
  }),
  component: MidasPage,
});

const pillars = [
  { icon: Target, title: "RevOps unificado", text: "Marketing, Vendas e Customer Success operando como uma única função de receita, com indicadores compartilhados e governança comum." },
  { icon: Users, title: "Visão holística do cliente", text: "Um único registro vivo por lead e cliente — comportamento, contexto, histórico, propensão e LTV — disponível em toda a jornada." },
  { icon: GitMerge, title: "Integração entre sistemas", text: "Conectores nativos com HubSpot, Salesforce, Pipedrive, RD Station, Google e Meta Ads, LinkedIn, segmentação, BI e data warehouses." },
  { icon: Workflow, title: "Pipelines inteligentes", text: "Qualificação, priorização e roteamento automatizados; cadências adaptativas; previsão de fechamento em tempo real." },
  { icon: Megaphone, title: "Operações de marketing", text: "Atribuição multi-touch, gestão de campanhas, otimização de mídia paga e geração de pipeline previsível." },
  { icon: LineChart, title: "Acompanhamento e forecast", text: "Painéis executivos, alertas proativos e cenários de receita combinando dados operacionais e financeiros." },
  { icon: Repeat, title: "Follow-up automatizado", text: "Sequências personalizadas por estágio, canal e perfil — com sugestões de mensagem baseadas no contexto da conta." },
  { icon: Headphones, title: "Customer Success orientado a dados", text: "Health score, riscos de churn, oportunidades de expansão e playbooks acionáveis para o time de CS." },
];

function MidasPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />


      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
        <div
          className="absolute inset-0 -z-10 opacity-50"
          style={{ backgroundImage: `url(${gradient1.url})`, backgroundSize: "cover" }}
        />
        <div className="absolute inset-0 -z-10 bg-background/70" />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Solução · Área Comercial</span>
          <h1 className="mt-4 font-heading text-4xl font-medium sm:text-6xl">Midas</h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
            A plataforma de RevOps da Aura. Uma visão holística de leads e clientes que integra CRMs,
            mídia paga, pipelines de vendas, follow-up e operações de marketing, vendas e customer
            success — em um único sistema.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/entrar" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">
              Falar com vendas <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#pilares" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium transition hover:bg-accent">
              Como funciona
            </a>
          </div>
        </div>
      </section>

      <section id="pilares" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Pilares</span>
          <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">Tudo o que sua operação de receita precisa.</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="rounded-3xl border border-border bg-card p-6">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <h3 className="mt-4 font-heading text-lg font-medium">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Integrações</span>
          <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">Conectado ao seu stack atual.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">
            CRMs, ferramentas de mídia, plataformas de engajamento e data warehouses — o Midas
            conversa com tudo o que sua operação já usa.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["HubSpot", "Salesforce", "Pipedrive", "RD Station", "Google Ads", "Meta Ads", "LinkedIn Ads", "Snowflake", "BigQuery", "Segment", "Slack", "Zapier"].map((n) => (
              <div key={n} className="rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground">{n}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
