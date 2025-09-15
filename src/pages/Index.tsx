import HeroSection from "@/components/HeroSection";
import ProgramSection from "@/components/ProgramSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProgramSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQ />
      <ContactSection />
    </main>
  );
};

export default Index;