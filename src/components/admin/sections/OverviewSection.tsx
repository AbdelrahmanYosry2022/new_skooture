import { Activity, Users, Globe, LayoutTemplate } from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import { useTranslation } from 'react-i18next';

export default function OverviewSection() {
  const { content } = useContent();
  const { t } = useTranslation('admin');
  
  // Use 'any' type assertion to bypass strict typing for missing nested properties
  // since the content schema structure may vary slightly from the types
  const contentData = content as any;

  const stats = [
    {
      label: t('overview.trustedPartners'),
      value: contentData.partners?.logos?.length || 0,
      icon: Globe,
      color: 'text-[#eb4520]',
      bgColor: 'bg-[radial-gradient(ellipse_at_center,rgba(235,69,32,0.15)_0%,transparent_70%)]'
    },
    {
      label: t('overview.activeSections'),
      value: '12',
      icon: LayoutTemplate,
      color: 'text-[#eb4520]',
      bgColor: 'bg-[radial-gradient(ellipse_at_center,rgba(235,69,32,0.15)_0%,transparent_70%)]'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-[#000000] p-6 border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] relative overflow-hidden group">
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
              <div className="flex items-center gap-5 relative z-10">
                <div className="p-4 rounded-[16px] bg-[#111111] border border-white/[0.05] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] group-hover:border-[#eb4520]/20 transition-colors">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#aeaeae] mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999]">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-[#000000] p-8 border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]">
          <h3 className="text-xl font-bold tracking-tight text-white mb-6">
            {t('overview.systemStatus')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 rounded-[16px] bg-[#111111] border border-white/[0.05] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] transition-colors hover:bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-[radial-gradient(100%_100%_at_50%_0%,#4ade80_0%,#16a34a_100%)] shadow-[0_0_10px_rgba(74,222,128,0.5)] animate-pulse" />
                <span className="font-medium text-white">
                  {t('overview.database')}
                </span>
              </div>
              <span className="text-sm font-medium text-[#aeaeae]">
                {t('overview.connected')}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-5 rounded-[16px] bg-[#111111] border border-white/[0.05] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] transition-colors hover:bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-[radial-gradient(100%_100%_at_50%_0%,#4ade80_0%,#16a34a_100%)] shadow-[0_0_10px_rgba(74,222,128,0.5)] animate-pulse" />
                <span className="font-medium text-white">
                  {t('overview.apiService')}
                </span>
              </div>
              <span className="text-sm font-medium text-[#aeaeae]">
                {t('overview.operational')}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#000000] p-8 border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]">
          <h3 className="text-xl font-bold tracking-tight text-white mb-6">
            {t('overview.quickStats')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 rounded-[16px] bg-[#111111] border border-white/[0.05] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] transition-colors hover:bg-white/[0.02]">
              <span className="text-[#aeaeae] font-medium">
                {t('overview.totalMessages')}
              </span>
              <span className="text-xl font-medium tracking-tight text-white">0</span>
            </div>
            <div className="flex items-center justify-between p-5 rounded-[16px] bg-[#111111] border border-white/[0.05] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] transition-colors hover:bg-white/[0.02]">
              <span className="text-[#aeaeae] font-medium">
                {t('overview.lastContentUpdate')}
              </span>
              <span className="font-medium text-white text-sm bg-white/[0.05] px-3 py-1 rounded-[8px] border border-white/[0.05]">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
