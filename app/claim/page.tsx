"use client";
import { useState } from "react";
import { CheckCircle, Upload, Shield, ArrowRight, User, Phone, Mail, MapPin, Link as LinkIcon } from "lucide-react";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

const BENEFITS = [
  { icon: "✏️", title: "Corrigir dados incorretos", desc: "Atualize informações desatualizadas no seu perfil público." },
  { icon: "📈", title: "Adicionar evidências", desc: "Inclua links de portais, redes e site próprio para melhorar seu score." },
  { icon: "🔔", title: "Receber alertas de ranking", desc: "Seja notificado quando sua posição mudar." },
  { icon: "🏆", title: "Baixar cards oficiais", desc: "Acesse cards de status premium para compartilhar." },
  { icon: "⚔️", title: "Comparar com concorrentes", desc: "Análise direta com os corretores da sua região." },
  { icon: "📊", title: "Melhorar score de confiabilidade", desc: "Perfis reivindicados têm peso maior na dimensão de confiabilidade." },
];

const FIELDS = [
  { id: "name", label: "Nome completo", icon: <User size={16} />, placeholder: "Seu nome completo", type: "text" },
  { id: "creci", label: "CRECI", icon: <Shield size={16} />, placeholder: "Ex: SC-12.345", type: "text" },
  { id: "phone", label: "Telefone / WhatsApp", icon: <Phone size={16} />, placeholder: "(48) 99999-9999", type: "tel" },
  { id: "email", label: "E-mail", icon: <Mail size={16} />, placeholder: "seu@email.com.br", type: "email" },
  { id: "city", label: "Cidade", icon: <MapPin size={16} />, placeholder: "Florianópolis", type: "text" },
];

const OPTIONAL_FIELDS = [
  { id: "zap", label: "Link ZAP Imóveis", icon: <LinkIcon size={16} />, placeholder: "https://..." },
  { id: "vivareal", label: "Link VivaReal", icon: <LinkIcon size={16} />, placeholder: "https://..." },
  { id: "website", label: "Site próprio", icon: <LinkIcon size={16} />, placeholder: "https://..." },
  { id: "instagram", label: "Instagram", icon: <InstagramIcon size={16} />, placeholder: "@seu_perfil" },
  { id: "linkedin", label: "LinkedIn", icon: <LinkedInIcon size={16} />, placeholder: "linkedin.com/in/..." },
];

export default function ClaimPage() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const handleChange = (id: string, val: string) => {
    setFormData(p => ({ ...p, [id]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 500 }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>✅</div>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 28, fontWeight: 800, color: "var(--navy)", marginBottom: 12 }}>
            Solicitação recebida
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 28 }}>
            Analisaremos seus dados e ativaremos seu perfil reivindicado em até 72 horas.
            Você receberá uma confirmação por e-mail.
          </p>
          <div style={{ padding: "20px 24px", background: "#fdf6e3", border: "1px solid #c9a84c33", borderRadius: 12, marginBottom: 28, fontSize: 14, color: "#92710d", lineHeight: 1.7 }}>
            📊 Perfis reivindicados recebem peso extra na dimensão de confiabilidade do índice.
          </div>
          <a href="/ranking/florianopolis">
            <button className="btn-primary" style={{ fontSize: 15, padding: "13px 28px" }}>
              Ver ranking agora
              <ArrowRight size={15} />
            </button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ background: "var(--navy)", padding: "56px 24px 48px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            background: "#c9a84c22",
            border: "1px solid #c9a84c44",
            borderRadius: 9999,
            fontSize: 11,
            fontWeight: 700,
            color: "#c9a84c",
            letterSpacing: "0.06em",
            marginBottom: 24,
          }}>
            <Shield size={13} />
            PROTEÇÃO DE REPUTAÇÃO
          </div>

          <h1 style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(26px, 5vw, 48px)",
            fontWeight: 800,
            color: "white",
            marginBottom: 16,
            lineHeight: 1.05,
          }}>
            Reivindique seu perfil e{" "}
            <span style={{ color: "#c9a84c" }}>melhore seu índice.</span>
          </h1>

          <p style={{ fontSize: 17, color: "#a0aec0", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
            Reivindique seu perfil antes que seu concorrente conte a história por você.
            <strong style={{ color: "white" }}> Não é um produto pago.</strong> É proteção de reputação.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div style={{ background: "#f8fafc", borderBottom: "1px solid var(--border)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 22, fontWeight: 700, color: "var(--navy)", textAlign: "center", marginBottom: 32 }}>
            O que você ganha ao reivindicar
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {BENEFITS.map(b => (
              <div key={b.title} style={{
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "20px",
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                boxShadow: "var(--shadow-sm)",
              }}>
                <div style={{ fontSize: 24, flexShrink: 0 }}>{b.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 5 }}>{b.title}</div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={{ padding: "64px 24px", maxWidth: 640, margin: "0 auto" }}>
        <div style={{ marginBottom: 36 }}>
          {/* Steps */}
          <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
            {[{ n: 1, label: "Identificação" }, { n: 2, label: "Evidências" }].map((s, i) => (
              <div key={s.n} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div
                  onClick={() => setStep(s.n as 1 | 2)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                    padding: "8px 0",
                    borderBottom: `2px solid ${step === s.n ? "var(--navy)" : "var(--border)"}`,
                    flex: 1,
                    paddingBottom: 12,
                  }}
                >
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 9999,
                    background: step >= s.n ? "var(--navy)" : "#f1f5f9",
                    color: step >= s.n ? "white" : "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {step > s.n ? <CheckCircle size={16} /> : s.n}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: step === s.n ? 700 : 500, color: step === s.n ? "var(--text-primary)" : "var(--text-muted)" }}>
                    {s.label}
                  </span>
                </div>
                {i < 1 && <div style={{ width: 24, flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 24 }}>
                Seus dados de identificação
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
                {FIELDS.map(field => (
                  <div key={field.id}>
                    <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
                      {field.icon}
                      {field.label}
                      {["name", "creci", "email"].includes(field.id) && (
                        <span style={{ color: "#e53e3e", fontSize: 11 }}>*</span>
                      )}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      value={formData[field.id] || ""}
                      onChange={e => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      required={["name", "creci", "email"].includes(field.id)}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 10,
                        fontSize: 15,
                        fontFamily: "Inter, sans-serif",
                        outline: "none",
                        transition: "border-color 0.2s",
                        color: "var(--text-primary)",
                        background: "white",
                      }}
                      onFocus={e => (e.target.style.borderColor = "var(--navy)")}
                      onBlur={e => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "14px" }}
              >
                Próximo: Adicionar evidências
                <ArrowRight size={15} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
                Evidências de presença
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
                Adicione links dos seus perfis em portais. Cada evidência melhora seu score de confiabilidade.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
                {OPTIONAL_FIELDS.map(field => (
                  <div key={field.id}>
                    <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
                      {field.icon}
                      {field.label}
                      <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 400 }}>(opcional)</span>
                    </label>
                    <input
                      type="text"
                      id={field.id}
                      value={formData[field.id] || ""}
                      onChange={e => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 10,
                        fontSize: 15,
                        fontFamily: "Inter, sans-serif",
                        outline: "none",
                        transition: "border-color 0.2s",
                        color: "var(--text-primary)",
                        background: "white",
                      }}
                      onFocus={e => (e.target.style.borderColor = "var(--navy)")}
                      onBlur={e => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                ))}
              </div>

              {/* Proof of identity */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
                  <Upload size={16} />
                  Comprovante de identidade
                  <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 400 }}>(opcional)</span>
                </label>
                <div style={{
                  border: "1.5px dashed #cbd5e0",
                  borderRadius: 10,
                  padding: "32px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: "#f8fafc",
                }}>
                  <Upload size={24} color="var(--text-muted)" style={{ margin: "0 auto 10px" }} />
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 4 }}>
                    Arraste ou clique para enviar CRECI digital
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>PNG, JPG ou PDF · máx. 5MB</div>
                </div>
              </div>

              {/* Legal */}
              <div style={{
                padding: "16px",
                background: "#f0f4ff",
                border: "1px solid #818cf833",
                borderRadius: 10,
                fontSize: 12,
                color: "#3730a3",
                lineHeight: 1.7,
                marginBottom: 24,
              }}>
                <Shield size={13} style={{ display: "inline", marginRight: 6 }} />
                Seus dados são usados exclusivamente para verificação do perfil. Não vendemos informações para terceiros.
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-ghost"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 2,
                    background: "#c9a84c",
                    color: "var(--navy)",
                    padding: "14px",
                    borderRadius: 10,
                    fontWeight: 800,
                    fontSize: 15,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Space Grotesk, sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  Reivindicar meu perfil
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
