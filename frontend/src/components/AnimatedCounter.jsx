import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

export default function AnimatedCounter({ value, suffix = '', className = '', duration = 1.8 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  const numericValue = parseInt(String(value).replace(/[^0-9]/g, ''), 10) || 0;

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, numericValue, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, numericValue, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {display.toLocaleString()}{suffix}
    </motion.span>
  );
}
