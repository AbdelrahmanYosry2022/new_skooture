import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import DynamicIcon from '../shared/DynamicIcon';

// Mapping features to specific Lucide icons
const getFeatureIcon = (featureEn: string): string => {
  const iconMap: Record<string, string> = {
    "Student Management": "Users",
    "Academics Management": "BookOpen",
    "Slider Management": "MonitorPlay",
    "Teacher Management": "Presentation",
    "Session Year Management": "CalendarDays",
    "Holiday Management": "Sun",
    "Timetable Management": "Clock",
    "Attendance Management": "UserCheck",
    "Exam Management": "FileSpreadsheet",
    "Lesson Management": "BookText",
    "Assignment Management": "ClipboardEdit",
    "Announcement Management": "Megaphone",
    "Staff Management": "Briefcase",
    "Expense Management": "Receipt",
    "Staff Leave Management": "CalendarMinus",
    "Fees Management": "Wallet",
    "School Gallery Management": "Image",
    "ID Card - Certificate Generation": "BadgeCheck",
    "Website Management": "Globe",
    "Chat Module": "MessageCircle",
    "Transportation Module": "Bus",
    "Staff Attendance Management": "UserCog"
  };
  return iconMap[featureEn] || "CheckCircle2";
};

export default function TopFeatures() {
  const { content, t, language } = useContent();
  const topFeaturesData = (content as any).topFeatures || {};
  const features = topFeaturesData.items || [];
  const isRTL = language === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } as any }
  };

  if (!features || features.length === 0) return null;

  return (
    <section id="top-features" className="py-24 relative overflow-hidden bg-[#000000]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00a86b]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#191919] border border-white/[0.05] text-[#00a86b] text-sm font-medium mb-6"
          >
            <DynamicIcon name="Sparkles" className="w-4 h-4" />
            <span>{t({ en: 'Top Features', ar: 'أهم المميزات' })}</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999]"
          >
            {t(topFeaturesData.title)}
          </motion.h2>
          {topFeaturesData.subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-zinc-400"
            >
              {t(topFeaturesData.subtitle)}
            </motion.p>
          )}
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto"
        >
          {features.map((feature: any, index: number) => {
            const iconName = getFeatureIcon(feature.en);
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="group relative flex items-center gap-4 p-4 rounded-2xl bg-[#191919]/40 backdrop-blur-sm border border-white/[0.05] hover:border-[#00a86b]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,168,107,0.08)] cursor-default overflow-hidden"
              >
                {/* Soft background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00a86b]/0 to-[#00a86b]/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Subtle side highlight line */}
                <div className={`absolute top-0 bottom-0 w-[2px] bg-[#00a86b] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center ${isRTL ? 'right-0' : 'left-0'}`} />
                
                <div className="w-12 h-12 shrink-0 rounded-xl bg-black/50 border border-white/[0.05] flex items-center justify-center text-zinc-400 group-hover:text-[#00a86b] group-hover:border-[#00a86b]/30 group-hover:bg-[#00a86b]/10 transition-all duration-300 shadow-inner">
                  <DynamicIcon name={iconName} className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-[14px] leading-tight font-medium text-zinc-300 group-hover:text-white transition-colors duration-300 flex-1">
                  {t(feature)}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
