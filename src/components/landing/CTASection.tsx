import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { ArrowRight } from 'lucide-react';
import DynamicIcon from '../shared/DynamicIcon';

export default function CTASection() {
  const { content, t, language } = useContent();
  const cta = content.cta;

  if (!cta) return null;

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#000000]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#eb4520]/[0.05] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8 p-12 md:p-20 rounded-[3rem] bg-[#191919]/40 backdrop-blur-xl border border-white/[0.05] shadow-[0_0_50px_rgba(235,69,32,0.05)] relative overflow-hidden group"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#eb4520]/0 via-[#eb4520]/[0.02] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#eb4520]/30 to-transparent opacity-50" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#191919] border border-white/[0.1] text-[#eb4520] mb-6 shadow-[0_0_30px_rgba(235,69,32,0.2)]"
          >
            <DynamicIcon name="Rocket" className="w-10 h-10" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999] leading-tight max-w-3xl mx-auto">
            {t(cta.title)}
          </h2>
          
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {t(cta.subtitle)}
          </p>
          
          <div className="pt-8">
            <button className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#eb4520] to-[#ff6b4a] hover:from-[#ff5a36] hover:to-[#ff8166] text-white rounded-full font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(235,69,32,0.3)] hover:shadow-[0_0_50px_rgba(235,69,32,0.5)] hover:scale-105">
              {t(cta.button)}
              <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
