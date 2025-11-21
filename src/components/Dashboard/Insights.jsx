import { Card, SectionTitle, Stat } from "./Primitives";
import { motion } from "framer-motion";

export default function Insights() {
  const progress = 68;
  return (
    <Card className="p-5">
      <SectionTitle title="Insights" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className="col-span-1">
          <div className="text-sm text-gray-500 mb-2">ROI to Purchase</div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-[#FF6B35]"
            />
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Based on your season plan, buying pays off after 9 days.
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-3 gap-6">
          <Stat label="Season Days Planned" value="14" />
          <Stat label="Avg Daily Cost" value="$86" />
          <Stat label="Projected Savings" value="$320" color="text-[#1E3A8A]" />
        </div>
      </div>
    </Card>
  );
}
