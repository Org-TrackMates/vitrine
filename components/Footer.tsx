export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-6 border-t border-white/[0.07] bg-bg-2 px-10 py-12">
      <div>
        <div className="font-display text-[15px] font-extrabold tracking-[-0.03em] text-text">
          Track<span className="text-red">Mates</span>
        </div>
        <div className="mt-0.75 text-[12px] text-text-3">
          La course se vit mieux ensemble. · Racing is better together.
        </div>
      </div>

      <div className="flex gap-6">
        <a
          href="#concept"
          className="text-[12px] text-text-3 no-underline transition-colors hover:text-text-2"
        >
          Le concept
        </a>
        <a
          href="#saison"
          className="text-[12px] text-text-3 no-underline transition-colors hover:text-text-2"
        >
          Saison 2027
        </a>
        <a
          href="#roadmap"
          className="text-[12px] text-text-3 no-underline transition-colors hover:text-text-2"
        >
          Vision
        </a>
        <a
          href="mailto:alexis.fabarez@trackmates.fr"
          className="text-[12px] text-text-3 no-underline transition-colors hover:text-text-2"
        >
          Contact
        </a>
      </div>

      <div className="text-[11px] tracking-[0.03em] text-text-3">
        © 2026 TrackMates · trackmates.fr
      </div>
    </footer>
  );
}
