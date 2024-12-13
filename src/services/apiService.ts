const API_URL = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';

export const fetchSummary = async (input: string): Promise<string> => {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
    },
    body: JSON.stringify({ inputs: input }),
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();

    if (Array.isArray(data) && data[0]?.summary_text) {
      return data[0].summary_text;
    } else {
      throw new Error('Nenhum resumo encontrado na resposta da API.');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
