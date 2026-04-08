import { useState } from 'react';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import IconPicker from '../shared/IconPicker';
import DynamicIcon from '../../shared/DynamicIcon';
import type { AdminSectionProps } from '../../../types';

export default function FeaturesSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const features = localContent.aiCore?.features || [];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleUpdateFeature = (index: number, field: string, subfield: 'en' | 'ar' | null, value: any) => {
    const newFeatures = [...features];
    if (subfield) {
      newFeatures[index][field][subfield] = value;
    } else {
      newFeatures[index][field] = value;
    }
    updateNestedContent(['aiCore', 'features'], newFeatures);
  };

  const handleDeleteFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    updateNestedContent(['aiCore', 'features'], newFeatures);
    if (expandedIndex === index) setExpandedIndex(null);
  };

  const handleAddFeature = () => {
    const newFeatures = [...features, {
      icon: 'Star',
      title: { en: 'New Feature', ar: 'ميزة جديدة' },
      description: { en: 'Feature description here', ar: 'وصف الميزة هنا' }
    }];
    updateNestedContent(['aiCore', 'features'], newFeatures);
    setExpandedIndex(newFeatures.length - 1);
  };

  return (
    <SectionWrapper key="features">
      <div className="bg-[#000000] border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/[0.05] flex items-center justify-between bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[16px] bg-[#111111] border border-white/[0.05] flex items-center justify-center text-[#eb4520] shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
              <LayoutGrid size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight text-white mb-1">AI Core Features</h4>
              <p className="text-sm text-[#aeaeae]">Manage your main AI capabilities compactly and smartly.</p>
            </div>
          </div>
          <button
            onClick={handleAddFeature}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#eb4520] text-white text-sm font-medium rounded-[12px] hover:bg-[#ff5933] transition-colors shadow-[0_4px_12px_rgba(235,69,32,0.3)]"
          >
            <Plus size={16} />
            Add Feature
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-4">
          <AnimatePresence initial={false}>
            {features.map((feature: any, index: number) => {
              const isExpanded = expandedIndex === index;

              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`bg-[#111111] border border-white/[0.05] rounded-[16px] overflow-hidden transition-colors ${
                    isExpanded ? 'border-[#eb4520]/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'hover:border-white/[0.1]'
                  }`}
                >
                  {/* Compact Row View */}
                  <div 
                    className="flex items-center gap-4 p-4 cursor-pointer group select-none"
                    onClick={() => toggleExpand(index)}
                  >
                    <div className="text-white/[0.1] group-hover:text-white/[0.3] transition-colors cursor-grab active:cursor-grabbing">
                      <GripVertical size={20} />
                    </div>

                    <div className="w-10 h-10 rounded-[12px] bg-[#1a1a1a] border border-white/[0.05] flex items-center justify-center text-[#eb4520] shrink-0">
                      <DynamicIcon name={feature.icon || 'Star'} className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h5 className="text-white font-medium truncate">
                        {feature.title?.en || 'Untitled Feature'}
                      </h5>
                      <p className="text-xs text-[#aeaeae] truncate mt-0.5">
                        {feature.description?.en || 'No description provided'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity mr-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFeature(index);
                        }}
                        className="p-2 rounded-[8px] text-red-400 hover:text-white hover:bg-red-500/20 transition-colors"
                        title="Delete feature"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-[#eb4520]/10 text-[#eb4520]' : 'bg-[#1a1a1a] text-[#aeaeae]'}`}>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Expanded Edit Form */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="p-6 pt-2 border-t border-white/[0.05] bg-[#0a0a0a]/50 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
                          <div className="space-y-4">
                            <label className="block text-xs font-medium text-[#aeaeae] uppercase tracking-wider">Icon Selection</label>
                            <IconPicker 
                              label=""
                              value={feature.icon}
                              onChange={(val) => handleUpdateFeature(index, 'icon', null, val)}
                            />
                          </div>
                          
                          <div className="space-y-6">
                            <TranslatableInput 
                              label="Feature Title"
                              enValue={feature.title?.en || ''}
                              arValue={feature.title?.ar || ''}
                              onEnChange={(val) => handleUpdateFeature(index, 'title', 'en', val)}
                              onArChange={(val) => handleUpdateFeature(index, 'title', 'ar', val)}
                            />
                            <TranslatableInput 
                              label="Feature Description"
                              multiline
                              enValue={feature.description?.en || ''}
                              arValue={feature.description?.ar || ''}
                              onEnChange={(val) => handleUpdateFeature(index, 'description', 'en', val)}
                              onArChange={(val) => handleUpdateFeature(index, 'description', 'ar', val)}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <button
            onClick={handleAddFeature}
            className="w-full py-4 flex items-center justify-center gap-2 rounded-[16px] border border-dashed border-white/[0.1] text-[#aeaeae] hover:text-white hover:border-[#eb4520]/50 hover:bg-[#eb4520]/5 transition-all md:hidden"
          >
            <Plus size={18} />
            <span className="text-sm font-medium">Add New Feature</span>
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
