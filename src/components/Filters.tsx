import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import { Category, SortOption } from '../types/store';

interface FiltersProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalProducts: number;
}

export const Filters: React.FC<FiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  totalProducts,
}) => {
  const categories: Category[] = ['Todos', 'Camisetas', 'Moletons', 'Calças', 'Tênis', 'Acessórios'];

  return (
    <div className="bg-[#09090b] py-6 border-b border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Category Chips (Mobile scrollable, Desktop flex) */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <div className="flex items-center text-[#a1a1aa] mr-2 shrink-0">
              <Filter className="w-4 h-4 mr-1.5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Filtrar:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#f43f5e] text-white shadow-md shadow-[#f43f5e]/20'
                    : 'bg-[#18181b] text-[#a1a1aa] hover:bg-[#27272a] hover:text-[#fafafa] border border-[#27272a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count & Sort Selector */}
          <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
            <span className="text-xs text-[#a1a1aa]">
              Mostrando <strong className="text-[#fafafa]">{totalProducts}</strong> peças
            </span>

            <div className="flex items-center bg-[#18181b] border border-[#27272a] rounded-full px-3 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#a1a1aa] mr-2" />
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="bg-transparent text-xs text-[#fafafa] focus:outline-none cursor-pointer"
              >
                <option value="popular" className="bg-[#18181b] text-[#fafafa]">Mais Populares</option>
                <option value="price-asc" className="bg-[#18181b] text-[#fafafa]">Menor Preço</option>
                <option value="price-desc" className="bg-[#18181b] text-[#fafafa]">Maior Preço</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};