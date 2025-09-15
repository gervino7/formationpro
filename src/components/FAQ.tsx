import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle } from "lucide-react";

const FAQ = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqs = [
    {
      question: "J'ai très peu de moyens financiers, cette formation est-elle vraiment pour moi ?",
      answer: "Absolument ! C'est justement l'objectif de cette formation : vous apprendre à créer une activité rentable avec les ressources que vous avez déjà. Nos méthodes sont spécialement conçues pour les entrepreneurs qui démarrent avec un budget limité. De nombreux participants ont commencé avec moins de 10 000 FCFA et ont créé des activités prospères."
    },
    {
      question: "Combien de temps faut-il pour voir les premiers résultats ?",
      answer: "La plupart de nos participants voient leurs premiers revenus dans les 2 à 8 semaines suivant la formation. Cependant, cela dépend de votre engagement et du temps que vous consacrez à l'application des méthodes enseignées. Nous vous accompagnons pendant 3 mois pour maximiser vos chances de succès."
    },
    {
      question: "Quel niveau d'éducation ou d'expérience faut-il avoir ?",
      answer: "Aucun prérequis particulier ! Notre méthode est accessible à tous, quel que soit votre niveau d'études ou votre expérience professionnelle. Nous avons formé avec succès des personnes de tous horizons : étudiants, salariés, personnes sans emploi, retraités... L'important, c'est votre motivation à réussir."
    },
    {
      question: "Y a-t-il un suivi après la formation ?",
      answer: "Oui ! Nous proposons un accompagnement de 3 mois post-formation inclus dans le prix. Cela comprend : des sessions de questions-réponses mensuelles, l'accès à notre communauté privée d'entrepreneurs, des ressources mises à jour, et un suivi personnalisé de vos progrès."
    },
    {
      question: "La formation se déroule-t-elle en présentiel ou en ligne ?",
      answer: "La formation se déroule en présentiel pour favoriser les échanges et la pratique. Cependant, nous fournissons aussi des ressources numériques et l'accès à notre plateforme en ligne pour que vous puissiez réviser et approfondir les concepts abordés."
    },
    {
      question: "Que se passe-t-il si je ne peux pas assister à la date prévue ?",
      answer: "Nous organisons plusieurs sessions dans l'année. Si vous ne pouvez pas assister le 15 octobre, vous pourrez reporter votre inscription à la session suivante sans frais supplémentaires. Contactez-nous dès que possible pour organiser le report."
    },
    {
      question: "Y a-t-il une garantie de remboursement ?",
      answer: "Oui, nous offrons une garantie de satisfaction de 30 jours. Si vous n'êtes pas entièrement satisfait de la formation, nous vous remboursons intégralement, sans questions posées."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="h-8 w-8 text-accent" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Questions Fréquentes
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nous répondons aux questions les plus courantes de nos futurs participants. 
            Si vous ne trouvez pas votre réponse, contactez-nous directement !
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 shadow-card hover:shadow-elegant transition-all duration-300"
              >
                <AccordionTrigger className="text-left hover:no-underline hover:text-accent">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-primary mb-6">
            D'autres questions ?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Notre équipe est là pour vous aider ! N'hésitez pas à nous contacter 
            pour toute question supplémentaire sur la formation.
          </p>
          <Button variant="cta" size="lg" onClick={scrollToContact}>
            Contactez-nous maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;