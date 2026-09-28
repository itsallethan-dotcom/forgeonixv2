import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Capabilities } from "@/components/site/Capabilities";
import { WhoWeHelp } from "@/components/site/WhoWeHelp";
import { ShippedWork } from "@/components/site/ShippedWork";
import { Concepts } from "@/components/site/Concepts";
import { Pricing } from "@/components/site/Pricing";
import { Support } from "@/components/site/Support";
import { Process } from "@/components/site/Process";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#solutions"
        className="fx-btn fx-btn--primary sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Capabilities />
        <WhoWeHelp />
        <ShippedWork />
        <Concepts />
        <Pricing />
        <Support />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
