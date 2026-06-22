import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoDark from "@/assets/aura-logo-dark.png.asset.json";
import logoLight from "@/assets/aura-logo-light.png.asset.json";

export const Route = createFileRoute("/manifesto")({
  head: () => ({
    meta: [
      { title: "Manifesto — Aura" },
      { name: "description", content: "O manifesto da Aura: tecnologia a serviço do desenvolvimento humano." },
    ],
  }),
  component: ManifestoPage,
});

function ManifestoPage() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const u = () => setDark(document.documentElement.classList.contains("dark"));
    u();
    const o = new MutationObserver(u);
    o.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => o.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 glass-nav">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={dark ? logoLight.url : logoDark.url} alt="Aura" className="h-10 w-auto sm:h-12" />
          </Link>
          <span className="font-heading text-sm font-medium text-muted-foreground">Manifesto</span>
          <ThemeToggle />
        </div>
      </header>

      <section className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-32 text-center">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Manifesto</span>
        <h1 className="mt-4 font-heading text-3xl font-medium sm:text-4xl">Por que a Aura existe.</h1>

        <div className="mx-auto mt-10 space-y-4 text-justify text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>Máquinas processam informações. Pessoas atribuem significado.</p>
          <p>A tecnologia mais avançada do mundo não possui valor intrínseco se não contribuir para melhorar a condição humana.</p>
          <p>Acreditamos em uma inovação que fortalece pessoas em vez de substituí-las.</p>
          <p>Acreditamos em conhecimento aberto à colaboração, na ciência como instrumento de progresso e na tecnologia como ferramenta de desenvolvimento.</p>
          <p>Acreditamos que excelência e responsabilidade devem caminhar juntas.</p>
          <p>Acreditamos que o futuro pode ser construído de forma mais inteligente, mais sustentável e mais humana.</p>
          <p className="text-foreground">A Aura existe para ajudar a tornar esse futuro possível.</p>
        </div>
      </section>
    </div>
  );
}
