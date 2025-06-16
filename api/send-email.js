import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, rating, comments } = req.body;

    // Validación básica
    if (!name || !email || !rating) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Enviar email
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Usar este para pruebas
      // from: 'formulario@tudominio.com', // Para producción
      to: ['tu-email@gmail.com'], // Tu email donde quieres recibir
      subject: 'Nueva respuesta del formulario de satisfacción',
      html: `
        <h2>Nueva respuesta del formulario</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Satisfacción:</strong> ${rating}/5</p>
        <p><strong>Comentarios:</strong> ${comments || 'Sin comentarios'}</p>
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