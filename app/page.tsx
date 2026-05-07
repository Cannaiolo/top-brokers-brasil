import type { Metadata } from "next";
import Link from "next/link";
import { brokers, cities, getScoreLabel } from "@/data/mock";
import BrokerSearch from "@/components/BrokerSearch";
import BrokerRankCard from "@/components/BrokerRankCard";
import { ArrowRight, MapPin, TrendingUp, Users, Building2, ChevronRight, Shield, BarChart2, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Top Brokers Brasil | Índice de Presença Competitiva",
  description: "Quem fecha, aparece. O ranking público que mede atividade, presença e consistência dos corretores imobiliários brasileiros.",
};

const topBrokers = brokers.slice(0, 6);

export default function HomePage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section style={{
        background: "var(--bg-base)",
        borderBottom: "1px solid var(--border)",
        padding: "80px 24px 72px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: 9999,
                fontSize: 12,
                fontWeight: 600,
                color: "var(--text-secondary)",
                marginBottom: 28,
                boxShadow: "var(--shadow-sm)",
              }}>
                <span className="live-dot" />
                Piloto ativo · Florianópolis, SC
              </div>

              <h1 style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(40px, 6vw, 72px)",
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                color: "var(--navy)",
                marginBottom: 24,
              }}>
                Top Brokers<br />
                <span className="gradient-text">Brasil</span>
              </h1>

              <p style={{
                fontSize: 20,
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: 8,
                fontFamily: "Space Grotesk, sans-serif",
              }}>
                Quem fecha, aparece.
              </p>

              <p style={{
                fontSize: 16,
                color: "var(--text-secondary)",
                lineHeight: 1.65,
                marginBottom: 36,
                maxWidth: 480,
              }}>
                O índice de presença competitiva dos corretores imobiliários brasileiros.
                Dados públicos. Competição aberta.
              </p>

              {/* Search */}
              <div style={{ marginBottom: 24 }}>
                <BrokerSearch />
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/ranking/florianopolis">
                  <button className="btn-primary" style={{ fontSize: 15, padding: "13px 24px" }}>
                    Ver ranking de Florianópolis
                    <ArrowRight size={16} />
                  </button>
                </Link>
                <Link href="/methodology">
                  <button className="btn-ghost" style={{ fontSize: 15, padding: "13px 24px" }}>
                    Como funciona
                  </button>
                </Link>
              </div>
            </div>

            {/* Right — live leaderboard mini */}
            <div className="w-full mt-4 lg:mt-0">
              <div style={{
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "var(--shadow-lg)",
              }}>
                <div style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "var(--navy)",
                }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#c9a84c", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Ranking ao Vivo
                    </div>
                    <div style={{ fontSize: 11, color: "#718096", marginTop: 2 }}>Florianópolis, SC</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#4a5568" }}>
                    <span className="live-dot" />
                    <span style={{ color: "#718096" }}>Top 50</span>
                  </div>
                </div>

                {topBrokers.map((broker, i) => (
                  <Link key={broker.id} href={`/broker/${broker.slug}`} style={{ textDecoration: "none" }}>
                    <div
                      className="table-row-hover"
                      style={{
                        padding: "14px 20px",
                        borderBottom: i < topBrokers.length - 1 ? "1px solid var(--border)" : "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <div className="rank-number" style={{
                        fontSize: 18,
                        color: i === 0 ? "#c9a84c" : i < 3 ? "var(--navy)" : "#4a5568",
                        minWidth: 32,
                      }}>
                        #{broker.rank}
                      </div>

                      <div className="broker-avatar" style={{ width: 34, height: 34, fontSize: 12 }}>
                        {broker.avatar}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", fontFamily: "Space Grotesk, sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {broker.name}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                          {broker.activeListings.toLocaleString("pt-BR")} anúncios
                        </div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <div className="score-number" style={{ fontSize: 18, color: broker.score >= 90 ? "#c9a84c" : "#00c896" }}>
                          {broker.score}
                        </div>
                        <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>score</div>
                      </div>
                    </div>
                  </Link>
                ))}

                <div style={{ padding: "14px 20px", background: "#f8fafc", borderTop: "1px solid var(--border)" }}>
                  <Link href="/ranking/florianopolis" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>
                    Ver ranking completo — Top 50
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: "var(--navy)", padding: "24px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 0, justifyContent: "space-around", flexWrap: "wrap" }}>
          {[
            { label: "Corretores mapeados", value: "50+", icon: <Users size={18} color="#c9a84c" /> },
            { label: "Anúncios rastreados", value: "18.420", icon: <Building2 size={18} color="#c9a84c" /> },
            { label: "Score médio", value: "67", icon: <BarChart2 size={18} color="#c9a84c" /> },
            { label: "Cidades ativas", value: "1", icon: <MapPin size={18} color="#c9a84c" /> },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 24px" }}>
              {s.icon}
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "white", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 11, color: "#718096", marginTop: 2 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOP BROKERS PREVIEW (mobile) ── */}
      <section style={{ padding: "64px 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 28, fontWeight: 800, color: "var(--navy)", marginBottom: 6 }}>
                Top corretores de Florianópolis
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
                Ranking baseado em evidência pública. Atualizado semanalmente.
              </p>
            </div>
            <Link href="/ranking/florianopolis">
              <button className="btn-ghost">
                Ver ranking completo
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {topBrokers.map(broker => (
              <BrokerRankCard key={broker.id} broker={broker} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/ranking/florianopolis">
              <button className="btn-primary" style={{ padding: "14px 32px", fontSize: 15 }}>
                Ver todos os 50 corretores
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── DARK COMPETITIVE HOOK ── */}
      <section className="dark-section" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-block",
            padding: "6px 16px",
            border: "1px solid #1e2d3d",
            borderRadius: 9999,
            fontSize: 11,
            fontWeight: 700,
            color: "#4a5568",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 32,
          }}>
            Por que isso importa
          </div>

          <h2 style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "white",
            marginBottom: 24,
            letterSpacing: "-0.02em",
          }}>
            Seu concorrente já está sendo medido.{" "}
            <span style={{ color: "#c9a84c" }}>Você ainda não sabe.</span>
          </h2>

          <p style={{
            fontSize: 18,
            color: "#a0aec0",
            lineHeight: 1.75,
            marginBottom: 48,
            maxWidth: 580,
            margin: "0 auto 48px",
          }}>
            Corretores não competem apenas por leads. Competem por{" "}
            <strong style={{ color: "white" }}>reputação pública</strong>,{" "}
            <strong style={{ color: "white" }}>presença digital</strong> e{" "}
            <strong style={{ color: "white" }}>capacidade percebida de fechamento</strong>.
          </p>

          {/* Tension points */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 48, textAlign: "left" }}>
            {[
              { q: "Onde eu estou nesse ranking?", icon: "📍" },
              { q: "Quem está na minha frente?", icon: "👁" },
              { q: "Como esse cara passou de mim?", icon: "📈" },
              { q: "Preciso melhorar meu score.", icon: "🎯" },
            ].map(item => (
              <div key={item.q} style={{
                padding: "16px",
                background: "#111111",
                border: "1px solid #1e2d3d",
                borderRadius: 10,
              }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: 14, color: "#a0aec0", lineHeight: 1.5, fontStyle: "italic" }}>
                  "{item.q}"
                </div>
              </div>
            ))}
          </div>

          <Link href="/ranking/florianopolis">
            <button style={{
              background: "#c9a84c",
              color: "var(--navy)",
              padding: "16px 36px",
              borderRadius: 10,
              fontWeight: 800,
              fontSize: 16,
              border: "none",
              cursor: "pointer",
              fontFamily: "Space Grotesk, sans-serif",
              transition: "all 0.2s",
            }}>
              Descobrir minha posição
            </button>
          </Link>
        </div>
      </section>

      {/* ── CITY CARDS ── */}
      <section style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 32, fontWeight: 800, color: "var(--navy)", marginBottom: 10 }}>
              Cidades no radar
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-muted)" }}>
              A cidade está vendo quem se movimenta.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {cities.map(city => (
              <div
                key={city.id}
                style={{
                  background: city.active ? "white" : "#f8fafc",
                  border: city.active ? "1.5px solid var(--navy)" : "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "24px",
                  position: "relative",
                  opacity: city.active ? 1 : 0.65,
                  boxShadow: city.active ? "var(--shadow-md)" : "none",
                  transition: "all 0.2s",
                }}
              >
                {city.active && (
                  <div style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#047857",
                    background: "#e6fff8",
                    padding: "3px 10px",
                    borderRadius: 9999,
                    border: "1px solid #00c89644",
                  }}>
                    <span className="live-dot" style={{ width: 6, height: 6 }} />
                    ATIVO
                  </div>
                )}
                {city.comingSoon && (
                  <div style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#718096",
                    background: "#f1f5f9",
                    padding: "3px 10px",
                    borderRadius: 9999,
                    border: "1px solid #e2e8f0",
                  }}>
                    EM BREVE
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <MapPin size={16} color={city.active ? "var(--navy)" : "#a0aec0"} />
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: city.active ? "var(--navy)" : "#4a5568", fontFamily: "Space Grotesk, sans-serif" }}>
                      {city.name}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{city.state}</div>
                  </div>
                </div>

                {city.active ? (
                  <>
                    <div style={{ padding: "12px", background: "#fdf6e3", borderRadius: 8, marginBottom: 12 }}>
                      <div style={{ fontSize: 10, color: "#92710d", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                        ★ Top Corretor
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)" }}>{city.topBroker}</div>
                    </div>

                    <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--text-secondary)" }}>
                      <div>
                        <strong style={{ color: "var(--navy)", fontFamily: "Space Grotesk, sans-serif", fontSize: 18 }}>
                          {city.mappedBrokers}
                        </strong>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>corretores</div>
                      </div>
                      <div>
                        <strong style={{ color: "var(--navy)", fontFamily: "Space Grotesk, sans-serif", fontSize: 18 }}>
                          {city.trackedListings.toLocaleString("pt-BR")}
                        </strong>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>anúncios</div>
                      </div>
                    </div>

                    <Link href="/ranking/florianopolis">
                      <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 20, fontSize: 13 }}>
                        Ver ranking
                        <ArrowRight size={14} />
                      </button>
                    </Link>
                  </>
                ) : (
                  <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, marginTop: 8 }}>
                    Em mapeamento. Receba notificação quando ativar.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY PREVIEW ── */}
      <section style={{ padding: "80px 24px", background: "var(--bg-base)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                background: "#f0f4ff",
                borderRadius: 9999,
                fontSize: 11,
                fontWeight: 700,
                color: "#3730a3",
                marginBottom: 24,
                border: "1px solid #818cf833",
              }}>
                <Shield size={12} />
                Metodologia transparente
              </div>

              <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 32, fontWeight: 800, color: "var(--navy)", marginBottom: 16, lineHeight: 1.1 }}>
                O que mede o Índice de Presença Competitiva
              </h2>

              <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 28 }}>
                Top Brokers Brasil não afirma venda realizada sem evidência. O índice mede presença pública, atividade e sinais de capacidade comercial.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {[
                  { label: "Atividade", pct: 40, color: "#c9a84c" },
                  { label: "Cobertura de portfólio", pct: 20, color: "#00c896" },
                  { label: "Confiabilidade dos dados", pct: 20, color: "#4299e1" },
                  { label: "Consistência", pct: 10, color: "#9f7aea" },
                  { label: "Relevância de mercado", pct: 10, color: "#ed8936" },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                      <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{item.label}</span>
                      <span style={{ fontWeight: 700, color: item.color }}>{item.pct}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="score-bar-fill" style={{ width: `${item.pct * 2.5}%`, height: "100%", background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/methodology">
                <button className="btn-ghost">
                  Ler metodologia completa
                  <ArrowRight size={14} />
                </button>
              </Link>
            </div>

            {/* Right: proof points */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                {
                  icon: <Eye size={20} color="#c9a84c" />,
                  title: "Dados públicos",
                  desc: "Coletamos anúncios de ZAP, VivaReal, OLX, QuintoAndar e Imóveis SC. Nada privado.",
                },
                {
                  icon: <TrendingUp size={20} color="#00c896" />,
                  title: "Atualizado semanalmente",
                  desc: "O ranking é recalculado toda semana. Posições mudam. Quem cresce, sobe.",
                },
                {
                  icon: <Shield size={20} color="#4299e1" />,
                  title: "Sem confirmação de venda",
                  desc: "Não afirmamos fechamento. Medimos presença e atividade pública.",
                },
                {
                  icon: <BarChart2 size={20} color="#9f7aea" />,
                  title: "Índice em evolução",
                  desc: "V0: Presença Competitiva. Em breve: Índice de Capacidade de Fechamento.",
                },
              ].map(item => (
                <div key={item.title} className="stat-card" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "1px solid var(--border)",
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLAIM CTA BANNER ── */}
      <section style={{ padding: "80px 24px", background: "var(--navy)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(24px, 4vw, 40px)",
            fontWeight: 800,
            color: "white",
            marginBottom: 16,
            lineHeight: 1.1,
          }}>
            Reivindique seu perfil antes que seu concorrente{" "}
            <span style={{ color: "#c9a84c" }}>conte a história por você.</span>
          </h2>
          <p style={{ fontSize: 16, color: "#a0aec0", marginBottom: 36, lineHeight: 1.7 }}>
            Corrija dados, adicione evidências e melhore seu índice de presença.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/claim">
              <button style={{
                background: "#c9a84c",
                color: "var(--navy)",
                padding: "15px 32px",
                borderRadius: 10,
                fontWeight: 800,
                fontSize: 15,
                border: "none",
                cursor: "pointer",
                fontFamily: "Space Grotesk, sans-serif",
              }}>
                Reivindicar meu perfil
              </button>
            </Link>
            <Link href="/broker/ricardo-martins">
              <button className="btn-ghost" style={{ borderColor: "#1e2d3d", color: "#a0aec0" }}>
                Ver exemplo de perfil
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
