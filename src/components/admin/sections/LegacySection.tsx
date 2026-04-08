import { Plus, Trash2, GripVertical } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';

export default function LegacySection({ localContent, updateNestedContent }: AdminSectionProps) {
  return (
    <SectionWrapper key="legacy">
      <div className="bg-[#000000] border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden space-y-6">
        
        {/* Header Section */}
        <div className="p-6 border-b border-white/[0.05] bg-[#050505]">
          <h4 className="text-lg font-bold text-white mb-2">Legacy Timeline</h4>
          <p className="text-sm text-[#aeaeae]">Manage the historical milestones of your platform.</p>
        </div>

        <div className="p-6 space-y-4">
          {localContent.legacy.items.map((item: any, index: number) => (
            <div key={index} className="flex gap-4 p-4 bg-[#111111] border border-white/[0.05] rounded-[16px] group relative">
              {/* Drag Handle */}
              <div className="cursor-grab text-white/[0.1] hover:text-white/[0.3] mt-2">
                <GripVertical size={20} />
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6">
                <div className="space-y-1.5 px-1">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-[#aeaeae]">Year</label>
                  <input 
                    type="text" 
                    value={item.year}
                    onChange={(e) => {
                      const newItems = [...localContent.legacy.items];
                      newItems[index].year = e.target.value;
                      updateNestedContent(['legacy', 'items'], newItems);
                    }}
                    className="w-full h-[40px] px-4 rounded-[12px] bg-[#191919] border border-white/[0.05] text-white font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] focus:ring-1 focus:ring-[#eb4520] focus:border-[#eb4520] outline-none transition-all"
                  />
                </div>
                
                <div className="space-y-4">
                  <TranslatableInput 
                    label="Event Title"
                    enValue={item.title.en}
                    arValue={item.title.ar}
                    onEnChange={(val) => {
                      const newItems = [...localContent.legacy.items];
                      newItems[index].title.en = val;
                      updateNestedContent(['legacy', 'items'], newItems);
                    }}
                    onArChange={(val) => {
                      const newItems = [...localContent.legacy.items];
                      newItems[index].title.ar = val;
                      updateNestedContent(['legacy', 'items'], newItems);
                    }}
                  />
                  <TranslatableInput 
                    label="Event Description"
                    multiline
                    enValue={item.description.en}
                    arValue={item.description.ar}
                    onEnChange={(val) => {
                      const newItems = [...localContent.legacy.items];
                      newItems[index].description.en = val;
                      updateNestedContent(['legacy', 'items'], newItems);
                    }}
                    onArChange={(val) => {
                      const newItems = [...localContent.legacy.items];
                      newItems[index].description.ar = val;
                      updateNestedContent(['legacy', 'items'], newItems);
                    }}
                  />
                </div>
              </div>

              {/* Delete Action */}
              <button 
                onClick={() => {
                  const newItems = [...localContent.legacy.items];
                  newItems.splice(index, 1);
                  updateNestedContent(['legacy', 'items'], newItems);
                }}
                className="absolute top-4 right-4 p-2 rounded-[8px] bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                title="Delete Event"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <button 
            onClick={() => {
              const newItem = {
                year: "2024",
                title: { en: "", ar: "" },
                description: { en: "", ar: "" }
              };
              updateNestedContent(['legacy', 'items'], [...localContent.legacy.items, newItem]);
            }}
            className="w-full py-4 flex items-center justify-center gap-2 rounded-[16px] border border-dashed border-white/[0.1] text-[#aeaeae] hover:text-white hover:border-[#eb4520]/50 hover:bg-[#eb4520]/5 transition-all"
          >
            <Plus size={18} />
            <span className="text-sm font-medium">Add Legacy Event</span>
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
