import { getWaitlistCount } from "@/lib/waitlist";
import WaitlistForm from "./WaitlistForm";

export default async function Waitlist() {
  // Fetch SSR du compteur initial — pas de "flash de 0" au chargement.
  // En cas d'erreur DB, on affiche 0 plutôt que de casser la page.
  let initialCount = 0;
  try {
    initialCount = await getWaitlistCount();
  } catch (err) {
    console.error("[Waitlist] initial count failed:", err);
  }

  return (
    <section id="waitlist" className="relative overflow-hidden px-10 py-28">
      <div className="bg-radial-red-bottom pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-140 text-center">
        <WaitlistForm initialCount={initialCount} />
      </div>
    </section>
  );
}
