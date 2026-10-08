import React from 'react';
import { ImagePlaceholder } from './ImagePlaceholder';
import { ThemeMode } from '../types';
import { ArrowRight, Sparkles, MapPin, Coffee, Sun } from 'lucide-react';

interface HeroSectionProps {
  themeMode: ThemeMode;
  onExploreMenu: () => void;
  onViewLocations: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  themeMode,
  onExploreMenu,
  onViewLocations,
}) => {
  const isNight = themeMode === 'night';

  return (
    <section
      id="hero"
      className={`relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden transition-colors duration-500 ${
        isNight ? 'bg-[#1E231B] text-[#F7F5F0]' : 'bg-[#F7F5F0] text-[#3E453A]'
      }`}
    >
      {/* Subtle decorative background gradient */}
      <div
        className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 ${
          isNight ? 'bg-[#B89C82]/10 opacity-40' : 'bg-[#EED5B7]/35 opacity-70'
        }`}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Story & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Sunrise / Oasis Tag */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 border transition-all ${
                isNight
                  ? 'bg-[#2A3125] text-[#EED5B7] border-[#B89C82]/30'
                  : 'bg-[#FAF9F5] text-[#7A8974] border-[#7A8974]/25 shadow-xs'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-[#B89C82]" />
              <span>Sunrise & Archway Sanctuary</span>
              <span className="text-[#B89C82]">•</span>
              <span>Albay, PH</span>
            </div>

            {/* Main Required Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              A Ray of Comfort <br />
              <span className="italic font-normal font-serif text-[#7A8974]">
                in Every Cup
              </span>
            </h1>

            {/* Story Paragraph */}
            <p
              className={`text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-8 transition-colors ${
                isNight ? 'text-[#D0D4CE]' : 'text-[#5E6659]'
              }`}
            >
              Inspired by the rising dawn over Mount Mayon and timeless Middle
              Eastern oasis archways. Cafe Aldaw blends genuine Bicolano warmth,
              artisan roasts, and tranquil architectural corners for your daily
              pause.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onExploreMenu}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold tracking-wide bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Menu Peek</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onViewLocations}
                type="button"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold tracking-wide border transition-all ${
                  isNight
                    ? 'border-[#B89C82]/40 text-[#F7F5F0] hover:bg-[#2A3125]'
                    : 'border-[#3E453A]/30 text-[#3E453A] hover:bg-[#FAF9F5] hover:border-[#7A8974]'
                }`}
              >
                <MapPin className="w-4 h-4 text-[#B89C82]" />
                <span>Visit Our Cafes</span>
              </button>
            </div>

            {/* Micro Highlights Badges */}
            <div
              className={`w-full pt-6 border-t flex flex-wrap items-center gap-6 sm:gap-10 transition-colors ${
                isNight ? 'border-[#3E453A]/40' : 'border-[#B89C82]/20'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#7A8974]/15 flex items-center justify-center text-[#7A8974]">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">
                    Benguet & Mount Apo
                  </div>
                  <div
                    className={`text-xs ${
                      isNight ? 'text-[#A0A69D]' : 'text-[#7A8374]'
                    }`}
                  >
                    100% Single Origin
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#B89C82]/20 flex items-center justify-center text-[#B89C82]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">
                    Dual Destinations
                  </div>
                  <div
                    className={`text-xs ${
                      isNight ? 'text-[#A0A69D]' : 'text-[#7A8374]'
                    }`}
                  >
                    Camalig & Legazpi City
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Large Archway Image with The Sunrise Hover Effect */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end z-10">
            <div className="relative group w-full max-w-sm sm:max-w-md lg:max-w-[420px]">
              {/* Decorative arch shadow ring */}
              <div
                className={`absolute -inset-3 rounded-t-[210px] rounded-b-none border transition-all duration-700 pointer-events-none ${
                  isNight
                    ? 'border-[#B89C82]/30 group-hover:border-[#EED5B7]/50'
                    : 'border-[#B89C82]/40 group-hover:border-[#B89C82]/70'
                }`}
                aria-hidden="true"
              />

              {/* The Sunrise Glow Backlight that brightens on hover */}
              <div
                className="absolute -inset-2 rounded-t-[200px] rounded-b-none bg-gradient-to-t from-[#B89C82]/0 via-[#EED5B7]/30 to-[#FFE9CC]/50 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 pointer-events-none"
                aria-hidden="true"
              />

              {/* Main Archway Container: Perfect archway (rounded top, flat bottom) */}
              {/* Fill this arch with a warm tan background (#B89C82) and placeholder for sun/Mayon line art */}
              <div
                className="relative overflow-hidden rounded-t-[190px] sm:rounded-t-[220px] rounded-b-none bg-[#B89C82] shadow-2xl transition-all duration-700 ease-out transform group-hover:-translate-y-2 group-hover:shadow-[0_25px_60px_-15px_rgba(184,156,130,0.5)] group-hover:brightness-105"
                style={{ height: '520px' }}
              >
                {/* The Archway Image / Placeholder with Sunrise Hover Effect */}
                <div className="w-full h-full transition-transform duration-700 group-hover:scale-102">
                  <ImagePlaceholder
                    assetKey="heroArchway"
                    alt="Cafe Aldaw Sunrise Archway & Mount Mayon"
                    shape="arch"
                    fallbackType="hero"
                    containerClassName="w-full h-full"
                  />
                </div>

                {/* Subtle Floating Badge at the Bottom of Arch */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#F7F5F0]/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-[#B89C82]/20 flex items-center justify-between text-[#3E453A]">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-bold text-[#7A8974]">
                      Golden Hour Sanctuary
                    </div>
                    <div className="font-serif text-sm font-bold">
                      Architectural Archways
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#B89C82]/20 text-[#9F8369] font-medium">
                    Hover for Sunrise
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
