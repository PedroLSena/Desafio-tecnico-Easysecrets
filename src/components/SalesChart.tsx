import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { useAppSelector } from '../Hooks/redux';
import { Produto } from '../Types/produto';
import { VendaMensal } from '../Types/vendaMensal';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

interface EntradaVendasMensais {
  name: string;
  [key: string]: number | string;
}

export const SalesChart: React.FC = () => {
  const { data: produtos, selectedProducts: produtosSelecionados, selectedMonths: mesesSelecionados, chartType: tipoGrafico } = useAppSelector(state => state.sales);

  const dadosGrafico = useMemo(() => {
    const mapaVendasMensais: { [key: string]: EntradaVendasMensais } = {};

    mesesSelecionados.forEach((mes: string) => {
      mapaVendasMensais[mes] = { name: mes };
      produtosSelecionados.forEach((nomeProduto: string) => {
        mapaVendasMensais[mes][nomeProduto] = 0;
      });
    });

    produtos.forEach((produto: Produto) => {
      if (produtosSelecionados.includes(produto.produto)) {
        produto.vendas.forEach((venda: VendaMensal) => {
          if (mesesSelecionados.includes(venda.mes)) {
            if (mapaVendasMensais[venda.mes]) {
              mapaVendasMensais[venda.mes][produto.produto] = ((mapaVendasMensais[venda.mes][produto.produto] as number) || 0) + venda.quantidade;
            }
          }
        });
      }
    });

    return Object.values(mapaVendasMensais);
  }, [produtos, mesesSelecionados, produtosSelecionados]);

  const dadosGraficoPizza = useMemo(() => {
    const totaisProdutos: { name: string; value: number }[] = [];

    produtosSelecionados.forEach((nomeProduto: string) => {
      const vendasTotais = produtos.reduce((soma: number, produto: Produto) => {
        if (produto.produto === nomeProduto) {
          return soma + produto.vendas.filter((v: VendaMensal) => mesesSelecionados.includes(v.mes)).reduce((s: number, v: VendaMensal) => s + v.quantidade, 0);
        }
        return soma;
      }, 0);
      totaisProdutos.push({ name: nomeProduto, value: vendasTotais });
    });
    return totaisProdutos;
  }, [produtos, produtosSelecionados, mesesSelecionados]);

  const renderizarGrafico = () => {
    const propsComunsGrafico = {
      data: dadosGrafico,
      margin: {
        top: 5, right: 30, left: 20, bottom: 5,
      },
    };

    const TooltipPersonalizado = ({ active, payload, label }: { active?: boolean; payload?: { dataKey: string; value: number; color: string }[]; label?: string }) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-xl">
            <p className="font-medium text-foreground mb-2">{label}</p>
            {payload.map((entry, index: number) => (
              <p key={index} className="text-sm" style={{ color: entry.color }}>
                {entry.dataKey}: {entry.value}
              </p>
            ))}
          </div>
        );
      }
      return null;
    };

    const TooltipPizza = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-xl">
            <p className="font-medium text-foreground mb-2">{payload[0].name}</p>
            <p className="text-sm" style={{ color: payload[0].fill }}>
              Vendas: {payload[0].value}
            </p>
          </div>
        );
      }
      return null;
    };

    const gerarCor = (index: number) => `hsl(${(index * 50) % 360}, 70%, 50%)`;

    switch (tipoGrafico) {
      case 'bar':
        return (
          <BarChart {...propsComunsGrafico}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip content={<TooltipPersonalizado />} />
            <Legend />
            {produtosSelecionados.map((nomeProduto: string, index: number) => (
              <Bar
                key={nomeProduto}
                dataKey={nomeProduto}
                fill={gerarCor(index)}
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationBegin={index * 200}
              />
            ))}
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart {...propsComunsGrafico} data={dadosGraficoPizza}>
            <Pie
              data={dadosGraficoPizza}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {dadosGraficoPizza.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={gerarCor(index)} />
              ))}
            </Pie>
            <Tooltip content={<TooltipPizza />} />
            <Legend />
          </PieChart>
        );

      default:
        return (
          <LineChart {...propsComunsGrafico}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip content={<TooltipPersonalizado />} />
            <Legend />
            {produtosSelecionados.map((nomeProduto: string, index: number) => (
              <Line
                key={nomeProduto}
                type="monotone"
                dataKey={nomeProduto}
                stroke={gerarCor(index)}
                strokeWidth={3}
                dot={{ r: 6, strokeWidth: 2, fill: gerarCor(index) }}
                activeDot={{ r: 8, strokeWidth: 2 }}
                animationDuration={2000}
                animationBegin={index * 400}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm animate-scale-in">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl 0 bg-clip-text ">
          Análise de Vendas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {renderizarGrafico()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};