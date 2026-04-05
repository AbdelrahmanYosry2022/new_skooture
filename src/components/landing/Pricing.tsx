import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { CheckCircle2, ArrowRight, XCircle } from 'lucide-react';

export default function Pricing() {
  const { content, t, language } = useContent();
  const plans = content.pricing?.plans || [];
  const isRTL = language === 'ar';

  return (
    <section id="pricing" className="clean-section bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="clean-heading-2"
          >
            {t(content.pricing?.title)}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`clean-card p-8 flex flex-col ${plan.highlighted ? 'ring-2 ring-blue-600 dark:ring-blue-500 shadow-elevated relative bg-slate-900 dark:bg-zinc-900' : 'bg-white dark:bg-zinc-950'}`}
            >
              {plan.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {t(plan.badge)}
                </div>
              )}
              
              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {t(plan.name)}
                </h3>
              </div>

              <div className="space-y-3 mb-8">
                {plan.details?.map((detail: any, dIndex: number) => (
                  <p key={dIndex} className={`font-medium ${plan.highlighted ? 'text-slate-300' : 'text-slate-600 dark:text-zinc-400'}`}>
                    {t(detail)}
                  </p>
                ))}
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features?.map((feature: any, fIndex: number) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    {feature.included ? (
                      <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlighted ? 'text-blue-400' : 'text-blue-600 dark:text-blue-400'}`} />
                    ) : (
                      <XCircle className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlighted ? 'text-slate-600' : 'text-slate-300 dark:text-zinc-700'}`} />
                    )}
                    <span className={`${plan.highlighted ? (feature.included ? 'text-slate-100' : 'text-slate-500 line-through') : (feature.included ? 'text-slate-700 dark:text-zinc-300' : 'text-slate-400 dark:text-zinc-600 line-through')}`}>
                      {t(feature.name)}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${plan.highlighted ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white'}`}>
                {t(content.pricing?.button)}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
