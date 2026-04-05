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
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center p-4 font-sans transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl shadow-blue-500/5 overflow-hidden">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-6 flex justify-center">
              {content?.brand?.logoUrl ? (
                <img src={content.brand.logoUrl} alt="Skooture" className="h-12 w-auto" />
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/20">
                    S
                  </div>
                  <span className="font-bold text-2xl text-slate-900 dark:text-white">Skooture</span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Admin Portal</h1>
            <p className="text-slate-500 dark:text-zinc-400">Sign in with your admin credentials</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 dark:text-white"
                  autoFocus
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border ${
                    error ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-zinc-800 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600'
                  } outline-none transition-all text-slate-900 dark:text-white`}
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full group flex items-center justify-center gap-2 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-sm disabled:opacity-60 mt-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm font-medium text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Back to Website
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
