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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#eb4520]/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#191919] border border-white/[0.05] text-[#eb4520] text-sm font-medium mb-6"
          >
            <DynamicIcon name="MessageCircleQuestion" className="w-4 h-4" />
            <span>{t({ en: 'FAQ', ar: 'الأسئلة الشائعة' })}</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999]"
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
                    ? 'bg-[#191919]/80 border-[#eb4520]/30 shadow-[0_0_20px_rgba(235,69,32,0.1)]' 
                    : 'bg-[#191919]/40 border-white/[0.05] hover:border-white/[0.1] hover:bg-[#191919]/60'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className={`font-semibold text-lg pr-8 transition-colors duration-300 ${isOpen ? 'text-[#eb4520]' : 'text-zinc-200 group-hover:text-white'}`}>
                    {t(faq.question)}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-[#eb4520]/20 text-[#eb4520]' : 'bg-white/[0.05] text-zinc-400 group-hover:bg-white/[0.1] group-hover:text-white'}`}>
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
                      <div className="px-6 pb-6 pt-2 text-zinc-400 leading-relaxed border-t border-white/[0.05]">
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
