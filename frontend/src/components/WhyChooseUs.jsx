import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import DynamicIcon from '../utils/icons.jsx';

export default function WhyChooseUs({ features }) {
  return (
    <section className="relative py-16 md:py-20 bg-[#0A1614]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Everything You Need to Thrive"
          subtitle="A premium, supportive environment engineered around your goals — from your very first class to every milestone after."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {(features || []).map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-6 flex flex-col items-start gap-4 border border-white/10 hover-glow transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl gradient-coral flex items-center justify-center animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                <DynamicIcon name={f.icon} className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#FBF7F0]">{f.title}</h3>
              <p className="text-sm text-[#B9C7C2] leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
