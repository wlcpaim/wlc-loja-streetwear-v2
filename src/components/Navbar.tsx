import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { Category } from '../types/store';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories: Category[] = ['Todos', 'Camisetas', 'Moletons', 'Calças', 'Tênis', 'Acessórios'];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#09090b]/90 backdrop-blur-md border-b border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#a1a1aa] hover:text-[#fafafa] p-1"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <a href="#" className="flex items-center space-x-2">
              <span className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-white via-zinc-200 to-rose-500 bg-clip-text text-transparent">
                WLC<span className="text-[#f43f5e]">.</span>
              </span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`text-sm font-medium transition-colors hover:text-[#f43f5e] ${
                  selectedCategory === cat ? 'text-[#f43f5e] font-semibold' : 'text-[#a1a1aa]'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar Toggle */}
            <div className="relative hidden sm:flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-[#a1a1aa]" />
              <input
                type="text"
                placeholder="Buscar peças..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-48 lg:w-64 bg-[#18181b] border border-[#27272a] rounded-full pl-9 pr-4 py-1.5 text-sm text-[#fafafa] placeholder-[#a1a1aa] focus:outline-none focus:border-[#f43f5e] transition-all"
              />
            </div>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="sm:hidden text-[#a1a1aa] hover:text-[#fafafa] p-2"
              aria-label="Pesquisar"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist icon placeholder */}
            <button className="hidden sm:flex text-[#a1a1aa] hover:text-[#f43f5e] p-2 transition-colors">
              <Heart className="w-5 h-5" />
            </button>

            {/* Cart Button with Badge */}
            <button
              onClick={onOpenCart}
              className="relative bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-[#fafafa] p-2.5 rounded-full flex items-center justify-center transition-all"
              aria-label="Carrinho de Compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#f43f5e] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search input expand */}
        {searchOpen && (
          <div className="sm:hidden pb-4 pt-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#a1a1aa]" />
              <input
                type="text"
                placeholder="Buscar peças..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#18181b] border border-[#27272a] rounded-full pl-9 pr-4 py-2 text-sm text-[#fafafa] placeholder-[#a1a1aa] focus:outline-none focus:border-[#f43f5e]"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#27272a] flex flex-col space-y-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-base font-medium px-2 py-1.5 rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#f43f5e]/10 text-[#f43f5e]'
                    : 'text-[#a1a1aa] hover:bg-[#18181b]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};