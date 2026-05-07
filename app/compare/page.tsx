"use client";
import { useState, useMemo } from "react";
import { brokers, Broker } from "@/data/mock";
import { ScoreBadge, TrustScoreBadge, ZoneBadge, RankMovement } from "@/components/BrokerRankCard";
import ShareCardGenerator from "@/components/ShareCardGenerator";
import Link from "next/link";
import { Search, X, Plus, Minus, Trophy, ArrowRight, Share2 } from "lucide-react";

const DIMENSIONS = [
  { key: "rank", label: "Rank", format: (b: Broker) => `#${b.rank}`, isLower: true },
  { key: "score", label: "Score de Presença", format: (b: Broker) => b.score.toString() },
  { key: "trustScore", label: "Score de Confiança", format: (b: Broker) => b.trustScore.toString() },
  { key: "activeListings", label: "Anúncios ativos", format: (b: Broker) => b.activeListings.toLocaleString("pt-BR") },
  { key: "avgTicket", label: "Ticket médio", format: (b: Broker) => b.avgTicket, noWinner: true },
  { key: "mainNeighborhoods", label: "Bairros cobertos", format: (b: Broker) => b.mainNeighborhoods.length.toString() },
  { key: "zone", label: "Zona de ranking", format: (b: Broker) => b.zone, noWinner: true },
  { key: "movementValue", label: "Movimento (semana)", format: (b: Broker) => `${b.movement === "up" ? "+" : b.movement === "down" ? "-" : ""}${b.movementValue}` },
] as const;

export default function ComparePage() {
  const [selected, setSelected] = useState<Broker[]>([brokers[0], brokers[5]]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [shareIndex, setShareIndex] = useState<number | null>(null);

  const searchResults = useMemo(() => {
    if (!search) return [];
    return brokers.filter(b =>
      b.name.toLowerCase().includes(search.toLowerCase()) &&
      !selected.find(s => s.id === b.id)
    ).slice(0, 5);
  }, [search, selected]);

  const addBroker = (b: Broker) => {
    if (selected.length < 4 && !selected.find(s => s.id === b.id)) {
      setSelected([...selected, b]);
      setSearch("");
      setShowSearch(false);
    }
  };

  const removeBroker = (id: string) => {
    setSelected(selected.filter(b => b.id !== id));
  };

  const getWinner = (dim: typeof DIMENSIONS[number]) => {
    if (dim.noWinner) return null;
    const vals = selected.map(b => {
      if (dim.key === "rank") return b.rank;
      if (dim.key === "mainNeighborhoods") return b.mainNeighborhoods.length;
      return (b as any)[dim.key] as number;
    });
    const best = dim.isLower ? Math.min(...vals) : Math.max(...vals);
    return selected.findIndex(b => {
      if (dim.key === "rank") return b.rank === best;
      if (dim.key === "mainNeighborhoods") return b.mainNeighborhoods.length === best;
      return (b as any)[dim.key] === best;
    });
  };

  const headline = () => {
    if (selected.length < 2) return "Selecione corretores para comparar";
    return `${selected[0].name} vs ${selected[1].name}${selected.length > 2 ? ` + ${selected.length - 2}` : ""}`;
  };

  const insights = () => {
    if (selected.length < 2) return [];
    const [a, b] = selected;
    const result = [];
    if (a.activeListings > b.activeListings) {
      result.push(`${a.name} tem mais presença em portais.`);
    } else {
      result.push(`${b.name} tem maior volume total de anúncios.`);
    }
    if (a.mainNeighborhoods.some(n => b.mainNeighborhoods.includes(n))) {
      result.push(`Ambos disputam os mesmos bairros.`);
    }
    if (a.score > b.score) {
      result.push(`${a.name} lidera em score de presença.`);
    } else {
      result.push(`${b.name} lidera em score de presença.`);
    }
    return result;
  };

  return (
    <div>
      {/* Header */}
      <div style={{ background: "var(--navy)", padding: "48px 24px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(24px, 4vw, 44px)",
            fontWeight: 800,
            color: "white",
            marginBottom: 8,
          }}>
            {headline()}
          </h1>
          <p style={{ fontSize: 14, color: "#a0aec0" }}>
            Compare de 2 a 4 corretores. Dados públicos. Evidência real.
          </p>
        </div>
      </div>

      <div style={{ padding: "40px 24px", maxWidth: 1100, margin: "0 auto" }}>
        {/* Broker selector */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36, alignItems: "flex-start" }}>
          {selected.map((b, i) => (
            <div key={b.id} style={{
              background: "white",
              border: "1.5px solid var(--navy)",
              borderRadius: 12,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              minWidth: 220,
            }}>
              <div className="broker-avatar" style={{ width: 36, height: 36, fontSize: 13 }}>{b.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {b.name}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>#{b.rank} · Score {b.score}</div>
              </div>
              {selected.length > 2 && (
                <button onClick={() => removeBroker(b.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 2 }}>
                  <X size={14} />
                </button>
              )}
            </div>
          ))}

          {selected.length < 4 && (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowSearch(!showSearch)}
                style={{
                  border: "1.5px dashed #cbd5e0",
                  borderRadius: 12,
                  padding: "14px 20px",
                  background: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  transition: "all 0.2s",
                }}
              >
                <Plus size={16} />
                Adicionar corretor
              </button>

              {showSearch && (
                <div style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  zIndex: 100,
                  background: "white",
                  border: "1.5px solid var(--navy)",
                  borderRadius: 12,
                  boxShadow: "var(--shadow-lg)",
                  width: 280,
                  overflow: "hidden",
                }}>
                  <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border)", position: "relative" }}>
                    <Search size={14} style={{ position: "absolute", left: 26, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                    <input
                      autoFocus
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Buscar corretor..."
                      style={{
                        width: "100%",
                        padding: "7px 10px 7px 28px",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        fontSize: 13,
                        outline: "none",
                        fontFamily: "Inter, sans-serif",
                      }}
                    />
                  </div>
                  {(search ? searchResults : brokers.filter(b => !selected.find(s => s.id === b.id)).slice(0, 6)).map(b => (
                    <div
                      key={b.id}
                      className="table-row-hover"
                      onClick={() => addBroker(b)}
                      style={{ padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <div className="rank-number" style={{ fontSize: 14, color: "var(--navy)", minWidth: 28 }}>#{b.rank}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{b.name}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Score {b.score}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Insights */}
        {selected.length >= 2 && (
          <div style={{
            background: "var(--navy)",
            borderRadius: 14,
            padding: "24px 28px",
            marginBottom: 32,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#c9a84c", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>
              ⚡ Análise automática
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {insights().map((insight, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: 9999,
                    background: "#1e2d3d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}>
                    <Trophy size={11} color="#c9a84c" />
                  </div>
                  <span style={{ fontSize: 14, color: "#e2e8f0", lineHeight: 1.5 }}>{insight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison table */}
        <div style={{
          background: "white",
          border: "1px solid var(--border)",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "var(--shadow-sm)",
          marginBottom: 32,
        }}>
          {/* Table header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: `200px repeat(${selected.length}, 1fr)`,
            background: "var(--navy)",
          }}>
            <div style={{ padding: "16px 20px", fontSize: 11, fontWeight: 700, color: "#718096", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Dimensão
            </div>
            {selected.map(b => (
              <div key={b.id} style={{ padding: "16px 20px", textAlign: "center", borderLeft: "1px solid #1e2d3d" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "white", fontFamily: "Space Grotesk, sans-serif" }}>{b.name}</div>
                <div style={{ fontSize: 11, color: "#718096" }}>#{b.rank}</div>
              </div>
            ))}
          </div>

          {/* Rows */}
          {DIMENSIONS.map((dim, di) => {
            const winnerIdx = getWinner(dim);
            return (
              <div
                key={dim.key}
                style={{
                  display: "grid",
                  gridTemplateColumns: `200px repeat(${selected.length}, 1fr)`,
                  borderBottom: di < DIMENSIONS.length - 1 ? "1px solid var(--border)" : "none",
                  background: di % 2 === 0 ? "white" : "#fafafa",
                }}
              >
                <div className="compare-cell" style={{ fontWeight: 600, fontSize: 13, color: "var(--text-secondary)" }}>
                  {dim.label}
                </div>
                {selected.map((b, bi) => (
                  <div
                    key={b.id}
                    className={`compare-cell ${!dim.noWinner && winnerIdx === bi ? "compare-winner" : ""}`}
                    style={{ textAlign: "center", borderLeft: "1px solid var(--border)", fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
                  >
                    {dim.format(b)}
                    {!dim.noWinner && winnerIdx === bi && (
                      <span style={{ marginLeft: 6, fontSize: 12 }}>🏆</span>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Movement row */}
        <div style={{
          background: "white",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: "20px 24px",
          marginBottom: 32,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>
            Momentum desta semana
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {selected.map(b => (
              <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "#f8fafc", borderRadius: 8, border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{b.name}</div>
                <RankMovement broker={b} />
              </div>
            ))}
          </div>
        </div>

        {/* Share + new compare */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {selected[0] && (
            <button
              className="btn-primary"
              onClick={() => {
                const url = `${window.location.origin}/compare?a=${selected.map(b => b.slug).join("&b=")}`;
                navigator.clipboard.writeText(url);
                alert("Link da comparação copiado!");
              }}
            >
              <Share2 size={14} />
              Compartilhar comparação
            </button>
          )}
          <button
            className="btn-ghost"
            onClick={() => {
              setSelected([brokers[0], brokers[5]]);
              setSearch("");
            }}
          >
            <X size={14} />
            Criar nova disputa
          </button>
        </div>

        {/* Share cards */}
        {selected.length >= 2 && (
          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 20 }}>
              Cards para compartilhar
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24 }}>
              {selected.slice(0, 2).map(b => (
                <div key={b.id}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 10 }}>
                    Card de {b.name}
                  </div>
                  <ShareCardGenerator broker={b} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
