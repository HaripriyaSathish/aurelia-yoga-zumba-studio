import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, UserRound, Users } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';

const DAYS = [
  { key: 'monday', label: 'Mon' }, { key: 'tuesday', label: 'Tue' }, { key: 'wednesday', label: 'Wed' },
  { key: 'thursday', label: 'Thu' }, { key: 'friday', label: 'Fri' }, { key: 'saturday', label: 'Sat' },
  { key: 'sunday', label: 'Sun' },
];

function todayKey() {
  const idx = new Date().getDay(); // 0 Sun ... 6 Sat
  const map = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return map[idx];
}

export default function Schedule({ schedule }) {
  const [activeDay, setActiveDay] = useState(todayKey());

  const slotsForDay = useMemo(
    () => (schedule || []).filter((s) => s.day === activeDay),
    [schedule, activeDay]
  );

  return (
    <section id="schedule" className="relative py-16 md:py-20 bg-[#0F211D]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Weekly Schedule"
          title="Plan Your Week With Us"
          subtitle="A balanced mix of yoga and Zumba classes throughout the week — pick a day to see what's on."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {DAYS.map((d) => (
            <button
              key={d.key}
              onClick={() => setActiveDay(d.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeDay === d.key
                  ? 'gradient-coral text-white shadow-[0_8px_20px_rgba(31,191,143,0.35)]'
                  : 'glass text-[#FBF7F0]/70 hover:text-[#FBF7F0]'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid gap-4"
          >
            {slotsForDay.length === 0 && (
              <p className="text-center text-[#B9C7C2] py-10">No classes scheduled for this day.</p>
            )}
            {slotsForDay.map((slot, i) => {
              const isFull = slot.available_seats <= 0;
              const isFilling = slot.available_seats <= Math.max(3, Math.round(slot.total_seats * 0.15));
              return (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border border-white/10 hover-glow"
                >
                  <div className={`w-1.5 self-stretch rounded-full ${slot.category === 'yoga' ? 'bg-[#14B8A6]' : 'bg-[#1FBF8F]'}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-bold text-lg text-[#FBF7F0]">{slot.class_name}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${slot.category === 'yoga' ? 'bg-[#14B8A6]/20 text-[#99F6E4]' : 'bg-[#1FBF8F]/20 text-[#5EEAC0]'}`}>
                        {slot.category === 'yoga' ? 'Yoga' : 'Zumba'}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-[#B9C7C2]">
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#1FBF8F]" /> {slot.time}</span>
                      <span className="flex items-center gap-1.5"><UserRound className="w-4 h-4 text-[#1FBF8F]" /> {slot.trainer_name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Users className="w-4 h-4 text-[#B9C7C2]" />
                    <span className={`text-sm font-semibold ${isFull ? 'text-red-400' : isFilling ? 'text-[#5EEAC0]' : 'text-emerald-400'}`}>
                      {isFull ? 'Fully Booked' : `${slot.available_seats} / ${slot.total_seats} seats left`}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
