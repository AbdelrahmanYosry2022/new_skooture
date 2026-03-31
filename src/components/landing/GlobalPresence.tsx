import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const markers = [
  { markerOffset: -30, name: "London", nameAr: "لندن", coordinates: [-0.1276, 51.5074] as [number, number] },
  { markerOffset: 15, name: "Egypt", nameAr: "مصر", coordinates: [30.8025, 26.8206] as [number, number] },
  { markerOffset: 15, name: "UAE", nameAr: "الإمارات", coordinates: [54.2098, 23.4241] as [number, number] }
];

// Dictionary to show dynamic translation feature
const countryTranslations: Record<string, string> = {
  "Egypt": "مصر",
  "Saudi Arabia": "السعودية",
  "United Arab Emirates": "الإمارات",
  "United Kingdom": "المملكة المتحدة",
  "United States of America": "الولايات المتحدة",
  /* Add more dynamically or via backend */
};

export default function GlobalPresence() {
  const { content, t } = useContent();
  const { theme } = useTheme();

  const [tooltip, setTooltip] = useState({
    show: false,
    en: '',
    ar: '',
    x: 0,
    y: 0
  });

  const handleMouseEnter = (name: string, nameAr: string, e: React.MouseEvent) => {
    setTooltip({
      show: true,
      en: name,
      ar: nameAr,
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltip(prev => ({
      ...prev,
      x: e.clientX,
      y: e.clientY
    }));
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, show: false }));
  };

  return (
    <section id="global" className="py-32 bg-zinc-50 dark:bg-zinc-950 relative border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent dark:from-blue-900/10 transition-colors duration-300" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 transition-colors duration-300"
          >
            {t(content.global.title)}
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </div>

        <div className="relative w-full max-w-5xl mx-auto aspect-[2/1] bg-white/80 dark:bg-zinc-900/40 rounded-3xl border border-zinc-200 dark:border-zinc-800/50 backdrop-blur-xl overflow-hidden shadow-xl dark:shadow-none transition-colors duration-300">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 140,
              center: [20, 30]
            }}
            className="w-full h-full"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const enName = geo.properties.name;
                  const arName = countryTranslations[enName] || 'غير محدد';

                  return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(e) => handleMouseEnter(enName, arName, e as any)}
                    onMouseMove={handleMouseMove as any}
                    onMouseLeave={handleMouseLeave}
                    fill={theme === 'dark' ? '#2c3340' : '#cbd5e1'}
                    stroke={theme === 'dark' ? '#1e242d' : '#94a3b8'}
                    strokeWidth={0.5}
                    className="transition-all duration-300 cursor-pointer"
                    style={{
                      default: { outline: 'none' },
                      hover: { 
                        outline: 'none', 
                        fill: '#3b82f6', 
                        filter: 'drop-shadow(0px 0px 8px rgba(59, 130, 246, 0.6))',
                        strokeWidth: 1
                      },
                      pressed: { outline: 'none', fill: '#2563eb' },
                    }}
                  />
                  );
                })
              }
            </Geographies>
            
            {markers.map(({ name, nameAr, coordinates, markerOffset }) => (
              <Marker 
                key={name} 
                coordinates={coordinates}
                onMouseEnter={(e) => handleMouseEnter(name, nameAr, e as any)}
                onMouseMove={handleMouseMove as any}
                onMouseLeave={handleMouseLeave}
              >
                <g className="group cursor-pointer">
                  <circle r={4} fill="#3b82f6" className="animate-pulse" />
                  <circle r={12} fill="#3b82f6" opacity={0.3} className="animate-ping" />
                </g>
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </div>

      {/* Glassmorphism Tooltip Render */}
      {tooltip.show && (
        <div 
          className="fixed pointer-events-none z-[9999] px-4 py-2 flex flex-col items-center gap-1 rounded-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-md bg-slate-800/65"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 15}px`, // Slight offset above the mouse
            transform: 'translate(-50%, -100%)',
            transition: 'opacity 0.15s ease'
          }}
        >
          <span className="font-bold text-slate-50 text-[15px]" style={{ fontFamily: "'Cairo', 'Tajawal', sans-serif" }}>
            {tooltip.ar}
          </span>
          <span className="text-slate-400 font-medium text-[12px]" style={{ fontFamily: "'Inter', sans-serif" }}>
            {tooltip.en}
          </span>
        </div>
      )}
    </section>
  );
}
