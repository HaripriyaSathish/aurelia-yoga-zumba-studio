import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from '../utils/socialIcons.jsx';

export default function Trainers({ trainers }) {
  return (
    <section id="trainers" className="relative py-16 md:py-20 bg-[#0A1614]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Meet Our Trainers"
          title="Guided by Certified Experts"
          subtitle="Our instructors bring decades of combined experience, international certifications and genuine passion to every class."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(trainers || []).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl overflow-hidden border border-white/10 hover-glow"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={t.photo_url}
                  alt={t.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1614] via-[#0A1614]/30 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display font-bold text-lg text-white">{t.name}</h3>
                  <p className="text-xs text-[#5EEAC0] font-medium mt-0.5">{t.role}</p>
                  <p className="text-[11px] text-[#FBF7F0]/60 mt-1">{t.experience_years}+ years experience</p>

                  <div className="mt-3 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 overflow-hidden transition-all duration-500">
                    <p className="text-xs text-[#FBF7F0]/75 leading-relaxed mb-3">{t.bio}</p>
                    <div className="flex items-center gap-3">
                      {t.instagram_url && (
                        <a href={t.instagram_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-[#1FBF8F] transition-colors">
                          <InstagramIcon className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {t.facebook_url && (
                        <a href={t.facebook_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-[#1FBF8F] transition-colors">
                          <FacebookIcon className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {t.linkedin_url && (
                        <a href={t.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-[#1FBF8F] transition-colors">
                          <LinkedinIcon className="w-4 h-4 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
