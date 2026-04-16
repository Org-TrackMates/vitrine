"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { joinWaitlistAction } from "@/app/actions/waitlist";
import { circuits2027 } from "@/lib/data";
import { initialWaitlistState } from "@/lib/waitlist-state";

const POLL_INTERVAL_MS = 10_000;

/**
 * Classes de masquage visuel qui n'utilisent PAS `sr-only`.
 * On combine des utilitaires Tailwind basiques (position, taille 0, opacité)
 * pour obtenir le même résultat sans dépendre de la génération de `sr-only`.
 * L'input reste focusable au clavier et lu par les screen readers.
 */
const VISUALLY_HIDDEN =
  "pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0";

export default function WaitlistForm({
  initialCount,
}: {
  initialCount: number;
}) {
  const [state, formAction] = useActionState(
    joinWaitlistAction,
    initialWaitlistState,
  );

  // ─── Count : deux sources, une valeur dérivée ──────────────────────
  const [pollCount, setPollCount] = useState<number>(initialCount);
  const successCount = state.status === "success" ? state.newCount : null;
  const displayCount = Math.max(pollCount, successCount ?? 0);

  // ─── Shake sur invalide : DOM direct ────────────────────────────────
  const formRef = useRef<HTMLFormElement>(null);
  const prevStateRef = useRef(state);

  useEffect(() => {
    if (state === prevStateRef.current) return;
    prevStateRef.current = state;

    const form = formRef.current;
    if (!form) return;

    if (state.status === "invalid") {
      form.classList.remove("animate-shake-form");
      void form.offsetWidth;
      form.classList.add("animate-shake-form");
    }
  }, [state]);

  // ─── Polling du compteur ────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function fetchCount() {
      try {
        const res = await fetch("/api/waitlist/count", { cache: "no-store" });
        if (!res.ok) return;
        const data: { count?: number } = await res.json();
        if (!cancelled && typeof data.count === "number") {
          setPollCount(data.count);
        }
      } catch {
        // Silencieux — réessaiera au prochain tick
      }
    }

    const id = setInterval(fetchCount, POLL_INTERVAL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") fetchCount();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const isSuccess = state.status === "success";
  const isDuplicate = state.status === "duplicate";
  const isInvalid = state.status === "invalid";
  const isError = state.status === "error";
  const invalidField = isInvalid ? state.field : null;
  const disabled = isSuccess;

  const noteText =
    state.status === "idle"
      ? "Aucun spam. Juste une notification quand les réservations ouvrent."
      : state.message;

  const noteColor = (() => {
    if (isSuccess || isDuplicate) return "text-[#5DCAA5]";
    if (isInvalid || isError) return "text-red";
    return "text-text-3";
  })();

  const baseInputClass =
    "w-full rounded-full border-[1.5px] bg-bg-2 px-5 py-3 font-body text-sm text-text outline-none transition-colors duration-200 placeholder:text-text-3 disabled:opacity-60";

  const borderClass = (fieldErr: boolean) =>
    fieldErr || isError
      ? "border-red"
      : "border-border-strong focus:border-red";

  return (
    <>
      {/* Pastille compteur live */}
      <div className="mb-8 inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-bg-3 px-3.5 py-1.5 font-display text-[12px] font-medium text-text-2">
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[#3DAA7A]" />
        Déjà{" "}
        <strong
          className="font-medium text-text tabular-nums"
          aria-live="polite"
        >
          {displayCount.toLocaleString("fr-FR")}
        </strong>
        &nbsp;personnes sur liste d&apos;attente
      </div>

      <h2 className="mb-3 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] text-text">
        Sois parmi les premiers.
      </h2>
      <p className="mb-10 font-serif text-[1.15rem] leading-[1.6] text-text-2 italic">
        «&nbsp;Les places sont limitées par circuit. Inscris-toi maintenant pour
        être notifié en avant-première à l&apos;ouverture des réservations le
        1er janvier 2027.&nbsp;»
      </p>

      <form
        ref={formRef}
        action={formAction}
        className="mx-auto mb-4 flex max-w-130 flex-col gap-3 text-left"
        noValidate
      >
        {/* ─── Nom ──────────────────────────────────────────────────── */}
        <input
          type="text"
          name="name"
          placeholder="Ton prénom"
          aria-label="Prénom"
          required
          minLength={2}
          maxLength={80}
          autoComplete="given-name"
          disabled={disabled}
          aria-invalid={invalidField === "name"}
          className={`${baseInputClass} ${borderClass(invalidField === "name")}`}
        />

        {/* ─── Email ────────────────────────────────────────────────── */}
        <input
          type="email"
          name="email"
          placeholder="ton@email.fr"
          aria-label="Adresse email"
          required
          autoComplete="email"
          disabled={disabled}
          aria-invalid={invalidField === "email"}
          className={`${baseInputClass} ${borderClass(invalidField === "email")}`}
        />

        {/* ─── Circuit préféré (optionnel) ──────────────────────────── */}
        <fieldset disabled={disabled} className="mt-2">
          <legend className="mb-2.5 block w-full text-center font-display text-[10px] font-semibold tracking-[0.2em] text-text-3 uppercase">
            Un circuit te fait rêver&nbsp;?{" "}
            <span className="opacity-60">(optionnel)</span>
          </legend>
          <div className="flex flex-wrap justify-center gap-2">
            {circuits2027.map((c) => (
              <CircuitPill
                key={c.slug}
                value={c.slug}
                label={c.name}
                flag={c.flag}
              />
            ))}
            <CircuitPill value="" label="Pas encore décidé·e" />
          </div>
        </fieldset>

        {/* ─── Submit ───────────────────────────────────────────────── */}
        <div className="mt-3">
          <SubmitButton
            isSuccess={isSuccess}
            successName={state.status === "success" ? state.name : null}
          />
        </div>
      </form>

      <p
        role="status"
        aria-live="polite"
        className={`text-[11px] tracking-[0.03em] transition-colors ${noteColor}`}
      >
        {noteText}
      </p>
    </>
  );
}

/**
 * Bouton-radio stylé en pill avec peer-checked.
 * L'input radio réel est rendu invisible via utilitaires Tailwind
 * de base (h-0, w-0, opacity-0, absolute) — aucune dépendance à sr-only.
 * Il reste focusable au clavier et accessible aux screen readers.
 */
function CircuitPill({
  value,
  label,
  flag,
}: {
  value: string;
  label: string;
  flag?: string;
}) {
  return (
    <label className="group cursor-pointer">
      <input
        type="radio"
        name="preferred_circuit"
        value={value}
        className={`peer ${VISUALLY_HIDDEN}`}
      />
      <span
        className="
          inline-flex items-center gap-1.5 rounded-full border
          border-border-subtle bg-bg-3 px-3.5 py-2
          font-display text-[12px] font-medium text-text-2
          transition-colors duration-150
          hover:border-border-strong hover:text-text
          peer-checked:border-red peer-checked:bg-red-pale peer-checked:text-text
          peer-focus-visible:ring-2 peer-focus-visible:ring-red peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg
          group-has-[input:disabled]:pointer-events-none
          group-has-[input:disabled]:opacity-50
        "
      >
        {flag && <span aria-hidden>{flag}</span>}
        {label}
      </span>
    </label>
  );
}

function SubmitButton({
  isSuccess,
  successName,
}: {
  isSuccess: boolean;
  successName: string | null;
}) {
  const { pending } = useFormStatus();

  const label = isSuccess
    ? successName
      ? `✓ Inscrit·e, ${successName} !`
      : "✓ Inscrit·e !"
    : pending
      ? "Envoi…"
      : "M'inscrire →";

  return (
    <button
      type="submit"
      disabled={pending || isSuccess}
      className={`w-full cursor-pointer rounded-full border-none px-5.5 py-3.5 font-display text-[12px] font-bold tracking-[0.06em] text-white uppercase transition-all duration-200 disabled:cursor-default ${
        isSuccess
          ? "bg-[#0F6E56]"
          : pending
            ? "bg-red-2 opacity-80"
            : "bg-red hover:bg-red-2"
      }`}
    >
      {label}
    </button>
  );
}
