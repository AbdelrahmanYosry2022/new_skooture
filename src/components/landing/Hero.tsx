import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export default function Hero() {
  const { content, t, language } = useContent();
  const isRTL = language === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background min-h-screen flex items-center">
      <div className="container max-w-[1200px] mx-auto px-6 relative z-10 w-full">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center relative"
        >
          {/* Left Column (Constrained text content) */}
          <div className="w-full lg:w-[504px] flex-shrink-0 z-20 relative text-left rtl:text-right">
            {/* Top Badge */}
            {content.hero?.topBadge && (
              <motion.div variants={itemVariants} className="mb-6 flex justify-start">
                <div className="theme-badge inline-flex items-center gap-2.5 px-3 py-1.5 rounded-[21px]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[radial-gradient(100%_100%_at_50%_0%,#80ebb8_0%,#00a86b_100%)] flex-shrink-0 shadow-[0_0_12px_rgba(0,168,107,0.35)]"></span>
                  <span className="text-[14px] font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#00e695] to-[#b3f0d4]">
                    {t(content.hero.topBadge) || t({ en: 'We raised $200,000 series A', ar: 'جمعنا 200,000 دولار في السلسلة أ' })}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="theme-headline text-[44px] sm:text-[56px] md:text-[64px] font-medium tracking-tight mb-6 leading-[1.1]"
            >
              {(t(content.hero?.headline) || t({ en: 'Redefine Real Estate\nTransactions', ar: 'أعد تعريف المعاملات\nالعقارية' })).split('\n').map((line: string, i: number) => (
                <span key={i} className="block">{line}</span>
              ))}
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={itemVariants}
              className="text-[16px] text-muted-foreground mb-10 leading-[1.6]"
            >
              {t(content.hero?.subheadline) || t({ 
                en: 'The all-in-one property management and marketplace platform where you can manage, list, sell, or find your perfect property seamlessly.', 
                ar: 'المنصة الشاملة لإدارة العقارات والسوق حيث يمكنك إدارة أو عرض أو بيع أو العثور على عقارك المثالي بسلاسة.' 
              })}
            </motion.p>

            {/* CTA Buttons - EXACT match with reference */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-4 mb-16 justify-start"
            >
              {content.hero?.buttons?.explore && (
                <a href="#" className="inline-flex">
                  <Button className="h-[48px] px-[20px] rounded-[10px] bg-[#00a86b] hover:bg-[#008f5b] text-white font-semibold text-[16px] transition-all duration-200 shadow-[0_1px_2px_rgba(82,88,102,0.06)] hover:shadow-[0_0_20px_rgba(51,219,159,0.4)] border-0">
                    {t(content.hero.buttons.explore)}
                  </Button>
                </a>
              )}
              {content.hero?.buttons?.demo && (
                <a href="#" className="theme-soft-surface inline-flex items-center justify-center h-[48px] px-[20px] rounded-[10px] text-foreground font-semibold text-[16px] hover:bg-foreground/5 transition-colors duration-200">
                  {t(content.hero.buttons.demo)}
                </a>
              )}
            </motion.div>

            {/* Trusted By / Logos */}
            <motion.div variants={itemVariants} className="flex flex-col gap-6 w-full overflow-hidden">
              <p className="text-[16px] text-muted-foreground">
                {t({ en: 'Join 4,000+ companies already growing', ar: 'انضم لأكثر من 4,000 شركة تنمو معنا' })}
              </p>
              {/* Scrolling Logos Container */}
              <div 
                className="w-full relative opacity-60"
                style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 12.5%, black 87.5%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12.5%, black 87.5%, transparent 100%)' }}
              >
                <motion.div 
                  animate={{ x: [0, -1035] }}
                  transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                  className="flex items-center gap-12 whitespace-nowrap min-w-max py-2"
                >
                  {/* Repeated for scroll effect */}
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center gap-12 grayscale hover:grayscale-0 transition-all duration-500">
                      {/* Placeholder logos mimicking Penta, Homey, Network, Visa style */}
                      <div className="flex items-center gap-2.5 text-[22px] font-bold tracking-tight text-foreground/80">
                        <div className="w-5 h-5 rounded-sm bg-foreground/80" /> Penta
                      </div>
                      <div className="flex items-center gap-2.5 text-[22px] font-bold tracking-tight text-foreground/80">
                        <div className="w-5 h-5 rounded-full border-[3px] border-foreground/80" /> Homey
                      </div>
                      <div className="flex items-center gap-2.5 text-[22px] font-bold tracking-tight text-foreground/80">
                        <div className="w-5 h-5 bg-foreground/80 rotate-45" /> Network
                      </div>
                      <div className="flex items-center gap-2.5 text-[22px] font-bold tracking-tight text-foreground/80">
                        <div className="w-5 h-5 rounded-full bg-foreground/80" /> vis
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Column / Large Absolute Image (Matching position strictly) */}
          <motion.div 
            variants={itemVariants}
            className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-[1000px] h-[720px] z-10 pointer-events-none ${isRTL ? 'right-[50%] mr-[40px] pr-[40px]' : 'left-[50%] ml-[40px] pl-[40px]'}`}
          >
             <div className="theme-panel relative w-full h-[600px] xl:h-[700px] mt-[10px] rounded-[32px] overflow-hidden shadow-[0_20px_80px_rgba(0,168,107,0.15)]">
                {content.hero?.videoUrl ? (
                  <img 
                    src={content.hero.videoUrl} 
                    alt="Hero Visual" 
                    className={`w-full h-full object-cover ${isRTL ? 'object-right-top' : 'object-left-top'}`}
                  />
                ) : (
                  <img 
                    src="/images/hero-fallback-dashboard.jpg" 
                    alt="Dashboard UI" 
                    className={`w-full h-full object-cover ${isRTL ? 'object-right-top' : 'object-left-top'}`}
                  />
                )}
                <div className="absolute inset-0 bg-[color:var(--hero-media)] mix-blend-multiply pointer-events-none" />
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
