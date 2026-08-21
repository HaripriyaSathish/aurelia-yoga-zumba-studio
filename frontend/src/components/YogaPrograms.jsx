import React from 'react';
import SectionHeading from './SectionHeading.jsx';
import ProgramCard from './ProgramCard.jsx';

export default function YogaPrograms({ programs, settings }) {
  return (
    <section id="yoga-programs" className="relative py-16 md:py-20 bg-[#0A1614]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Yoga Programs"
          title="Find Your Perfect Practice"
          subtitle="From gentle restorative flows to powerful strength-building sequences — discover a yoga style crafted for every body and every goal."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {(programs || []).map((p, i) => (
            <ProgramCard
              key={p.id}
              program={p}
              index={i}
              whatsappNumber={settings?.whatsapp_number}
              whatsappBase="Hi, I'm interested in joining the"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
