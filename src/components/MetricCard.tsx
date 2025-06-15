"use client";

import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  color?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, color = 'bg-black' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        useGrouping: true
      }).format(val);
    }
    return val;
  };

  const renderTrendIcon = () => {
    if (!mounted) return null;
    
    if (trend === undefined) return null;

    const Icon = trend >= 0 ? TrendingUp : TrendingDown;
    const colorClass = trend >= 0 ? 'text-green-300' : 'text-red-300';

    return (
      <div className={`flex items-center ${colorClass}`}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
    );
  };

  return (
    <div 
      className={`
        ${color} 
        rounded-lg 
        shadow-md 
        p-4 
        sm:p-6 
        border 
        border-gray-100 
        transform 
        transition-all 
        duration-500 
        hover:scale-105 
        hover:shadow-xl
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <h3 className="text-sm sm:text-base font-medium text-white mb-2">{title}</h3>
      <div className="flex items-center justify-between">
        <p className="text-xl sm:text-2xl font-bold text-white">
          {mounted ? formatValue(value) : '...'}
        </p>
        {renderTrendIcon()}
      </div>
    </div>
  );
}; 