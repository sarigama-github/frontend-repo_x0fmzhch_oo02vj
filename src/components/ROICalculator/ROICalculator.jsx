import { useMemo, useState } from "react";
import { Card, Button, SectionTitle } from "../Dashboard/Primitives";
import { Calculator, DollarSign, TrendingUp, Info, RefreshCw, Percent, PiggyBank, Calendar, Plane, Wrench, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, ReferenceLine, BarChart, Bar } from "recharts";

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
          className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
    discountPct: 0.08,
  });

  const [sensitivity, setSensitivity] = useState(0);
  const adjDays = useMemo(() => Math.max(0, Math.round(inputs.daysPerSeason * (1 + sensitivity / 100))), [inputs.daysPerSeason, sensitivity]);

  const model = useMemo(() => {
    const seasons = Math.max(1, inputs.seasons);
    const dRate = inputs.discountPct;

    const series = [];
    let ownershipCum = inputs.gearCost; // upfront
    let rentalCum = 0;

    for (let year = 1; year <= seasons; year++) {
      const days = adjDays;
      const maint = inputs.maintPerSeason;
      const pass = inputs.passCost;
      const travel = inputs.travelPerDay * days;
      const rental = inputs.rentalPerDay * days;

      const df = 1 / Math.pow(1 + dRate, year - 1);

      ownershipCum += (maint + pass + travel) * df;
      rentalCum += (rental + pass + travel) * df;

      let resaleAdj = 0;
      if (year === seasons) {
        resaleAdj = -inputs.gearCost * inputs.resalePct * (1 / Math.pow(1 + dRate, year));
      }

      const ownershipNPV = ownershipCum + resaleAdj;

      series.push({
        year,
        ownership: Math.max(0, ownershipNPV),
        rental: Math.max(0, rentalCum),
        annualOwnership: (maint + pass + travel) * df,
        annualRental: (rental + pass + travel) * df,
      });
    }

    let breakEvenYear = null;
    for (const p of series) {
      if (p.ownership <= p.rental) { breakEvenYear = p.year; break; }
    }

    return { series, breakEvenYear };
  }, [inputs, adjDays]);

  const final = model.series.at(-1) || { ownership: 0, rental: 0 };
  const recommendation = (() => {
    if (model.breakEvenYear === 1 || final.ownership < final.rental * 0.95) return {
      tone: "Buy",
      color: "bg-blue-600/10 text-blue-700",
      detail: `Ownership wins over ${inputs.seasons} seasons at ${adjDays} days/season.`,
    };
    if (!model.breakEvenYear) return {
      tone: "Rent",
      color: "bg-emerald-600/10 text-emerald-700",
      detail: `Renting stays cheaper given your days and costs.`,
    };
    return {
      tone: "Balanced",
      color: "bg-sky-500/10 text-sky-700",
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

  const totalOwnershipAnnual = model.series.map((p, i) => ({ year: p.year, value: p.annualOwnership }));
  const totalRentalAnnual = model.series.map((p, i) => ({ year: p.year, value: p.annualRental }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-600 grid place-items-center text-white">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">ROI Planner</div>
            <div className="text-sm text-gray-500">Buy vs rent, simplified with clear annual breakdowns.</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={reset} className="h-9"><RefreshCw className="h-4 w-4 mr-2"/>Reset</Button>
          <Button><TrendingUp className="h-4 w-4 mr-2"/>Get Recommendation</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 lg:col-span-1">
          <SectionTitle title="Your Inputs" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <LabeledInput label="Days per season" value={inputs.daysPerSeason} onChange={(v)=>setInputs(i=>({...i, daysPerSeason: v}))} />
            <LabeledInput label="Seasons to model" value={inputs.seasons} onChange={(v)=>setInputs(i=>({...i, seasons: v}))} />
            <LabeledInput label="Gear upfront cost" value={inputs.gearCost} onChange={(v)=>setInputs(i=>({...i, gearCost: v}))} />
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
              <div className="text-blue-700 font-medium">{sensitivity}% → {adjDays} days/season</div>
            </div>
            <input type="range" min={-50} max={50} step={1} value={sensitivity} onChange={(e)=>setSensitivity(Number(e.target.value))} className="w-full accent-blue-600" />
            <div className="text-xs text-gray-500 mt-1">Test best/worst case seasons.</div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-5">
            <SectionTitle title="Cumulative Cost (NPV)" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 rounded-lg bg-blue-600/10">
                <div className="text-xs text-gray-600">Ownership NPV</div>
                <div className="text-2xl font-bold text-blue-700">{currency(Math.round(final.ownership))}</div>
              </div>
              <div className="p-4 rounded-lg bg-emerald-600/10">
                <div className="text-xs text-gray-600">Renting NPV</div>
                <div className="text-2xl font-bold text-emerald-700">{currency(Math.round(final.rental))}</div>
              </div>
              <div className="p-4 rounded-lg bg-sky-500/10">
                <div className="text-xs text-gray-600">Difference</div>
                <div className="text-2xl font-bold text-sky-700">{currency(Math.round(Math.abs(final.ownership - final.rental)))}</div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={model.series} margin={{ left: 10, right: 10, top: 10, bottom: 0 }}>
                  <XAxis dataKey="year" tick={{ fill: "#6b7280", fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} tickFormatter={(v)=>`$${(v/1000).toFixed(0)}k`} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
                  <Tooltip formatter={(v)=>currency(Math.round(v))} labelFormatter={(l)=>`Year ${l}`} contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }} />
                  {model.breakEvenYear && (
                    <ReferenceLine x={model.breakEvenYear} stroke="#0ea5e9" strokeDasharray="4 4" label={{ value: `Break-even Y${model.breakEvenYear}`, fill: "#0369a1", position: "insideTopRight", fontSize: 12 }} />
                  )}
                  <Line type="monotone" dataKey="ownership" stroke="#2563EB" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="rental" stroke="#059669" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-5">
              <SectionTitle title="Recommendation" />
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${recommendation.color}`}>
                <PiggyBank className="h-4 w-4" />
                <div className="text-sm font-semibold">{recommendation.tone}</div>
              </div>
              <div className="text-sm text-gray-600 mt-3">{recommendation.detail}</div>
              <div className="text-xs text-gray-500 mt-2 flex items-start gap-2"><Info className="h-4 w-4 mt-0.5"/>We include resale value and discount future costs to today.</div>
              <Button className="mt-4 w-full">Save Scenario</Button>
            </Card>

            <Card className="p-5">
              <SectionTitle title="Break-even" />
              <div className="text-sm text-gray-600">Where ownership dips below rentals.</div>
              <div className="mt-3">
                <div className="text-3xl font-bold text-gray-900">{model.breakEvenYear ? `Year ${model.breakEvenYear}` : "No break-even"}</div>
                <div className="text-xs text-gray-500 mt-1">At {adjDays} days/season.</div>
              </div>
            </Card>

            <Card className="p-5">
              <SectionTitle title="Annual Breakdown" />
              <div className="h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={model.series} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                    <XAxis dataKey="year" hide />
                    <YAxis hide />
                    <Bar dataKey="annualOwnership" stackId="a" fill="#2563EB" radius={[4,4,0,0]} />
                    <Bar dataKey="annualRental" stackId="a" fill="#059669" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sticky bottom-4">
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-blue-600/10 grid place-items-center text-blue-700"><DollarSign className="h-5 w-5"/></div>
              <div>
                <div className="text-sm text-gray-900 font-semibold">Ownership vs Rental (NPV over {inputs.seasons} yrs)</div>
                <div className="text-xs text-gray-500">{currency(Math.round(final.ownership))} vs {currency(Math.round(final.rental))}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto">Share</Button>
              <Button className="w-full sm:w-auto">Export CSV</Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
