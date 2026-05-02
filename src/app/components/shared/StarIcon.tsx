import { Star } from "lucide-react";

interface StarIconProps {
  filled?: boolean;
  glow?: boolean;
  size?: number;
}

export function StarIcon({ filled = true, glow = false, size = 20 }: StarIconProps) {
  return (
    <Star
      className={`${filled ? "fill-amber-400 text-amber-400" : "text-slate-300"} ${
        glow ? "drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" : ""
      }`}
      size={size}
    />
  );
}
