import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = "", hover = false }: GlassCardProps) {
  return (
    <div
      className={`bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/40 ${
        hover ? "hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
