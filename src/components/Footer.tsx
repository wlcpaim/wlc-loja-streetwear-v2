import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#09090b] border-t border-[#27272a] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#27272a]">
          {/* Col 1: Brand */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[#f43f5e] flex items-center justify-center font-black text-white text-lg tracking-wider">
                W
              </div>
              <span className="text-xl font-extrabold tracking-wider text-[#fafafa]">
                WLC<span className="text-[#f43f5e]">STORE</span>
              </span>
            </div>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Moda urbana e streetwear de alta qualidade para quem dita as regras do próprio estilo. Peças exclusivas com edição limitada.
            </p>
            <div className="flex items-center space-x-3 text-[#a1a1aa]">
              <a href="#" className="w-9 h-9 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center hover:text-[#f43f5e] hover:border-[#f43f5e]/50 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center hover:text-[#f43f5e] hover:border-[#f43f5e]/50 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center hover:text-[#f43f5e] hover:border-[#f43f5e]/50 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#fafafa]">Categorias</h4>
            <ul className="space-y-2 text-xs text-[#a1a1aa]">
              <li><a href="#" className="hover:text-[#f43f5e] transition-colors">Camisetas Oversized</a></li>
              <li><a href="#" className="hover:text-[#f43f5e] transition-colors">Moletons Heavyweight</a></li>
              <li><a href="#" className="hover:text-[#f43f5e] transition-colors">Calças Cargo Techwear</a></li>
              <li><a href="#" className="hover:text-[#f43f5e] transition-colors">Tênis Runner Apex</a></li>
              <li><a href="#" className="hover:text-[#f43f5e] transition-colors">Acessórios Street</a></li>
            </ul>
          </div>

          {/* Col 3: Help */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#fafafa]">Atendimento</h4>
            <ul className="space-y-2 text-xs text-[#a1a1aa]">
              <li><a href="#" className="hover:text-[#f43f5e] transition-colors">Rastrear Pedido</a></li>
              <li><a href="#" className="hover:text-[#f43f5e] transition-colors">Política de Trocas</a></li>
              <li><a href="#" className="hover:text-[#f43f5e] transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-[#f43f5e] transition-colors">Fale Conosco</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#fafafa]">Newsletter WLC Club</h4>
            <p className="text-xs text-[#a1a1aa]">Cadastre-se para receber 15% de desconto na primeira compra e drops secretos.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Inscrição realizada com sucesso!'); }} className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-2.5 text-xs text-[#fafafa] focus:outline-none focus:border-[#f43f5e]"
              />
              <button
                type="submit"
                className="bg-[#f43f5e] hover:bg-[#e11d48] text-white px-4 py-2.5 rounded-xl transition-all shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#71717a] gap-4">
          <p>© 2025 WLC Store. Todos os direitos reservados.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-[#fafafa]">Termos de Uso</a>
            <a href="#" className="hover:text-[#fafafa]">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
