import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import ProgramCard from './ProgramCard.jsx';

const MARQUEE_WORDS = ['ZUMBA', 'CARDIO', 'DANCE', 'ENERGY', 'FITNESS', 'RHYTHM'];

export default function FitnessPrograms({ programs, settings }) {
  return (
    <section id="fitness-programs" className="relative py-16 md:py-20 bg-[#141715] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 overflow-hidden py-3 border-y border-white/5 opacity-40 select-none pointer-events-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span key={i} className="font-display font-extrabold text-4xl md:text-6xl mx-6 text-transparent" style={{ WebkitTextStroke: '1px #FF6B4A' }}>
              {w}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <SectionHeading
          eyebrow="Zumba & Fitness"
          title="Dance. Sweat. Celebrate."
          subtitle="High-energy Zumba and dance fitness programs that turn every workout into a celebration — for all ages and all fitness levels."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {(programs || []).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <ProgramCard
                program={p}
                index={i}
                whatsappNumber={settings?.whatsapp_number}
                whatsappBase="Hi, I'm interested in joining the"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
