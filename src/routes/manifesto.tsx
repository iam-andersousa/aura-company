import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-32 text-center">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Manifesto</span>
        <h1 className="mt-4 font-heading text-3xl font-medium sm:text-4xl">Por que a Aura existe.</h1>

        <div className="mx-auto mt-10 space-y-3 text-justify text-[13px] leading-relaxed text-muted-foreground">
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

