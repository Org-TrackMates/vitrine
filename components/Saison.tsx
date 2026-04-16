import { circuits2027, type Circuit, type TransportKind } from "@/lib/data";
import { SectionEyebrow, SectionLead, SectionTitle } from "./SectionHeader";

const badgeStyles: Record<TransportKind, string> = {
  fly: "bg-[rgba(24,95,165,0.15)] text-[#85B7EB]",
  train: "bg-[rgba(15,110,86,0.15)] text-[#5DCAA5]",
  finale: "bg-[rgba(200,56,42,0.15)] text-[#E84C3D]",
};

export default function Saison() {
  return (
    <section
      id="saison"
      className="fade-up mx-auto max-w-225 px-5 pb-20 sm:px-8 sm:pb-24 md:px-10"
    >
      <SectionEyebrow>Saison ELMS 2027</SectionEyebrow>
      <SectionTitle>6 circuits. 6 pays. 1 saison.</SectionTitle>
      <SectionLead>
        «&nbsp;L&apos;European Le Mans Series — la route officielle vers les 24
        Heures du Mans. Chaque vainqueur reçoit une invitation automatique pour
        la course la plus mythique au monde.&nbsp;»
      </SectionLead>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {circuits2027.map((c) => (
          <CircuitCard key={c.name} circuit={c} />
        ))}
      </div>
    </section>
  );
}

function CircuitCard({ circuit }: { circuit: Circuit }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/[0.07] bg-bg-2 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong">
      {/* Liseré rouge qui apparaît au hover */}
      <span className="absolute top-0 bottom-0 left-0 w-0.75 bg-red opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      {/* Badge transport */}
      <span
        className={`absolute top-4 right-4 rounded-full px-1.75 py-0.5 font-display text-[9px] font-bold tracking-widest uppercase ${
          badgeStyles[circuit.badgeKind]
        }`}
      >
        {circuit.badge}
      </span>

      <div className="mb-1.5 font-display text-[9px] font-bold tracking-[0.2em] text-red uppercase">
        {circuit.round}
      </div>
      <div className="mb-0.5 font-display text-[15px] font-extrabold tracking-[-0.02em] text-text">
        {circuit.name}
      </div>
      <div className="mb-2.5 text-[11px] text-text-3">{circuit.location}</div>

      <div className="mb-2.5 flex flex-col gap-1">
        <MetaRow label="Durée du séjour" value={circuit.stay} />
        <MetaRow
          label={circuit.transportLabel}
          value={circuit.transportDuration}
        />
        <MetaRow label="Hébergement" value={circuit.lodging} />
      </div>

      <div className="font-display text-[1.1rem] font-extrabold tracking-[-0.02em] text-text">
        {/* dès {circuit.priceFrom} € */}
        Prix: {circuit.priceFrom}
      </div>
      <div className="text-[10px] text-text-3">
        {/* / personne · */} groupe: TBD.
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[11px] text-text-2">
      <span>{label}</span>
      <span className="text-text-3">{value}</span>
    </div>
  );
}
