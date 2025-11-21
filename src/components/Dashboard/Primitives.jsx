import { motion } from "framer-motion";

export function Card({ className = "", children, hover = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={hover ? { y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" } : {}}
      className={`bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ title, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-gray-900 tracking-wide">{title}</h3>
      {action}
    </div>
  );
}

export function Stat({ label, value, delta, color = "text-gray-900" }) {
  return (
    <div>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${color} font-['Inter']`}>{value}</div>
      {delta && (
        <div className="text-xs text-gray-500 mt-1">{delta}</div>
      )}
    </div>
  );
}

export function Button({ variant = "primary", children, className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center h-11 px-4 rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E3A8A]";
  const styles = {
    primary: "bg-[#FF6B35] text-white hover:bg-[#ff5a1b]",
    secondary:
      "border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/5",
    ghost: "text-[#1E3A8A] hover:bg-[#1E3A8A]/5",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Avatar({ initials = "PC" }) {
  return (
    <div className="h-10 w-10 rounded-xl bg-gray-100 grid place-items-center text-gray-700 font-semibold border border-gray-200">
      {initials}
    </div>
  );
}
