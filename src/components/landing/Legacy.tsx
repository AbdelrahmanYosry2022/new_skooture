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
      {/* Background glow behind the timeline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[800px] rounded-full opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(0,168,107,0.15)_0%,transparent_70%)] pointer-events-none blur-[80px]" />

      <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-[21px] bg-[#191919] shadow-[inset_0_1px_16px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.09)]"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[radial-gradient(100%_100%_at_50%_0%,#80ebb8_0%,#00a86b_100%)] shadow-[inset_0_1px_16px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.09)] shrink-0"></span>
            <span className="text-[14px] font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#00e695] to-[#b3f0d4]">
              {t(content.legacy.title)}
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[32px] md:text-[48px] font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999] leading-[1.1] max-w-2xl mx-auto"
          >
            {t({ en: 'A History of Innovation', ar: 'تاريخ من الابتكار' })}
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/[0.1] to-transparent" />

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
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border shadow-[0_0_15px_rgba(0,168,107,0.15)]">
                    <div className="w-3 h-3 rounded-full bg-[radial-gradient(100%_100%_at_50%_0%,#80ebb8_0%,#00a86b_100%)] shadow-[0_0_10px_rgba(0,168,107,0.5)]" />
                  </div>
                  
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${
                    isEven 
                      ? (isRTL ? 'md:pl-10 text-right' : 'md:pr-10 md:text-right') 
                      : (isRTL ? 'md:pr-10 text-right' : 'md:pl-10 md:text-left')
                  }`}>
                    <div 
                      className="p-8 rounded-[24px] bg-[#191919]/60 border border-border hover:border-border transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:bg-[#191919]/80 group" 
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