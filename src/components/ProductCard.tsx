import React, { useState } from 'react';
import { ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../types/store';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const tagColors = {
    Novidade: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Oferta: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    Limitado: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };

  return (
    <div className="group bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-[#f43f5e]/50 hover:shadow-xl hover:shadow-[#f43f5e]/5">
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#27272a]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Tag badge */}
        {product.tag && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${
            tagColors[product.tag]
          }`}>
            {product.tag}
          </span>
        )}

        {/* Quick size overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#09090b]/90 via-[#09090b]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
          <div className="flex justify-center gap-1">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                  selectedSize === size
                    ? 'bg-[#f43f5e] text-white'
                    : 'bg-[#27272a]/80 text-[#a1a1aa] hover:text-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content info */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-[#a1a1aa] mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px] text-[#f43f5e]">
              {product.category}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-[#fafafa] font-medium">{product.rating}</span>
              <span>({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-[#fafafa] line-clamp-1 group-hover:text-[#f43f5e] transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-base font-extrabold text-[#fafafa]">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#a1a1aa] line-through">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-[#27272a] hover:bg-[#f43f5e] text-[#fafafa]'
            }`}
            aria-label="Adicionar ao carrinho"
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Adicionado</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Comprar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};