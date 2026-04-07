import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import DynamicIcon from '../shared/DynamicIcon';

export default function Footer() {
  const { content, t } = useContent();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Safe access to content properties to avoid undefined errors
  const brandSubheadline = content.hero?.subheadline || { en: 'Empowering the future.', ar: 'تمكين المستقبل.' };
  
  // Footer data might be missing in some content structures, so provide fallbacks
  const socialLinks = content.footer?.social || [];
  const footerColumns = content.footer?.columns || [];
  const copyrightText = content.footer?.copyright || { en: '© 2026 Skooture. All rights reserved.', ar: '© 2026 سكوتشر. جميع الحقوق محفوظة.' };
  const bottomLinks = content.footer?.bottomLinks || [];

  return (
    <footer className="bg-[#000000] pt-24 pb-12 relative overflow-hidden">
      {/* Background Glow (kept but subtle) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#eb4520]/[0.01] rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#eb4520] to-[#ff6b4a] flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(235,69,32,0.4)]">
                S
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">Skooture</span>
            </div>
            <p className="text-zinc-400 mb-8 leading-relaxed max-w-sm">
              {t(brandSubheadline)}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social: any, index: number) => (
                <a 
                  key={index}
                  href={social.url}
                  className="w-10 h-10 rounded-full bg-[#191919] border border-white/[0.05] hover:border-[#eb4520]/50 hover:bg-[#eb4520]/10 flex items-center justify-center text-zinc-400 hover:text-[#eb4520] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                >
                  <DynamicIcon name={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {footerColumns.map((column: any, index: number) => (
            <motion.div variants={itemVariants} key={index} className="lg:col-span-2">
              <h4 className="font-semibold text-white mb-6 tracking-wide">
                {t(column.title)}
              </h4>
              <ul className="space-y-4">
                {column.links?.map((link: any, linkIndex: number) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.url}
                      className="text-zinc-400 hover:text-white transition-colors duration-200"
                    >
                      {t(link.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-zinc-500 text-sm">
            {t(copyrightText)}
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            {bottomLinks.map((link: any, index: number) => (
              <a key={index} href={link.url} className="hover:text-white transition-colors">
                {t(link.label)}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
