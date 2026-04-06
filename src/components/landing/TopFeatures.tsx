import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import DynamicIcon from '../shared/DynamicIcon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';

export default function TopFeatures() {
  const { content, t } = useContent();
  const topFeaturesData = (content as any).topFeatures || {};
  const features = topFeaturesData.items || [];
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedFeatures = isExpanded ? features : features.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (!features || features.length === 0) return null;

  return (
    <section id="top-features" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#eb4520]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#191919] border border-white/[0.05] text-[#eb4520] text-sm font-medium mb-6"
          >
            <DynamicIcon name="Sparkles" className="w-4 h-4" />
            <span>{t({ en: 'Top Features', ar: 'أهم المميزات' })}</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999]"
          >
            {t(topFeaturesData.title)}
          </motion.h2>
          {topFeaturesData.subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-zinc-400"
            >
              {t(topFeaturesData.subtitle)}
            </motion.p>
          )}
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          <AnimatePresence>
            {displayedFeatures.map((feature: any, index: number) => (
              <motion.div 
                key={index} 
                variants={itemVariants} 
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
                className="h-full"
              >
                <Card className="h-full bg-[#191919]/60 backdrop-blur-md border border-white/[0.05] hover:border-[#eb4520]/30 transition-all duration-500 overflow-hidden group rounded-2xl">
                  {/* Subtle Top Border Gradient */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent group-hover:via-[#eb4520]/50 transition-colors duration-500" />
                  
                  {/* Soft Background Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#eb4520]/0 to-[#eb4520]/0 group-hover:from-[#eb4520]/[0.02] group-hover:to-transparent transition-colors duration-500" />

                  <CardHeader className="text-center pb-2 relative z-10">
                    <div className="flex justify-center mb-6">
                      <motion.div 
                        className="w-16 h-16 rounded-2xl bg-[#000000] border border-white/[0.05] text-[#eb4520] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-[#eb4520]/30 group-hover:shadow-[0_0_20px_rgba(235,69,32,0.15)]"
                      >
                        <DynamicIcon name={feature.icon} className="w-8 h-8" />
                      </motion.div>
                    </div>
                    <CardTitle className="text-xl text-white font-semibold">{t(feature.title)}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center relative z-10">
                    <CardDescription className="text-zinc-400 text-base leading-relaxed">
                      {t(feature.description)}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {features.length > 6 && (
          <motion.div 
            layout
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-8 py-3 rounded-full bg-[#191919] border border-white/[0.05] text-white font-medium hover:border-[#eb4520]/50 hover:bg-[#eb4520]/5 transition-all duration-300 flex items-center gap-2"
            >
              <span>{isExpanded ? t(topFeaturesData.buttonLess || { en: 'Show Less', ar: 'عرض أقل' }) : t(topFeaturesData.buttonMore || { en: 'Show More', ar: 'عرض المزيد' })}</span>
              <DynamicIcon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
