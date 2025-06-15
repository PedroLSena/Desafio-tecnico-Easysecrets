"use client";

import React, { useState } from 'react';
import { useAppDispatch } from '../Hooks/redux';
import { addProduto, updateProduto } from '../Store/slices/salesSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { Produto } from '../Types/produto';

const possibleMonths = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

interface ProductFormProps {
  produto?: Produto;
  onClose: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ produto, onClose }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Produto>({
    id: produto?.id || Date.now().toString(),
    produto: produto?.produto || '',
    vendas: produto?.vendas || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.produto.trim()) {
      alert('Nome do produto é obrigatório');
      return;
    }

    if (produto) {
      dispatch(updateProduto(formData));
    } else {
      dispatch(addProduto(formData));
    }
    
    onClose();
  };

  const handleVendaChange = (mesIndex: number, quantidade: string) => {
    const newVendas = formData.vendas.map((venda, index) => {
      if (index === mesIndex) {
        const parsedQuantidade = quantidade === '' ? 0 : Math.max(0, parseFloat(quantidade));
        return { ...venda, quantidade: parsedQuantidade };
      }
      return venda;
    });
    setFormData({ ...formData, vendas: newVendas });
  };

  const handleMesNameChange = (mesIndex: number, novoNome: string) => {
    const newVendas = formData.vendas.map((venda, index) => {
      if (index === mesIndex) {
        return { ...venda, mes: novoNome };
      }
      return venda;
    });
    setFormData({ ...formData, vendas: newVendas });
  };

  const adicionarMes = () => {
    const newVendas = [...formData.vendas];
    newVendas.push({ mes: '', quantidade: 0 });
    setFormData({ ...formData, vendas: newVendas });
  };

  const removerMes = (mesIndex: number) => {
    if (formData.vendas.length > 1) {
      const newVendas = formData.vendas.filter((_, index) => index !== mesIndex);
      setFormData({ ...formData, vendas: newVendas });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="produto" className="text-sm sm:text-base">Nome do Produto</Label>
        <Input
          id="produto"
          value={formData.produto}
          onChange={(e) => setFormData({ ...formData, produto: e.target.value })}
          placeholder="Digite o nome do produto"
          required
          className="mt-1"
        />
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <Label className="text-sm sm:text-base">Vendas por Mês</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={adicionarMes}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            Adicionar Mês
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {formData.vendas.map((venda, index) => (
            <div key={index} className="space-y-2 p-3 border rounded-lg bg-gray-50">
              <div className="flex items-center justify-between">
                <Label htmlFor={`mes-${index}`} className="text-sm">Mês</Label>
                {formData.vendas.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removerMes(index)}
                    className="h-6 w-6 p-0 text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <select
                id={`mes-${index}`}
                value={venda.mes}
                onChange={(e) => handleMesNameChange(index, e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Selecione o Mês</option>
                {possibleMonths.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <div>
                <Label htmlFor={`venda-${index}`} className="text-sm">Quantidade</Label>
                <Input
                  id={`venda-${index}`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={venda.quantidade === 0 ? '' : venda.quantidade}
                  onChange={(e) => handleVendaChange(index, e.target.value)}
                  className="w-full mt-1"
                  placeholder="Digite a quantidade"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
          Cancelar
        </Button>
        <Button type="submit" className="w-full sm:w-auto">
          {produto ? 'Atualizar' : 'Adicionar'} Produto
        </Button>
      </div>
    </form>
  );
};