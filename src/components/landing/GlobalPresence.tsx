import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useState } from 'react';

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const countryTranslations: Record<string, string> = {
  "Egypt": "مصر",
  "Saudi Arabia": "السعودية",
  "United Arab Emirates": "الإمارات",
  "United Kingdom": "المملكة المتحدة",
  "United States of America": "الولايات المتحدة",
};

const activeCountries = ["Egypt", "United Arab Emirates", "United Kingdom"];

export default function GlobalPresence() {
  const { content, t } = useContent();

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
    <section id="global" className="py-24 md:py-32 bg-[#000000] relative overflow-hidden border-t border-white/[0.05]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(235,69,32,0.15)_0%,transparent_70%)] pointer-events-none blur-[80px]" />

      <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-[21px] bg-[#191919] shadow-[inset_0_1px_16px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.09)]"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[radial-gradient(100%_100%_at_50%_0%,#ffa984_0%,#ff5911_100%)] shadow-[inset_0_1px_16px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.09)] shrink-0"></span>
            <span className="text-[14px] font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#e86f3a] to-[#fcbda2]">
              {t(content.global.title)}
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[32px] md:text-[48px] font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999] leading-[1.1] max-w-2xl mb-12"
          >
            {t({ en: 'Connecting Schools Worldwide', ar: 'ربط المدارس في جميع أنحاء العالم' })}
          </motion.h2>

          {/* Locations list moved ABOVE the map */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-3xl mx-auto relative z-20">
            {content.global.locations.map((loc: any, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#191919] border border-white/[0.05] shadow-[inset_0_1px_16px_rgba(255,255,255,0.05),0_0_20px_rgba(235,69,32,0.1)] hover:border-white/[0.1] hover:bg-[#222222] transition-all cursor-default group"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#eb4520] shadow-[0_0_12px_rgba(235,69,32,0.8)] group-hover:scale-110 transition-transform" />
                <span className="text-white font-medium text-[16px]">{t(loc.name)}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Seamless Map Background directly on canvas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-6xl mx-auto aspect-[2/1] md:aspect-[2.5/1] flex items-center justify-center group"
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 130,
              center: [20, 30] // Centers map nicely for EMEA focus
            }}
            className="w-full h-full relative z-10"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const enName = geo.properties.name;
                  const arName = countryTranslations[enName] || 'غير محدد';
                  const isActive = activeCountries.includes(enName);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(e) => handleMouseEnter(enName, arName, e as any)}
                      onMouseMove={handleMouseMove as any}
                      onMouseLeave={handleMouseLeave}
                      fill={isActive ? "rgba(235,69,32,0.6)" : "#111111"}
                      stroke="#222222"
                      strokeWidth={0.5}
                      className="transition-all duration-300 cursor-pointer"
                      style={{
                        default: { outline: 'none' },
                        hover: { 
                          outline: 'none', 
                          fill: isActive ? '#eb4520' : '#2a2a2a', 
                          stroke: isActive ? '#ff5911' : '#eb4520',
                          strokeWidth: 1,
                          filter: isActive ? 'drop-shadow(0px 0px 12px rgba(235, 69, 32, 0.8))' : 'drop-shadow(0px 0px 8px rgba(235, 69, 32, 0.4))',
                        },
                        pressed: { outline: 'none', fill: '#eb4520' },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>

          {/* Map Overlay Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%] rounded-full opacity-10 bg-[radial-gradient(ellipse_at_center,rgba(235,69,32,0.5)_0%,transparent_70%)] pointer-events-none blur-[60px]" />
          
          {/* Bottom fade for depth */}
          <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Modern Tooltip */}
      {tooltip.show && (
        <div 
          className="fixed pointer-events-none z-[9999] px-4 py-2 flex flex-col items-center gap-1 rounded-[12px] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-md bg-[#191919]/90"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 15}px`,
            transform: 'translate(-50%, -100%)',
            transition: 'opacity 0.15s ease'
          }}
        >
          <span className="font-medium text-white text-[14px]">
            {tooltip.ar}
          </span>
          <span className="text-[#999999] text-[12px]">
            {tooltip.en}
          </span>
        </div>
      )}
    </section>
  );
}