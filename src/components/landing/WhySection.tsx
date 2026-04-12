import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';

export default function WhySection() {
  const { content, t } = useContent();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(0,168,107,0.15)_0%,transparent_70%)] pointer-events-none blur-[80px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-15 bg-[radial-gradient(ellipse_at_center,rgba(0,168,107,0.15)_0%,transparent_70%)] pointer-events-none blur-[80px] translate-y-1/4 -translate-x-1/4" />

      <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="theme-badge inline-flex items-center gap-2.5 px-3 py-1.5 rounded-[21px]">
              <span className="w-2.5 h-2.5 rounded-full bg-[radial-gradient(100%_100%_at_50%_0%,#80ebb8_0%,#00a86b_100%)] shadow-[0_0_12px_rgba(0,168,107,0.35)] shrink-0"></span>
              <span className="text-[14px] font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#00e695] to-[#b3f0d4]">
                {t(content.why.title)}
              </span>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="theme-headline text-[32px] md:text-[48px] font-medium tracking-tight leading-[1.1]"
            >
              {t(content.why.title)}
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-[16px] text-muted-foreground leading-[1.6] max-w-lg"
            >
              {t(content.why.content)}
            </motion.p>
          </motion.div>

          {/* Right Visual/Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Visual Container */}
            <div className="theme-panel relative rounded-[24px] p-8 overflow-hidden">
              <div className="space-y-6 relative z-10">
                
                {/* Legacy System Card */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-[16px] theme-soft-surface transition-all duration-300 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 gap-4 sm:gap-0">
                  <div className="flex items-center gap-4">
                    <div className="theme-icon-shell w-12 h-12 shrink-0 rounded-[12px] flex items-center justify-center">
                      <span className="text-muted-foreground font-medium text-[13px]">{content.why.labels?.v1 || 'v1.0'}</span>
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium text-[16px] tracking-tight">Smart Schools</h4>
                      <p className="text-muted-foreground text-[13px] mt-0.5">{t(content.why.labels?.legacySystem || 'Legacy System')}</p>
                    </div>
                  </div>
                  <div className="text-[color:var(--text-dim)] font-medium text-[12px] line-through theme-soft-surface px-3 py-1 rounded-full whitespace-nowrap">
                    {t(content.why.labels?.monolithic || 'Monolithic')}
                  </div>
                </div>

                {/* Connection Line */}
                <div className="flex items-center justify-center -my-2 relative z-0">
                  <div className="w-[1px] h-8 bg-gradient-to-b from-border to-[#00a86b]/50" />
                </div>

                {/* New AI Infrastructure Card */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-[16px] bg-gradient-to-r from-[#00a86b]/10 to-transparent border border-[#00a86b]/20 shadow-[0_0_30px_rgba(0,168,107,0.1)] relative overflow-hidden group gap-4 sm:gap-0">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(0,168,107,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 shrink-0 rounded-[12px] bg-[#00a86b] flex items-center justify-center shadow-[0_2px_10px_rgba(0,168,107,0.3)]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="white"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium text-[18px] tracking-tight">Skooture.AI</h4>
                      <p className="text-[#00e695] text-[13px] mt-0.5">{t(content.why.labels?.globalAi || 'Global AI Infrastructure')}</p>
                    </div>
                  </div>
                  <div className="text-[#00a86b] font-medium text-[12px] bg-[#00a86b]/10 border border-[#00a86b]/20 px-3 py-1 rounded-full relative z-10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] whitespace-nowrap">
                    {t(content.why.labels?.scalable || 'Scalable')}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}