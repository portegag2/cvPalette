import { Resend } from 'resend';

// Asegúrate de que la API key esté disponible
if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY no está definida');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Habilitar CORS para desarrollo local
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Request body:', req.body);
    
    const { rating, comments, wouldRecommend, usabilityRating, improvements, valuedFeatures } = req.body;

    // Validación básica con mensajes más específicos
    if (!rating) {
      return res.status(400).json({ error: 'Falta el campo rating' });
    }
    if (wouldRecommend === null || wouldRecommend === undefined) {
      return res.status(400).json({ error: 'Falta el campo wouldRecommend' });
    }
    if (!usabilityRating) {
      return res.status(400).json({ error: 'Falta el campo usabilityRating' });
    }

    // Enviar email
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['portegag2@gmail.com'],
      subject: 'Resultados Formulario de Satisfacción',
      html: `
        <h2>Resultados del Formulario de Satisfacción</h2>
        <p><strong>Calificación de la Experiencia:</strong> ${rating}/10</p>
        <p><strong>Comentarios:</strong> ${comments || 'Sin comentarios'}</p>
        <p><strong>¿Recomendaría la aplicación?:</strong> ${wouldRecommend ? 'Sí' : 'No'}</p>
        <p><strong>Experiencia de manejo:</strong> ${usabilityRating}</p>
        <p><strong>Sugerencias de mejora:</strong> ${improvements || 'Sin sugerencias'}</p>
        <p><strong>Características más valoradas:</strong> ${valuedFeatures.join(', ') || 'Ninguna seleccionada'}</p>
        <hr>
        <p><small>Enviado desde: ${req.headers.origin}</small></p>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ 
      message: 'Email enviado correctamente',
      id: data.id 
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor' 
    });
  }
}