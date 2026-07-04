import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import banner from "@/assets/aura-login-banner.png.asset.json";
import logoDark from "@/assets/aura-logo-dark.png.asset.json";
import logoLight from "@/assets/aura-logo-light.png.asset.json";

export const Route = createFileRoute("/cadastrar")({
  head: () => ({ meta: [{ title: "Cadastrar — Aura" }] }),
  component: CadastrarPage,
});

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.66 4.1-5.5 4.1-3.3 0-6-2.73-6-6.1s2.7-6.1 6-6.1c1.88 0 3.14.8 3.86 1.48l2.63-2.53C16.86 3.28 14.65 2.3 12 2.3 6.86 2.3 2.7 6.46 2.7 11.6S6.86 20.9 12 20.9c6.94 0 9.3-4.87 9.3-7.34 0-.5-.05-.87-.12-1.26H12z" />
    </svg>
  );
}

function MetaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="#1877F2" className={className} aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.68 4.53-4.68 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

function CadastrarPage() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const u = () => setDark(document.documentElement.classList.contains("dark"));
    u();
    const o = new MutationObserver(u);
    o.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => o.disconnect();
  }, []);

  return (
    <div className="grid min-h-screen bg-background text-foreground lg:grid-cols-2">
      <div className="relative flex flex-col px-8 py-8 sm:px-16">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <ThemeToggle />
        </div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
          <img src={dark ? logoLight.url : logoDark.url} alt="Aura" className="mb-8 h-10 w-auto object-contain object-left" />
          <h1 className="font-heading text-3xl font-medium">Crie sua conta</h1>
          <p className="mt-2 text-sm text-muted-foreground">Comece a usar os produtos da Aura.</p>

          <div className="mt-6 grid gap-3">
            <button type="button" className="inline-flex items-center justify-center gap-3 rounded-full border border-border bg-card px-4 py-3 text-sm font-medium transition hover:bg-accent">
              <GoogleIcon className="h-4 w-4" /> Cadastrar com Google
            </button>
            <button type="button" className="inline-flex items-center justify-center gap-3 rounded-full border border-border bg-card px-4 py-3 text-sm font-medium transition hover:bg-accent">
              <MetaIcon className="h-4 w-4" /> Cadastrar com Meta
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> ou <span className="h-px flex-1 bg-border" />
          </div>

          <form className="space-y-4">
            <input type="text" placeholder="Nome" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            <input type="email" placeholder="E-mail" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            <input type="password" placeholder="Senha" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            <button type="button" className="w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">Criar conta</button>
          </form>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Já tem conta? <Link to="/entrar" className="text-foreground underline">Entrar</Link>
          </p>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img src={banner.url} alt="For humanity, to the stars." className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </div>
  );
}
