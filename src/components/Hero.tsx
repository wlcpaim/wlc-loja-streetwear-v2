import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Tag } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <div className="relative overflow-hidden bg-[#09090b] border-b border-[#27272a]">
      {/* Glowing background effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#f43f5e]/15 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-[#18181b] border border-[#27272a] px-3 py-1 rounded-full text-xs font-medium text-[#f43f5e]">
              <Tag className="w-3.5 h-3.5" />
              <span>Coleção Outono/Inverno 2025 Disponível</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#fafafa] leading-[1.1]">
              Moda Urbana que <br />
              <span className="bg-gradient-to-r from-[#f43f5e] to-rose-400 bg-clip-text text-transparent">
                Define o Seu Estilo
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#a1a1aa] max-w-xl mx-auto lg:mx-0">
              Peças exclusivas de alta gramatura, design vanguardista e conforto absoluto para quem domina as ruas.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onShopNow}
                className="w-full sm:w-auto bg-[#f43f5e] hover:bg-[#e11d48] text-white font-semibold px-8 py-4 rounded-full flex items-center justify-center space-x-2 transition-all shadow-lg shadow-[#f43f5e]/25 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explorar Coleção</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Features trust badges */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 pt-8 border-t border-[#27272a] max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-center text-[#f43f5e]">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#fafafa]">Frete Grátis</h4>
                  <p className="text-[11px] text-[#a1a1aa]">Acima de R$ 250</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-center text-[#f43f5e]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#fafafa]">Compra Segura</h4>
                  <p className="text-[11px] text-[#a1a1aa]">PIX ou Cartão</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none aspect-[4/5] rounded-3xl overflow-hidden border border-[#27272a] shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop"
                alt="Streetwear Model WLC"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-[#f43f5e] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Destaque
                </span>
                <h3 className="text-xl font-bold text-[#fafafa] mt-2">Hoodie Industrial Edition</h3>
                <p className="text-sm text-[#a1a1aa]">Edição limitada numerada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};