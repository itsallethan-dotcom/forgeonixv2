import { HomeHero } from "@/components/home/HomeHero";
import { WorkCarousel } from "@/components/home/WorkCarousel";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { FeaturedCase } from "@/components/home/FeaturedCase";
import { PricingPreview } from "@/components/home/PricingPreview";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <HomeHero />
      <WorkCarousel />
      <ServicesPreview />
      <FeaturedCase />
      <PricingPreview />
      <FinalCta />
    </>
  );
}
