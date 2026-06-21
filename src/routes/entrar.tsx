import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/entrar")({
  head: () => ({ meta: [{ title: "Entrar — Aura" }] }),
  component: EntrarPage,
});

function EntrarPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 glass-nav">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-2xl">
          <h1 className="font-heading text-2xl font-medium">Entrar na Aura</h1>
          <p className="mt-2 text-sm text-muted-foreground">Acesse sua conta para continuar.</p>
          <form className="mt-6 space-y-4">
            <input type="email" placeholder="E-mail" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            <input type="password" placeholder="Senha" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            <button type="button" className="w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">Entrar</button>
          </form>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Não tem conta? <Link to="/cadastrar" className="text-foreground underline">Cadastre-se</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
