import { useState } from 'react';
import { motion } from 'framer-motion';
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

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan: any, index: number) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative flex flex-col p-8 rounded-2xl bg-[#191919]/60 backdrop-blur-md transition-all duration-500 ${
                plan.popular 
                  ? 'border-[#eb4520]/50 shadow-[0_0_30px_rgba(235,69,32,0.15)] transform md:-translate-y-4' 
                  : 'border-white/[0.05] hover:border-[#eb4520]/30'
              }`}
            >
              {/* Soft Background Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#eb4520]/0 to-[#eb4520]/0 group-hover:from-[#eb4520]/[0.02] group-hover:to-transparent transition-colors duration-500 rounded-2xl pointer-events-none" />

              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-[#eb4520] to-[#ff6b4a] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-[0_4px_10px_rgba(235,69,32,0.3)]">
                    {t({ en: 'Most Popular', ar: 'الأكثر طلباً' })}
                  </span>
                </div>
              )}

              <div className="mb-8 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">{t(plan.name)}</h3>
                <p className="text-zinc-400 h-12">{t(plan.description)}</p>
              </div>

              <div className="mb-8 relative z-10">
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
                        <span className="text-4xl font-extrabold text-white">
                          {isAnnual ? annual : monthly}
                        </span>
                        <span className="text-zinc-500 font-medium">
                          / {t({ en: 'mo', ar: 'شهر' })}
                        </span>
                      </div>
                      {isAnnual && String(monthly) !== 'Custom' && (
                        <p className="text-sm text-[#eb4520] mt-2 font-medium">
                          {t({ en: 'Billed annually', ar: 'تدفع سنوياً' })}
                        </p>
                      )}
                    </>
                  );
                })()}
              </div>

              <ul className="space-y-4 mb-8 flex-1 relative z-10">
                {plan.features.map((feature: any, fIndex: number) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    {feature.included !== false ? (
                      <CheckCircle2 className="w-5 h-5 text-[#eb4520] shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-white/[0.2] shrink-0 mt-0.5" />
                    )}
                    <span className={`text-zinc-300 ${feature.included === false ? 'opacity-50 line-through' : ''}`}>
                      {t(feature.name)}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-medium transition-all relative z-10 ${
                plan.popular 
                  ? 'bg-[#eb4520] hover:bg-[#ff5a36] text-white shadow-[0_0_20px_rgba(235,69,32,0.3)]' 
                  : 'bg-[#191919] hover:bg-[#252525] border border-white/[0.1] hover:border-white/[0.2] text-white'
              }`}>
                {t(plan.cta || { en: 'Get Started', ar: 'ابدأ الآن' })}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
