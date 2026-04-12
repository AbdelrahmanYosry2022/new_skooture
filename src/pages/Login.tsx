import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Mail, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { login } from '../api/client';
import { useContent } from '../context/ContentContext';

export default function Login() {
  const { content } = useContent();
  const [email, setEmail] = useState('admin@skooture.ai');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md z-10"
      >
        <div className="theme-panel-strong rounded-[24px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden relative">
          
          <div className="flex flex-col items-center text-center mb-8 relative z-10">
            <div className="mb-6 flex justify-center">
              {content?.brand?.logoUrl ? (
                <img src={content.brand.logoUrl} alt="Skooture" className="h-12 w-auto" />
              ) : (
                <div className="flex items-center gap-3">
                  <div className="theme-icon-shell w-12 h-12 rounded-[12px] flex items-center justify-center font-bold text-2xl">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00a86b] to-[#b3f0d4]">S</span>
                  </div>
                  <span className="font-bold text-2xl tracking-tight text-foreground">Skooture</span>
                </div>
              )}
            </div>
            <h1 className="theme-headline text-[28px] font-medium tracking-tight leading-[1.15] mb-3">
              Admin Portal
            </h1>
            <p className="text-muted-foreground leading-[1.6]">
              Sign in with your admin credentials
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-[#00a86b] transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="theme-input w-full pl-12 pr-4 h-[52px] rounded-[12px] focus:border-[#00a86b]/50 focus:ring-1 focus:ring-[#00a86b]/50 outline-none transition-all text-foreground placeholder:text-muted-foreground/50"
                  autoFocus
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-[#00a86b] transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={`theme-input w-full pl-12 pr-4 h-[52px] rounded-[12px] outline-none transition-all text-foreground placeholder:text-muted-foreground/50 ${
                    error ? 'border-red-500/50 ring-1 ring-red-500/50' : 'focus:border-[#00a86b]/50 focus:ring-1 focus:ring-[#00a86b]/50'
                  }`}
                  required
                />
              </div>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-sm text-red-400 font-medium px-1"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 h-[48px] px-[20px] rounded-[10px] bg-[#00a86b] hover:bg-[#008f5b] text-white font-medium text-[16px] transition-all duration-200 shadow-[0_1px_2px_rgba(82,88,102,0.06)] hover:shadow-[0_0_20px_rgba(51,219,159,0.4)] border-0 flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:shadow-none"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center relative z-10">
            <button
              onClick={() => navigate('/')}
              className="text-sm font-medium text-muted-foreground hover:text-[#00a86b] transition-colors"
            >
              Back to Website
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
