import type { Metadata } from "next";
import Link from "next/link";
import { scoreComponents } from "@/data/mock";
import { Shield, Database, TrendingUp, RefreshCw, AlertTriangle, ChevronRight, BarChart2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Metodologia | Top Brokers Brasil",
  description: "Como calculamos o Índice de Presença Competitiva. Transparência total sobre fontes, pesos e evolução da metodologia.",
};

const components = [
  { key: "activity", label: "Atividade", pct: 40, color: "#c9a84c", desc: "Número de anúncios ativos e frequência de publicação nos portais." },
  { key: "portfolioCoverage", label: "Cobertura de portfólio", pct: 20, color: "#00c896", desc: "Diversidade de tipos de imóvel e abrangência geográfica." },
  { key: "dataReliability", label: "Confiabilidade dos dados", pct: 20, color: "#4299e1", desc: "Consistência e completude das informações mapeadas." },
  { key: "consistency", label: "Consistência", pct: 10, color: "#9f7aea", desc: "Presença continuada ao longo das semanas." },
  { key: "marketRelevance", label: "Relevância de mercado", pct: 10, color: "#ed8936", desc: "Alinhamento com os portais mais relevantes do mercado local." },
];

const futureMetics = [
  "Giro de estoque — velocidade de remoção de anúncios",
  "Eficiência de remoção — proxy de transação",
  "Tempo médio de anúncio ativo",
  "Sinais de transação detectados",
  "Avaliação do comprador",
  "Validação do corretor pela imobiliária",
];

const sources = [
  { name: "ZAP Imóveis", priority: "Alta", type: "Portal nacional" },
  { name: "VivaReal", priority: "Alta", type: "Portal nacional" },
  { name: "OLX Imóveis", priority: "Média", type: "Marketplace" },
  { name: "QuintoAndar", priority: "Média", type: "Plataforma de aluguel" },
  { name: "Imóveis SC", priority: "Média", type: "Portal regional" },
];

export default function MethodologyPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ background: "var(--navy)", padding: "60px 24px 52px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            background: "#c9a84c22",
            border: "1px solid #c9a84c44",
            borderRadius: 9999,
            fontSize: 11,
            fontWeight: 700,
            color: "#c9a84c",
            letterSpacing: "0.06em",
            marginBottom: 24,
          }}>
            <Shield size={13} />
            METODOLOGIA TRANSPARENTE — V0
          </div>

          <h1 style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 800,
            color: "white",
            marginBottom: 16,
            lineHeight: 1.05,
          }}>
            Como calculamos o índice
          </h1>

          <p style={{ fontSize: 17, color: "#a0aec0", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
            Top Brokers Brasil não afirma venda realizada sem evidência.
            O índice mede <strong style={{ color: "white" }}>presença pública</strong>,{" "}
            <strong style={{ color: "white" }}>atividade</strong> e{" "}
            <strong style={{ color: "white" }}>sinais de capacidade comercial</strong>.
          </p>
        </div>
      </div>

      {/* V0 Notice */}
      <div style={{ background: "#fdf6e3", borderBottom: "1px solid #c9a84c33", padding: "14px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#92710d" }}>
          <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <strong>V0 — Índice de Presença Competitiva.</strong> Esta é a versão inicial do índice.
            A metodologia evolui à medida que novos dados são incorporados.
            Em breve: <strong>Índice de Capacidade de Fechamento</strong>.
          </div>
        </div>
      </div>

      <div style={{ padding: "64px 24px", maxWidth: 900, margin: "0 auto" }}>

        {/* Score formula */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 26, fontWeight: 800, color: "var(--navy)", marginBottom: 8 }}>
            Fórmula do índice (V0)
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 28, lineHeight: 1.7 }}>
            O score é calculado semanalmente com base em 5 dimensões de evidência pública:
          </p>

          <div style={{
            background: "var(--navy)",
            borderRadius: 12,
            padding: "20px 24px",
            marginBottom: 32,
            fontFamily: "monospace",
            fontSize: 14,
            color: "#a0aec0",
            lineHeight: 2,
            overflowX: "auto",
          }}>
            <span style={{ color: "#c9a84c" }}>IPC_V0</span> = {"{"}<br />
            {"  "}<span style={{ color: "#00c896" }}>activity</span>: <span style={{ color: "white" }}>40%</span>,<br />
            {"  "}<span style={{ color: "#4299e1" }}>portfolioCoverage</span>: <span style={{ color: "white" }}>20%</span>,<br />
            {"  "}<span style={{ color: "#9f7aea" }}>dataReliability</span>: <span style={{ color: "white" }}>20%</span>,<br />
            {"  "}<span style={{ color: "#ed8936" }}>consistency</span>: <span style={{ color: "white" }}>10%</span>,<br />
            {"  "}<span style={{ color: "#f687b3" }}>marketRelevance</span>: <span style={{ color: "white" }}>10%</span><br />
            {"}"}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {components.map(c => (
              <div key={c.key} style={{
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "20px 24px",
                boxShadow: "var(--shadow-sm)",
                borderLeft: `4px solid ${c.color}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
                      {c.label}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{c.desc}</div>
                  </div>
                  <div style={{
                    fontSize: 28,
                    fontWeight: 800,
                    fontFamily: "Space Grotesk, sans-serif",
                    color: c.color,
                    flexShrink: 0,
                    marginLeft: 20,
                  }}>
                    {c.pct}%
                  </div>
                </div>
                <div className="progress-track" style={{ height: 8 }}>
                  <div className="score-bar-fill" style={{ width: `${c.pct * 2.5}%`, height: "100%", background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Score labels */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 26, fontWeight: 800, color: "var(--navy)", marginBottom: 8 }}>
            Categorias de score
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.7 }}>
            Cada corretor recebe uma categoria baseada no score calculado:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
            {[
              { range: "90–100", label: "Elite", color: "#c9a84c", bg: "#fdf6e3" },
              { range: "75–89", label: "Consistente", color: "#00c896", bg: "#e6fff8" },
              { range: "60–74", label: "Ascendente", color: "#4299e1", bg: "#ebf8ff" },
              { range: "40–59", label: "Em observação", color: "#ed8936", bg: "#fff7ed" },
              { range: "0–39", label: "Invisível", color: "#718096", bg: "#f7f7f7" },
            ].map(s => (
              <div key={s.label} style={{
                background: s.bg,
                border: `1px solid ${s.color}33`,
                borderRadius: 10,
                padding: "16px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "Space Grotesk, sans-serif", color: s.color, marginBottom: 4 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>{s.range}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Data sources */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 26, fontWeight: 800, color: "var(--navy)", marginBottom: 8 }}>
            Fontes de dados
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.7 }}>
            V0 coleta exclusivamente dados públicos disponíveis nos principais portais imobiliários brasileiros:
          </p>

          <div style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "var(--shadow-sm)",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 120px 160px",
              background: "#f8fafc",
              padding: "12px 20px",
              borderBottom: "1px solid var(--border)",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--text-muted)",
            }}>
              <span>Portal</span>
              <span>Prioridade</span>
              <span>Tipo</span>
            </div>
            {sources.map((s, i) => (
              <div key={s.name} style={{
                display: "grid",
                gridTemplateColumns: "1fr 120px 160px",
                padding: "14px 20px",
                borderBottom: i < sources.length - 1 ? "1px solid var(--border)" : "none",
                alignItems: "center",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Database size={14} color="var(--text-muted)" />
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{s.name}</span>
                </div>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: 9999,
                  background: s.priority === "Alta" ? "#e6fff8" : "#fdf6e3",
                  color: s.priority === "Alta" ? "#047857" : "#92710d",
                  border: `1px solid ${s.priority === "Alta" ? "#00c89644" : "#c9a84c44"}`,
                  display: "inline-block",
                }}>
                  {s.priority}
                </span>
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{s.type}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Future metrics */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 26, fontWeight: 800, color: "var(--navy)", marginBottom: 8 }}>
            Próximas camadas do índice
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.7 }}>
            O Índice de Capacidade de Fechamento (ICF) será ativado quando houver dados suficientes para as seguintes métricas:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
            {futureMetics.map((m, i) => (
              <div key={i} style={{
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "16px 18px",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 12,
                }}>
                  🔜
                </div>
                <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{m}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Legal note */}
        <section style={{
          padding: "28px 32px",
          background: "#f8fafc",
          border: "1px solid var(--border)",
          borderRadius: 14,
          marginBottom: 48,
        }}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <Shield size={20} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
                Nota legal e de transparência
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75 }}>
                Top Brokers Brasil coleta exclusivamente dados de anúncios públicos disponíveis em portais imobiliários.
                O índice <strong>não afirma que vendas foram realizadas</strong>, não confirma comissões e não representa
                avaliação de competência profissional. É uma medida de presença pública e atividade observável.
                Corretores podem reivindicar seu perfil para corrigir dados incorretos.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>
            Seu nome está sendo medido.
          </h3>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 24 }}>
            Veja onde você está no ranking e reivindique seu perfil.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/ranking/florianopolis">
              <button className="btn-primary" style={{ padding: "13px 28px", fontSize: 15 }}>
                Ver ranking
                <ChevronRight size={15} />
              </button>
            </Link>
            <Link href="/claim">
              <button className="btn-ghost" style={{ padding: "13px 28px", fontSize: 15 }}>
                Reivindicar perfil
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
