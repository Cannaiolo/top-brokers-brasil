import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-dark">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, paddingBottom: 40, borderBottom: "1px solid #1e2d3d" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: "#1a2f4a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#c9a84c", fontSize: 14, fontWeight: 800, fontFamily: "Space Grotesk, sans-serif" }}>TB</span>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "white", fontFamily: "Space Grotesk, sans-serif" }}>Top Brokers Brasil</div>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "#718096", maxWidth: 280 }}>
              O índice de presença competitiva dos corretores imobiliários brasileiros.
            </p>
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#4a5568" }}>
              <span className="live-dot" style={{ opacity: 0.6 }} />
              Dados atualizados semanalmente
            </div>
          </div>

          {/* Rankings */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4a5568", marginBottom: 16 }}>Rankings</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/ranking/florianopolis" style={{ fontSize: 14, color: "#a0aec0", textDecoration: "none", transition: "color 0.15s" }}>
                Florianópolis
              </Link>
              <span style={{ fontSize: 14, color: "#4a5568" }}>São Paulo <span style={{ fontSize: 11 }}>em breve</span></span>
              <span style={{ fontSize: 14, color: "#4a5568" }}>Balneário Camboriú <span style={{ fontSize: 11 }}>em breve</span></span>
              <span style={{ fontSize: 14, color: "#4a5568" }}>Curitiba <span style={{ fontSize: 11 }}>em breve</span></span>
            </div>
          </div>

          {/* Produto */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4a5568", marginBottom: 16 }}>Produto</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/methodology" style={{ fontSize: 14, color: "#a0aec0", textDecoration: "none" }}>Metodologia</Link>
              <Link href="/compare" style={{ fontSize: 14, color: "#a0aec0", textDecoration: "none" }}>Comparar corretores</Link>
              <Link href="/claim" style={{ fontSize: 14, color: "#a0aec0", textDecoration: "none" }}>Reivindicar perfil</Link>
              <Link href="/broker/ricardo-martins" style={{ fontSize: 14, color: "#a0aec0", textDecoration: "none" }}>Exemplo de perfil</Link>
            </div>
          </div>

          {/* Manifesto */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4a5568", marginBottom: 16 }}>Manifesto</div>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: "#718096", fontStyle: "italic" }}>
              "Top 10 não é opinião.<br />É evidência pública."
            </p>
            <div style={{ marginTop: 20 }}>
              <Link href="/claim">
                <button style={{
                  background: "#c9a84c",
                  color: "#0d1b2a",
                  padding: "10px 20px",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 13,
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                }}>
                  Reivindicar meu perfil
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 12, color: "#4a5568" }}>
            © 2026 Top Brokers Brasil. Dados públicos. Competição aberta.
          </p>
          <p style={{ fontSize: 11, color: "#2d3748", maxWidth: 480, textAlign: "right" }}>
            Top Brokers Brasil não confirma vendas realizadas. O índice mede presença pública e atividade em portais imobiliários.
          </p>
        </div>
      </div>
    </footer>
  );
}
