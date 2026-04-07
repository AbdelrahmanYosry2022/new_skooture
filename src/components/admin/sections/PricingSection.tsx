import { Plus, Trash2, X } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';

export default function PricingSection({ localContent, updateNestedContent }: AdminSectionProps) {
  return (
    <SectionWrapper key="pricing">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {localContent.pricing.plans.map((plan: any, index: number) => (
          <div key={index} className="relative p-5 bg-[#000000] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-6 group">
            <button 
              onClick={() => {
                const newPlans = [...localContent.pricing.plans];
                newPlans.splice(index, 1);
                updateNestedContent(['pricing', 'plans'], newPlans);
              }}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-[#191919] border border-white/[0.05] text-[#eb4520] hover:bg-[#eb4520] hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            >
              <Trash2 size={14} />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TranslatableInput 
                label="Plan Name"
                enValue={plan.name.en}
                arValue={plan.name.ar}
                onEnChange={(val) => {
                  const newPlans = [...localContent.pricing.plans];
                  newPlans[index].name.en = val;
                  updateNestedContent(['pricing', 'plans'], newPlans);
                }}
                onArChange={(val) => {
                  const newPlans = [...localContent.pricing.plans];
                  newPlans[index].name.ar = val;
                  updateNestedContent(['pricing', 'plans'], newPlans);
                }}
              />
              <TranslatableInput 
                label="Badge/Status"
                enValue={plan.badge.en}
                arValue={plan.badge.ar}
                onEnChange={(val) => {
                  const newPlans = [...localContent.pricing.plans];
                  newPlans[index].badge.en = val;
                  updateNestedContent(['pricing', 'plans'], newPlans);
                }}
                onArChange={(val) => {
                  const newPlans = [...localContent.pricing.plans];
                  newPlans[index].badge.ar = val;
                  updateNestedContent(['pricing', 'plans'], newPlans);
                }}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
                <label className="text-sm font-medium text-white">Features List</label>
              </div>
              <div className="space-y-3">
                {plan.features.map((f: any, fIndex: number) => (
                  <div key={fIndex} className="flex items-center gap-3 bg-[#191919] border border-white/[0.05] p-3 rounded-[10px]">
                    <input 
                      type="checkbox" 
                      checked={f.included}
                      onChange={(e) => {
                        const newPlans = [...localContent.pricing.plans];
                        newPlans[index].features[fIndex].included = e.target.checked;
                        updateNestedContent(['pricing', 'plans'], newPlans);
                      }}
                      className="w-4 h-4 rounded border-white/[0.1] bg-[#000000] text-[#eb4520] focus:ring-[#eb4520]"
                    />
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <input 
                        type="text"
                        value={f.name.en}
                        onChange={(e) => {
                          const newPlans = [...localContent.pricing.plans];
                          newPlans[index].features[fIndex].name.en = e.target.value;
                          updateNestedContent(['pricing', 'plans'], newPlans);
                        }}
                        className="w-full text-xs text-white bg-transparent border-none focus:ring-0 px-0"
                        placeholder="EN Feature..."
                      />
                      <input 
                        type="text"
                        value={f.name.ar}
                        onChange={(e) => {
                          const newPlans = [...localContent.pricing.plans];
                          newPlans[index].features[fIndex].name.ar = e.target.value;
                          updateNestedContent(['pricing', 'plans'], newPlans);
                        }}
                        className="w-full text-xs text-white bg-transparent border-none focus:ring-0 px-0 text-right font-arabic"
                        placeholder="\u0627\u0644\u0645\u064a\u0632\u0629..."
                      />
                    </div>
                    <button 
                      onClick={() => {
                        const newPlans = [...localContent.pricing.plans];
                        newPlans[index].features.splice(fIndex, 1);
                        updateNestedContent(['pricing', 'plans'], newPlans);
                      }}
                      className="p-1.5 text-[#aeaeae] hover:text-[#eb4520] hover:bg-white/[0.05] rounded-md transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => {
                  const newPlans = [...localContent.pricing.plans];
                  newPlans[index].features.push({
                    name: { en: "New Feature", ar: "\u0645\u064a\u0632\u0629 \u062c\u062f\u064a\u062f\u0629" },
                    included: true
                  });
                  updateNestedContent(['pricing', 'plans'], newPlans);
                }}
                className="text-xs font-medium text-[#aeaeae] hover:text-white bg-[#191919] hover:bg-[#252525] border border-white/[0.05] rounded-[8px] py-2 px-3 transition-all flex items-center justify-center gap-2 w-full mt-2"
              >
                <Plus size={14} /> Add Feature to Plan
              </button>
            </div>
          </div>
        ))}
        
        <button
          onClick={() => {
            const newPlans = [...localContent.pricing.plans, {
              name: { en: 'New Plan', ar: 'خطة جديدة' },
              badge: { en: 'Popular', ar: 'الأكثر طلباً' },
              features: []
            }];
            updateNestedContent(['pricing', 'plans'], newPlans);
          }}
          className="flex flex-col items-center justify-center gap-3 p-5 rounded-[16px] border-2 border-dashed border-white/[0.05] text-[#aeaeae] hover:text-white hover:border-[#eb4520]/50 hover:bg-[#eb4520]/5 transition-all min-h-[300px]"
        >
          <div className="w-10 h-10 rounded-full bg-[#191919] border border-white/[0.05] flex items-center justify-center shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]">
            <Plus size={20} />
          </div>
          <span className="text-sm font-medium">Add New Plan</span>
        </button>
      </div>
    </SectionWrapper>
  );
}
