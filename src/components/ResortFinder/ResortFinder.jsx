import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Header from "../Dashboard/Header";
import { Card, Button } from "../Dashboard/Primitives";
import {
  MapPinned,
  CalendarDays,
  Users,
  MountainSnow,
  Snowflake,
  CloudSnow,
  Wind,
  Sun,
  Gauge,
  Navigation,
  Clock4,
  Ticket,
  Stars,
  Map as MapIcon,
  Trees,
  ThermometerSnowflake,
  BadgeCheck,
  Star,
  ThumbsUp,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const passes = ["Any", "Ikon", "Epic", "Indy", "Mountain Collective", "None"];
const regions = ["Any", "Rockies", "Sierra", "PNW", "Utah", "Colorado", "Wyoming", "New England", "Quebec"];
const abilities = ["Beginner", "Intermediate", "Advanced", "Expert"];

const resorts = [
  {
    id: "alta-ut",
    name: "Alta",
    region: "Utah",
    state: "UT",
    elevationTop: 10550,
    elevationBase: 8530,
    vertical: 2020,
    snowfallAvg: 540,
    recentStorm: 10,
    openLifts: 6,
    terrainMix: { beg: 25, int: 40, adv: 35 },
    crowd: "Moderate",
    pass: ["Ikon", "Mountain Collective"],
    price: 169,
    travelHours: 0.8,
    score: 94,
    quality: "Legendary powder, ski-only, steep shots",
    snowHistory: [8, 12, 4, 6, 14, 22, 10, 18, 6, 12, 8, 4],
    badge: "Powder Capital",
  },
  {
    id: "jackson-wy",
    name: "Jackson Hole",
    region: "Wyoming",
    state: "WY",
    elevationTop: 10450,
    elevationBase: 6311,
    vertical: 4139,
    snowfallAvg: 459,
    recentStorm: 6,
    openLifts: 12,
    terrainMix: { beg: 10, int: 40, adv: 50 },
    crowd: "High",
    pass: ["Ikon", "Mountain Collective"],
    price: 245,
    travelHours: 1.2,
    score: 92,
    quality: "Big vert, expert terrain, iconic tram",
    snowHistory: [4, 6, 3, 5, 10, 16, 12, 8, 5, 6, 4, 3],
    badge: "Expert Favorite",
  },
  {
    id: "bigsky-mt",
    name: "Big Sky",
    region: "Montana",
    state: "MT",
    elevationTop: 11166,
    elevationBase: 6800,
    vertical: 4350,
    snowfallAvg: 400,
    recentStorm: 3,
    openLifts: 20,
    terrainMix: { beg: 15, int: 45, adv: 40 },
    crowd: "Low",
    pass: ["Ikon"],
    price: 229,
    travelHours: 1.1,
    score: 89,
    quality: "Expansive terrain, Lone Peak steeps",
    snowHistory: [2, 8, 4, 9, 10, 14, 7, 5, 3, 8, 6, 4],
    badge: "Most Terrain",
  },
  {
    id: "palisades-ca",
    name: "Palisades Tahoe",
    region: "Sierra",
    state: "CA",
    elevationTop: 9050,
    elevationBase: 6200,
    vertical: 2850,
    snowfallAvg: 400,
    recentStorm: 0,
    openLifts: 14,
    terrainMix: { beg: 25, int: 45, adv: 30 },
    crowd: "High",
    pass: ["Ikon"],
    price: 229,
    travelHours: 1.9,
    score: 86,
    quality: "Lake views, strong parks, spring laps",
    snowHistory: [0, 2, 1, 3, 5, 12, 10, 8, 2, 4, 1, 0],
    badge: "Spring King",
  },
];

function SectionTitle({ icon: Icon, title, action }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        {Icon ? <Icon className="h-5 w-5 text-[#1E3A8A]" /> : null}
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
      className={`px-3 h-9 rounded-xl text-sm border transition-colors ${
        active
          ? "bg-[#1E3A8A] text-white border-[#1E3A8A]"
          : "bg-white text-gray-700 border-gray-200 hover:border-[#1E3A8A]"
      }`}
    >
      {children}
    </button>
  );
}

function SnowSparkline({ data }) {
  const points = data.map((v, i) => ({ i, v }));
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
    <Card className="p-5">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl grid place-items-center bg-[#1E3A8A]/10 text-[#1E3A8A]">
          <MountainSnow className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="font-semibold text-gray-900 text-base">{r.name}</div>
            <span className="text-[11px] uppercase tracking-wide text-gray-400">{r.region}, {r.state}</span>
            {r.badge && (
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#F3F4F6] text-gray-700">
                <BadgeCheck className="h-3.5 w-3.5" /> {r.badge}
              </span>
            )}
          </div>
          <div className="mt-2 flex items-center flex-wrap gap-3 text-xs text-gray-600">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200"><Gauge className="h-3.5 w-3.5" /> Vert {r.vertical.toLocaleString()} ft</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200"><ThermometerSnowflake className="h-3.5 w-3.5" /> Top {r.elevationTop.toLocaleString()} ft</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#1E3A8A]/5 text-[#1E3A8A]"><Snowflake className="h-3.5 w-3.5" /> Avg {r.snowfallAvg}"</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#FF6B35]/5 text-[#FF6B35]"><CloudSnow className="h-3.5 w-3.5" /> 24h {r.recentStorm}"</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200"><Navigation className="h-3.5 w-3.5" /> {r.travelHours}h</span>
          </div>
        </div>
        <div className="text-right min-w-[170px]">
          <div className="flex items-center justify-end gap-2">
            <div className="font-mono text-sm text-gray-500">Score</div>
            <div className="text-lg font-bold text-[#1E3A8A]">{r.score}</div>
          </div>
          <div className="mt-2 flex items-center justify-end gap-2">
            <Button variant="secondary" className="h-9 px-3" onClick={() => toggleSelect(r.id)}>
              {selected ? <CheckCircle2 className="h-4 w-4 mr-1" /> : null}
              {selected ? "Selected" : "Compare"}
            </Button>
            <Button variant="primary" className="h-9 px-3"><MapIcon className="h-4 w-4 mr-1" /> View map</Button>
          </div>
          <div className="mt-2 text-xs text-gray-500">Day ticket <span className="font-mono font-semibold text-gray-900">${r.price}</span></div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200"><Ticket className="h-3.5 w-3.5" /> Pass: {r.pass.join(", ")}</span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200"><Users className="h-3.5 w-3.5" /> {r.crowd} crowds</span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200"><Trees className="h-3.5 w-3.5" /> Glades {r.terrainMix.adv}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[11px] uppercase tracking-wide text-gray-400">12-day snow trend</div>
          <SnowSparkline data={r.snowHistory} />
        </div>
      </div>
    </Card>
  );
}

export default function ResortFinder() {
  const [dateRange, setDateRange] = useState({ start: "2025-01-20", end: "2025-02-05" });
  const [party, setParty] = useState(2);
  const [ability, setAbility] = useState("Intermediate");
  const [passType, setPassType] = useState("Any");
  const [maxHours, setMaxHours] = useState(2.5);
  const [region, setRegion] = useState("Any");
  const [budget, setBudget] = useState(220);
  const [powderBias, setPowderBias] = useState(0.7); // 0..1
  const [crowdTolerance, setCrowdTolerance] = useState(0.5);
  const [selected, setSelected] = useState([]);

  const filtered = useMemo(() => {
    return resorts
      .filter((r) => (region === "Any" ? true : r.region === region || r.state === region))
      .filter((r) => (passType === "Any" ? true : r.pass.includes(passType)))
      .filter((r) => r.travelHours <= maxHours)
      .filter((r) => r.price <= budget)
      .map((r) => {
        const powScore = (r.snowfallAvg / 600) * 100 * powderBias;
        const crowdScore = (crowdTolerance >= 0.5 ? 100 : 60) - (r.crowd === "High" ? 20 : r.crowd === "Moderate" ? 10 : 0);
        const abilityFit = ability === "Expert" ? r.terrainMix.adv : ability === "Advanced" ? (r.terrainMix.adv + r.terrainMix.int * 0.5) : ability === "Intermediate" ? r.terrainMix.int : r.terrainMix.beg;
        const fit = Math.round(r.score * 0.4 + powScore * 0.25 + abilityFit * 0.2 + crowdScore * 0.15);
        return { ...r, fit };
      })
      .sort((a, b) => b.fit - a.fit);
  }, [region, passType, maxHours, budget, powderBias, crowdTolerance, ability]);

  const toggleSelect = (id) => setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-gray-900">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Resort Finder</h1>
          <p className="text-gray-500 mt-1">Flagship: personalized resort recommendations by snow, travel time, and pass.</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Filters */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card className="p-5">
              <SectionTitle icon={CalendarDays} title="Trip details" action={<Clock4 className="h-5 w-5 text-gray-400" />} />
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-500 mb-2">Dates</div>
                  <div className="flex items-center gap-2">
                    <input type="date" value={dateRange.start} onChange={(e)=>setDateRange((s)=>({ ...s, start: e.target.value }))} className="h-9 px-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#1E3A8A] w-full" />
                    <span className="text-gray-400">–</span>
                    <input type="date" value={dateRange.end} onChange={(e)=>setDateRange((s)=>({ ...s, end: e.target.value }))} className="h-9 px-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#1E3A8A] w-full" />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-2">Travel time (hours)</div>
                  <input type="range" min="0.5" max="6" step="0.5" value={maxHours} onChange={(e)=>setMaxHours(parseFloat(e.target.value))} className="w-full accent-[#1E3A8A]" />
                  <div className="text-xs text-gray-600 mt-1">Up to <span className="font-medium text-gray-800">{maxHours}h</span> from your home base</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-2">Party size</div>
                  <div className="flex items-center gap-2">
                    <button onClick={()=>setParty(Math.max(1, party-1))} className="h-9 w-9 rounded-xl border-2 border-gray-200">-</button>
                    <div className="px-3 h-9 rounded-xl border-2 border-gray-200 grid place-items-center text-sm w-full">{party} people</div>
                    <button onClick={()=>setParty(party+1)} className="h-9 w-9 rounded-xl border-2 border-gray-200">+</button>
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
                  <input type="range" min="0" max="1" step="0.05" value={powderBias} onChange={(e)=>setPowderBias(parseFloat(e.target.value))} className="w-full accent-[#60A5FA]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-2 flex items-center gap-2"><Users className="h-4 w-4" /> Crowd tolerance</div>
                  <input type="range" min="0" max="1" step="0.05" value={crowdTolerance} onChange={(e)=>setCrowdTolerance(parseFloat(e.target.value))} className="w-full accent-[#FF6B35]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-2 flex items-center gap-2"><Ticket className="h-4 w-4" /> Budget per day <span className="font-medium text-gray-700">${""}{budget}</span></div>
                  <input type="range" min="80" max="300" step="5" value={budget} onChange={(e)=>setBudget(parseInt(e.target.value))} className="w-full accent-[#1E3A8A]" />
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="text-sm font-semibold tracking-wide mb-2">Why these picks?</div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-[#1E3A8A] mt-0.5" /> Snow reliability weighted by your powder bias and dates.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-[#1E3A8A] mt-0.5" /> Travel-time constraint applied from your home base.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-[#1E3A8A] mt-0.5" /> Pass compatibility and cost-per-day optimized.</li>
              </ul>
            </Card>
          </div>

          {/* Results */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">{filtered.length} resorts • best fit for your trip window</div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Sort</span>
                <select className="h-9 px-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#1E3A8A]">
                  <option>Best fit</option>
                  <option>Travel time</option>
                  <option>Snowfall</option>
                  <option>Ticket price</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {filtered.map((r) => (
                <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <ResortCard r={r} selected={selected.includes(r.id)} toggleSelect={toggleSelect} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {selected.length > 0 && (
        <div className="fixed bottom-4 left-0 right-0 px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">{selected.length}</span> selected for comparison
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="h-10" onClick={() => setSelected([])}>Clear</Button>
                  <a href="#/compare" className="inline-flex"><Button variant="primary" className="h-10">Compare resorts</Button></a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
