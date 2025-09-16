import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ArrowRight,
  Send,
  Users,
  Loader2,
  Download
} from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Générer et télécharger le ticket directement
      const response = await fetch(`https://xtsfrlgyvmjtkxrjopay.supabase.co/functions/v1/generate-ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0c2ZybGd5dm1qdGt4cmpvcGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5NzU0OTUsImV4cCI6MjA3MzU1MTQ5NX0.PHGGXGIOKkXGalS2JXgrFCh6sYbeOBC-RD3qWLixQKw`,
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la génération du ticket');
      }

      // Télécharger le fichier PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ticket-formation-${formData.name.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "🎉 Inscription réussie !",
        description: "Votre ticket a été généré et téléchargé. Conservez-le précieusement !",
      });
      
      setFormData({ name: '', email: '', phone: '', message: '' });

    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Erreur lors de l'inscription",
        description: error.message || "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary-dark/90 to-primary/95"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Réservez Votre Place Maintenant
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Ne laissez pas passer cette opportunité unique de transformer votre avenir professionnel. 
            Les places sont limitées et la demande est forte !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-elegant">
            <CardHeader className="text-center pb-6">
              <h3 className="text-2xl font-bold text-primary">
                Formulaire d'inscription
              </h3>
              <p className="text-muted-foreground">
                Remplissez ce formulaire et nous vous recontacterons rapidement
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Votre nom complet *"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Votre adresse email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Votre numéro de téléphone *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Parlez-nous de votre projet ou posez vos questions..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
                <Button type="submit" variant="cta" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-5 w-5" />
                  )}
                  {isSubmitting ? "Inscription en cours..." : "S'inscrire et recevoir mon billet"}
                </Button>
              </form>
              
              <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <Download className="h-5 w-5" />
                  <span className="font-semibold">Ticket instantané !</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Votre ticket de formation sera généré et téléchargé automatiquement 
                  dès votre inscription validée. Conservez-le précieusement !
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="shadow-elegant">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">
                  Contactez-nous directement
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/10 rounded-full p-3">
                      <Phone className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Téléphone</h4>
                      <p className="text-muted-foreground">+225 01 02 03 04 05</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/10 rounded-full p-3">
                      <MessageCircle className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">WhatsApp</h4>
                      <p className="text-muted-foreground">+225 07 08 09 10 11</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/10 rounded-full p-3">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Email</h4>
                      <p className="text-muted-foreground">contact@cefp-da.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/10 rounded-full p-3">
                      <MapPin className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Adresse</h4>
                      <p className="text-muted-foreground">
                        Centre CEFP-DA<br />
                        Abidjan, Côte d'Ivoire
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">
                  Informations pratiques
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-accent" />
                    <div>
                      <h4 className="font-semibold">Date de formation</h4>
                      <p className="text-muted-foreground">15 Octobre 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-accent" />
                    <div>
                      <h4 className="font-semibold">Durée</h4>
                      <p className="text-muted-foreground">2 jours intensifs (16h)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-accent" />
                    <div>
                      <h4 className="font-semibold">Groupe</h4>
                      <p className="text-muted-foreground">Maximum 25 participants</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                    onClick={() => window.open('https://wa.me/2250708091011', '_blank')}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contacter via WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Prêt à changer votre vie ?
            </h3>
            <p className="text-gray-200 mb-6">
              Rejoignez les centaines d'entrepreneurs qui ont transformé leur avenir 
              avec CEFP-DA. Votre succès commence maintenant !
            </p>
            <Button variant="cta" size="xl" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Je réserve ma place immédiatement
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;