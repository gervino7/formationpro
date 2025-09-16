import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RegistrationData {
  name: string
  email: string
  phone: string
  message?: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { name, email, phone, message }: RegistrationData = await req.json()
    
    console.log('Processing registration for:', { name, email, phone })

    const eventbriteApiKey = Deno.env.get('EVENTBRITE_API_KEY')
    if (!eventbriteApiKey) {
      throw new Error('Eventbrite API key not configured')
    }

    // Create attendee in Eventbrite
    // Note: You'll need to replace EVENT_ID with your actual Eventbrite event ID
    const eventId = Deno.env.get('EVENTBRITE_EVENT_ID') || 'YOUR_EVENT_ID'
    
    const attendeeData = {
      ticket_class_id: Deno.env.get('EVENTBRITE_TICKET_CLASS_ID') || 'YOUR_TICKET_CLASS_ID',
      profile: {
        name: name,
        email: email,
        cell_phone: phone
      }
    }

    console.log('Creating attendee in Eventbrite:', attendeeData)

    const eventbriteResponse = await fetch(
      `https://www.eventbriteapi.com/v3/events/${eventId}/attendees/`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${eventbriteApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendeeData)
      }
    )

    if (!eventbriteResponse.ok) {
      const errorText = await eventbriteResponse.text()
      console.error('Eventbrite API error:', errorText)
      throw new Error(`Eventbrite registration failed: ${eventbriteResponse.status}`)
    }

    const attendeeResult = await eventbriteResponse.json()
    console.log('Eventbrite registration successful:', attendeeResult)

    // Store registration in Supabase for tracking
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { error: dbError } = await supabase
      .from('registrations')
      .insert({
        name,
        email,
        phone,
        message,
        eventbrite_attendee_id: attendeeResult.id,
        registration_date: new Date().toISOString()
      })

    if (dbError) {
      console.error('Database error:', dbError)
      // Don't fail the request if DB insert fails, registration was successful in Eventbrite
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Inscription réussie ! Vous recevrez votre billet par email.',
        attendee_id: attendeeResult.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Registration error:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Erreur lors de l\'inscription'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})