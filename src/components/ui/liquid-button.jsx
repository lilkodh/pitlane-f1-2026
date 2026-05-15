import { motion } from 'framer-motion';

/** Primary glass CTA — Stitch: scale 1.05 + glow on hover (Framer Motion). */
export function LiquidButton({ children, className = '', ...props }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative overflow-hidden rounded-full border border-f1red/80 bg-f1red/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-titanium shadow-glow-red hover:border-f1red hover:bg-f1red/25 hover:shadow-glow-intense ${className}`}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      {children}
    </motion.button>
  );
}
