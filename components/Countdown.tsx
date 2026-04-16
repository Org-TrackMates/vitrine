"use client";

import { useEffect, useRef, useState } from "react";

function pad(n: number, len = 2) {
  return String(n).padStart(len, "0");
}

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function calcTimeLeft(): TimeLeft {
  const target = new Date("2027-01-01T00:00:00").getTime();
  const diff = target - Date.now();
  if (diff <= 0)
    return { days: "000", hours: "00", minutes: "00", seconds: "00" };
  return {
    days: pad(Math.floor(diff / 86400000), 3),
    hours: pad(Math.floor((diff % 86400000) / 3600000)),
    minutes: pad(Math.floor((diff % 3600000) / 60000)),
    seconds: pad(Math.floor((diff % 60000) / 1000)),
  };
}

const ZERO: TimeLeft = {
  days: "000",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>(ZERO);
  const [flashing, setFlashing] = useState<string | null>(null);
  const prevRef = useRef<TimeLeft>(ZERO);

  useEffect(() => {
    const tick = () => {
      const next = calcTimeLeft();
      const prev = prevRef.current;
      const flashKey = next.days !== prev.days ? "days" : "seconds";
      setFlashing(flashKey);
      setTimeout(() => setFlashing(null), 300);
      prevRef.current = next;
      setTime(next);
    };

    // setTimeout(0) pour sortir du cycle synchrone de l'effect
    const initId = setTimeout(tick, 0);
    const intervalId = setInterval(tick, 1000);

    return () => {
      clearTimeout(initId);
      clearInterval(intervalId);
    };
  }, []);

  const blocks = [
    { id: "days", val: time.days, label: "Jours" },
    { id: "hours", val: time.hours, label: "Heures" },
    { id: "minutes", val: time.minutes, label: "Minutes" },
    { id: "seconds", val: time.seconds, label: "Secondes" },
  ];

  return (
    <section className="relative overflow-hidden text-center bg-bg-2 border-y border-white/[0.07] py-20 px-10 md:py-14 md:px-5">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(200,56,42,0.05)_0%,transparent_60%)]" />

      <div className="relative z-10">
        <div className="font-display text-[11px] font-semibold tracking-[0.25em] uppercase text-red mb-4">
          Compte à rebours
        </div>

        <p className="font-serif italic text-text-2 text-[clamp(1.5rem,3vw,2.2rem)] mb-12">
          Ouverture des réservations — 1er janvier 2027
        </p>

        <div className="flex justify-center flex-wrap gap-1.5 mb-6 md:gap-1">
          {blocks.map(({ id, val, label }, i) => (
            <div key={id} className="flex items-center">
              {i > 0 && (
                <span className="font-display font-extrabold text-[2.5rem] px-1 text-red/30 select-none animate-blink">
                  :
                </span>
              )}
              <div className="bg-bg-3 border border-white/12 rounded-xl py-8 px-10 min-w-30 md:py-5 md:px-4 md:min-w-18 hover:border-red transition-colors duration-300">
                <span
                  className={`block font-display font-extrabold leading-none tracking-tighter text-[clamp(2.5rem,6vw,4rem)] md:text-[2rem] transition-colors duration-300 ${flashing === id ? "text-red" : "text-text"}`}
                >
                  {val}
                </span>
                <span className="block font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-text-3 mt-2">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[13px] tracking-[0.05em] text-text-3">
          Inscris-toi maintenant pour être notifié en avant-première —{" "}
          <strong className="text-red font-medium">
            places limitées par circuit.
          </strong>
        </p>
      </div>
    </section>
  );
}
