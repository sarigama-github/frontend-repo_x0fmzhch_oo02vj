import { useMemo, useState } from "react";
import { Card, Button, SectionTitle } from "../Dashboard/Primitives";
import { Calculator, DollarSign, TrendingUp, Snowflake, Info, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts";

const currency = (n) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

function LabeledInput({ label, suffix, value, onChange, min = 0, step = 1 }) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          min={min}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-11 rounded-xl border border-gray-200 bg-white px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
        />
        {suffix && <div className="text-sm text-gray-500 w-10 text-right pr-1">{suffix}</div>}
      </div>
    </div>
  );
}

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    daysPerSeason: 12,
    seasons: 5,
    gearCost: 1600,
    resalePct: 0.35,
    maintPerSeason: 120,
    rentalPerDay: 55,
    passCost: 850,
    travelPerDay: 40,
    lessonsPerSeason: 0,
    discountPct: 0.08, // opportunity cost/discount rate
  });

  const [sensitivity, setSensitivity] = useState(0);

  const adjDays = useMemo(() => Math.max(0, Math.round(inputs.daysPerSeason * (1 + sensitivity / 100))), [inputs.daysPerSeason, sensitivity]);

  const model = useMemo(() => {
    const seasons = Math.max(1, inputs.seasons);
    const dRate = inputs.discountPct;

    // Ownership: upfront gear, minus resale at end, plus maintenance each season, plus pass, plus travel per day * days
    // Rentals: rental per day * days + pass + travel per day * days
    const series = [];
    let ownershipCum = inputs.gearCost; // upfront
    let rentalCum = 0;

    for (let year = 1; year <= seasons; year++) {
      const days = adjDays; // constant sensitivity-adjusted days per season
      const maint = inputs.maintPerSeason;
      const pass = inputs.passCost;
      const travel = inputs.travelPerDay * days;
      const rental = inputs.rentalPerDay * days;

      // Discount factor
      const df = 1 / Math.pow(1 + dRate, year - 1);

      ownershipCum += (maint + pass + travel) * df;
      rentalCum += (rental + pass + travel) * df;

      // End of final year, account for resale value discounted to present
      let resaleAdj = 0;
      if (year === seasons) {
        resaleAdj = -inputs.gearCost * inputs.resalePct * (1 / Math.pow(1 + dRate, year));
      }

      const ownershipNPV = ownershipCum + resaleAdj;

      series.push({
        year,
        ownership: Math.max(0, ownershipNPV),
        rental: Math.max(0, rentalCum),
      });
    }

    // Find breakeven year
    let breakEvenYear = null;
    for (const p of series) {
      if (p.ownership <= p.rental) {
        breakEvenYear = p.year;
        break;
      }
    }

    return { series, breakEvenYear };
  }, [inputs, adjDays]);

  const final = model.series.at(-1) || { ownership: 0, rental: 0 };
  const recommendation = (() => {
    if (model.breakEvenYear === 1 || final.ownership < final.rental * 0.95) return {
      tone: "Buy",
      color: "bg-[#FF6B35]/10 text-[#FF6B35]",
      detail: `Ownership wins over ${inputs.seasons} seasons at ${adjDays} days/season.`,
    };
    if (!model.breakEvenYear) return {
      tone: "Rent",
      color: "bg-[#1E3A8A]/10 text-[#1E3A8A]",
      detail: `Renting stays cheaper given your days and costs.`,
    };
    return {
      tone: "Balanced",
      color: "bg-[#60A5FA]/10 text-[#1E3A8A]",
      detail: `You break even around year ${model.breakEvenYear}. Either path works.`,
    };
  })();

  const reset = () => setInputs({
    daysPerSeason: 12,
    seasons: 5,
    gearCost: 1600,
    resalePct: 0.35,
    maintPerSeason: 120,
    rentalPerDay: 55,
    passCost: 850,
    travelPerDay: 40,
    lessonsPerSeason: 0,
    discountPct: 0.08,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-[#1E3A8A] grid place-items-center text-white">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">ROI Calculator</div>
              <div className="text-sm text-gray-500">Buy vs rent with your actual ski days. Peak Performance. Precision Decisions.</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={reset} className="h-10"><RefreshCw className="h-4 w-4 mr-2"/>Reset</Button>
            <Button><TrendingUp className="h-4 w-4 mr-2"/>Get Recommendation</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-5 lg:col-span-1">
            <SectionTitle title="Your Inputs" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <LabeledInput label="Days per season" value={inputs.daysPerSeason} onChange={(v)=>setInputs(i=>({...i, daysPerSeason: v}))} />
              <LabeledInput label="Seasons to model" value={inputs.seasons} onChange={(v)=>setInputs(i=>({...i, seasons: v}))} />
              <LabeledInput label="Gear upfront cost" value={inputs.gearCost} onChange={(v)=>setInputs(i=>({...i, gearCost: v}))} prefix="$" />
              <LabeledInput label="Expected resale value" value={Math.round(inputs.resalePct*100)} onChange={(v)=>setInputs(i=>({...i, resalePct: v/100}))} suffix="%" />
              <LabeledInput label="Maintenance per season" value={inputs.maintPerSeason} onChange={(v)=>setInputs(i=>({...i, maintPerSeason: v}))} />
              <LabeledInput label="Rental per day" value={inputs.rentalPerDay} onChange={(v)=>setInputs(i=>({...i, rentalPerDay: v}))} />
              <LabeledInput label="Pass cost per season" value={inputs.passCost} onChange={(v)=>setInputs(i=>({...i, passCost: v}))} />
              <LabeledInput label="Travel spend per day" value={inputs.travelPerDay} onChange={(v)=>setInputs(i=>({...i, travelPerDay: v}))} />
              <LabeledInput label="Lessons per season (optional)" value={inputs.lessonsPerSeason} onChange={(v)=>setInputs(i=>({...i, lessonsPerSeason: v}))} />
              <LabeledInput label="Discount rate" value={Math.round(inputs.discountPct*100)} onChange={(v)=>setInputs(i=>({...i, discountPct: v/100}))} suffix="%" />
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="text-gray-700">Days sensitivity</div>
                <div className="text-[#1E3A8A] font-medium">{sensitivity}% → {adjDays} days/season</div>
              </div>
              <input type="range" min={-50} max={50} step={1} value={sensitivity} onChange={(e)=>setSensitivity(Number(e.target.value))} className="w-full" />
              <div className="text-xs text-gray-500 mt-1">Test best/worst case seasons.</div>
            </div>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card className="p-5">
              <SectionTitle title="Cumulative Cost (NPV)" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-4 rounded-xl bg-[#FF6B35]/10">
                  <div className="text-xs text-gray-600">Ownership NPV</div>
                  <div className="text-2xl font-bold text-[#FF6B35]">{currency(Math.round(final.ownership))}</div>
                </div>
                <div className="p-4 rounded-xl bg-[#1E3A8A]/10">
                  <div className="text-xs text-gray-600">Renting NPV</div>
                  <div className="text-2xl font-bold text-[#1E3A8A]">{currency(Math.round(final.rental))}</div>
                </div>
                <div className="p-4 rounded-xl bg-[#60A5FA]/10">
                  <div className="text-xs text-gray-600">Difference</div>
                  <div className="text-2xl font-bold text-[#1E3A8A]">{currency(Math.round(Math.abs(final.ownership - final.rental)))}</div>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={model.series} margin={{ left: 10, right: 10, top: 10, bottom: 0 }}>
                    <XAxis dataKey="year" tick={{ fill: "#6b7280", fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
                    <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} tickFormatter={(v)=>`$${(v/1000).toFixed(0)}k`} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
                    <Tooltip formatter={(v)=>currency(Math.round(v))} labelFormatter={(l)=>`Year ${l}`} contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }} />
                    {model.breakEvenYear && (
                      <ReferenceLine x={model.breakEvenYear} stroke="#60A5FA" strokeDasharray="4 4" label={{ value: `Break-even Y${model.breakEvenYear}`, fill: "#1E3A8A", position: "insideTopRight", fontSize: 12 }} />
                    )}
                    <Line type="monotone" dataKey="ownership" stroke="#FF6B35" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="rental" stroke="#1E3A8A" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-5">
                <SectionTitle title="Recommendation" />
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${recommendation.color}`}>
                  <Snowflake className="h-4 w-4" />
                  <div className="text-sm font-semibold">{recommendation.tone}</div>
                </div>
                <div className="text-sm text-gray-600 mt-3">{recommendation.detail}</div>
                <div className="text-xs text-gray-500 mt-2 flex items-start gap-2"><Info className="h-4 w-4 mt-0.5"/>We factor in a discount rate to reflect the time value of money and include resale at the end of the horizon.</div>
                <Button className="mt-4 w-full">Lock It In</Button>
              </Card>

              <Card className="p-5">
                <SectionTitle title="Break-even" />
                <div className="text-sm text-gray-600">Where ownership cost dips below rentals.</div>
                <div className="mt-3">
                  <div className="text-3xl font-bold text-gray-900">{model.breakEvenYear ? `Year ${model.breakEvenYear}` : "No break-even"}</div>
                  <div className="text-xs text-gray-500 mt-1">At {adjDays} days/season.</div>
                </div>
              </Card>

              <Card className="p-5">
                <SectionTitle title="Key Drivers" />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between"><span className="text-gray-600">Days per season</span><span className="font-medium text-gray-900">{adjDays}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">Rental per day</span><span className="font-medium text-gray-900">{currency(inputs.rentalPerDay)}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">Gear upfront</span><span className="font-medium text-gray-900">{currency(inputs.gearCost)}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">Resale at end</span><span className="font-medium text-gray-900">{Math.round(inputs.resalePct*100)}%</span></div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sticky bottom-4">
          <Card className="p-4 border border-gray-200 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#1E3A8A]/10 grid place-items-center text-[#1E3A8A]"><DollarSign className="h-5 w-5"/></div>
                <div>
                  <div className="text-sm text-gray-900 font-semibold">Ownership vs Rental (NPV over {inputs.seasons} yrs)</div>
                  <div className="text-xs text-gray-500">{currency(Math.round(final.ownership))} vs {currency(Math.round(final.rental))}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto">Share</Button>
                <Button className="w-full sm:w-auto">Save Scenario</Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
