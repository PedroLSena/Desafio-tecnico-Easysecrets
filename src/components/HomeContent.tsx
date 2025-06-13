"use client";

import { motion } from "framer-motion";

const HomeContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen py-12"
    >
      <section className="text-center mb-16 px-4">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-bold mb-4"
        >
          Gerency
        </motion.h1>
        <motion.p
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-gray-700 max-w-2xl mx-auto"
        >
          Transforme seus dados de vendas em insights visuais poderosos com gráficos interativos e análises inteligentes que impulsionam seus negócios.
        </motion.p>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center gap-4 mt-8"
        >
          <button className="px-6 py-3 border rounded-md shadow-sm hover:bg-gray-50">Dashboard</button>
          <button className="px-6 py-3 border rounded-md shadow-sm hover:bg-gray-50">Produtos</button>
        </motion.div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white p-8 rounded-lg shadow-md text-center"
        >
          <div className="mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-6"/></svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">Gráficos Interativos</h3>
          <p className="text-gray-600">Visualize dados com gráficos de linha, barras e área completamente interativos</p>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-white p-8 rounded-lg shadow-md text-center"
        >
          <div className="mb-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">Gestão Completa</h3>
          <p className="text-gray-600">CRUD completo para produtos com interface intuitiva e responsiva</p>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="bg-white p-8 rounded-lg shadow-md text-center"
        >
          <div className="mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.79 1.1L21 9"/><path d="M12 3v6"/></svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">Análises Avançadas</h3>
          <p className="text-gray-600">Métricas de crescimento, médias e identificação dos melhores produtos</p>
        </motion.div>
      </section>

      <section className="bg-gray-100 w-full py-16 mb-16 px-4 text-center">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="text-4xl font-bold mb-4"
        >
          Resultados Impressionantes
        </motion.h2>
        <motion.p
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="text-lg text-gray-700 mb-8"
        >
          Números que demonstram o poder da visualização de dados
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="p-8 rounded-lg shadow-md bg-white"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-6"/></svg>
            </div>
            <p className="text-3xl font-bold">400+</p>
            <p className="text-gray-600">Dados Processados</p>
          </motion.div>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="p-8 rounded-lg shadow-md bg-white"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <p className="text-3xl font-bold">700+</p>
            <p className="text-gray-600">Produtos Analisados</p>
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            className="p-8 rounded-lg shadow-md bg-white"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.79 1.1L21 9"/><path d="M12 3v6"/></svg>
            </div>
            <p className="text-3xl font-bold">200+</p>
            <p className="text-gray-600">Produtos Gerenciados</p>
          </motion.div>
        </div>
      </section>

      <section className="text-center px-4">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.4 }}
          className="text-4xl font-bold mb-4"
        >
          Vamos lá ?
        </motion.h2>
        <motion.p
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.6 }}
          className="text-lg text-gray-700 max-w-2xl mx-auto mb-8"
        >
          Experimente agora mesmo e descubra como nossos gráficos podem transformar a forma como você visualiza seus dados de vendas.
        </motion.p>
        <motion.button
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.8 }}
          className="px-8 py-4 bg-black text-white rounded-md shadow-lg hover:bg-gray-800"
        >
          Dashboard
        </motion.button>
      </section>
    </motion.div>
  );
};

export default HomeContent; 