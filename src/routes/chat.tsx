import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Mic, Plus, MessageSquare, Search, Library, Plug, Wrench, User, Settings,
  ArrowUp, Image as ImageIcon, Clipboard, FolderKanban, Github,
  Cloud, HardDrive, Globe, BookOpen, Brain, Bolt, Type, Sparkles, ChevronDown,
  Pencil, Sun, Moon, LogOut, X, Trash2, FolderPlus, History,
} from "lucide-react";
import logoDark from "@/assets/aura-logo-dark.png.asset.json";
import logoLight from "@/assets/aura-logo-light.png.asset.json";

export const Route = createFileRoute("/chat")({
  validateSearch: (s: Record<string, unknown>) => ({ model: (s.model as string) || "aristoteles" }),
  head: () => ({ meta: [{ title: "Chat — Aura" }] }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; text: string };
type Chat = { id: string; title: string };
type Project = { id: string; name: string };

const MODEL_NAMES: Record<string, string> = {
  aristoteles: "Aristoteles",
  herodotus: "Herodotus",
  pythagoras: "Pythagoras",
  archimedes: "Archimedes",
};

// CSS gradient mimicking the attached bannercolors.png
const BUBBLE_GRADIENT =
  "radial-gradient(120% 80% at 20% 20%, #7DE3C0 0%, transparent 45%), radial-gradient(120% 80% at 85% 15%, #D58CFF 0%, transparent 50%), radial-gradient(100% 100% at 0% 80%, #B388FF 0%, transparent 55%), linear-gradient(135deg, #3D6BE6 0%, #4F8AF0 50%, #5AA9F2 100%)";

function useClickOutside(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);
  return ref;
}

function useDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const u = () => setDark(document.documentElement.classList.contains("dark"));
    u();
    const o = new MutationObserver(u);
    o.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => o.disconnect();
  }, []);
  return dark;
}

function ChatPage() {
  const { model: modelSlug } = useSearch({ from: "/chat" });
  const modelName = MODEL_NAMES[modelSlug] ?? "Aristoteles";
  const dark = useDark();

  const [input, setInput] = useState("");
  const [title, setTitle] = useState("Nova conversa");
  const [editingTitle, setEditingTitle] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: `Olá! Sou ${modelName}, um modelo da Aura. Como posso ajudar você hoje?` },
  ]);

  const [chats, setChats] = useState<Chat[]>([
    { id: "1", title: "Análise de mercado Q3" },
    { id: "2", title: "Resumo de artigo científico" },
    { id: "3", title: "Plano de arquitetura" },
  ]);
  const [projects, setProjects] = useState<Project[]>([
    { id: "p1", name: "Pesquisa interna" },
    { id: "p2", name: "Relatórios financeiros" },
  ]);

  // Toggles
  const [mode, setMode] = useState<"web" | "docs">("web");
  const [thinking, setThinking] = useState<"deep" | "fast">("fast");
  const [output, setOutput] = useState<"text" | "multimedia">("text");
  const [history, setHistory] = useState<"cloud" | "local">("cloud");

  // Token limit
  const [tokenAuto, setTokenAuto] = useState(true);
  const [tokenManual, setTokenManual] = useState(4000);

  // UI states
  const [attachOpen, setAttachOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const attachRef = useClickOutside(() => setAttachOpen(false));
  const optsRef = useClickOutside(() => setOptionsOpen(false));
  const settingsRef = useClickOutside(() => setSettingsOpen(false));
  const userRef = useClickOutside(() => setUserOpen(false));

  // Tokens
  const tokensUsed = 12400;
  const tokensTotal = 50000;
  const tokensPct = Math.min(100, (tokensUsed / tokensTotal) * 100);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setMessages((m) => [...m, { role: "user", text: t }, { role: "assistant", text: "Resposta de demonstração." }]);
    setInput("");
  };

  const addProject = () => {
    const name = prompt("Nome do novo projeto");
    if (name?.trim()) setProjects((p) => [...p, { id: `p${Date.now()}`, name: name.trim() }]);
  };

  const deleteChat = (id: string) => setChats((c) => c.filter((x) => x.id !== id));

  const ModeIcon = mode === "web" ? Globe : BookOpen;
  const ThinkIcon = thinking === "deep" ? Brain : Bolt;
  const OutIcon = output === "multimedia" ? Sparkles : Type;

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-72 shrink-0 flex-col border-r border-border bg-surface/40 md:flex">
        <div className="flex items-center gap-3 border-b border-border px-4 py-4">
          <Link to="/" className="shrink-0">
            <img src={dark ? logoLight.url : logoDark.url} alt="Aura" className="h-7 w-auto" />
          </Link>
          <span className="h-5 w-px bg-border" />
          <span className="font-heading text-sm font-medium">{modelName}</span>
        </div>
        <div className="space-y-1 px-3">
          <SidebarBtn icon={Plus} label="Novo chat" onClick={() => { setMessages([{ role: "assistant", text: "Como posso ajudar?" }]); setTitle("Nova conversa"); }} />
          <SidebarBtn icon={Search} label="Buscar chat" onClick={() => setSearchOpen(true)} />
          <SidebarBtn icon={Library} label="Biblioteca" />
          {/* Projects */}
          <div className="rounded-xl">
            <div className="flex items-center justify-between px-3 pt-2 pb-1">
              <span className="inline-flex items-center gap-2 text-sm text-foreground">
                <FolderKanban className="h-4 w-4 text-muted-foreground" /> Projetos
              </span>
              <button
                onClick={addProject}
                aria-label="Novo projeto"
                className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="space-y-0.5 pl-3">
              {projects.map((p) => (
                <button key={p.id} className="flex w-full items-center gap-2 truncate rounded-lg px-3 py-1.5 text-left text-xs text-muted-foreground transition hover:bg-accent hover:text-foreground">
                  <FolderKanban className="h-3 w-3 shrink-0" /> <span className="truncate">{p.name}</span>
                </button>
              ))}
            </div>
          </div>
          <SidebarBtn icon={Plug} label="Conexões e Aplicativos" />
          <SidebarBtn icon={Wrench} label="Ferramentas" />
        </div>
        <div className="px-3 pt-6 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">Histórico</div>
        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          {chats.map((h) => (
            <div key={h.id} className="group flex items-center gap-1 rounded-xl pr-1 transition hover:bg-accent">
              <button className="flex flex-1 items-center gap-2 truncate rounded-xl px-3 py-2 text-left text-sm text-muted-foreground group-hover:text-foreground">
                <MessageSquare className="h-3.5 w-3.5 shrink-0" /><span className="truncate">{h.title}</span>
              </button>
              <button
                onClick={() => deleteChat(h.id)}
                aria-label="Excluir conversa"
                className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground opacity-0 transition hover:bg-destructive/15 hover:text-destructive group-hover:opacity-100"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </nav>

        {/* User area */}
        <div className="relative border-t border-border p-3" ref={userRef}>
          <button onClick={() => setUserOpen((o) => !o)} className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-accent">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><User className="h-4 w-4" /></div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">João Silva</p>
              {/* Token bar w/ tooltip */}
              <div className="group/tk relative mt-1.5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-foreground/80" style={{ width: `${100 - tokensPct}%` }} />
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {(tokensTotal - tokensUsed).toLocaleString("pt-BR")} tokens restantes
                </p>
                <div className="pointer-events-none absolute -top-9 left-0 z-10 whitespace-nowrap rounded-md bg-popover px-2 py-1 text-[10px] text-popover-foreground opacity-0 shadow-lg transition group-hover/tk:opacity-100">
                  Reset em 4h 00min
                </div>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition ${userOpen ? "rotate-180" : ""}`} />
          </button>
          {userOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-2 overflow-hidden rounded-2xl border border-border bg-popover p-2 shadow-2xl">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">João Silva</p>
                <p className="text-xs text-muted-foreground">joao@aura.ai</p>
              </div>
              <div className="my-1 h-px bg-border" />
              <UserRow icon={Sun} label="Tema" right={<Moon className="h-4 w-4 text-muted-foreground" />} />
              <UserRow icon={Bolt} label="Uso de tokens" right={<span className="text-xs text-muted-foreground">{tokensUsed.toLocaleString("pt-BR")} / {tokensTotal.toLocaleString("pt-BR")}</span>} />
              <UserRow icon={Sparkles} label="Plano" right={<span className="text-xs text-muted-foreground">Pro</span>} />
              <UserRow icon={Settings} label="Uso de API" right={<span className="text-xs text-muted-foreground">2 chaves</span>} />
              <div className="my-1 h-px bg-border" />
              <UserRow icon={LogOut} label="Sair" />
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top */}
        <header className="flex h-16 items-center justify-between border-b border-border px-6">
          <div className="flex min-w-0 items-center gap-3">
            {editingTitle ? (
              <input
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setEditingTitle(false)}
                onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
                className="rounded-md border border-border bg-background px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            ) : (
              <button onClick={() => setEditingTitle(true)} className="group flex items-center gap-2 truncate text-sm font-medium text-foreground">
                <span className="truncate">{title}</span>
                <Pencil className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/entrar" className="rounded-full border border-border px-4 py-1.5 text-xs font-medium transition hover:bg-accent">Entrar</Link>
            <Link to="/cadastrar" className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition hover:opacity-90">Cadastrar</Link>
          </div>
        </header>

        {/* Messages */}
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 overflow-y-auto px-6 py-10">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              {m.role === "user" ? (
                <div className="max-w-[80%] rounded-3xl rounded-tr-md bg-primary px-5 py-3 text-sm text-primary-foreground">
                  {m.text}
                </div>
              ) : (
                <div
                  className="relative max-w-[80%] overflow-hidden rounded-3xl rounded-tl-md px-5 py-4 text-sm text-white shadow-md"
                  style={{ background: BUBBLE_GRADIENT, backgroundSize: "900px 600px", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
                >
                  <p className="relative leading-relaxed">{m.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Composer */}
        <div className="border-t border-border px-6 py-4">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-end gap-2 rounded-3xl border border-border bg-card p-2 shadow-sm">
              {/* Attach */}
              <div className="relative" ref={attachRef}>
                <IconBtn label="Anexar" onClick={() => setAttachOpen((o) => !o)}><Plus className="h-4 w-4" /></IconBtn>
                {attachOpen && (
                  <div className="absolute bottom-full left-0 mb-2 w-80 overflow-hidden rounded-2xl border border-border bg-popover p-2 shadow-2xl">
                    <AttachItem icon={ImageIcon} label="Adicionar arquivos" sub="Fotos, documentos, vídeos" />
                    <AttachItem icon={Clipboard} label="Colar da área de seleção" sub="Ctrl+V" />
                    <AttachItem icon={FolderKanban} label="Vincular a um projeto" sub="Selecione um projeto existente" />
                    <AttachItem icon={Github} label="Abrir do GitHub" sub="Acesso a um repositório" />
                    <AttachItem icon={Plug} label="Plug-ins e conectores" sub="Utilize ferramentas e serviços externos" />
                  </div>
                )}
              </div>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder={`Envie uma mensagem para ${modelName}...`}
                rows={1}
                className="max-h-40 flex-1 resize-none bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
              />

              {/* Options dropdown — moved to the right, gradient background */}
              <div className="relative order-last ml-auto" ref={optsRef}>
                <button
                  onClick={() => setOptionsOpen((o) => !o)}
                  className="flex h-10 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-white shadow-md transition hover:opacity-90"
                  style={{ background: BUBBLE_GRADIENT, backgroundSize: "900px 600px", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
                  aria-label="Opções"
                >
                  <ModeIcon className="h-3.5 w-3.5" />
                  <ThinkIcon className="h-3.5 w-3.5" />
                  <OutIcon className="h-3.5 w-3.5" />
                  <ChevronDown className={`h-3 w-3 transition ${optionsOpen ? "rotate-180" : ""}`} />
                </button>
                {optionsOpen && (
                  <div className="absolute bottom-full right-0 mb-2 w-72 overflow-hidden rounded-2xl border border-border bg-popover p-3 shadow-2xl">
                    <ToggleRow label="Fonte de consulta" left={{ icon: Globe, label: "Internet", val: "web" }} right={{ icon: BookOpen, label: "Documentos", val: "docs" }} value={mode} onChange={(v) => setMode(v as "web" | "docs")} />
                    <ToggleRow label="Raciocínio" left={{ icon: Brain, label: "Profundo", val: "deep" }} right={{ icon: Bolt, label: "Rápido", val: "fast" }} value={thinking} onChange={(v) => setThinking(v as "deep" | "fast")} />
                    <ToggleRow label="Resposta" left={{ icon: Type, label: "Texto", val: "text" }} right={{ icon: Sparkles, label: "Multimídia", val: "multimedia" }} value={output} onChange={(v) => setOutput(v as "text" | "multimedia")} />
                    <ToggleRow label="Histórico" left={{ icon: Cloud, label: "Cloud", val: "cloud" }} right={{ icon: HardDrive, label: "Local", val: "local" }} value={history} onChange={(v) => setHistory(v as "cloud" | "local")} />
                  </div>
                )}
              </div>

              {/* Settings */}
              <div className="relative" ref={settingsRef}>
                <IconBtn label="Configurações" onClick={() => setSettingsOpen((o) => !o)}><Settings className="h-4 w-4" /></IconBtn>
                {settingsOpen && (
                  <div className="absolute bottom-full right-0 mb-2 w-80 overflow-hidden rounded-2xl border border-border bg-popover p-4 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium">Limite de tokens por interação</p>
                      <History className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-1 rounded-xl border border-border p-1">
                      <button
                        onClick={() => setTokenAuto(true)}
                        className={`rounded-lg py-1.5 text-xs transition ${tokenAuto ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}
                      >
                        Auto
                      </button>
                      <button
                        onClick={() => setTokenAuto(false)}
                        className={`rounded-lg py-1.5 text-xs transition ${!tokenAuto ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}
                      >
                        Manual
                      </button>
                    </div>
                    <div className={`mt-4 ${tokenAuto ? "opacity-40" : ""}`}>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground">Limite manual</span>
                        <span className="font-mono text-foreground">{tokenManual.toLocaleString("pt-BR")} tokens</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={10000}
                        step={100}
                        value={tokenManual}
                        disabled={tokenAuto}
                        onChange={(e) => setTokenManual(Number(e.target.value))}
                        className="mt-2 w-full accent-foreground disabled:cursor-not-allowed"
                      />
                      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                        <span>100</span>
                        <span>10k</span>
                      </div>
                    </div>
                    <p className="mt-3 text-[11px] text-muted-foreground">
                      {tokenAuto ? "Auto faz downgrade do modelo com base no gasto de tokens." : "Manual fixa o teto por interação."}
                    </p>
                  </div>
                )}
              </div>

              <IconBtn label="Gravar áudio"><Mic className="h-4 w-4" /></IconBtn>
              <button onClick={send} className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90" aria-label="Enviar"><ArrowUp className="h-4 w-4" /></button>
            </div>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">Os modelos podem cometer erros. Verifique informações importantes.</p>
          </div>
        </div>
      </div>

      {/* Search modal */}
      {searchOpen && (
        <SearchModal chats={chats} onClose={() => setSearchOpen(false)} />
      )}
    </div>
  );
}

function SearchModal({ chats, onClose }: { chats: Chat[]; onClose: () => void }) {
  const [q, setQ] = useState("");
  const list = useMemo(() => chats.filter((c) => c.title.toLowerCase().includes(q.toLowerCase())), [chats, q]);
  return (
    <div className="fixed inset-0 z-50 grid place-items-start bg-black/50 p-4 pt-32" onClick={onClose}>
      <div className="mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Pesquisar por título de conversa ou projeto..." className="flex-1 bg-transparent text-sm outline-none" />
          <button onClick={onClose}><X className="h-4 w-4 text-muted-foreground" /></button>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {list.map((h) => (
            <button key={h.id} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-accent">
              <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" /> {h.title}
            </button>
          ))}
          {list.length === 0 && <p className="px-3 py-6 text-center text-xs text-muted-foreground">Nenhum resultado</p>}
        </div>
      </div>
    </div>
  );
}

function SidebarBtn({ icon: Icon, label, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition hover:bg-accent">
      <Icon className="h-4 w-4 text-muted-foreground" /> {label}
    </button>
  );
}

function UserRow({ icon: Icon, label, right }: { icon: React.ComponentType<{ className?: string }>; label: string; right?: React.ReactNode }) {
  return (
    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-accent">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="flex-1">{label}</span>
      {right}
    </button>
  );
}

function IconBtn({ children, label, onClick }: { children: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} aria-label={label} className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground">
      {children}
    </button>
  );
}

function AttachItem({ icon: Icon, label, sub }: { icon: React.ComponentType<{ className?: string }>; label: string; sub: string }) {
  return (
    <button className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-accent">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-sm font-medium leading-tight">{label}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </button>
  );
}

type Opt = { icon: React.ComponentType<{ className?: string }>; label: string; val: string };
function ToggleRow({ label, left, right, value, onChange }: { label: string; left: Opt; right: Opt; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-2 last:mb-0">
      <p className="px-1 pb-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <div className="grid grid-cols-2 gap-1 rounded-xl border border-border p-1">
        {[left, right].map((o) => (
          <button key={o.val} onClick={() => onChange(o.val)} className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs transition ${value === o.val ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}>
            <o.icon className="h-3.5 w-3.5" /> {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Unused import shim for FolderPlus to avoid TS unused warning if removed later
void FolderPlus;
