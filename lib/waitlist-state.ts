/**
 * Type et état initial de la Server Action de la waitlist.
 *
 * Ce fichier est volontairement séparé de `app/actions/waitlist.ts` :
 * un fichier marqué "use server" ne peut exporter que des fonctions
 * async (chaque export devient une référence RPC côté client).
 * Les constantes et types doivent donc vivre ailleurs.
 */

export type WaitlistField = "name" | "email";

export type WaitlistState =
  | { status: "idle" }
  | { status: "success"; newCount: number; name: string; message: string }
  | { status: "duplicate"; message: string }
  | { status: "invalid"; field: WaitlistField; message: string }
  | { status: "error"; message: string };

export const initialWaitlistState: WaitlistState = { status: "idle" };
