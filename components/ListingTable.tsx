"use client";
import { Listing } from "@/data/mock";
import { ExternalLink } from "lucide-react";

interface Props {
  listings: Listing[];
}

export default function ListingTable({ listings }: Props) {
  const evidenceColor = (score: number) => {
    if (score >= 80) return "#00c896";
    if (score >= 60) return "#4299e1";
    if (score >= 40) return "#dd6b20";
    return "#a0aec0";
  };

  const statusStyle = (status: Listing["status"]) => {
    switch (status) {
      case "Ativo": return { background: "#e6fff8", color: "#047857", border: "1px solid #00c89644" };
      case "Inativo": return { background: "#fff5f5", color: "#c53030", border: "1px solid #e53e3e44" };
      case "Preço sob consulta": return { background: "#fdf6e3", color: "#92710d", border: "1px solid #c9a84c44" };
    }
  };

  const labelStyle = (label: Listing["label"]) => {
    switch (label) {
      case "Evidência pública": return { background: "#f0f4ff", color: "#3730a3", border: "1px solid #818cf833" };
      case "Ativo": return { background: "#e6fff8", color: "#047857", border: "1px solid #00c89644" };
      case "Preço sob consulta": return { background: "#fdf6e3", color: "#92710d", border: "1px solid #c9a84c44" };
      case "Dado incompleto": return { background: "#f7f7f7", color: "#718096", border: "1px solid #e2e8f0" };
    }
  };

  const groupedByCity = listings.reduce((acc, l) => {
    if (!acc[l.city]) acc[l.city] = [];
    acc[l.city].push(l);
    return acc;
  }, {} as Record<string, Listing[]>);

  return (
    <div>
      <div style={{
        padding: "10px 16px",
        background: "#f8fafc",
        borderRadius: 8,
        border: "1px solid var(--border)",
        marginBottom: 20,
        fontSize: 12,
        color: "var(--text-muted)",
        fontStyle: "italic",
      }}>
        ⚡ Anúncios são sinais públicos de presença, não confirmação de venda.
      </div>

      {Object.entries(groupedByCity).map(([city, cityListings]) => (
        <div key={city} style={{ marginBottom: 32 }}>
          <div style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--text-secondary)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <div style={{ width: 4, height: 14, background: "var(--navy)", borderRadius: 2 }} />
            {city}
            <span style={{ fontWeight: 400, color: "var(--text-muted)", textTransform: "none", letterSpacing: 0 }}>
              — {cityListings.length} anúncio{cityListings.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cityListings.map(listing => (
              <div key={listing.id} className="broker-card" style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                  {/* Evidence label */}
                  <div style={{ flexShrink: 0, marginTop: 2 }}>
                    <span style={{
                      ...labelStyle(listing.label),
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      borderRadius: 4,
                      display: "inline-block",
                    }}>
                      {listing.label}
                    </span>
                  </div>

                  {/* Main info */}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
                      {listing.title}
                    </div>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 12, color: "var(--text-muted)" }}>
                      <span>📍 {listing.neighborhood}</span>
                      <span>📐 {listing.area}</span>
                      <span>🏠 {listing.type}</span>
                      <span className="source-tag">{listing.source}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", fontFamily: "Space Grotesk, sans-serif" }}>
                      {listing.price}
                    </div>
                    <div style={{ marginTop: 4 }}>
                      <span style={{
                        ...statusStyle(listing.status),
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 4,
                        display: "inline-block",
                      }}>
                        {listing.status}
                      </span>
                    </div>
                  </div>

                  {/* Evidence score */}
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>Evidência</div>
                    <div style={{
                      fontSize: 18,
                      fontWeight: 700,
                      fontFamily: "Space Grotesk, sans-serif",
                      color: evidenceColor(listing.evidenceScore),
                    }}>
                      {listing.evidenceScore}
                    </div>
                    <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase" }}>/100</div>
                  </div>
                </div>

                <div style={{
                  marginTop: 12,
                  paddingTop: 10,
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 8,
                  fontSize: 11,
                  color: "var(--text-muted)",
                }}>
                  <div>
                    Visto em: <strong>{listing.firstSeen}</strong> · Última vez: <strong>{listing.lastSeen}</strong>
                  </div>
                  <a
                    href={listing.url}
                    style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--navy)", fontWeight: 600, textDecoration: "none" }}
                  >
                    <ExternalLink size={11} />
                    Ver origem ({listing.source})
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
