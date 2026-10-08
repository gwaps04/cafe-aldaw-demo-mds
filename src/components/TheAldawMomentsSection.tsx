import React, { useState, useEffect } from 'react';
import { GALLERY_MOMENTS } from '../data/moments';
import { ThemeMode } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';
import {
  Camera,
  Maximize2,
  X,
  Heart,
  ChevronLeft,
  ChevronRight,
  Compass,
} from 'lucide-react';

interface TheAldawMomentsSectionProps {
  themeMode: ThemeMode;
}

export const TheAldawMomentsSection: React.FC<TheAldawMomentsSectionProps> = ({
  themeMode,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isNight = themeMode === 'night';
  const filterTabs = ['All', 'Courtyard', 'Coffee', 'Feasts', 'Ambience'];

  const filteredMoments = GALLERY_MOMENTS.filter((item) =>
    activeFilter === 'All' ? true : item.category === activeFilter
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % filteredMoments.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredMoments.length) % filteredMoments.length
            : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredMoments.length]);

  const currentMoment =
    selectedIndex !== null ? filteredMoments[selectedIndex] : null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredMoments.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + filteredMoments.length) % filteredMoments.length
      );
    }
  };

  return (
    <section
      id="moments"
      className={`py-20 md:py-32 transition-colors duration-500 relative overflow-hidden ${
        isNight ? 'bg-[#181D15] text-[#F7F5F0]' : 'bg-[#F5F2EB] text-[#3E453A]'
      }`}
    >
      {/* Decorative Arch Backdrop Silhouette */}
      <div
        className="absolute top-12 right-0 w-[500px] h-[500px] rounded-t-full border border-[#B89C82]/15 pointer-events-none -mr-40"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-0 w-[420px] h-[420px] rounded-t-full border border-[#7A8974]/15 pointer-events-none -ml-36"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 border ${
              isNight
                ? 'bg-[#2A3125] text-[#EED5B7] border-[#B89C82]/30'
                : 'bg-[#EFECE4] text-[#7A8974] border-[#7A8974]/20'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-[#B89C82]" />
            <span>The Aldaw Moments</span>
          </div>

          {/* Required Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            Captured in the Courtyard
          </h2>

          {/* Required Sub-headline */}
          <p
            className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${
              isNight ? 'text-[#C5CBC1]' : 'text-[#5E6659]'
            }`}
          >
            Where Filipino warmth meets beautiful design. Take a peek at the
            memories made in our cozy, Instagram-worthy oasis.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div
            className={`inline-flex p-1.5 rounded-full border shadow-xs transition-colors overflow-x-auto ${
              isNight
                ? 'bg-[#22281E] border-[#3E453A]/60'
                : 'bg-[#EAE5DC] border-[#B89C82]/30'
            }`}
            role="tablist"
            aria-label="Moments filters"
          >
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveFilter(tab);
                    setSelectedIndex(null);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-[#7A8974] text-[#F7F5F0] shadow-md transform scale-102'
                      : isNight
                      ? 'text-[#C5CBC1] hover:text-[#F7F5F0] hover:bg-white/5'
                      : 'text-[#3E453A] hover:text-[#7A8974] hover:bg-black/5'
                  }`}
                >
                  {tab === 'All' ? `All Moments (${GALLERY_MOMENTS.length})` : tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* 
          ENLARGED & HIGH-IMPACT RESPONSIVE GALLERY GRID WITH ELEGANT 3D FOLD ANIMATION:
          - Uses generous 3-column desktop layout (lg:grid-cols-3) so images are visibly larger!
          - 3D fold and fold-back interaction on hover with architectural perspective.
          - Each card features a taller, grand archway aspect ratio (h-[380px] to h-[440px])
        */}
        <div className="perspective-stage grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredMoments.map((moment, index) => {
            return (
              <div
                key={moment.id}
                onClick={() => setSelectedIndex(index)}
                className={`gallery-fold-card group cursor-pointer flex flex-col rounded-3xl overflow-hidden p-4 sm:p-5 border ${
                  isNight
                    ? 'bg-[#21271D] border-[#3E453A]/60 hover:border-[#B89C82]/70'
                    : 'bg-[#FFFFFF] border-[#B89C82]/25 hover:border-[#7A8974]/60'
                }`}
              >
                {/* Large Archway Image Container - Clean Unobstructed Photo with 3D Fold Sheen */}
                <div
                  className="relative w-full overflow-hidden rounded-t-[120px] sm:rounded-t-[140px] rounded-b-2xl bg-[#EFECE4] shadow-inner mb-5"
                  style={{ minHeight: '340px', height: '400px' }}
                >
                  <div className="gallery-fold-inner w-full h-full">
                    <ImagePlaceholder
                      assetKey={moment.imageKey}
                      alt={moment.title}
                      shape="arch"
                      fallbackType="gallery"
                      label={moment.title}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Elegant Architectural Fold Sheen / Crease */}
                  <div className="gallery-fold-sheen" aria-hidden="true" />
                </div>

                {/* Card Details (Badges, Titles, Subtitles Placed Neatly Below Image) */}
                <div className="px-2 pb-2 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[11px] font-bold tracking-wider uppercase text-[#B89C82] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7A8974]" />
                        Moment 0{index + 1}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          isNight
                            ? 'bg-[#2A3125] text-[#EED5B7] border-[#B89C82]/30'
                            : 'bg-[#7A8974]/10 text-[#7A8974] border-[#7A8974]/20'
                        }`}
                      >
                        {moment.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2 group-hover:text-[#7A8974] transition-colors leading-snug">
                      {moment.title}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isNight ? 'text-[#C5CBC1]' : 'text-[#5E6659]'
                      }`}
                    >
                      {moment.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-[#7A8974]">
                    <span className="flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-[#B89C82]" />
                      <span>Courtyard Haven</span>
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold">
                      <span>View Story</span>
                      <Maximize2 className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Social Community Banner at Bottom: Facebook & Instagram */}
        <div
          className={`mt-20 p-8 sm:p-10 rounded-3xl border text-center max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${
            isNight
              ? 'bg-[#22281E] border-[#3E453A]/70'
              : 'bg-[#EAE5DC]/80 border-[#B89C82]/30 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-16 h-16 rounded-full bg-[#7A8974]/15 flex items-center justify-center shrink-0 border border-[#7A8974]/20 shadow-xs">
              <svg
                className="w-7 h-7 text-[#7A8974]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
            <div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold">
                Join the Cafe Aldaw Community
              </h4>
              <p
                className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                  isNight ? 'text-[#B0B7AC]' : 'text-[#5E6659]'
                }`}
              >
                Connect with our community on Facebook & Instagram. Tag <span className="font-semibold text-[#7A8974]">@CafeAldaw</span> or use <span className="font-semibold text-[#B89C82]">#AldawMoments</span>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Facebook Button */}
            <a
              href="https://www.facebook.com/CafeAldaw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#3B5998] text-[#F7F5F0] hover:bg-[#2D4373] transition-colors shadow-md"
              title="Check Cafe Aldaw on Facebook"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
              <span>Facebook Page</span>
            </a>

            {/* Instagram Button */}
            <a
              href="https://instagram.com/cafealdaw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] transition-colors shadow-md"
            >
              <Heart className="w-4 h-4 text-[#EED5B7]" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* 
        HIGH-DEFINITION FULLSCREEN LIGHTBOX & STORY VIEWER:
        - View enlarged photo in full resolution without distortion
        - Seamless Prev / Next navigation
        - Keyboard arrow & Escape navigation
        - Index counter (e.g. "03 of 08")
      */}
      {currentMoment && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-moment-title"
        >
          {/* Backdrop with dark blur */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedIndex(null)}
          />

          {/* Lightbox Container */}
          <div
            className={`relative z-10 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border transition-all animate-in fade-in zoom-in-95 duration-200 flex flex-col ${
              isNight
                ? 'bg-[#191F16] border-[#3E453A] text-[#F7F5F0]'
                : 'bg-[#FAF8F5] border-[#B89C82]/30 text-[#3E453A]'
            }`}
          >
            {/* Top Bar with Counter and Close Button */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-bold tracking-widest text-[#7A8974]">
                  Moment 0{selectedIndex + 1} of 0{filteredMoments.length}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89C82]" />
                <span className="text-xs text-[#B89C82] font-semibold">
                  {currentMoment.category}
                </span>
              </div>

              <button
                onClick={() => setSelectedIndex(null)}
                type="button"
                className="p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
                aria-label="Close photo viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Stage: High Definition Photo Display with Prev/Next Controls */}
            <div className="relative w-full flex items-center justify-center bg-black/90 min-h-[380px] max-h-[68vh] overflow-hidden">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                type="button"
                className="absolute left-4 z-20 p-3 rounded-full bg-black/60 text-white hover:bg-[#7A8974] hover:text-white transition-all shadow-xl"
                aria-label="Previous photo"
                title="Previous photo (Left arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                type="button"
                className="absolute right-4 z-20 p-3 rounded-full bg-black/60 text-white hover:bg-[#7A8974] hover:text-white transition-all shadow-xl"
                aria-label="Next photo"
                title="Next photo (Right arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Displayed Image */}
              <div className="w-full h-full max-h-[68vh] flex items-center justify-center p-2 sm:p-4">
                <ImagePlaceholder
                  assetKey={currentMoment.imageKey}
                  alt={currentMoment.title}
                  shape="rounded"
                  fallbackType="gallery"
                  label={currentMoment.title}
                  containerClassName="w-full max-h-[64vh] flex items-center justify-center bg-transparent rounded-2xl"
                  className="max-h-[64vh] max-w-full object-contain rounded-xl shadow-2xl"
                />
              </div>
            </div>

            {/* Bottom Caption & Location Details */}
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B89C82] block mb-1">
                  Cafe Aldaw Courtyard Moments • {currentMoment.category}
                </span>
                <h3
                  id="lightbox-moment-title"
                  className="font-serif text-2xl sm:text-3xl font-bold mb-2"
                >
                  {currentMoment.title}
                </h3>
                <p
                  className={`text-sm sm:text-base leading-relaxed max-w-2xl font-medium ${
                    isNight ? 'text-[#C5CBC1]' : 'text-[#5E6659]'
                  }`}
                >
                  {currentMoment.subtitle}
                </p>
              </div>

              {/* Navigation Thumb Indicator */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-[#8E968B] hidden md:inline">
                  Tip: Use ← → keys to navigate
                </span>
                <button
                  onClick={() => setSelectedIndex(null)}
                  type="button"
                  className="px-6 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] transition-colors"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
