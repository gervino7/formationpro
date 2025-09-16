import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/CountdownTimer";
import heroImage from "@/assets/hero-entrepreneurs.jpg";
import { ArrowRight, Star, Users, Calendar, Sparkles, Zap } from "lucide-react";

const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-20 left-10 h-6 w-6 text-accent-light/50 animate-float" />
        <Star className="absolute top-40 right-20 h-4 w-4 text-accent/70 animate-pulse" />
        <Zap className="absolute top-60 left-1/4 h-5 w-5 text-accent animate-bounce-soft" />
        <Sparkles className="absolute bottom-40 right-10 h-7 w-7 text-accent-light/60 animate-float" />
        <Star className="absolute bottom-60 left-20 h-3 w-3 text-accent animate-pulse" />
      </div>

      {/* Background Image with Enhanced Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary-dark/90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col justify-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo CEFP-DA */}
          <div className="mb-8 animate-zoom-in">
            <img 
              src="/cefp-da-logo.png" 
              alt="CEFP-DA Logo" 
              className="w-24 h-24 mx-auto mb-4 animate-glow-pulse"
            />
          </div>

          {/* Enhanced Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/15 backdrop-blur-sm border-2 border-accent/30 text-accent-light px-8 py-3 rounded-full mb-8 animate-glow-pulse shadow-lg">
            <Star className="h-5 w-5 fill-current animate-spin-slow" />
            <span className="font-bold text-lg">Formation Exclusive CEFP-DA</span>
            <Star className="h-5 w-5 fill-current animate-spin-slow" />
          </div>

          {/* Enhanced Main Title */}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 animate-slide-up leading-tight">
            Devenez entrepreneur{" "}
            <span className="text-gradient bg-gradient-accent relative inline-block">
              autonome et rentable
              <div className="absolute inset-0 bg-gradient-accent opacity-20 blur-xl animate-pulse"></div>
            </span>{" "}
            avec peu de moyens !
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Créez votre activité génératrice de revenus rentable en seulement{" "}
            <strong className="text-accent-light bg-accent/20 px-2 py-1 rounded animate-glow-pulse">2 jours</strong>{" "}
            grâce à une méthode simple et efficace.
          </p>

          {/* Enhanced Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center justify-center gap-3 text-white/90 bg-white/10 backdrop-blur-sm rounded-xl p-4 animate-zoom-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.3s' }}>
              <Calendar className="h-6 w-6 text-accent animate-pulse" />
              <span className="font-bold">15 Octobre 2025</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white/90 bg-white/10 backdrop-blur-sm rounded-xl p-4 animate-zoom-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.4s' }}>
              <Users className="h-6 w-6 text-accent animate-bounce-soft" />
              <span className="font-bold">Places limitées</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white/90 bg-white/10 backdrop-blur-sm rounded-xl p-4 animate-zoom-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.5s' }}>
              <Star className="h-6 w-6 text-accent animate-spin-slow" />
              <span className="font-bold">Projet clé en main</span>
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <div className="relative mb-16">
            <div className="absolute inset-0 bg-gradient-accent opacity-30 rounded-full blur-2xl animate-pulse"></div>
            <Button 
              variant="cta" 
              size="xl" 
              onClick={scrollToContact}
              className="relative animate-glow-pulse hover:scale-110 transition-transform duration-300 shadow-2xl"
            >
              <Zap className="mr-2 h-5 w-5 animate-bounce-soft" />
              Je m'inscris maintenant
              <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
            </Button>
          </div>

          {/* Enhanced Countdown Timer */}
          <div className="animate-zoom-in" style={{ animationDelay: '0.6s' }}>
            <CountdownTimer targetDate="2025-10-15T09:00:00" />
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-accent/70 rounded-full flex justify-center bg-white/10 backdrop-blur-sm animate-glow-pulse">
          <div className="w-1 h-3 bg-gradient-accent rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;