import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/CountdownTimer";
import heroImage from "@/assets/hero-entrepreneurs.jpg";
import { ArrowRight, Star, Users, Calendar } from "lucide-react";

const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary-dark/90"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col justify-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent-light px-6 py-2 rounded-full mb-8 animate-bounce-soft">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-semibold">Formation Exclusive CEFP-DA</span>
            <Star className="h-4 w-4 fill-current" />
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
            Devenez entrepreneur{" "}
            <span className="text-gradient bg-gradient-accent">autonome et rentable</span>{" "}
            avec peu de moyens !
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Créez votre activité génératrice de revenus rentable en seulement{" "}
            <strong className="text-accent-light">2 jours</strong> grâce à une méthode simple et efficace.
          </p>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center justify-center gap-3 text-white/90">
              <Calendar className="h-6 w-6 text-accent" />
              <span className="font-semibold">15 Octobre 2025</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white/90">
              <Users className="h-6 w-6 text-accent" />
              <span className="font-semibold">Places limitées</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white/90">
              <Star className="h-6 w-6 text-accent" />
              <span className="font-semibold">Projet clé en main</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            variant="cta" 
            size="xl" 
            onClick={scrollToContact}
            className="animate-pulse-soft"
          >
            Je m'inscris maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* Countdown Timer */}
          <div className="mt-16">
            <CountdownTimer targetDate="2025-10-15T09:00:00" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;