import express from 'express';
import cors from 'cors';
import handler from './send-email.js';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = 3001;

// Configuración simple de CORS
app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
