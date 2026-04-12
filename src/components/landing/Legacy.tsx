import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';

export default function Legacy() {
  const { content, t, language } = useContent();
  const isRTL = language === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section id="legacy" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="theme-badge theme-section-badge mb-6"
          >
            <span className="theme-section-badge-dot"></span>
            <span>
              {t(content.legacy.title)}
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="theme-headline text-[32px] md:text-[48px] font-medium tracking-tight leading-[1.1] max-w-2xl mx-auto"
          >
            {t({ en: 'A History of Innovation', ar: 'تاريخ من الابتكار' })}
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-border to-transparent" />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-16"
          >
            {content.legacy.items.map((item: any, index: number) => {
              // On desktop alternate sides. On mobile, always align items to the right of the line.
              const isEven = index % 2 === 0;
              
              // Mobile styles:
              // Line is at left-6 (24px)
              // Dot is at left-6 (24px)
              // Card has pl-16 to avoid dot
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex flex-col md:flex-row items-start md:items-center justify-between w-full relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Empty spacer for desktop */}
                  <div className="w-full md:w-[45%] hidden md:block" />
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full theme-panel-strong shadow-[0_0_15px_rgba(0,168,107,0.15)]">
                    <div className="w-3 h-3 rounded-full bg-[radial-gradient(100%_100%_at_50%_0%,#80ebb8_0%,#00a86b_100%)] shadow-[0_0_10px_rgba(0,168,107,0.5)]" />
                  </div>
                  
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${
                    isEven 
                      ? (isRTL ? 'md:pl-10 text-right' : 'md:pr-10 md:text-right') 
                      : (isRTL ? 'md:pr-10 text-right' : 'md:pl-10 md:text-left')
                  }`}>
                    <div 
                      className="theme-panel p-8 rounded-[24px] group" 
                      dir={isRTL ? 'rtl' : 'ltr'}
                      style={{ textAlign: isRTL ? 'right' : 'left' }}
                    >
                      <span className="inline-block mb-4 text-[14px] font-medium tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#00e695] to-[#b3f0d4]">
                        {item.year}
                      </span>
                      <h3 className="text-[20px] md:text-[24px] font-medium text-foreground mb-3">
                        {t(item.title)}
                      </h3>
                      <p className="text-[15px] text-muted-foreground leading-[1.6]">
                        {t(item.description)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}