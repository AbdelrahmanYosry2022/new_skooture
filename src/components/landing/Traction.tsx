import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import DynamicIcon from '../shared/DynamicIcon';

function Counter({ value, label, iconName, delay }: { value: number; label: string; iconName: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2500;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
    return num.toLocaleString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative group h-full"
    >
      <div className="theme-panel h-full p-8 rounded-[24px] flex flex-col items-center text-center">
        <div className="theme-icon-shell w-14 h-14 rounded-[16px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
          <DynamicIcon name={iconName} className="w-6 h-6" />
        </div>
        <div className="theme-headline text-[40px] font-medium tracking-tight mb-2 leading-[1.1]">
          {formatNumber(count)}
          <span className="text-[#00a86b] ml-1">+</span>
        </div>
        <div className="text-[14px] text-muted-foreground leading-[1.6]">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export default function Traction() {
  const { content, t } = useContent();
  const tractionData = content.traction;
  const traction = Array.isArray(tractionData) ? tractionData : [];

  return (
    <section id="stats" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="theme-badge mb-6 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-[21px]"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[radial-gradient(100%_100%_at_50%_0%,#80ebb8_0%,#00a86b_100%)] shadow-[0_0_12px_rgba(0,168,107,0.35)] shrink-0"></span>
            <span className="text-[14px] font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#00e695] to-[#b3f0d4]">
              {t({ en: 'Global Impact', ar: 'تأثير عالمي' })}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="theme-headline text-[32px] md:text-[48px] font-medium tracking-tight leading-[1.1] mb-6 max-w-2xl"
          >
            {t({ en: 'Real Results for Real Schools', ar: 'نتائج حقيقية لمدارس حقيقية' })}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[16px] text-muted-foreground leading-[1.6] max-w-xl"
          >
            {t({ 
              en: 'Join thousands of institutions already transforming their management with our platform.', 
              ar: 'انضم لآلاف المؤسسات التي تقوم بالفعل بتحويل إدارتها باستخدام منصتنا.' 
            })}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {traction.map((stat: any, index: number) => (
            <Counter 
              key={index}
              value={stat.value} 
              label={t(stat.label)} 
              iconName={stat.icon} 
              delay={index * 0.1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}