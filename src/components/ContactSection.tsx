import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ArrowRight,
  Send,
  Users
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Inscription reçue !",
      description: "Nous vous contacterons dans les plus brefs délais pour confirmer votre place.",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
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
                <Button type="submit" variant="cta" size="lg" className="w-full">
                  <Send className="mr-2 h-5 w-5" />
                  Envoyer ma demande d'inscription
                </Button>
              </form>
              
              <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center gap-2 text-success mb-2">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold">Places limitées !</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Il ne reste que quelques places disponibles pour cette session. 
                  Inscrivez-vous maintenant pour garantir votre participation.
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