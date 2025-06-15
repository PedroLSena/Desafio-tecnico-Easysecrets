import React from 'react';
import { MetricCard } from './MetricCard';
import { SalesChart } from './SalesChart';
import { FilterPanel } from './FilterPanel';
import { useSalesMetrics } from '../Hooks/useSalesData';
import { TrendingUp, ShoppingCart, Calendar, Trophy, TrendingDown } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const metrics = useSalesMetrics();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4 animate-slide-up mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">
          Dashboard Analítico
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Visualize e analise seus dados de vendas com gráficos interativos e métricas em tempo real
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 mb-8">
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <MetricCard
            title="Total de Vendas"
            value={metrics.totalVendas}
            color="bg-black"
          />
          <MetricCard
            title="Média Mensal"
            value={metrics.vendaMensal}
            color="bg-black"
          />
          <MetricCard
            title="Crescimento"
            value={`${metrics.crescimento}%`}
            trend={metrics.crescimento}
            color="bg-black"
          />
          <MetricCard
            title="Melhor Produto"
            value={metrics.melhorProduto}
            color="bg-green-400"
          />
          <MetricCard
            title="Pior Produto"
            value={metrics.piorProduto}
            color="bg-red-400"
          />
        </div>

        <div className="space-y-8">
          <FilterPanel />
          <SalesChart />
        </div>
      </div>
    </div>
  );
}; 