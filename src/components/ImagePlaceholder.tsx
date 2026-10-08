import React, { useState } from 'react';
import { ASSET_IMAGES, AssetKey } from '../data/assets';
import { Utensils, Coffee, Croissant, MapPin, Sparkles } from 'lucide-react';

interface ImagePlaceholderProps {
  assetKey: AssetKey | string;
  alt: string;
  className?: string;
  containerClassName?: string;
  shape?: 'arch' | 'card-arch' | 'rounded' | 'circle';
  fallbackType?: 'hero' | 'food' | 'drink' | 'pastry' | 'location' | 'logo' | 'gallery';
  label?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  assetKey,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'w-full h-full',
  shape = 'rounded',
  fallbackType = 'food',
  label,
}) => {
  const rawSrc = (ASSET_IMAGES as Record<string, string>)[assetKey] || '';
  const customSrc = rawSrc ? encodeURI(rawSrc) : '';
  const [imgError, setImgError] = useState(false);

  const getShapeClasses = () => {
    switch (shape) {
      case 'arch':
        return 'rounded-t-[180px] rounded-b-none';
      case 'card-arch':
        return 'rounded-t-3xl rounded-b-lg';
      case 'circle':
        return 'rounded-full';
      default:
        return 'rounded-2xl';
    }
  };

  // If a real image path exists and has not encountered an error, display it!
  if (customSrc && !imgError) {
    return (
      <div className={`relative overflow-hidden ${getShapeClasses()} ${containerClassName}`}>
        <img
          src={customSrc}
          alt={alt}
          className={`${className} transition-transform duration-700 hover:scale-105`}
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  // Otherwise, display the warm, aesthetic vector placeholder
  return (
    <div
      className={`relative overflow-hidden flex flex-col items-center justify-center p-6 select-none ${getShapeClasses()} ${containerClassName}`}
      aria-label={alt}
    >
      {fallbackType === 'hero' && (
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#B89C82] via-[#C9ADA7] to-[#A3866E] text-[#F7F5F0]">
          {/* Subtle Sun Rays SVG Background */}
          <svg
            className="absolute inset-0 w-full h-full opacity-25"
            viewBox="0 0 400 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="200" cy="180" r="140" stroke="#F7F5F0" strokeWidth="1.5" strokeDasharray="4 6" />
            <circle cx="200" cy="180" r="190" stroke="#F7F5F0" strokeWidth="1" strokeDasharray="2 8" />
            {/* Sunrise Rays radiating */}
            <line x1="200" y1="20" x2="200" y2="70" stroke="#F7F5F0" strokeWidth="2" />
            <line x1="70" y1="80" x2="110" y2="110" stroke="#F7F5F0" strokeWidth="2" />
            <line x1="330" y1="80" x2="290" y2="110" stroke="#F7F5F0" strokeWidth="2" />
            <line x1="40" y1="180" x2="90" y2="180" stroke="#F7F5F0" strokeWidth="2" />
            <line x1="360" y1="180" x2="310" y2="180" stroke="#F7F5F0" strokeWidth="2" />
          </svg>

          {/* Central Sun Disc */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-t from-[#EED5B7] to-[#FFF7EB] shadow-2xl flex items-center justify-center mb-6 border-2 border-[#F7F5F0]/60">
              <span className="font-serif italic text-2xl md:text-3xl font-bold text-[#7A8974]">
                Aldaw
              </span>
            </div>

            {/* Mount Mayon Volcano Majestic Line Silhouette */}
            <svg
              className="w-64 h-32 md:w-80 md:h-40 text-[#F7F5F0] drop-shadow-md"
              viewBox="0 0 300 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Perfect Cone of Mount Mayon */}
              <path
                d="M150 18 L195 95 L270 140 L30 140 L105 95 Z"
                fill="currentColor"
                fillOpacity="0.18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Crater Steam Line Art */}
              <path
                d="M144 14 C140 8, 142 4, 145 0 M150 14 C152 7, 149 3, 151 -2 M156 14 C160 8, 158 2, 161 -1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.8"
              />
              {/* Gentle Foothill base */}
              <path
                d="M10 140 Q80 132 150 135 Q220 132 290 140"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>

            <div className="mt-2 text-xs md:text-sm tracking-[0.25em] uppercase font-medium text-[#F7F5F0]/90">
              Mount Mayon • Albay, Philippines
            </div>
            <div className="mt-1 text-[11px] text-[#F7F5F0]/70 italic">
              [Place your hero image in src/data/assets.ts]
            </div>
          </div>
        </div>
      )}

      {fallbackType === 'food' && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#EFECE4] text-[#7A8974] p-4 text-center">
          <div className="w-14 h-14 rounded-full bg-[#7A8974]/15 flex items-center justify-center mb-3">
            <Utensils className="w-6 h-6 text-[#7A8974]" />
          </div>
          <span className="font-serif font-semibold text-base text-[#3E453A]">
            {label || 'Savory Dish'}
          </span>
          <span className="text-xs text-[#3E453A]/60 mt-1">
            Artisan Kitchen Placeholder
          </span>
        </div>
      )}

      {fallbackType === 'drink' && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#F1E9E1] text-[#B89C82] p-4 text-center">
          <div className="w-14 h-14 rounded-full bg-[#B89C82]/20 flex items-center justify-center mb-3">
            <Coffee className="w-6 h-6 text-[#9F8369]" />
          </div>
          <span className="font-serif font-semibold text-base text-[#3E453A]">
            {label || 'Craft Beverage'}
          </span>
          <span className="text-xs text-[#3E453A]/60 mt-1">
            Espresso & Brew Bar
          </span>
        </div>
      )}

      {fallbackType === 'pastry' && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#FAF4ED] text-[#B89C82] p-4 text-center">
          <div className="w-14 h-14 rounded-full bg-[#B89C82]/15 flex items-center justify-center mb-3">
            <Croissant className="w-6 h-6 text-[#B89C82]" />
          </div>
          <span className="font-serif font-semibold text-base text-[#3E453A]">
            {label || 'Artisan Pastry'}
          </span>
          <span className="text-xs text-[#3E453A]/60 mt-1">
            Fresh Daily Bake
          </span>
        </div>
      )}

      {fallbackType === 'gallery' && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#EFECE4] via-[#E8E2D5] to-[#DFD7C7] text-[#7A8974] p-5 text-center relative overflow-hidden">
          {/* Subtle arch outline */}
          <div className="absolute inset-2 rounded-t-full border border-[#B89C82]/30 pointer-events-none" />
          <div className="w-14 h-14 rounded-full bg-[#7A8974]/15 flex items-center justify-center mb-2.5 relative z-10 border border-[#7A8974]/20 shadow-xs">
            <Sparkles className="w-6 h-6 text-[#7A8974]" />
          </div>
          <span className="font-serif font-bold text-sm text-[#3E453A] relative z-10">
            {label || 'Courtyard Moment'}
          </span>
          <span className="text-[11px] text-[#B89C82] font-medium mt-1 relative z-10">
            [Add photo in assets.ts]
          </span>
        </div>
      )}

      {fallbackType === 'location' && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#ECE7DE] text-[#7A8974] p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#7A8974]/20 flex items-center justify-center mb-3">
            <MapPin className="w-8 h-8 text-[#7A8974]" />
          </div>
          <span className="font-serif font-semibold text-lg text-[#3E453A]">
            {label || 'Cafe Aldaw Sanctuary'}
          </span>
          <div className="flex items-center gap-1 text-xs text-[#7A8974] mt-1 font-medium">
            <Sparkles className="w-3.5 h-3.5" /> Archway & Garden Oasis
          </div>
        </div>
      )}

      {fallbackType === 'logo' && (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border-2 border-[#7A8974] flex items-center justify-center bg-[#7A8974]/10">
            <span className="font-serif font-bold text-[#7A8974] text-lg">A</span>
          </div>
          <span className="font-serif font-bold text-xl tracking-wide text-[#3E453A]">
            Cafe Aldaw
          </span>
        </div>
      )}
    </div>
  );
};
