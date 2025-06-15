"use client";

import React, { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../Hooks/redux';
import { setSelectedProducts, setSelectedMonths, setChartType } from '../Store/slices/salesSlice';
import { Checkbox } from './ui/checkbox';
import { Produto } from '../Types/produto';

export const FilterPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: produtos, selectedProducts: produtosSelecionados, selectedMonths: mesesSelecionados, chartType: tipoGrafico } = useAppSelector(state => state.sales);

  const produtosDisponiveis = useMemo((): string[] => {
    const todosProdutos = produtos.map((p: Produto) => p.produto);
    return Array.from(new Set(todosProdutos));
  }, [produtos]);

  const mesesDisponiveis: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const handleProductChange = (produto: string, checked: boolean) => {
    if (checked) {
      dispatch(setSelectedProducts([...produtosSelecionados, produto]));
    } else {
      dispatch(setSelectedProducts(produtosSelecionados.filter((p: string) => p !== produto)));
    }
  };

  const handleMonthChange = (mes: string, checked: boolean) => {
    if (checked) {
      dispatch(setSelectedMonths([...mesesSelecionados, mes]));
    } else {
      dispatch(setSelectedMonths(mesesSelecionados.filter((m: string) => m !== mes)));
    }
  };

  const handleChartTypeChange = (tipo: 'line' | 'bar' | 'pie') => {
    dispatch(setChartType(tipo));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-center text-xl font-semibold mb-4">Filtrar Dados</h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Tipo de Gráfico</h3>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              tipoGrafico === 'line' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleChartTypeChange('line')}
          >
            Linha
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              tipoGrafico === 'bar' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleChartTypeChange('bar')}
          >
            Barra
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              tipoGrafico === 'pie' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleChartTypeChange('pie')}
          >
            Pizza
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="mb-6 md:mb-0 md:w-2/3">
          <h3 className="text-lg font-medium mb-3">Produtos</h3>
          <div className="grid grid-cols-2 gap-2">
            {produtosDisponiveis.map(produto => (
              <div key={produto} className="flex items-center space-x-2">
                <Checkbox
                  id={`produto-${produto}`}
                  checked={produtosSelecionados.includes(produto)}
                  onCheckedChange={(checked: boolean) => handleProductChange(produto, checked)}
                />
                <label htmlFor={`produto-${produto}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {produto}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center">
          <div className="h-full w-px bg-gray-200"></div>
        </div>

        <div className="md:w-1/3">
          <h3 className="text-lg font-medium mb-3">Meses</h3>
          <div className="grid grid-cols-2 gap-2">
            {mesesDisponiveis.map(mes => (
              <div key={mes} className="flex items-center space-x-2">
                <Checkbox
                  id={`mes-${mes}`}
                  checked={mesesSelecionados.includes(mes)}
                  onCheckedChange={(checked: boolean) => handleMonthChange(mes, checked)}
                />
                <label htmlFor={`mes-${mes}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {mes}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 