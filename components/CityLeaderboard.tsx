"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { brokers, getRankZone, getScoreLabel } from "@/data/mock";
import BrokerRankCard from "./BrokerRankCard";
import { RankZone } from "@/data/mock";

const ZONES: { zone: RankZone; label: string; range: string; desc: string }[] = [
  { zone: "Elite", label: "Zona Elite", range: "#1 – #10", desc: "Os corretores mais visíveis da cidade." },
  { zone: "Ascensão", label: "Zona Ascensão", range: "#11 – #25", desc: "Crescimento consistente. Pressão sobre o Top 10." },
  { zone: "Pressão", label: "Zona Pressão", range: "#26 – #50", desc: "Disputando espaço no radar." },
];

export default function CityLeaderboard() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"score" | "listings" | "trust" | "movement">("score");
  const [filterZone, setFilterZone] = useState<RankZone | "all">("all");

  const filtered = useMemo(() => {
    let result = [...brokers];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.mainNeighborhoods.some(n => n.toLowerCase().includes(q))
      );
    }
    if (filterZone !== "all") {
      result = result.filter(b => b.zone === filterZone);
    }
    if (sortBy === "listings") result.sort((a, b) => b.activeListings - a.activeListings);
    else if (sortBy === "trust") result.sort((a, b) => b.trustScore - a.trustScore);
    else if (sortBy === "movement") result.sort((a, b) => b.movementValue - a.movementValue);
    else result.sort((a, b) => a.rank - b.rank);
    return result;
  }, [search, sortBy, filterZone]);

  const zoneGroups = ZONES.map(z => ({
    ...z,
    brokers: filtered.filter(b => b.zone === z.zone),
  })).filter(z => z.brokers.length > 0);

  return (
    <div>
      {/* Filters */}
      <div style={{
        background: "white",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "16px 20px",
        marginBottom: 24,
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        alignItems: "center",
      }}>
        {/* Search */}
        <div style={{ position: "relative", flex: "1 1 240px" }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            className="search-input"
            style={{ fontSize: 14 }}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar corretor ou bairro..."
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Zone filter */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {(["all", "Elite", "Ascensão", "Pressão"] as const).map(z => (
            <button
              key={z}
              onClick={() => setFilterZone(z)}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                border: "1.5px solid",
                cursor: "pointer",
                transition: "all 0.15s",
                background: filterZone === z ? "var(--navy)" : "transparent",
                color: filterZone === z ? "white" : "var(--text-secondary)",
                borderColor: filterZone === z ? "var(--navy)" : "var(--border)",
              }}
            >
              {z === "all" ? "Todos" : z}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
          <SlidersHorizontal size={14} style={{ color: "var(--text-muted)" }} />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            style={{
              padding: "7px 12px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              fontSize: 13,
              fontFamily: "Inter, sans-serif",
              color: "var(--text-primary)",
              background: "white",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="score">Score geral</option>
            <option value="listings">Anúncios ativos</option>
            <option value="trust">Score de Confiança</option>
            <option value="movement">Movimento</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
        {filtered.length} corretor{filtered.length !== 1 ? "es" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
      </div>

      {/* Zone Groups */}
      {search || filterZone !== "all" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(broker => (
            <BrokerRankCard key={broker.id} broker={broker} />
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Nenhum corretor encontrado</div>
              <div style={{ fontSize: 14 }}>Tente outro nome ou bairro.</div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {zoneGroups.map(({ zone, label, range, desc, brokers: zoneBrokers }) => (
            <div key={zone} style={{ marginBottom: 40 }}>
              {/* Zone header */}
              <div className="zone-divider" style={{ marginBottom: 16 }}>
                <div className="zone-divider-line" />
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  <div style={{
                    padding: "6px 16px",
                    borderRadius: 9999,
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    background: zone === "Elite" ? "linear-gradient(135deg, #c9a84c22, #c9a84c11)" : zone === "Ascensão" ? "linear-gradient(135deg, #00c89622, #00c89611)" : "linear-gradient(135deg, #dd6b2022, #dd6b2011)",
                    border: `1px solid ${zone === "Elite" ? "#c9a84c44" : zone === "Ascensão" ? "#00c89644" : "#dd6b2044"}`,
                    color: zone === "Elite" ? "#92710d" : zone === "Ascensão" ? "#047857" : "#92400e",
                  }}>
                    {label}
                  </div>
                  <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>{range}</span>
                </div>
                <div className="zone-divider-line" />
              </div>

              <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16, textAlign: "center", fontStyle: "italic" }}>
                {desc}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {zoneBrokers.map(broker => (
                  <BrokerRankCard key={broker.id} broker={broker} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
