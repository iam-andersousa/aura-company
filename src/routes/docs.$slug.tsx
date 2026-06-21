import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Code2, Plug, Github, BookOpen, KeyRound, Server } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAMES: Record<string, string> = {
  aristoteles: "Aristoteles",
  herodotus: "Herodotus",
  pythagoras: "Pythagoras",
  archimedes: "Archimedes",
};

export const Route = createFileRoute("/docs/$slug")({
  loader: ({ params }) => {
    const name = NAMES[params.slug];
    if (!name) throw notFound();
    return { name, slug: params.slug };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `Docs — ${loaderData.name} — Aura` }] : [],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <Link to="/" className="text-sm underline">Voltar para o início</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <p>Erro ao carregar documentação.</p>
    </div>
  ),
  component: DocsPage,
});

function DocsPage() {
  const { name, slug } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 glass-nav">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/modelos/$slug" params={{ slug }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar ao modelo
          </Link>
          <span className="font-heading text-sm font-medium">Docs — {name}</span>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Documentação Técnica</span>
        <h1 className="mt-3 font-heading text-4xl font-medium sm:text-5xl">{name} API</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Tudo o que você precisa para integrar o modelo {name} aos seus produtos: endpoints, autenticação, plug-ins e repositórios oficiais.
        </p>

        {/* Quick links */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Code2, label: "Referência da API" },
            { icon: Plug, label: "Plug-ins oficiais" },
            { icon: Github, label: "Repositório" },
            { icon: BookOpen, label: "Guia rápido" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-5">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <p className="mt-3 font-heading text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Endpoint */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-medium">Endpoint base</h2>
          <pre className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card p-5 text-sm">
            <code>{`POST https://api.aura.ai/v1/${slug}/completions
Authorization: Bearer <AURA_API_KEY>
Content-Type: application/json`}</code>
          </pre>
        </section>

        {/* Auth */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-medium">Autenticação</h2>
          <div className="mt-4 flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
            <KeyRound className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Gere uma chave em <span className="text-foreground">Conta → API Keys</span> e envie no cabeçalho <code className="rounded bg-muted px-1.5 py-0.5">Authorization</code>.
            </p>
          </div>
        </section>

        {/* Example */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-medium">Exemplo de requisição</h2>
          <pre className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card p-5 text-sm">
            <code>{`curl https://api.aura.ai/v1/${slug}/completions \\
  -H "Authorization: Bearer $AURA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${slug}",
    "messages": [
      { "role": "user", "content": "Explique o teorema de Bayes" }
    ]
  }'`}</code>
          </pre>
        </section>

        {/* Plug-ins */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-medium">Plug-ins & SDKs</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {["Python SDK", "Node.js SDK", "VS Code Extension", "LangChain Connector"].map((p) => (
              <div key={p} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
                <Server className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{p}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Repo */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-medium">Repositório</h2>
          <a href="#" className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm hover:bg-accent">
            <Github className="h-4 w-4" /> github.com/aura-ai/{slug}
          </a>
        </section>
      </main>
    </div>
  );
}
