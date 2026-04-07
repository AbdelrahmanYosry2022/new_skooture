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

  const inputClasses = "w-full h-[40px] px-3 rounded-[10px] bg-[#000000] border border-white/[0.08] focus:border-[#eb4520]/50 focus:ring-1 focus:ring-[#eb4520]/50 outline-none transition-all text-sm text-white placeholder:text-[#aeaeae]/50";
  const textareaClasses = "w-full min-h-[80px] p-3 rounded-[10px] bg-[#000000] border border-white/[0.08] focus:border-[#eb4520]/50 focus:ring-1 focus:ring-[#eb4520]/50 outline-none transition-all text-sm text-white placeholder:text-[#aeaeae]/50 resize-y";

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-[#aeaeae] px-1">
        {label}
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative group">
          <div className="absolute top-2.5 left-3 text-[10px] font-bold text-[#aeaeae]/40 uppercase select-none pointer-events-none group-focus-within:text-[#eb4520]/60 transition-colors">EN</div>
          {multiline ? (
            <textarea 
              value={enValue}
              onChange={(e) => onEnChange(e.target.value)}
              className={`${textareaClasses} pl-10`}
              placeholder="English text..."
            />
          ) : (
            <input 
              type="text"
              value={enValue}
              onChange={(e) => onEnChange(e.target.value)}
              className={`${inputClasses} pl-10`}
              placeholder="English text..."
            />
          )}
        </div>

        <div className="relative group" dir="rtl">
          <div className="absolute top-2.5 right-3 text-[10px] font-bold text-[#aeaeae]/40 uppercase select-none pointer-events-none group-focus-within:text-[#eb4520]/60 transition-colors">AR</div>
          {multiline ? (
            <textarea 
              value={arValue}
              onChange={(e) => onArChange(e.target.value)}
              className={`${textareaClasses} pr-10 text-right font-arabic`}
              placeholder="النص بالعربي..."
              dir="rtl"
            />
          ) : (
            <input 
              type="text"
              value={arValue}
              onChange={(e) => onArChange(e.target.value)}
              className={`${inputClasses} pr-10 text-right font-arabic`}
              placeholder="النص بالعربي..."
              dir="rtl"
            />
          )}
        </div>
      </div>
    </div>
  );
}
