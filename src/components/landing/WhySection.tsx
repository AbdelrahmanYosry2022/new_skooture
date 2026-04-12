import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
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
            <motion.div variants={itemVariants} className="theme-badge theme-section-badge">
              <ShieldCheck className="theme-section-badge-icon" />
              <span>
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
                <div className="theme-panel-strong overflow-hidden rounded-[20px] border border-border">
                  <img
                    src="/images/dashboard-preview.png"
                    alt="Skooture dashboard preview"
                    className="w-full h-[220px] object-cover object-top"
                  />
                </div>
                
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
                  <div className="w-[1px] h-8 bg-gradient-to-b from-border to-[color:var(--accent-border)]" />
                </div>

                {/* New AI Infrastructure Card */}
                <div className="theme-accent-card flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-[16px] relative overflow-hidden group gap-4 sm:gap-0">
                  <div className="theme-accent-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="theme-brand-icon w-12 h-12 shrink-0 rounded-[12px] flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="white"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium text-[18px] tracking-tight">Skooture.AI</h4>
                      <p className="theme-link-accent text-[13px] mt-0.5">{t(content.why.labels?.globalAi || 'Global AI Infrastructure')}</p>
                    </div>
                  </div>
                  <div className="theme-accent-chip font-medium text-[12px] px-3 py-1 rounded-full relative z-10 whitespace-nowrap">
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