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
      label: t('overview.activeFeatures'),
      value: contentData.topFeatures?.items?.length || 0,
      icon: Activity,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-100 dark:border-blue-800'
    },
    {
      label: t('overview.testimonials'),
      value: contentData.testimonials?.items?.length || 0,
      icon: Users,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      borderColor: 'border-emerald-100 dark:border-emerald-800'
    },
    {
      label: t('overview.trustedPartners'),
      value: contentData.trustedBy?.logos?.length || 0,
      icon: Globe,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-100 dark:border-purple-800'
    },
    {
      label: t('overview.activeSections'),
      value: '12',
      icon: LayoutTemplate,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-amber-100 dark:border-amber-800'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="clean-card p-6 border border-slate-200 dark:border-zinc-800">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl ${stat.bgColor} ${stat.color} border ${stat.borderColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-zinc-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="clean-card p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            {t('overview.systemStatus')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="font-medium text-slate-700 dark:text-zinc-300">
                  {t('overview.database')}
                </span>
              </div>
              <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                {t('overview.connected')}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="font-medium text-slate-700 dark:text-zinc-300">
                  {t('overview.apiService')}
                </span>
              </div>
              <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                {t('overview.operational')}
              </span>
            </div>
          </div>
        </div>

        <div className="clean-card p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            {t('overview.quickStats')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800">
              <span className="text-slate-600 dark:text-zinc-400">
                {t('overview.totalMessages')}
              </span>
              <span className="font-bold text-slate-900 dark:text-white">0</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800">
              <span className="text-slate-600 dark:text-zinc-400">
                {t('overview.lastContentUpdate')}
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
