import { Plus, Trash2, GripVertical } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import IconPicker from '../shared/IconPicker';
import type { AdminSectionProps } from '../../../types';

export default function TractionSection({ localContent, updateNestedContent }: AdminSectionProps) {
  return (
    <SectionWrapper key="traction">
      <div className="bg-[#000000] border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden space-y-6">
        
        {/* Header Section */}
        <div className="p-6 border-b border-white/[0.05] bg-[#050505]">
          <h4 className="text-lg font-bold text-white mb-2">Traction & Stats</h4>
          <p className="text-sm text-[#aeaeae]">Manage the core numbers that represent your impact.</p>
        </div>

        <div className="p-6 space-y-4">
          {localContent.traction.map((stat: any, index: number) => (
            <div key={index} className="flex gap-4 p-4 bg-[#111111] border border-white/[0.05] rounded-[16px] group relative">
              {/* Drag Handle */}
              <div className="cursor-grab text-white/[0.1] hover:text-white/[0.3] mt-2">
                <GripVertical size={20} />
              </div>

              <div className="flex-1 grid grid-cols-1 lg:grid-cols-[auto_120px_1fr] gap-6">
                <div className="w-[120px]">
                  <IconPicker 
                    label="Icon"
                    value={stat.icon}
                    onChange={(name) => {
                      const newTraction = [...localContent.traction];
                      newTraction[index].icon = name;
                      updateNestedContent(['traction'], newTraction);
                    }}
                  />
                </div>

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
                    className="w-full h-[40px] px-4 rounded-[12px] bg-[#191919] border border-white/[0.05] text-[#eb4520] font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] focus:ring-1 focus:ring-[#eb4520] focus:border-[#eb4520] outline-none transition-all"
                  />
                </div>
                
                <div>
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

              {/* Delete Action */}
              <button 
                onClick={() => {
                  const newTraction = [...localContent.traction];
                  newTraction.splice(index, 1);
                  updateNestedContent(['traction'], newTraction);
                }}
                className="absolute top-4 right-4 p-2 rounded-[8px] bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                title="Delete Stat"
              >
                <Trash2 size={16} />
              </button>
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
            className="w-full py-4 flex items-center justify-center gap-2 rounded-[16px] border border-dashed border-white/[0.1] text-[#aeaeae] hover:text-white hover:border-[#eb4520]/50 hover:bg-[#eb4520]/5 transition-all"
          >
            <Plus size={18} />
            <span className="text-sm font-medium">Add Impact Stat</span>
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
