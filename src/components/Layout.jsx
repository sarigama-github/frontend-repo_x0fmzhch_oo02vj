import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, MountainSnow, Calculator, Users, Wrench, Home, Settings, Sun, Moon, Sparkles } from 'lucide-react'
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
  const routeAnim = useMemo(() => reduce ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.12 } } : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.2 } }, [reduce])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      {/* Top Bar - clean & compact */}
      <div className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-slate-900/60 border-b border-slate-200/70 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden h-9 w-9 grid place-items-center rounded-lg border border-slate-200/70 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40" onClick={()=>setOpen(v=>!v)}>
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <div className="h-8 w-8 rounded-lg bg-blue-600 text-white grid place-items-center">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="hidden sm:block text-sm text-slate-700 dark:text-slate-300">Peakcision</div>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {nav.map((n)=> (
              <NavLink key={n.to} to={n.to} className={({isActive})=>`inline-flex items-center gap-2 px-3 h-9 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'}`}>
                <n.icon className="h-4 w-4"/> {n.label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setSetting('theme', settings.theme==='dark'?'light':'dark')} className="h-9 w-9 grid place-items-center rounded-lg border border-slate-200/70 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40">
              {settings.theme==='dark' ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
            </button>
            <NavLink to="/settings" className={({isActive})=>`h-9 w-9 grid place-items-center rounded-lg border ${isActive?'border-blue-500 text-blue-600':'border-slate-200/70 dark:border-slate-700/50 text-slate-700 dark:text-slate-200'} bg-white/60 dark:bg-slate-900/40`}>
              <Settings className="h-5 w-5"/>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={()=>setOpen(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div initial={{x:-300}} animate={{x:0}} exit={{x:-300}} transition={{type:'tween', duration:0.2}} className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 p-4 md:hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">Menu</div>
              <button className="h-8 w-8 grid place-items-center rounded-md border border-slate-200 dark:border-slate-700" onClick={()=>setOpen(false)}>✕</button>
            </div>
            <div className="space-y-1">
              {nav.map((n)=> (
                <NavLink key={n.to} to={n.to} className={({isActive})=>`flex items-center gap-2 px-3 h-10 rounded-md ${isActive?'bg-blue-600 text-white':'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                  <n.icon className="h-4 w-4"/> {n.label}
                </NavLink>
              ))}
              <NavLink to="/settings" className={({isActive})=>`flex items-center gap-2 px-3 h-10 rounded-md ${isActive?'bg-blue-600 text-white':'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                <Settings className="h-4 w-4"/> Settings
              </NavLink>
              <button onClick={reset} className="w-full mt-2 inline-flex items-center gap-2 justify-center px-3 h-10 rounded-md border border-slate-200 dark:border-slate-700">Reset preferences</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div key={loc.pathname} initial={routeAnim.initial} animate={routeAnim.animate} transition={routeAnim.transition}>
          <Outlet />
        </motion.div>
      </div>
    </div>
  )
}
