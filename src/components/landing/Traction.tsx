import { motion, useInView } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
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
          <span className="theme-accent-text ml-1">+</span>
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
            className="theme-badge theme-section-badge mb-6"
          >
            <BarChart3 className="theme-section-badge-icon" />
            <span>
              {t({ en: 'Real Impact', ar: 'تأثير حقيقي' })}
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