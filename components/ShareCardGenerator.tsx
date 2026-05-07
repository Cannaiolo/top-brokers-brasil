"use client";
import { useRef } from "react";
import { Broker } from "@/data/mock";
import { Share2, Link as LinkIcon } from "lucide-react";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

interface Props {
  broker: Broker;
  cardType?: "rank" | "movement" | "badge";
}

export default function ShareCardGenerator({ broker, cardType = "rank" }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/broker/${broker.slug}`);
    alert("Link copiado!");
  };

  const handleLinkedIn = () => {
    const url = encodeURIComponent(`${window.location.origin}/broker/${broker.slug}`);
    const text = encodeURIComponent(`Estou no Top ${broker.rank <= 10 ? "10" : "50"} de Florianópolis no ranking de corretores imobiliários. Score ${broker.score}/100. #TopBrokersBrasil #MercadoImobiliario`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, "_blank");
  };

  const handleWhatsApp = () => {
    const url = `${window.location.origin}/broker/${broker.slug}`;
    const text = encodeURIComponent(`🏆 Estou #${broker.rank} em Florianópolis no Top Brokers Brasil! Score: ${broker.score}/100. Quem fecha, aparece. ${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div>
      {/* Share Card Preview */}
      <div ref={cardRef} className="share-card">
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 4 }}>
              Top Brokers Brasil
            </div>
            <div style={{ fontSize: 12, color: "#718096" }}>Índice de Presença Competitiva</div>
          </div>
          <div style={{
            padding: "4px 12px",
            background: "#c9a84c22",
            border: "1px solid #c9a84c44",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 700,
            color: "#c9a84c",
            letterSpacing: "0.05em",
          }}>
            {broker.scoreLabel.toUpperCase()}
          </div>
        </div>

        {/* Rank */}
        <div style={{ marginBottom: 20 }}>
          {cardType === "movement" ? (
            <>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#00c896", textTransform: "uppercase", marginBottom: 8 }}>
                ↑ SUBIU {broker.movementValue} POSIÇÃO{broker.movementValue > 1 ? "ÕES" : ""}
              </div>
              <div className="rank-number" style={{ fontSize: 64, color: "white", lineHeight: 0.9 }}>
                #{broker.rank}
              </div>
            </>
          ) : (
            <div className="rank-number" style={{ fontSize: 72, color: "white", lineHeight: 0.85 }}>
              #{broker.rank}
            </div>
          )}
          <div style={{ fontSize: 12, color: "#c9a84c", marginTop: 8, fontWeight: 600 }}>
            em {broker.city}, {broker.state}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "linear-gradient(90deg, #c9a84c33, transparent)", marginBottom: 20 }} />

        {/* Name */}
        <div style={{ fontSize: 24, fontWeight: 800, color: "white", fontFamily: "Space Grotesk, sans-serif", marginBottom: 6, lineHeight: 1.1 }}>
          {broker.name}
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: "#718096", marginBottom: 2 }}>Score</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#00c896", fontFamily: "Space Grotesk, sans-serif" }}>
              {broker.score}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#718096", marginBottom: 2 }}>Anúncios</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "white", fontFamily: "Space Grotesk, sans-serif" }}>
              {broker.activeListings.toLocaleString("pt-BR")}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#718096", marginBottom: 2 }}>CRECI</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#a0aec0", marginTop: 6 }}>
              {broker.creci}
            </div>
          </div>
        </div>

        {/* Badge */}
        {broker.badge && (
          <div style={{
            marginTop: 20,
            padding: "8px 14px",
            background: "#c9a84c11",
            border: "1px solid #c9a84c33",
            borderRadius: 6,
            fontSize: 12,
            color: "#c9a84c",
            fontWeight: 600,
          }}>
            ★ {broker.badge}
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid #1e2d3d", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 11, color: "#4a5568" }}>topbrokersbrasil.com.br</div>
          <div style={{ fontSize: 11, color: "#4a5568", fontStyle: "italic" }}>Quem fecha, aparece.</div>
        </div>
      </div>

      {/* Share buttons */}
      <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={handleLinkedIn}
          style={{
            flex: 1,
            minWidth: 140,
            padding: "12px 16px",
            background: "#0077b5",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <LinkedInIcon size={16} />
          LinkedIn
        </button>

        <button
          onClick={handleWhatsApp}
          style={{
            flex: 1,
            minWidth: 140,
            padding: "12px 16px",
            background: "#25d366",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Share2 size={16} />
          WhatsApp
        </button>

        <button
          onClick={handleCopyLink}
          className="btn-ghost"
          style={{ flex: 1, minWidth: 140, justifyContent: "center" }}
        >
          <LinkIcon size={14} />
          Copiar link
        </button>
      </div>
    </div>
  );
}
