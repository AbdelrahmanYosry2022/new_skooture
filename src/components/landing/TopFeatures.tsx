import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import DynamicIcon from '../shared/DynamicIcon';

export default function TopFeatures() {
  const { content, t } = useContent();
  const features = content.topFeatures?.items || [];
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedFeatures = isExpanded ? features : features.slice(0, 6);

  return (
    <section id="features" className="clean-section bg-slate-50 dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="clean-heading-2"
          >
            {t(content.topFeatures?.title)}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedFeatures.map((feature: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 6) * 0.1 }}
              className="clean-card p-8 flex flex-col"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <DynamicIcon name="CheckCircle" className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {t(feature)}
              </h3>
            </motion.div>
          ))}
        </div>

        {features.length > 6 && (
          <motion.div 
            layout
            className="flex justify-center"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="clean-button-secondary"
            >
              {isExpanded ? t(content.topFeatures?.buttonLess) : t(content.topFeatures?.buttonMore)}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
