import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, KeyRound, Github, Plug, Webhook, Server, Puzzle } from "lucide-react";
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
      <Link to="/" className="text-sm underline">Voltar</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <p>Erro ao carregar.</p>
    </div>
  ),
  component: DocsPage,
});

const NAV = [
  {
    group: "Introdução",
    items: [
      { id: "overview", label: "Visão geral" },
      { id: "auth", label: "Autenticação" },
      { id: "quickstart", label: "Quickstart" },
    ],
  },
  {
    group: "API HTTP",
    items: [
      { id: "post-completions", label: "POST /completions", method: "POST" },
      { id: "post-chat", label: "POST /chat", method: "POST" },
      { id: "post-embeddings", label: "POST /embeddings", method: "POST" },
      { id: "get-models", label: "GET /models", method: "GET" },
      { id: "get-usage", label: "GET /usage", method: "GET" },
      { id: "delete-key", label: "DELETE /keys/:id", method: "DELETE" },
    ],
  },
  {
    group: "Webhooks",
    items: [
      { id: "wh-overview", label: "Visão geral" },
      { id: "wh-events", label: "Eventos disponíveis" },
      { id: "wh-signing", label: "Assinatura HMAC" },
      { id: "wh-retries", label: "Retentativas" },
    ],
  },
  {
    group: "Integrações",
    items: [
      { id: "int-zapier", label: "Zapier" },
      { id: "int-slack", label: "Slack" },
      { id: "int-notion", label: "Notion" },
      { id: "int-langchain", label: "LangChain" },
      { id: "int-llamaindex", label: "LlamaIndex" },
    ],
  },
  {
    group: "Plug-ins & SDKs",
    items: [
      { id: "sdk-python", label: "Python SDK" },
      { id: "sdk-node", label: "Node.js SDK" },
      { id: "plg-vscode", label: "VS Code Extension" },
      { id: "plg-chrome", label: "Chrome Extension" },
    ],
  },
];

const METHOD_COLOR: Record<string, string> = {
  GET: "bg-emerald-500/15 text-emerald-500",
  POST: "bg-blue-500/15 text-blue-500",
  DELETE: "bg-red-500/15 text-red-500",
  PUT: "bg-amber-500/15 text-amber-500",
};

function DocsPage() {
  const { name, slug } = Route.useLoaderData();
  const [active, setActive] = useState("overview");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 glass-nav">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
          <Link to="/modelos/$slug" params={{ slug }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar ao modelo
          </Link>
          <span className="font-heading text-sm font-medium">Docs — {name}</span>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] pt-16">
        {/* Sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 overflow-y-auto border-r border-border px-6 py-8 lg:block">
          {NAV.map((group) => (
            <div key={group.group} className="mb-8">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{group.group}</p>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActive(item.id)}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-sm transition ${
                        active === item.id ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      {"method" in item && item.method && (
                        <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${METHOD_COLOR[item.method]}`}>{item.method}</span>
                      )}
                      <span className="truncate">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <main className="min-w-0 flex-1 px-6 py-12 lg:px-12">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Documentação Técnica</span>
          <h1 className="mt-3 font-heading text-4xl font-medium sm:text-5xl">{name} API</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Endpoints HTTP, webhooks, integrações e plug-ins oficiais para o modelo {name}.
          </p>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-medium">Endpoint base</h2>
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card p-5 text-sm"><code>{`https://api.aura.ai/v1/${slug}`}</code></pre>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-medium">Autenticação</h2>
            <div className="mt-4 flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <KeyRound className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Use a chave gerada em <span className="text-foreground">Conta → API Keys</span> no header <code className="rounded bg-muted px-1.5 py-0.5">Authorization: Bearer …</code>.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-medium">Métodos HTTP</h2>
            <div className="mt-4 space-y-3">
              {[
                { m: "POST", p: "/completions", d: "Geração de texto a partir de prompt." },
                { m: "POST", p: "/chat", d: "Conversação multi-turno com histórico." },
                { m: "POST", p: "/embeddings", d: "Embeddings vetoriais." },
                { m: "GET", p: "/models", d: "Lista modelos disponíveis." },
                { m: "GET", p: "/usage", d: "Uso de tokens e custos." },
                { m: "DELETE", p: "/keys/:id", d: "Revoga uma chave de API." },
              ].map((e) => (
                <div key={e.p + e.m} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                  <span className={`shrink-0 rounded px-2 py-1 text-[10px] font-bold ${METHOD_COLOR[e.m]}`}>{e.m}</span>
                  <code className="font-mono text-sm">{e.p}</code>
                  <span className="ml-auto text-sm text-muted-foreground">{e.d}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-medium">Webhooks</h2>
            <div className="mt-4 flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <Webhook className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                Receba eventos de <code className="rounded bg-muted px-1.5 py-0.5">completion.finished</code>, <code className="rounded bg-muted px-1.5 py-0.5">conversation.created</code> e <code className="rounded bg-muted px-1.5 py-0.5">key.rotated</code>. Todas as entregas são assinadas com HMAC-SHA256.
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-medium">Integrações</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {["Zapier", "Slack", "Notion", "LangChain", "LlamaIndex", "n8n"].map((p) => (
                <div key={p} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                  <Plug className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{p}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-medium">Plug-ins & SDKs</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { name: "Python SDK", icon: Server },
                { name: "Node.js SDK", icon: Server },
                { name: "VS Code Extension", icon: Puzzle },
                { name: "Chrome Extension", icon: Puzzle },
              ].map((p) => (
                <div key={p.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                  <p.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{p.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-medium">Repositório</h2>
            <a href="#" className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm hover:bg-accent">
              <Github className="h-4 w-4" /> github.com/aura-ai/{slug}
            </a>
          </section>
        </main>
      </div>
    </div>
  );
}
