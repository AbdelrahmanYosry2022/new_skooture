import { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowLeftRight, Settings2, CreditCard, CheckCircle2, X, Star, Link, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';

export default function PricingSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const pricingData = (localContent.pricing as any) || {};
  const plans = pricingData.plans || [];
  
  const [matrixLang, setMatrixLang] = useState<'en' | 'ar'>('en');
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  const [activeSettingsPlanId, setActiveSettingsPlanId] = useState<string | null>(null);
  
  // Local state for smooth drag and drop
  const [localPlans, setLocalPlans] = useState<any[]>([]);

  useEffect(() => {
    const initializedPlans = plans.map((plan: any) => ({
      ...plan,
      _id: plan._id || Math.random().toString(36).substring(2, 9)
    }));
    setLocalPlans(initializedPlans);
  }, [plans]);

  const handleUpdatePlanProperty = (planId: string, field: string, lang: 'en' | 'ar', value: any) => {
    const newPlans = [...localPlans];
    const targetIndex = newPlans.findIndex(p => p._id === planId);
    if (targetIndex === -1) return;
    
    if (field === 'highlighted') {
        newPlans[targetIndex][field] = value;
    } else {
        if (!newPlans[targetIndex][field]) newPlans[targetIndex][field] = { en: '', ar: '' };
        newPlans[targetIndex][field][lang] = value;
    }
    
    setLocalPlans(newPlans);
    updateNestedContent(['pricing', 'plans'], newPlans.map(({ _id, ...rest }) => rest));
  };

  const handleUpdateDetails = (planId: string, detailIndex: number, lang: 'en' | 'ar', value: string) => {
    const newPlans = [...localPlans];
    const targetIndex = newPlans.findIndex(p => p._id === planId);
    if (targetIndex === -1) return;
    
    if (!newPlans[targetIndex].details) newPlans[targetIndex].details = [];
    if (!newPlans[targetIndex].details[detailIndex]) newPlans[targetIndex].details[detailIndex] = { en: '', ar: '' };
    
    newPlans[targetIndex].details[detailIndex][lang] = value;
    
    setLocalPlans(newPlans);
    updateNestedContent(['pricing', 'plans'], newPlans.map(({ _id, ...rest }) => rest));
  };

  const handleAddDetail = (planId: string) => {
    const newPlans = [...localPlans];
    const targetIndex = newPlans.findIndex(p => p._id === planId);
    if (targetIndex === -1) return;
    
    if (!newPlans[targetIndex].details) newPlans[targetIndex].details = [];
    newPlans[targetIndex].details.push({ en: 'New Detail', ar: 'تفصيلة جديدة' });
    
    setLocalPlans(newPlans);
    updateNestedContent(['pricing', 'plans'], newPlans.map(({ _id, ...rest }) => rest));
  };

  const handleDeleteDetail = (planId: string, detailIndex: number) => {
    const newPlans = [...localPlans];
    const targetIndex = newPlans.findIndex(p => p._id === planId);
    if (targetIndex === -1) return;
    
    if (newPlans[targetIndex].details) {
      newPlans[targetIndex].details.splice(detailIndex, 1);
    }
    
    setLocalPlans(newPlans);
    updateNestedContent(['pricing', 'plans'], newPlans.map(({ _id, ...rest }) => rest));
  };

  const handleDeletePlan = (idToDelete: string) => {
    const newPlans = localPlans.filter((plan: any) => plan._id !== idToDelete);
    setLocalPlans(newPlans);
    updateNestedContent(['pricing', 'plans'], newPlans.map(({ _id, ...rest }) => rest));
    if (activeSettingsPlanId === idToDelete) {
      setActiveSettingsPlanId(null);
    }
  };

  // Features Matrix specific logic
  const allFeaturesMap = new Map();
  localPlans.forEach((plan: any) => {
    (plan.features || []).forEach((f: any) => {
      const key = f.name.en.trim() || 'Untitled';
      if (!allFeaturesMap.has(key)) {
        allFeaturesMap.set(key, { en: f.name.en, ar: f.name.ar });
      }
    });
  });
  const allFeatures = Array.from(allFeaturesMap.values());

  const handleToggleFeature = (planIndex: number, featureNameEn: string, checked: boolean) => {
    const newPlans = [...localPlans];
    const plan = newPlans[planIndex];
    if (!plan.features) plan.features = [];
    
    const existingFeatureIndex = plan.features.findIndex((f: any) => f.name.en.trim() === featureNameEn.trim());
    if (existingFeatureIndex !== -1) {
      plan.features[existingFeatureIndex].included = checked;
    } else {
      const featureObj = allFeaturesMap.get(featureNameEn);
      plan.features.push({
        name: { en: featureObj.en, ar: featureObj.ar },
        included: checked
      });
    }
    setLocalPlans(newPlans);
    updateNestedContent(['pricing', 'plans'], newPlans.map(({ _id, ...rest }) => rest));
  };

  const handleUpdateFeatureName = (oldNameEn: string, newEn: string, newAr: string) => {
    const newPlans = [...localPlans];
    newPlans.forEach((plan: any) => {
      if (plan.features) {
        const feature = plan.features.find((f: any) => f.name.en.trim() === oldNameEn.trim());
        if (feature) {
          feature.name.en = newEn;
          feature.name.ar = newAr;
        } else {
          plan.features.push({
            name: { en: newEn, ar: newAr },
            included: false
          });
        }
      }
    });
    setLocalPlans(newPlans);
    updateNestedContent(['pricing', 'plans'], newPlans.map(({ _id, ...rest }) => rest));
  };

  const handleDeleteFeatureRow = (featureNameEn: string) => {
    const newPlans = [...localPlans];
    newPlans.forEach((plan: any) => {
      if (plan.features) {
        plan.features = plan.features.filter((f: any) => f.name.en.trim() !== featureNameEn.trim());
      }
    });
    setLocalPlans(newPlans);
    updateNestedContent(['pricing', 'plans'], newPlans.map(({ _id, ...rest }) => rest));
  };

  const handleAddFeatureRow = () => {
    const newPlans = [...localPlans];
    const newNameEn = `New Feature ${allFeatures.length + 1}`;
    const newNameAr = `ميزة جديدة ${allFeatures.length + 1}`;
    
    newPlans.forEach((plan: any) => {
      if (!plan.features) plan.features = [];
      plan.features.push({
        name: { en: newNameEn, ar: newNameAr },
        included: false
      });
    });
    setLocalPlans(newPlans);
    updateNestedContent(['pricing', 'plans'], newPlans.map(({ _id, ...rest }) => rest));
  };

  const handleAddPlan = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    const newPlans = [...localPlans, {
      _id: newId,
      name: { en: 'New Plan', ar: 'خطة جديدة' },
      badge: { en: '', ar: '' },
      highlighted: false,
      details: [{ en: 'Plan detail', ar: 'تفاصيل الخطة' }],
      features: allFeatures.map(f => ({
        name: { en: f.en, ar: f.ar },
        included: false
      }))
    }];
    setLocalPlans(newPlans);
    updateNestedContent(['pricing', 'plans'], newPlans.map(({ _id, ...rest }) => rest));
  };

  return (
    <SectionWrapper key="pricing">
      <div className="bg-[#000000] border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/[0.05] flex flex-col md:flex-row items-start md:items-center justify-between bg-gradient-to-b from-white/[0.02] to-transparent gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[16px] bg-[#111111] border border-white/[0.05] flex items-center justify-center text-[#eb4520] shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
              <CreditCard size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight text-white mb-1">Pricing & Matrix</h4>
              <p className="text-sm text-[#aeaeae]">Manage plans, badges, details, and features from a single smart matrix.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex bg-[#111111] p-1 rounded-[12px] border border-white/[0.05] w-full md:w-auto mr-4">
              <button 
                onClick={() => setMatrixLang('en')}
                className={`flex-1 md:flex-none px-6 py-2 text-xs font-bold rounded-[8px] transition-all whitespace-nowrap ${matrixLang === 'en' ? 'bg-[#eb4520] text-white shadow-[0_2px_8px_rgba(235,69,32,0.4)]' : 'text-[#aeaeae] hover:text-white'}`}
              >
                English
              </button>
              <button 
                onClick={() => setMatrixLang('ar')}
                className={`flex-1 md:flex-none px-6 py-2 text-xs font-bold rounded-[8px] transition-all whitespace-nowrap ${matrixLang === 'ar' ? 'bg-[#eb4520] text-white shadow-[0_2px_8px_rgba(235,69,32,0.4)]' : 'text-[#aeaeae] hover:text-white'}`}
              >
                العربية
              </button>
            </div>
            <button
              onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
              className={`hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-[12px] border transition-colors justify-center ${isHeaderExpanded ? 'bg-white/[0.05] border-white/[0.1] text-white' : 'bg-transparent border-white/[0.05] text-[#aeaeae] hover:text-white hover:bg-white/[0.02]'}`}
            >
              <Settings2 size={16} />
              Header Labels
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isHeaderExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden bg-[#0a0a0a] border-b border-white/[0.05]"
            >
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
                <TranslatableInput 
                  label="Section Title"
                  enValue={pricingData.title?.en || ''}
                  arValue={pricingData.title?.ar || ''}
                  onEnChange={(val) => updateNestedContent(['pricing', 'title', 'en'], val)}
                  onArChange={(val) => updateNestedContent(['pricing', 'title', 'ar'], val)}
                />
                <TranslatableInput 
                  label="Button Text"
                  enValue={pricingData.button?.en || ''}
                  arValue={pricingData.button?.ar || ''}
                  onEnChange={(val) => updateNestedContent(['pricing', 'button', 'en'], val)}
                  onArChange={(val) => updateNestedContent(['pricing', 'button', 'ar'], val)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content - Smart Matrix */}
        <div className="p-6 md:p-8 bg-[#050505]">
          
          <div className="bg-[#111111] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden mt-2 pb-10">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse table-fixed relative">
                <thead>
                  <tr className="bg-[#050505]">
                    <th className="p-4 align-bottom min-w-[250px] w-[300px] border-b border-white/[0.05] relative z-10">
                      <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold text-[#aeaeae] uppercase tracking-wider pl-2">
                          {matrixLang === 'en' ? 'Feature Name' : 'اسم الميزة'}
                        </span>
                        <button 
                          onClick={handleAddFeatureRow}
                          className="px-5 py-2.5 text-xs font-medium text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.05] rounded-[10px] flex items-center justify-center gap-2 transition-all w-full"
                        >
                          <Plus size={16} /> {matrixLang === 'en' ? 'Add Feature Row' : 'إضافة صف ميزة'}
                        </button>
                      </div>
                    </th>
                    {localPlans.map((plan: any, idx: number) => (
                      <th key={plan._id} className="p-4 align-top border-b border-white/[0.05] min-w-[240px] w-[280px] relative">
                        {/* Smart Plan Header */}
                        <div className={`p-4 rounded-[16px] border transition-all ${plan.highlighted ? 'bg-[#eb4520]/5 border-[#eb4520]/30 shadow-[inset_0_0_20px_rgba(235,69,32,0.1)]' : 'bg-[#191919] border-white/[0.05]'}`}>
                          
                          {/* Plan Name Editable */}
                          <div className="relative mb-3">
                            <input 
                              type="text"
                              value={plan.name?.[matrixLang] || ''}
                              onChange={(e) => handleUpdatePlanProperty(plan._id, 'name', matrixLang, e.target.value)}
                              className="w-full bg-transparent border-b border-dashed border-white/[0.2] hover:border-white/[0.5] focus:border-[#eb4520] focus:bg-[#000000] text-white font-bold text-lg px-2 py-1 outline-none transition-all placeholder:text-white/[0.2]"
                              dir={matrixLang === 'ar' ? 'rtl' : 'ltr'}
                              placeholder={matrixLang === 'en' ? 'Plan Name...' : 'اسم الباقة...'}
                            />
                            {plan.highlighted && (
                              <Star className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#eb4520] opacity-50 pointer-events-none" />
                            )}
                          </div>

                          <button
                            onClick={() => setActiveSettingsPlanId(activeSettingsPlanId === plan._id ? null : plan._id)}
                            className={`w-full py-2.5 px-3 rounded-[10px] text-xs font-bold uppercase tracking-wider flex items-center justify-between border transition-all ${activeSettingsPlanId === plan._id ? 'bg-[#eb4520] text-white border-[#eb4520] shadow-[0_4px_12px_rgba(235,69,32,0.4)]' : 'bg-[#111111] text-[#aeaeae] border-white/[0.05] hover:border-[#eb4520]/50 hover:text-white'}`}
                          >
                            <span>{matrixLang === 'en' ? 'Plan Settings' : 'إعدادات الباقة'}</span>
                            <Settings2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Dropdown Popover for Plan Settings */}
                        <AnimatePresence>
                          {activeSettingsPlanId === plan._id && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.15 }}
                              className="absolute top-full left-4 right-4 mt-2 bg-[#1a1a1a] border border-[#eb4520]/30 shadow-[0_20px_40px_rgba(0,0,0,0.8)] rounded-[16px] z-50 overflow-hidden flex flex-col"
                            >
                              <div className="p-4 bg-[#111111] border-b border-white/[0.05] flex items-center justify-between">
                                <span className="text-xs font-bold text-[#eb4520] uppercase tracking-wider flex items-center gap-2">
                                  <Settings2 className="w-3 h-3" />
                                  {plan.name?.[matrixLang] || 'Settings'}
                                </span>
                                <button onClick={() => setActiveSettingsPlanId(null)} className="text-zinc-500 hover:text-white transition-colors">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                                {/* Badge */}
                                <div>
                                  <label className="block text-[10px] font-bold text-[#aeaeae] uppercase tracking-wider mb-2">
                                    {matrixLang === 'en' ? 'Badge (e.g. Popular, Prepaid)' : 'شارة (مثال: الدفع مسبقاً)'}
                                  </label>
                                  <input
                                    type="text"
                                    value={plan.badge?.[matrixLang] || ''}
                                    onChange={(e) => handleUpdatePlanProperty(plan._id, 'badge', matrixLang, e.target.value)}
                                    className="w-full bg-[#0a0a0a] border border-white/[0.1] focus:border-[#eb4520] text-white rounded-[8px] px-3 py-2 text-sm outline-none transition-all placeholder:text-white/[0.1]"
                                    dir={matrixLang === 'ar' ? 'rtl' : 'ltr'}
                                    placeholder={matrixLang === 'en' ? 'Badge text...' : 'نص الشارة...'}
                                  />
                                </div>
                                {/* Highlight */}
                                <label className="flex items-center gap-3 cursor-pointer bg-[#0a0a0a] p-3 rounded-[8px] border border-white/[0.05]">
                                  <input 
                                    type="checkbox"
                                    checked={plan.highlighted || false}
                                    onChange={(e) => handleUpdatePlanProperty(plan._id, 'highlighted', matrixLang, e.target.checked)}
                                    className="w-4 h-4 rounded-[4px] border-white/[0.1] text-[#eb4520] focus:ring-[#eb4520] bg-transparent"
                                  />
                                  <span className="text-xs font-medium text-white leading-tight">
                                    {matrixLang === 'en' ? 'Highlight & Glow (Stand out)' : 'تمييز ساطع (لإبرازها)'}
                                  </span>
                                </label>
                                {/* Details */}
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <label className="block text-[10px] font-bold text-[#aeaeae] uppercase tracking-wider">
                                      {matrixLang === 'en' ? 'Pricing & Limits Details' : 'تفاصيل السعر والحدود'}
                                    </label>
                                    <button onClick={() => handleAddDetail(plan._id)} className="text-[10px] font-bold text-[#eb4520] hover:text-white transition-colors">
                                      + ADD
                                    </button>
                                  </div>
                                  <div className="space-y-2">
                                    {(plan.details || []).map((detail: any, dIndex: number) => (
                                      <div key={dIndex} className="flex items-center gap-2 group/detail">
                                        <input
                                          type="text"
                                          value={detail[matrixLang] || ''}
                                          onChange={(e) => handleUpdateDetails(plan._id, dIndex, matrixLang, e.target.value)}
                                          className="flex-1 bg-[#0a0a0a] border border-white/[0.1] focus:border-[#eb4520] text-white text-xs rounded-[8px] px-3 py-2 outline-none transition-all"
                                          dir={matrixLang === 'ar' ? 'rtl' : 'ltr'}
                                        />
                                        <button onClick={() => handleDeleteDetail(plan._id, dIndex)} className="p-2 text-zinc-500 hover:text-red-500 bg-red-500/5 hover:bg-red-500/20 rounded-[8px] transition-colors">
                                          <Trash2 size={14} />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="pt-2 border-t border-white/[0.05]">
                                  <button onClick={() => handleDeletePlan(plan._id)} className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-[8px] transition-colors">
                                    <Trash2 size={14} /> {matrixLang === 'en' ? 'Delete Plan entirely' : 'حذف الباقة بالكامل'}
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </th>
                    ))}
                    <th className="p-4 align-top w-[80px] border-b border-white/[0.05]">
                      <button 
                        onClick={handleAddPlan}
                        className="w-full h-full min-h-[100px] flex flex-col items-center justify-center gap-2 rounded-[16px] border border-dashed border-white/[0.2] text-zinc-500 hover:border-[#eb4520]/50 hover:bg-[#eb4520]/5 hover:text-[#eb4520] transition-colors"
                        title="Add New Plan Column"
                      >
                        <Plus size={24} />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {allFeatures.map((feature: any, rowIndex: number) => (
                    <tr key={rowIndex} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4 align-top">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleDeleteFeatureRow(feature.en)}
                            className="p-1.5 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-[6px] transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                            title="Delete Feature Row"
                          >
                            <Trash2 size={14} />
                          </button>
                          <div className="flex-1">
                            {matrixLang === 'en' ? (
                              <input 
                                type="text"
                                value={feature.en}
                                onChange={(e) => handleUpdateFeatureName(feature.en, e.target.value, feature.ar)}
                                className="w-full text-[13px] font-medium text-white bg-transparent border-b border-transparent focus:border-[#eb4520]/50 px-1 py-1 placeholder-zinc-600 transition-all outline-none"
                                placeholder="Type English Feature Name..."
                              />
                            ) : (
                              <input 
                                type="text"
                                value={feature.ar}
                                onChange={(e) => handleUpdateFeatureName(feature.en, feature.en, e.target.value)}
                                className="w-full text-[13px] font-medium text-white bg-transparent border-b border-transparent focus:border-[#eb4520]/50 px-1 py-1 placeholder-zinc-600 text-right font-arabic transition-all outline-none"
                                placeholder="اكتب اسم الميزة..."
                                dir="rtl"
                              />
                            )}
                          </div>
                        </div>
                      </td>
                      {localPlans.map((plan: any, planIndex: number) => {
                        const pf = (plan.features || []).find((f: any) => f.name.en.trim() === feature.en.trim());
                        const isIncluded = pf ? pf.included : false;
                        
                        return (
                          <td key={planIndex} className="p-4 text-center align-middle">
                            <button
                              onClick={() => handleToggleFeature(planIndex, feature.en, !isIncluded)}
                              className={`inline-flex items-center justify-center w-[38px] h-[38px] rounded-[10px] transition-all duration-200 shadow-sm ${
                                isIncluded 
                                  ? 'bg-gradient-to-br from-[#eb4520] to-[#d63d1a] text-white shadow-[0_4px_12px_rgba(235,69,32,0.4)]' 
                                  : 'bg-[#111111] border border-white/[0.05] text-zinc-600 hover:border-white/[0.2] hover:text-white'
                              }`}
                            >
                              {isIncluded ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                            </button>
                          </td>
                        );
                      })}
                      <td className="p-4"></td>
                    </tr>
                  ))}
                  {allFeatures.length === 0 && (
                    <tr>
                      <td colSpan={localPlans.length + 2} className="p-12 text-center text-[#aeaeae] text-sm border-dashed border-t border-white/[0.05]">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <Link className="w-8 h-8 text-zinc-600" />
                          <p>No features defined. Click "Add Feature Row" to start building your matrix.</p>
                        </div>
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
