"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Início' },
    { path: '/produtos', label: 'Produtos' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map(({ path, label }) => (
        <Link 
          key={path} 
          href={path}
          onClick={() => mobile && setIsOpen(false)}
          className={mobile 
            ? "w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 block"
            : `relative px-3 py-2 text-sm font-medium rounded-md ${pathname === path ? "text-black" : "text-gray-700 hover:text-gray-900"}`}
        >
          <span className="relative z-10">
            {label}
            {pathname === path && (
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform translate-y-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              ></motion.span>
            )}
          </span>
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-xl font-bold">
            Gerency
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <nav className="container mx-auto px-4 py-2 space-y-1">
            <NavLinks mobile />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;