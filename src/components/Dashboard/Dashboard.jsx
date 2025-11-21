import Hero from "./Hero";
import QuickActions from "./QuickActions";
import Insights from "./Insights";
import UpcomingTrip from "./UpcomingTrip";
import PriceAlerts from "./PriceAlerts";
import { Card } from "./Primitives";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const snowData = [
  { day: "Mon", cm: 12 },
  { day: "Tue", cm: 4 },
  { day: "Wed", cm: 8 },
  { day: "Thu", cm: 16 },
  { day: "Fri", cm: 3 },
  { day: "Sat", cm: 10 },
  { day: "Sun", cm: 6 },
];

export default function Dashboard() {
  return (
    <div className="text-gray-900">
      <Hero />
      <div className="mt-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Welcome back, Alex</h1>
        <p className="text-gray-500 mt-1">Here’s where your season stands today.</p>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-12">
          <QuickActions />
        </div>

        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Insights />
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 tracking-wide">Weekly Snow Outlook</h3>
              <span className="text-xs text-gray-500">Regional average (cm)</span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={snowData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                  <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#9CA3AF" />
                  <YAxis tickLine={false} axisLine={false} stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB' }} cursor={{ stroke: '#E5E7EB' }} />
                  <Line type="monotone" dataKey="cm" stroke="#1E3A8A" strokeWidth={2.5} dot={{ r: 3, stroke: '#1E3A8A', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <UpcomingTrip />
          <PriceAlerts />
        </div>
      </div>
    </div>
  );
}
