import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, MountainSnow, Calculator, Users, Wrench, Home, Settings, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useSettings } from '../SettingsContext'

const nav = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/resorts', label: 'Resorts', icon: MountainSnow },
  { to: '/equipment', label: 'Equipment', icon: Wrench },
  { to: '/roi', label: 'ROI', icon: Calculator },
  { to: '/profile', label: 'Profile', icon: Users },
]

export default function Layout() {
  const { settings, setSetting, reset } = useSettings()
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => setOpen(false), [loc.pathname])

  const reduce = settings.reduceMotion
  const routeAnim = useMemo(() => reduce ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.15 } } : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } }, [reduce])

  return (
    <div className="min-h-screen relative text-gray-900 dark:text-slate-100">
      {/* Futuristic animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-80 dark:opacity-60 playful-gradient" />
        <div className="absolute inset-0 mix-blend-overlay">
          <div className="absolute inset-0 futuristic-grid" />
        </div>
        {/* soft vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/80 dark:from-slate-950/80 dark:via-slate-900/40 dark:to-slate-950/80" />
        {/* starfield */}
        <div className="starfield">
          {Array.from({ length: 60 }).map((_, i) => (
            <span key={i} style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, opacity: 0.6 }} className="floaty" />
          ))}
        </div>
        {/* rotating ring accent */}
        <div className="absolute right-[-120px] top-[-120px] w-[360px] h-[360px] rounded-full border-2 border-white/40 dark:border-white/10 rotating" />
      </div>

      {/* Top Bar */}
      <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-900/40 border-b border-white/40 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden h-10 w-10 grid place-items-center rounded-xl border border-white/40 dark:border-white/10 bg-white/60 dark:bg-white/5" onClick={()=>setOpen(v=>!v)}>
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <div className="h-9 w-9 rounded-xl text-white grid place-items-center shadow-sm border-gradient relative overflow-hidden">
                <span className="relative z-10">P</span>
              </div>
              <div className="hidden sm:block text-sm text-gray-700 dark:text-slate-300">Peakcision</div>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {nav.map((n)=> (
              <NavLink key={n.to} to={n.to} className={({isActive})=>`inline-flex items-center gap-2 px-3 h-10 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-white/70 dark:bg-white/10 text-violet-700 dark:text-cyan-300' : 'text-gray-700 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-white/5'}`}>
                <n.icon className="h-4 w-4"/> {n.label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setSetting('theme', settings.theme==='dark'?'light':'dark')} className="h-10 w-10 grid place-items-center rounded-xl border border-white/40 dark:border-white/10 bg-white/60 dark:bg-white/5">
              {settings.theme==='dark' ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
            </button>
            <NavLink to="/settings" className={({isActive})=>`h-10 w-10 grid place-items-center rounded-xl border ${isActive?'border-violet-500 text-violet-600 dark:text-cyan-300':'border-white/40 dark:border-white/10 text-gray-700 dark:text-slate-200'} bg-white/60 dark:bg-white/5`}>
              <Settings className="h-5 w-5"/>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={()=>setOpen(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div initial={{x:-320}} animate={{x:0}} exit={{x:-320}} transition={{type:'spring', stiffness:260, damping:24}} className="fixed top-0 left-0 bottom-0 w-72 bg-white/95 dark:bg-slate-900/95 border-r border-white/40 dark:border-white/10 z-40 p-4 md:hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">Menu</div>
              <button className="h-9 w-9 grid place-items-center rounded-lg border border-white/40 dark:border-white/10" onClick={()=>setOpen(false)}>✕</button>
            </div>
            <div className="space-y-1">
              {nav.map((n)=> (
                <NavLink key={n.to} to={n.to} className={({isActive})=>`flex items-center gap-2 px-3 h-11 rounded-lg ${isActive?'bg-white/70 dark:bg-white/10 text-violet-700 dark:text-cyan-300':'text-gray-800 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-white/5'}`}>
                  <n.icon className="h-4 w-4"/> {n.label}
                </NavLink>
              ))}
              <NavLink to="/settings" className={({isActive})=>`flex items-center gap-2 px-3 h-11 rounded-lg ${isActive?'bg-white/70 dark:bg-white/10 text-violet-700 dark:text-cyan-300':'text-gray-800 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-white/5'}`}>
                <Settings className="h-4 w-4"/> Settings
              </NavLink>
              <button onClick={reset} className="w-full mt-2 inline-flex items-center gap-2 justify-center px-3 h-11 rounded-lg border border-white/40 dark:border-white/10">Reset preferences</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content with route transition */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div key={loc.pathname} initial={routeAnim.initial} animate={routeAnim.animate} transition={routeAnim.transition}>
          <Outlet />
        </motion.div>
      </div>

      {/* Sticky Footer CTA */}
      <div className="h-16" />
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[min(960px,92%)]">
        <div className="rounded-2xl border border-white/40 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 backdrop-blur p-3 shadow-lg card-glow">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div className="text-sm text-gray-800 dark:text-slate-200">Explore playful animations and a bold color palette. Toggle motion in Settings.</div>
            <div className="flex items-center gap-2">
              <Link to="/profile" className="inline-flex items-center justify-center h-10 px-4 rounded-xl bg-[#FF6B35] text-white text-sm font-medium">View Profile</Link>
              <Link to="/resorts" className="inline-flex items-center justify-center h-10 px-4 rounded-xl border-2 border-violet-600 text-violet-700 dark:text-cyan-300 text-sm font-medium">Find Resorts</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
