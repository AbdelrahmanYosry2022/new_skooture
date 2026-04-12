import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';

export default function TrustedBy() {
  const { content, t } = useContent();
  const trustedByData = (content as any).partners || { title: { en: 'Trusted By', ar: 'شركاء النجاح' }, logos: [] };

  if (!trustedByData.logos || trustedByData.logos.length === 0) return null;

  return (
    <section className="py-12 border-y border-border bg-background overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          {t(trustedByData.title)}
        </p>
      </div>

      {/* Marquee effect for logos */}
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4">
          {[...trustedByData.logos, ...trustedByData.logos].map((logo: any, index: number) => (
            <div 
              key={index}
              className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            >
              {typeof logo === 'string' ? (
                <img 
                  src={logo} 
                  alt="Partner logo" 
                  className="h-8 md:h-10 w-auto object-contain"
                />
              ) : logo.url ? (
                <img 
                  src={logo.url} 
                  alt={logo.name || 'Partner logo'} 
                  className="h-8 md:h-10 w-auto object-contain"
                />
              ) : (
                <span className="text-xl font-bold text-[color:var(--text-dim)]">{logo.name}</span>
              )}
            </div>
          ))}
        </div>

        {/* Gradient fades for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
