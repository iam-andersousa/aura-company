import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/dpa")({
  head: () => ({ meta: [{ title: "DPA — Acordo de Processamento de Dados — Aura" }] }),
  component: DpaPage,
});

const CLAUSES = [
  { t: "1. Objeto", p: "Este Acordo de Processamento de Dados (DPA) regula o tratamento de dados pessoais pela Aura, na qualidade de operadora, em nome do Cliente, na qualidade de controlador." },
  { t: "2. Escopo do Tratamento", p: "A Aura tratará dados pessoais exclusivamente para executar os serviços contratados, conforme instruções documentadas do Cliente." },
  { t: "3. Subprocessadores", p: "A Aura mantém lista atualizada de subprocessadores em /trust. Mudanças relevantes são comunicadas com 30 dias de antecedência." },
  { t: "4. Medidas Técnicas e Organizacionais", p: "Inclui criptografia AES-256 em repouso, TLS 1.3 em trânsito, segregação multi-tenant, MFA obrigatório, controles SOC 2 Type II e ISO/IEC 27001." },
  { t: "5. Direitos dos Titulares", p: "A Aura apoiará o Cliente no atendimento de solicitações de titulares em prazo razoável, fornecendo ferramentas e canais adequados." },
  { t: "6. Notificação de Incidentes", p: "Incidentes envolvendo dados pessoais serão comunicados em até 48 horas após a confirmação, com plano de contenção e remediação." },
  { t: "7. Transferências Internacionais", p: "Aplicam-se Cláusulas-Padrão Contratuais (CCPs) ou mecanismos equivalentes para transferências internacionais." },
  { t: "8. Auditoria", p: "O Cliente pode auditar a conformidade até uma vez por ano, mediante aviso prévio de 30 dias, ou receber relatórios SOC 2 atualizados." },
  { t: "9. Devolução e Eliminação", p: "Ao término do contrato, os dados serão devolvidos ou eliminados em até 60 dias, conforme escolha do Cliente." },
];

function DpaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Legal</span>
        <h1 className="mt-3 font-heading text-4xl font-medium sm:text-5xl">Acordo de Processamento de Dados</h1>
        <p className="mt-4 text-sm text-muted-foreground">Última atualização: 23 de junho de 2026</p>
        <div className="mt-12 space-y-10">
          {CLAUSES.map((s) => (
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
