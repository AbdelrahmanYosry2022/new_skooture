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
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00a86b]/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00a86b]/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#191919] border border-white/[0.05] text-[#00a86b] text-sm font-medium mb-6"
          >
            <DynamicIcon name="MessageSquareQuote" className="w-4 h-4" />
            <span>{t({ en: 'Testimonials', ar: 'آراء العملاء' })}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999]"
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
              className="group relative p-8 rounded-2xl bg-[#191919]/60 backdrop-blur-md border border-white/[0.05] hover:border-[#00a86b]/30 transition-all duration-500 flex flex-col h-full overflow-hidden"
            >
              {/* Subtle Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00a86b]/0 to-[#00a86b]/0 group-hover:from-[#00a86b]/[0.02] group-hover:to-transparent transition-colors duration-500 pointer-events-none" />
              
              <Quote className="w-10 h-10 text-white/[0.05] group-hover:text-[#00a86b]/20 transition-colors duration-500 mb-6" />
              
              <p className="text-zinc-300 text-lg leading-relaxed mb-8 flex-grow">
                "{t(testimonial.quote)}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto border-t border-white/[0.05] pt-6 relative z-10">
                {testimonial.image ? (
                  <img 
                    src={testimonial.image} 
                    alt={t(testimonial.author)}
                    className="w-12 h-12 rounded-full object-cover border border-white/[0.1] shadow-lg"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#000000] border border-white/[0.1] flex items-center justify-center text-[#00a86b] font-bold text-lg shadow-lg">
                    {t(testimonial.author).charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-white">
                    {t(testimonial.author)}
                  </h4>
                  <p className="text-sm text-zinc-500">
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
