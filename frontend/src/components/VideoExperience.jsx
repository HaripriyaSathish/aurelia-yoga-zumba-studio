import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';

function ReelCard({ reel, index }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
    } else {
      v.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setMuted((m) => !m);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.1 }}
      whileHover={{ y: -6 }}
      className="relative aspect-[9/16] rounded-3xl overflow-hidden group cursor-pointer border border-white/10 bg-[#141715] hover-glow"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={reel.video_url}
        poster={reel.poster_image_url}
        muted={muted}
        loop
        playsInline
        preload="none"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass text-[10px] font-semibold text-white tracking-wider">
        {reel.duration_label}
      </span>

      <button
        onClick={toggleMute}
        className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: playing ? 0.85 : 1, opacity: playing ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          className="w-14 h-14 rounded-full gradient-coral flex items-center justify-center shadow-xl group-hover:opacity-100"
        >
          {playing ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-0.5" />}
        </motion.div>
      </div>

      <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white text-balance">{reel.title}</p>
    </motion.div>
  );
}

export default function VideoExperience({ reels }) {
  return (
    <section className="relative py-24 md:py-32 bg-[#141715]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Short Video Experience"
          title="Feel the Energy in Motion"
          subtitle="Quick, immersive previews of our classes — tap to play, mute or unmute, and see AURELIA in action."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {(reels || []).map((r, i) => (
            <ReelCard key={r.id} reel={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
