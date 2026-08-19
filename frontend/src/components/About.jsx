import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter.jsx';

export default function About({ about }) {
  if (!about) return null;

  const stats = [
    { value: about.years_experience, suffix: '+', label: 'Years of Experience' },
    { value: about.happy_members, suffix: '+', label: 'Happy Members' },
    { value: about.certified_trainers, suffix: '+', label: 'Certified Trainers' },
    { value: about.success_rate, suffix: '%', label: 'Positive Results' },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#0B0D0C] overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#9B6BFF]/10 blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#FF6B4A]/10 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Animated image collage */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[420px] sm:h-[520px]"
        >
          <motion.img
            initial={{ opacity: 0, y: 40, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            src={about.image_1_url}
            alt="Studio session"
            className="absolute top-0 left-0 w-[62%] h-[62%] object-cover rounded-3xl shadow-2xl border border-white/10"
          />
          <motion.img
            initial={{ opacity: 0, y: 40, rotate: 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            src={about.image_2_url}
            alt="Yoga practice"
            className="absolute bottom-0 right-0 w-[58%] h-[58%] object-cover rounded-3xl shadow-2xl border border-white/10 animate-float"
          />
          <motion.img
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            src={about.image_3_url}
            alt="Zumba class"
            className="absolute top-[18%] right-[2%] w-[36%] h-[36%] object-cover rounded-2xl shadow-2xl border-4 border-[#0B0D0C]"
          />
        </motion.div>

        {/* Story */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-[#FF6B4A] mb-4 block"
          >
            {about.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[#FBF7F0] text-balance"
          >
            {about.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mt-6 text-base md:text-lg leading-relaxed text-[#A8A29A]"
          >
            {about.description}
          </motion.p>

          <div className="mt-10 grid grid-cols-2 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="glass rounded-2xl p-5"
              >
                <AnimatedCounter
                  value={s.value}
                  suffix={s.suffix}
                  className="font-display font-extrabold text-3xl sm:text-4xl gradient-text"
                />
                <p className="mt-1.5 text-sm text-[#A8A29A]">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
