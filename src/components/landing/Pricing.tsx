import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { CheckCircle2, X } from 'lucide-react';
import DynamicIcon from '../shared/DynamicIcon';

export default function Pricing() {
  const { content, t, language } = useContent();
  const pricingData = (content as any).pricing || {};
  const [isAnnual, setIsAnnual] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const plans = pricingData.plans || [];
  const isRTL = language === 'ar';

  // If there are separate plans intended for annual, they would be marked here.
  // For now, we will simply display all plans, and the toggle could be wired to price fields.
  const visiblePlans = plans;

  if (!plans.length) return null;

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#eb4520]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#191919] border border-white/[0.05] text-[#eb4520] text-sm font-medium mb-6"
          >
            <DynamicIcon name="Tag" className="w-4 h-4" />
            <span>{t({ en: 'Pricing', ar: 'الأسعار' })}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999]"
          >
            {t(pricingData.title)}
          </motion.h2>
          {pricingData.subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-zinc-400 mb-8"
            >
              {t(pricingData.subtitle)}
            </motion.p>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4"
          >
            <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-zinc-500'}`}>
              {t({ en: 'Monthly', ar: 'شهري' })}
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${isAnnual ? 'bg-[#eb4520]' : 'bg-[#191919] border border-white/[0.1]'}`}
            >
              <span className="sr-only">Toggle billing period</span>
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${isAnnual ? 'translate-x-8 rtl:-translate-x-8' : 'translate-x-1 rtl:-translate-x-1'}`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-zinc-500'}`}>
                {t({ en: 'Annually', ar: 'سنوي' })}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#eb4520]/10 text-[#eb4520] text-xs font-bold border border-[#eb4520]/20">
                {t({ en: 'Save 20%', ar: 'وفر 20%' })}
              </span>
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={isAnnual ? 'annual' : 'monthly'}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className={`grid gap-4 lg:gap-6 mx-auto ${
              visiblePlans.length === 1 
                ? 'max-w-[400px]' // Center a single card beautifully
                : 'md:grid-cols-2 lg:grid-cols-3 max-w-[1000px]' // Perfect for 3 cards
            }`}
          >
            {visiblePlans.map((plan: any, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group relative flex flex-col p-5 lg:p-6 rounded-[24px] backdrop-blur-md transition-all duration-500 border ${
                  (plan.highlighted || plan.popular)
                    ? 'bg-[#191919] border-[#eb4520]/60 shadow-[0_12px_40px_rgba(235,69,32,0.15)] transform md:-translate-y-3 z-20 scale-[1.02]' 
                    : 'bg-[#111111]/80 border-white/[0.08] hover:border-white/[0.15] hover:bg-[#191919]'
                }`}
              >
                {/* Highlight Glow Effect */}
                {(plan.highlighted || plan.popular) && (
                  <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-b from-[#eb4520]/40 to-transparent opacity-20 pointer-events-none" />
                )}

                <div className="mb-6 relative z-10 pt-2 border-b border-white/5 pb-6">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-none">{t(plan.name)}</h3>
                    {plan.badge && (
                      <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gradient-to-r from-[#eb4520]/10 to-transparent border border-[#eb4520]/20 shadow-[0_0_12px_rgba(235,69,32,0.15)] relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(235,69,32,0.3)] transition-all duration-300 shrink-0">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#eb4520]/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                        <span className="relative text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#eb4520]">
                          {t(plan.badge)}
                        </span>
                      </div>
                    )}
                  </div>
                
                {/* Details list from the images instead of description */}
                <div className="flex flex-col gap-2.5 min-h-[90px]">
                  {plan.details?.map((detail: any, dIndex: number) => (
                    <p key={dIndex} className="text-[13px] text-zinc-300 font-medium">
                      {t(detail)}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mb-6 relative z-10 hidden">
                {/* Derive a safe price display if plan.price is missing in content */}
                {(() => {
                  const priceObj = plan.price || {};

                  // Try to extract a price string from plan.details if price not provided
                  const extractFromDetails = (details: any[]) => {
                    if (!Array.isArray(details)) return undefined;
                    for (const d of details) {
                      if (typeof d !== 'string') continue;
                      // match patterns like "$ 49.00", "$49.00", "$ 0.50"
                      const m = d.match(/\$\s*([\d.,]+)/);
                      if (m) return `$${m[1]}`;
                      // fallback: match numbers
                      const n = d.match(/([\d]+(?:[.,]\d+)?)/);
                      if (n) return n[1];
                    }
                    return undefined;
                  };

                  const monthly = priceObj.monthly ?? extractFromDetails(plan.details) ?? t({ en: 'Contact', ar: 'اتصل' });
                  const annual = priceObj.annual ?? monthly;

                  return (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                          {isAnnual ? annual : monthly}
                        </span>
                        <span className="text-xs sm:text-sm text-zinc-500 font-medium">
                          / {t({ en: 'mo', ar: 'شهر' })}
                        </span>
                      </div>
                      {isAnnual && String(monthly) !== 'Custom' && (
                        <p className="text-xs text-[#eb4520] mt-1.5 font-medium">
                          {t({ en: 'Billed annually', ar: 'تدفع سنوياً' })}
                        </p>
                      )}
                    </>
                  );
                })()}
              </div>

              <ul className="space-y-3 mb-6 flex-1 relative z-10">
                {plan.features.map((feature: any, fIndex: number) => (
                  <li key={fIndex} className="flex items-start gap-2.5">
                    {feature.included !== false ? (
                      <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#eb4520] shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white/[0.2] shrink-0 mt-0.5" />
                    )}
                    <span className={`text-xs sm:text-sm text-zinc-300 leading-tight ${feature.included === false ? 'opacity-50 line-through' : ''}`}>
                      {t(feature.name)}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-medium transition-all relative z-10 mt-auto ${
                (plan.highlighted || plan.popular)
                  ? 'bg-[#eb4520] hover:bg-[#ff5a36] text-white shadow-[0_0_20px_rgba(235,69,32,0.3)]' 
                  : 'bg-[#191919] hover:bg-[#252525] border border-white/[0.1] hover:border-white/[0.2] text-white'
              }`}>
                {t(plan.cta || { en: 'Get Started', ar: 'ابدأ الآن' })}
              </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
