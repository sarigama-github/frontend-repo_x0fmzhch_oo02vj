import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Button } from "../Dashboard/Primitives";
import { SlidersHorizontal, Filter, Star, Tag, Ruler, Snowflake, Mountain, CheckCircle2, Heart, ShoppingCart, Sparkles, Search, Boxes } from "lucide-react";
import { api } from "../../lib/api";

const skills = ["Beginner", "Intermediate", "Advanced", "Expert"];
const terrains = ["Groomers", "All-Mountain", "Powder", "Park", "Backcountry"];

function Rating({ value = 4.5 }) {
  const s = Math.round(value);
  return (
    <div className="flex items-center gap-1 text-blue-600">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < s ? "fill-blue-600" : "text-gray-300"}`} />
      ))}
      <span className="text-xs text-gray-500 ml-1">{value.toFixed(1)}</span>
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 h-9 rounded-lg text-sm border transition-colors ${
        active ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200 hover:border-blue-600"
      }`}
    >
      {children}
    </button>
  );
}

function ResultCard({ item, selected, toggleSelect }) {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-lg grid place-items-center bg-blue-600/10 text-blue-700">
          {item.category?.toLowerCase().includes("ski") && <Mountain className="h-6 w-6" />}
          {item.category?.toLowerCase().includes("boot") && <Ruler className="h-6 w-6" />}
          {item.category?.toLowerCase().includes("binding") && <Tag className="h-6 w-6" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-gray-900 truncate">{item.title}</div>
            {item.category && (<span className="text-[11px] uppercase tracking-wide text-gray-400">{item.category}</span>)}
            {item.brand && (
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200">
                <Sparkles className="h-3.5 w-3.5" /> {item.brand}
              </span>
            )}
          </div>
          <div className="mt-1"><Rating value={item.rating ?? 4.5} /></div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-600">
            {item.specs?.length && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200">{item.specs.length} cm</span>
            )}
            {item.specs?.flex && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200">Flex {item.specs.flex}</span>
            )}
            {item.specs?.last && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200">Last {item.specs.last} mm</span>
            )}
            {item.specs?.din && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200">DIN {item.specs.din}</span>
            )}
            {!!item.terrain?.length && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-600/5 text-blue-700">
                <Snowflake className="h-3.5 w-3.5" /> {item.terrain.join(", ")}
              </span>
            )}
          </div>
        </div>
        <div className="text-right min-w-[120px]">
          {item.price != null && <div className="font-mono font-semibold text-gray-900">${""}{item.price}</div>}
          <div className="mt-2 flex items-center gap-2 justify-end">
            <Button variant="secondary" className="h-9 px-3" onClick={() => toggleSelect(item.id)}>
              {selected ? <CheckCircle2 className="h-4 w-4 mr-1" /> : null}
              {selected ? "Selected" : "Compare"}
            </Button>
            <Button variant="primary" className="h-9 px-3"><ShoppingCart className="h-4 w-4 mr-1" /> Buy</Button>
          </div>
          <button className={`mt-2 text-xs inline-flex items-center gap-1 ${selected ? "text-blue-600" : "text-gray-500"}`} onClick={() => toggleSelect(item.id)}>
            <Heart className="h-4 w-4" /> {selected ? "Saved" : "Save for later"}
          </button>
        </div>
      </div>
    </Card>
  );
}

export default function EquipmentFinder() {
  const [skill, setSkill] = useState("Intermediate");
  const [terrainSel, setTerrainSel] = useState(["All-Mountain"]);
  const [length, setLength] = useState(175);
  const [budget, setBudget] = useState(650);
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Any");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const params = {
          q: query || undefined,
          category: category !== 'Any' ? category : undefined,
          terrain: terrainSel.length === 1 ? terrainSel[0] : undefined,
          skill: skill !== 'Any' ? skill : undefined,
          limit: 50,
        };
        const data = await api.get('/equipment', { params });
        if (mounted) setItems(data);
      } catch (e) {
        setError('Could not load equipment.');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false };
  }, [query, category, terrainSel, skill]);

  const filtered = useMemo(() => {
    return (items || []).filter((i) => {
      const priceMatch = i.price == null ? true : i.price <= budget;
      const lenMatch = i.specs?.length ? (i.specs.length >= length - 8 && i.specs.length <= length + 8) : true;
      return priceMatch && lenMatch;
    });
  }, [items, budget, length]);

  const toggleSelect = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="text-gray-900">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Global Gear</h1>
        <p className="text-gray-500 mt-1">Search worldwide inventory via the API. Fast and tidy UI.</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Filters */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold tracking-wide">Your Profile</div>
              <SlidersHorizontal className="h-5 w-5 text-gray-400" />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-2">Skill level</div>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <Chip key={s} active={s === skill} onClick={() => setSkill(s)}>{s}</Chip>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs text-gray-500 mb-2">Preferred terrain</div>
              <div className="flex flex-wrap gap-2">
                {terrains.map((t) => (
                  <Chip key={t} active={terrainSel.includes(t)} onClick={() => setTerrainSel((prev) => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}>{t}</Chip>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold tracking-wide">Fit & Range</div>
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-2">
              <div className="text-xs text-gray-500 mb-2 flex items-center gap-2"><Ruler className="h-4 w-4" /> Target ski length: <span className="font-medium text-gray-700">{length} cm</span></div>
              <input type="range" min="155" max="190" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
            <div className="mt-4">
              <div className="text-xs text-gray-500 mb-2 flex items-center gap-2"><Tag className="h-4 w-4" /> Budget: <span className="font-medium text-gray-700">${""}{budget}</span></div>
              <input type="range" min="200" max="900" step="10" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-semibold tracking-wide mb-2">Search</div>
            <div className="relative">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Try Enforcer, Salomon, Boots..." className="w-full h-10 pl-9 pr-3 rounded-lg border border-gray-200 focus:border-blue-600 text-sm" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {['Any','Skis','Boots','Bindings'].map(c => (
                <button key={c} onClick={()=>setCategory(c)} className={`h-9 rounded-lg border text-sm ${category===c?'border-blue-600 text-blue-600':'border-gray-200 text-gray-700'}`}>{c}</button>
              ))}
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">{loading ? 'Loading…' : `${filtered.length} matches`} • updated</div>
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((item) => (
              <motion.div key={item.id || item.title} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                <ResultCard item={item} selected={selected.includes(item.id)} toggleSelect={toggleSelect} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {selected.length > 0 && (
        <div className="fixed bottom-4 left-0 right-0 px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">{selected.length}</span> selected for comparison
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="h-9" onClick={() => setSelected([])}>Clear</Button>
                  <Button variant="primary" className="h-9">Compare now</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
