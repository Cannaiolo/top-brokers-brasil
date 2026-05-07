"use client";
import { Broker, brokers, listings, brokersAboveRicardo, brokersBelowRicardo } from "@/data/mock";
import { RankMovement, ScoreBadge, TrustScoreBadge, ZoneBadge } from "@/components/BrokerRankCard";
import BrokerFingerprint from "@/components/BrokerFingerprint";
import ListingTable from "@/components/ListingTable";
import ShareCardGenerator from "@/components/ShareCardGenerator";
import Link from "next/link";
import { useState } from "react";
import {
  MapPin, Award, Building2, DollarSign, ArrowRight,
  ChevronUp, ChevronDown, Minus, ExternalLink, User
} from "lucide-react";

interface Props {
  broker: Broker;
}

const TABS = ["Resumo", "Fingerprint", "Anúncios", "Comparar", "Compartilhar"] as const;
type Tab = typeof TABS[number];

export default function BrokerProfileClient({ broker }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("Resumo");
  const brokerListings = listings.filter(l => l.brokerId === broker.id);
  const above = brokers.filter(b => b.rank < broker.rank && b.rank >= broker.rank - 3);
  const below = brokers.filter(b => b.rank > broker.rank && b.rank <= broker.rank + 3);

  const heroHeadline = () => {
    if (broker.rank <= 10) return `${broker.name} está entre os corretores mais visíveis de ${broker.city}.`;
    if (broker.score >= 60) return `${broker.name} está disputando espaço no ranking.`;
    return `${broker.name} ainda tem baixa evidência pública.`;
  };

  return (
    <div>
      {/* Profile header */}
      <div style={{ background: "var(--navy)", padding: "48px 24px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#718096", marginBottom: 24 }}>
            <Link href="/" style={{ color: "#718096", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/ranking/florianopolis" style={{ color: "#718096", textDecoration: "none" }}>Ranking Florianópolis</Link>
            <span>/</span>
            <span style={{ color: "#a0aec0" }}>{broker.name}</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            {/* Avatar */}
            <div className="broker-avatar-lg" />

            {/* Identity */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
                <h1 style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "clamp(22px, 4vw, 36px)",
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1,
                }}>
                  {broker.name}
                </h1>
                <ZoneBadge zone={broker.zone} />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#a0aec0" }}>
                  <MapPin size={13} />
                  {broker.city}, {broker.state}
                </div>
                <div style={{ fontSize: 13, color: "#718096" }}>CRECI: {broker.creci}</div>
                <div>
                  <RankMovement broker={broker} />
                </div>
              </div>

              <p style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#c9a84c",
                fontStyle: "italic",
                marginBottom: 16,
              }}>
                "{heroHeadline()}"
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {broker.badge && (
                  <span className="badge" style={{
                    background: "#c9a84c22",
                    border: "1px solid #c9a84c44",
                    color: "#c9a84c",
                    fontSize: 11,
                  }}>
                    ★ {broker.badge}
                  </span>
                )}
                {broker.claimedProfile && (
                  <span className="badge badge-green" style={{ fontSize: 11 }}>✓ Perfil reivindicado</span>
                )}
              </div>
            </div>

            {/* Score block */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              padding: "20px 28px",
              background: "#111111",
              borderRadius: 14,
              border: "1px solid #1e2d3d",
              minWidth: 160,
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#718096", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Rank</div>
                <div className="rank-number" style={{ fontSize: 48, color: "#c9a84c" }}>#{broker.rank}</div>
                <div style={{ fontSize: 12, color: "#718096" }}>em {broker.city}</div>
              </div>
              <div style={{ width: "100%", height: 1, background: "#1e2d3d" }} />
              <ScoreBadge score={broker.score} label={broker.scoreLabel} />
              <TrustScoreBadge score={broker.trustScore} />
            </div>
          </div>

          {/* Tabs */}
          <div style={{
            display: "flex",
            gap: 0,
            marginTop: 32,
            borderBottom: "none",
          }}>
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "13px 20px",
                  background: "none",
                  border: "none",
                  borderBottom: `2px solid ${activeTab === tab ? "#c9a84c" : "transparent"}`,
                  color: activeTab === tab ? "white" : "#718096",
                  fontWeight: activeTab === tab ? 700 : 500,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div style={{ padding: "40px 24px", maxWidth: 1200, margin: "0 auto" }}>

        {/* ── RESUMO ── */}
        {activeTab === "Resumo" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
            {/* Left: Stats */}
            <div>
              <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 20 }}>
                Resumo competitivo
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                {[
                  { label: "Rank na cidade", value: `#${broker.rank}`, icon: <Award size={16} color="#c9a84c" />, highlight: true },
                  { label: "Score de Presença", value: broker.score, icon: <ArrowRight size={16} color="#00c896" /> },
                  { label: "Anúncios ativos", value: broker.activeListings.toLocaleString("pt-BR"), icon: <Building2 size={16} color="#4299e1" /> },
                  { label: "Ticket médio", value: broker.avgTicket, icon: <DollarSign size={16} color="#9f7aea" /> },
                  { label: "Score de Confiança", value: broker.trustScore, icon: <Award size={16} color="#ed8936" /> },
                ].map(stat => (
                  <div key={stat.label} className="stat-card" style={{
                    borderLeft: stat.highlight ? "3px solid #c9a84c" : "1px solid var(--border)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      {stat.icon}
                      <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{stat.label}</span>
                    </div>
                    <div style={{
                      fontSize: stat.highlight ? 28 : 22,
                      fontWeight: 800,
                      fontFamily: "Space Grotesk, sans-serif",
                      color: stat.highlight ? "#c9a84c" : "var(--navy)",
                      lineHeight: 1,
                    }}>
                      {stat.value}
                    </div>
                  </div>
                ))}

                {/* Neighborhoods */}
                <div className="stat-card" style={{ gridColumn: "1 / -1" }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 10 }}>
                    Principais bairros
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {broker.mainNeighborhoods.map(n => (
                      <span key={n} style={{
                        padding: "5px 12px",
                        background: "#f1f5f9",
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--navy)",
                        border: "1px solid var(--border)",
                      }}>
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Property mix */}
              <div className="stat-card">
                <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 14 }}>
                  Mix de imóveis
                </div>
                {broker.propertyMix.map(pm => (
                  <div key={pm.type} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                      <span style={{ fontWeight: 600 }}>{pm.type}</span>
                      <span style={{ fontWeight: 700, color: "var(--navy)" }}>{pm.pct}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="score-bar-fill" style={{ width: `${pm.pct}%`, height: "100%", background: "var(--navy)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: competitors + claim */}
            <div>
              <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 20 }}>
                Contexto competitivo
              </h2>

              {/* Above */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
                  <ChevronUp size={14} color="#00c896" />
                  Quem está acima
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {above.map(b => (
                    <Link key={b.id} href={`/broker/${b.slug}`} style={{ textDecoration: "none" }}>
                      <div className="broker-card" style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                        <div className="rank-number" style={{ fontSize: 18, color: "var(--navy)", minWidth: 32 }}>#{b.rank}</div>
                        <div className="broker-avatar" style={{ width: 32, height: 32, fontSize: 12 }}>{b.avatar}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{b.name}</div>
                          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Score {b.score} · {b.activeListings.toLocaleString()} anúncios</div>
                        </div>
                        <div style={{ fontSize: 12, color: "#00c896", fontWeight: 600 }}>
                          +{broker.rank - b.rank} pos
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Current position */}
              <div style={{ padding: "16px", background: "#fdf6e3", border: "2px solid #c9a84c44", borderRadius: 10, marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div className="broker-avatar" style={{ background: "#c9a84c22", color: "#92710d" }}>{broker.avatar}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>{broker.name} — VOCÊ</div>
                    <div style={{ fontSize: 12, color: "#92710d" }}>#{broker.rank} · Score {broker.score}</div>
                  </div>
                </div>
              </div>

              {/* Below */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
                  <ChevronDown size={14} color="#e53e3e" />
                  Quem está abaixo
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {below.map(b => (
                    <Link key={b.id} href={`/broker/${b.slug}`} style={{ textDecoration: "none" }}>
                      <div className="broker-card" style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                        <div className="rank-number" style={{ fontSize: 18, color: "#4a5568", minWidth: 32 }}>#{b.rank}</div>
                        <div className="broker-avatar" style={{ width: 32, height: 32, fontSize: 12 }}>{b.avatar}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{b.name}</div>
                          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Score {b.score} · {b.activeListings.toLocaleString()} anúncios</div>
                        </div>
                        <div style={{ fontSize: 12, color: "#e53e3e", fontWeight: 600 }}>
                          -{b.rank - broker.rank} pos
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <Link href={`/compare?a=${broker.slug}`}>
                <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Comparar com concorrente
                  <ArrowRight size={14} />
                </button>
              </Link>

              {/* Claim block */}
              {!broker.claimedProfile && (
                <div style={{
                  marginTop: 20,
                  padding: "20px",
                  background: "#f8fafc",
                  border: "1px dashed #cbd5e0",
                  borderRadius: 10,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <User size={16} color="var(--text-muted)" />
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>Esse perfil é seu?</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 14 }}>
                    Reivindique seu perfil para corrigir dados, adicionar evidências e melhorar seu índice.
                  </p>
                  <Link href="/claim">
                    <button className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 13 }}>
                      Reivindicar perfil
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── FINGERPRINT ── */}
        {activeTab === "Fingerprint" && (
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <BrokerFingerprint broker={broker} />
          </div>
        )}

        {/* ── ANÚNCIOS ── */}
        {activeTab === "Anúncios" && (
          <div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>
                  Inteligência de anúncios
                </h2>
                <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  {brokerListings.length} anúncios mapeados · Presença pública como evidência
                </p>
              </div>
              <Link href={`/broker/${broker.slug}/listings`}>
                <button className="btn-ghost" style={{ fontSize: 13 }}>
                  Ver tabela completa
                  <ExternalLink size={13} />
                </button>
              </Link>
            </div>
            <ListingTable listings={brokerListings} />
          </div>
        )}

        {/* ── COMPARAR ── */}
        {activeTab === "Comparar" && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚔️</div>
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>
              Comparar com concorrentes
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 28, maxWidth: 400, margin: "0 auto 28px" }}>
              Veja como {broker.name.split(" ")[0]} se posiciona frente a outros corretores do ranking.
            </p>
            <Link href={`/compare?a=${broker.slug}`}>
              <button className="btn-primary" style={{ fontSize: 15, padding: "13px 28px" }}>
                Abrir comparação
                <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        )}

        {/* ── COMPARTILHAR ── */}
        {activeTab === "Compartilhar" && (
          <div style={{ maxWidth: 520, margin: "0 auto" }}>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>
                Compartilhar status
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                Card profissional pronto para LinkedIn, WhatsApp ou qualquer rede.
              </p>
            </div>
            <ShareCardGenerator broker={broker} />
          </div>
        )}
      </div>
    </div>
  );
}
