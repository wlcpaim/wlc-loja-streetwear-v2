import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Filters } from './components/Filters';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Category, SortOption, Product, CartItem, CheckoutData } from './types/store';
import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [shippingValue, setShippingValue] = useState(0);

  // Add to Cart
  const handleAddToCart = (product: Product, size: string) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { product, selectedSize, quantity: 1 }];
    });
  };

  // Update quantity
  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.selectedSize === size) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  // Remove item
  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size)));
  };

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'Todos') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, sortBy, searchQuery]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleFinishCheckout = (data: CheckoutData) => {
    alert(`Pedido realizado com sucesso, ${data.name}! Enviaremos os detalhes para ${data.email}.`);
    setCartItems([]);
    setCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col selection:bg-[#f43f5e] selection:text-white">
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-grow">
        <Hero onShopNow={() => {
          const gridEl = document.getElementById('catalogo');
          gridEl?.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* Features Bar */}
        <section className="border-b border-[#27272a] bg-[#121215] py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#f43f5e]/10 border border-[#f43f5e]/20 flex items-center justify-center text-[#f43f5e] shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#fafafa]">Frete Grátis</h4>
                  <p className="text-xs text-[#a1a1aa]">Acima de R$ 250</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#fafafa]">Compra Segura</h4>
                  <p className="text-xs text-[#a1a1aa]">Ambiente criptografado</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#fafafa]">Primeira Troca Grátis</h4>
                  <p className="text-xs text-[#a1a1aa]">Até 30 dias para trocar</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#fafafa]">Suporte VIP</h4>
                  <p className="text-xs text-[#a1a1aa]">Atendimento via WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="catalogo">
          <Filters
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalProducts={filteredProducts.length}
          />

          <ProductGrid
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            onResetFilters={() => {
              setSelectedCategory('Todos');
              setSearchQuery('');
            }}
          />
        </div>
      </main>

      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems}
        onFinish={handleFinishCheckout}
      />
    </div>
  );
}
