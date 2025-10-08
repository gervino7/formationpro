import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Validation schema
const registrationSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email format").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().regex(/^[\+]?[0-9\s\-\(\)]{8,20}$/, "Invalid phone format"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
})

interface RegistrationData {
  name: string
  email: string
  phone: string
  message?: string
}

// Fonction pour générer le contenu HTML du ticket
function generateTicketHTML(registrationData: RegistrationData, ticketId: string): string {
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Arial', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      color: #333;
    }
    .ticket {
      background: white;
      border-radius: 15px;
      padding: 40px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      max-width: 600px;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
    }
    .ticket::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 8px;
      background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px dashed #e0e0e0;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 10px;
    }
    .title {
      font-size: 24px;
      color: #333;
      margin-bottom: 5px;
    }
    .subtitle {
      font-size: 18px;
      color: #666;
      font-style: italic;
    }
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-bottom: 30px;
    }
    .section {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
    }
    .section h3 {
      color: #667eea;
      margin-bottom: 15px;
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .info-row {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
    .label {
      font-weight: bold;
      color: #555;
    }
    .value {
      color: #333;
    }
    .ticket-id {
      background: #667eea;
      color: white;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      font-weight: bold;
      font-size: 18px;
      letter-spacing: 2px;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      border-top: 2px dashed #e0e0e0;
      color: #666;
      font-size: 14px;
    }
    .important {
      background: #fff3cd;
      border: 2px solid #ffc107;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      text-align: center;
    }
    .qr-placeholder {
      width: 100px;
      height: 100px;
      border: 2px dashed #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px auto;
      background: #f5f5f5;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="ticket">
    <div class="header">
      <div class="logo">🎓 FORMATIONPRO - CEFP-DA</div>
      <h1 class="title">BILLET DE FORMATION PREMIUM</h1>
      <p class="subtitle">Créer son activité génératrice de revenus avec peu de moyens</p>
    </div>
    
    <div class="content">
      <div class="section">
        <h3>👤 Informations Participant</h3>
        <div class="info-row">
          <span class="label">Nom :</span>
          <span class="value">${registrationData.name}</span>
        </div>
        <div class="info-row">
          <span class="label">Email :</span>
          <span class="value">${registrationData.email}</span>
        </div>
        <div class="info-row">
          <span class="label">Téléphone :</span>
          <span class="value">${registrationData.phone}</span>
        </div>
        <div class="info-row">
          <span class="label">Inscription :</span>
          <span class="value">${currentDate}</span>
        </div>
      </div>
      
      <div class="section">
        <h3>📅 Détails Formation</h3>
        <div class="info-row">
          <span class="label">Date :</span>
          <span class="value">15 Octobre 2025</span>
        </div>
        <div class="info-row">
          <span class="label">Durée :</span>
          <span class="value">2 jours (16h)</span>
        </div>
        <div class="info-row">
          <span class="label">Lieu :</span>
          <span class="value">Centre CEFP-DA</span>
        </div>
        <div class="info-row">
          <span class="label">Places :</span>
          <span class="value">Max 25 participants</span>
        </div>
      </div>
    </div>
    
    <div class="important">
      <strong>⚠️ IMPORTANT :</strong> Conservez précieusement ce billet. Il vous sera demandé le jour de la formation.
    </div>
    
    <div class="qr-placeholder">
      QR Code<br>Validation
    </div>
    
    <div class="ticket-id">
      ID: ${ticketId}
    </div>
    
    <div class="footer">
      <p><strong>Centre de Formation et de Perfectionnement Djékanou Alexis (CEFP-DA)</strong></p>
      <p>📞 +225 01 02 03 04 05 | ✉️ contact@cefp-da.com</p>
      <p>📍 Abidjan, Côte d'Ivoire</p>
      <br>
      <p style="color: #999; font-size: 12px;">
        Billet généré le ${currentDate} | Valable pour une personne uniquement
      </p>
    </div>
  </div>
</body>
</html>`
}

// Fonction pour convertir HTML en PDF (simulation basique)
function generateTicketPDF(registrationData: RegistrationData, ticketId: string): Uint8Array {
  // Dans un environnement réel, vous utiliseriez une bibliothèque comme Puppeteer
  // Pour cette démo, nous retournons le HTML dans un format qui peut être affiché
  const htmlContent = generateTicketHTML(registrationData, ticketId)
  
  // Simulation d'un PDF - en réalité, il faudrait utiliser une vraie bibliothèque PDF
  const pdfContent = `
%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 595 842]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
/F2 6 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 2000
>>
stream
BT
/F2 28 Tf
50 780 Td
(🎓 FORMATIONPRO - CEFP-DA - BILLET PREMIUM) Tj
0 -40 Td
/F1 20 Tf
(Créer son activité génératrice de revenus avec peu de moyens) Tj
0 -60 Td
/F1 16 Tf
(━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━) Tj
0 -40 Td
(👤 INFORMATIONS PARTICIPANT) Tj
0 -30 Td
/F1 14 Tf
(Nom: ${registrationData.name}) Tj
0 -25 Td
(Email: ${registrationData.email}) Tj
0 -25 Td
(Téléphone: ${registrationData.phone}) Tj
0 -25 Td
(Date inscription: ${new Date().toLocaleDateString('fr-FR')}) Tj
0 -40 Td
/F1 16 Tf
(📅 DÉTAILS DE LA FORMATION) Tj
0 -30 Td
/F1 14 Tf
(Date: 15 Octobre 2025) Tj
0 -25 Td
(Durée: 2 jours intensifs \\(16 heures\\)) Tj
0 -25 Td
(Lieu: Centre CEFP-DA, Abidjan) Tj
0 -25 Td
(Groupe: Maximum 25 participants) Tj
0 -40 Td
/F1 16 Tf
(⚠️  IMPORTANT) Tj
0 -25 Td
/F1 12 Tf
(Conservez précieusement ce billet.) Tj
0 -20 Td
(Il vous sera demandé le jour de la formation.) Tj
0 -40 Td
/F2 18 Tf
(ID BILLET: ${ticketId}) Tj
0 -60 Td
/F1 12 Tf
(━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━) Tj
0 -30 Td
(Centre de Formation et de Perfectionnement Djékanou Alexis) Tj
0 -20 Td
(📞 +225 01 02 03 04 05 | ✉️  contact@cefp-da.com) Tj
0 -20 Td
(📍 Abidjan, Côte d'Ivoire) Tj
0 -30 Td
/F1 10 Tf
(Billet généré le ${new Date().toLocaleDateString('fr-FR')} | Valable pour une personne uniquement) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

6 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica-Bold
>>
endobj

xref
0 7
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000120 00000 n 
0000000290 00000 n 
0000002350 00000 n 
0000002420 00000 n 
trailer
<<
/Size 7
/Root 1 0 R
>>
startxref
2495
%%EOF`

  return new TextEncoder().encode(pdfContent)
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const requestBody = await req.json()
    
    // Validate input with Zod
    const validationResult = registrationSchema.safeParse(requestBody)
    
    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error.issues)
      return new Response(
        JSON.stringify({ 
          error: "Invalid input data",
          details: validationResult.error.issues.map(i => i.message)
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }

    const { name, email, phone, message }: RegistrationData = validationResult.data
    
    // Log with anonymized data (no PII)
    const emailDomain = email.split('@')[1]
    console.log(`Processing registration for domain: ${emailDomain}`)

    // Générer un ID unique pour le ticket
    const ticketId = `CEFP${Date.now().toString().slice(-8)}${Math.random().toString(36).substr(2, 4).toUpperCase()}`
    
    // Stocker l'inscription dans Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data: registration, error: dbError } = await supabase
      .from('registrations')
      .insert({
        name,
        email,
        phone,
        message,
        eventbrite_attendee_id: ticketId,
        registration_date: new Date().toISOString()
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Erreur lors de l\'enregistrement en base de données')
    }

    // Générer le PDF du ticket
    const pdfBytes = generateTicketPDF({ name, email, phone, message }, ticketId)

    console.log(`Ticket generated successfully: ${ticketId}`)

    return new Response(pdfBytes, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="billet-formation-CEFP-DA-${ticketId}.pdf"`,
        'Content-Length': pdfBytes.length.toString(),
      },
      status: 200,
    })

  } catch (error) {
    console.error('Ticket generation error:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Erreur lors de la génération du ticket'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})