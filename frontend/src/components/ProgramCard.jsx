import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BarChart3, CalendarDays, UserRound, PlayCircle } from 'lucide-react';

export default function ProgramCard({ program, index = 0, whatsappNumber, whatsappBase }) {
  const message = `${whatsappBase} "${program.name}". Could you share the class timings and pricing?`;
  const whatsappUrl = `https://wa.me/${(whatsappNumber || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative rounded-3xl overflow-hidden glass border border-white/10 flex flex-col"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={program.image_url}
          alt={program.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0C]/90 via-transparent to-transparent" />
        {program.video_url && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
            <PlayCircle className="w-12 h-12 text-white" />
          </div>
        )}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider glass-coral text-[#FF9270]">
          {program.level_display || program.level}
        </span>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display font-bold text-xl text-white text-balance">{program.name}</h3>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-sm text-[#A8A29A] leading-relaxed line-clamp-3 min-h-[3.6em]">{program.description}</p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-[#FBF7F0]/75">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#FF6B4A]" /> {program.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <UserRound className="w-3.5 h-3.5 text-[#FF6B4A]" /> {program.trainer_name || 'TBA'}
          </div>
          <div className="col-span-2 flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-[#FF6B4A]" /> {program.schedule}
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="font-display font-extrabold text-lg text-[#FBF7F0]">₹{Number(program.price).toLocaleString('en-IN')}</span>
            <span className="text-xs text-[#A8A29A]">/month</span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full text-xs font-semibold text-white gradient-coral hover:shadow-[0_8px_20px_rgba(255,107,74,0.4)] transition-all duration-300"
          >
            Join Now
          </a>
        </div>
      </div>
    </motion.div>
  );
}
