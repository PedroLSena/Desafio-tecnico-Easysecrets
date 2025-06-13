import { Produto } from "./produto";

export interface SalesData extends Array<Produto> {}

export interface SalesState {
  data: SalesData;
  selectedProducts: string[];
  selectedMonths: string[];
  chartType: 'line' | 'bar' | 'area';
  loading: boolean;
  error: string | null;
}

export interface SalesMetrics {
  totalVendas: number;
  vendaMensal: number;
  crescimento: number;
  melhorProduto: string;
}