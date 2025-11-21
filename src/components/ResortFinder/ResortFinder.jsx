import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Button } from "../Dashboard/Primitives";
import {
  CalendarDays,
  Users,
  MountainSnow,
  Snowflake,
  CloudSnow,
  Gauge,
  Navigation,
  Ticket,
  Trees,
  ThermometerSnowflake,
  BadgeCheck,
  CheckCircle2,
  Filter,
  Compass,
  Map as MapIcon,
  Search
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { useSettings } from "../../SettingsContext";
import { api } from "../../lib/api";

const passes = ["Any", "Ikon", "Epic", "Indy", "Mountain Collective", "None"];
const regions = ["Any", "Rockies", "Sierra", "PNW", "Utah", "Colorado", "Wyoming", "New England", "Quebec", "British Columbia", "Alps"];
const abilities = ["Beginner", "Intermediate", "Advanced", "Expert"];

function SectionTitle({ icon: Icon, title, action }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        {Icon ? <Icon className="h-5 w-5 text-blue-600" /> : null}
        <div className="text-sm font-semibold tracking-wide">{title}</div>
      </div>
      {action}
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 h-9 rounded-lg text-sm border transition-colors ${
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-700 border-gray-200 hover:border-blue-600"
      }`}
    >
      {children}
    </button>
  );
}

function SnowSparkline({ data }) {
  const points = (data?.length ? data : [2,4,3,6,5,8,4,6,3,5,4,3]).map((v, i) => ({ i, v }));
  return (
    <div className="h-10 w-36">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={points} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
          <Area type="monotone" dataKey="v" stroke="#60A5FA" fill="#60A5FA22" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function ResortCard({ r, selected, toggleSelect }) {
  return (
    <Card className="p-0 overflow-hidden relative">
      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-12 md:col-span-4 relative h-40 md:h-full min-h-full">
          <img src={r.image || r.img} alt={r.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-white/90 text-gray-800">
            <MountainSnow className="h-3.5 w-3.5" /> {r.region || r.state || r.country}
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 p-5">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg grid place-items-center bg-blue-600/10 text-blue-700">
              <MountainSnow className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="font-semibold text-gray-900 text-base">{r.name}</div>
                <span className="text-[11px] uppercase tracking-wide text-gray-400">{r.region || r.state}, {r.country || r.state}</span>
                {r.website && (
                  <a href={r.website} target="_blank" className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-white text-gray-700 border border-gray-200">
                    <BadgeCheck className="h-3.5 w-3.5" /> Official
                  </a>
                )}
              </div>
              <div className="mt-2 flex items-center flex-wrap gap-3 text-xs text-gray-600">
                {r.vertical && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200"><Gauge className="h-3.5 w-3.5" /> Vert {r.vertical.toLocaleString()} ft</span>}
                {r.elevation_top && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200"><ThermometerSnowflake className="h-3.5 w-3.5" /> Top {r.elevation_top.toLocaleString()} ft</span>}
                {r.snowfall_avg && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-600/5 text-blue-700"><Snowflake className="h-3.5 w-3.5" /> Avg {r.snowfall_avg}"</span>}
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200"><Navigation className="h-3.5 w-3.5" /> {r.travelHours ?? "—"}h</span>
              </div>
            </div>
            <div className="text-right min-w-[170px]">
              <div className="mt-2 flex items-center justify-end gap-2">
                <Button variant="secondary" className="h-9 px-3" onClick={() => toggleSelect(r.id)}>
                  {selected ? <CheckCircle2 className="h-4 w-4 mr-1" /> : null}
                  {selected ? "Selected" : "Compare"}
                </Button>
                <Button variant="primary" className="h-9 px-3"><MapIcon className="h-4 w-4 mr-1" /> Map</Button>
              </div>
              <div className="mt-2 text-xs text-gray-500">Pass <span className="font-mono font-semibold text-gray-900">{(r.pass_types || r.pass || []).join(', ') || '—'}</span></div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200"><Ticket className="h-3.5 w-3.5" /> Country: {r.country || '—'}</span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200"><Users className="h-3.5 w-3.5" /> Region: {r.region || r.state || '—'}</span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200"><Trees className="h-3.5 w-3.5" /> Terrain: {r.terrainMix?.adv ?? '—'}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[11px] uppercase tracking-wide text-gray-400">Snow trend</div>
              <SnowSparkline />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function ResortFinder() {
  const { settings } = useSettings();
  const [dateRange, setDateRange] = useState({ start: "2025-01-20", end: "2025-02-05" });
  const [party, setParty] = useState(2);
  const [ability, setAbility] = useState("Intermediate");
  const [passType, setPassType] = useState(settings.defaultPass || "Any");
  const [maxHours, setMaxHours] = useState(2.5);
  const [region, setRegion] = useState(settings.defaultRegion || "Any");
  const [budget, setBudget] = useState(220);
  const [powderBias, setPowderBias] = useState(0.7);
  const [crowdTolerance, setCrowdTolerance] = useState(0.5);
  const [selected, setSelected] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const params = {
          q: query || undefined,
          region: region !== 'Any' ? region : undefined,
          pass: passType !== 'Any' ? passType : undefined,
          limit: 50,
        };
        const data = await api.get('/resorts', { params });
        if (mounted) setItems(data);
      } catch (e) {
        setError('Could not load resorts.');
        // optional: try to seed
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false };
  }, [query, region, passType]);

  const filtered = useMemo(() => {
    return (items || [])
      .filter((r) => (region === "Any" ? true : (r.region === region || r.state === region)))
      .filter((r) => (passType === "Any" ? true : (r.pass_types || []).includes(passType)))
      .filter((r) => (budget ? (r.price ? r.price <= budget : true) : true))
      .map((r) => {
        const score = r.snowfall_avg ? Math.min(100, Math.round((r.snowfall_avg / 600) * 100)) : 60;
        const powScore = score * powderBias;
        const crowdScore = (crowdTolerance >= 0.5 ? 100 : 60);
        const abilityFit = ability === "Expert" ? 85 : ability === "Advanced" ? 75 : ability === "Intermediate" ? 65 : 55;
        const fit = Math.round(score * 0.4 + powScore * 0.25 + abilityFit * 0.2 + crowdScore * 0.15);
        return { ...r, fit, id: r.id || r._id };
      })
      .sort((a, b) => b.fit - a.fit);
  }, [items, region, passType, budget, powderBias, crowdTolerance, ability]);

  const toggleSelect = (id) => setSelected((prev) => {
    const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
    setShowCompare(next.length > 0);
    return next;
  });

  const compareItems = filtered.filter(f => selected.includes(f.id));

  return (
    <div className="text-gray-900">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Resort Explorer</h1>
        <p className="text-gray-500 mt-1">Fast global search powered by the API. Lightweight UI to keep things snappy.</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Filters */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card className="p-5">
            <SectionTitle icon={CalendarDays} title="Trip details" action={<div className='text-xs text-gray-400'>Optional</div>} />
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-500 mb-2">Dates</div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" value={dateRange.start} onChange={(e)=>setDateRange((s)=>({ ...s, start: e.target.value }))} className="h-9 px-3 rounded-lg border border-gray-200 text-sm focus:border-blue-600 w-full" />
                  <input type="date" value={dateRange.end} onChange={(e)=>setDateRange((s)=>({ ...s, end: e.target.value }))} className="h-9 px-3 rounded-lg border border-gray-200 text-sm focus:border-blue-600 w-full" />
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-2">Travel time (hours)</div>
                <input type="range" min="0.5" max="6" step="0.5" value={maxHours} onChange={(e)=>setMaxHours(parseFloat(e.target.value))} className="w-full accent-blue-600" />
                <div className="text-xs text-gray-600 mt-1">Up to <span className="font-medium text-gray-800">{maxHours}h</span></div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-2">Party size</div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>setParty(Math.max(1, party-1))} className="h-9 w-9 rounded-lg border border-gray-200">-</button>
                  <div className="px-3 h-9 rounded-lg border border-gray-200 grid place-items-center text-sm w-full">{party} people</div>
                  <button onClick={()=>setParty(party+1)} className="h-9 w-9 rounded-lg border border-gray-200">+</button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <SectionTitle icon={Filter} title="Your profile" />
            <div>
              <div className="text-xs text-gray-500 mb-2">Ability</div>
              <div className="flex flex-wrap gap-2">
                {abilities.map((a)=> (
                  <Chip key={a} active={a===ability} onClick={()=>setAbility(a)}>{a}</Chip>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs text-gray-500 mb-2">Pass</div>
              <div className="flex flex-wrap gap-2">
                {passes.map((p)=> (
                  <Chip key={p} active={p===passType} onClick={()=>setPassType(p)}>{p}</Chip>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs text-gray-500 mb-2">Region</div>
              <div className="flex flex-wrap gap-2">
                {regions.map((r)=> (
                  <Chip key={r} active={r===region} onClick={()=>setRegion(r)}>{r}</Chip>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <SectionTitle icon={Snowflake} title="Preferences" />
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-500 mb-2 flex items-center gap-2"><CloudSnow className="h-4 w-4" /> Powder bias</div>
                <input type="range" min="0" max="1" step="0.05" value={powderBias} onChange={(e)=>setPowderBias(parseFloat(e.target.value))} className="w-full accent-sky-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-2 flex items-center gap-2"><Users className="h-4 w-4" /> Crowd tolerance</div>
                <input type="range" min="0" max="1" step="0.05" value={crowdTolerance} onChange={(e)=>setCrowdTolerance(parseFloat(e.target.value))} className="w-full accent-orange-500" />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-2 flex items-center gap-2"><Ticket className="h-4 w-4" /> Budget per day <span className="font-medium text-gray-700">${""}{budget}</span></div>
                <input type="range" min="80" max="300" step="5" value={budget} onChange={(e)=>setBudget(parseInt(e.target.value))} className="w-full accent-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-semibold tracking-wide mb-2">Search</div>
            <div className="relative">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Try Whistler, Alps, Ikon..." className="w-full h-10 pl-9 pr-3 rounded-lg border border-gray-200 focus:border-blue-600 text-sm" />
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">{loading ? 'Loading…' : `${filtered.length} resorts`} • best fit</div>
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((r) => (
              <motion.div key={r.id || r.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                <ResortCard r={r} selected={selected.includes(r.id)} toggleSelect={toggleSelect} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Compare Drawer */}
      <AnimatePresence>
        {showCompare && (
          <motion.div initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 200, opacity: 0 }} transition={{ type: 'tween', duration: 0.2 }} className="fixed bottom-4 left-0 right-0 px-4">
            <div className="mx-auto max-w-7xl">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold">Quick compare</div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" className="h-9" onClick={() => { setSelected([]); setShowCompare(false); }}>Clear</Button>
                    <Button variant="primary" className="h-9" onClick={() => alert('Full-screen compare coming soon!')}>Open compare</Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {compareItems.map((c) => (
                    <div key={c.id} className="rounded-lg border border-gray-200 overflow-hidden bg-white">
                      <div className="relative h-24">
                        <img src={c.image || c.img} alt="thumb" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute bottom-2 left-2 text-white text-sm font-semibold drop-shadow">{c.name}</div>
                      </div>
                      <div className="p-3 text-sm text-gray-700 grid grid-cols-2 gap-2">
                        <div className="inline-flex items-center gap-1"><Snowflake className="h-4 w-4 text-sky-400"/> {c.snowfall_avg ?? '—'}" avg</div>
                        <div className="inline-flex items-center gap-1"><Gauge className="h-4 w-4 text-blue-600"/> {c.vertical ?? '—'} ft</div>
                        <div className="inline-flex items-center gap-1"><Ticket className="h-4 w-4 text-orange-500"/> {(c.pass_types||[]).join(', ') || '—'}</div>
                        <div className="inline-flex items-center gap-1"><Navigation className="h-4 w-4 text-emerald-500"/> {c.travelHours ?? '—'}h</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
