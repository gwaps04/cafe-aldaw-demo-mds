import React, { useState } from 'react';
import { ASSET_IMAGES } from '../data/assets';
import { ThemeMode } from '../types';
import { Sun, Moon, Menu, X, Coffee, MapPin, Gamepad2 } from 'lucide-react';

interface NavbarProps {
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  onNavigate: (sectionId: string) => void;
  onPlayGame?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  themeMode,
  onToggleTheme,
  onNavigate,
  onPlayGame,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isNight = themeMode === 'night';

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Menu Peek', id: 'menu-peek' },
    { label: 'The Vibe', id: 'vibe' },
    { label: 'Moments', id: 'moments' },
    { label: 'Locations', id: 'locations' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 border-b backdrop-blur-md ${
        isNight
          ? 'bg-[#1E231B]/90 border-[#3E453A]/40 text-[#F7F5F0]'
          : 'bg-[#F7F5F0]/90 border-[#B89C82]/20 text-[#3E453A]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo on the Left */}
          <div
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {ASSET_IMAGES.logo ? (
              <img
                src={encodeURI(ASSET_IMAGES.logo)}
                alt="Cafe Aldaw Logo"
                className="w-11 h-11 rounded-full object-cover border border-[#B89C82]/30 group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : null}

            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight flex items-center gap-1.5">
                Cafe Aldaw
                <span
                  className={`inline-block w-2 h-2 rounded-full transition-colors ${
                    isNight ? 'bg-[#EED5B7]' : 'bg-[#7A8974]'
                  }`}
                  aria-hidden="true"
                />
              </span>
              <span
                className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${
                  isNight ? 'text-[#B89C82]' : 'text-[#7A8974]'
                }`}
              >
                Sunrise & Oasis Sanctuary
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 hover:text-[#7A8974] ${
                  isNight ? 'hover:text-[#EED5B7]' : ''
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Day-to-Night Toggle Button */}
            <button
              onClick={onToggleTheme}
              type="button"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-xs border ${
                isNight
                  ? 'bg-[#2A3125] text-[#EED5B7] border-[#B89C82]/40 hover:bg-[#343C2E]'
                  : 'bg-[#EFECE4] text-[#3E453A] border-[#B89C82]/30 hover:bg-[#E5E0D4]'
              }`}
              title={isNight ? 'Switch to Bright Aldaw (Day)' : 'Switch to Cozy Evening (Night)'}
              aria-label="Toggle theme mode"
            >
              {isNight ? (
                <div className="flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-[#EED5B7]" />
                  <span>Gabi (Night)</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-[#B89C82]" />
                  <span>Aldaw (Sun)</span>
                </div>
              )}
            </button>

            {/* Play Game Button */}
            {onPlayGame && (
              <button
                onClick={onPlayGame}
                type="button"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-xs border ${
                  isNight
                    ? 'bg-[#2A3125] text-[#EED5B7] border-[#B89C82]/40 hover:bg-[#343C2E]'
                    : 'bg-[#FAF8F5] text-[#7A8974] border-[#7A8974]/30 hover:bg-[#F2ECE3]'
                }`}
                title="Play Cafe Aldaw Game"
              >
                <Gamepad2 className="w-3.5 h-3.5 text-[#B89C82]" />
                <span>Play Game</span>
              </button>
            )}

            {/* Quick Action Button */}
            <button
              onClick={() => handleLinkClick('locations')}
              type="button"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-sm ${
                isNight
                  ? 'bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D]'
                  : 'bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Find Us</span>
            </button>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Theme Toggle */}
            <button
              onClick={onToggleTheme}
              type="button"
              className={`p-2 rounded-full border transition-colors ${
                isNight
                  ? 'bg-[#2A3125] border-[#B89C82]/40 text-[#EED5B7]'
                  : 'bg-[#EFECE4] border-[#B89C82]/30 text-[#3E453A]'
              }`}
              aria-label="Toggle theme"
            >
              {isNight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[#B89C82]" />}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className={`p-2 rounded-lg transition-colors ${
                isNight ? 'hover:bg-[#2A3125]' : 'hover:bg-[#EFECE4]'
              }`}
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-t px-6 py-6 space-y-4 transition-colors ${
            isNight
              ? 'bg-[#1E231B] border-[#3E453A]/40 text-[#F7F5F0]'
              : 'bg-[#F7F5F0] border-[#B89C82]/20 text-[#3E453A]'
          }`}
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left font-serif text-lg py-2 border-b border-black/5 hover:text-[#7A8974] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            {onPlayGame && (
              <button
                onClick={() => {
                  onPlayGame();
                  setMobileMenuOpen(false);
                }}
                type="button"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#7A8974]/30 bg-[#7A8974]/10 text-[#7A8974] dark:text-[#EED5B7] font-semibold text-sm tracking-wide"
              >
                <Gamepad2 className="w-4 h-4 text-[#B89C82]" />
                <span>Play Cafe Aldaw Game</span>
              </button>
            )}

            <button
              onClick={() => handleLinkClick('locations')}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#7A8974] text-[#F7F5F0] font-semibold text-sm tracking-wide"
            >
              <Coffee className="w-4 h-4" />
              <span>Visit Our Cafes</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
