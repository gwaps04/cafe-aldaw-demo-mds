import React from 'react';
import { Heart, Compass, Camera, Sparkles, Sun } from 'lucide-react';

export const TheVibeSection: React.FC = () => {
  const pillars = [
    {
      icon: <Heart className="w-7 h-7 text-[#F7F5F0]" />,
      title: 'Filipino Hospitality',
      tagline: 'Warmth in Every Welcome',
      description:
        'Rooted in Albay’s genuine malasakit, our team welcomes every guest like family returning home. Unhurried conversations, thoughtful table service, and hearty comfort food create a space where you can stay as long as you wish.',
    },
    {
      icon: <Compass className="w-7 h-7 text-[#F7F5F0]" />,
      title: 'Middle Eastern Influence',
      tagline: 'Cardamom & Courtyards',
      description:
        'Inspired by desert oasis retreats and spice souks, our menu weaves fragrant notes of crushed cardamom, saffron syrup, and velvety coffees. Communal sharing platters and architectural archways evoke a timeless cross-cultural romance.',
    },
    {
      icon: <Camera className="w-7 h-7 text-[#F7F5F0]" />,
      title: 'Instagram-Worthy Space',
      tagline: 'Golden Rays & Curated Arches',
      description:
        'Every corner is intentionally designed with sculptural archways, sun-drenched lime-wash walls, earthy terracotta pottery, and views framing Mount Mayon. Natural light moves through the cafe like a living art piece all day long.',
    },
  ];

  return (
    <section
      id="vibe"
      className="relative py-20 md:py-28 bg-[#7A8974] text-[#F7F5F0] overflow-hidden"
    >
      {/* Decorative Arch Silhouettes in Background */}
      <div
        className="absolute -top-24 -left-20 w-80 h-96 rounded-t-full border border-[#F7F5F0]/10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -right-20 w-96 h-96 rounded-t-full border border-[#F7F5F0]/10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 bg-[#F7F5F0]/15 text-[#F7F5F0] border border-[#F7F5F0]/25">
            <Sun className="w-3.5 h-3.5 text-[#EED5B7]" />
            <span>The Cafe Aldaw Essence</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5 text-[#F7F5F0]">
            The Vibe & Atmosphere
          </h2>

          <p className="text-base sm:text-lg text-[#F7F5F0]/90 leading-relaxed font-normal">
            We built Cafe Aldaw as a restorative sanctuary — where the soul of the
            Bicol peninsula meets serene Middle Eastern oasis architecture.
          </p>
        </div>

        {/* 3-Column Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-[#6B7A65]/50 border border-[#F7F5F0]/20 hover:border-[#F7F5F0]/50 transition-all duration-500 hover:-translate-y-2 hover:bg-[#6B7A65]/70"
            >
              {/* Minimalist Icon Badge with Arch Motif */}
              <div className="w-16 h-16 rounded-t-full rounded-b-2xl bg-[#F7F5F0]/15 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#F7F5F0]/25 transition-all duration-300 border border-[#F7F5F0]/20 shadow-inner">
                {pillar.icon}
              </div>

              {/* Number Badge */}
              <span className="text-[11px] font-mono tracking-widest text-[#EED5B7] uppercase mb-2">
                Pillar 0{idx + 1}
              </span>

              {/* Pillar Title */}
              <h3 className="font-serif text-2xl font-bold mb-2 text-[#F7F5F0]">
                {pillar.title}
              </h3>

              {/* Tagline */}
              <p className="text-xs font-semibold tracking-wider uppercase text-[#EED5B7] mb-4">
                {pillar.tagline}
              </p>

              {/* Description */}
              <p className="text-sm leading-relaxed text-[#F7F5F0]/85 font-normal">
                {pillar.description}
              </p>

              {/* Micro Corner Accent */}
              <div className="mt-6 pt-4 border-t border-[#F7F5F0]/15 w-full flex items-center justify-center gap-1.5 text-xs text-[#F7F5F0]/70 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#EED5B7]" />
                <span>Crafted Experience</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
