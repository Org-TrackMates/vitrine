"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "#concept", label: "Le concept" },
  { href: "#saison", label: "Saison 2027" },
  { href: "#roadmap", label: "Vision" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* ── NAV BAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-15 flex items-center justify-between px-10 md:px-5 bg-bg/85 backdrop-blur-md border-b border-white/[0.07]">
        {/* Brand */}
        <Link
          href="#"
          className="flex items-center gap-2 font-display font-extrabold text-base tracking-tight text-(--text) no-underline"
        >
          <span className="w-1.75 h-1.75 rounded-full bg-red shrink-0 animate-[pulse_2s_infinite]" />
          <div>
            Track<span className="text-red">Mates</span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-[13px] text-(--text-2) no-underline transition-colors hover:text-(--text)"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#waitlist"
          className="hidden md:inline-flex items-center font-display text-xs font-bold tracking-[0.06em] uppercase py-2 px-4.5 rounded-full bg-red text-white no-underline transition-all hover:bg-red-dark hover:-translate-y-px"
        >
          Rejoindre la liste →
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.25 bg-transparent border-none cursor-pointer p-1"
        >
          <span
            className={`block w-5 h-[1.5px] rounded-sm bg-(--text) transition-all duration-200 ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
          />
          <span
            className={`block w-5 h-[1.5px] rounded-sm bg-(--text) transition-all duration-200 ${open ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block w-5 h-[1.5px] rounded-sm bg-(--text) transition-all duration-200 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`md:hidden fixed top-15 left-0 right-0 z-40 flex flex-col px-5 pb-6 bg-bg/97 backdrop-blur-xl border-b border-white/[0.07] transition-all duration-200 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={close}
            className="block py-3.5 font-display text-[15px] font-semibold text-(--text-2) no-underline border-b border-white/[0.07] transition-colors hover:text-(--text)"
          >
            {label}
          </a>
        ))}
        <a
          href="#waitlist"
          onClick={close}
          className="inline-block mt-5 font-display text-[13px] font-bold tracking-[0.06em] uppercase py-3 px-5.5 rounded-full bg-red text-white text-center no-underline"
        >
          Rejoindre la liste →
        </a>
      </div>
    </>
  );
}
