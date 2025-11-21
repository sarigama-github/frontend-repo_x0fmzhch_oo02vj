import { motion } from "framer-motion";
import Header from "../Dashboard/Header";
import { Card, Button } from "../Dashboard/Primitives";
import { SlidersHorizontal, Filter, Star, Tag, Ruler, Snowflake, Mountain, CheckCircle2, Heart, ShoppingCart, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

const skills = ["Beginner", "Intermediate", "Advanced", "Expert"];
const terrains = ["Groomers", "All-Mountain", "Powder", "Park", "Backcountry"];

const inventory = [
  {
    id: "qst-98",
    title: "Salomon QST 98",
    type: "Skis",
    length: 177,
    flex: "Medium",
    terrain: ["All-Mountain", "Powder"],
    skill: ["Intermediate", "Advanced"],
    rating: 4.7,
    price: 549,
    badge: "Editor’s Pick",
    color: "#1E3A8A",
  },
  {
    id: "enforcer-94",
    title: "Nordica Enforcer 94",
    type: "Skis",
    length: 179,
    flex: "Stiff",
    terrain: ["All-Mountain"],
    skill: ["Advanced", "Expert"],
    rating: 4.8,
    price: 599,
    badge: "Most Versatile",
    color: "#FF6B35",
  },
  {
    id: "hawx-110",
    title: "Atomic Hawx Prime 110",
    type: "Boots",
    last: 100,
    flex: 110,
    terrain: ["All-Mountain"],
    skill: ["Intermediate", "Advanced"],
    rating: 4.6,
    price: 399,
    badge: "Best Value",
    color: "#60A5FA",
  },
  {
    id: "griffon-13",
    title: "Marker Griffon 13 ID",
    type: "Bindings",
    din: "4-13",
    terrain: ["All-Mountain", "Park"],
    skill: ["Intermediate", "Advanced", "Expert"],
    rating: 4.5,
    price: 229,
    badge: "Shop Favorite",
    color: "#1E3A8A",
  },
];

function Rating({ value }) {
  const s = Math.round(value);
  return (
    <div className="flex items-center gap-1 text-[#1E3A8A]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < s ? "fill-[#1E3A8A]" : "text-gray-300"}`} />
      ))}
      <span className="text-xs text-gray-500 ml-1">{value.toFixed(1)}</span>
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 h-9 rounded-xl text-sm border transition-colors ${
        active ? "bg-[#1E3A8A] text-white border-[#1E3A8A]" : "bg-white text-gray-700 border-gray-200 hover:border-[#1E3A8A]"
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
        <div className="h-12 w-12 rounded-xl grid place-items-center" style={{ background: `${item.color}15`, color: item.color }}>
          {item.type === "Skis" && <Mountain className="h-6 w-6" />}
          {item.type === "Boots" && <Ruler className="h-6 w-6" />}
          {item.type === "Bindings" && <Tag className="h-6 w-6" />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-gray-900">{item.title}</div>
            <span className="text-[11px] uppercase tracking-wide text-gray-400">{item.type}</span>
            {item.badge && (
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#F3F4F6] text-gray-700">
                <Sparkles className="h-3.5 w-3.5" /> {item.badge}
              </span>
            )}
          </div>
          <div className="mt-1"><Rating value={item.rating} /></div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-600">
            {item.length && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200"><Ruler className="h-3.5 w-3.5" /> {item.length} cm</span>
            )}
            {item.flex && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200">Flex {item.flex}</span>
            )}
            {item.last && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200">Last {item.last} mm</span>
            )}
            {item.din && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200">DIN {item.din}</span>
            )}
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#1E3A8A]/5 text-[#1E3A8A]">
              <Snowflake className="h-3.5 w-3.5" /> {item.terrain.join(", ")}
            </span>
          </div>
        </div>
        <div className="text-right min-w-[120px]">
          <div className="font-mono font-semibold text-gray-900">${""}{item.price}</div>
          <div className="mt-2 flex items-center gap-2 justify-end">
            <Button variant="secondary" className="h-9 px-3" onClick={() => toggleSelect(item.id)}>
              {selected ? <CheckCircle2 className="h-4 w-4 mr-1" /> : null}
              {selected ? "Selected" : "Compare"}
            </Button>
            <Button variant="primary" className="h-9 px-3"><ShoppingCart className="h-4 w-4 mr-1" /> Buy</Button>
          </div>
          <button className={`mt-2 text-xs inline-flex items-center gap-1 ${selected ? "text-[#FF6B35]" : "text-gray-500"}`} onClick={() => toggleSelect(item.id)}>
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

  const filtered = useMemo(() => {
    return inventory.filter((i) => {
      const skillMatch = i.skill ? i.skill.includes(skill) : true;
      const terrMatch = terrainSel.length ? terrainSel.some(t => i.terrain?.includes(t)) : true;
      const lenMatch = i.length ? i.length >= length - 8 && i.length <= length + 8 : true;
      const priceMatch = i.price <= budget;
      return skillMatch && terrMatch && lenMatch && priceMatch;
    });
  }, [skill, terrainSel, length, budget]);

  const toggleSelect = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-gray-900">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Equipment Finder</h1>
          <p className="text-gray-500 mt-1">Personalized skis, boots, and bindings matched to your profile.</p>
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
                <input type="range" min="155" max="190" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-[#1E3A8A]" />
              </div>
              <div className="mt-4">
                <div className="text-xs text-gray-500 mb-2 flex items-center gap-2"><Tag className="h-4 w-4" /> Budget: <span className="font-medium text-gray-700">${""}{budget}</span></div>
                <input type="range" min="200" max="900" step="10" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full accent-[#FF6B35]" />
              </div>
            </Card>

            <Card className="p-5">
              <div className="text-sm font-semibold tracking-wide mb-2">Why these picks?</div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-[#1E3A8A] mt-0.5" /> Tuned for all-mountain confidence with stable mid-stiff flex.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-[#1E3A8A] mt-0.5" /> Length window matched to your height and speed preference.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-[#1E3A8A] mt-0.5" /> Value-filter applied to surface the best price-to-performance.</li>
              </ul>
            </Card>
          </div>

          {/* Results */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">{filtered.length} matches • updated just now</div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Sort</span>
                <select className="h-9 px-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#1E3A8A]">
                  <option>Best match</option>
                  <option>Price (low to high)</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {filtered.map((item) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <ResultCard item={item} selected={selected.includes(item.id)} toggleSelect={toggleSelect} />
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
                  <a href="#/compare" className="inline-flex"><Button variant="primary" className="h-10">Compare now</Button></a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
