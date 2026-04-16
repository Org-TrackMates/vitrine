import { sql } from "./db";

/**
 * Nombre total d'inscrit·es sur la waitlist.
 * COUNT(*) est une requête lente sur grosse table — ici c'est un lancement,
 * on est encore largement dans le régime où c'est négligeable.
 * Si la table dépasse ~500k lignes, basculer sur une table de compteur
 * mise à jour par trigger.
 */
export async function getWaitlistCount(): Promise<number> {
  const rows = (await sql`
    SELECT COUNT(*)::int AS count FROM waitlist
  `) as Array<{ count: number }>;
  return rows[0]?.count ?? 0;
}

export interface AddEntryInput {
  name: string;
  email: string;
  /** slug de circuit (ex. "barcelona") ou null si aucune préférence */
  preferredCircuit: string | null;
}

/**
 * Résultat de l'insertion.
 * - "ok"        → nouvel inscrit, newCount est le total après insertion
 * - "duplicate" → email déjà présent (contrainte UNIQUE)
 */
export type AddEntryResult =
  | { status: "ok"; newCount: number }
  | { status: "duplicate" };

/**
 * Insère une nouvelle entrée waitlist. Normalise email en lowercase + trim.
 * Gère la collision UNIQUE via ON CONFLICT pour éviter une exception.
 */
export async function addEntryToWaitlist(
  input: AddEntryInput,
): Promise<AddEntryResult> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const preferredCircuit = input.preferredCircuit; // déjà validé côté action

  const inserted = (await sql`
    INSERT INTO waitlist (name, email, preferred_circuit)
    VALUES (${name}, ${email}, ${preferredCircuit})
    ON CONFLICT (email) DO NOTHING
    RETURNING id
  `) as Array<{ id: number }>;

  if (inserted.length === 0) {
    return { status: "duplicate" };
  }

  const newCount = await getWaitlistCount();
  return { status: "ok", newCount };
}
