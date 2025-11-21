import { Card, Button } from "./Primitives";
import { Map, Skiing, Calculator, Sparkles } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Find a Resort",
      desc: "Personalized picks based on your dates and style",
      icon: Map,
      color: "bg-[#60A5FA]/10 text-[#1E3A8A]",
      cta: "Open Finder",
    },
    {
      title: "Equipment Finder",
      desc: "Skis, boots, bindings matched to your profile",
      icon: Skiing,
      color: "bg-[#FF6B35]/10 text-[#FF6B35]",
      cta: "Start Quiz",
    },
    {
      title: "ROI Calculator",
      desc: "Buy vs rent with your actual ski days",
      icon: Calculator,
      color: "bg-[#1E3A8A]/10 text-[#1E3A8A]",
      cta: "Calculate",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {actions.map((a) => (
        <Card key={a.title} className="p-5">
          <div className="flex items-start gap-4">
            <div className={`h-11 w-11 rounded-xl grid place-items-center ${a.color}`}>
              <a.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="text-gray-900 font-semibold mb-1">{a.title}</div>
              <div className="text-sm text-gray-500 mb-4">{a.desc}</div>
              <Button variant={a.title === "Find a Resort" ? "primary" : "secondary"}>{a.cta}</Button>
            </div>
            <Sparkles className="h-5 w-5 text-gray-300" />
          </div>
        </Card>
      ))}
    </div>
  );
}
