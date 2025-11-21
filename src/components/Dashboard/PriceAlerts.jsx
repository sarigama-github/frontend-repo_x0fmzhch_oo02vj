import { Card, SectionTitle, Button } from "./Primitives";
import { Tag, TrendingDown } from "lucide-react";

const items = [
  { id: 1, label: "Salomon QST 98 (177cm)", price: 489, delta: -60 },
  { id: 2, label: "Atomic Hawx Prime 110", price: 349, delta: -40 },
  { id: 3, label: "Marker Griffon 13 ID", price: 199, delta: -20 },
];

export default function PriceAlerts() {
  return (
    <Card className="p-5">
      <SectionTitle
        title="Price Alerts"
        action={<Button variant="ghost">Manage</Button>}
      />
      <ul className="divide-y divide-gray-100">
        {items.map((i) => (
          <li key={i.id} className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#1E3A8A]/5 text-[#1E3A8A] grid place-items-center">
                <Tag className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{i.label}</div>
                <div className="text-xs text-gray-500">Tracking across 14 retailers</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono font-semibold text-gray-900">${i.price}</div>
              <div className="text-xs text-[#FF6B35] inline-flex items-center gap-1">
                <TrendingDown className="h-4 w-4" /> Drop ${i.delta}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
