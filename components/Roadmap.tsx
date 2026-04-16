import { roadmapPhases, type RoadmapPhase } from "@/lib/data";
import { SectionEyebrow, SectionLead, SectionTitle } from "./SectionHeader";

export default function Roadmap() {
  return (
    <section
      id="roadmap"
      className="border-t border-border-subtle bg-bg-2 px-10 py-24"
    >
      <div className="mx-auto max-w-225">
        <div className="fade-up">
          <SectionEyebrow>Notre vision</SectionEyebrow>
        </div>
        <div className="fade-up">
          <SectionTitle>La route vers Le Mans.</SectionTitle>
        </div>
        <div className="fade-up">
          <SectionLead>
            «&nbsp;TrackMates commence par l&apos;ELMS — la série qui mène
            directement aux 24 Heures du Mans. Notre objectif : vous y emmener
            aussi.&nbsp;»
          </SectionLead>
        </div>

        <div className="flex flex-col">
          {roadmapPhases.map((phase) => (
            <PhaseRow key={phase.year} phase={phase} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhaseRow({ phase }: { phase: RoadmapPhase }) {
  const yearColor = phase.year === "2027" ? "text-green" : "text-red-3";
  const nameColor = phase.year === "2027" ? "text-green-dark" : "text-red";

  const statusStyles: Record<RoadmapPhase["status"], string> = {
    soon: "bg-[rgba(201,168,76,0.15)] text-gold",
    open: "bg-[rgba(15,110,86,0.15)] text-green",
    future: "border border-border-subtle bg-bg-4 text-text-3",
  };

  const dotColor = phase.year === "2027" ? "bg-green" : "bg-red-3";

  const isLeMans = phase.year === "2028";

  return (
    <div className="fade-up grid grid-cols-1 gap-8 border-b border-border-subtle py-10 last:border-b-0 md:grid-cols-[200px_1fr]">
      {/* Colonne gauche */}
      <div>
        <span
          className={`mb-1 block font-display text-[3rem] leading-none font-extrabold tracking-[-0.04em] ${yearColor}`}
        >
          {phase.year}
        </span>
        <span
          className={`mb-3 block font-display text-[11px] font-semibold tracking-[0.15em] uppercase ${nameColor}`}
        >
          {phase.name}
        </span>
        <span
          className={`inline-block rounded-full px-2.5 py-0.75 font-display text-[10px] font-bold tracking-[0.12em] uppercase ${statusStyles[phase.status]}`}
        >
          {phase.statusLabel}
        </span>
      </div>

      {/* Colonne droite */}
      <div>
        <div className="mb-2 font-display text-[1.3rem] leading-[1.2] font-extrabold tracking-[-0.02em] text-text">
          {phase.title}
        </div>
        <p className="mb-5 max-w-135 text-[13px] leading-[1.8] text-text-2">
          {phase.description}
        </p>

        <div className="flex flex-col gap-2">
          {phase.items.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-2.5 rounded-lg border border-border-subtle bg-bg-3 px-3 py-2.5"
            >
              <span
                className={`mt-1.25 h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`}
              />
              <div className="text-[13px] leading-normal text-text-2">
                <strong className="font-medium text-text">{item.title}</strong>{" "}
                {item.text}
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-3 flex items-center gap-2.5 rounded-lg px-4 py-3 ${
            isLeMans
              ? "border border-[rgba(200,56,42,0.2)] bg-[rgba(200,56,42,0.06)]"
              : "border border-[rgba(200,56,42,0.2)] bg-red-pale"
          }`}
        >
          <span className="shrink-0 text-sm">★</span>
          <span className="font-display text-[12px] font-bold text-rose">
            {phase.milestone}
          </span>
        </div>
      </div>
    </div>
  );
}
