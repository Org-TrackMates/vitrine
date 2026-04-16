export type TransportKind = "fly" | "train" | "finale";

export interface Circuit {
  slug: string; // "barcelona" — id stable utilisé côté DB (waitlist)
  flag: string; // emoji drapeau seul, utilisable dans les formulaires
  round: string; // "R1 · 🇪🇸 Espagne"
  name: string;
  location: string;
  stay: string; // "Ven. → Dim." ou "Sam. → Dim."
  transportLabel: string; // "Vol Paris direct"
  transportDuration: string; // "1h45"
  lodging: string;
  priceFrom: string; // en euros
  badge: string; // "Vol" / "TGV" / "Eurostar" / "Finale"
  badgeKind: TransportKind;
}

export const circuits2027: Circuit[] = [
  {
    slug: "barcelona",
    flag: "🇪🇸",
    round: "R1 · 🇪🇸 Espagne",
    name: "Barcelone",
    location: "Circuit de Catalunya",
    stay: "Ven. → Dim.",
    transportLabel: "Vol Paris direct",
    transportDuration: "1h45",
    lodging: "2 nuits · Barcelone",
    priceFrom: "TBA",
    badge: "Vol",
    badgeKind: "fly",
  },
  {
    slug: "paul-ricard",
    flag: "🇫🇷",
    round: "R2 · 🇫🇷 France",
    name: "Paul Ricard",
    location: "Circuit Paul Ricard · Le Castellet",
    stay: "Ven. → Dim.",
    transportLabel: "TGV Paris direct",
    transportDuration: "3h30",
    lodging: "2 nuits · région Toulon",
    priceFrom: "TBA",
    badge: "TGV",
    badgeKind: "train",
  },
  {
    slug: "imola",
    flag: "🇮🇹",
    round: "R3 · 🇮🇹 Italie",
    name: "Imola",
    location: "Autodromo Enzo e Dino Ferrari",
    stay: "Ven. → Dim.",
    transportLabel: "Vol Paris direct",
    transportDuration: "1h50",
    lodging: "2 nuits · Imola",
    priceFrom: "TBA",
    badge: "Vol",
    badgeKind: "fly",
  },
  {
    slug: "spa",
    flag: "🇧🇪",
    round: "R4 · 🇧🇪 Belgique",
    name: "Spa",
    location: "Circuit de Spa-Francorchamps",
    stay: "Ven. → Dim.",
    transportLabel: "Eurostar Paris → Liège",
    transportDuration: "2h20",
    lodging: "2 nuits · Liège",
    priceFrom: "TBA",
    badge: "Eurostar",
    badgeKind: "train",
  },
  {
    slug: "silverstone",
    flag: "🇬🇧",
    round: "R5 · 🇬🇧 Royaume-Uni",
    name: "Silverstone",
    location: "Silverstone Circuit",
    stay: "Sam. → Dim.",
    transportLabel: "Eurostar Paris → Londres",
    transportDuration: "2h20",
    lodging: "2 nuits · Northampton",
    priceFrom: "TBA",
    badge: "Eurostar",
    badgeKind: "train",
  },
  {
    slug: "portimao",
    flag: "🇵🇹",
    round: "R6 · 🇵🇹 Portugal",
    name: "Portimão",
    location: "Autodromo Internacional do Algarve",
    stay: "Ven. → Dim.",
    transportLabel: "Vol Paris direct",
    transportDuration: "2h35",
    lodging: "2 nuits · bord de mer",
    priceFrom: "TBA",
    badge: "Finale",
    badgeKind: "finale",
  },
];

/* ═══════════════════════════════════════════════════════════════
   ROADMAP PUBLIQUE
   ═══════════════════════════════════════════════════════════════ */

export interface RoadmapItem {
  title: string;
  text: string;
}

export interface RoadmapPhase {
  year: "2027" | "2028";
  name: string;
  status: "soon" | "open" | "future";
  statusLabel: string;
  title: string;
  description: string;
  items: RoadmapItem[];
  milestone: string;
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    year: "2027",
    name: "Saison ELMS",
    status: "soon",
    statusLabel: "Bientôt ouvert",
    title: "Première saison TrackMates — 6 circuits ELMS",
    description:
      "De Barcelone à Portimão, accompagnez les meilleures équipes d'endurance européennes sur les circuits les plus mythiques. Transport, hébergement, billets — tout inclus depuis votre ville.",
    items: [
      {
        title: "6 packages circuits",
        text: "— à l'unité ou en saison complète (-10%)",
      },
      {
        title: "Groupes de 4 à 14 personnes",
        text: "— depuis Paris et villes partenaires",
      },
      {
        title: "Prix TBA",
        text: "par personne, tout compris, aller-retour",
      },
    ],
    milestone: "Ouverture des réservations — 1er janvier 2027",
  },
  {
    year: "2028",
    name: "Le Mans",
    status: "future",
    statusLabel: "À venir",
    title: "Les 24 Heures du Mans — 4 niveaux d'expérience",
    description:
      "L'aboutissement naturel. Les équipes que vous avez vues toute la saison en ELMS sont maintenant sur le circuit le plus mythique du monde. Ford vs Ferrari. 24 heures. 55 minutes de Paris.",
    items: [
      {
        title: "Bronze",
        text: "— Weekend course · Camping sur circuit",
      },
      {
        title: "Silver",
        text: "— Vendredi au dimanche · Camping 2 nuits",
      },
      {
        title: "Gold",
        text: "— Semaine complète · Glamping officiel ACO",
      },
      {
        title: "Platinum",
        text: "— 6 jours · Hôtel + Tribune VIP + Paddock pass",
      },
    ],
    milestone: "Bundle \u201CRoad to Le Mans\u201D — Saison ELMS + 24h du Mans",
  },
];
