import { useState } from 'react';
import { useContent } from '../../../context/ContentContext';

interface TranslatableInputProps {
  label: string;
  enValue: string;
  arValue: string;
  onEnChange: (value: string) => void;
  onArChange: (value: string) => void;
  multiline?: boolean;
}

export default function TranslatableInput({ 
  label, 
  enValue, 
  arValue, 
  onEnChange, 
  onArChange, 
  multiline = false 
}: TranslatableInputProps) {
  const { adminLanguage } = useContent();
  const [activeLang, setActiveLang] = useState<'en' | 'ar'>(adminLanguage);

  const inputClasses = "theme-input w-full min-h-[40px] px-4 py-2 rounded-[12px] focus:border-[#00a86b]/50 focus:ring-1 focus:ring-[#00a86b]/50 outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground/30";
  const textareaClasses = "theme-input w-full min-h-[100px] px-4 py-3 rounded-[12px] focus:border-[#00a86b]/50 focus:ring-1 focus:ring-[#00a86b]/50 outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground/30 resize-y";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground px-1">
          {label}
        </label>
        
        {/* Language Toggle */}
        <div className="theme-soft-surface flex items-center rounded-[8px] p-0.5">
          <button
            onClick={() => setActiveLang('en')}
            className={`px-3 py-1 rounded-[6px] text-[10px] font-bold uppercase transition-all cursor-pointer ${
              activeLang === 'en' 
                ? 'theme-panel-strong text-[#00a86b]' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setActiveLang('ar')}
            className={`px-3 py-1 rounded-[6px] text-[10px] font-bold uppercase transition-all cursor-pointer ${
              activeLang === 'ar' 
                ? 'theme-panel-strong text-[#00a86b]' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            AR
          </button>
        </div>
      </div>
      
      <div className="relative group">
        {activeLang === 'en' ? (
          multiline ? (
            <textarea 
              value={enValue}
              onChange={(e) => onEnChange(e.target.value)}
              className={textareaClasses}
              placeholder="Enter text in English..."
              dir="ltr"
            />
          ) : (
            <input 
              type="text"
              value={enValue}
              onChange={(e) => onEnChange(e.target.value)}
              className={inputClasses}
              placeholder="Enter text in English..."
              dir="ltr"
            />
          )
        ) : (
          multiline ? (
            <textarea 
              value={arValue}
              onChange={(e) => onArChange(e.target.value)}
              className={`${textareaClasses} font-arabic`}
              placeholder="أدخل النص باللغة العربية..."
              dir="rtl"
            />
          ) : (
            <input 
              type="text"
              value={arValue}
              onChange={(e) => onArChange(e.target.value)}
              className={`${inputClasses} font-arabic`}
              placeholder="أدخل النص باللغة العربية..."
              dir="rtl"
            />
          )
        )}
      </div>
    </div>
  );
}
