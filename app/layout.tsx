import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Top Brokers Brasil | Índice de Presença Competitiva",
  description: "O ranking público que mede atividade, presença e consistência dos corretores brasileiros. Quem fecha, aparece.",
  keywords: ["corretores imobiliários", "ranking corretores", "top brokers", "florianópolis", "índice presença competitiva"],
  openGraph: {
    title: "Top Brokers Brasil",
    description: "Quem fecha, aparece. O índice de presença competitiva dos corretores brasileiros.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
