import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const { content, t } = useContent();
  const testimonials = content.testimonials?.items || [];

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="clean-section bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="clean-heading-2"
          >
            {t(content.testimonials?.title)}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="clean-card p-8 flex flex-col"
            >
              <Quote className="w-10 h-10 text-blue-100 dark:text-blue-900/30 mb-6" />
              
              <p className="text-slate-700 dark:text-zinc-300 text-lg leading-relaxed mb-8 flex-grow italic">
                "{t(testimonial.quote)}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                {testimonial.image ? (
                  <img 
                    src={testimonial.image} 
                    alt={t(testimonial.author)}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-zinc-800"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-500 dark:text-zinc-400 font-bold text-lg">
                    {t(testimonial.author).charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {t(testimonial.author)}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-zinc-400">
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
