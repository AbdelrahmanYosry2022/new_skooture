import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../ui/card';

interface SectionWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function SectionWrapper({ title, description, children }: SectionWrapperProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-1.5 px-2">
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      
      <Card className="p-6 md:p-8 space-y-8">
        {children}
      </Card>
    </motion.div>
  );
}
