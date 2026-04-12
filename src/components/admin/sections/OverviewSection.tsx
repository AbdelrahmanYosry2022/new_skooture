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
      color: 'theme-accent-text',
      bgColor: 'bg-foreground/5'
    },
    {
      label: t('overview.activeSections'),
      value: '12',
      icon: LayoutTemplate,
      color: 'theme-accent-text',
      bgColor: 'bg-foreground/5'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-background p-6 border border-border rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] relative overflow-hidden group">
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
              <div className="flex items-center gap-5 relative z-10">
                <div className="p-4 rounded-[16px] bg-muted border border-border shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] group-hover:border-[color:var(--accent-border)] transition-colors">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.label}
                  </p>
                  <p className="theme-headline text-3xl font-medium tracking-tight">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-background p-8 border border-border rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]">
          <h3 className="text-xl font-bold tracking-tight text-foreground mb-6">
            {t('overview.systemStatus')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 rounded-[16px] bg-muted border border-border shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] transition-colors hover:bg-foreground/2">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-[radial-gradient(100%_100%_at_50%_0%,#4ade80_0%,#16a34a_100%)] shadow-[0_0_10px_rgba(74,222,128,0.5)] animate-pulse" />
                <span className="font-medium text-foreground">
                  {t('overview.database')}
                </span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {t('overview.connected')}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-5 rounded-[16px] bg-muted border border-border shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] transition-colors hover:bg-foreground/2">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-[radial-gradient(100%_100%_at_50%_0%,#4ade80_0%,#16a34a_100%)] shadow-[0_0_10px_rgba(74,222,128,0.5)] animate-pulse" />
                <span className="font-medium text-foreground">
                  {t('overview.apiService')}
                </span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {t('overview.operational')}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-background p-8 border border-border rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]">
          <h3 className="text-xl font-bold tracking-tight text-foreground mb-6">
            {t('overview.quickStats')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 rounded-[16px] bg-muted border border-border shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] transition-colors hover:bg-foreground/2">
              <span className="text-muted-foreground font-medium">
                {t('overview.totalMessages')}
              </span>
              <span className="text-xl font-medium tracking-tight text-foreground">0</span>
            </div>
            <div className="flex items-center justify-between p-5 rounded-[16px] bg-muted border border-border shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] transition-colors hover:bg-foreground/2">
              <span className="text-muted-foreground font-medium">
                {t('overview.lastContentUpdate')}
              </span>
              <span className="font-medium text-foreground text-sm bg-foreground/5 px-3 py-1 rounded-[8px] border border-border">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
