import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Target, Rocket, ArrowRight, CheckCircle } from "lucide-react";

const ProgramSection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const programPoints = [
    {
      icon: Lightbulb,
      title: "Comprendre et éveiller l'esprit entrepreneurial",
      description: "Développez votre mindset d'entrepreneur et identifiez vos forces cachées pour réussir.",
      points: ["Mindset de réussite", "Identification de vos talents", "Confiance entrepreneuriale"]
    },
    {
      icon: Target,
      title: "Transformer ses ressources en idées de business",
      description: "Apprenez à utiliser ce que vous avez déjà pour créer des opportunités rentables.",
      points: ["Audit de vos ressources", "Génération d'idées", "Validation de concepts"]
    },
    {
      icon: Rocket,
      title: "Construire et repartir avec son projet clé en main",
      description: "Élaborez un plan d'action concret et réalisable pour lancer votre activité.",
      points: ["Plan d'affaires simple", "Stratégie de lancement", "Outils pratiques"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Objectif Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            L'Objectif de cette Formation
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Cette formation vous aide à <strong className="text-primary">transformer vos ressources personnelles</strong> en un 
            projet concret avec un <strong className="text-accent">plan clé en main</strong>. 
            Vous repartirez avec une feuille de route claire pour lancer votre activité génératrice de revenus.
          </p>
        </div>

        {/* Programme Section */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-12">
            Programme de Formation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programPoints.map((point, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <point.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary mb-4 leading-tight">
                    {point.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6">
                    {point.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {point.points.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Méthodologie Section */}
        <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Notre Méthodologie
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Une pédagogie <strong className="text-accent">pratique, accessible et orientée résultats</strong>. 
            Pas de théorie complexe, mais des outils concrets que vous pouvez appliquer immédiatement 
            pour développer votre activité.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <div className="text-white">Pratique</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">2</div>
              <div className="text-white">Jours intensifs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">1</div>
              <div className="text-white">Projet clé en main</div>
            </div>
          </div>

          <Button variant="secondary" size="lg" onClick={scrollToContact}>
            Réserver ma place maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;