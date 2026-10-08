import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuPeekSection } from './components/MenuPeekSection';
import { TheVibeSection } from './components/TheVibeSection';
import { TheAldawMomentsSection } from './components/TheAldawMomentsSection';
import { LocationsSection } from './components/LocationsSection';
import { ItemDetailModal } from './components/ItemDetailModal';
import { FullMenuModal } from './components/FullMenuModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FloatingGameButton } from './components/FloatingGameButton';
import { CafeAldawGame } from './components/game/CafeAldawGame';
import { Footer } from './components/Footer';
import { MenuItem, ThemeMode, CartItem } from './types';
import { loadCartFromStorage, saveCartToStorage } from './utils/cartStorage';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'game'>('home');
  const [themeMode, setThemeMode] = useState<ThemeMode>('day');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);

  // Cart & Checkout state (cached in browser localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => loadCartFromStorage());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to browser localStorage
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'day' ? 'night' : 'day'));
  };

  const handleOpenGame = () => {
    setCurrentView('game');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to Cart handler
  const handleAddToCart = (
    item: MenuItem,
    quantity = 1,
    option?: 'hot' | 'ice' | '16oz' | '22oz',
    unitPrice?: number
  ) => {
    const finalPrice = unitPrice ?? item.price;
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.item.id === item.id && ci.selectedOption === option
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [
        ...prev,
        {
          item,
          quantity,
          selectedOption: option,
          unitPrice: finalPrice,
        },
      ];
    });

    setToastMessage(`Added ${quantity}x ${item.name} to your Tray`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Quick Checkout directly from item modal
  const handleQuickCheckout = (
    item: MenuItem,
    quantity = 1,
    option?: 'hot' | 'ice' | '16oz' | '22oz',
    unitPrice?: number
  ) => {
    handleAddToCart(item, quantity, option, unitPrice);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Update quantity in cart
  const handleUpdateQuantity = (itemIndex: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev];
      const target = next[itemIndex];
      if (!target) return prev;
      const newQty = target.quantity + delta;
      if (newQty <= 0) {
        return next.filter((_, idx) => idx !== itemIndex);
      }
      target.quantity = newQty;
      return next;
    });
  };

  // Remove single item from cart
  const handleRemoveItem = (itemIndex: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== itemIndex));
  };

  // Proceed to Checkout
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // On successful simulated order
  const handleOrderSuccess = () => {
    setCart([]); // Clear cart
  };

  // If viewing the Cafe Aldaw Game
  if (currentView === 'game') {
    return <CafeAldawGame onBackToHome={handleBackToHome} />;
  }

  // Otherwise, render the main Cafe Aldaw Sanctuary Experience
  return (
    <div
      className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
        themeMode === 'night' ? 'bg-[#1E231B] text-[#F7F5F0]' : 'bg-[#F7F5F0] text-[#3E453A]'
      }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#7A8974] text-white px-5 py-2.5 rounded-full shadow-2xl text-xs font-semibold tracking-wide flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200"
          role="status"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation with Live Tray Counter and Play Game Button */}
      <Navbar
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        onNavigate={scrollToSection}
        onPlayGame={handleOpenGame}
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Page Flow */}
      <main>
        {/* Hero Section: Split-screen with Sunrise Hover Archway */}
        <HeroSection
          themeMode={themeMode}
          onExploreMenu={() => scrollToSection('menu-peek')}
          onViewLocations={() => scrollToSection('locations')}
        />

        {/* The "Menu Peek" Tabs: 100% Tailored to Cafe Aldaw's Menu */}
        <MenuPeekSection
          themeMode={themeMode}
          onSelectItem={(item) => setSelectedItem(item)}
          onOpenFullMenu={() => setIsFullMenuOpen(true)}
          onAddToCart={(item) => handleAddToCart(item, 1)}
        />

        {/* About / The Vibe: 3-column Sage Green Grid */}
        <TheVibeSection />

        {/* The Aldaw Moments: 8-Image Courtyard Gallery */}
        <TheAldawMomentsSection themeMode={themeMode} />

        {/* Locations: Split Camalig & Legazpi side-by-side */}
        <LocationsSection themeMode={themeMode} />
      </main>

      {/* Minimalist Floating Button: Play the Cafe Aldaw Game */}
      <FloatingGameButton
        onPlayGame={handleOpenGame}
        themeMode={themeMode}
      />

      {/* Floating Proceed to Checkout Pill (Active when items are in tray) */}
      {totalCartCount > 0 && (
        <aside
          aria-label="Order Tray Checkout Bar"
          className="fixed bottom-6 left-6 z-40 select-none animate-in slide-in-from-bottom-4 duration-300"
        >
          <button
            onClick={() => setIsCheckoutOpen(true)}
            type="button"
            className={`flex items-center gap-3 px-5 py-3.5 rounded-full shadow-2xl border transition-all duration-300 hover:scale-105 active:scale-95 ${
              themeMode === 'night'
                ? 'bg-[#2A3226] text-[#F7F5F0] border-[#B89C82]/60 hover:bg-[#343E30]'
                : 'bg-[#7A8974] text-[#F7F5F0] border-white/60 hover:bg-[#63715D]'
            }`}
            title="Proceed directly to Checkout"
          >
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-2 bg-[#B89C82] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold uppercase tracking-wider">
                Proceed to Checkout
              </span>
              <span className="text-[10px] opacity-90 font-mono">
                ₱{cart.reduce((a, b) => a + b.unitPrice * b.quantity, 0)} • Tap to Settle
              </span>
            </div>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>
        </aside>
      )}

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
        onQuickCheckout={handleQuickCheckout}
        themeMode={themeMode}
      />

      {/* Complete Digital Menu Modal */}
      <FullMenuModal
        isOpen={isFullMenuOpen}
        onClose={() => setIsFullMenuOpen(false)}
        onSelectItem={(item) => setSelectedItem(item)}
        onAddToCart={(item) => handleAddToCart(item, 1)}
        onOpenCart={() => setIsCartOpen(true)}
        cartItemCount={totalCartCount}
        themeMode={themeMode}
      />

      {/* Slide-out Order Tray Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        themeMode={themeMode}
      />

      {/* Checkout Modal: Customer Details + COD & QR Payment Simulation */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderSuccess={handleOrderSuccess}
        themeMode={themeMode}
      />

      {/* Footer: Centered Email and Mobile Credentials */}
      <Footer themeMode={themeMode} onScrollToTop={scrollToTop} />
    </div>
  );
};

export default App;
