import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, ArrowRight } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

const TestimonialsSection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const testimonials = [
    {
      name: "Aminata Diallo",
      role: "Consultante indépendante",
      image: testimonial1,
      content: "Grâce à cette formation, j'ai pu transformer ma passion pour la communication en une activité rentable. En 6 mois, j'ai généré plus de 500 000 FCFA !",
      rating: 5
    },
    {
      name: "Ibrahim Traoré",
      role: "Entrepreneur digital",
      image: testimonial2,
      content: "La méthode CEFP-DA m'a donné tous les outils pratiques pour lancer mon business en ligne. Aujourd'hui, je forme mes propres clients et je vis de ma passion.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Ils ont réussi avec notre méthode
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez comment nos anciens participants ont transformé leur vie professionnelle 
            grâce à la formation CEFP-DA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover shadow-card"
                  />
                  <div>
                    <h4 className="font-bold text-primary text-lg">{testimonial.name}</h4>
                    <p className="text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-accent/20" />
                  <p className="text-muted-foreground italic leading-relaxed pl-6">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center gap-1 mt-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stats */}
        <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-8">
            Nos résultats parlent d'eux-mêmes
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">95%</div>
              <div className="text-white">Taux de satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">80%</div>
              <div className="text-white">Lancent leur activité</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-white">Entrepreneurs formés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">3 mois</div>
              <div className="text-white">Temps moyen avant profits</div>
            </div>
          </div>

          <Button variant="secondary" size="lg" onClick={scrollToContact}>
            Rejoindre les entrepreneurs qui réussissent
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;