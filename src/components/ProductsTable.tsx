"use client";

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../Hooks/redux';
import { addProduto, updateProduto, deleteProduto } from '../Store/slices/salesSlice';
import { Produto } from '../Types/produto';
import { FaPlus, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { ProductForm } from './formProd';
import { X } from 'lucide-react';

const ProductsTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: products } = useAppSelector((state) => state.sales);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Produto | undefined>();

  const getTotalSales = (product: Produto) => {
    return product.vendas.reduce((total, venda) => total + venda.quantidade, 0);
  };

  const getMonthlyAverageSales = (product: Produto) => {
    const totalSales = getTotalSales(product);
    return product.vendas.length > 0 ? (totalSales / product.vendas.length).toFixed(2) : '0.00';
  };

  const handleEditProduct = (product: Produto) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o produto "${productId}"?`)) {
      dispatch(deleteProduto(productId));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 mb-8">
      <div className="flex justify-end mb-4">
        <button 
          className="bg-[#4CAF50] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-[#45a049] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-opacity-50"
          onClick={() => {
            setEditingProduct(undefined);
            setShowAddForm(true);
          }}
        >
          <FaPlus size={20} />
        </button>
      </div>
      <table className="min-w-full rounded-lg overflow-hidden border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Produtos</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Média mensal</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product: Produto) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.produto}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{getTotalSales(product)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{getMonthlyAverageSales(product)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button 
                    className="bg-[#4285F4] text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-[#3367D6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:ring-opacity-50"
                    onClick={() => handleEditProduct(product)}
                  >
                    <FaPencilAlt size={14} />
                  </button>
                  <button 
                    className="bg-[#EA4335] text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-[#D42B20] transition-colors focus:outline-none focus:ring-2 focus:ring-[#EA4335] focus:ring-opacity-50"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
              <button onClick={() => {
                setShowAddForm(false);
                setEditingProduct(undefined);
              }} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <ProductForm produto={editingProduct} onClose={() => {
              setShowAddForm(false);
              setEditingProduct(undefined);
            }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsTable; 