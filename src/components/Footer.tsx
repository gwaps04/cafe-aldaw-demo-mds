import React from 'react';
import { ThemeMode } from '../types';
import { Mail, Phone, Sun, ArrowUp } from 'lucide-react';

interface FooterProps {
  themeMode: ThemeMode;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ themeMode, onScrollToTop }) => {
  const isNight = themeMode === 'night';

  return (
    <footer
      className={`border-t transition-colors duration-500 ${
        isNight
          ? 'bg-[#181C15] border-[#3E453A]/50 text-[#F7F5F0]'
          : 'bg-[#EFECE4] border-[#B89C82]/20 text-[#3E453A]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Upper Brand & Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-black/5 dark:border-white/5">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-serif text-3xl font-bold tracking-tight">
                Cafe Aldaw
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#7A8974]" />
            </div>

            <p
              className={`text-sm leading-relaxed max-w-sm mb-6 ${
                isNight ? 'text-[#A8B0A5]' : 'text-[#5E6659]'
              }`}
            >
              A ray of comfort in every cup. Embracing Albay’s sunrise, Mount Mayon’s
              presence, and soulful architectural archways in Camalig & Legazpi City.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/cafealdaw"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#7A8974]/15 hover:bg-[#7A8974] hover:text-[#F7F5F0] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/cafealdaw"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#7A8974]/15 hover:bg-[#7A8974] hover:text-[#F7F5F0] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <button
                onClick={onScrollToTop}
                type="button"
                className="p-2.5 rounded-full bg-[#B89C82]/20 hover:bg-[#B89C82] hover:text-[#F7F5F0] transition-colors ml-2"
                aria-label="Back to top"
                title="Scroll back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-base font-bold mb-4 uppercase tracking-wider text-[#7A8974]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#hero" className="hover:text-[#7A8974] transition-colors">
                  Home & Story
                </a>
              </li>
              <li>
                <a href="#menu-peek" className="hover:text-[#7A8974] transition-colors">
                  The Menu Peek
                </a>
              </li>
              <li>
                <a href="#vibe" className="hover:text-[#7A8974] transition-colors">
                  The Vibe (3 Pillars)
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-[#7A8974] transition-colors">
                  Camalig & Legazpi
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Service */}
          <div className="md:col-span-4">
            <h4 className="font-serif text-base font-bold mb-4 uppercase tracking-wider text-[#7A8974]">
              Sanctuary Hours
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold block">Camalig Flagship:</span>
                <span className={isNight ? 'text-[#A8B0A5]' : 'text-[#5E6659]'}>
                  Mon – Sun: 8:00 AM – 9:00 PM
                </span>
              </div>
              <div>
                <span className="font-semibold block">Legazpi CAL Courtyard:</span>
                <span className={isNight ? 'text-[#A8B0A5]' : 'text-[#5E6659]'}>
                  Mon – Sun: 9:00 AM – 10:00 PM
                </span>
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-xs text-[#B89C82] font-medium">
                <Sun className="w-3.5 h-3.5" /> Dine-in, Takeaway & Al Fresco Courtyard
              </div>
            </div>
          </div>
        </div>

        {/* ABSOLUTE BOTTOM CENTERED CONTACT CREDENTIALS */}
        {/* Requirement: "Center the email (cafealdaw@gmail.com) and mobile (+63 966 162 2227) at the absolute bottom." */}
        <div className="pt-10 flex flex-col items-center justify-center text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-4">
            {/* Centered Email */}
            <a
              href="mailto:cafealdaw@gmail.com"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#7A8974] hover:text-[#B89C82] transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-[#7A8974]/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4 text-[#7A8974]" />
              </div>
              <span className="underline underline-offset-4 decoration-[#7A8974]/30 group-hover:decoration-[#B89C82]">
                cafealdaw@gmail.com
              </span>
            </a>

            <span className="hidden sm:inline-block text-[#B89C82]">•</span>

            {/* Centered Mobile */}
            <a
              href="tel:+639661622227"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#7A8974] hover:text-[#B89C82] transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-[#7A8974]/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4 text-[#7A8974]" />
              </div>
              <span className="font-mono tracking-tight group-hover:text-[#B89C82]">
                +63 966 162 2227
              </span>
            </a>
          </div>

          <p
            className={`text-xs mt-2 ${
              isNight ? 'text-[#8E968B]' : 'text-[#8C9388]'
            }`}
          >
            © {new Date().getFullYear()} Cafe Aldaw. All rights reserved. Designed with Sunrise & Archway Oasis Blend.
          </p>
        </div>
      </div>
    </footer>
  );
};
