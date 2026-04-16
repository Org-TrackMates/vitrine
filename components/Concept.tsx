import { SectionEyebrow, SectionTitle, SectionLead } from "./SectionHeader";

const cards = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-4.5 h-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M21 3L3 10.5l7.5 3L21 3zm0 0l-7.5 10.5H10L3 10.5" />
      </svg>
    ),
    title: "Transport inclus",
    desc: "Train, Eurostar ou avion selon le circuit — réservé, payé, géré. Un minivan privatif vous récupère à l'arrivée et vous emmène jusqu'au circuit.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-4.5 h-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Hébergement sélectionné",
    desc: "Hôtel à proximité du circuit, nuits réservées, check-in sans surprise. On choisit pour vous — vous n'avez qu'à poser vos valises.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-4.5 h-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Billets d'entrée",
    desc: "Pass circuit week-end ou semaine complète inclus dans chaque package. Accès pit lane, paddock ouvert, autograph session selon l'offre.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-4.5 h-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
      </svg>
    ),
    title: "En groupe, c'est mieux",
    desc: "Des groupes de 4 à 14 personnes, depuis votre ville. L'endurance c'est un sport de partage — vivez-le avec des gens qui comprennent pourquoi vous vous levez à 6h un dimanche.",
  },
];

export default function Concept() {
  return (
    <section id="concept" className="fade-up mx-auto max-w-225 px-10 py-24">
      <SectionEyebrow>Le concept</SectionEyebrow>
      <SectionTitle>La course commence avant le circuit.</SectionTitle>
      <SectionLead>
        &ldquo;Tout organiser soi-même — transport, hôtel, billets — ça prend du
        temps et ça se rate facilement. TrackMates s&apos;occupe de tout.&rdquo;
      </SectionLead>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden">
        {cards.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="p-8 bg-bg-2 hover:bg-bg-3 transition-colors duration-200"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 bg-red/15 border border-red/20 text-red">
              {icon}
            </div>
            <h3 className="font-display text-[14px] font-bold tracking-[-0.01em] text-text mb-2">
              {title}
            </h3>
            <p className="text-[13px] leading-[1.75] text-text-2">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
