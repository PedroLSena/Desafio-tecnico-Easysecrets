import React from 'react';
import { FaEnvelope, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-800 py-8 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center md:items-start">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2">Nossas Redes</h3>
          <div className="space-y-2">
            <a href="#" className="flex items-center justify-center md:justify-start text-gray-700 hover:text-gray-900">
              <FaEnvelope className="mr-2" /> @Gerency
            </a>
            <a href="#" className="flex items-center justify-center md:justify-start text-gray-700 hover:text-gray-900">
              <FaInstagram className="mr-2" /> @Gerency
            </a>
            <a href="#" className="flex items-center justify-center md:justify-start text-gray-700 hover:text-gray-900">
              <FaLinkedin className="mr-2" /> @Gerency
            </a>
          </div>
        </div>

        <div className="text-center md:text-right max-w-md">
          <h3 className="text-lg font-semibold mb-2">Gerency</h3>
          <p className="text-gray-700">
            Transforme seus dados de vendas em insights visuais poderosos com gráficos interativos e análises inteligentes que impulsionam seus negócios.
          </p>
        </div>
      </div>

      <div className="text-center text-gray-600 mt-8 text-sm">
        ©2025 Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
