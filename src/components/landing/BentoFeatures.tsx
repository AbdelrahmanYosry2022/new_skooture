import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import DynamicIcon from '../shared/DynamicIcon';

export default function BentoFeatures() {
  const { content, t } = useContent();
  const featuresData = content.bentoFeatures;
  const features = featuresData?.features || [];

  if (features.length === 0) return null;

  return (
    <section id="features-bento" className="py-24 md:py-32 bg-[#000000] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(235,69,32,0.15)_0%,transparent_70%)] pointer-events-none blur-[80px]" />

      <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-[21px] bg-[#191919] shadow-[inset_0_1px_16px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.09)]"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[radial-gradient(100%_100%_at_50%_0%,#ffa984_0%,#ff5911_100%)] shadow-[inset_0_1px_16px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.09)] shrink-0"></span>
            <span className="text-[14px] font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#e86f3a] to-[#fcbda2]">
              {t({ en: 'Features', ar: 'الميزات' })}
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[32px] md:text-[48px] font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999] leading-[1.1] max-w-2xl"
          >
            {t(featuresData?.title || { en: 'Everything you need to succeed', ar: 'كل ما تحتاجه للنجاح' })}
          </motion.h2>
        </div>

        {/* Clean Bento Grid - Matching Soft Pro dark bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {features.map((feature: any, index: number) => {
            // First item takes full width on tablet, 2 cols on desktop to create a true bento grid feel.
            // Depending on how many items (say 4), we make 1st and 4th take 2 columns if grid is 3 cols.
            // Assuming 4 items based on the JSON: index 0 (2 cols), index 1 (1 col), index 2 (1 col), index 3 (2 cols)
            const colSpanClass = index === 0 || index === 3 ? 'lg:col-span-2' : 'lg:col-span-1';
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative p-8 rounded-[24px] bg-[#191919]/60 border border-white/[0.05] hover:border-white/[0.1] transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:bg-[#191919]/80 overflow-hidden flex flex-col justify-between ${colSpanClass}`}
              >
                {/* Subtle hover gradient inside card */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(235,69,32,0.08)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-14 h-14 rounded-[16px] bg-[#2a2a2a] flex items-center justify-center mb-8 border border-white/[0.05] shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] text-[#eb4520] group-hover:scale-110 transition-transform duration-500">
                    <DynamicIcon name={feature.icon || 'Star'} className="w-6 h-6" />
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-[24px] font-medium text-white mb-3">
                      {t(feature.title)}
                    </h3>
                    <p className="text-[16px] text-[#aeaeae] leading-[1.6]">
                      {t(feature.description)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}