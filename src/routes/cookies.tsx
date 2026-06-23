import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [{ title: "Política de Cookies — Aura" }] }),
  component: CookiesPage,
});

const TYPES = [
  { t: "Essenciais", p: "Necessários ao funcionamento da plataforma (sessão, autenticação, segurança). Não podem ser desativados.", time: "Sessão" },
  { t: "Preferências", p: "Armazenam configurações como tema (claro/escuro) e idioma.", time: "12 meses" },
  { t: "Analíticos", p: "Permitem entender, de forma agregada, como a plataforma é usada para melhorar a experiência.", time: "13 meses" },
  { t: "Marketing", p: "Utilizados em ações de comunicação e remarketing; só são ativados com seu consentimento.", time: "6 meses" },
];

function CookiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Legal</span>
        <h1 className="mt-3 font-heading text-4xl font-medium sm:text-5xl">Política de Cookies</h1>
        <p className="mt-4 text-sm text-muted-foreground">Última atualização: 23 de junho de 2026</p>
        <p className="mt-8 text-base leading-relaxed text-muted-foreground">
          Cookies são pequenos arquivos armazenados no seu navegador para tornar a navegação mais
          eficiente e personalizada. Abaixo descrevemos as categorias utilizadas e o tempo de retenção.
        </p>

        <div className="mt-12 overflow-hidden rounded-3xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface/40 text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Categoria</th>
                <th className="px-5 py-3">Finalidade</th>
                <th className="px-5 py-3">Retenção</th>
              </tr>
            </thead>
            <tbody>
              {TYPES.map((c) => (
                <tr key={c.t} className="border-t border-border">
                  <td className="px-5 py-4 font-medium">{c.t}</td>
                  <td className="px-5 py-4 text-muted-foreground">{c.p}</td>
                  <td className="px-5 py-4 text-muted-foreground">{c.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Você pode revisar suas preferências a qualquer momento nas configurações do navegador ou
          em <span className="text-foreground">Conta → Privacidade → Cookies</span>.
        </p>
      </main>
    </div>
  );
}
