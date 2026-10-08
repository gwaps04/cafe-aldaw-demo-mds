import React, { useState, useEffect } from 'react';
import { ASSET_IMAGES } from '../data/assets';
import { ThemeMode } from '../types';
import {
  Sun,
  Moon,
  Menu,
  X,
  Coffee,
  MapPin,
  Gamepad2,
  ShoppingBag,
  Home,
  Utensils,
  Sparkles,
  Camera,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface NavbarProps {
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  onNavigate: (sectionId: string) => void;
  onPlayGame?: () => void;
  cartItemCount?: number;
  onOpenCart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  themeMode,
  onToggleTheme,
  onNavigate,
  onPlayGame,
  cartItemCount = 0,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isNight = themeMode === 'night';

  const navLinks = [
    {
      label: 'Home',
      id: 'hero',
      icon: Home,
      hint: 'Sunrise & Courtyard Story',
    },
    {
      label: 'Menu Peek',
      id: 'menu-peek',
      icon: Utensils,
      hint: 'Albay Flavors & Craft Brews',
    },
    {
      label: 'The Vibe',
      id: 'vibe',
      icon: Sparkles,
      hint: '3 Architectural Pillars',
    },
    {
      label: 'Moments',
      id: 'moments',
      icon: Camera,
      hint: 'Courtyard Photo Gallery',
    },
    {
      label: 'Locations',
      id: 'locations',
      icon: MapPin,
      hint: 'Camalig & Legazpi Cafes',
    },
  ];

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 border-b backdrop-blur-md ${
        isNight
          ? 'bg-[#1E231B]/95 border-[#3E453A]/40 text-[#F7F5F0]'
          : 'bg-[#F7F5F0]/95 border-[#B89C82]/20 text-[#3E453A]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo on the Left */}
          <div
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            {ASSET_IMAGES.logo ? (
              <img
                src={encodeURI(ASSET_IMAGES.logo)}
                alt="Cafe Aldaw Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-[#B89C82]/30 group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : null}

            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-1.5">
                Cafe Aldaw
                <span
                  className={`inline-block w-2 h-2 rounded-full transition-colors ${
                    isNight ? 'bg-[#EED5B7]' : 'bg-[#7A8974]'
                  }`}
                  aria-hidden="true"
                />
              </span>
              <span
                className={`hidden sm:block text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${
                  isNight ? 'text-[#B89C82]' : 'text-[#7A8974]'
                }`}
              >
                Sunrise & Oasis Sanctuary
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Visible on Laptop & Desktop screens >= 1024px) */}
          <nav
            className="hidden lg:flex items-center gap-4 xl:gap-7 2xl:gap-8 shrink-0"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-semibold tracking-wide transition-all relative py-1 hover:text-[#7A8974] whitespace-nowrap ${
                  isNight ? 'text-[#DCE2D8] hover:text-[#EED5B7]' : 'text-[#3E453A]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="h-4 w-px bg-black/10 dark:bg-white/10 mx-1" aria-hidden="true" />

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
                  <span className="hidden xl:inline">Gabi (Night)</span>
                  <span className="xl:hidden">Night</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-[#B89C82]" />
                  <span className="hidden xl:inline">Aldaw (Sun)</span>
                  <span className="xl:hidden">Day</span>
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
                <span className="hidden xl:inline">Play Game</span>
                <span className="xl:hidden">Game</span>
              </button>
            )}

            {/* Order Tray Button */}
            {onOpenCart && (
              <button
                onClick={onOpenCart}
                type="button"
                className={`relative inline-flex items-center gap-2 px-3.5 xl:px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-xs border ${
                  cartItemCount > 0
                    ? 'bg-[#7A8974] text-[#F7F5F0] border-[#7A8974] shadow-md hover:bg-[#63715D]'
                    : isNight
                    ? 'bg-[#2A3125] text-[#EED5B7] border-[#B89C82]/40 hover:bg-[#343C2E]'
                    : 'bg-[#FAF8F5] text-[#3E453A] border-[#B89C82]/30 hover:bg-[#F2ECE3]'
                }`}
                title="View Order Tray"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Tray</span>
                {cartItemCount > 0 && (
                  <span className="bg-[#B89C82] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}

            {/* Quick Action Button: Find Us */}
            <button
              onClick={() => handleLinkClick('locations')}
              type="button"
              className="inline-flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-sm bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D]"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Find Us</span>
            </button>
          </nav>

          {/* Mobile & Tablet Right Action Controls (Screens < 1024px) */}
          <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
            {/* Tablet Quick Action: Play Game (768px - 1023px) */}
            {onPlayGame && (
              <button
                onClick={onPlayGame}
                type="button"
                className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-xs border ${
                  isNight
                    ? 'bg-[#2A3125] text-[#EED5B7] border-[#B89C82]/40'
                    : 'bg-[#FAF8F5] text-[#7A8974] border-[#7A8974]/30'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5 text-[#B89C82]" />
                <span>Play Game</span>
              </button>
            )}

            {/* Mobile/Tablet Order Tray Button */}
            {onOpenCart && (
              <button
                onClick={onOpenCart}
                type="button"
                className={`relative p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border transition-all shadow-xs ${
                  cartItemCount > 0
                    ? 'bg-[#7A8974] text-white border-[#7A8974]'
                    : isNight
                    ? 'bg-[#2A3125] border-[#B89C82]/40 text-[#EED5B7]'
                    : 'bg-[#EFECE4] border-[#B89C82]/30 text-[#3E453A]'
                }`}
                aria-label="View order tray"
                title="View order tray"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#B89C82] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}

            {/* Mobile/Tablet Theme Toggle */}
            <button
              onClick={onToggleTheme}
              type="button"
              className={`p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border transition-all shadow-xs ${
                isNight
                  ? 'bg-[#2A3125] border-[#B89C82]/40 text-[#EED5B7]'
                  : 'bg-[#EFECE4] border-[#B89C82]/30 text-[#3E453A]'
              }`}
              aria-label="Toggle theme"
              title={isNight ? 'Switch to Bright Aldaw (Day)' : 'Switch to Cozy Evening (Night)'}
            >
              {isNight ? (
                <Moon className="w-4 h-4 text-[#EED5B7]" />
              ) : (
                <Sun className="w-4 h-4 text-[#B89C82]" />
              )}
            </button>

            {/* Mobile/Tablet Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className={`p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border transition-all ${
                isNight
                  ? 'bg-[#2A3125] border-[#3E453A] hover:bg-[#343C2E] text-[#F7F5F0]'
                  : 'bg-[#EFECE4] border-[#B89C82]/30 hover:bg-[#E5E0D4] text-[#3E453A]'
              }`}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Overlay Drawer Menu (Mobile & Tablet) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-50 lg:hidden flex flex-col">
          {/* Backdrop Blur Lock */}
          <div
            className="fixed inset-0 top-20 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content Panel */}
          <div
            className={`relative z-10 w-full max-h-[calc(100vh-5rem)] overflow-y-auto border-b shadow-2xl transition-all duration-300 px-4 sm:px-6 py-6 ${
              isNight
                ? 'bg-[#1E231B] border-[#3E453A]/80 text-[#F7F5F0]'
                : 'bg-[#FDFBF7] border-[#B89C82]/30 text-[#3E453A]'
            }`}
          >
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Drawer Navigation List Header */}
              <div className="flex items-center justify-between border-b pb-3 border-black/5 dark:border-white/5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B89C82]">
                  Explore Cafe Aldaw
                </span>
                <span className="text-[11px] text-[#7A8974] font-medium">
                  5 Destinations
                </span>
              </div>

              {/* High-Comfort, Touch-Friendly Navigation List */}
              <div className="space-y-2.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl transition-all duration-200 border ${
                        isNight
                          ? 'bg-[#252C21] hover:bg-[#2E362A] border-[#3E453A]/60 text-[#F7F5F0]'
                          : 'bg-white hover:bg-[#FAF8F5] border-[#B89C82]/25 text-[#3E453A] shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isNight
                              ? 'bg-[#181D15] text-[#EED5B7] border border-[#B89C82]/20'
                              : 'bg-[#EFECE4] text-[#7A8974] border border-[#7A8974]/20'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="font-serif text-base sm:text-lg font-bold">
                            {link.label}
                          </div>
                          <div
                            className={`text-xs ${
                              isNight ? 'text-[#A8B0A5]' : 'text-[#697264]'
                            }`}
                          >
                            {link.hint}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#B89C82] shrink-0" />
                    </button>
                  );
                })}
              </div>

              {/* Interactive Quick Action Buttons */}
              <div className="pt-2 space-y-3">
                {onPlayGame && (
                  <button
                    onClick={() => {
                      onPlayGame();
                      setMobileMenuOpen(false);
                    }}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl border border-[#7A8974]/40 bg-[#7A8974]/15 hover:bg-[#7A8974]/25 text-[#7A8974] dark:text-[#EED5B7] font-semibold text-sm tracking-wide transition-colors"
                  >
                    <Gamepad2 className="w-4 h-4 text-[#B89C82]" />
                    <span>Play Cafe Aldaw Game</span>
                  </button>
                )}

                <button
                  onClick={() => handleLinkClick('locations')}
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-[#7A8974] hover:bg-[#63715D] text-[#F7F5F0] font-semibold text-sm tracking-wide transition-colors shadow-md"
                >
                  <Coffee className="w-4 h-4" />
                  <span>Visit Our Cafes (Camalig & Legazpi)</span>
                </button>
              </div>

              {/* Social Connections & Facebook Page Link */}
              <div
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
                  isNight
                    ? 'bg-[#22281E] border-[#3E453A]/60'
                    : 'bg-[#EAE5DC]/60 border-[#B89C82]/25'
                }`}
              >
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.facebook.com/CafeAldaw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-bold text-[#3B5998] hover:underline"
                    title="Visit Cafe Aldaw on Facebook"
                  >
                    <svg
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <span>Facebook (@CafeAldaw)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-black/20 dark:text-white/20">•</span>
                  <a
                    href="https://instagram.com/cafealdaw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7A8974] hover:underline font-semibold"
                  >
                    Instagram
                  </a>
                </div>
                <span
                  className={`${
                    isNight ? 'text-[#A8B0A5]' : 'text-[#697264]'
                  }`}
                >
                  CAL Courtyard: 10AM - 10PM Daily
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
