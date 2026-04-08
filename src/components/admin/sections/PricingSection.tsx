import { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowLeftRight, Settings2, CreditCard, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';

export default function PricingSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const pricingData = localContent.pricing || {};
  const plans = pricingData.plans || [];
  
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [cardLang, setCardLang] = useState<'en' | 'ar'>('en');
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  
  // Local state for smooth drag and drop
  const [localPlans, setLocalPlans] = useState<any[]>([]);

  useEffect(() => {
    const initializedPlans = plans.map((plan: any) => ({
      ...plan,
      _id: plan._id || Math.random().toString(36).substring(2, 9)
    }));
    setLocalPlans(initializedPlans);
    
    if (!activePlanId && initializedPlans.length > 0) {
      setActivePlanId(initializedPlans[0]._id);
    }
  }, [plans]);

  const handleReorder = (newOrder: any[]) => {
    setLocalPlans(newOrder); // visual only
  };

  const handleDragEnd = () => {
    updateNestedContent(['pricing', 'plans'], localPlans.map(({ _id, ...rest }) => rest)); // actual save
  };

  const activeIndex = localPlans.findIndex((plan: any) => plan._id === activePlanId);
  const activePlan = localPlans[activeIndex !== -1 ? activeIndex : 0];

  const handleUpdatePlan = (field: 'name' | 'badge' | 'highlighted', value: any) => {
    if (!activePlan) return;
    const newPlans = [...localPlans];
    const targetIndex = activeIndex !== -1 ? activeIndex : 0;
    
    if (field === 'highlighted') {
        newPlans[targetIndex][field] = value;
    } else {
        if (!newPlans[targetIndex][field]) newPlans[targetIndex][field] = { en: '', ar: '' };
        newPlans[targetIndex][field][cardLang] = value;
    }
    
    setLocalPlans(newPlans);
    updateNestedContent(['pricing', 'plans'], newPlans.map(({ _id, ...rest }) => rest));
  };

  const handleUpdateDetails = (detailIndex: number, value: string) => {
    if (!activePlan) return;
    const newPlans = [...localPlans];
    const targetIndex = activeIndex !== -1 ? activeIndex : 0;
    
    if (!newPlans[targetIndex].details) newPlans[targetIndex].details = [];
    if (!newPlans[targetIndex].details[detailIndex]) newPlans[targetIndex].details[detailIndex] = { en: '', ar: '' };
    
    newPlans[targetIndex].details[detailIndex][cardLang] = value;
    
    setLocalPlans(newPlans);
    updateNestedContent(['pricing', 'plans'], newPlans.map(({ _id, ...rest }) => rest));
  };

  const handleAddDetail = () => {
    if (!activePlan) return;
    const newPlans = [...localPlans];
    const targetIndex = activeIndex !== -1 ? activeIndex : 0;
    
    if (!newPlans[targetIndex].details) newPlans[targetIndex].details = [];
    newPlans[targetIndex].details.push({ en: 'New Detail', ar: 'تفصيلة جديدة' });
    
    setLocalPlans(newPlans);
    updateNestedContent(['pricing', 'plans'], newPlans.map(({ _id, ...rest }) => rest));
  };

  const handleDeleteDetail = (detailIndex: number) => {
    if (!activePlan) return;
    const newPlans = [...localPlans];
    const targetIndex = activeIndex !== -1 ? activeIndex : 0;
    
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
    if (activePlanId === idToDelete) {
      setActivePlanId(newPlans.length > 0 ? newPlans[0]._id : null);
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
    setActivePlanId(newId);
  };

  return (
    <SectionWrapper key="pricing">
      <div className="bg-[#000000] border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/[0.05] flex items-center justify-between bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[16px] bg-[#111111] border border-white/[0.05] flex items-center justify-center text-[#eb4520] shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
              <CreditCard size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight text-white mb-1">Pricing Plans</h4>
              <p className="text-sm text-[#aeaeae]">Manage your pricing tiers and features matrix.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
              className={`hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-[12px] border transition-colors w-full md:w-auto justify-center ${isHeaderExpanded ? 'bg-white/[0.05] border-white/[0.1] text-white' : 'bg-transparent border-white/[0.05] text-[#aeaeae] hover:text-white hover:bg-white/[0.02]'}`}
            >
              <Settings2 size={16} />
              Header Settings
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

        {/* Content */}
        <div className="p-6 md:p-8 bg-[#050505]">
          
          {/* Horizontal Draggable Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-2 custom-scrollbar">
            <Reorder.Group 
              axis="x" 
              values={localPlans} 
              onReorder={handleReorder} 
              className="flex items-center gap-3"
            >
              {localPlans.map((plan: any, index: number) => {
                const isActive = plan._id === activePlanId;
                return (
                  <Reorder.Item 
                    key={plan._id} 
                    value={plan}
                    onDragEnd={handleDragEnd}
                    className={`relative flex items-center justify-center px-4 h-[56px] rounded-[16px] border cursor-grab active:cursor-grabbing select-none group ${
                      isActive 
                        ? 'bg-[#eb4520] border-[#eb4520] text-white shadow-[0_4px_20px_rgba(235,69,32,0.4)] z-10' 
                        : 'bg-[#111111] border-white/[0.05] text-[#aeaeae] hover:bg-white/[0.05] hover:text-white hover:border-white/[0.1] z-0'
                    }`}
                    onClick={() => setActivePlanId(plan._id)}
                  >
                    <span className="font-bold text-sm transition-opacity group-hover:opacity-0">{plan.name?.[cardLang] || `Plan ${index + 1}`}</span>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[#aeaeae]">
                      <ArrowLeftRight size={20} />
                    </div>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>

            <button 
              onClick={handleAddPlan} 
              className="flex items-center justify-center min-w-[56px] h-[56px] rounded-[16px] border border-dashed border-white/[0.1] bg-[#111111] text-[#aeaeae] hover:bg-[#eb4520]/10 hover:border-[#eb4520]/50 hover:text-[#eb4520] transition-colors shrink-0"
              title="Add New Plan"
            >
              <Plus size={24} />
            </button>
          </div>

          {/* Active Plan Editor Card */}
          <AnimatePresence mode="wait">
            {activePlan ? (
              <motion.div
                key={activePlan._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-[#111111] border border-white/[0.05] shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-[24px] overflow-hidden mb-8"
              >
                {/* Card Header */}
                <div className="p-6 md:px-8 border-b border-white/[0.05] flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/[0.2]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[14px] border border-white/[0.05] bg-[#1a1a1a] flex items-center justify-center shrink-0 text-[#eb4520]">
                      <CreditCard className="w-6 h-6" />
                    </div>

                    <div>
                      <h5 className="text-white font-medium truncate max-w-[200px] md:max-w-[400px]">
                        {activePlan.name?.[cardLang] || 'New Plan'}
                      </h5>
                      <p className="text-xs text-[#aeaeae]">Currently editing {cardLang === 'en' ? 'English' : 'Arabic'} translation</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex bg-[#000000] p-1 rounded-[12px] border border-white/[0.05]">
                      <button 
                        onClick={() => setCardLang('en')}
                        className={`px-5 py-2 text-xs font-bold rounded-[8px] transition-all ${cardLang === 'en' ? 'bg-[#eb4520] text-white shadow-[0_2px_8px_rgba(235,69,32,0.4)]' : 'text-[#aeaeae] hover:text-white'}`}
                      >
                        EN
                      </button>
                      <button 
                        onClick={() => setCardLang('ar')}
                        className={`px-5 py-2 text-xs font-bold rounded-[8px] transition-all ${cardLang === 'ar' ? 'bg-[#eb4520] text-white shadow-[0_2px_8px_rgba(235,69,32,0.4)]' : 'text-[#aeaeae] hover:text-white'}`}
                      >
                        AR
                      </button>
                    </div>

                    <div className="w-[1px] h-8 bg-white/[0.05]"></div>

                    <button 
                      onClick={() => handleDeletePlan(activePlan._id)}
                      className="p-2.5 rounded-[10px] text-red-400 hover:text-white hover:bg-red-500/20 transition-colors"
                      title="Delete Plan"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Form Inputs */}
                <div className="p-6 md:p-8 space-y-8">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#aeaeae] uppercase tracking-wider mb-3">
                        {cardLang === 'en' ? 'Plan Name (English)' : 'اسم الباقة (بالعربية)'}
                      </label>
                      <input
                        type="text"
                        value={activePlan.name?.[cardLang] || ''}
                        onChange={(e) => handleUpdatePlan('name', e.target.value)}
                        className={`w-full bg-[#0a0a0a] border border-white/[0.05] focus:border-[#eb4520]/50 focus:bg-[#111] text-white rounded-[16px] px-5 py-4 outline-none transition-all placeholder:text-white/[0.1] ${cardLang === 'ar' ? 'text-right' : 'text-left'}`}
                        dir={cardLang === 'ar' ? 'rtl' : 'ltr'}
                        placeholder={cardLang === 'en' ? 'Type plan name...' : 'اكتب اسم الباقة هنا...'}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#aeaeae] uppercase tracking-wider mb-3">
                        {cardLang === 'en' ? 'Badge (e.g. Popular)' : 'شارة (مثال: الأكثر مبيعاً)'}
                      </label>
                      <input
                        type="text"
                        value={activePlan.badge?.[cardLang] || ''}
                        onChange={(e) => handleUpdatePlan('badge', e.target.value)}
                        className={`w-full bg-[#0a0a0a] border border-white/[0.05] focus:border-[#eb4520]/50 focus:bg-[#111] text-white rounded-[16px] px-5 py-4 outline-none transition-all placeholder:text-white/[0.1] ${cardLang === 'ar' ? 'text-right' : 'text-left'}`}
                        dir={cardLang === 'ar' ? 'rtl' : 'ltr'}
                        placeholder={cardLang === 'en' ? 'Optional badge text...' : 'نص الشارة الاختياري...'}
                      />
                    </div>
                  </div>

                  {/* Options */}
                  <div className="flex items-center gap-3 bg-[#0a0a0a] border border-white/[0.05] rounded-[16px] p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={activePlan.highlighted || false}
                        onChange={(e) => handleUpdatePlan('highlighted', e.target.checked)}
                        className="w-5 h-5 rounded-[6px] border-white/[0.1] text-[#eb4520] focus:ring-[#eb4520] bg-transparent"
                      />
                      <span className="text-sm font-medium text-white">
                        {cardLang === 'en' ? 'Highlight this plan (Stand out from others)' : 'تمييز هذه الخطة (لإبرازها عن غيرها)'}
                      </span>
                    </label>
                  </div>

                  {/* Details List */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-xs font-bold text-[#aeaeae] uppercase tracking-wider">
                        {cardLang === 'en' ? 'Plan Details (Price, Limits, etc.)' : 'تفاصيل الباقة (السعر، الحدود، إلخ)'}
                      </label>
                      <button 
                        onClick={handleAddDetail}
                        className="text-xs font-medium text-[#eb4520] hover:text-[#d63d1a] transition-colors"
                      >
                        {cardLang === 'en' ? '+ Add Detail' : '+ إضافة تفصيلة'}
                      </button>
                    </div>
                    <div className="space-y-3">
                      {(activePlan.details || []).map((detail: any, dIndex: number) => (
                        <div key={dIndex} className="flex items-center gap-3 group/detail">
                          <input
                            type="text"
                            value={detail[cardLang] || ''}
                            onChange={(e) => handleUpdateDetails(dIndex, e.target.value)}
                            className={`flex-1 bg-[#0a0a0a] border border-white/[0.05] focus:border-[#eb4520]/50 focus:bg-[#111] text-white rounded-[12px] px-4 py-3 outline-none transition-all placeholder:text-white/[0.1] ${cardLang === 'ar' ? 'text-right' : 'text-left'}`}
                            dir={cardLang === 'ar' ? 'rtl' : 'ltr'}
                            placeholder={cardLang === 'en' ? 'e.g. $ 49.00 / mo' : 'مثال: 49.00 دولار / شهرياً'}
                          />
                          <button
                            onClick={() => handleDeleteDetail(dIndex)}
                            className="p-3 rounded-[10px] text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-colors opacity-0 group-hover/detail:opacity-100 shrink-0"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      {(!activePlan.details || activePlan.details.length === 0) && (
                         <div className="text-center py-6 border border-dashed border-white/[0.05] rounded-[12px]">
                           <p className="text-zinc-500 text-sm">{cardLang === 'en' ? 'No details added yet.' : 'لا يوجد تفاصيل بعد.'}</p>
                         </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-20 border border-dashed border-white/[0.1] rounded-[24px] bg-[#111111]/50 mb-8">
                <CreditCard className="w-16 h-16 text-white/[0.05] mx-auto mb-4" />
                <p className="text-white font-medium text-lg mb-2">No Plans Available</p>
                <p className="text-[#aeaeae] text-sm">Click the + button above to add your first plan.</p>
              </div>
            )}
          </AnimatePresence>

          {/* Features Matrix (Table) */}
          <div className="bg-[#111111] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden mt-10">
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
                    {localPlans.map((plan: any, idx: number) => (
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
                      {localPlans.map((plan: any, planIndex: number) => {
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
                      <td colSpan={localPlans.length + 2} className="p-8 text-center text-[#aeaeae] text-sm">
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
