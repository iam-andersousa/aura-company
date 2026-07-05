import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import banner from "@/assets/hero-thinker.jpg.asset.json";
import logoDark from "@/assets/aura-logo-dark.png.asset.json";
import logoLight from "@/assets/aura-logo-light.png.asset.json";
import googleLogo from "@/assets/google-logo.png.asset.json";
import metaLogo from "@/assets/meta-logo.png.asset.json";

export const Route = createFileRoute("/cadastrar")({
  head: () => ({ meta: [{ title: "Cadastrar — Aura" }] }),
  component: CadastrarPage,
});

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

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-medium transition hover:bg-accent">
              <img src={googleLogo.url} alt="" className="h-5 w-5" /> Google
            </button>
            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-medium transition hover:bg-accent">
              <img src={metaLogo.url} alt="" className="h-5 w-5 object-contain" /> Meta
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
        <img src={banner.url} alt="Aura" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>
    </div>
  );
}

