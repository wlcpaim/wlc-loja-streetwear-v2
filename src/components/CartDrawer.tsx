import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Truck, Tag } from 'lucide-react';
import { CartItem } from '../types/store';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [cep, setCep] = useState('');
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 250;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCalculateShipping = () => {
    if (cep.length >= 8) {
      setShippingCost(subtotal > 250 ? 0 : 25.00);
    }
  };

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'WLC10') {
      setDiscount(0.10); // 10% off
      setCouponError('');
    } else {
      setCouponError('Cupom inválido');
    }
  };

  const discountAmount = subtotal * discount;
  const finalShipping = shippingCost !== null ? (subtotal > 250 ? 0 : shippingCost) : 0;
  const total = subtotal - discountAmount + finalShipping;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[#18181b] border-l border-[#27272a] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#27272a] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-[#fafafa]">Seu Carrinho</h2>
              <span className="bg-[#f43f5e] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                {items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-[#a1a1aa] hover:text-[#fafafa] p-1.5 rounded-lg hover:bg-[#27272a] transition-colors"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#09090b] p-4 border-b border-[#27272a]">
            <div className="flex items-center space-x-2 text-xs text-[#a1a1aa] mb-2">
              <Truck className="w-4 h-4 text-[#f43f5e]" />
              {remainingForFreeShipping > 0 ? (
                <span>Adicione mais <strong className="text-[#fafafa]">R$ {remainingForFreeShipping.toFixed(2).replace('.', ',')}</strong> para ganhar <strong className="text-emerald-400">Frete Grátis!</strong></span>
              ) : (
                <span className="text-emerald-400 font-bold">Parabéns! Você ganhou Frete Grátis!</span>
              )}
            </div>
            <div className="w-full bg-[#27272a] h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 to-emerald-500 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-sm text-[#a1a1aa]">Seu carrinho está vazio.</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-4 p-3 bg-[#09090b] border border-[#27272a] rounded-xl relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg border border-[#27272a]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-[#fafafa] line-clamp-1">{item.product.name}</h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                          className="text-[#a1a1aa] hover:text-rose-400 p-1 transition-colors"
                          aria-label="Remover item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#f43f5e] font-semibold">Tamanho: {item.selectedSize}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#27272a] rounded-lg bg-[#18181b]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                          className="p-1 text-[#a1a1aa] hover:text-white"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#fafafa]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                          className="p-1 text-[#a1a1aa] hover:text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-xs font-extrabold text-[#fafafa]">
                        R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Controls & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#27272a] bg-[#09090b] space-y-4">
              {/* Shipping simulator */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Digite seu CEP"
                  value={cep}
                  maxLength={8}
                  onChange={(e) => setCep(e.target.value)}
                  className="flex-1 bg-[#18181b] border border-[#27272a] rounded-xl px-3 py-2 text-xs text-[#fafafa] focus:outline-none focus:border-[#f43f5e]"
                />
                <button
                  onClick={handleCalculateShipping}
                  className="bg-[#27272a] hover:bg-[#3f3f46] text-[#fafafa] text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                >
                  Calcular
                </button>
              </div>
              {shippingCost !== null && (
                <p className="text-[11px] text-[#a1a1aa]">
                  Frete: <strong className="text-[#fafafa]">{shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}</strong>
                </p>
              )}

              {/* Coupon input */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#a1a1aa]" />
                  <input
                    type="text"
                    placeholder="Cupom (ex: WLC10)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="w-full bg-[#18181b] border border-[#27272a] rounded-xl pl-9 pr-3 py-2 text-xs text-[#fafafa] uppercase focus:outline-none focus:border-[#f43f5e]"
                  />
                </div>
                <button
                  onClick={handleApplyCoupon}
                  className="bg-[#27272a] hover:bg-[#3f3f46] text-[#fafafa] text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                >
                  Aplicar
                </button>
              </div>
              {couponError && <p className="text-[10px] text-rose-500">{couponError}</p>}
              {discount > 0 && <p className="text-[10px] text-emerald-400">Cupom WLC10 aplicado (-10%)</p>}

              {/* Summary Totals */}
              <div className="space-y-1.5 pt-2 border-t border-[#27272a] text-xs">
                <div className="flex justify-between text-[#a1a1aa]">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Desconto</span>
                    <span>- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-[#fafafa] pt-2">
                  <span>Total</span>
                  <span className="text-[#f43f5e]">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-[#f43f5e] hover:bg-[#e11d48] text-white font-semibold py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-[#f43f5e]/25"
              >
                <span>Finalizar Pedido</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};