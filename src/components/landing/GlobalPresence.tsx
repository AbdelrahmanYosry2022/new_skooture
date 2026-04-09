import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

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
  const { content, t, language } = useContent();
  const isRTL = language === 'ar';

  const [tooltip, setTooltip] = useState({
    show: false,
    en: '',
    ar: '',
    x: 0,
    y: 0
  });

  const handleMouseEnter = (name: string, nameAr: string, e: React.MouseEvent) => {
    if (!activeCountries.includes(name)) return;
    setTooltip({
      show: true,
      en: name,
      ar: nameAr,
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tooltip.show) return;
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
    <section id="global" className="py-24 md:py-32 bg-background relative overflow-hidden">

      <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content Column */}
          <div className="flex flex-col items-start text-left rtl:text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-[21px] bg-[#191919] shadow-[inset_0_1px_16px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.09)]"
            >
              <span className="w-2 h-2 rounded-full bg-[radial-gradient(100%_100%_at_50%_0%,#80ebb8_0%,#00a86b_100%)] shadow-[inset_0_1px_16px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.09)] shrink-0"></span>
              <span className="text-[13px] font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#00e695] to-[#b3f0d4]">
                {t(content.global.title)}
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[36px] md:text-[48px] lg:text-[56px] font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999] leading-[1.1] mb-6"
            >
              {t({ en: 'Connecting Schools Worldwide', ar: 'ربط المدارس في جميع أنحاء العالم' })}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[16px] md:text-[18px] text-muted-foreground leading-[1.65] mb-10 max-w-[480px]"
            >
              {t({ 
                en: 'Join a rapidly growing ecosystem of educational institutions worldwide. Skooture provides the global infrastructure needed to scale your school\'s vision beyond borders with localized, powerful AI tools.', 
                ar: 'انضم إلى نظام بيئي سريع النمو من المؤسسات التعليمية في جميع أنحاء العالم. يوفر Skooture البنية التحتية العالمية اللازمة لتوسيع رؤية مدرستك خارج الحدود بأدوات ذكاء اصطناعي قوية ومخصصة.' 
              })}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group inline-flex h-[48px] shrink-0 items-center justify-center gap-2 rounded-[8px] px-6 text-[15px] font-medium text-foreground transition-all duration-200 hover:brightness-110 shadow-[0_0_20px_rgba(0,168,107,0.2)]"
              style={{ backgroundColor: 'rgb(0,168,107)' }}
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t({ en: 'Join Our Network', ar: 'انضم لشبكتنا' })}
              <ArrowRight
                className={`h-4 w-4 transition-transform duration-200 ${
                  isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                }`}
              />
            </motion.button>
          </div>

          {/* Map Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[4/3] flex items-center justify-center group"
          >
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 160,
                center: [20, 40] // Centered to frame EMEA region nicely
              }}
              className="w-full h-full relative z-10 drop-shadow-2xl"
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const enName = geo.properties.name;
                    const arName = countryTranslations[enName] || 'غير محدد';
                    const isActive = activeCountries.includes(enName);

                    const styleProps = isActive ? {
                      default: { outline: 'none', fill: '#00a86b', stroke: '#222222', strokeWidth: 0.5 },
                      hover: { 
                        outline: 'none', 
                        fill: '#00a86b', 
                        stroke: '#34d399',
                        strokeWidth: 1,
                        filter: 'drop-shadow(0px 0px 16px rgba(0, 210, 135, 0.9))',
                      },
                      pressed: { outline: 'none', fill: '#008f5b' },
                    } : {
                      default: { outline: 'none', fill: '#0a0a0a', stroke: '#1a1a1a', strokeWidth: 0.5 },
                      hover: { outline: 'none', fill: '#0a0a0a', stroke: '#1a1a1a', strokeWidth: 0.5 },
                      pressed: { outline: 'none', fill: '#0a0a0a', stroke: '#1a1a1a', strokeWidth: 0.5 },
                    };

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={(e) => handleMouseEnter(enName, arName, e as any)}
                        onMouseMove={handleMouseMove as any}
                        onMouseLeave={handleMouseLeave}
                        className={isActive ? "transition-all duration-300 cursor-pointer" : "outline-none"}
                        style={styleProps}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>

          </motion.div>
        </div>
      </div>

      {/* Modern Tooltip for Active Countries Only */}
      {tooltip.show && (
        <div 
          className="fixed pointer-events-none z-[9999] px-4 py-2 flex flex-col items-center gap-1 rounded-[12px] border border-[#00a86b]/30 shadow-[0_8px_32px_0_rgba(0,168,107,0.2)] backdrop-blur-md bg-[#191919]/95"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 15}px`,
            transform: 'translate(-50%, -100%)',
            transition: 'opacity 0.15s ease'
          }}
        >
          <span className="font-medium text-foreground text-[14px]">
            {tooltip.ar}
          </span>
          <span className="text-[#00a86b] font-medium text-[12px]">
            {tooltip.en}
          </span>
        </div>
      )}
    </section>
  );
}
