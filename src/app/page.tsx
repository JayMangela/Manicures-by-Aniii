import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Pricing } from "@/components/Pricing";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Phase 1: Hero Section */}
      <Hero />

      {/* Phase 2: About Ani */}
      <About />

      {/* Phase 3: Services & Pricing */}
      <Pricing />

      {/* Phase 4: Gallery / Showcase */}
      <Gallery />

      {/* Phase 5: Testimonials */}
      <Testimonials />

      {/* Phase 9: FAQ */}
      <FAQ />
    </div>
  );
}
