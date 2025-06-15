import { useMemo } from 'react';
import { useAppSelector } from './redux';
import { SalesMetrics, SalesData } from '../Types/sale';
import { Produto } from '../Types/produto';
import { VendaMensal } from '../Types/vendaMensal';

export const useSalesMetrics = (): SalesMetrics => {
  const { data, selectedProducts, selectedMonths } = useAppSelector(state => state.sales);

  return useMemo(() => {
    const filteredData: SalesData = data.filter((produto: Produto) => 
      selectedProducts.includes(produto.produto)
    );

    const totalVendas = filteredData.reduce((total: number, produto: Produto) => {
      return total + produto.vendas
        .filter((venda: VendaMensal) => selectedMonths.includes(venda.mes))
        .reduce((sum: number, venda: VendaMensal) => sum + venda.quantidade, 0);
    }, 0);

    const vendaMensal = selectedMonths.length > 0 ? totalVendas / selectedMonths.length : 0;

    const primeiroPeriodo = filteredData.reduce((sum: number, produto: Produto) => {
      const primeiroMes = produto.vendas.find((v: VendaMensal) => selectedMonths.includes(v.mes));
      return sum + (primeiroMes?.quantidade || 0);
    }, 0);

    const ultimoPeriodo = filteredData.reduce((sum: number, produto: Produto) => {
      const ultimoMes = produto.vendas.slice().reverse().find((v: VendaMensal) => selectedMonths.includes(v.mes));
      return sum + (ultimoMes?.quantidade || 0);
    }, 0);

    const crescimento = primeiroPeriodo > 0 ? 
      ((ultimoPeriodo - primeiroPeriodo) / primeiroPeriodo) * 100 : 0;

    const vendasPorProduto = filteredData.map((produto: Produto) => ({
      nome: produto.produto,
      total: produto.vendas
        .filter((venda: VendaMensal) => selectedMonths.includes(venda.mes))
        .reduce((sum: number, venda: VendaMensal) => sum + venda.quantidade, 0)
    }));

    const melhorProduto = vendasPorProduto.sort((a: { nome: string; total: number }, b: { nome: string; total: number }) => b.total - a.total)[0]?.nome || '';

    const piorProduto = vendasPorProduto.sort((a: { nome: string; total: number }, b: { nome: string; total: number }) => a.total - b.total)[0]?.nome || '';

    return {
      totalVendas: Math.floor(totalVendas),
      vendaMensal: Math.floor(vendaMensal),
      crescimento: Math.round(crescimento * 100) / 100,
      melhorProduto,
      piorProduto,
    };
  }, [data, selectedProducts, selectedMonths]);
};