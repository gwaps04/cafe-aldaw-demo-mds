import React from 'react';
import { LOCATIONS } from '../data/menu';
import { ThemeMode } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';
import { MapPin, Clock, Phone, Navigation, CheckCircle2, Compass } from 'lucide-react';

interface LocationsSectionProps {
  themeMode: ThemeMode;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ themeMode }) => {
  const isNight = themeMode === 'night';

  return (
    <section
      id="locations"
      className={`py-20 md:py-28 transition-colors duration-500 ${
        isNight ? 'bg-[#1E231B] text-[#F7F5F0]' : 'bg-[#F7F5F0] text-[#3E453A]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 border ${
              isNight
                ? 'bg-[#2A3125] text-[#EED5B7] border-[#B89C82]/30'
                : 'bg-[#EFECE4] text-[#7A8974] border-[#7A8974]/20'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#B89C82]" />
            <span>Dual Destinations</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Visit Our Sanctuaries
          </h2>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isNight ? 'text-[#C5CBC1]' : 'text-[#5E6659]'
            }`}
          >
            Experience our signature blend of calm archways and specialty brews in
            both scenic Camalig and the vibrant CAL Courtyard in Legazpi City.
          </p>
        </div>

        {/* Side-by-Side Split Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.id}
              className={`rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 ${
                isNight
                  ? 'bg-[#242A20] border-[#3E453A]/60 shadow-lg hover:border-[#B89C82]/40'
                  : 'bg-[#FFFFFF] border-[#B89C82]/25 shadow-md hover:border-[#7A8974]/50'
              }`}
            >
              {/* Location Photo / Archway Placeholder */}
              <div
                className="relative w-full overflow-hidden bg-[#EFECE4]"
                style={{ height: '240px' }}
              >
                <ImagePlaceholder
                  assetKey={loc.imageKey}
                  alt={loc.name}
                  shape="rounded"
                  fallbackType="location"
                  label={loc.name}
                  containerClassName="w-full h-full rounded-none"
                />

                {/* Subtitle tag overlay */}
                <div className="absolute bottom-3 left-4 bg-[#3E453A]/85 backdrop-blur-md text-[#F7F5F0] text-xs font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-[#EED5B7]" />
                  <span>{loc.subtitle}</span>
                </div>
              </div>

              {/* Location Details Body */}
              <div className="p-6 sm:p-8">
                <h3 className="font-serif text-2xl font-bold mb-3 hover:text-[#7A8974] transition-colors">
                  {loc.name}
                </h3>

                <div className="space-y-4 mb-6">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#7A8974] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#B89C82]">
                        Address
                      </div>
                      <p
                        className={`text-sm leading-relaxed ${
                          isNight ? 'text-[#D0D4CE]' : 'text-[#3E453A]'
                        }`}
                      >
                        {loc.address}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#7A8974] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#B89C82]">
                        Operating Hours
                      </div>
                      <p
                        className={`text-sm font-medium ${
                          isNight ? 'text-[#D0D4CE]' : 'text-[#3E453A]'
                        }`}
                      >
                        {loc.hours}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#7A8974] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#B89C82]">
                        Direct Line
                      </div>
                      <a
                        href={`tel:${loc.phone}`}
                        className={`text-sm font-medium hover:underline ${
                          isNight ? 'text-[#EED5B7]' : 'text-[#7A8974]'
                        }`}
                      >
                        {loc.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Features Badges */}
                <div className="mb-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#B89C82] mb-2.5">
                    Branch Amenities
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {loc.features.map((feat) => (
                      <span
                        key={feat}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                          isNight
                            ? 'bg-[#1E231B] text-[#D0D4CE] border-[#3E453A]/70'
                            : 'bg-[#FAF9F5] text-[#5E6659] border-[#B89C82]/30'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#7A8974]" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Get Directions Button */}
                <div className="pt-4 border-t border-black/5">
                  <a
                    href={loc.mapUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-xs uppercase tracking-wider bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] transition-all shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions to {loc.name.split(' ')[0]}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
