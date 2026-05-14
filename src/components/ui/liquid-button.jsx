export function LiquidButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`group relative overflow-hidden rounded-full border border-f1red/80 bg-f1red/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-titanium shadow-glow-red transition hover:scale-[1.04] hover:border-f1red hover:bg-f1red/25 hover:shadow-glow-red active:scale-[0.99] ${className}`}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition group-hover:opacity-100" />
      {children}
    </button>
  );
}
