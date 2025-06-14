import {VendaMensal} from './vendaMensal';
export interface Produto {
  id: string;
  produto: string;
  vendas: VendaMensal[];
}