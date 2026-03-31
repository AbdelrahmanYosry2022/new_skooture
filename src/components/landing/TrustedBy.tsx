import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import Marquee from 'react-fast-marquee';

export default function TrustedBy() {
  const { content, t } = useContent();
  const partners = content.partners;

  if (!partners || !partners.logos || partners.logos.length === 0) return null;

  return (
    <section id="partners" className="py-20 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl font-bold text-zinc-500 dark:text-zinc-400"
        >
          {t(partners.title)}
        </motion.h3>
      </div>

      <div className="relative">
        {/* Gradient Masks for smooth fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={true}
          className="py-4"
        >
          {partners.logos.map((logo: string, index: number) => (
            <div
              key={index}
              className="group mx-12 md:mx-20 flex items-center justify-center p-2 opacity-50 hover:opacity-100 dark:hover:bg-white/90 dark:hover:rounded-xl transition-all duration-300"
            >
              <img
                src={logo}
                alt={`Partner ${index + 1}`}
                className="h-12 md:h-16 object-contain max-w-[150px] filter grayscale brightness-0 dark:invert group-hover:grayscale-0 group-hover:brightness-100 dark:group-hover:invert-0 transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
