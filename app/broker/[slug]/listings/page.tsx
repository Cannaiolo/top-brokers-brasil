import { brokers, listings } from "@/data/mock";
import { notFound } from "next/navigation";
import ListingTable from "@/components/ListingTable";
import Link from "next/link";
import { ArrowLeft, Filter } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return brokers.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const broker = brokers.find(b => b.slug === slug);
  if (!broker) return { title: "Não encontrado" };
  return {
    title: `Anúncios de ${broker.name} | Top Brokers Brasil`,
    description: `${broker.activeListings} anúncios mapeados de ${broker.name}. Evidência pública de presença no mercado imobiliário.`,
  };
}

export default async function ListingsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const broker = brokers.find(b => b.slug === slug);
  if (!broker) notFound();

  const brokerListings = listings.filter(l => l.brokerId === broker.id);

  return (
    <div>
      {/* Header */}
      <div style={{ background: "var(--navy)", padding: "40px 24px 36px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Link href={`/broker/${broker.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#718096", textDecoration: "none", marginBottom: 20 }}>
            <ArrowLeft size={13} />
            Voltar ao perfil
          </Link>

          <h1 style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(24px, 4vw, 40px)",
            fontWeight: 800,
            color: "white",
            marginBottom: 8,
          }}>
            Inteligência de Anúncios
          </h1>
          <p style={{ fontSize: 14, color: "#a0aec0" }}>
            {broker.name} · {brokerListings.length} anúncios mapeados em {new Set(brokerListings.map(l => l.city)).size} cidade{new Set(brokerListings.map(l => l.city)).size > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Info bar */}
      <div style={{ background: "#f0f4ff", borderBottom: "1px solid #818cf833", padding: "10px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 12, color: "#3730a3" }}>
          ⚡ Anúncios são sinais públicos de presença, não confirmação de venda. Dados coletados de portais imobiliários públicos.
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: "white", borderBottom: "1px solid var(--border)", padding: "20px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 32, flexWrap: "wrap" }}>
          {[
            { label: "Total mapeado", value: brokerListings.length },
            { label: "Ativos", value: brokerListings.filter(l => l.status === "Ativo").length },
            { label: "Cidades", value: new Set(brokerListings.map(l => l.city)).size },
            { label: "Score médio de evidência", value: Math.round(brokerListings.reduce((s, l) => s + l.evidenceScore, 0) / (brokerListings.length || 1)) },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "Space Grotesk, sans-serif", color: "var(--navy)", lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ padding: "40px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <ListingTable listings={brokerListings} />
      </div>
    </div>
  );
}
