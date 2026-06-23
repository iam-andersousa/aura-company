import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/privacidade")({
  head: () => ({ meta: [{ title: "Política de Privacidade — Aura" }] }),
  component: PrivacyPage,
});

const SECTIONS = [
  { t: "1. Dados Coletados", p: "Coletamos dados de cadastro (nome, e-mail, organização), dados de uso (interações com modelos, logs técnicos) e dados de pagamento processados por parceiros certificados." },
  { t: "2. Base Legal", p: "O tratamento ocorre com base na execução do contrato, no consentimento ou no legítimo interesse, sempre conforme a LGPD (Lei nº 13.709/2018) e o GDPR quando aplicável." },
  { t: "3. Finalidade do Tratamento", p: "Os dados são utilizados para prestação do serviço, segurança, prevenção a fraudes, suporte e melhoria contínua dos modelos." },
  { t: "4. Compartilhamento", p: "Compartilhamos dados apenas com operadores estritamente necessários (infraestrutura em nuvem, processadores de pagamento), sempre sob contrato de confidencialidade." },
  { t: "5. Retenção", p: "Conteúdos de conversas podem ser retidos pelo período definido pelo plano contratado. Logs técnicos são mantidos por até 12 meses, exceto exigência legal diferente." },
  { t: "6. Direitos do Titular", p: "Você pode solicitar acesso, correção, anonimização, portabilidade e eliminação dos seus dados a qualquer momento por meio do canal privacidade@aura.ai." },
  { t: "7. Transferência Internacional", p: "Quando há transferência internacional, aplicamos salvaguardas adequadas, como cláusulas-padrão de proteção de dados." },
  { t: "8. Segurança", p: "Adotamos criptografia em trânsito e em repouso, segregação de ambientes, controle de acesso baseado em função e auditoria contínua." },
  { t: "9. Encarregado (DPO)", p: "Encarregado de Proteção de Dados: dpo@aura.ai." },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Legal</span>
        <h1 className="mt-3 font-heading text-4xl font-medium sm:text-5xl">Política de Privacidade</h1>
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
