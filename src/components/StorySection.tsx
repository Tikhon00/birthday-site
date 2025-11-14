import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { siteConfig } from '@/config/content';

export const StorySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Чередуем фото и качества
  const items = [];
  const maxLength = Math.max(siteConfig.photos.length, siteConfig.qualities.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (i < siteConfig.photos.length) {
      items.push({ type: 'photo', data: siteConfig.photos[i], index: i });
    }
    if (i < siteConfig.qualities.length) {
      items.push({ type: 'quality', data: siteConfig.qualities[i], index: i });
    }
  }

  return (
    <section ref={containerRef} className="py-20 px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-gradient mb-16 text-center"
      >
        Наша история
      </motion.h2>

      <div className="max-w-4xl mx-auto space-y-20">
        {items.map((item, idx) => {
          const y = useTransform(
            scrollYProgress,
            [0, 1],
            [idx % 2 === 0 ? -30 : 30, idx % 2 === 0 ? 30 : -30]
          );

          if (item.type === 'photo') {
            const photo = item.data as typeof siteConfig.photos[0];
            return (
              <motion.div
                key={`photo-${idx}`}
                style={{ y }}
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`relative group ${
                  idx % 2 === 0 ? 'md:ml-0 md:mr-auto' : 'md:ml-auto md:mr-0'
                } max-w-sm md:max-w-md`}
              >
                <div className="relative rounded-3xl overflow-hidden card-glow transition-smooth group-hover:scale-105 group-hover:rotate-2">
                  <div className="aspect-[3/4] relative">
                    <img 
                      src={photo.src} 
                      alt={`Фото ${item.index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    
                    {/* Floating glow effect */}
                    <div className="absolute inset-0 bg-primary/10 blur-3xl animate-pulse pointer-events-none" />
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-float" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
              </motion.div>
            );
          } else {
            const quality = item.data as string;
            return (
              <motion.div
                key={`quality-${idx}`}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`${
                  idx % 2 === 0 ? 'md:ml-0 md:mr-auto' : 'md:ml-auto md:mr-0'
                } max-w-lg`}
              >
                <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 card-glow transition-smooth hover:scale-105 hover:bg-card/70 border border-primary/20 relative overflow-hidden">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-pulse" />
                  
                  <p className="text-xl md:text-2xl text-foreground leading-relaxed relative z-10 font-light">
                    {quality}
                  </p>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/30 to-transparent rounded-bl-full" />
                </div>
              </motion.div>
            );
          }
        })}
      </div>
    </section>
  );
};
