export type ScoreLabel = "Elite" | "Consistente" | "Ascendente" | "Em observação" | "Invisível";
export type RankZone = "Elite" | "Ascensão" | "Pressão" | "Fora do Radar";
export type Movement = "up" | "down" | "new" | "stable";

export interface Broker {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  creci: string;
  rank: number;
  previousRank: number;
  score: number;
  trustScore: number;
  activeListings: number;
  avgTicket: string;
  mainNeighborhoods: string[];
  propertyMix: { type: string; pct: number }[];
  badge: string;
  movement: Movement;
  movementValue: number;
  avatar: string;
  zone: RankZone;
  scoreLabel: ScoreLabel;
  fingerprint: {
    volume: number;
    presence: number;
    liquidity: number;
    reliability: number;
    priceRange: number;
    concentration: number;
  };
  microcopy: string;
  claimedProfile: boolean;
}

export interface Listing {
  id: string;
  brokerId: string;
  title: string;
  city: string;
  neighborhood: string;
  type: string;
  price: string;
  area: string;
  source: string;
  status: "Ativo" | "Inativo" | "Preço sob consulta";
  evidenceScore: number;
  firstSeen: string;
  lastSeen: string;
  url: string;
  label: "Evidência pública" | "Ativo" | "Preço sob consulta" | "Dado incompleto";
}

export interface City {
  id: string;
  name: string;
  state: string;
  topBroker: string;
  mappedBrokers: number;
  trackedListings: number;
  active: boolean;
  comingSoon: boolean;
}

export function getScoreLabel(score: number): ScoreLabel {
  if (score >= 90) return "Elite";
  if (score >= 75) return "Consistente";
  if (score >= 60) return "Ascendente";
  if (score >= 40) return "Em observação";
  return "Invisível";
}

export function getRankZone(rank: number): RankZone {
  if (rank <= 10) return "Elite";
  if (rank <= 25) return "Ascensão";
  if (rank <= 50) return "Pressão";
  return "Fora do Radar";
}

export function getZoneLabel(zone: RankZone): string {
  switch (zone) {
    case "Elite": return "Elite";
    case "Ascensão": return "Em alta";
    case "Pressão": return "Sob pressão";
    case "Fora do Radar": return "Invisível";
  }
}

export const brokers: Broker[] = [
  {
    id: "1",
    slug: "barakah-imoveis",
    name: "Barakah Imóveis",
    city: "Florianópolis",
    state: "SC",
    creci: "SC-12.847",
    rank: 1,
    previousRank: 1,
    score: 96,
    trustScore: 91,
    activeListings: 3875,
    avgTicket: "R$ 1,2M",
    mainNeighborhoods: ["Jurerê", "Canasvieiras", "Ingleses"],
    propertyMix: [{ type: "Apartamento", pct: 55 }, { type: "Casa", pct: 30 }, { type: "Terreno", pct: 15 }],
    badge: "Maior volume da cidade",
    movement: "stable",
    movementValue: 0,
    avatar: "B",
    zone: "Elite",
    scoreLabel: "Elite",
    fingerprint: { volume: 96, presence: 94, liquidity: 88, reliability: 91, priceRange: 82, concentration: 70 },
    microcopy: "Defende o topo há 8 semanas consecutivas.",
    claimedProfile: true,
  },
  {
    id: "2",
    slug: "urbaniza-imoveis",
    name: "Urbaniza Imóveis",
    city: "Florianópolis",
    state: "SC",
    creci: "SC-09.231",
    rank: 2,
    previousRank: 3,
    score: 93,
    trustScore: 88,
    activeListings: 2910,
    avgTicket: "R$ 890K",
    mainNeighborhoods: ["Trindade", "Córrego Grande", "Pantanal"],
    propertyMix: [{ type: "Apartamento", pct: 70 }, { type: "Casa", pct: 20 }, { type: "Sala comercial", pct: 10 }],
    badge: "Maior presença na Trindade",
    movement: "up",
    movementValue: 1,
    avatar: "U",
    zone: "Elite",
    scoreLabel: "Elite",
    fingerprint: { volume: 91, presence: 89, liquidity: 85, reliability: 88, priceRange: 76, concentration: 80 },
    microcopy: "Subiu 1 posição. Pressiona o topo.",
    claimedProfile: true,
  },
  {
    id: "3",
    slug: "fkp-corretor",
    name: "FKP Corretor",
    city: "Florianópolis",
    state: "SC",
    creci: "SC-15.002",
    rank: 3,
    previousRank: 2,
    score: 91,
    trustScore: 86,
    activeListings: 2540,
    avgTicket: "R$ 1,05M",
    mainNeighborhoods: ["Campeche", "Lagoa da Conceição", "Rio Tavares"],
    propertyMix: [{ type: "Casa", pct: 45 }, { type: "Apartamento", pct: 40 }, { type: "Terreno", pct: 15 }],
    badge: "Especialista em Campeche",
    movement: "down",
    movementValue: 1,
    avatar: "F",
    zone: "Elite",
    scoreLabel: "Elite",
    fingerprint: { volume: 88, presence: 91, liquidity: 82, reliability: 86, priceRange: 90, concentration: 65 },
    microcopy: "Perdeu 1 posição. Mantém pressão no Top 3.",
    claimedProfile: true,
  },
  {
    id: "4",
    slug: "noeli-corretora",
    name: "Noeli Corretora",
    city: "Florianópolis",
    state: "SC",
    creci: "SC-11.450",
    rank: 4,
    previousRank: 5,
    score: 88,
    trustScore: 84,
    activeListings: 1980,
    avgTicket: "R$ 780K",
    mainNeighborhoods: ["Agronômica", "Itacorubi", "Santa Mônica"],
    propertyMix: [{ type: "Apartamento", pct: 80 }, { type: "Casa", pct: 15 }, { type: "Sala comercial", pct: 5 }],
    badge: "Alta consistência",
    movement: "up",
    movementValue: 1,
    avatar: "N",
    zone: "Elite",
    scoreLabel: "Consistente",
    fingerprint: { volume: 82, presence: 86, liquidity: 79, reliability: 84, priceRange: 72, concentration: 75 },
    microcopy: "Subiu 1 posição. Consolida o Top 5.",
    claimedProfile: false,
  },
  {
    id: "5",
    slug: "lylyan-corretor",
    name: "Lylyan Corretor",
    city: "Florianópolis",
    state: "SC",
    creci: "SC-08.779",
    rank: 5,
    previousRank: 4,
    score: 85,
    trustScore: 81,
    activeListings: 1720,
    avgTicket: "R$ 920K",
    mainNeighborhoods: ["Jurerê Internacional", "Canasvieiras", "Daniela"],
    propertyMix: [{ type: "Casa", pct: 50 }, { type: "Apartamento", pct: 35 }, { type: "Terreno", pct: 15 }],
    badge: "Especialista em alto padrão",
    movement: "down",
    movementValue: 1,
    avatar: "L",
    zone: "Elite",
    scoreLabel: "Consistente",
    fingerprint: { volume: 80, presence: 83, liquidity: 76, reliability: 81, priceRange: 95, concentration: 60 },
    microcopy: "Perdeu tração. Rival avançou.",
    claimedProfile: true,
  },
  {
    id: "6",
    slug: "ricardo-martins",
    name: "Ricardo Martins",
    city: "Florianópolis",
    state: "SC",
    creci: "SC-14.320",
    rank: 6,
    previousRank: 8,
    score: 81,
    trustScore: 72,
    activeListings: 562,
    avgTicket: "R$ 650K",
    mainNeighborhoods: ["Trindade", "Córrego Grande", "Carvoeira"],
    propertyMix: [{ type: "Apartamento", pct: 65 }, { type: "Casa", pct: 25 }, { type: "Sala comercial", pct: 10 }],
    badge: "Ativo em portais",
    movement: "up",
    movementValue: 2,
    avatar: "R",
    zone: "Elite",
    scoreLabel: "Consistente",
    fingerprint: { volume: 72, presence: 78, liquidity: 65, reliability: 72, priceRange: 68, concentration: 70 },
    microcopy: "Subiu 2 posições. Entrou na zona Elite.",
    claimedProfile: false,
  },
  {
    id: "7",
    slug: "casa-verde-imoveis",
    name: "Casa Verde Imóveis",
    city: "Florianópolis",
    state: "SC",
    creci: "SC-10.551",
    rank: 7,
    previousRank: 6,
    score: 79,
    trustScore: 75,
    activeListings: 1340,
    avgTicket: "R$ 520K",
    mainNeighborhoods: ["Coqueiros", "Bom Abrigo", "Abraão"],
    propertyMix: [{ type: "Apartamento", pct: 60 }, { type: "Casa", pct: 35 }, { type: "Terreno", pct: 5 }],
    badge: "Volume consistente",
    movement: "down",
    movementValue: 1,
    avatar: "C",
    zone: "Elite",
    scoreLabel: "Consistente",
    fingerprint: { volume: 78, presence: 75, liquidity: 70, reliability: 75, priceRange: 60, concentration: 65 },
    microcopy: "Perdeu posição. Defende Top 10.",
    claimedProfile: true,
  },
  {
    id: "8",
    slug: "prime-corretora",
    name: "Prime Corretora",
    city: "Florianópolis",
    state: "SC",
    creci: "SC-13.087",
    rank: 8,
    previousRank: 10,
    score: 77,
    trustScore: 73,
    activeListings: 980,
    avgTicket: "R$ 750K",
    mainNeighborhoods: ["Estreito", "Balneário", "Coqueiros"],
    propertyMix: [{ type: "Apartamento", pct: 75 }, { type: "Casa", pct: 20 }, { type: "Sala comercial", pct: 5 }],
    badge: "Ascensão rápida",
    movement: "up",
    movementValue: 2,
    avatar: "P",
    zone: "Elite",
    scoreLabel: "Consistente",
    fingerprint: { volume: 74, presence: 77, liquidity: 68, reliability: 73, priceRange: 72, concentration: 72 },
    microcopy: "Subiu 2 posições esta semana.",
    claimedProfile: false,
  },
  {
    id: "9",
    slug: "sul-imoveis",
    name: "Sul Imóveis",
    city: "Florianópolis",
    state: "SC",
    creci: "SC-07.234",
    rank: 9,
    previousRank: 9,
    score: 75,
    trustScore: 70,
    activeListings: 870,
    avgTicket: "R$ 480K",
    mainNeighborhoods: ["Ingleses", "Santinho", "Ponta das Canas"],
    propertyMix: [{ type: "Casa", pct: 55 }, { type: "Apartamento", pct: 40 }, { type: "Terreno", pct: 5 }],
    badge: "Presença no Norte",
    movement: "stable",
    movementValue: 0,
    avatar: "S",
    zone: "Elite",
    scoreLabel: "Consistente",
    fingerprint: { volume: 70, presence: 72, liquidity: 65, reliability: 70, priceRange: 58, concentration: 68 },
    microcopy: "Estável no Top 10.",
    claimedProfile: true,
  },
  {
    id: "10",
    slug: "atlantic-realty",
    name: "Atlantic Realty",
    city: "Florianópolis",
    state: "SC",
    creci: "SC-16.104",
    rank: 10,
    previousRank: 7,
    score: 73,
    trustScore: 68,
    activeListings: 720,
    avgTicket: "R$ 1,1M",
    mainNeighborhoods: ["Jurerê", "Cacupé", "Sambaqui"],
    propertyMix: [{ type: "Casa", pct: 60 }, { type: "Apartamento", pct: 30 }, { type: "Terreno", pct: 10 }],
    badge: "Alto padrão",
    movement: "down",
    movementValue: 3,
    avatar: "A",
    zone: "Elite",
    scoreLabel: "Consistente",
    fingerprint: { volume: 68, presence: 71, liquidity: 62, reliability: 68, priceRange: 92, concentration: 55 },
    microcopy: "Caiu 3 posições. Em risco de sair do Top 10.",
    claimedProfile: false,
  },
  {
    id: "11",
    slug: "horizonte-imoveis",
    name: "Horizonte Imóveis",
    city: "Florianópolis",
    state: "SC",
    creci: "SC-12.001",
    rank: 11,
    previousRank: 13,
    score: 71,
    trustScore: 66,
    activeListings: 640,
    avgTicket: "R$ 420K",
    mainNeighborhoods: ["Saco dos Limões", "Costeira", "Armação"],
    propertyMix: [{ type: "Apartamento", pct: 70 }, { type: "Casa", pct: 25 }, { type: "Terreno", pct: 5 }],
    badge: "Em ascensão",
    movement: "up",
    movementValue: 2,
    avatar: "H",
    zone: "Ascensão",
    scoreLabel: "Ascendente",
    fingerprint: { volume: 65, presence: 68, liquidity: 60, reliability: 66, priceRange: 55, concentration: 72 },
    microcopy: "Subiu 2 posições. Aproxima do Top 10.",
    claimedProfile: false,
  },
  {
    id: "12",
    slug: "damiao-corretor",
    name: "Damião Corretor",
    city: "Florianópolis",
    state: "SC",
    creci: "SC-09.887",
    rank: 12,
    previousRank: 11,
    score: 68,
    trustScore: 63,
    activeListings: 510,
    avgTicket: "R$ 390K",
    mainNeighborhoods: ["Barreiros", "São José", "Campinas"],
    propertyMix: [{ type: "Apartamento", pct: 80 }, { type: "Casa", pct: 15 }, { type: "Sala comercial", pct: 5 }],
    badge: "Ativo",
    movement: "down",
    movementValue: 1,
    avatar: "D",
    zone: "Ascensão",
    scoreLabel: "Ascendente",
    fingerprint: { volume: 62, presence: 65, liquidity: 57, reliability: 63, priceRange: 50, concentration: 70 },
    microcopy: "Perdeu 1 posição. Mantém pressão.",
    claimedProfile: false,
  },
  {
    id: "13",
    slug: "nayla-imoveis",
    name: "Nayla Imóveis",
    city: "Florianópolis",
    state: "SC",
    creci: "SC-14.652",
    rank: 13,
    previousRank: 12,
    score: 65,
    trustScore: 61,
    activeListings: 430,
    avgTicket: "R$ 350K",
    mainNeighborhoods: ["Kobrasol", "Barreiros", "Roçado"],
    propertyMix: [{ type: "Apartamento", pct: 75 }, { type: "Casa", pct: 20 }, { type: "Sala comercial", pct: 5 }],
    badge: "Ativo",
    movement: "down",
    movementValue: 1,
    avatar: "N",
    zone: "Ascensão",
    scoreLabel: "Ascendente",
    fingerprint: { volume: 60, presence: 63, liquidity: 55, reliability: 61, priceRange: 48, concentration: 68 },
    microcopy: "Perdeu posição. Rival avançou.",
    claimedProfile: true,
  },
  {
    id: "14",
    slug: "life-imoveis",
    name: "Life Imóveis",
    city: "Florianópolis",
    state: "SC",
    creci: "SC-11.320",
    rank: 14,
    previousRank: 14,
    score: 62,
    trustScore: 58,
    activeListings: 380,
    avgTicket: "R$ 310K",
    mainNeighborhoods: ["Centro", "José Mendes", "Prainha"],
    propertyMix: [{ type: "Apartamento", pct: 85 }, { type: "Sala comercial", pct: 10 }, { type: "Casa", pct: 5 }],
    badge: "Estável",
    movement: "new",
    movementValue: 0,
    avatar: "L",
    zone: "Ascensão",
    scoreLabel: "Ascendente",
    fingerprint: { volume: 56, presence: 60, liquidity: 52, reliability: 58, priceRange: 45, concentration: 75 },
    microcopy: "Novo no radar. Crescendo.",
    claimedProfile: false,
  },
  {
    id: "15",
    slug: "costa-rica-imoveis",
    name: "Costa Rica Imóveis",
    city: "Florianópolis",
    state: "SC",
    creci: "SC-10.003",
    rank: 15,
    previousRank: 17,
    score: 60,
    trustScore: 55,
    activeListings: 320,
    avgTicket: "R$ 280K",
    mainNeighborhoods: ["Rio Vermelho", "Vargem Grande", "Ratones"],
    propertyMix: [{ type: "Terreno", pct: 40 }, { type: "Casa", pct: 40 }, { type: "Apartamento", pct: 20 }],
    badge: "Em ascensão",
    movement: "up",
    movementValue: 2,
    avatar: "C",
    zone: "Ascensão",
    scoreLabel: "Ascendente",
    fingerprint: { volume: 54, presence: 57, liquidity: 50, reliability: 55, priceRange: 42, concentration: 65 },
    microcopy: "Subiu 2 posições. Cresce no Norte.",
    claimedProfile: false,
  },
];

export const listings: Listing[] = [
  {
    id: "l1",
    brokerId: "6",
    title: "Apartamento 3 quartos - Trindade",
    city: "Florianópolis",
    neighborhood: "Trindade",
    type: "Apartamento",
    price: "R$ 680.000",
    area: "92 m²",
    source: "ZAP Imóveis",
    status: "Ativo",
    evidenceScore: 88,
    firstSeen: "2026-01-15",
    lastSeen: "2026-05-05",
    url: "#",
    label: "Evidência pública",
  },
  {
    id: "l2",
    brokerId: "6",
    title: "Casa 4 quartos - Córrego Grande",
    city: "Florianópolis",
    neighborhood: "Córrego Grande",
    type: "Casa",
    price: "R$ 950.000",
    area: "210 m²",
    source: "VivaReal",
    status: "Ativo",
    evidenceScore: 82,
    firstSeen: "2026-02-10",
    lastSeen: "2026-05-04",
    url: "#",
    label: "Ativo",
  },
  {
    id: "l3",
    brokerId: "6",
    title: "Studio - Carvoeira",
    city: "Florianópolis",
    neighborhood: "Carvoeira",
    type: "Apartamento",
    price: "R$ 320.000",
    area: "38 m²",
    source: "OLX",
    status: "Ativo",
    evidenceScore: 70,
    firstSeen: "2026-03-01",
    lastSeen: "2026-05-03",
    url: "#",
    label: "Evidência pública",
  },
  {
    id: "l4",
    brokerId: "6",
    title: "Apartamento 2 quartos - Trindade",
    city: "Florianópolis",
    neighborhood: "Trindade",
    type: "Apartamento",
    price: "Sob consulta",
    area: "75 m²",
    source: "ZAP Imóveis",
    status: "Preço sob consulta",
    evidenceScore: 55,
    firstSeen: "2026-03-20",
    lastSeen: "2026-05-02",
    url: "#",
    label: "Preço sob consulta",
  },
  {
    id: "l5",
    brokerId: "6",
    title: "Sala Comercial - Centro",
    city: "Florianópolis",
    neighborhood: "Centro",
    type: "Sala comercial",
    price: "R$ 280.000",
    area: "45 m²",
    source: "QuintoAndar",
    status: "Ativo",
    evidenceScore: 75,
    firstSeen: "2026-04-01",
    lastSeen: "2026-05-05",
    url: "#",
    label: "Evidência pública",
  },
  {
    id: "l6",
    brokerId: "6",
    title: "Casa 3 quartos - Içara",
    city: "Içara",
    neighborhood: "Centro",
    type: "Casa",
    price: "R$ 420.000",
    area: "140 m²",
    source: "ZAP Imóveis",
    status: "Ativo",
    evidenceScore: 65,
    firstSeen: "2026-02-25",
    lastSeen: "2026-04-30",
    url: "#",
    label: "Evidência pública",
  },
  {
    id: "l7",
    brokerId: "6",
    title: "Terreno - Criciúma",
    city: "Criciúma",
    neighborhood: "Comerciário",
    type: "Terreno",
    price: "R$ 180.000",
    area: "360 m²",
    source: "OLX",
    status: "Ativo",
    evidenceScore: 48,
    firstSeen: "2026-01-10",
    lastSeen: "2026-03-15",
    url: "#",
    label: "Dado incompleto",
  },
  {
    id: "l8",
    brokerId: "6",
    title: "Apartamento 1 quarto - UFSC",
    city: "Florianópolis",
    neighborhood: "Trindade",
    type: "Apartamento",
    price: "R$ 290.000",
    area: "42 m²",
    source: "VivaReal",
    status: "Ativo",
    evidenceScore: 80,
    firstSeen: "2026-04-10",
    lastSeen: "2026-05-05",
    url: "#",
    label: "Ativo",
  },
];

export const cities: City[] = [
  {
    id: "florianopolis",
    name: "Florianópolis",
    state: "SC",
    topBroker: "Barakah Imóveis",
    mappedBrokers: 50,
    trackedListings: 18420,
    active: true,
    comingSoon: false,
  },
  {
    id: "sao-paulo",
    name: "São Paulo",
    state: "SP",
    topBroker: "Em breve",
    mappedBrokers: 0,
    trackedListings: 0,
    active: false,
    comingSoon: true,
  },
  {
    id: "balneario-camboriu",
    name: "Balneário Camboriú",
    state: "SC",
    topBroker: "Em breve",
    mappedBrokers: 0,
    trackedListings: 0,
    active: false,
    comingSoon: true,
  },
  {
    id: "itapema",
    name: "Itapema",
    state: "SC",
    topBroker: "Em breve",
    mappedBrokers: 0,
    trackedListings: 0,
    active: false,
    comingSoon: true,
  },
  {
    id: "curitiba",
    name: "Curitiba",
    state: "PR",
    topBroker: "Em breve",
    mappedBrokers: 0,
    trackedListings: 0,
    active: false,
    comingSoon: true,
  },
  {
    id: "santiago",
    name: "Santiago",
    state: "Chile",
    topBroker: "Em breve",
    mappedBrokers: 0,
    trackedListings: 0,
    active: false,
    comingSoon: true,
  },
];

export const scoreComponents = {
  activity: 40,
  portfolioCoverage: 20,
  dataReliability: 20,
  consistency: 10,
  marketRelevance: 10,
};

export const ricardoMartins = brokers.find((b) => b.slug === "ricardo-martins")!;
export const ricardoListings = listings.filter((l) => l.brokerId === "6");

export const brokersAboveRicardo = brokers.filter((b) => b.rank < 6).slice(-3);
export const brokersBelowRicardo = brokers.filter((b) => b.rank > 6).slice(0, 3);
