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
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[#000000] min-h-screen flex items-center">
      {/* Exact Background Decorative Glow matching Reference */}
      <div className="absolute top-1/2 left-[45%] -translate-y-1/2 w-[1000px] h-[800px] rounded-full opacity-70 bg-[radial-gradient(ellipse_at_center,rgba(235,69,32,0.25)_0%,rgba(235,69,32,0.05)_40%,transparent_70%)] pointer-events-none blur-[60px]" />
      
      <div className="container max-w-[1200px] mx-auto px-6 relative z-10 w-full">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center relative"
        >
          {/* Left Column (Constrained text content) */}
          <div className="text-left w-full lg:w-[504px] flex-shrink-0 z-20 relative">
            {/* Top Badge */}
            {content.hero?.topBadge && (
              <motion.div variants={itemVariants} className="mb-6 flex justify-start">
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-[21px] bg-[#191919] shadow-[inset_0_1px_16px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.09)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[radial-gradient(100%_100%_at_50%_0%,#ffa984_0%,#ff5911_100%)] flex-shrink-0 shadow-[inset_0_1px_16px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.09)]"></span>
                  <span className="text-[14px] font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#e86f3a] to-[#fcbda2]">
                    {t(content.hero.topBadge) || t({ en: 'We raised $200,000 series A', ar: 'جمعنا 200,000 دولار في السلسلة أ' })}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-[44px] sm:text-[56px] md:text-[64px] font-medium tracking-tight mb-6 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999]"
            >
              {(t(content.hero?.headline) || t({ en: 'Redefine Real Estate\nTransactions', ar: 'أعد تعريف المعاملات\nالعقارية' })).split('\n').map((line: string, i: number) => (
                <span key={i} className="block">{line}</span>
              ))}
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={itemVariants}
              className="text-[16px] text-[#aeaeae] mb-10 leading-[1.6]"
            >
              {t(content.hero?.subheadline) || t({ 
                en: 'The all-in-one property management and marketplace platform where you can manage, list, sell, or find your perfect property seamlessly.', 
                ar: 'المنصة الشاملة لإدارة العقارات والسوق حيث يمكنك إدارة أو عرض أو بيع أو العثور على عقارك المثالي بسلاسة.' 
              })}
            </motion.p>

            {/* CTA Buttons - EXACT match with reference */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-start gap-4 mb-16"
            >
              {content.hero?.buttons?.explore && (
                <a href="#" className="inline-flex">
                  <Button className="h-[48px] px-[20px] rounded-[10px] bg-[#eb4520] hover:bg-[#d63d1a] text-white font-semibold text-[16px] transition-all duration-200 shadow-[0_1px_2px_rgba(82,88,102,0.06)] hover:shadow-[0_0_20px_rgba(255,80,36,0.4)] border-0">
                    {t(content.hero.buttons.explore)}
                  </Button>
                </a>
              )}
              {content.hero?.buttons?.demo && (
                <a href="#" className="inline-flex items-center justify-center h-[48px] px-[20px] rounded-[10px] bg-transparent text-white font-semibold text-[16px] hover:bg-white/[0.05] transition-colors duration-200 border border-white/[0.1]">
                  {t(content.hero.buttons.demo)}
                </a>
              )}
            </motion.div>

            {/* Trusted By / Logos */}
            <motion.div variants={itemVariants} className="flex flex-col gap-6 w-full overflow-hidden">
              <p className="text-[16px] text-[#aeaeae]">
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
                      <div className="flex items-center gap-2.5 text-[22px] font-bold tracking-tight text-white/90">
                        <div className="w-5 h-5 rounded-sm bg-white/90" /> Penta
                      </div>
                      <div className="flex items-center gap-2.5 text-[22px] font-bold tracking-tight text-white/90">
                        <div className="w-5 h-5 rounded-full border-[3px] border-white/90" /> Homey
                      </div>
                      <div className="flex items-center gap-2.5 text-[22px] font-bold tracking-tight text-white/90">
                        <div className="w-5 h-5 bg-white/90 rotate-45" /> Network
                      </div>
                      <div className="flex items-center gap-2.5 text-[22px] font-bold tracking-tight text-white/90">
                        <div className="w-5 h-5 rounded-full bg-white/90" /> vis
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
            className="hidden lg:block absolute left-[50%] top-1/2 -translate-y-1/2 w-[1000px] h-[720px] z-10 pointer-events-none ml-[40px] pl-[40px]"
          >
             <div className="relative w-full h-[600px] xl:h-[700px] mt-[10px] rounded-[32px] overflow-hidden border border-white/[0.08] shadow-[0_20px_80px_rgba(235,69,32,0.15)] bg-black/40 backdrop-blur-md">
                {content.hero?.videoUrl ? (
                  <img 
                    src={content.hero.videoUrl} 
                    alt="Hero Visual" 
                    className="w-full h-full object-cover object-left-top"
                  />
                ) : (
                  <img 
                    src="/images/dashboard-preview.png" 
                    alt="Dashboard UI" 
                    className="w-full h-full object-cover object-left-top"
                  />
                )}
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
