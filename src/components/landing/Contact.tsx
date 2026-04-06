import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import DynamicIcon from '../shared/DynamicIcon';

export default function Contact() {
  const { t, language } = useContent();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-[#eb4520]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#191919] border border-white/[0.05] text-[#eb4520] text-sm font-medium mb-6"
              >
                <DynamicIcon name="MessageSquareHeart" className="w-4 h-4" />
                <span>{t({ en: 'Contact Us', ar: 'اتصل بنا' })}</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999] leading-tight mb-6">
                {language === 'en' ? (
                  <>Let's Build the <span className="text-[#eb4520]">Future</span> Together</>
                ) : (
                  <>لنبنِ <span className="text-[#eb4520]">المستقبل</span> معاً</>
                )}
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed max-w-lg">
                {t({ 
                  en: "Have questions about Skooture? Our team is here to help you transform your educational institution.", 
                  ar: "لديك أسئلة حول سكوتر؟ فريقنا هنا لمساعدتك في تحويل مؤسستك التعليمية." 
                })}
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Mail, label: { en: 'Email', ar: 'البريد الإلكتروني' }, value: 'contact@skooture.ai' },
                { icon: Phone, label: { en: 'Phone', ar: 'الهاتف' }, value: '+1 (555) 000-0000' },
                { icon: MapPin, label: { en: 'Location', ar: 'الموقع' }, value: t({ en: 'London, UK / Dubai, UAE', ar: 'لندن، المملكة المتحدة / دبي، الإمارات' }) }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#191919] flex items-center justify-center border border-white/[0.05] text-zinc-400 group-hover:bg-[#eb4520]/10 group-hover:text-[#eb4520] group-hover:border-[#eb4520]/30 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-500 mb-1">{t(item.label)}</p>
                    <p className="text-lg font-semibold text-white group-hover:text-[#eb4520] transition-colors duration-300">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#191919]/60 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-white/[0.05] shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden group">
              {/* Subtle Top Border Gradient */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent group-hover:via-[#eb4520]/50 transition-colors duration-500" />
              
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-12 relative z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-[#191919] border border-[#eb4520]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(235,69,32,0.2)]">
                    <CheckCircle2 className="w-8 h-8 text-[#eb4520]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {t({ en: 'Message Sent!', ar: 'تم إرسال الرسالة!' })}
                  </h3>
                  <p className="text-zinc-400">
                    {t({ 
                      en: 'Thank you for reaching out. We will get back to you shortly.', 
                      ar: 'شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.' 
                    })}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      {t({ en: 'Full Name', ar: 'الاسم الكامل' })}
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t({ en: 'Enter your name', ar: 'أدخل اسمك' })}
                      className="w-full px-4 py-3 rounded-xl bg-[#000000]/50 border border-white/[0.05] focus:border-[#eb4520]/50 focus:ring-1 focus:ring-[#eb4520]/50 transition-all duration-300 outline-none text-white placeholder-zinc-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      {t({ en: 'Email Address', ar: 'البريد الإلكتروني' })}
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t({ en: 'Enter your email', ar: 'أدخل بريدك الإلكتروني' })}
                      className="w-full px-4 py-3 rounded-xl bg-[#000000]/50 border border-white/[0.05] focus:border-[#eb4520]/50 focus:ring-1 focus:ring-[#eb4520]/50 transition-all duration-300 outline-none text-white placeholder-zinc-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      {t({ en: 'Your Message', ar: 'رسالتك' })}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t({ en: 'Tell us how we can help...', ar: 'أخبرنا كيف يمكننا مساعدتك...' })}
                      className="w-full px-4 py-3 rounded-xl bg-[#000000]/50 border border-white/[0.05] focus:border-[#eb4520]/50 focus:ring-1 focus:ring-[#eb4520]/50 transition-all duration-300 outline-none text-white placeholder-zinc-600 resize-none"
                    />
                  </div>
                  
                  <button
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#eb4520] to-[#ff6b4a] hover:from-[#ff5a36] hover:to-[#ff8166] text-white font-medium shadow-[0_0_20px_rgba(235,69,32,0.3)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {t({ en: 'Send Message', ar: 'إرسال الرسالة' })}
                        <Send className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
