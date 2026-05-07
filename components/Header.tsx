"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky-header">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32,
              height: 32,
              background: "var(--navy)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ color: "#c9a84c", fontSize: 14, fontWeight: 800, fontFamily: "Space Grotesk, sans-serif" }}>TB</span>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1, fontFamily: "Space Grotesk, sans-serif" }}>
                Top Brokers
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1 }}>
                Brasil
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="/ranking/florianopolis" className="nav-link">Ranking</Link>
            <Link href="/compare" className="nav-link">Comparar</Link>
            <Link href="/methodology" className="nav-link">Metodologia</Link>
            <Link href="/claim" className="nav-link">Reivindicar Perfil</Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>
              <span className="live-dot" />
              Atualizado semanalmente
            </div>
            <Link href="/ranking/florianopolis">
              <button className="btn-primary" style={{ fontSize: 13 }}>
                Ver ranking
              </button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4 }}
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Actually show on mobile using inline style */}
          <div style={{ display: "flex" }} className="hide-desktop">
            <button
              style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--text-primary)" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div style={{
            position: "absolute",
            top: 64,
            left: 0,
            right: 0,
            background: "white",
            borderBottom: "1px solid var(--border)",
            padding: "16px 24px 24px",
            boxShadow: "var(--shadow-lg)",
            zIndex: 200,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Link href="/ranking/florianopolis" style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
                Ranking Florianópolis
              </Link>
              <Link href="/compare" style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
                Comparar Corretores
              </Link>
              <Link href="/methodology" style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
                Metodologia
              </Link>
              <Link href="/claim" style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
                Reivindicar Perfil
              </Link>
              <Link href="/ranking/florianopolis">
                <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Ver Ranking
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
