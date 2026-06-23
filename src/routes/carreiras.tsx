import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, Briefcase, DollarSign, Clock } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/carreiras")({
  head: () => ({
    meta: [
      { title: "Carreiras — Aura" },
      { name: "description", content: "Junte-se à Aura. Construímos tecnologia para o desenvolvimento humano." },
    ],
  }),
  component: CareersPage,
});

type Job = {
  id: string;
  title: string;
  team: string;
  mode: "Remoto" | "Híbrido" | "Presencial";
  city: string;
  seniority: "Júnior" | "Pleno" | "Sênior" | "Staff" | "Principal";
  years: number;
  salary: number; // base anual em R$ mil
};

const JOBS: Job[] = [
  { id: "1", title: "Pesquisador(a) em IA Fundacional", team: "Research", mode: "Remoto", city: "—", seniority: "Sênior", years: 6, salary: 480 },
  { id: "2", title: "Engenheiro(a) de Machine Learning", team: "Modelos", mode: "Híbrido", city: "São Paulo", seniority: "Pleno", years: 4, salary: 360 },
  { id: "3", title: "Engenheiro(a) de Infraestrutura GPU", team: "Plataforma", mode: "Presencial", city: "São Paulo", seniority: "Sênior", years: 7, salary: 520 },
  { id: "4", title: "Engenheiro(a) Front-end", team: "Produto", mode: "Remoto", city: "—", seniority: "Pleno", years: 3, salary: 240 },
  { id: "5", title: "Engenheiro(a) Back-end Distribuído", team: "Plataforma", mode: "Remoto", city: "—", seniority: "Sênior", years: 6, salary: 420 },
  { id: "6", title: "Designer de Produto", team: "Produto", mode: "Híbrido", city: "Rio de Janeiro", seniority: "Pleno", years: 4, salary: 240 },
  { id: "7", title: "Especialista em Segurança Ofensiva", team: "Segurança", mode: "Remoto", city: "—", seniority: "Sênior", years: 6, salary: 460 },
  { id: "8", title: "Engenheiro(a) de Dados", team: "Plataforma", mode: "Híbrido", city: "São Paulo", seniority: "Pleno", years: 4, salary: 300 },
  { id: "9", title: "Cientista de Dados Aplicada", team: "Aplicações", mode: "Remoto", city: "—", seniority: "Júnior", years: 1, salary: 156 },
  { id: "10", title: "Gerente de Engenharia", team: "Plataforma", mode: "Presencial", city: "São Paulo", seniority: "Staff", years: 9, salary: 600 },
  { id: "11", title: "Pesquisador(a) em Alinhamento", team: "Research", mode: "Remoto", city: "—", seniority: "Principal", years: 12, salary: 780 },
  { id: "12", title: "Engenheiro(a) DevRel", team: "Comunidade", mode: "Híbrido", city: "São Paulo", seniority: "Pleno", years: 4, salary: 280 },
];

const MODES = ["Todos", "Remoto", "Híbrido", "Presencial"] as const;

function CareersPage() {
  const [q, setQ] = useState("");
  const [mode, setMode] = useState<(typeof MODES)[number]>("Todos");
  const [minSalary, setMinSalary] = useState(0);
  const [minYears, setMinYears] = useState(0);

  const filtered = useMemo(
    () =>
      JOBS.filter((j) => {
        if (q && !`${j.title} ${j.team}`.toLowerCase().includes(q.toLowerCase())) return false;
        if (mode !== "Todos" && j.mode !== mode) return false;
        if (j.salary < minSalary) return false;
        if (j.years < minYears) return false;
        return true;
      }),
    [q, mode, minSalary, minYears],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto max-w-5xl px-6 pt-32 pb-12 text-center">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Carreiras</span>
        <h1 className="mt-3 font-heading text-4xl font-medium sm:text-5xl">Construa o futuro com a Aura.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          Procuramos pessoas excepcionais para desenvolver tecnologias que ampliam capacidades humanas.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        {/* Filters */}
        <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar vaga, time ou tecnologia..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="mt-5 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Modalidade</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {MODES.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition ${
                      mode === m
                        ? "border-transparent bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>Salário mínimo</span>
                <span className="text-foreground">R$ {minSalary}k/ano</span>
              </p>
              <input
                type="range"
                min={0}
                max={800}
                step={20}
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                className="mt-3 w-full accent-foreground"
              />
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                <span>R$ 0</span>
                <span>R$ 800k</span>
              </div>
            </div>

            <div>
              <p className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>Tempo de experiência</span>
                <span className="text-foreground">{minYears}+ anos</span>
              </p>
              <input
                type="range"
                min={0}
                max={15}
                step={1}
                value={minYears}
                onChange={(e) => setMinYears(Number(e.target.value))}
                className="mt-3 w-full accent-foreground"
              />
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                <span>0</span>
                <span>15+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <p className="mt-8 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "vaga encontrada" : "vagas encontradas"}
        </p>

        <ul className="mt-4 space-y-3">
          {filtered.map((j) => (
            <li
              key={j.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{j.team}</p>
                <h3 className="mt-1 font-heading text-lg font-medium">{j.title}</h3>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {j.mode}{j.city !== "—" ? ` · ${j.city}` : ""}</span>
                  <span className="inline-flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> {j.seniority}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {j.years}+ anos</span>
                  <span className="inline-flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5" /> R$ {j.salary}k/ano</span>
                </div>
              </div>
              <button className="shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
                Candidatar-se
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              Nenhuma vaga corresponde aos filtros selecionados.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
