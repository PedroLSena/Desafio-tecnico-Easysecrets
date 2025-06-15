"use client";

import React from 'react';
import { useEffect, useState } from 'react';

interface PropsMetrica {
  title: string;
  value: number | string;
  color: string;
  trend?: number;
}

export const MetricCard: React.FC<PropsMetrica> = ({
  title,
  value,
  color,
  trend,
}) => {
  const [valorExibido, setValorExibido] = useState<string>('');

  useEffect(() => {    if (typeof value === 'number') {
      setValorExibido(value.toLocaleString('pt-BR'));
    } else {
      setValorExibido(value);
    }
  }, [value]);

  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <div className={`relative p-6 rounded-lg shadow-lg overflow-hidden bg-gradient-to-br ${color} text-white transform hover:scale-105 transition-all duration-300 ease-in-out`}>
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="text-white opacity-75">
        </div>
        <h3 className="text-lg font-semibold opacity-90 text-center">{title}</h3>
        <p className="text-4xl font-bold text-center">
          {valorExibido || (typeof value === 'number' ? value.toString() : value)}
        </p>
      </div>
      {trend !== undefined && (
        <div className={`mt-4 text-sm font-medium flex items-center justify-center ${
            isPositive ? 'text-green-200' :
            isNegative ? 'text-red-200' :
            'text-gray-200'
        }`}>
        </div>
      )}
    </div>
  );
}; 