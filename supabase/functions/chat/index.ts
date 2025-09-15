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
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured')
    }

    const systemPrompt = `Tu es un assistant passionné de football qui aide les visiteurs d'une landing page pour une formation entrepreneuriale. Ton rôle est de:

1. Discuter avec passion du football (équipes, joueurs, actualités, statistiques)
2. Faire le lien entre la passion du football et les opportunités d'affaires
3. Inciter subtilement les visiteurs à s'inscrire à la formation "Créer son activité génératrice de revenus avec peu de moyens"
4. Mettre en avant que le sport/football peut être une niche business rentable
5. Encourager à remplir le formulaire pour obtenir plus d'informations

Réponds toujours en français, sois enthousiaste, et utilise des émojis football ⚽. Garde tes réponses concises (max 100 mots) et termine souvent par une question pour relancer la conversation. N'hésite pas à mentionner des exemples concrets de business liés au football.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI API error')
    }

    const botMessage = data.choices[0]?.message?.content || "Désolé, je n'ai pas pu traiter votre message. Mais parlons quand même de football ! ⚽"

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
    return new Response(
      JSON.stringify({ 
        message: "Une erreur s'est produite. Mais savez-vous que le business du football génère des milliards ? Notre formation vous montre comment créer votre activité dans ce domaine passionnant ! ⚽" 
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