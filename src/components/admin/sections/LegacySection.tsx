import { Plus, Trash2 } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';

export default function LegacySection({ localContent, updateNestedContent }: AdminSectionProps) {
  return (
    <SectionWrapper key="legacy">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {localContent.legacy.items.map((item: any, index: number) => (
          <div key={index} className="relative p-5 bg-[#000000] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-5 group">
            <button 
              onClick={() => {
                const newItems = [...localContent.legacy.items];
                newItems.splice(index, 1);
                updateNestedContent(['legacy', 'items'], newItems);
              }}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-[#191919] border border-white/[0.05] text-[#eb4520] hover:bg-[#eb4520] hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              title="Delete Event"
            >
              <Trash2 size={14} />
            </button>
            <div className="flex flex-col space-y-5">
              <div className="space-y-1.5 px-1">
                <label className="text-[10px] uppercase font-bold text-[#aeaeae]">Year</label>
                <input 
                  type="text" 
                  value={item.year}
                  onChange={(e) => {
                    const newItems = [...localContent.legacy.items];
                    newItems[index].year = e.target.value;
                    updateNestedContent(['legacy', 'items'], newItems);
                  }}
                  className="w-full px-4 py-2.5 rounded-[10px] bg-[#191919] border border-white/[0.05] text-white font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] focus:ring-1 focus:ring-[#eb4520] focus:border-[#eb4520] outline-none"
                />
              </div>
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
          className="flex flex-col items-center justify-center gap-3 p-5 rounded-[16px] border-2 border-dashed border-white/[0.05] text-[#aeaeae] hover:text-white hover:border-[#eb4520]/50 hover:bg-[#eb4520]/5 transition-all min-h-[200px]"
        >
          <div className="w-10 h-10 rounded-full bg-[#191919] border border-white/[0.05] flex items-center justify-center shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]">
            <Plus size={20} />
          </div>
          <span className="text-sm font-medium">Add New Legacy Event</span>
        </button>
      </div>
    </SectionWrapper>
  );
}
