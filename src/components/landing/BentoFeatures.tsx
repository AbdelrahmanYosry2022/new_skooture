import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import DynamicIcon from '../shared/DynamicIcon';

export default function BentoFeatures() {
  const { content, t } = useContent();
  const featuresData = (content as any).features;
  const features = featuresData?.items || featuresData?.list || [];

  if (features.length === 0) return null;

  return (
    <section id="features-bento" className="clean-section bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="clean-heading-2"
          >
            {t(featuresData?.title)}
          </motion.h2>
        </div>

        {/* Clean Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature: any, index: number) => {
            // Make the first item larger (span 2 cols)
            const isLarge = index === 0 || index === 3;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`clean-card p-8 flex flex-col justify-between ${isLarge ? 'md:col-span-2' : 'md:col-span-2 lg:col-span-1'}`}
              >
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                    <DynamicIcon name={feature.icon || 'Star'} className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                    {t(feature.title)}
                  </h3>
                  <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {t(feature.description)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
