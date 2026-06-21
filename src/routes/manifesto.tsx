import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import gradient2 from "@/assets/aura-gradient-2.png.asset.json";

export const Route = createFileRoute("/manifesto")({
  head: () => ({
    meta: [
      { title: "Manifesto — Aura" },
      { name: "description", content: "O manifesto da Aura: tecnologia a serviço do desenvolvimento humano." },
      { property: "og:title", content: "Manifesto — Aura" },
      { property: "og:description", content: "Máquinas processam informações. Pessoas atribuem significado." },
    ],
  }),
  component: ManifestoPage,
});

function ManifestoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 glass-nav">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <span className="font-heading text-sm font-medium">Manifesto</span>
          <ThemeToggle />
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{ backgroundImage: `url(${gradient2.url})`, backgroundSize: "cover" }}
        />
        <div className="absolute inset-0 -z-10 bg-background/50 dark:bg-background/70" />
        <div className="mx-auto max-w-3xl px-6 pt-40 pb-24 text-center">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Manifesto</span>
          <h1 className="mt-4 font-heading text-4xl font-medium sm:text-5xl">Por que a Aura existe.</h1>

          <div className="mx-auto mt-14 space-y-7 text-center font-display text-xl leading-relaxed text-foreground sm:text-2xl">
            <p>Máquinas processam informações. Pessoas atribuem significado.</p>
            <p className="text-muted-foreground">
              A tecnologia mais avançada do mundo não possui valor intrínseco se não contribuir para melhorar a condição humana.
            </p>
            <p>Acreditamos em uma inovação que fortalece pessoas em vez de substituí-las.</p>
            <p className="text-muted-foreground">
              Acreditamos em conhecimento aberto à colaboração, na ciência como instrumento de progresso e na tecnologia como ferramenta de desenvolvimento.
            </p>
            <p>Acreditamos que excelência e responsabilidade devem caminhar juntas.</p>
            <p className="text-muted-foreground">
              Acreditamos que o futuro pode ser construído de forma mais inteligente, mais sustentável e mais humana.
            </p>
            <p className="pt-4">A Aura existe para ajudar a tornar esse futuro possível.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
