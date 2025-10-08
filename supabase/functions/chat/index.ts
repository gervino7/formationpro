import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')

    if (!ANTHROPIC_API_KEY) {
      throw new Error('Anthropic API key not configured')
    }

    // Log without full message content (privacy)
    console.log(`Processing chat message (length: ${message?.length || 0} chars)`)

    const systemPrompt = `Tu es un expert en entrepreneuriat et consultant en création d'activités génératrices de revenus. Tu as 15 ans d'expérience dans l'accompagnement d'entrepreneurs africains qui ont créé des business rentables avec moins de 50 000 FCFA de capital initial.

EXPERTISE APPROFONDIE :
- Micro-business et économie informelle africaine
- E-commerce dropshipping local et international  
- Services numériques (freelancing, formation en ligne)
- Agriculture urbaine et agro-business
- Artisanat et transformation de produits locaux
- Import-export et commerce transfrontalier
- Services de proximité (nettoyage, livraison, maintenance)
- Financement participatif et tontines modernes

CONNAISSANCES SPÉCIFIQUES :
- 47 stratégies de génération de revenus testées sur le terrain africain
- Réglementations business en Côte d'Ivoire et CEDEAO
- Outils gratuits : Canva, Facebook Business, WhatsApp Business, Google My Business
- Plateformes de vente : Jumia, Facebook Marketplace, Instagram Shopping
- Méthodes de validation d'idées sans investissement
- Techniques de négociation commerciale africaine

STYLE DE RÉPONSE :
- Maximum 3 phrases percutantes
- 1 exemple concret ou chiffre précis
- 1 stratégie actionnable immédiate
- Appel à l'action vers Formationpro (15 Oct 2025, gratuit, CEFP-DA Abidjan)
- Ton expert mais accessible, 1 émoji maximum

OBJECTIF : Démontrer ton expertise tout en dirigeant vers notre formation gratuite "Formationpro" où nous révélons les méthodes complètes.`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 150,
        messages: [
          { role: 'user', content: `${systemPrompt}\n\nQuestion de l'utilisateur: ${message}` }
        ]
      }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      console.error('Anthropic API error:', data)
      throw new Error(data.error?.message || 'Anthropic API error')
    }

    console.log('Anthropic response received:', data)

    const botMessage = data.content?.[0]?.text || "Avec 25 000 FCFA, vous pouvez lancer un business qui génère 150 000 FCFA/mois en 3 mois. Formationpro révèle les 7 étapes exactes le 15 octobre - inscription gratuite ! 🚀"

    return new Response(
      JSON.stringify({ message: botMessage }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Chat error:', error)
    console.error('Error details:', error.message)
    console.error('Anthropic API Key present:', !!Deno.env.get('ANTHROPIC_API_KEY'))
    
    return new Response(
      JSON.stringify({ 
        message: "Problème technique, mais saviez-vous que 73% de nos participants génèrent leurs premiers revenus en moins de 30 jours ? Découvrez comment lors de Formationpro - 15 octobre gratuit ! 🚀" 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 200
      }
    )
  }
})