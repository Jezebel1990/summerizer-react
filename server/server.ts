import express, { Request, Response, RequestHandler } from 'express';
import fileUpload from 'express-fileupload';
import pdfParse from 'pdf-parse';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(fileUpload());
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
if (!HUGGINGFACE_API_KEY) {
  throw new Error('A chave da API do Hugging Face não está configurada. Verifique o arquivo .env.');
}

const MAX_TOKENS = 1024;
const fetchSummary = async (input: string): Promise<string> => {
  try {
    
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      { inputs: input },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        },
      }
    );

    const data = response.data;
    if (Array.isArray(data) && data[0]?.summary_text) {
      return data[0].summary_text;
    } else {
      console.error('Dados da API não contêm o campo "summary_text".');
      throw new Error('Nenhum resumo encontrado na resposta da API.');
    }
  } catch (error) {
    console.error('Erro na requisição para Hugging Face:', error);
    throw new Error('Erro ao se comunicar com o Hugging Face.');
  }
};

const processPdf: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.files || !req.files.file) {
      res.status(400).json({ error: 'Nenhum arquivo enviado. Envie um arquivo PDF válido.' });
      return;
    }

    const pdfFile = req.files.file as fileUpload.UploadedFile;
    if (pdfFile.mimetype !== 'application/pdf') {
      res.status(400).json({ error: 'O arquivo enviado não é um PDF.' });
      return;
    }

    const pdfBuffer = pdfFile.data;

    const data = await pdfParse(pdfBuffer);
    let extractedText = data.text;

    if (!extractedText || extractedText.trim() === '') {
      res.status(400).json({ error: 'Não foi possível extrair texto do PDF.' });
      return;
    }

    const shortText = extractedText.length > MAX_TOKENS ? extractedText.slice(0, MAX_TOKENS) : extractedText;

    const summary = await fetchSummary(shortText);

    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno ao processar o PDF.' });
  }
};

app.post('/api/process-pdf', processPdf);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


