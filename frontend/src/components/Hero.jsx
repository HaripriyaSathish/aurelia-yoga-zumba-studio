import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, MessageCircle, Phone } from 'lucide-react';
import DynamicIcon from '../utils/icons.jsx';

const headlineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const wordVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ hero, heroStats, settings }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = (hero?.headline || '').split(' ');
  const whatsapp = (settings?.whatsapp_number || '').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(settings?.whatsapp_message || 'Hi, I am interested in joining your Yoga/Zumba classes.')}`;
  const phone = settings?.phone_number || '';

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#0B0D0C]">
      {/* Background video / poster with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 -top-10 -bottom-10">
        {hero?.background_video_url ? (
          <video
            className="w-full h-full object-cover animate-kenburns"
            autoPlay
            muted
            loop
            playsInline
            poster={hero?.poster_image_url}
          >
            <source src={hero.background_video_url} type="video/mp4" />
          </video>
        ) : (
          <img
            src={hero?.poster_image_url}
            alt="Yoga and Zumba studio"
            className="w-full h-full object-cover animate-kenburns"
          />
        )}
      </motion.div>

      <div className="absolute inset-0 gradient-hero-overlay" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col items-center justify-center px-5 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-[#FBF7F0]/85"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A] animate-pulse-ring" />
          Premium Yoga & Zumba Studio
        </motion.span>

        <motion.h1
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
          className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] text-[#FBF7F0] max-w-5xl text-balance"
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-3 sm:mr-4">
              <motion.span
                variants={wordVariants}
                className={`inline-block ${i === words.length - 1 || i === words.length - 2 ? 'gradient-text' : ''}`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-7 max-w-2xl text-base sm:text-lg md:text-xl text-[#FBF7F0]/80 leading-relaxed text-balance"
        >
          {hero?.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-9 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href={hero?.primary_cta_link || '#contact'}
            className="px-8 py-4 rounded-full text-sm sm:text-base font-semibold text-white gradient-coral shadow-[0_10px_30px_rgba(255,107,74,0.35)] hover-glow-strong hover:-translate-y-0.5 transition-all duration-300"
          >
            {hero?.primary_cta_text || 'Book a Free Trial'}
          </a>
          <a
            href={hero?.secondary_cta_link || '#yoga-programs'}
            className="px-8 py-4 rounded-full text-sm sm:text-base font-semibold text-[#FBF7F0] glass hover:bg-white/15 transition-all duration-300"
          >
            {hero?.secondary_cta_text || 'Explore Classes'}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-6 flex items-center gap-4"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#FBF7F0]/70 hover:text-[#25D366] transition-colors">
            <MessageCircle className="w-4 h-4" /> WhatsApp Us
          </a>
          <span className="w-1 h-1 rounded-full bg-[#FBF7F0]/30" />
          <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-sm text-[#FBF7F0]/70 hover:text-[#FF6B4A] transition-colors">
            <Phone className="w-4 h-4" /> Call Us
          </a>
        </motion.div>
      </motion.div>

      {/* Floating glass stat cards */}
      <div className="hidden md:flex absolute bottom-24 left-0 right-0 z-10 justify-center gap-4 lg:gap-6 px-8">
        {(heroStats || []).slice(0, 4).map((stat, i) => (
          <motion.div
            key={stat.id || i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 + i * 0.1, duration: 0.6 }}
            className="glass rounded-2xl px-5 py-4 flex items-center gap-3 min-w-[150px] animate-float"
            style={{ animationDelay: `${i * 0.4}s` }}
          >
            <div className="w-10 h-10 rounded-xl gradient-coral flex items-center justify-center shrink-0">
              <DynamicIcon name={stat.icon} className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-display font-bold text-lg text-[#FBF7F0] leading-none">{stat.value}</p>
              <p className="text-xs text-[#FBF7F0]/60 mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[#FBF7F0]/60"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-scroll-bounce" />
      </motion.div>
    </section>
  );
}
