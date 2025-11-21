import { Card, SectionTitle, Button } from "./Primitives";
import { CalendarDays, MapPin, Clock } from "lucide-react";

export default function UpcomingTrip() {
  return (
    <Card className="p-5">
      <SectionTitle title="Upcoming Trip" action={<Button variant="ghost">View all</Button>} />
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-[#60A5FA]/10 text-[#1E3A8A] grid place-items-center">
          <CalendarDays className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-gray-900">Whistler Weekend</div>
          <div className="text-sm text-gray-500 flex items-center gap-3">
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> Whistler, BC</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> Mar 8–10</span>
          </div>
        </div>
        <Button variant="secondary">Itinerary</Button>
      </div>
    </Card>
  );
}
