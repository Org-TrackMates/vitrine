import type { ReactNode } from "react";

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow-line mb-4 flex items-center gap-2.5 font-display text-[11px] font-semibold tracking-[0.25em] text-red uppercase">
      <span>{children}</span>
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-4 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-text">
      {children}
    </h2>
  );
}

export function SectionLead({ children }: { children: ReactNode }) {
  return (
    <p className="mb-12 max-w-150 font-serif text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.6] text-text-2 italic">
      {children}
    </p>
  );
}
