import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import DynamicIcon from '../shared/DynamicIcon';

export default function FAQ() {
  const { content, t } = useContent();
  const faqs = content.faq?.items || [];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00a86b]/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="theme-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[#00a86b] text-sm font-medium mb-6"
          >
            <DynamicIcon name="MessageCircleQuestion" className="w-4 h-4" />
            <span>{t({ en: 'FAQ', ar: 'الأسئلة الشائعة' })}</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="theme-headline text-4xl md:text-5xl font-bold mb-6"
          >
            {t(content.faq?.title)}
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq: any, index: number) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'theme-panel-strong border-[#00a86b]/30 shadow-[0_0_20px_rgba(0,168,107,0.1)]' 
                    : 'theme-panel border-border hover:border-border'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className={`font-semibold text-lg pr-8 transition-colors duration-300 ${isOpen ? 'text-[#00a86b]' : 'text-[color:var(--text-soft)] group-hover:text-foreground'}`}>
                    {t(faq.question)}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-[#00a86b]/20 text-[#00a86b]' : 'bg-foreground/5 text-[color:var(--text-dim)] group-hover:bg-foreground/10 group-hover:text-foreground'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-[color:var(--text-soft)] leading-relaxed border-t border-border">
                        {t(faq.answer)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
