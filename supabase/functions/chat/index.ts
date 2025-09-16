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

    console.log('Processing chat message:', message)

    const systemPrompt = `Tu es un assistant entrepreneuriat concis et efficace. Réponds en 2-3 phrases max. Ton objectif : convaincre de s'inscrire à notre formation "Créer son activité génératrice de revenus avec peu de moyens". 

Sois direct, motivant et termine TOUJOURS par un appel à l'action clair pour s'inscrire. Utilise 1-2 émojis max. Pas de longues listes ou explications.

Exemple de réponse : "Excellente question ! Cette stratégie peut générer 2000€/mois dès le 3ème mois. 🚀 Inscrivez-vous maintenant pour découvrir les 5 étapes exactes !"`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 100,
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

    const botMessage = data.content?.[0]?.text || "Questions sur l'entrepreneuriat ? Notre formation vous donne les clés du succès ! 🚀 Inscrivez-vous maintenant !"

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
        message: "Une erreur s'est produite. Mais savez-vous que l'entrepreneuriat est accessible à tous ? Notre formation vous montre comment créer votre activité génératrice de revenus avec peu de moyens ! 🚀💼" 
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