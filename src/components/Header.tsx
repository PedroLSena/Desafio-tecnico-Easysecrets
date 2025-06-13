"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  
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
          className={mobile ? "w-full" : ""}
        >
          <Button
            variant={pathname === path ? "default" : "ghost"}
            size="sm"
            className={`flex items-center gap-2 ${mobile ? 'w-full justify-start' : ''}`}
          >
            <span>{label}</span>
          </Button>
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="p-2 rounded-lg to-cyan-500">
            {/* <Image 
              src="/logo.png" 
              alt="Gerency Logo" 
              width={24} 
              height={24}
            /> */}
          </div>
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
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
}