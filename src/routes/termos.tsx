import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/termos")({
  head: () => ({ meta: [{ title: "Termos de Uso — Aura" }] }),
  component: TermsPage,
});

const SECTIONS = [
  { t: "1. Aceitação dos Termos", p: "Ao acessar ou utilizar a plataforma Aura, você concorda em cumprir estes Termos de Uso. Caso não concorde com qualquer disposição, recomendamos que interrompa o uso imediatamente." },
  { t: "2. Cadastro e Conta", p: "Para utilizar determinados recursos é necessário criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais e por todas as atividades realizadas em sua conta." },
  { t: "3. Uso Permitido", p: "Você concorda em utilizar a plataforma exclusivamente para fins lícitos, respeitando direitos de terceiros, propriedade intelectual e a legislação aplicável." },
  { t: "4. Conteúdo do Usuário", p: "Conteúdos enviados permanecem de sua propriedade. Ao enviá-los, você concede à Aura licença não-exclusiva para processá-los exclusivamente para a prestação do serviço contratado." },
  { t: "5. Propriedade Intelectual", p: "Todos os direitos sobre a plataforma, modelos, marca e materiais associados pertencem à Aura ou aos seus licenciadores." },
  { t: "6. Limitação de Responsabilidade", p: "A Aura não será responsável por danos indiretos, lucros cessantes ou perdas de dados decorrentes do uso da plataforma, exceto quando exigido por lei." },
  { t: "7. Modificações", p: "Estes Termos podem ser atualizados a qualquer momento. Mudanças relevantes serão comunicadas com antecedência razoável." },
  { t: "8. Encerramento", p: "Podemos suspender ou encerrar contas em caso de violação destes Termos, comunicando o usuário sempre que possível." },
  { t: "9. Lei Aplicável", p: "Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de São Paulo/SP." },
];

function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Legal</span>
        <h1 className="mt-3 font-heading text-4xl font-medium sm:text-5xl">Termos de Uso</h1>
        <p className="mt-4 text-sm text-muted-foreground">Última atualização: 23 de junho de 2026</p>
        <div className="mt-12 space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.t}>
              <h2 className="font-heading text-xl font-medium">{s.t}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.p}</p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
