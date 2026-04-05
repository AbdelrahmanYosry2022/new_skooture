import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Button } from '../ui/button';

export default function Hero() {
  const { content, t, language } = useContent();
  const isRTL = language === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Video URL handling
  const videoUrl = content.hero?.videoUrl || '';
  
  // Strict check for actual video files vs youtube links
  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  const isVideoFile = videoUrl.match(/\.(mp4|webm|ogg)$/i);
  
  const embedUrl = isYouTube 
    ? videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/') 
    : '';

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Top Badge */}
          {content.hero?.topBadge && (
            <motion.div variants={itemVariants} className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  {t(content.hero.topBadge)}
                </span>
              </div>
            </motion.div>
          )}

          {/* Main Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]"
          >
            {t(content.hero?.headline)}
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {t(content.hero?.subheadline)}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="w-full sm:w-auto text-base gap-2">
              {t(content.hero?.buttons?.explore)}
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Button>
            
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base gap-2">
              <PlayCircle className="w-4 h-4 text-slate-500" />
              {t(content.hero?.buttons?.demo)}
            </Button>
          </motion.div>

          {/* Video/Dashboard Preview */}
          <motion.div 
            variants={itemVariants}
            className="relative mx-auto mt-16 w-full max-w-5xl aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 shadow-xl ring-1 ring-slate-200 dark:ring-zinc-800"
          >
            {/* Window Controls UI */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-slate-800 flex items-center px-4 gap-2 z-20" dir="ltr">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>

            <div className="absolute top-10 inset-x-0 bottom-0 bg-slate-950 flex items-center justify-center">
              {videoUrl ? (
                isVideoFile ? (
                  <video 
                    src={videoUrl}
                    className="w-full h-full object-cover border-0"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : embedUrl ? (
                  <iframe 
                    src={embedUrl} 
                    title="Product Video"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="text-center p-8">
                    <div className="w-20 h-20 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center mx-auto mb-6">
                      <PlayCircle className="w-8 h-8 ml-1" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Platform Preview</h3>
                    <p className="text-slate-400">Video source is not a direct video file or valid YouTube link.</p>
                  </div>
                )
              ) : (
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center mx-auto mb-6">
                    <PlayCircle className="w-8 h-8 ml-1" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Platform Preview</h3>
                  <p className="text-slate-400">Interactive demo coming soon</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}
