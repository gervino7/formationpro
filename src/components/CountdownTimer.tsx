import { useState, useEffect } from "react";
import { Clock, Zap, Star, Sparkles } from "lucide-react";

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="relative">
      {/* Sparkles Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-4 left-8 h-4 w-4 text-accent animate-pulse" />
        <Star className="absolute top-12 right-12 h-3 w-3 text-accent-light animate-float" />
        <Zap className="absolute bottom-8 left-16 h-5 w-5 text-accent animate-bounce-soft" />
        <Sparkles className="absolute bottom-4 right-8 h-4 w-4 text-accent-light animate-pulse" />
      </div>

      <div className="text-center relative z-10">
        {/* Enhanced Header */}
        <div className="flex items-center justify-center gap-3 mb-8 animate-zoom-in">
          <div className="p-2 bg-accent/20 rounded-full animate-glow-pulse">
            <Clock className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-3xl font-bold text-white animate-shine bg-gradient-to-r from-white via-accent-light to-white bg-[length:200%_100%]">
            Plus que
          </h3>
        </div>
        
        {/* Enhanced Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <div 
              key={unit} 
              className="relative group animate-zoom-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-accent opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity duration-300"></div>
              
              {/* Main Card */}
              <div className="relative bg-white/15 backdrop-blur-lg border-2 border-white/30 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-glow-pulse">
                {/* Number */}
                <div className="text-5xl md:text-6xl font-black text-accent mb-2 animate-countdown-pop bg-gradient-accent bg-clip-text text-transparent">
                  {value.toString().padStart(2, '0')}
                </div>
                
                {/* Label */}
                <div className="text-sm font-bold text-white/90 uppercase tracking-wider">
                  {unit === 'days' ? 'Jours' : 
                   unit === 'hours' ? 'Heures' : 
                   unit === 'minutes' ? 'Minutes' : 'Secondes'}
                </div>
                
                {/* Decorative Element */}
                <div className="absolute -top-2 -right-2 p-1 bg-accent rounded-full opacity-80">
                  <Star className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enhanced Call to Action */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-accent opacity-30 rounded-full blur-2xl animate-pulse"></div>
          <p className="relative text-2xl font-bold text-white mb-2 animate-bounce-soft">
            🔥 Avant le début de la formation ! 🔥
          </p>
          <p className="text-accent-light font-semibold text-lg animate-pulse">
            ⚡ Places limitées - Inscrivez-vous MAINTENANT ! ⚡
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;