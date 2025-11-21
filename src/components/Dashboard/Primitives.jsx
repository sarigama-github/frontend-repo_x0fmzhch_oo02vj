import { motion } from "framer-motion";

export function Card({ className = "", children, hover = true }) {
  // Lighter, faster: no heavy drop shadows or complex hover effects
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={hover ? { y: -1 } : {}}
      className={`bg-white rounded-xl border border-gray-200 ${className}`}
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
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      {delta && (
        <div className="text-xs text-gray-500 mt-1">{delta}</div>
      )}
    </div>
  );
}

export function Button({ variant = "primary", children, className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center h-10 px-4 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB]";
  const styles = {
    primary: "bg-[#2563EB] text-white hover:bg-[#1D4ED8]",
    secondary:
      "border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB]/5",
    ghost: "text-[#2563EB] hover:bg-[#2563EB]/5",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Avatar({ initials = "PC" }) {
  return (
    <div className="h-9 w-9 rounded-lg bg-gray-100 grid place-items-center text-gray-700 font-semibold border border-gray-200">
      {initials}
    </div>
  );
}
