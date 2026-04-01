import { useState, useRef } from 'react';
import { Link, Upload, X, Check, Film, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../../context/ContentContext';

interface MediaInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'image' | 'video';
}

export default function MediaInput({ label, value, onChange, type = 'image' }: MediaInputProps) {
  const { adminLanguage } = useContent();
  const isRTL = adminLanguage === 'ar';
  const [mode, setMode] = useState<'url' | 'upload'>(value?.startsWith('data:') ? 'upload' : 'url');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('File is too large (>5MB). Please use a URL instead.');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const inputClasses = "w-full px-5 py-3.5 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/5 focus:border-blue-500/50 dark:focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <label className="text-[11px] uppercase tracking-[0.2em] font-black text-zinc-400 dark:text-zinc-500">
          {label}
        </label>
        
        <div className="flex items-center bg-zinc-100 dark:bg-white/5 rounded-xl block p-1 border border-zinc-200/50 dark:border-white/5">
          <button
            onClick={() => setMode('url')}
            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
              mode === 'url' ? 'bg-white dark:bg-white/10 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-zinc-400 dark:text-zinc-500'
            }`}
          >
            URL
          </button>
          <button
            onClick={() => setMode('upload')}
            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
              mode === 'upload' ? 'bg-white dark:bg-white/10 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-zinc-400 dark:text-zinc-500'
            }`}
          >
            Upload
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {mode === 'url' ? (
            <motion.div 
              key="url"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative"
            >
              <Link className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 ${isRTL ? 'right-4' : 'left-4'}`} />
              <input
                type="text"
                value={value?.startsWith('data:') ? '' : value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`Paste ${type} address...`}
                className={`${inputClasses} ${isRTL ? 'pr-12 text-right' : 'pl-12 text-left'}`}
              />
            </motion.div>
          ) : (
            <motion.div 
              key="upload"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-2"
            >
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`w-full group px-6 py-10 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-500 ${
                  value?.startsWith('data:') 
                    ? 'border-green-500/30 bg-green-500/5' 
                    : 'border-zinc-200 dark:border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5 dark:hover:bg-blue-500/5'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept={type === 'image' ? 'image/*' : 'video/*'}
                  onChange={handleFileChange}
                />
                
                {value?.startsWith('data:') ? (
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-green-500 text-white flex items-center justify-center shadow-xl shadow-green-500/20">
                      <Check size={24} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-zinc-900 dark:text-white">Media file ready</p>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onChange(''); }}
                        className="text-xs font-bold text-red-500 hover:text-red-600 mt-1 transition-colors"
                      >
                        Remove file
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/5 text-zinc-400 dark:text-zinc-600 flex items-center justify-center group-hover:scale-110 group-hover:text-blue-500 transition-all duration-500">
                      {type === 'image' ? <ImageIcon size={24} /> : <Film size={24} />}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-zinc-900 dark:text-white">Drop your platform {type} here</p>
                      <p className="text-xs font-medium text-zinc-400 mt-1">Maximum file size: 5MB</p>
                    </div>
                  </>
                )}
              </div>
              {error && <p className="text-xs font-bold text-red-500 px-2">{error}</p>}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Media Preview */}
        {value && !error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full aspect-video rounded-[2rem] overflow-hidden glass-card border-zinc-200/50 dark:border-white/5 group shadow-2xl shadow-zinc-200/50 dark:shadow-none"
          >
            {type === 'image' ? (
              <img src={value} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <video src={value} className="w-full h-full object-cover" controls />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button
                onClick={() => onChange('')}
                className="p-3 rounded-2xl bg-red-500 text-white shadow-xl hover:scale-110 active:scale-95 transition-all font-bold flex items-center gap-2"
              >
                <X size={18} /> Clear Content
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
