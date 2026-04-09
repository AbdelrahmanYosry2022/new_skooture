import { useState, useRef } from 'react';
import { Link, X, Check, Film, Image as ImageIcon } from 'lucide-react';
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

  const inputClasses = "w-full h-[40px] px-3 rounded-[10px] bg-background border border-white/[0.08] focus:border-[#00a86b]/50 focus:ring-1 focus:ring-[#00a86b]/50 outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground/50";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <label className="text-xs font-medium text-muted-foreground">
          {label}
        </label>
        
        <div className="flex items-center bg-background rounded-[8px] p-1 border border-border">
          <button
            onClick={() => setMode('url')}
            className={`px-3 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
              mode === 'url' ? 'bg-[#191919] text-[#00a86b] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/[0.02]' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            URL
          </button>
          <button
            onClick={() => setMode('upload')}
            className={`px-3 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
              mode === 'upload' ? 'bg-[#191919] text-[#00a86b] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/[0.02]' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Upload
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {mode === 'url' ? (
            <motion.div 
              key="url"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="relative group"
            >
              <Link className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-[#00a86b] transition-colors ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                value={value?.startsWith('data:') ? '' : value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`Paste ${type} address...`}
                className={`${inputClasses} ${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'}`}
              />
            </motion.div>
          ) : (
            <motion.div 
              key="upload"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`w-full group px-6 py-6 rounded-[12px] border flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 ${
                  value?.startsWith('data:') 
                    ? 'border-emerald-500/30 bg-emerald-500/5' 
                    : 'border-dashed border-border hover:border-[#00a86b]/50 hover:bg-[#00a86b]/5'
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
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-[10px] bg-emerald-500/20 text-emerald-500 flex items-center justify-center border border-emerald-500/30">
                      <Check size={18} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Media file ready</p>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onChange(''); }}
                        className="text-xs font-medium text-red-400 hover:text-red-300 mt-1 transition-colors"
                      >
                        Remove file
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-[10px] bg-[#191919] border border-border text-muted-foreground flex items-center justify-center group-hover:text-[#00a86b] transition-colors">
                      {type === 'image' ? <ImageIcon size={20} /> : <Film size={20} />}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">Click to upload {type}</p>
                      <p className="text-xs text-muted-foreground">Maximum file size: 5MB</p>
                    </div>
                  </div>
                )}
              </div>
              {error && <p className="text-xs font-medium text-red-400 px-1">{error}</p>}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Media Preview */}
        {value && !error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="relative w-full aspect-[21/9] rounded-[12px] overflow-hidden border border-border group bg-background"
          >
            {type === 'image' ? (
              <img src={value} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <video src={value} className="w-full h-full object-cover" controls />
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
              <button
                onClick={() => onChange('')}
                className="px-4 py-2 rounded-[8px] bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-foreground transition-all text-sm font-medium flex items-center gap-2"
              >
                <X size={16} /> Remove
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
