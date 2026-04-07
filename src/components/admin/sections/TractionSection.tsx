import { Plus, Trash2 } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import IconPicker from '../shared/IconPicker';
import type { AdminSectionProps } from '../../../types';

export default function TractionSection({ localContent, updateNestedContent }: AdminSectionProps) {
  return (
    <SectionWrapper key="traction">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {localContent.traction.map((stat: any, index: number) => (
          <div key={index} className="relative p-5 bg-[#000000] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-5 group">
            <button 
              onClick={() => {
                const newTraction = [...localContent.traction];
                newTraction.splice(index, 1);
                updateNestedContent(['traction'], newTraction);
              }}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-[#191919] border border-white/[0.05] text-[#eb4520] hover:bg-[#eb4520] hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              title="Delete Stat"
            >
              <Trash2 size={14} />
            </button>
            
            <div className="flex flex-col space-y-5">
              <IconPicker 
                label="Section Icon"
                value={stat.icon}
                onChange={(name) => {
                  const newTraction = [...localContent.traction];
                  newTraction[index].icon = name;
                  updateNestedContent(['traction'], newTraction);
                }}
              />
              <div className="space-y-4">
                <div className="space-y-1.5 px-1">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-[#aeaeae]">Numerical Value</label>
                  <input 
                    type="number" 
                    value={stat.value}
                    onChange={(e) => {
                      const newTraction = [...localContent.traction];
                      newTraction[index].value = parseInt(e.target.value);
                      updateNestedContent(['traction'], newTraction);
                    }}
                    className="w-full px-4 py-2.5 rounded-[10px] bg-[#191919] border border-white/[0.05] text-[#eb4520] font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] focus:ring-1 focus:ring-[#eb4520] focus:border-[#eb4520] outline-none"
                  />
                </div>
                <TranslatableInput 
                  label="Stat Label"
                  enValue={stat.label.en}
                  arValue={stat.label.ar}
                  onEnChange={(val) => {
                    const newTraction = [...localContent.traction];
                    newTraction[index].label.en = val;
                    updateNestedContent(['traction'], newTraction);
                  }}
                  onArChange={(val) => {
                    const newTraction = [...localContent.traction];
                    newTraction[index].label.ar = val;
                    updateNestedContent(['traction'], newTraction);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => {
            const newItem = {
              value: 0,
              label: { en: "New Stat", ar: "إحصائية جديدة" },
              icon: "Activity"
            };
            updateNestedContent(['traction'], [...localContent.traction, newItem]);
          }}
          className="flex flex-col items-center justify-center gap-3 p-5 rounded-[16px] border-2 border-dashed border-white/[0.05] text-[#aeaeae] hover:text-white hover:border-[#eb4520]/50 hover:bg-[#eb4520]/5 transition-all min-h-[200px]"
        >
          <div className="w-10 h-10 rounded-full bg-[#191919] border border-white/[0.05] flex items-center justify-center shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]">
            <Plus size={20} />
          </div>
          <span className="text-sm font-medium">Add Another Impact Stat</span>
        </button>
      </div>
    </SectionWrapper>
  );
}
