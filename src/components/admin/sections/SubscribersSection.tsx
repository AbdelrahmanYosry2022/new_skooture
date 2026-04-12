import { useState, useEffect } from 'react';
import { Mail, Calendar, Search, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../layout/SectionWrapper';
import type { Subscriber } from '../../../types';
import { getSubscribers } from '../../../api/client';

interface SubscribersSectionProps {
  isRTL: boolean;
}

export default function SubscribersSection({ isRTL }: SubscribersSectionProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const data = await getSubscribers();
        setSubscribers(data);
      } catch (err) {
        console.error('Failed to load subscribers', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubs();
  }, []);

  const filteredSubscribers = subscribers.filter(sub => 
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SectionWrapper 
      key="subscribers" 
      title={isRTL ? "المشتركون" : "Subscribers"} 
      description={isRTL ? "عرض وإدارة الإيميلات المسجلة" : "View and manage registered emails"}
    >
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
        
        {/* Search & Filter Bar */}
        <div className="theme-panel flex flex-col sm:flex-row gap-4 items-center justify-between p-4 rounded-2xl">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder={isRTL ? "ابحث بالإيميل..." : "Search by email..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="theme-input theme-focus-accent w-full rounded-xl pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="theme-soft-surface px-4 py-2 rounded-xl text-sm font-medium text-foreground flex items-center gap-2">
              <Users className="theme-accent-text w-4 h-4" />
              {subscribers.length} {isRTL ? 'مشترك إجمالي' : 'Total Subscribers'}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20 bg-muted rounded-[24px] border border-border">
            <p className="text-muted-foreground text-sm">{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>
          </div>
        ) : subscribers.length === 0 ? (
          <div className="text-center py-20 bg-muted rounded-[24px] border border-dashed border-border">
            <Mail className="w-12 h-12 mx-auto text-[color:var(--text-dim)] mb-4 opacity-50" />
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">
              {isRTL ? 'لا يوجد مشتركون بعد' : 'No subscribers yet'}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredSubscribers.map((sub, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  key={sub.id} 
                  className="theme-panel group rounded-2xl p-5 hover:border-[color:var(--accent-border)] transition-all duration-300 flex flex-col gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="theme-accent-soft theme-accent-text w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <a href={`mailto:${sub.email}`} className="text-foreground text-sm font-medium hover:text-[color:var(--accent)] transition-colors truncate block">
                        {sub.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-[color:var(--text-dim)] pt-4 border-t border-border">
                    <Calendar className="w-3 h-3" />
                    {new Date(sub.createdAt).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredSubscribers.length === 0 && searchTerm && (
              <div className="col-span-full text-center py-12 bg-muted rounded-[24px] border border-border">
                <Search className="w-8 h-8 mx-auto text-[color:var(--text-dim)] mb-3 opacity-50" />
                <p className="text-muted-foreground text-sm">
                  {isRTL ? 'لم يتم العثور على نتائج لـ' : 'No results found for'} "{searchTerm}"
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}