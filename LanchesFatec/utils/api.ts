import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fateclanchesback.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Função para gerar o pagamento PIX
export const createPixPayment = async (orderData: { amount: number, description: string }) => {
  try {
    const response = await api.post('/payments/pix', orderData);
    return response.data; 
    // Esperamos que o backend retorne: { qrCodeBase64: '...', copyPaste: '...' }
  } catch (error) {
    console.error("Erro ao gerar PIX:", error);
    throw error;
  }
};

export default api;
