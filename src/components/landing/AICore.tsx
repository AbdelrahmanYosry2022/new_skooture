import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import DynamicIcon from '../shared/DynamicIcon';

export default function AICore() {
  const { content, t } = useContent();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section id="features" className="py-24 md:py-32 bg-[#000000] relative overflow-hidden border-t border-white/[0.05]">
      {/* Decorative Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(235,69,32,0.15)_0%,transparent_70%)] rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(235,69,32,0.15)_0%,transparent_70%)] rounded-full blur-[80px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-[21px] bg-[#191919] shadow-[inset_0_1px_16px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.09)]"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[radial-gradient(100%_100%_at_50%_0%,#ffa984_0%,#ff5911_100%)] shadow-[inset_0_1px_16px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.09)] shrink-0"></span>
            <span className="text-[14px] font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#e86f3a] to-[#fcbda2]">
              {t({ en: 'AI Powered', ar: 'مدعوم بالذكاء الاصطناعي' })}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[32px] md:text-[48px] font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999] leading-[1.1] max-w-2xl"
          >
            {t(content.aiCore.title)}
          </motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {content.aiCore.features.map((feature: any, index: number) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative h-full"
            >
              {/* Internal subtle glow on hover */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(235,69,32,0.1)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px] pointer-events-none" />
              
              <div className="relative h-full p-8 md:p-10 rounded-[24px] bg-[#191919]/60 border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:bg-[#191919]/80 flex flex-col items-start overflow-hidden">
                <div className="w-14 h-14 rounded-[16px] bg-[#2a2a2a] flex items-center justify-center mb-8 border border-white/[0.05] shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] text-[#eb4520] group-hover:scale-110 transition-transform duration-500 relative z-10">
                  <DynamicIcon name={feature.icon} className="w-6 h-6" />
                </div>
                
                <h3 className="text-[24px] font-medium text-white mb-4 relative z-10">
                  {t(feature.title)}
                </h3>
                
                <p className="text-[16px] text-[#aeaeae] leading-[1.6] relative z-10">
                  {t(feature.description)}
                </p>

                <div className="mt-auto pt-8 w-full flex items-center justify-between group/link cursor-pointer relative z-10">
                  <div className="h-[1px] w-full bg-white/[0.05] absolute top-0 left-0" />
                  <span className="text-[14px] font-medium text-[#eb4520] transition-colors mt-6">
                    {t({ en: 'Learn More', ar: 'تعرف على المزيد' })}
                  </span>
                  <div className="w-8 h-8 mt-6 rounded-full bg-[#111111] border border-white/[0.05] flex items-center justify-center transform group-hover/link:translate-x-1 group-hover/link:bg-[#eb4520]/10 group-hover/link:border-[#eb4520]/30 transition-all duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#eb4520] rtl:rotate-180">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}