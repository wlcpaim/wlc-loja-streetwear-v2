import React from 'react';
import { Product } from '../types/store';
import { ProductCard } from './ProductCard';
import { Search } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, size: string) => void;
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  onResetFilters,
}) => {
  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-[#18181b] border border-[#27272a] rounded-full flex items-center justify-center mx-auto mb-4 text-[#a1a1aa]">
          <Search className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-[#fafafa] mb-1">Nenhuma peça encontrada</h3>
        <p className="text-sm text-[#a1a1aa] mb-6">Tente buscar por outro termo ou categoria.</p>
        <button
          onClick={onResetFilters}
          className="bg-[#f43f5e] hover:bg-[#e11d48] text-white text-xs font-semibold px-6 py-3 rounded-full transition-all"
        >
          Limpar Filtros
        </button>
      </div>
    );
  }

  return (
    <section className="py-12 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
