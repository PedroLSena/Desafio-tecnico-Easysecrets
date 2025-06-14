"use client";

import React from 'react';
import { useAppSelector, useAppDispatch } from '../Hooks/redux';
import { addProduto, updateProduto, deleteProduto } from '../Store/slices/salesSlice';
import { Produto } from '../Types/produto';
import { FaPlus, FaPencilAlt, FaTrash } from 'react-icons/fa';

const ProductsTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: products } = useAppSelector((state) => state.sales);

  const getTotalSales = (product: Produto) => {
    return product.vendas.reduce((total, venda) => total + venda.quantidade, 0);
  };

  const getMonthlyAverageSales = (product: Produto) => {
    const totalSales = getTotalSales(product);
    return product.vendas.length > 0 ? (totalSales / product.vendas.length).toFixed(2) : '0.00';
  };

  const handleAddProduct = () => {
    alert('Add Product clicked!');
  };

  const handleEditProduct = (product: Produto) => {
    alert(`Edit Product: ${product.produto}`);
  };

  const handleDeleteProduct = (productName: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o produto "${productName}"?`)) {
      dispatch(deleteProduto(productName));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 mb-8">
      <div className="flex justify-end mb-4">
        <button 
          className="bg-green-500 text-white rounded-full p-3 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={handleAddProduct}
        >
          <FaPlus size={20} />
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produtos</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Média mensal</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.produto}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.produto}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{getTotalSales(product)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{getMonthlyAverageSales(product)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button 
                    className="bg-blue-500 text-white rounded-full p-2 flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => handleEditProduct(product)}
                  >
                    <FaPencilAlt size={16} />
                  </button>
                  <button 
                    className="bg-red-500 text-white rounded-full p-2 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    onClick={() => handleDeleteProduct(product.produto)}
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable; 