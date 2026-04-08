import { useState } from 'react';
import { MessageSquare, Mail, Calendar, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../layout/SectionWrapper';
import type { Message } from '../../../types';

interface MessagesSectionProps {
  messages: Message[];
  isRTL: boolean;
}

export default function MessagesSection({ messages, isRTL }: MessagesSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMessages = messages.filter(msg => 
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SectionWrapper 
      key="messages" 
      title={isRTL ? "رسائل التواصل" : "User Messages"} 
      description={isRTL ? "عرض وإدارة الرسائل الواردة من نموذج التواصل" : "View and manage messages sent through the Contact form"}
    >
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#191919] p-4 rounded-2xl border border-white/[0.05] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeae]" />
            <input 
              type="text" 
              placeholder={isRTL ? "ابحث بالاسم، الإيميل، أو المحتوى..." : "Search by name, email, or content..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111111] border border-white/[0.05] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#eb4520]/50 focus:ring-1 focus:ring-[#eb4520]/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="px-4 py-2 bg-[#111111] border border-white/[0.05] rounded-xl text-sm font-medium text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#eb4520]" />
              {messages.length} {isRTL ? 'رسالة إجمالية' : 'Total Messages'}
            </div>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="text-center py-20 bg-[#111111] rounded-[24px] border border-dashed border-white/[0.1]">
            <MessageSquare className="w-12 h-12 mx-auto text-[#666666] mb-4 opacity-50" />
            <p className="text-[#aeaeae] font-bold uppercase tracking-widest text-xs">
              {isRTL ? 'لا توجد رسائل بعد' : 'No messages yet'}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            <AnimatePresence>
              {filteredMessages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  key={msg.id} 
                  className="group bg-[#111111] border border-white/[0.05] rounded-2xl overflow-hidden hover:border-[#eb4520]/30 transition-all duration-300 shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-[#191919] border-b border-white/[0.05] gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#eb4520]/20 to-[#fcbda2]/10 border border-[#eb4520]/20 flex items-center justify-center text-[#eb4520] font-bold text-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base">{msg.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="w-3 h-3 text-[#666666]" />
                          <a href={`mailto:${msg.email}`} className="text-sm text-[#aeaeae] hover:text-[#eb4520] transition-colors">
                            {msg.email}
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-[#666666] bg-[#000000] px-3 py-1.5 rounded-lg border border-white/[0.02]">
                      <Calendar className="w-3 h-3" />
                      {new Date(msg.timestamp || msg.createdAt).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  
                  {/* Message Body */}
                  <div className="p-6">
                    <p className="text-[#aeaeae] font-medium leading-relaxed whitespace-pre-line text-sm">
                      {msg.message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredMessages.length === 0 && searchTerm && (
              <div className="text-center py-12 bg-[#111111] rounded-[24px] border border-white/[0.05]">
                <Search className="w-8 h-8 mx-auto text-[#666666] mb-3 opacity-50" />
                <p className="text-[#aeaeae] text-sm">
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
