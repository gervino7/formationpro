import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Gift, Clock } from "lucide-react";

const PricingSection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const included = [
    "Formation complète de 2 jours",
    "Workbook et outils pratiques",
    "Accompagnement personnalisé",
    "Réseau d'entrepreneurs",
    "Suivi post-formation (3 mois)",
    "Certificat de participation",
    "Accès aux ressources en ligne",
    "Session de questions-réponses"
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Un Investissement qui Change Tout
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pour le prix d'un bon repas par mois pendant un an, obtenez les clés pour créer 
            une activité qui peut vous rapporter des milliers de FCFA chaque mois.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="shadow-elegant border-2 border-accent/20 relative overflow-hidden">
            {/* Popular Badge */}
            <div className="absolute top-0 right-0 bg-gradient-accent text-white px-6 py-2 rounded-bl-lg font-bold">
              <Gift className="inline h-4 w-4 mr-1" />
              Places limitées
            </div>

            <CardHeader className="text-center pt-12 pb-6">
              <h3 className="text-2xl font-bold text-primary mb-2">
                Formation Entrepreneuriat
              </h3>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">
                  60 000
                  <span className="text-xl text-muted-foreground ml-1">FCFA</span>
                </div>
                <p className="text-muted-foreground">
                  Paiement unique - Valeur à vie
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <div className="space-y-4 mb-8">
                {included.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant="cta" 
                size="lg" 
                className="w-full mb-6"
                onClick={scrollToContact}
              >
                Réserver ma place maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  <span>Offre limitée dans le temps</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Prix spécial pour les 50 premiers inscrits
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Value Proposition */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-primary mb-6">
            Pourquoi cette formation vaut largement son prix ?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">ROI</span>
              </div>
              <h4 className="font-bold text-primary mb-2">Retour sur investissement</h4>
              <p className="text-sm text-muted-foreground">
                En moyenne, nos participants récupèrent leur investissement en moins de 3 mois
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">24/7</span>
              </div>
              <h4 className="font-bold text-primary mb-2">Ressources à vie</h4>
              <p className="text-sm text-muted-foreground">
                Accès permanent aux outils, templates et communauté d'entrepreneurs
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">100%</span>
              </div>
              <h4 className="font-bold text-primary mb-2">Satisfaction garantie</h4>
              <p className="text-sm text-muted-foreground">
                Si vous n'êtes pas satisfait, nous remboursons intégralement
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;