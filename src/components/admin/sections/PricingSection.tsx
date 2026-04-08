import { Plus, Trash2, CheckCircle2, X } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';
import { useTranslation } from 'react-i18next';

export default function PricingSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');
  const plans = localContent.pricing.plans || [];

  // Extract all unique features to form the matrix rows
  const allFeaturesMap = new Map();
  plans.forEach((plan: any) => {
    (plan.features || []).forEach((f: any) => {
      // Use English name as a unique key for the matrix row
      const key = f.name.en.trim() || 'Untitled';
      if (!allFeaturesMap.has(key)) {
        allFeaturesMap.set(key, { en: f.name.en, ar: f.name.ar });
      }
    });
  });
  
  const allFeatures = Array.from(allFeaturesMap.values());

  const handleToggleFeature = (planIndex: number, featureNameEn: string, checked: boolean) => {
    const newPlans = JSON.parse(JSON.stringify(plans));
    const plan = newPlans[planIndex];
    if (!plan.features) plan.features = [];
    
    const existingFeatureIndex = plan.features.findIndex((f: any) => f.name.en.trim() === featureNameEn.trim());
    if (existingFeatureIndex !== -1) {
      plan.features[existingFeatureIndex].included = checked;
    } else {
      // Add the feature if it didn't exist in this plan yet
      const featureObj = allFeaturesMap.get(featureNameEn);
      plan.features.push({
        name: { en: featureObj.en, ar: featureObj.ar },
        included: checked
      });
    }
    updateNestedContent(['pricing', 'plans'], newPlans);
  };

  const handleUpdateFeatureName = (oldNameEn: string, newEn: string, newAr: string) => {
    const newPlans = JSON.parse(JSON.stringify(plans));
    newPlans.forEach((plan: any) => {
      if (plan.features) {
        const feature = plan.features.find((f: any) => f.name.en.trim() === oldNameEn.trim());
        if (feature) {
          feature.name.en = newEn;
          feature.name.ar = newAr;
        } else {
          // If a plan didn't have this feature explicitly listed, add it as false so names stay synced
          plan.features.push({
            name: { en: newEn, ar: newAr },
            included: false
          });
        }
      }
    });
    updateNestedContent(['pricing', 'plans'], newPlans);
  };

  const handleDeleteFeatureRow = (featureNameEn: string) => {
    const newPlans = JSON.parse(JSON.stringify(plans));
    newPlans.forEach((plan: any) => {
      if (plan.features) {
        plan.features = plan.features.filter((f: any) => f.name.en.trim() !== featureNameEn.trim());
      }
    });
    updateNestedContent(['pricing', 'plans'], newPlans);
  };

  const handleAddFeatureRow = () => {
    const newPlans = JSON.parse(JSON.stringify(plans));
    const newNameEn = `New Feature ${allFeatures.length + 1}`;
    const newNameAr = `ميزة جديدة ${allFeatures.length + 1}`;
    
    newPlans.forEach((plan: any) => {
      if (!plan.features) plan.features = [];
      plan.features.push({
        name: { en: newNameEn, ar: newNameAr },
        included: false
      });
    });
    updateNestedContent(['pricing', 'plans'], newPlans);
  };

  return (
    <SectionWrapper key="pricing">
      <div className="bg-[#000000] border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden space-y-6">
        
        <div className="p-6 border-b border-white/[0.05] bg-[#050505]">
          <h4 className="text-lg font-bold text-white mb-2">Pricing Plans</h4>
          <p className="text-sm text-[#aeaeae]">Manage your pricing tiers and configure the features matrix smartly.</p>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Plans Configuration (Top Layer) */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Available Plans</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {plans.map((plan: any, index: number) => (
                <div key={index} className="relative p-5 bg-[#111111] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] flex flex-col gap-4 group">
                  <button 
                    onClick={() => {
                      const newPlans = [...plans];
                      newPlans.splice(index, 1);
                      updateNestedContent(['pricing', 'plans'], newPlans);
                    }}
                    className="absolute -top-3 -right-3 p-2 rounded-[8px] bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
                    title="Delete Plan"
                  >
                    <Trash2 size={14} />
                  </button>
                  
                  <div className="space-y-4">
                    <TranslatableInput 
                      label="Plan Name"
                      enValue={plan.name.en}
                      arValue={plan.name.ar}
                      onEnChange={(val) => {
                        const newPlans = [...plans];
                        newPlans[index].name.en = val;
                        updateNestedContent(['pricing', 'plans'], newPlans);
                      }}
                      onArChange={(val) => {
                        const newPlans = [...plans];
                        newPlans[index].name.ar = val;
                        updateNestedContent(['pricing', 'plans'], newPlans);
                      }}
                    />
                    <TranslatableInput 
                      label="Badge (e.g. Popular)"
                      enValue={plan.badge?.en || ''}
                      arValue={plan.badge?.ar || ''}
                      onEnChange={(val) => {
                        const newPlans = [...plans];
                        if (!newPlans[index].badge) newPlans[index].badge = {en:'', ar:''};
                        newPlans[index].badge.en = val;
                        updateNestedContent(['pricing', 'plans'], newPlans);
                      }}
                      onArChange={(val) => {
                        const newPlans = [...plans];
                        if (!newPlans[index].badge) newPlans[index].badge = {en:'', ar:''};
                        newPlans[index].badge.ar = val;
                        updateNestedContent(['pricing', 'plans'], newPlans);
                      }}
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  const newPlans = [...plans, {
                    name: { en: 'New Plan', ar: 'خطة جديدة' },
                    badge: { en: '', ar: '' },
                    details: [],
                    features: allFeatures.map(f => ({
                      name: { en: f.en, ar: f.ar },
                      included: false
                    }))
                  }];
                  updateNestedContent(['pricing', 'plans'], newPlans);
                }}
                className="flex flex-col items-center justify-center gap-3 p-5 rounded-[16px] border border-dashed border-white/[0.1] text-[#aeaeae] hover:text-white hover:border-[#eb4520]/50 hover:bg-[#eb4520]/5 transition-all min-h-[150px]"
              >
                <div className="w-10 h-10 rounded-full bg-[#191919] border border-white/[0.05] flex items-center justify-center shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]">
                  <Plus size={20} />
                </div>
                <span className="text-sm font-medium">Add Plan Column</span>
              </button>
            </div>
          </div>

          {/* Features Matrix (Table) */}
          <div className="bg-[#111111] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-white/[0.05]">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Features Matrix</h4>
              <button 
                onClick={handleAddFeatureRow}
                className="px-4 py-2 text-xs font-medium text-white bg-[#eb4520] hover:bg-[#d63d1a] rounded-[10px] flex items-center gap-2 transition-all"
              >
                <Plus size={14} /> Add Feature Row
              </button>
            </div>
            
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#050505]">
                    <th className="p-4 text-xs font-bold text-[#aeaeae] uppercase tracking-wider min-w-[250px] border-b border-white/[0.05]">Feature Name (EN / AR)</th>
                    {plans.map((plan: any, idx: number) => (
                      <th key={idx} className="p-4 text-xs font-bold text-[#aeaeae] uppercase tracking-wider text-center border-b border-white/[0.05] min-w-[120px]">
                        {plan.name?.en || `Plan ${idx+1}`}
                      </th>
                    ))}
                    <th className="p-4 text-xs font-bold text-[#aeaeae] uppercase tracking-wider text-center border-b border-white/[0.05] w-[80px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {allFeatures.map((feature: any, rowIndex: number) => (
                    <tr key={rowIndex} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          <input 
                            type="text"
                            value={feature.en}
                            onChange={(e) => handleUpdateFeatureName(feature.en, e.target.value, feature.ar)}
                            className="w-full text-sm text-white bg-transparent border border-transparent focus:border-[#eb4520]/50 focus:ring-1 focus:ring-[#eb4520]/50 rounded-[8px] px-3 py-1.5 placeholder-zinc-600 transition-all outline-none"
                            placeholder="English Name..."
                          />
                          <input 
                            type="text"
                            value={feature.ar}
                            onChange={(e) => handleUpdateFeatureName(feature.en, feature.en, e.target.value)}
                            className="w-full text-sm text-white bg-transparent border border-transparent focus:border-[#eb4520]/50 focus:ring-1 focus:ring-[#eb4520]/50 rounded-[8px] px-3 py-1.5 placeholder-zinc-600 text-right font-arabic transition-all outline-none"
                            placeholder="الاسم بالعربي..."
                            dir="rtl"
                          />
                        </div>
                      </td>
                      {plans.map((plan: any, planIndex: number) => {
                        const pf = (plan.features || []).find((f: any) => f.name.en.trim() === feature.en.trim());
                        const isIncluded = pf ? pf.included : false;
                        
                        return (
                          <td key={planIndex} className="p-4 text-center align-middle">
                            <button
                              onClick={() => handleToggleFeature(planIndex, feature.en, !isIncluded)}
                              className="inline-flex items-center justify-center p-2 rounded-[8px] hover:bg-white/[0.05] transition-all"
                            >
                              {isIncluded ? (
                                <CheckCircle2 className="w-5 h-5 text-[#eb4520]" />
                              ) : (
                                <X className="w-5 h-5 text-zinc-600 hover:text-white" />
                              )}
                            </button>
                          </td>
                        );
                      })}
                      <td className="p-4 text-center align-middle">
                        <button 
                          onClick={() => handleDeleteFeatureRow(feature.en)}
                          className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-[8px] transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete Feature"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {allFeatures.length === 0 && (
                    <tr>
                      <td colSpan={plans.length + 2} className="p-8 text-center text-[#aeaeae] text-sm">
                        No features defined. Click "Add Feature Row" to start building your matrix.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}
