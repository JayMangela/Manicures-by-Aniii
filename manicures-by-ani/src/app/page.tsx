import { Hero } from "@/components/Hero";
import { About } from "@/components/About";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Phase 1: Hero Section */}
      <Hero />

      {/* Phase 2: About Ani */}
      <About />

      {/* Phase 3: Services & Pricing */}
      <section id="services" className="py-32 border-b border-accent/10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Services & Pricing</h2>
          <p className="text-muted-foreground">Pricing table placeholder</p>
        </div>
      </section>

      {/* Phase 4: Gallery / Showcase */}
      <section id="gallery" className="py-32 border-b border-accent/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Gallery</h2>
          <p className="text-muted-foreground">Gallery placeholder</p>
        </div>
      </section>

      {/* Phase 5: Testimonials */}
      <section id="testimonials" className="py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Client Love</h2>
          <p className="text-muted-foreground">Testimonials placeholder</p>
        </div>
      </section>
    </div>
  );
}
