import { Avatar } from "./Primitives";
import { Search, Bell, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-[#1E3A8A] text-white grid place-items-center font-bold shadow-sm">P</div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm text-gray-500">Peakcision</span>
            <span className="text-[11px] tracking-wide uppercase text-gray-400">Peak Performance. Precision Decisions.</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search resorts, gear, trips..."
              className="w-full h-10 pl-10 pr-3 rounded-xl border-2 border-gray-200 focus:border-[#1E3A8A] outline-none transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative h-10 w-10 grid place-items-center rounded-xl border-2 border-gray-200 text-gray-600 hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#FF6B35] text-white text-[10px] grid place-items-center">3</span>
          </button>
          <button className="h-10 w-10 grid place-items-center rounded-xl border-2 border-gray-200 text-gray-600 hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          <Avatar initials="AL" />
        </div>
      </div>
    </header>
  );
}
