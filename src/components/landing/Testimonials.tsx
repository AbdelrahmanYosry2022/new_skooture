import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { Quote } from 'lucide-react';
import DynamicIcon from '../shared/DynamicIcon';

export default function Testimonials() {
  const { content, t } = useContent();
  const testimonials = content.testimonials?.items || [];

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="theme-badge theme-accent-text inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6"
          >
            <DynamicIcon name="MessageSquareQuote" className="w-4 h-4" />
            <span>{t({ en: 'Testimonials', ar: 'آراء العملاء' })}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="theme-headline text-4xl md:text-5xl font-bold mb-6"
          >
            {t(content.testimonials?.title)}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="theme-panel group relative p-8 rounded-2xl hover:border-[#00a86b]/30 transition-all duration-500 flex flex-col h-full overflow-hidden"
            >
              {/* Subtle Glow on Hover */}
              <div className="theme-accent-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <Quote className="w-10 h-10 text-foreground/5 group-hover:text-[color:var(--accent-border)] transition-colors duration-500 mb-6" />
              
              <p className="text-[color:var(--text-soft)] text-lg leading-relaxed mb-8 flex-grow">
                "{t(testimonial.quote)}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto border-t border-border pt-6 relative z-10">
                {testimonial.image ? (
                  <img 
                    src={testimonial.image} 
                    alt={t(testimonial.author)}
                    className="w-12 h-12 rounded-full object-cover border border-border shadow-lg"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center theme-accent-text font-bold text-lg shadow-lg">
                    {t(testimonial.author).charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-foreground">
                    {t(testimonial.author)}
                  </h4>
                  <p className="text-sm text-[color:var(--text-dim)]">
                    {t(testimonial.role)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
