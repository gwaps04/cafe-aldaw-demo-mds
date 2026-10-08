import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuPeekSection } from './components/MenuPeekSection';
import { TheVibeSection } from './components/TheVibeSection';
import { TheAldawMomentsSection } from './components/TheAldawMomentsSection';
import { LocationsSection } from './components/LocationsSection';
import { ItemDetailModal } from './components/ItemDetailModal';
import { FullMenuModal } from './components/FullMenuModal';
import { FloatingGameButton } from './components/FloatingGameButton';
import { CafeAldawGame } from './components/game/CafeAldawGame';
import { Footer } from './components/Footer';
import { MenuItem, ThemeMode } from './types';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'game'>('home');
  const [themeMode, setThemeMode] = useState<ThemeMode>('day');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);

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
      {/* Navigation with Day-to-Night Toggle and Play Game Button */}
      <Navbar
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        onNavigate={scrollToSection}
        onPlayGame={handleOpenGame}
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

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        themeMode={themeMode}
      />

      {/* Complete Digital Menu Modal */}
      <FullMenuModal
        isOpen={isFullMenuOpen}
        onClose={() => setIsFullMenuOpen(false)}
        onSelectItem={(item) => setSelectedItem(item)}
        themeMode={themeMode}
      />

      {/* Footer: Centered Email and Mobile Credentials */}
      <Footer themeMode={themeMode} onScrollToTop={scrollToTop} />
    </div>
  );
};

export default App;
