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

  const visiblePlans = plans.filter((plan: any) => {
    if (!plan.billingPeriod || plan.billingPeriod === 'both') return true;
    return isAnnual ? plan.billingPeriod === 'annual' : plan.billingPeriod === 'monthly';
  });

  if (!plans.length) return null;

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00a86b]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="theme-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[#00a86b] text-sm font-medium mb-6"
          >
            <DynamicIcon name="Tag" className="w-4 h-4" />
            <span>{t({ en: 'Pricing', ar: 'الأسعار' })}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="theme-headline text-4xl md:text-5xl font-bold mb-6"
          >
            {t(pricingData.title)}
          </motion.h2>
          {pricingData.subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-8"
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
            <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-[color:var(--text-dim)]'}`}>
              {t({ en: 'Monthly', ar: 'شهري' })}
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
               className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${isAnnual ? 'bg-[#00a86b]' : 'theme-soft-surface'}`}
            >
              <span className="sr-only">Toggle billing period</span>
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${isAnnual ? 'translate-x-8 rtl:-translate-x-8' : 'translate-x-1 rtl:-translate-x-1'}`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-[color:var(--text-dim)]'}`}>
                {t({ en: 'Annually', ar: 'سنوي' })}
              </span>
               <span className="px-2.5 py-0.5 rounded-full bg-[#00a86b]/10 text-[#00a86b] text-xs font-bold border border-[#00a86b]/20">
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
                    ? 'theme-panel-strong border-[#00a86b]/60 shadow-[0_12px_40px_rgba(0,168,107,0.15)] transform md:-translate-y-3 z-20 scale-[1.02]' 
                    : 'theme-panel border-border'
                }`}
              >
                {/* Highlight Glow Effect */}
                {(plan.highlighted || plan.popular) && (
                  <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-b from-[#00a86b]/40 to-transparent opacity-20 pointer-events-none" />
                )}

                <div className="mb-6 relative z-10 pt-2 border-b border-border/60 pb-6">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-none">{t(plan.name)}</h3>
                    {plan.badge && (
                      <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gradient-to-r from-[#00a86b]/10 to-transparent border border-[#00a86b]/20 shadow-[0_0_12px_rgba(0,168,107,0.15)] relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(0,168,107,0.3)] transition-all duration-300 shrink-0">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#00a86b]/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                        <span className="relative text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#00a86b]">
                          {t(plan.badge)}
                        </span>
                      </div>
                    )}
                  </div>
                
                {/* Details list from the images instead of description */}
                <div className="flex flex-col gap-2.5 min-h-[90px]">
                  {plan.details?.map((detail: any, dIndex: number) => (
                    <p key={dIndex} className="text-[13px] text-[color:var(--text-soft)] font-medium">
                      {t(detail)}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mb-6 relative z-10">
                {(() => {
                  const priceObj = plan.price || {};
                  const monthly = priceObj.monthly || t({ en: 'Contact', ar: 'اتصل' });
                  const annual = priceObj.annual ?? monthly;
                  const suffix = isAnnual ? t({ en: '/ year', ar: '/ سنة' }) : t({ en: '/ month', ar: '/ شهر' });

                  return (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                          {isAnnual ? annual : monthly}
                        </span>
                        <span className="text-xs sm:text-sm text-[color:var(--text-dim)] font-medium">
                          {suffix}
                        </span>
                      </div>
                      {isAnnual && plan.billingPeriod !== 'monthly' && (
                        <p className="text-xs text-[#00a86b] mt-1.5 font-medium">
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
                       <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#00a86b] shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-foreground/20 shrink-0 mt-0.5" />
                    )}
                    <span className={`text-xs sm:text-sm text-[color:var(--text-soft)] leading-tight ${feature.included === false ? 'opacity-50 line-through' : ''}`}>
                      {t(feature.name)}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-medium transition-all relative z-10 mt-auto ${
                (plan.highlighted || plan.popular)
                   ? 'bg-[#00a86b] hover:bg-[#008f5b] text-white shadow-[0_0_20px_rgba(0,168,107,0.3)]' 
                   : 'theme-soft-surface hover:bg-foreground/5 text-foreground'
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
