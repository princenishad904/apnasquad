const GlassCard = ({ children, className }) => (
  <div
    className={`bg-slate-900/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 ${className}`}
  >
    {children}
  </div>
);

export default GlassCard;
