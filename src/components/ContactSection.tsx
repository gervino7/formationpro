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
  Download,
  Star,
  Zap,
  Shield,
  CheckCircle,
  Sparkles,
  Calendar,
  QrCode,
  Gift
} from "lucide-react";
import { useState, useEffect } from "react";
import QRCode from 'qrcode';

// Déclaration de type pour le widget Eventbrite
declare global {
  interface Window {
    EBWidgets?: {
      createWidget: (config: {
        widgetType: string;
        eventId: string;
        modal: boolean;
        modalTriggerElementId: string;
        onOrderComplete: () => void;
      }) => void;
    };
  }
}

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  // Générer le QR code et charger le script Eventbrite
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrData = `Formationpro - CEFP-DA
Événement: Créer son activité génératrice de revenus avec peu de moyens
Date: 15 Octobre 2025
Lieu: Centre CEFP-DA, Abidjan
Contact: +225 01 02 03 04 05`;
        
        const qrCodeDataURL = await QRCode.toDataURL(qrData, {
          width: 200,
          margin: 2,
          color: {
            dark: '#1e3a8a', // primary color
            light: '#ffffff'
          }
        });
        setQrCodeUrl(qrCodeDataURL);
      } catch (error) {
        console.error('Erreur génération QR Code:', error);
      }
    };
    
    // Charger le script Eventbrite
    const loadEventbriteScript = () => {
      // Vérifier si le script n'est pas déjà chargé
      if (document.querySelector('script[src*="eb_widgets.js"]')) {
        initEventbriteWidget();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
      script.onload = initEventbriteWidget;
      document.head.appendChild(script);
    };

    const initEventbriteWidget = () => {
      if (window.EBWidgets) {
        const exampleCallback = function() {
          console.log('Inscription Formationpro terminée!');
          toast({
            title: "🎉 Inscription confirmée !",
            description: "Votre place pour Formationpro est réservée. Vous allez recevoir votre billet par email.",
          });
        };

        window.EBWidgets.createWidget({
          widgetType: 'checkout',
          eventId: '1704574711849',
          modal: true,
          modalTriggerElementId: 'eventbrite-widget-modal-trigger-1704574711849',
          onOrderComplete: exampleCallback
        });
      }
    };
    
    generateQRCode();
    loadEventbriteScript();

    // Nettoyage au démontage du composant
    return () => {
      const existingScript = document.querySelector('script[src*="eb_widgets.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [toast]);

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
      a.download = `ticket-formationpro-${formData.name.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "🎉 Inscription réussie !",
        description: "Votre ticket Formationpro a été généré et téléchargé. Conservez-le précieusement !",
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
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary-dark/90 to-primary/95"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-light/30 rounded-full blur-3xl animate-pulse-soft"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Header Section with Enhanced Typography */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-6 py-2 mb-6">
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
            <span className="text-accent font-semibold">Formationpro - Événement Exclusif</span>
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="text-gradient bg-gradient-to-r from-white via-accent-light to-white bg-clip-text text-transparent">
              Réservez Votre Place
            </span>
            <br />
            <span className="text-accent animate-glow-pulse">Maintenant</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-8 leading-relaxed">
            🚀 Ne laissez pas passer cette opportunité unique de transformer votre avenir professionnel. 
            <br />
            <span className="text-accent font-semibold">Les places sont limitées et la demande est forte !</span>
          </p>
          
          {/* Urgency Indicators */}
          <div className="flex justify-center items-center gap-8 mt-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Users className="h-5 w-5 text-accent" />
              <span className="text-white font-semibold">25 places max</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Calendar className="h-5 w-5 text-accent" />
              <span className="text-white font-semibold">15 Oct 2025</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Gift className="h-5 w-5 text-accent" />
              <span className="text-white font-semibold">Ticket gratuit</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Premium Registration Form */}
          <div className="lg:col-span-1">
            <Card className="shadow-elegant bg-white/95 backdrop-blur-sm border border-white/20 overflow-hidden">
              {/* Card Header with Gradient */}
              <CardHeader className="bg-gradient-to-r from-primary via-primary-light to-accent text-white text-center pb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-accent/5 to-primary/10 opacity-30"></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                      <Star className="h-8 w-8 text-accent animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">
                    Inscription Premium
                  </h3>
                  <p className="text-white/90 text-lg">
                    Formationpro - Créez votre succès entrepreneurial
                  </p>
                  <div className="mt-4 flex justify-center">
                    <div className="bg-accent/20 backdrop-blur-sm rounded-full px-4 py-1 border border-accent/30">
                      <span className="text-accent font-semibold text-sm">✨ Accès VIP Garanti</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-8 relative">
                {/* Success Badges */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="bg-success/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="h-6 w-6 text-success" />
                    </div>
                    <p className="text-xs text-muted-foreground font-semibold">Validation Instantanée</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-accent/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <Download className="h-6 w-6 text-accent" />
                    </div>
                    <p className="text-xs text-muted-foreground font-semibold">Ticket Immédiat</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground font-semibold">Place Sécurisée</p>
                  </div>
                </div>

                {/* Eventbrite Checkout Widget */}
                <div className="eventbrite-checkout-container text-center space-y-6">
                  {/* Noscript fallback pour le SEO */}
                  <noscript>
                    <a 
                      href="https://www.eventbrite.fr/e/formationpro-tickets-1704574711849" 
                      rel="noopener noreferrer" 
                      target="_blank"
                      className="inline-block bg-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-accent-dark transition-colors"
                    >
                      Acheter des Billets sur Eventbrite
                    </a>
                  </noscript>
                  
                  {/* Description de l'événement avec QR Code intégré */}
                  <div className="bg-gradient-to-br from-accent/5 via-primary/5 to-success/5 border-2 border-accent/20 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="bg-accent/20 rounded-full p-3">
                        <Calendar className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary">Formationpro - Inscription Officielle</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      {/* Informations de l'événement */}
                      <div>
                        <p className="text-muted-foreground mb-4">
                          Réservez votre place pour l'événement "Créer son activité génératrice de revenus avec peu de moyens"
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-accent" />
                            <span className="text-sm text-muted-foreground">15 Octobre 2025</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-accent" />
                            <span className="text-sm text-muted-foreground">Centre CEFP-DA, Abidjan</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Gift className="h-4 w-4 text-accent" />
                            <span className="text-sm text-muted-foreground">Gratuit</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* QR Code intégré */}
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <QrCode className="h-5 w-5 text-accent" />
                          <span className="text-sm font-semibold text-primary">Infos complètes</span>
                        </div>
                        {qrCodeUrl && (
                          <div className="bg-white p-3 rounded-xl border-2 border-accent/20 inline-block shadow-sm hover:shadow-md transition-shadow">
                            <img 
                              src={qrCodeUrl} 
                              alt="QR Code Formationpro" 
                              className="w-24 h-24 mx-auto"
                            />
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          Scannez pour plus d'infos
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bouton Eventbrite stylisé */}
                  <button 
                    id="eventbrite-widget-modal-trigger-1704574711849" 
                    type="button"
                    className="w-full h-16 text-lg font-bold bg-gradient-to-r from-accent via-accent-dark to-accent hover:from-accent-dark hover:to-accent transition-all duration-500 rounded-xl shadow-glow border-0 relative overflow-hidden group text-white"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="relative z-10 flex items-center justify-center">
                      <Zap className="mr-3 h-6 w-6 animate-pulse" />
                      Réserver Ma Place - Formationpro
                      <Sparkles className="ml-3 h-6 w-6 animate-pulse" />
                    </div>
                  </button>
                  
                  {/* Informations de sécurité */}
                  <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground mt-4">
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4 text-success" />
                      <span>Sécurisé par Eventbrite</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Confirmation instantanée</span>
                    </div>
                  </div>
                </div>
                
                {/* Premium Features Box */}
                <div className="mt-8 p-6 bg-gradient-to-br from-accent/5 via-primary/5 to-success/5 border-2 border-accent/20 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-accent text-white px-3 py-1 rounded-bl-lg text-xs font-bold">
                    ⚡ INSTANTANÉ
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/20 rounded-full p-3 animate-bounce-soft">
                      <Download className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-primary mb-2">🎯 Ticket Premium Formationpro</h4>
                      <p className="text-muted-foreground mb-3">
                        Votre billet de formation sera généré automatiquement avec QR code de sécurité et téléchargé immédiatement après validation.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-success/10 text-success px-3 py-1 rounded-full text-xs font-semibold">✓ Validation Instantanée</span>
                        <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold">✓ QR Code Intégré</span>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">✓ Place Garantie</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Premium Card */}
            <Card className="shadow-elegant bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">
                    Support VIP
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Assistance dédiée pour les participants
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-accent" />
                      <div>
                        <h4 className="font-semibold text-primary text-sm">Hotline</h4>
                        <p className="text-muted-foreground text-sm">+225 01 02 03 04 05</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 text-accent" />
                      <div>
                        <h4 className="font-semibold text-primary text-sm">WhatsApp VIP</h4>
                        <p className="text-muted-foreground text-sm">+225 07 08 09 10 11</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-accent" />
                      <div>
                        <h4 className="font-semibold text-primary text-sm">Email</h4>
                        <p className="text-muted-foreground text-sm">contact@cefp-da.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full mt-6 border-2 border-accent/30 hover:bg-accent hover:text-white transition-all duration-300"
                  onClick={() => window.open('https://wa.me/2250708091011', '_blank')}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Contact WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Event Details Premium */}
            <Card className="shadow-elegant bg-gradient-to-br from-success/5 to-primary/5 border border-success/20">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="bg-success rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">
                    Détails Formationpro
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-accent" />
                        <span className="font-semibold text-sm">Date</span>
                      </div>
                      <span className="text-primary font-bold">15 Oct 2025</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-accent" />
                        <span className="font-semibold text-sm">Durée</span>
                      </div>
                      <span className="text-primary font-bold">2 jours (16h)</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-accent" />
                        <span className="font-semibold text-sm">Places</span>
                      </div>
                      <span className="text-accent font-bold">Max 25</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-accent" />
                      <div>
                        <span className="font-semibold text-sm block">Centre CEFP-DA</span>
                        <span className="text-muted-foreground text-xs">Abidjan, Côte d'Ivoire</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Urgency Banner */}
                <div className="mt-6 p-4 bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 rounded-xl text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-accent animate-pulse" />
                    <span className="font-bold text-primary">Action Limitée</span>
                    <Zap className="h-5 w-5 text-accent animate-pulse" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Inscription gratuite - Places limitées
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Epic Final CTA */}
        <div className="text-center mt-20 animate-slide-up">
          <div className="relative max-w-4xl mx-auto">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 blur-3xl rounded-full"></div>
            
            <div className="relative bg-white/15 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-12 shadow-glow overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-accent/5 to-primary/5 animate-float"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="bg-accent/20 backdrop-blur-sm rounded-full p-6 border border-accent/30 animate-glow-pulse">
                    <Sparkles className="h-12 w-12 text-accent animate-spin-slow" />
                  </div>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  <span className="text-gradient bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent">
                    Prêt à Révolutionner
                  </span>
                  <br />
                  <span className="text-accent">Votre Avenir ?</span>
                </h3>
                
                <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
                  🚀 Rejoignez les <span className="text-accent font-bold">centaines d'entrepreneurs</span> qui ont transformé leur avenir avec 
                  <span className="text-white font-bold"> Formationpro CEFP-DA</span>. 
                  <br />
                  <span className="text-accent font-bold text-2xl">Votre succès commence MAINTENANT !</span>
                </p>
                
                {/* Stats Row */}
                <div className="flex justify-center items-center gap-8 mb-10">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-1">500+</div>
                    <div className="text-sm text-white/80">Entrepreneurs formés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">95%</div>
                    <div className="text-sm text-white/80">Taux de réussite</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-1">2 jours</div>
                    <div className="text-sm text-white/80">Pour changer sa vie</div>
                  </div>
                </div>
                
                <Button 
                  size="xl" 
                  className="h-20 px-12 text-xl font-bold bg-gradient-to-r from-accent via-accent-dark to-accent hover:from-accent-dark hover:to-accent transition-all duration-500 rounded-2xl shadow-glow border-0 relative overflow-hidden group animate-glow-pulse"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="relative z-10 flex items-center">
                    <Zap className="mr-4 h-8 w-8 animate-pulse" />
                    JE RÉSERVE MA PLACE FORMATIONPRO MAINTENANT
                    <ArrowRight className="ml-4 h-8 w-8 animate-bounce-soft" />
                  </div>
                </Button>
                
                <p className="mt-6 text-white/70 text-sm">
                  ⚡ Inscription 100% gratuite • 🎯 Places limitées à 25 • 🚀 Validation instantanée
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;