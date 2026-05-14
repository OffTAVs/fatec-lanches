export interface Produto {
  _id: string;
  nome: string;
  preco: number;
  imagemUrl: string;
  quantity?: number;
}