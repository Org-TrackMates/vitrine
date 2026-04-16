"use client";

import { useEffect } from "react";

/**
 * Observe toutes les .fade-up de la page et leur ajoute .visible quand
 * elles entrent dans le viewport. Identique au comportement du site HTML
 * d'origine — sans dépendance externe.
 */
export default function FadeUpObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".fade-up");
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target); // une seule fois
          }
        });
      },
      { threshold: 0.1 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return null;
}
