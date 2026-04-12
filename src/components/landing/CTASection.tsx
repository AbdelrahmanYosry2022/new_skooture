import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { ArrowRight, Wifi, ScanFace, ShieldCheck, Loader2 } from 'lucide-react';
import { createSubscriber } from '../../api/client';

export default function CTASection() {
  const { content, t, language } = useContent();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const cta = content.cta;

  if (!cta) return null;

  const pills = [
    { icon: Wifi,        label: { en: 'Accessible', ar: 'سهل الوصول' } },
    { icon: ScanFace,    label: { en: 'Reliable',   ar: 'موثوق'       } },
    { icon: ShieldCheck, label: { en: 'Protected',  ar: 'محمي'        } },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      await createSubscriber(email);
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong');
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-background py-16">

      {/* Container card */}
      <div className="relative mx-auto max-w-[900px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="theme-panel-strong relative overflow-hidden rounded-[24px]"
        >
          {/* Content column */}
          <div className="flex flex-col items-center gap-6 px-8 pb-16 pt-14 text-center md:px-20">

            {/* Badge */}
            <div className="theme-badge theme-section-badge">
              <span className="theme-section-badge-dot"></span>
              <span>
                {t({ en: 'Sign up for Skooture.AI today', ar: 'سجّل في Skooture.AI اليوم' })}
              </span>
            </div>

            {/* Heading — same size as reference: ~56px on desktop, fluid */}
            <h2
              className="theme-headline w-full text-[36px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[44px] md:text-[52px]"
            >
              {t(cta.title)}
            </h2>

            {/* Feature pills — single container bg #262626 */}
            <div className="theme-soft-surface inline-flex items-center rounded-full px-4 py-2.5">
              {pills.map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3">
                  <Icon className="h-[14px] w-[14px] text-foreground" strokeWidth={1.6} />
                  <span className="text-[13px] font-medium text-foreground">{t(label)}</span>
                  {i < pills.length - 1 && (
                    <span className="ml-3 h-3.5 w-px bg-border" />
                  )}
                </div>
              ))}
            </div>

            {/* Subtitle */}
            <p className="max-w-[440px] text-[15px] leading-[1.65] text-muted-foreground">
              {t(cta.subtitle)}
            </p>

            {/* Form row */}
            <form
              className="flex w-full max-w-[460px] flex-col gap-2.5 sm:flex-row sm:items-start"
              onSubmit={handleSubmit}
            >
              <div className="flex-1 w-full relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t({ en: 'Email Address', ar: 'البريد الإلكتروني' })}
                  disabled={status === 'loading' || status === 'success'}
                  className="theme-input w-full h-[44px] rounded-[8px] border px-3.5 text-[14px] text-foreground outline-none transition-colors duration-200 focus:border-[#00a86b]/40 disabled:opacity-50"
                  style={{
                    borderColor: status === 'error' ? 'rgba(239,68,68,0.5)' : undefined,
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="theme-button-primary group inline-flex h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-[8px] px-5 text-[14px] font-medium transition-all duration-200 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : status === 'success' ? (
                  language === 'ar' ? 'تم' : 'Done'
                ) : (
                  <>
                    {t(cta.button)}
                    <ArrowRight
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                      }`}
                    />
                  </>
                )}
              </button>
            </form>
            
            {/* Messages */}
            <div className="h-6 w-full max-w-[460px] text-left px-2">
              {status === 'error' && (
                <p className="text-xs text-red-500 font-medium">{errorMessage}</p>
              )}
              {status === 'success' && (
                <p className="text-xs text-emerald-500 font-medium">
                  {language === 'ar' ? 'تم الاشتراك بنجاح! شكراً لك.' : 'Successfully subscribed! Thank you.'}
                </p>
              )}
            </div>

          </div>{/* /Content */}

          <div className="absolute inset-0 h-full w-full pointer-events-none overflow-hidden rounded-[24px]">
            <div
              className="absolute left-0 right-0 h-[1px]"
              style={{
                bottom: '1px',
                background:
                  'linear-gradient(90deg, rgba(16,32,25,0) 0%, color-mix(in srgb, var(--foreground) 30%, transparent) 50%, rgba(16,32,25,0) 100%)',
                opacity: 0.7,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
