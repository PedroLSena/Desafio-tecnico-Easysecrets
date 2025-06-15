import React from 'react';

export const Carregando: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-lg">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0"></div>
      </div>
    </div>
  );
}; 