import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <section id="top-features" className="clean-section bg-slate-50 dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="clean-heading-2"
          >
            {t(topFeaturesData.title)}
          </motion.h2>
          {topFeaturesData.subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="clean-paragraph mt-4"
            >
              {t(topFeaturesData.subtitle)}
            </motion.p>
          )}
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {displayedFeatures.map((feature: any, index: number) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <Card className="h-full group hover:-translate-y-1 transition-all duration-300 hover:shadow-lg dark:hover:shadow-blue-900/5 bg-white dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-800">
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-4">
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <DynamicIcon name={feature.icon} className="w-7 h-7" />
                    </motion.div>
                  </div>
                  <CardTitle className="text-xl text-slate-900 dark:text-white">{t(feature.title)}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-slate-600 dark:text-zinc-400 text-base leading-relaxed">
                    {t(feature.description)}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {features.length > 6 && (
          <motion.div 
            layout
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-medium hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
            >
              {isExpanded ? t(topFeaturesData.buttonLess || { en: 'Show Less', ar: 'عرض أقل' }) : t(topFeaturesData.buttonMore || { en: 'Show More', ar: 'عرض المزيد' })}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
