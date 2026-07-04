import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, KeyRound, Github, Plug, Webhook, Server, Puzzle, Terminal } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAMES: Record<string, string> = {
  vector: "Vector",
  axis: "Axis",
  pulse: "Pulse",
  genius: "Genius",
  codex: "Codex",
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

type NavItem = { id: string; label: string; method?: string };
const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "Introdução",
    items: [
      { id: "overview", label: "Visão geral" },
      { id: "quickstart", label: "Quickstart" },
      { id: "auth", label: "Autenticação" },
      { id: "rate-limits", label: "Limites e cotas" },
      { id: "errors", label: "Códigos de erro" },
      { id: "versioning", label: "Versionamento" },
    ],
  },
  {
    group: "API HTTP — Inferência",
    items: [
      { id: "post-completions", label: "POST /completions", method: "POST" },
      { id: "post-chat", label: "POST /chat/completions", method: "POST" },
      { id: "post-embeddings", label: "POST /embeddings", method: "POST" },
      { id: "post-rerank", label: "POST /rerank", method: "POST" },
      { id: "post-vision", label: "POST /vision", method: "POST" },
      { id: "post-audio-stt", label: "POST /audio/transcriptions", method: "POST" },
      { id: "post-audio-tts", label: "POST /audio/speech", method: "POST" },
    ],
  },
  {
    group: "API HTTP — Recursos",
    items: [
      { id: "get-models", label: "GET /models", method: "GET" },
      { id: "get-model", label: "GET /models/:id", method: "GET" },
      { id: "get-usage", label: "GET /usage", method: "GET" },
      { id: "get-keys", label: "GET /keys", method: "GET" },
      { id: "post-keys", label: "POST /keys", method: "POST" },
      { id: "put-keys", label: "PUT /keys/:id", method: "PUT" },
      { id: "patch-keys", label: "PATCH /keys/:id", method: "PATCH" },
      { id: "delete-key", label: "DELETE /keys/:id", method: "DELETE" },
    ],
  },
  {
    group: "API HTTP — Arquivos & Fine-tuning",
    items: [
      { id: "post-files", label: "POST /files", method: "POST" },
      { id: "get-files", label: "GET /files", method: "GET" },
      { id: "delete-files", label: "DELETE /files/:id", method: "DELETE" },
      { id: "post-finetune", label: "POST /fine-tunes", method: "POST" },
      { id: "get-finetune", label: "GET /fine-tunes/:id", method: "GET" },
    ],
  },
  {
    group: "Webhooks",
    items: [
      { id: "wh-overview", label: "Visão geral" },
      { id: "wh-events", label: "Eventos disponíveis" },
      { id: "wh-signing", label: "Assinatura HMAC" },
      { id: "wh-retries", label: "Retentativas" },
      { id: "wh-test", label: "Ambiente de testes" },
    ],
  },
  {
    group: "Integrações",
    items: [
      { id: "int-zapier", label: "Zapier" },
      { id: "int-make", label: "Make" },
      { id: "int-n8n", label: "n8n" },
      { id: "int-slack", label: "Slack" },
      { id: "int-notion", label: "Notion" },
      { id: "int-langchain", label: "LangChain" },
      { id: "int-llamaindex", label: "LlamaIndex" },
      { id: "int-vercel", label: "Vercel AI SDK" },
    ],
  },
  {
    group: "Plug-ins & SDKs",
    items: [
      { id: "sdk-python", label: "Python SDK" },
      { id: "sdk-node", label: "Node.js / TS SDK" },
      { id: "sdk-go", label: "Go SDK" },
      { id: "sdk-rust", label: "Rust SDK" },
      { id: "plg-vscode", label: "VS Code Extension" },
      { id: "plg-jetbrains", label: "JetBrains Plug-in" },
      { id: "plg-chrome", label: "Chrome Extension" },
      { id: "plg-figma", label: "Figma Plug-in" },
    ],
  },
];

const METHOD_COLOR: Record<string, string> = {
  GET: "bg-emerald-500/15 text-emerald-500",
  POST: "bg-blue-500/15 text-blue-500",
  DELETE: "bg-red-500/15 text-red-500",
  PUT: "bg-amber-500/15 text-amber-500",
  PATCH: "bg-purple-500/15 text-purple-500",
};

const ENDPOINTS = [
  { m: "POST", p: "/completions", d: "Geração de texto a partir de prompt." },
  { m: "POST", p: "/chat/completions", d: "Conversação multi-turno com histórico." },
  { m: "POST", p: "/embeddings", d: "Embeddings vetoriais para busca semântica." },
  { m: "POST", p: "/rerank", d: "Reordenação de resultados por relevância." },
  { m: "POST", p: "/vision", d: "Análise multimodal de imagens." },
  { m: "POST", p: "/audio/transcriptions", d: "Speech-to-text em 96 idiomas." },
  { m: "POST", p: "/audio/speech", d: "Síntese de voz natural com clonagem opcional." },
  { m: "GET", p: "/models", d: "Lista modelos disponíveis e capacidades." },
  { m: "GET", p: "/models/:id", d: "Metadados detalhados do modelo." },
  { m: "GET", p: "/usage", d: "Consumo de tokens, custos e cotas." },
  { m: "POST", p: "/files", d: "Upload de arquivos para grounding e fine-tuning." },
  { m: "GET", p: "/files", d: "Lista arquivos carregados." },
  { m: "DELETE", p: "/files/:id", d: "Remove arquivo." },
  { m: "POST", p: "/fine-tunes", d: "Inicia job de fine-tuning supervisionado." },
  { m: "GET", p: "/fine-tunes/:id", d: "Status e métricas de fine-tuning." },
  { m: "POST", p: "/keys", d: "Cria nova chave de API." },
  { m: "GET", p: "/keys", d: "Lista chaves ativas." },
  { m: "PUT", p: "/keys/:id", d: "Substitui configuração da chave." },
  { m: "PATCH", p: "/keys/:id", d: "Atualiza escopos ou rate limit." },
  { m: "DELETE", p: "/keys/:id", d: "Revoga uma chave de API." },
];

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
                      {item.method && (
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
                Use a chave gerada em <span className="text-foreground">Conta → API Keys</span> no header{" "}
                <code className="rounded bg-muted px-1.5 py-0.5">Authorization: Bearer …</code>.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-medium">Métodos HTTP</h2>
            <div className="mt-4 space-y-3">
              {ENDPOINTS.map((e) => (
                <div key={e.p + e.m} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                  <span className={`shrink-0 rounded px-2 py-1 text-[10px] font-bold ${METHOD_COLOR[e.m]}`}>{e.m}</span>
                  <code className="font-mono text-sm">{e.p}</code>
                  <span className="ml-auto text-right text-sm text-muted-foreground">{e.d}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-medium">Exemplo — cURL</h2>
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card p-5 text-xs leading-relaxed"><code>{`curl https://api.aura.ai/v1/${slug}/chat/completions \\
  -H "Authorization: Bearer $AURA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${slug}-latest",
    "messages": [{"role": "user", "content": "Olá"}]
  }'`}</code></pre>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-medium">Webhooks</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Receba eventos assinados via HMAC-SHA256 diretamente no seu endpoint. Configure em <span className="text-foreground">Conta → Webhooks</span>.
            </p>
            <div className="mt-4 space-y-3">
              {[
                { e: "completion.finished", d: "Conclusão de geração de texto — inclui métricas de tokens e latência." },
                { e: "conversation.created", d: "Nova conversa aberta em qualquer contexto (chat, API, plug-in)." },
                { e: "conversation.message", d: "Nova mensagem em uma conversa existente." },
                { e: "file.processed", d: "Arquivo carregado terminou o pré-processamento (chunking, embedding)." },
                { e: "file.failed", d: "Falha ao processar arquivo — inclui razão e código." },
                { e: "finetune.started", d: "Job de fine-tuning iniciado." },
                { e: "finetune.completed", d: "Fine-tuning concluído — modelo customizado disponível." },
                { e: "key.rotated", d: "Chave de API rotacionada ou revogada." },
                { e: "quota.threshold", d: "Consumo atingiu 80% / 100% da cota configurada." },
                { e: "billing.invoice", d: "Nova fatura gerada." },
              ].map((w) => (
                <div key={w.e} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4">
                  <Webhook className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <code className="shrink-0 rounded bg-muted px-2 py-1 font-mono text-xs">{w.e}</code>
                  <span className="text-sm text-muted-foreground">{w.d}</span>
                </div>
              ))}
            </div>
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card p-5 text-xs leading-relaxed"><code>{`// Verificação de assinatura HMAC
const sig = req.headers["x-aura-signature"];
const expected = createHmac("sha256", process.env.AURA_WEBHOOK_SECRET)
  .update(rawBody).digest("hex");
if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return res.status(401).end();`}</code></pre>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-medium">Integrações nativas</h2>
            <p className="mt-3 text-sm text-muted-foreground">Conectores oficiais mantidos pela equipe Aura. Configuração via OAuth ou API key.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { name: "Zapier", cat: "Automação", desc: "Mais de 300 gatilhos e ações prontos." },
                { name: "Make", cat: "Automação", desc: "Cenários visuais com módulos Aura." },
                { name: "n8n", cat: "Automação", desc: "Node oficial self-hosted ou cloud." },
                { name: "Slack", cat: "Comunicação", desc: "Bot conversacional + slash commands." },
                { name: "Microsoft Teams", cat: "Comunicação", desc: "App corporativo com SSO Entra ID." },
                { name: "Discord", cat: "Comunicação", desc: "Bot para servidores e canais privados." },
                { name: "Notion", cat: "Produtividade", desc: "Grounding em databases e pages." },
                { name: "Google Workspace", cat: "Produtividade", desc: "Drive, Docs, Gmail e Calendar." },
                { name: "Microsoft 365", cat: "Produtividade", desc: "OneDrive, Outlook, SharePoint." },
                { name: "GitHub", cat: "Dev", desc: "Repositórios, issues, PRs e Actions." },
                { name: "GitLab", cat: "Dev", desc: "Repos, MRs e pipelines CI/CD." },
                { name: "Linear", cat: "Dev", desc: "Sincronização bidirecional de issues." },
                { name: "Jira", cat: "Dev", desc: "Cloud e Data Center." },
                { name: "Salesforce", cat: "CRM", desc: "Objetos padrão e customizados." },
                { name: "HubSpot", cat: "CRM", desc: "Contatos, deals, tickets e workflows." },
                { name: "Stripe", cat: "Pagamentos", desc: "Assinaturas, faturas e eventos." },
                { name: "Snowflake", cat: "Dados", desc: "Query direto via Cortex SQL." },
                { name: "BigQuery", cat: "Dados", desc: "Datasets e sinks nativos." },
                { name: "Segment", cat: "Dados", desc: "Sources e destinations." },
                { name: "LangChain", cat: "Frameworks IA", desc: "Provider oficial Python e JS." },
                { name: "LlamaIndex", cat: "Frameworks IA", desc: "LLM e Embedding wrappers." },
                { name: "Vercel AI SDK", cat: "Frameworks IA", desc: "Provider com streaming nativo." },
              ].map((p) => (
                <div key={p.name} className="rounded-2xl border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <Plug className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{p.name}</span>
                    <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">{p.cat}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-medium">Plug-ins & SDKs</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { name: "Python SDK", icon: Server, desc: "pip install aura — async, streaming, tool-calling." },
                { name: "Node.js / TS SDK", icon: Server, desc: "npm i @aura/sdk — tipagem completa e edge runtime." },
                { name: "Go SDK", icon: Terminal, desc: "go get github.com/aura-ai/aura-go." },
                { name: "Rust SDK", icon: Terminal, desc: "cargo add aura — cliente async + tokio." },
                { name: "Ruby SDK", icon: Terminal, desc: "gem install aura-ruby." },
                { name: "PHP SDK", icon: Terminal, desc: "composer require aura/aura-php." },
                { name: "VS Code Extension", icon: Puzzle, desc: "Autocomplete, chat inline e refactoring." },
                { name: "JetBrains Plug-in", icon: Puzzle, desc: "IntelliJ, PyCharm, WebStorm e Rider." },
                { name: "Chrome Extension", icon: Puzzle, desc: "Aura em qualquer aba e conversa contextual." },
                { name: "Figma Plug-in", icon: Puzzle, desc: "Geração de copy, componentes e specs." },
                { name: "Raycast Extension", icon: Puzzle, desc: "Comandos rápidos e snippets." },
                { name: "CLI Aura", icon: Terminal, desc: "aura chat, aura run, aura keys." },
              ].map((p) => (
                <div key={p.name} className="rounded-2xl border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <p.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{p.name}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{p.desc}</p>
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
