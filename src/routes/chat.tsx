import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Paperclip, Mic, Send, Plus, MessageSquare, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Chat — Aura" }] }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; text: string };

const HISTORY = [
  { id: "1", title: "Análise de mercado Q3" },
  { id: "2", title: "Resumo de artigo científico" },
  { id: "3", title: "Plano de arquitetura" },
  { id: "4", title: "Dúvidas sobre estatística" },
  { id: "5", title: "Rascunho de proposta" },
];

function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Olá! Sou um modelo da Aura. Como posso ajudar você hoje?" },
  ]);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: t },
      { role: "assistant", text: "Esta é uma resposta de demonstração." },
    ]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-border bg-surface/50 md:flex md:flex-col">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Aura
          </Link>
        </div>
        <button className="mx-3 mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium transition hover:bg-accent">
          <Plus className="h-4 w-4" /> Nova conversa
        </button>
        <div className="px-3 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">Histórico</div>
        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          {HISTORY.map((h) => (
            <button
              key={h.id}
              className="flex w-full items-center gap-2 truncate rounded-xl px-3 py-2.5 text-left text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              <MessageSquare className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{h.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b border-border px-6">
          <span className="font-heading text-sm font-medium">Aura Chat</span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/entrar"
              className="rounded-full border border-border px-4 py-1.5 text-xs font-medium transition hover:bg-accent"
            >
              Entrar
            </Link>
            <Link
              to="/cadastrar"
              className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition hover:opacity-90"
            >
              Cadastrar
            </Link>
          </div>
        </header>

        {/* Messages */}
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 overflow-y-auto px-6 py-10">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  m.role === "user"
                    ? "max-w-[80%] rounded-3xl rounded-tr-md bg-primary px-5 py-3 text-sm text-primary-foreground"
                    : "max-w-[80%] text-base leading-relaxed text-foreground"
                }
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <div className="border-t border-border px-6 py-4">
          <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-3xl border border-border bg-card p-2 shadow-sm">
            <button className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground" aria-label="Anexar">
              <Paperclip className="h-4 w-4" />
            </button>
            <button className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground" aria-label="Gravar áudio">
              <Mic className="h-4 w-4" />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Envie uma mensagem..."
              rows={1}
              className="max-h-40 flex-1 resize-none bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={send}
              className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90"
              aria-label="Enviar"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-muted-foreground">
            Os modelos podem cometer erros. Verifique informações importantes.
          </p>
        </div>
      </div>
    </div>
  );
}
