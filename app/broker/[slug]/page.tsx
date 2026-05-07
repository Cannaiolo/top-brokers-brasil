import { brokers } from "@/data/mock";
import { notFound } from "next/navigation";
import BrokerProfileClient from "./BrokerProfileClient";
import type { Metadata } from "next";

export function generateStaticParams() {
  return brokers.map(b => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const broker = brokers.find(b => b.slug === slug);
  if (!broker) return { title: "Corretor não encontrado" };
  return {
    title: `${broker.name} | #${broker.rank} Florianópolis | Top Brokers Brasil`,
    description: `${broker.name} está no #${broker.rank} de Florianópolis. Score ${broker.score}/100. ${broker.activeListings} anúncios mapeados.`,
  };
}

export default async function BrokerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const broker = brokers.find(b => b.slug === slug);
  if (!broker) notFound();
  return <BrokerProfileClient broker={broker} />;
}
