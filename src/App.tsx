import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuPeekSection } from './components/MenuPeekSection';
import { TheVibeSection } from './components/TheVibeSection';
import { LocationsSection } from './components/LocationsSection';
import { ItemDetailModal } from './components/ItemDetailModal';
import { Footer } from './components/Footer';
import { MenuItem, ThemeMode } from './types';

export const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('day');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'day' ? 'night' : 'day'));
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
        themeMode === 'night' ? 'bg-[#1E231B] text-[#F7F5F0]' : 'bg-[#F7F5F0] text-[#3E453A]'
      }`}
    >
      {/* Navigation with Day-to-Night Toggle */}
      <Navbar
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        onNavigate={scrollToSection}
      />

      {/* Main Page Flow */}
      <main>
        {/* Hero Section: Split-screen with Sunrise Hover Archway */}
        <HeroSection
          themeMode={themeMode}
          onExploreMenu={() => scrollToSection('menu-peek')}
          onViewLocations={() => scrollToSection('locations')}
        />

        {/* The "Menu Peek" Tabs: Food, Drinks, Pastries */}
        <MenuPeekSection
          themeMode={themeMode}
          onSelectItem={(item) => setSelectedItem(item)}
        />

        {/* About / The Vibe: 3-column Sage Green Grid */}
        <TheVibeSection />

        {/* Locations: Split Camalig & Legazpi side-by-side */}
        <LocationsSection themeMode={themeMode} />
      </main>

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        themeMode={themeMode}
      />

      {/* Footer: Centered Email and Mobile Credentials */}
      <Footer themeMode={themeMode} onScrollToTop={scrollToTop} />
    </div>
  );
};

export default App;
