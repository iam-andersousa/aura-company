import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Mic, Plus, MessageSquare, Search, Library, Plug, Wrench, User, Settings,
  ArrowUp, Image as ImageIcon, FileText, Clipboard, FolderKanban, Github,
  Cloud, HardDrive, Globe, BookOpen, Brain, Bolt, Type, Sparkles, ChevronDown, Pencil, Sun, Moon, LogOut, X,
} from "lucide-react";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Chat — Aura" }] }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; text: string };

const HISTORY = [
  { id: "1", title: "Análise de mercado Q3" },
  { id: "2", title: "Resumo de artigo científico" },
  { id: "3", title: "Plano de arquitetura" },
];

function useClickOutside(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);
  return ref;
}

function ChatPage() {
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("Nova conversa");
  const [editingTitle, setEditingTitle] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Olá! Sou um modelo da Aura. Como posso ajudar você hoje?" },
  ]);

  // Toggles (visíveis como ícones no dropdown)
  const [mode, setMode] = useState<"web" | "docs">("web");
  const [thinking, setThinking] = useState<"deep" | "fast">("fast");
  const [output, setOutput] = useState<"text" | "multimedia">("text");

  // UI states
  const [attachOpen, setAttachOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [tokenLimit, setTokenLimit] = useState<"auto" | "1k" | "4k" | "16k">("auto");

  const attachRef = useClickOutside(() => setAttachOpen(false));
  const optsRef = useClickOutside(() => setOptionsOpen(false));
  const settingsRef = useClickOutside(() => setSettingsOpen(false));
  const userRef = useClickOutside(() => setUserOpen(false));

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setMessages((m) => [...m, { role: "user", text: t }, { role: "assistant", text: "Resposta de demonstração." }]);
    setInput("");
  };

  const ModeIcon = mode === "web" ? Globe : BookOpen;
  const ThinkIcon = thinking === "deep" ? Brain : Bolt;
  const OutIcon = output === "multimedia" ? Sparkles : Type;

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-72 shrink-0 flex-col border-r border-border bg-surface/40 md:flex">
        <div className="p-4">
          <Link to="/" className="font-heading text-sm font-medium">Aura</Link>
        </div>
        <div className="space-y-1 px-3">
          <SidebarBtn icon={Plus} label="Novo chat" onClick={() => { setMessages([{ role: "assistant", text: "Como posso ajudar?" }]); setTitle("Nova conversa"); }} />
          <SidebarBtn icon={Search} label="Buscar chat" onClick={() => setSearchOpen(true)} />
          <SidebarBtn icon={Library} label="Biblioteca" />
          <SidebarBtn icon={Plug} label="Conexões e Aplicativos" />
          <SidebarBtn icon={Wrench} label="Ferramentas" />
        </div>
        <div className="px-3 pt-6 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">Histórico</div>
        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          {HISTORY.map((h) => (
            <button key={h.id} className="flex w-full items-center gap-2 truncate rounded-xl px-3 py-2 text-left text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground">
              <MessageSquare className="h-3.5 w-3.5 shrink-0" /><span className="truncate">{h.title}</span>
            </button>
          ))}
        </nav>
        <div className="relative border-t border-border p-3" ref={userRef}>
          <button onClick={() => setUserOpen((o) => !o)} className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-accent">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground"><User className="h-4 w-4" /></div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">João Silva</p>
              <p className="truncate text-xs text-muted-foreground">Plano Pro · 12k / 50k</p>
            </div>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition ${userOpen ? "rotate-180" : ""}`} />
          </button>
          {userOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-2 overflow-hidden rounded-2xl border border-border bg-popover p-2 shadow-2xl">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">João Silva</p>
                <p className="text-xs text-muted-foreground">joao@aura.ai</p>
              </div>
              <div className="my-1 h-px bg-border" />
              <UserRow icon={Sun} label="Tema" right={<Moon className="h-4 w-4 text-muted-foreground" />} />
              <UserRow icon={Bolt} label="Uso de tokens" right={<span className="text-xs text-muted-foreground">12.4k / 50k</span>} />
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
          <div className="flex min-w-0 items-center gap-2">
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
              <button onClick={() => setEditingTitle(true)} className="group flex items-center gap-2 truncate text-sm font-medium">
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
              <div className={m.role === "user"
                ? "max-w-[80%] rounded-3xl rounded-tr-md bg-primary px-5 py-3 text-sm text-primary-foreground"
                : "max-w-[80%] text-base leading-relaxed text-foreground"}>
                {m.text}
              </div>
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
                  <div className="absolute bottom-full left-0 mb-2 w-64 overflow-hidden rounded-2xl border border-border bg-popover p-1.5 shadow-2xl">
                    <MenuItem icon={ImageIcon} label="Adicionar fotos" />
                    <MenuItem icon={FileText} label="Adicionar documentos" />
                    <MenuItem icon={Clipboard} label="Colar da área de seleção" />
                    <MenuItem icon={FolderKanban} label="Vincular a um projeto" />
                    <MenuItem icon={Github} label="Abrir do GitHub" />
                    <div className="my-1 h-px bg-border" />
                    <MenuItem icon={Cloud} label="Salvar conversa em cloud" />
                    <MenuItem icon={HardDrive} label="Salvar conversa local" />
                    <div className="my-1 h-px bg-border" />
                    <MenuItem icon={Plug} label="Plug-ins e conectores" />
                  </div>
                )}
              </div>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Envie uma mensagem..."
                rows={1}
                className="max-h-40 flex-1 resize-none bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
              />

              {/* Options dropdown */}
              <div className="relative" ref={optsRef}>
                <button
                  onClick={() => setOptionsOpen((o) => !o)}
                  className="flex h-10 items-center gap-1.5 rounded-full border border-border px-3 text-muted-foreground transition hover:bg-accent hover:text-foreground"
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
                  </div>
                )}
              </div>

              {/* Settings */}
              <div className="relative" ref={settingsRef}>
                <IconBtn label="Configurações" onClick={() => setSettingsOpen((o) => !o)}><Settings className="h-4 w-4" /></IconBtn>
                {settingsOpen && (
                  <div className="absolute bottom-full right-0 mb-2 w-72 overflow-hidden rounded-2xl border border-border bg-popover p-3 shadow-2xl">
                    <p className="px-2 pb-2 text-xs font-medium">Limite de tokens por interação</p>
                    <div className="grid grid-cols-4 gap-1">
                      {(["auto", "1k", "4k", "16k"] as const).map((v) => (
                        <button key={v} onClick={() => setTokenLimit(v)} className={`rounded-lg px-2 py-2 text-xs transition ${tokenLimit === v ? "bg-primary text-primary-foreground" : "border border-border hover:bg-accent"}`}>{v === "auto" ? "Auto" : v}</button>
                      ))}
                    </div>
                    <p className="mt-3 px-2 text-[11px] text-muted-foreground">Auto faz downgrade do modelo com base no gasto de tokens.</p>
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
        <div className="fixed inset-0 z-50 grid place-items-start bg-black/50 p-4 pt-32" onClick={() => setSearchOpen(false)}>
          <div className="mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input autoFocus placeholder="Pesquisar por título de conversa ou projeto..." className="flex-1 bg-transparent text-sm outline-none" />
              <button onClick={() => setSearchOpen(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {HISTORY.map((h) => (
                <button key={h.id} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-accent">
                  <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" /> {h.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
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

function MenuItem({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-accent">
      <Icon className="h-4 w-4 text-muted-foreground" /> {label}
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
