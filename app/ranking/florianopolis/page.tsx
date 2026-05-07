import type { Metadata } from "next";
import { brokers } from "@/data/mock";
import CityLeaderboard from "@/components/CityLeaderboard";
import Link from "next/link";
import { MapPin, Info, ArrowRight, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Ranking Florianópolis | Top Brokers Brasil",
  description: "Top 50 corretores imobiliários de Florianópolis por atividade pública mapeada. Dados semanais.",
};

export default function RankingFlorianopolisPage() {
  const totalListings = brokers.reduce((s, b) => s + b.activeListings, 0);

  return (
    <div>
      {/* Page header */}
      <div style={{
        background: "var(--navy)",
        padding: "48px 24px 40px",
        borderBottom: "1px solid var(--border-dark)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#718096", marginBottom: 20 }}>
            <Link href="/" style={{ color: "#718096", textDecoration: "none" }}>Top Brokers Brasil</Link>
            <span>/</span>
            <span style={{ color: "#a0aec0" }}>Ranking Florianópolis</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <MapPin size={18} color="#c9a84c" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#c9a84c" }}>Florianópolis, SC</span>
                <span style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#047857",
                  background: "#e6fff822",
                  padding: "2px 10px",
                  borderRadius: 9999,
                  border: "1px solid #00c89633",
                }}>
                  <span className="live-dot" />
                  ATIVO
                </span>
              </div>

              <h1 style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(28px, 5vw, 48px)",
                fontWeight: 800,
                color: "white",
                lineHeight: 1,
                marginBottom: 12,
              }}>
                Ranking Florianópolis
              </h1>

              <p style={{ fontSize: 15, color: "#a0aec0", lineHeight: 1.6, maxWidth: 520 }}>
                Top {brokers.length} corretores por atividade pública mapeada.
                Dados baseados em anúncios públicos encontrados em portais imobiliários.
                A metodologia evolui semanalmente.
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[
                { label: "Corretores", value: brokers.length },
                { label: "Anúncios ativos", value: totalListings.toLocaleString("pt-BR") },
                { label: "Score médio", value: Math.round(brokers.reduce((s, b) => s + b.score, 0) / brokers.length) },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "white", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 11, color: "#718096", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div style={{ background: "#fdf6e3", borderBottom: "1px solid #c9a84c33", padding: "12px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#92710d" }}>
          <Info size={13} />
          <span>
            <strong>V0 — Índice de Presença Competitiva.</strong> Em breve: Índice de Capacidade de Fechamento.
            Dados coletados de ZAP Imóveis, VivaReal, OLX, QuintoAndar e Imóveis SC.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto", color: "#92710d", flexShrink: 0 }}>
            <RefreshCw size={11} />
            <span style={{ fontSize: 11 }}>Atualizado: 05 mai 2026</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: "48px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <CityLeaderboard />
      </div>

      {/* Claim CTA */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "48px 24px", background: "white" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 10 }}>
            Seu perfil está correto?
          </h3>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.7 }}>
            Se seu nome aparece com dados incorretos, reivindique seu perfil para corrigir e melhorar seu índice.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <Link href="/claim">
              <button className="btn-primary">
                Reivindicar perfil
                <ArrowRight size={14} />
              </button>
            </Link>
            <Link href="/methodology">
              <button className="btn-ghost">Como o score é calculado</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
