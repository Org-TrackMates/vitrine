import { NextResponse } from "next/server";
import { getWaitlistCount } from "@/lib/waitlist";

/**
 * GET /api/waitlist/count
 * Retourne le nombre courant d'inscrits sur la waitlist.
 * Appelée par le client toutes les 10 secondes (polling).
 */
export async function GET() {
  try {
    const count = await getWaitlistCount();
    return NextResponse.json(
      { count },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (err) {
    console.error("[api/waitlist/count] failed:", err);
    return NextResponse.json({ error: "count_unavailable" }, { status: 503 });
  }
}
