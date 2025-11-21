import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Hero(){
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start','end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="relative h-[60vh] sm:h-[70vh] overflow-clip rounded-2xl">
      <motion.img 
        src="https://images.unsplash.com/photo-1519683109079-d5f539e15475?q=80&w=2070&auto=format&fit=crop"
        alt="Powder mountain"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ scale }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      <div className="relative z-10 h-full flex items-end p-8">
        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">Peak Performance.<br/>Precision Decisions.</h1>
          <p className="text-white/80 mt-2 max-w-xl">Personalized resorts, gear, and ROI tools. Scroll to explore – images subtly zoom as you move.</p>
          <div className="mt-4 flex items-center gap-3">
            <a href="/resorts" className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-[#FF6B35] text-white text-sm font-medium">Start with Resorts</a>
            <a href="/equipment" className="inline-flex items-center justify-center h-11 px-5 rounded-xl border-2 border-white/80 text-white text-sm font-medium">Find Gear</a>
          </div>
        </motion.div>
      </div>
      <motion.div style={{ opacity }} className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/80 text-xs">Scroll</motion.div>
    </section>
  )
}
