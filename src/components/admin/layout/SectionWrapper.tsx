import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

export default function SectionWrapper({ children }: SectionWrapperProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
