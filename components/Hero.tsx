export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden pt-36 pb-20 px-10 md:pt-28 md:pb-16 md:px-5">
      {/* Backgrounds */}
      <div className="hero-grid" />
      <div className="absolute top-[30%] -right-52 w-175 h-175 pointer-events-none bg-[radial-gradient(circle,rgba(200,56,42,0.06)_0%,transparent_65%)]" />
      <div className="hero-flag" />

      {/* Content */}
      <div className="relative z-10 max-w-205">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 font-display text-[11px] font-semibold tracking-[0.25em] uppercase text-red mb-6">
          <span className="w-6 h-px bg-red" />
          Lancement 2027 · Saison ELMS
        </div>

        {/* Title */}
        <h1 className="font-display font-extrabold leading-none tracking-tighter text-(--text) text-[clamp(3.5rem,8vw,7rem)] mb-6">
          De votre ville
          <br />
          <span className="text-red">au paddock.</span>
          <br />
          <span className="font-serif font-normal italic text-(--text-2)">
            Sans la galère.
          </span>
        </h1>

        {/* Sub */}
        <p className="text-(--text-2) text-[clamp(1rem,2vw,1.2rem)] leading-[1.8] max-w-130 mb-12">
          TrackMates organise vos weekends courses depuis votre ville
          jusqu&apos;au circuit — transport, hébergement, billets. Un seul
          interlocuteur. Zéro stress.
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-3 mb-16 sm:flex-row sm:flex-wrap">
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center gap-2 font-display text-[13px] font-bold tracking-[0.06em] uppercase py-3.25 px-7 rounded-full bg-red text-white no-underline transition-all hover:bg-red-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(200,56,42,0.3)]"
          >
            Rejoindre la liste d&apos;attente →
          </a>
          <a
            href="#saison"
            className="inline-flex items-center justify-center gap-2 font-display text-[13px] font-bold tracking-[0.06em] uppercase py-3.25 px-7 rounded-full bg-transparent text-(--text) border border-white/12 no-underline transition-all hover:border-white/40 hover:bg-(--bg-3)"
          >
            Voir les circuits 2027
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-10 sm:gap-5">
          {[
            { num: "6", label: "Circuits ELMS 2027" },
            { num: "5", label: "Pays traversés" },
            { num: "47", label: "Voitures sur la grille" },
            { num: "0", label: "Prise de tête" },
          ].map(({ num, label }, i) => (
            <div key={i} className="flex items-center gap-10 sm:gap-5">
              {i > 0 && <div className="w-px self-stretch bg-white/12" />}
              <div>
                <span className="block font-display font-extrabold text-[1.8rem] tracking-tight leading-none text-(--text)">
                  {num}
                </span>
                <div className="text-[11px] tracking-[0.05em] mt-1 text-(--text-3)">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
