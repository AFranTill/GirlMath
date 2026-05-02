import { Flame } from "lucide-react";

interface StreakFlameProps {
  count: number;
  unit?: "w" | "m";
}

export function StreakFlame({ count, unit = "m" }: StreakFlameProps) {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full">
      <Flame className="w-4 h-4 text-white fill-white animate-pulse" />
      <span className="text-white text-sm font-bold">
        {count}
        {unit}
      </span>
    </div>
  );
}
