import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { CheckCircle2, X } from 'lucide-react';

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
    <section id="pricing" className="clean-section bg-slate-50 dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="clean-heading-2"
          >
            {t(pricingData.title)}
          </motion.h2>
          {pricingData.subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="clean-paragraph mb-8"
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
            <span className={`text-sm font-medium ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-zinc-400'}`}>
              {t({ en: 'Monthly', ar: 'شهري' })}
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${isAnnual ? 'bg-blue-600' : 'bg-slate-300 dark:bg-zinc-700'}`}
            >
              <span className="sr-only">Toggle billing period</span>
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-8 rtl:-translate-x-8' : 'translate-x-1 rtl:-translate-x-1'}`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-zinc-400'}`}>
                {t({ en: 'Annually', ar: 'سنوي' })}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold">
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
              className={`clean-card flex flex-col p-8 ${
                plan.popular 
                  ? 'border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500 relative transform md:-translate-y-4' 
                  : 'border-slate-200 dark:border-zinc-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-sm">
                    {t({ en: 'Most Popular', ar: 'الأكثر طلباً' })}
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t(plan.name)}</h3>
                <p className="text-slate-500 dark:text-zinc-400 h-12">{t(plan.description)}</p>
              </div>

              <div className="mb-8">
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
                        <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                          {isAnnual ? annual : monthly}
                        </span>
                        <span className="text-slate-500 dark:text-zinc-400 font-medium">
                          / {t({ en: 'mo', ar: 'شهر' })}
                        </span>
                      </div>
                      {isAnnual && String(monthly) !== 'Custom' && (
                        <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                          {t({ en: 'Billed annually', ar: 'تدفع سنوياً' })}
                        </p>
                      )}
                    </>
                  );
                })()}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature: any, fIndex: number) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    {feature.included !== false ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-slate-300 dark:text-zinc-600 shrink-0 mt-0.5" />
                    )}
                    <span className={`text-slate-700 dark:text-zinc-300 ${feature.included === false ? 'opacity-50 line-through' : ''}`}>
                      {t(feature.name)}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-medium transition-all ${
                plan.popular 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20' 
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-900 dark:text-white'
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
