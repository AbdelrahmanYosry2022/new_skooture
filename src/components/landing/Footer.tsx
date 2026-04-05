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
    <footer className="bg-slate-900 dark:bg-zinc-950 pt-20 pb-10 border-t border-slate-800 dark:border-zinc-900">
      <div className="container mx-auto px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
              <span className="font-bold text-2xl text-white">Skooture</span>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed max-w-sm">
              {t(brandSubheadline)}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social: any, index: number) => (
                <a 
                  key={index}
                  href={social.url}
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors duration-200"
                >
                  <DynamicIcon name={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {footerColumns.map((column: any, index: number) => (
            <motion.div variants={itemVariants} key={index} className="lg:col-span-2">
              <h4 className="font-semibold text-white mb-6">
                {t(column.title)}
              </h4>
              <ul className="space-y-4">
                {column.links?.map((link: any, linkIndex: number) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.url}
                      className="text-slate-400 hover:text-white transition-colors duration-200"
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
          className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-slate-400 text-sm">
            {t(copyrightText)}
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
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
