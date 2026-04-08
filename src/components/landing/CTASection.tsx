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
    <section className="relative w-full overflow-hidden bg-[#000000] py-16">

      {/* Container card */}
      <div className="relative mx-auto max-w-[900px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[24px]"
          style={{
            background: 'black',
          }}
        >
          {/* Content column */}
          <div className="flex flex-col items-center gap-6 px-8 pb-16 pt-14 text-center md:px-20">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2.5 rounded-[21px] px-3.5 py-1.5"
              style={{ backgroundColor: 'rgb(25,25,25)' }}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{
                  background: 'radial-gradient(100% 100% at 50% 0%, rgb(255,169,132) 0%, rgb(255,89,17) 100%)',
                  boxShadow: 'rgba(255,255,255,0.12) 0px 1px 16px 0px inset, rgba(255,255,255,0.09) 0px 1px 1px 0px inset',
                }}
              />
              <span
                className="text-[13px] font-medium"
                style={{
                  backgroundImage: 'linear-gradient(90deg, rgb(232,111,58) 0%, rgb(252,189,162) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t({ en: 'Sign up for Skooture.AI today', ar: 'سجّل في Skooture.AI اليوم' })}
              </span>
            </div>

            {/* Heading — same size as reference: ~56px on desktop, fluid */}
            <h2
              className="w-full text-[36px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[44px] md:text-[52px]"
              style={{
                backgroundImage: 'linear-gradient(90deg, rgb(255,255,255) 0%, rgb(153,153,153) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t(cta.title)}
            </h2>

            {/* Feature pills — single container bg #262626 */}
            <div
              className="inline-flex items-center rounded-full px-4 py-2.5"
              style={{ backgroundColor: 'rgb(38,38,38)' }}
            >
              {pills.map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3">
                  <Icon className="h-[14px] w-[14px] text-white" strokeWidth={1.6} />
                  <span className="text-[13px] font-medium text-white">{t(label)}</span>
                  {i < pills.length - 1 && (
                    <span className="ml-3 h-3.5 w-px bg-white/15" />
                  )}
                </div>
              ))}
            </div>

            {/* Subtitle */}
            <p className="max-w-[440px] text-[15px] leading-[1.65] text-[#aeaeae]">
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
                  className="w-full h-[44px] rounded-[8px] border px-3.5 text-[14px] text-white outline-none transition-colors duration-200 focus:border-white/40 disabled:opacity-50"
                  style={{
                    backgroundColor: 'rgba(38,38,38,0.2)',
                    borderColor: status === 'error' ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.2)',
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="group inline-flex h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-[8px] px-5 text-[14px] font-medium text-white transition-all duration-200 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'rgb(234,69,32)' }}
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

          {/* ── Glow block (framer-b3bnzv) ── */}
          {/* Using pointer-events-none and absolute inset-0 to cover the card without clipping the glow at the top */}
          <div className="absolute inset-0 h-full w-full pointer-events-none overflow-hidden rounded-[24px]">
            {/* Ellipse 37 — blurred orange radial */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: '-120px',
                width: '600px',
                height: '240px',
                borderRadius: '50%',
                background:
                  'radial-gradient(50% 50% at 50% 50%, rgba(255,132,63,0.6) 0%, rgba(241,73,36,0) 100%)',
                filter: 'blur(40px)',
              }}
            />
            {/* Orange line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                background:
                  'linear-gradient(90deg, rgba(232,111,58,0) 0%, rgb(243,87,50) 50%, rgba(232,111,58,0) 100%)',
                opacity: 0.9,
              }}
            />
            {/* Grey line */}
            <div
              className="absolute left-0 right-0 h-[1px]"
              style={{
                bottom: '1px',
                background:
                  'linear-gradient(90deg, rgba(16,16,16,0) 0%, rgb(105,105,105) 50%, rgba(16,16,16,0) 100%)',
                opacity: 0.7,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
