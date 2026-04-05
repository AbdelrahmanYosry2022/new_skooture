import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

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
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-zinc-950">
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
                className="px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 inline-block"
              >
                {t({ en: 'Contact Us', ar: 'اتصل بنا' })}
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                {language === 'en' ? (
                  <>Let's Build the <span className="text-blue-600">Future</span> Together</>
                ) : (
                  <>لنبنِ <span className="text-blue-600">المستقبل</span> معاً</>
                )}
              </h2>
              <p className="text-lg text-slate-600 dark:text-zinc-400 leading-relaxed max-w-lg">
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
                  <div className="w-14 h-14 rounded-xl bg-white dark:bg-zinc-900 flex items-center justify-center border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-sm">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-zinc-400 mb-1">{t(item.label)}</p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.value}</p>
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
            <div className="bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-lg">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {t({ en: 'Message Sent!', ar: 'تم إرسال الرسالة!' })}
                  </h3>
                  <p className="text-slate-600 dark:text-zinc-400">
                    {t({ 
                      en: 'Thank you for reaching out. We will get back to you shortly.', 
                      ar: 'شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.' 
                    })}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">
                      {t({ en: 'Full Name', ar: 'الاسم الكامل' })}
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t({ en: 'Enter your name', ar: 'أدخل اسمك' })}
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 transition-colors outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">
                      {t({ en: 'Email Address', ar: 'البريد الإلكتروني' })}
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t({ en: 'Enter your email', ar: 'أدخل بريدك الإلكتروني' })}
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 transition-colors outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">
                      {t({ en: 'Your Message', ar: 'رسالتك' })}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t({ en: 'Tell us how we can help...', ar: 'أخبرنا كيف يمكننا مساعدتك...' })}
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 transition-colors outline-none text-slate-900 dark:text-white resize-none"
                    />
                  </div>
                  
                  <button
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
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
