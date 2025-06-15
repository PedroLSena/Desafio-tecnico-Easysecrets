"use client";

import dynamic from 'next/dynamic';
import { Carregando } from '../../components/LoadingSpinner';

const ProductsTable = dynamic(() => import('../../components/ProductsTable'), { 
  ssr: false,
  loading: () => <Carregando />
});

export default function ProdutosPage() {
  return (
    <div className="container mx-auto px-4 py-12 pb-40">
      <h1 className="text-4xl font-bold text-center mb-4">Produtos</h1>
      <p className="text-lg text-gray-700 text-center mb-8">Tenha acesso a toda a lista de produtos para gerenciamento.</p>
      <ProductsTable />
    </div>
  );
}