import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

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
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Clock className="h-6 w-6 text-accent" />
        <h3 className="text-2xl font-bold text-white">Plus que</h3>
      </div>
      
      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
            <div className="text-3xl font-bold text-accent mb-1">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-white/80 capitalize">
              {unit === 'days' ? 'Jours' : 
               unit === 'hours' ? 'Heures' : 
               unit === 'minutes' ? 'Minutes' : 'Secondes'}
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-accent-light font-semibold mt-4 text-lg">
        Avant le début de la formation !
      </p>
    </div>
  );
};

export default CountdownTimer;