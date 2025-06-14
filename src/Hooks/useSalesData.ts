import { useMemo } from 'react';
import { useAppSelector } from './redux';
import { SalesMetrics } from '../Types/sale';

export const useSalesMetrics = (): SalesMetrics => {
  const { data, selectedProducts, selectedMonths } = useAppSelector(state => state.sales);

  return useMemo(() => {
    const filteredData = data.filter(produto => 
      selectedProducts.includes(produto.produto)
    );

    const totalVendas = filteredData.reduce((total, produto) => {
      return total + produto.vendas
        .filter(venda => selectedMonths.includes(venda.mes))
        .reduce((sum, venda) => sum + venda.quantidade, 0);
    }, 0);

    const vendaMensal = totalVendas / selectedMonths.length;

    const primeiroPeriodo = filteredData.reduce((sum, produto) => {
      const primeiroMes = produto.vendas.find(v => selectedMonths.includes(v.mes));
      return sum + (primeiroMes?.quantidade || 0);
    }, 0);

    const ultimoPeriodo = filteredData.reduce((sum, produto) => {
      const ultimoMes = produto.vendas.slice().reverse().find(v => selectedMonths.includes(v.mes));
      return sum + (ultimoMes?.quantidade || 0);
    }, 0);

    const crescimento = primeiroPeriodo > 0 ? 
      ((ultimoPeriodo - primeiroPeriodo) / primeiroPeriodo) * 100 : 0;

    const vendasPorProduto = filteredData.map(produto => ({
      nome: produto.produto,
      total: produto.vendas
        .filter(venda => selectedMonths.includes(venda.mes))
        .reduce((sum, venda) => sum + venda.quantidade, 0)
    }));

    const melhorProduto = vendasPorProduto.sort((a, b) => b.total - a.total)[0]?.nome || '';

    return {
      totalVendas,
      vendaMensal: Math.round(vendaMensal),
      crescimento: Math.round(crescimento * 100) / 100,
      melhorProduto,
    };
  }, [data, selectedProducts, selectedMonths]);
};