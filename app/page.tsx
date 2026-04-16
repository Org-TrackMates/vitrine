import Concept from "@/components/Concept";
import Countdown from "@/components/Countdown";
import FadeUpObserver from "@/components/FadeUpObserver";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Roadmap from "@/components/Roadmap";
import Saison from "@/components/Saison";
import Waitlist from "@/components/Waitlist";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Countdown />
        <Concept />
        <Saison />
        <Roadmap />
        <Waitlist />
      </main>
      <Footer />
      <FadeUpObserver />
    </>
  );
}
