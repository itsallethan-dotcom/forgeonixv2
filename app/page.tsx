import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Solutions } from "@/components/site/Solutions";
import { Delivered } from "@/components/site/Delivered";
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
        <Solutions />
        <Delivered />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
