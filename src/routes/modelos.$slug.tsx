import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Cpu, Gauge, Zap, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

import pAristoteles from "@/assets/product-aristoteles.jpg";
import pHerodotus from "@/assets/product-herodotus.jpg";
import pPythagoras from "@/assets/product-pythagoras.jpg";
import pArchimedes from "@/assets/product-archimedes.jpg";

type Model = {
  slug: string;
  name: string;
  tag: string;
  tagline: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
  capabilities: string[];
  benchmarks: { name: string; aura: number; opus: number; sonnet: number; haiku: number; gpt: number; gemini: number; fable: number; mythos: number }[];
};

const MODELS: Record<string, Model> = {
  aristoteles: {
    slug: "aristoteles",
    name: "Aristoteles",
    tag: "Raciocínio & Decisão",
    tagline: "Lógica, análise crítica e pensamento estruturado.",
    description:
      "Modelo da Aura especializado em raciocínio lógico, análise crítica, tomada de decisão e resolução estruturada de problemas. Projetado para apoiar atividades que exigem coerência, argumentação rigorosa e pensamento estratégico de longo prazo.",
    image: pAristoteles,
    specs: [
      { label: "Parâmetros", value: "320B" },
      { label: "Contexto", value: "512k tokens" },
      { label: "Latência média", value: "320 ms" },
      { label: "Treinamento", value: "Multilíngue (96 idiomas)" },
    ],
    capabilities: [
      "Raciocínio dedutivo e indutivo de múltiplas etapas",
      "Argumentação estruturada e análise crítica",
      "Tomada de decisão sob incerteza",
      "Planejamento estratégico de longo horizonte",
    ],
    benchmarks: [
      { name: "MMLU-Pro", aura: 92, opus: 88, sonnet: 84, haiku: 76, gpt: 89, gemini: 87, fable: 81, mythos: 79 },
      { name: "GPQA Diamond", aura: 78, opus: 74, sonnet: 68, haiku: 55, gpt: 76, gemini: 72, fable: 64, mythos: 60 },
      { name: "ARC Reasoning", aura: 89, opus: 85, sonnet: 81, haiku: 70, gpt: 86, gemini: 83, fable: 76, mythos: 73 },
    ],
  },
  herodotus: {
    slug: "herodotus",
    name: "Herodotus",
    tag: "História & Geopolítica",
    tagline: "Compreensão histórica, geopolítica e cultural.",
    description:
      "Modelo especializado em história, geopolítica, relações internacionais, cultura e ciências humanas. Treinado para compreender processos históricos, fenômenos sociais e contextos institucionais complexos com profundidade narrativa.",
    image: pHerodotus,
    specs: [
      { label: "Parâmetros", value: "260B" },
      { label: "Contexto", value: "1M tokens" },
      { label: "Latência média", value: "380 ms" },
      { label: "Treinamento", value: "Multilíngue (110 idiomas)" },
    ],
    capabilities: [
      "Análise de processos históricos complexos",
      "Cenários geopolíticos e relações internacionais",
      "Síntese cultural e antropológica",
      "Construção narrativa em larga escala",
    ],
    benchmarks: [
      { name: "Humanities QA", aura: 94, opus: 87, sonnet: 82, haiku: 73, gpt: 88, gemini: 86, fable: 89, mythos: 84 },
      { name: "Long-Context Recall", aura: 96, opus: 90, sonnet: 84, haiku: 68, gpt: 91, gemini: 93, fable: 80, mythos: 76 },
      { name: "Cultural Reasoning", aura: 90, opus: 83, sonnet: 78, haiku: 65, gpt: 85, gemini: 82, fable: 86, mythos: 81 },
    ],
  },
  pythagoras: {
    slug: "pythagoras",
    name: "Pythagoras",
    tag: "Matemática & Análise",
    tagline: "Precisão analítica e raciocínio matemático.",
    description:
      "Modelo da Aura especializado em matemática, estatística, lógica aplicada, modelagem quantitativa e análise formal. Projetado para tarefas que exigem precisão analítica e raciocínio matemático avançado.",
    image: pPythagoras,
    specs: [
      { label: "Parâmetros", value: "180B" },
      { label: "Contexto", value: "256k tokens" },
      { label: "Latência média", value: "210 ms" },
      { label: "Treinamento", value: "Especializado em STEM" },
    ],
    capabilities: [
      "Demonstrações matemáticas formais",
      "Modelagem estatística e probabilística",
      "Otimização e métodos numéricos",
      "Análise simbólica e algébrica",
    ],
    benchmarks: [
      { name: "MATH", aura: 91, opus: 80, sonnet: 74, haiku: 60, gpt: 86, gemini: 84, fable: 72, mythos: 68 },
      { name: "AIME 2025", aura: 88, opus: 72, sonnet: 64, haiku: 48, gpt: 82, gemini: 79, fable: 60, mythos: 55 },
      { name: "GSM-Hard", aura: 95, opus: 89, sonnet: 84, haiku: 73, gpt: 92, gemini: 90, fable: 82, mythos: 78 },
    ],
  },
  archimedes: {
    slug: "archimedes",
    name: "Archimedes",
    tag: "Engenharia & Sistemas",
    tagline: "Engenharia, código e projetos técnicos.",
    description:
      "Modelo especializado em engenharia, tecnologia, sistemas físicos e resolução de desafios técnicos complexos. Desenvolvido para apoiar projeto, inovação, programação e desenvolvimento tecnológico de ponta.",
    image: pArchimedes,
    specs: [
      { label: "Parâmetros", value: "240B" },
      { label: "Contexto", value: "512k tokens" },
      { label: "Latência média", value: "260 ms" },
      { label: "Treinamento", value: "Código + simulação física" },
    ],
    capabilities: [
      "Geração e refatoração de código em mais de 40 linguagens",
      "Projeto de sistemas e arquiteturas técnicas",
      "Simulação física e análise de engenharia",
      "Resolução estruturada de problemas técnicos",
    ],
    benchmarks: [
      { name: "SWE-Bench Verified", aura: 78, opus: 72, sonnet: 65, haiku: 48, gpt: 74, gemini: 70, fable: 60, mythos: 56 },
      { name: "HumanEval+", aura: 95, opus: 91, sonnet: 87, haiku: 76, gpt: 93, gemini: 90, fable: 82, mythos: 79 },
      { name: "Engineering QA", aura: 89, opus: 82, sonnet: 77, haiku: 65, gpt: 84, gemini: 81, fable: 74, mythos: 70 },
    ],
  },
};

export const Route = createFileRoute("/modelos/$slug")({
  loader: ({ params }) => {
    const model = MODELS[params.slug];
    if (!model) throw notFound();
    return { model };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.model.name} — Modelos Aura` },
          { name: "description", content: loaderData.model.tagline },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="font-heading text-3xl">Modelo não encontrado</h1>
        <Link to="/" className="mt-4 inline-block text-sm underline">Voltar para o início</Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <p>Não foi possível carregar o modelo.</p>
    </div>
  ),
  component: ModelDetail,
});

const COMPETITORS = [
  { key: "aura", label: "Aura", accent: true },
  { key: "opus", label: "Claude Opus" },
  { key: "sonnet", label: "Claude Sonnet" },
  { key: "haiku", label: "Claude Haiku" },
  { key: "gpt", label: "ChatGPT" },
  { key: "gemini", label: "Gemini" },
  { key: "fable", label: "Claude Fable" },
  { key: "mythos", label: "Mythos" },
] as const;

function ModelDetail() {
  const { model } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 glass-nav">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <span className="font-heading text-sm font-medium">Modelo {model.name}</span>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24 text-center">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">{model.tag}</span>
        <h1 className="mt-3 font-heading text-4xl font-medium sm:text-5xl">{model.name}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">{model.tagline}</p>

        <div className="mx-auto mt-12 aspect-square max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
          <img src={model.image} alt={model.name} className="h-full w-full object-cover" />
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-balance text-base leading-relaxed text-muted-foreground">
          {model.description}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Teste agora <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Specs */}
        <section className="mt-20 text-left">
          <h2 className="font-heading text-center text-2xl font-medium sm:text-3xl">Características gerais</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {model.specs.map((s, i) => {
              const icons = [Cpu, Gauge, Zap, BookOpen];
              const Icon = icons[i % icons.length];
              return (
                <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
                  <p className="mt-1 font-heading text-xl font-medium">{s.value}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Capabilities */}
        <section className="mt-20 text-left">
          <h2 className="font-heading text-center text-2xl font-medium sm:text-3xl">Capacidades</h2>
          <ul className="mx-auto mt-8 max-w-3xl divide-y divide-border border-y border-border">
            {model.capabilities.map((c, i) => (
              <li key={c} className="flex items-baseline gap-5 py-5">
                <span className="font-heading text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-base text-foreground">{c}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Benchmarks */}
        <section className="mt-20">
          <h2 className="font-heading text-2xl font-medium sm:text-3xl">Benchmarks</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            Performance comparada do {model.name} em relação a outros modelos de fronteira.
          </p>

          <div className="mt-10 space-y-10">
            {model.benchmarks.map((b) => {
              const max = Math.max(...COMPETITORS.map((c) => b[c.key as keyof typeof b] as number));
              return (
                <div key={b.name} className="rounded-3xl border border-border bg-card p-6 text-left sm:p-8">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-heading text-lg font-medium">{b.name}</h3>
                    <span className="text-xs text-muted-foreground">0 — 100</span>
                  </div>
                  <div className="mt-6 space-y-3">
                    {COMPETITORS.map((c) => {
                      const v = b[c.key as keyof typeof b] as number;
                      const pct = (v / 100) * 100;
                      return (
                        <div key={c.key} className="grid grid-cols-[120px_1fr_42px] items-center gap-3">
                          <span className={`text-xs ${c.accent ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                            {c.label}
                          </span>
                          <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <div
                              className={c.accent ? "h-full rounded-full bg-foreground" : "h-full rounded-full bg-muted-foreground/50"}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className={`text-right text-xs tabular-nums ${v === max ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                            {v}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Aura — For humanity, to the stars.
        </div>
      </footer>
    </div>
  );
}
