import { Broker, getZoneLabel, RankZone } from "@/data/mock";
import { TrendingUp, TrendingDown, Minus, Sparkles } from "lucide-react";
import Link from "next/link";

interface Props {
  broker: Broker;
  compact?: boolean;
}

export function RankMovement({ broker }: { broker: Broker }) {
  if (broker.movement === "up") {
    return (
      <span className="movement-up" style={{ display: "flex", alignItems: "center", gap: 3 }}>
        <TrendingUp size={12} />
        +{broker.movementValue} posição{broker.movementValue > 1 ? "ões" : ""}
      </span>
    );
  }
  if (broker.movement === "down") {
    return (
      <span className="movement-down" style={{ display: "flex", alignItems: "center", gap: 3 }}>
        <TrendingDown size={12} />
        -{broker.movementValue} posição{broker.movementValue > 1 ? "ões" : ""}
      </span>
    );
  }
  if (broker.movement === "new") {
    return (
      <span className="movement-new" style={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Sparkles size={12} />
        Novo no ranking
      </span>
    );
  }
  return (
    <span className="movement-stable" style={{ display: "flex", alignItems: "center", gap: 3 }}>
      <Minus size={12} />
      Estável
    </span>
  );
}

export function ScoreBadge({ score, label }: { score: number; label: string }) {
  const color = score >= 90 ? "#c9a84c" : score >= 75 ? "#00c896" : score >= 60 ? "#4299e1" : "#718096";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <div className="score-number" style={{ fontSize: 28, color, lineHeight: 1 }}>{score}</div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color }}>{label}</div>
    </div>
  );
}

export function TrustScoreBadge({ score }: { score: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <div className="score-number" style={{ fontSize: 18, color: "#4a5568", lineHeight: 1 }}>{score}</div>
      <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "#a0aec0" }}>Confiança</div>
    </div>
  );
}

export function ZoneBadge({ zone }: { zone: RankZone }) {
  const classes: Record<RankZone, string> = {
    "Elite": "zone-elite",
    "Ascensão": "zone-ascensao",
    "Pressão": "zone-pressao",
    "Fora do Radar": "zone-fora",
  };
  return (
    <span className={`badge ${classes[zone]}`} style={{ fontSize: 10 }}>
      {getZoneLabel(zone)}
    </span>
  );
}

export default function BrokerRankCard({ broker, compact = false }: Props) {
  const isTop3 = broker.rank <= 3;
  const isRank1 = broker.rank === 1;

  return (
    <div
      className={`broker-card ${isRank1 ? "rank-1-card" : ""}`}
      style={{
        padding: compact ? "14px 20px" : "20px 24px",
        borderLeft: isTop3 ? `3px solid ${isRank1 ? "#c9a84c" : broker.rank === 2 ? "#a0aec0" : "#cd7f32"}` : "3px solid transparent",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Rank */}
        <div style={{ minWidth: compact ? 36 : 48, textAlign: "center" }}>
          <div className="rank-number" style={{
            fontSize: compact ? 22 : 28,
            color: isRank1 ? "#c9a84c" : broker.rank <= 3 ? "#0d1b2a" : "#4a5568",
          }}>
            #{broker.rank}
          </div>
          <div style={{ marginTop: 2 }}>
            <RankMovement broker={broker} />
          </div>
        </div>

        {/* Avatar */}
        <div className="broker-avatar" style={{ fontSize: compact ? 14 : 16 }}>
          {broker.avatar}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <Link href={`/broker/${broker.slug}`} style={{ textDecoration: "none" }}>
              <span style={{
                fontSize: compact ? 14 : 15,
                fontWeight: 700,
                color: "var(--text-primary)",
                fontFamily: "Space Grotesk, sans-serif",
              }}>
                {broker.name}
              </span>
            </Link>
            <ZoneBadge zone={broker.zone} />
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
            {broker.city}, {broker.state}
          </div>
          {!compact && (
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4, fontStyle: "italic" }}>
              {broker.microcopy}
            </div>
          )}
          {!compact && (
            <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
              {broker.mainNeighborhoods.slice(0, 2).map(n => (
                <span key={n} style={{ fontSize: 10, padding: "2px 8px", background: "#f1f5f9", borderRadius: 4, color: "#4a5568", fontWeight: 500 }}>{n}</span>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {!compact && (
          <div className="hide-mobile" style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 2 }}>Anúncios</div>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "Space Grotesk, sans-serif", color: "var(--text-primary)" }}>
                {broker.activeListings.toLocaleString("pt-BR")}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 2 }}>Ticket</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>
                {broker.avgTicket}
              </div>
            </div>
          </div>
        )}

        {/* Score */}
        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <ScoreBadge score={broker.score} label={broker.scoreLabel} />
          {!compact && (
            <div style={{ display: "flex", gap: 8 }}>
              <Link href={`/broker/${broker.slug}`}>
                <button className="btn-ghost" style={{ padding: "6px 12px", fontSize: 11 }}>Ver perfil</button>
              </Link>
              <Link href={`/compare?a=${broker.slug}`}>
                <button className="btn-ghost" style={{ padding: "6px 12px", fontSize: 11 }}>Comparar</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Badge strip */}
      {!compact && broker.badge && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
          <span className="badge badge-gold" style={{ fontSize: 10 }}>★ {broker.badge}</span>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Score de Confiança: <strong>{broker.trustScore}</strong>
          </span>
          <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: "auto" }}>
            Creci: {broker.creci}
          </span>
        </div>
      )}
    </div>
  );
}
