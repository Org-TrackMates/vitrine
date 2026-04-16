"use server";

import { circuits2027 } from "@/lib/data";
import { addEntryToWaitlist } from "@/lib/waitlist";
import type { WaitlistState } from "@/lib/waitlist-state";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MIN = 2;
const NAME_MAX = 80;

// Set des slugs valides — construit à partir de la source de vérité (data.ts)
// pour que ça reste synchro si on ajoute/retire un circuit.
const VALID_CIRCUIT_SLUGS = new Set(circuits2027.map((c) => c.slug));

/**
 * Server Action utilisable avec React 19 `useActionState`.
 * Signature : (prevState, formData) => nextState
 */
export async function joinWaitlistAction(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  // ─── Nom ────────────────────────────────────────────────────────────
  const rawName = formData.get("name");
  const name = typeof rawName === "string" ? rawName.trim() : "";
  if (name.length < NAME_MIN || name.length > NAME_MAX) {
    return {
      status: "invalid",
      field: "name",
      message:
        name.length === 0
          ? "Merci d'indiquer ton prénom."
          : "Prénom trop court ou trop long.",
    };
  }

  // ─── Email ──────────────────────────────────────────────────────────
  const rawEmail = formData.get("email");
  if (typeof rawEmail !== "string" || !EMAIL_RE.test(rawEmail.trim())) {
    return {
      status: "invalid",
      field: "email",
      message: "Adresse email invalide.",
    };
  }

  // ─── Circuit préféré (optionnel) ────────────────────────────────────
  // On accepte : absence, chaîne vide, ou slug valide.
  // Tout le reste → null (on silencieusement ignore, c'est optionnel).
  const rawCircuit = formData.get("preferred_circuit");
  const preferredCircuit =
    typeof rawCircuit === "string" &&
    rawCircuit !== "" &&
    VALID_CIRCUIT_SLUGS.has(rawCircuit)
      ? rawCircuit
      : null;

  // ─── Insert ─────────────────────────────────────────────────────────
  try {
    const result = await addEntryToWaitlist({
      name,
      email: rawEmail,
      preferredCircuit,
    });

    if (result.status === "duplicate") {
      return {
        status: "duplicate",
        message: "Tu es déjà inscrit·e. On te notifie dès l'ouverture !",
      };
    }

    return {
      status: "success",
      newCount: result.newCount,
      name,
      message: `Merci ${name}, tu seras notifié·e en avant-première !`,
    };
  } catch (err) {
    console.error("[waitlist] insert failed:", err);
    return {
      status: "error",
      message: "Oups, problème technique. Réessaie dans un instant.",
    };
  }
}
