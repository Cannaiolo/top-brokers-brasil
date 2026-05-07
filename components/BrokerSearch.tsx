"use client";
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { brokers } from "@/data/mock";
import Link from "next/link";

export default function BrokerSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return brokers.filter(b =>
      b.name.toLowerCase().includes(q) ||
      b.city.toLowerCase().includes(q) ||
      b.mainNeighborhoods.some(n => n.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [query]);

  const getStatus = (score: number) => {
    if (score >= 60) return { label: "Encontrado", color: "#00c896", bg: "#e6fff8" };
    if (score >= 40) return { label: "Dados parciais", color: "#dd6b20", bg: "#fff7ed" };
    return { label: "Fora do radar", color: "#718096", bg: "#f7f7f7" };
  };

  return (
    <div style={{ position: "relative", maxWidth: 540, width: "100%" }}>
      <div style={{ position: "relative" }}>
        <Search
          size={20}
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: focused ? "var(--navy)" : "var(--text-muted)",
            transition: "color 0.2s",
          }}
        />
        <input
          className="search-input"
          style={{ fontSize: 16, padding: "14px 48px 14px 48px", borderRadius: 12 }}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Digite o nome do corretor ou imobiliária"
          id="broker-search-input"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {focused && results.length > 0 && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          left: 0,
          right: 0,
          background: "white",
          border: "1.5px solid var(--navy)",
          borderRadius: 12,
          boxShadow: "var(--shadow-lg)",
          zIndex: 500,
          overflow: "hidden",
        }}>
          {results.map((broker, i) => {
            const status = getStatus(broker.score);
            return (
              <Link key={broker.id} href={`/broker/${broker.slug}`} style={{ textDecoration: "none" }}>
                <div
                  className="table-row-hover"
                  style={{
                    padding: "14px 20px",
                    borderBottom: i < results.length - 1 ? "1px solid var(--border)" : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  {/* Rank */}
                  <div style={{
                    width: 36,
                    height: 36,
                    background: "var(--navy)",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: "#c9a84c", fontFamily: "Space Grotesk, sans-serif" }}>
                      #{broker.rank}
                    </span>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", fontFamily: "Space Grotesk, sans-serif" }}>
                      {broker.name}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      {broker.city}, {broker.state} · Score {broker.score}
                    </div>
                  </div>

                  {/* Status */}
                  <span style={{
                    ...status,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    padding: "3px 10px",
                    borderRadius: 9999,
                    flexShrink: 0,
                  }}>
                    {status.label}
                  </span>
                </div>
              </Link>
            );
          })}
          <div style={{
            padding: "10px 20px",
            background: "#f8fafc",
            fontSize: 11,
            color: "var(--text-muted)",
            borderTop: "1px solid var(--border)",
          }}>
            Mostrando {results.length} resultado{results.length !== 1 ? "s" : ""}. Pressione Enter para busca completa.
          </div>
        </div>
      )}

      {focused && query.length >= 2 && results.length === 0 && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          left: 0,
          right: 0,
          background: "white",
          border: "1.5px solid var(--border)",
          borderRadius: 12,
          boxShadow: "var(--shadow-lg)",
          zIndex: 500,
          padding: "20px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 4 }}>
            Corretor não encontrado
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
            Ainda fora do radar ou sem dados suficientes.
          </div>
          <Link href="/claim">
            <button className="btn-primary" style={{ marginTop: 12, fontSize: 12 }}>
              Reivindicar perfil
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
