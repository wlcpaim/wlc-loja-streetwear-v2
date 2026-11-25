import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, QrCode, ShieldCheck, ArrowLeft, Lock } from 'lucide-react';
import { CartItem, CheckoutData } from '../types/store';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onFinish: (data: CheckoutData) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onFinish,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<CheckoutData>({
    name: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    city: '',
    state: '',
    paymentMethod: 'pix',
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 250 ? 0 : 25.0;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep((step + 1) as any);
    else onFinish(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#121215] border border-[#27272a] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#27272a] bg-[#18181b]">
          <div className="flex items-center space-x-2">
            {step > 1 && (
              <button
                onClick={() => setStep((step - 1) as any)}
                className="p-1.5 text-[#a1a1aa] hover:text-[#fafafa] rounded-lg transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h3 className="text-base font-bold text-[#fafafa]">Checkout WLC Store</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#a1a1aa] hover:text-[#fafafa] rounded-lg hover:bg-[#27272a] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Bar */}
        <div className="grid grid-cols-3 border-b border-[#27272a] bg-[#09090b] text-center text-xs font-semibold">
          <div className={`py-3 border-b-2 ${step >= 1 ? 'border-[#f43f5e] text-[#f43f5e]' : 'border-transparent text-[#71717a]'}`>
            1. Identificação
          </div>
          <div className={`py-3 border-b-2 ${step >= 2 ? 'border-[#f43f5e] text-[#f43f5e]' : 'border-transparent text-[#71717a]'}`>
            2. Endereço
          </div>
          <div className={`py-3 border-b-2 ${step >= 3 ? 'border-[#f43f5e] text-[#f43f5e]' : 'border-transparent text-[#71717a]'}`>
            3. Pagamento
          </div>
        </div>

        {/* Content form */}
        <form onSubmit={handleNext} className="p-6 overflow-y-auto space-y-4 flex-grow">
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="text-sm font-semibold text-[#a1a1aa]">Informações Pessoais</h4>
              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Nome Completo</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Gabriel Silva"
                  className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-3 text-sm text-[#fafafa] focus:outline-none focus:border-[#f43f5e]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">E-mail</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="gabriel@email.com"
                  className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-3 text-sm text-[#fafafa] focus:outline-none focus:border-[#f43f5e]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Telefone / WhatsApp</label>
                <input
                  required
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                  className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-3 text-sm text-[#fafafa] focus:outline-none focus:border-[#f43f5e]"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="text-sm font-semibold text-[#a1a1aa]">Endereço de Entrega</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#a1a1aa] mb-1">CEP</label>
                  <input
                    required
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    placeholder="00000-000"
                    className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-3 text-sm text-[#fafafa] focus:outline-none focus:border-[#f43f5e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Número</label>
                  <input
                    required
                    type="text"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-3 text-sm text-[#fafafa] focus:outline-none focus:border-[#f43f5e]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Endereço / Rua</label>
                <input
                  required
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Av. Paulista"
                  className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-3 text-sm text-[#fafafa] focus:outline-none focus:border-[#f43f5e]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Cidade</label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="São Paulo"
                    className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-3 text-sm text-[#fafafa] focus:outline-none focus:border-[#f43f5e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Estado (UF)</label>
                  <input
                    required
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="SP"
                    className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-3 text-sm text-[#fafafa] focus:outline-none focus:border-[#f43f5e]"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="text-sm font-semibold text-[#a1a1aa]">Forma de Pagamento</h4>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex flex-col items-center justify-center p-4 rounded-2xl border cursor-pointer transition-all ${formData.paymentMethod === 'pix' ? 'bg-[#f43f5e]/10 border-[#f43f5e] text-white' : 'bg-[#18181b] border-[#27272a] text-[#a1a1aa]'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pix"
                    checked={formData.paymentMethod === 'pix'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'pix' })}
                    className="hidden"
                  />
                  <QrCode className="w-8 h-8 mb-2 text-[#f43f5e]" />
                  <span className="text-sm font-bold">PIX (5% OFF)</span>
                </label>

                <label className={`flex flex-col items-center justify-center p-4 rounded-2xl border cursor-pointer transition-all ${formData.paymentMethod === 'credit' ? 'bg-[#f43f5e]/10 border-[#f43f5e] text-white' : 'bg-[#18181b] border-[#27272a] text-[#a1a1aa]'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit"
                    checked={formData.paymentMethod === 'credit'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'credit' })}
                    className="hidden"
                  />
                  <CreditCard className="w-8 h-8 mb-2 text-[#f43f5e]" />
                  <span className="text-sm font-bold">Cartão de Crédito</span>
                </label>
              </div>

              {/* Summary box */}
              <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-4 space-y-2 mt-4">
                <div className="flex justify-between text-xs text-[#a1a1aa]">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#a1a1aa]">
                  <span>Frete</span>
                  <span>{shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#fafafa] pt-2 border-t border-[#27272a]">
                  <span>Total a Pagar</span>
                  <span className="text-[#f43f5e]">R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-4 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs text-[#71717a]">
              <Lock className="w-3.5 h-3.5" />
              <span>Ambiente 100% Seguro</span>
            </div>
            <button
              type="submit"
              className="bg-[#f43f5e] hover:bg-[#e11d48] text-white text-xs font-semibold px-6 py-3 rounded-full transition-all flex items-center space-x-2"
            >
              <span>{step === 3 ? 'Finalizar Pedido' : 'Continuar'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
