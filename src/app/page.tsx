"use client";

import dynamic from 'next/dynamic';
import { Carregando } from '../components/LoadingSpinner';

const HomeContent = dynamic(() => import('../components/HomeContent'), { 
  ssr: false,
  loading: () => <Carregando />
});

export default function Home() {
  return <HomeContent />;
}