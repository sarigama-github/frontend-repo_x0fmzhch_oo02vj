import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Hero(){
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start','end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const fadeOut = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="relative h-[64vh] sm:h-[72vh] overflow-clip rounded-2xl border border-white/40 dark:border-white/10">
      {/* Background image */}
      <motion.img 
        src="https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?q=80&w=2069&auto=format&fit=crop"
        alt="Backcountry ridge"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ scale }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      {/* Floating orbs */}
      <div className="absolute inset-0">
        <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-violet-500/40 blur-2xl floaty" />
        <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-cyan-400/40 blur-2xl floaty-2" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-orange-400/30 blur-2xl floaty-3" />
      </div>

      <div className="relative z-10 h-full flex items-end p-8">
        <motion.div style={{ y: titleY }} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]">Playful speed. Futuristic flow.</h1>
          <p className="text-white/85 mt-2 max-w-xl">Jump into animated exploration across resorts, gear, and ROI — tuned to your preferences.</p>
          <div className="mt-4 flex items-center gap-3">
            <a href="/resorts" className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-[#FF6B35] text-white text-sm font-medium card-glow">Start with Resorts</a>
            <a href="/equipment" className="inline-flex items-center justify-center h-11 px-5 rounded-xl border-2 border-white/80 text-white text-sm font-medium">Find Gear</a>
          </div>
        </motion.div>
      </div>
      <motion.div style={{ opacity: fadeOut }} className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/80 text-xs">Scroll</motion.div>
    </section>
  )
}
