import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { DURATION, EASE_OUT_QUART } from './motion';

interface FadeProps { children: ReactNode; className?: string; delay?: number }

export function FadeUp({ children, className, delay = 0 }: FadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  return (
    <motion.div ref={ref} className={className}
      initial={reduced ? undefined : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: DURATION.normal, ease: EASE_OUT_QUART as any, delay }}
    >{children}</motion.div>
  );
}

export function FadeIn({ children, className, delay = 0 }: FadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = useReducedMotion();
  return (
    <motion.div ref={ref} className={className}
      initial={reduced ? undefined : { opacity: 0 }}
      animate={inView ? { opacity: 1 } : undefined}
      transition={{ duration: DURATION.normal, delay }}
    >{children}</motion.div>
  );
}

export function ScaleIn({ children, className, delay = 0 }: FadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = useReducedMotion();
  return (
    <motion.div ref={ref} className={className}
      initial={reduced ? undefined : { opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: DURATION.normal, ease: EASE_OUT_QUART as any, delay }}
    >{children}</motion.div>
  );
}

export function SlideIn({ children, className, delay = 0, from = 'left' }: FadeProps & { from?: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  const x = from === 'left' ? -40 : 40;
  return (
    <motion.div ref={ref} className={className}
      initial={reduced ? undefined : { opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: DURATION.slow, ease: EASE_OUT_QUART as any, delay }}
    >{children}</motion.div>
  );
}

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] as any } },
};

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = useReducedMotion();
  if (reduced) return <div ref={ref} className={className}>{children}</div>;
  return (
    <motion.div ref={ref} className={className}
      variants={staggerVariants}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
    >{children}</motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return <motion.div className={className} variants={itemVariants}>{children}</motion.div>;
}
