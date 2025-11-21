import { useSettings } from '../../SettingsContext'
import { Card, Button, SectionTitle } from '../Dashboard/Primitives'
import { Moon, Sun, Gauge, Map, SlidersHorizontal, Trash2 } from 'lucide-react'

export default function SettingsPage(){
  const { settings, setSetting, reset } = useSettings()

  return (
    <div className="min-h-[60vh]">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500 mt-1">Control theme, density, motion and defaults used across the app.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <SectionTitle title="Appearance" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant={settings.theme==='light'?'primary':'secondary'} className="h-11" onClick={()=>setSetting('theme','light')}><Sun className="h-4 w-4 mr-2"/> Light</Button>
            <Button variant={settings.theme==='dark'?'primary':'secondary'} className="h-11" onClick={()=>setSetting('theme','dark')}><Moon className="h-4 w-4 mr-2"/> Dark</Button>
            <Button variant={settings.density==='comfortable'?'primary':'secondary'} className="h-11" onClick={()=>setSetting('density','comfortable')}><Gauge className="h-4 w-4 mr-2"/> Comfortable</Button>
            <Button variant={settings.density==='compact'?'primary':'secondary'} className="h-11" onClick={()=>setSetting('density','compact')}><SlidersHorizontal className="h-4 w-4 mr-2"/> Compact</Button>
          </div>
          <div className="mt-4">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={settings.reduceMotion} onChange={(e)=>setSetting('reduceMotion', e.target.checked)} />
              Reduce motion
            </label>
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle title="Defaults" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-gray-500 mb-2">Default Region</div>
              <select value={settings.defaultRegion} onChange={(e)=>setSetting('defaultRegion', e.target.value)} className="w-full h-11 rounded-xl border-2 border-gray-200 px-3 text-sm">
                {['Any','Rockies','Sierra','PNW','Utah','Colorado','Wyoming','New England','Quebec'].map(r=> (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-2">Default Pass</div>
              <select value={settings.defaultPass} onChange={(e)=>setSetting('defaultPass', e.target.value)} className="w-full h-11 rounded-xl border-2 border-gray-200 px-3 text-sm">
                {['Any','Ikon','Epic','Indy','Mountain Collective','None'].map(r=> (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-5 mt-6">
        <SectionTitle title="Danger zone" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-sm text-gray-600">Reset all preferences and cached state.</div>
          <Button variant="secondary" className="h-11" onClick={reset}><Trash2 className="h-4 w-4 mr-2"/>Reset settings</Button>
        </div>
      </Card>
    </div>
  )
}
