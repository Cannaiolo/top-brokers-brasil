"use client";
import { Broker } from "@/data/mock";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface Props {
  broker: Broker;
}

export default function BrokerFingerprint({ broker }: Props) {
  const metrics = [
    { label: "Volume", key: "volume", desc: "Quantidade de anúncios" },
    { label: "Presença", key: "presence", desc: "Cobertura nos portais" },
    { label: "Liquidez", key: "liquidity", desc: "Rotatividade do portfólio" },
    { label: "Confiança", key: "reliability", desc: "Qualidade dos dados" },
    { label: "Preços", key: "priceRange", desc: "Diversidade de faixas" },
    { label: "Foco", key: "concentration", desc: "Foco geográfico e tipo" },
  ] as const;

  const data = metrics.map(m => ({
    subject: m.label,
    A: broker.fingerprint[m.key],
    fullMark: 100,
  }));

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>
          Fingerprint de Performance
        </div>
        <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
          Análise dimensional da presença pública de {broker.name.split(" ")[0]}.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32, alignItems: "center" }}>
        {/* Radar Chart */}
        <div style={{ height: 280, width: "100%", background: "white", borderRadius: 12, border: "1px solid var(--border)", padding: 16 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 11, fontWeight: 600 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name={broker.name} dataKey="A" stroke="#c9a84c" strokeWidth={2} fill="#c9a84c" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {metrics.map(({ label, key, desc }) => {
            const val = broker.fingerprint[key];
            const color = val >= 85 ? "#c9a84c" : val >= 70 ? "#00c896" : val >= 50 ? "#4299e1" : "#a0aec0";
            return (
              <div key={key}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{label}</span>
                    <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 8 }}>{desc}</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color, fontFamily: "Space Grotesk, sans-serif" }}>{val}</span>
                </div>
                <div className="progress-track">
                  <div
                    className="score-bar-fill"
                    style={{
                      width: `${val}%`,
                      height: "100%",
                      background: `linear-gradient(90deg, ${color}88, ${color})`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{
        marginTop: 24,
        padding: "12px 16px",
        background: "#f8fafc",
        borderRadius: 8,
        border: "1px solid var(--border)",
        fontSize: 12,
        color: "var(--text-muted)",
        lineHeight: 1.7,
      }}>
        📊 O gráfico Radar ajuda a identificar se o corretor é especialista (pontudo em uma direção) ou generalista equilibrado (formato redondo).
      </div>
    </div>
  );
}
