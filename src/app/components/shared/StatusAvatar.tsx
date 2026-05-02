import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface StatusAvatarProps {
  src?: string;
  name: string;
  status: "safe" | "pending" | "risk";
  size?: "sm" | "md" | "lg";
}

const statusColors = {
  safe: "ring-[#E19898]",
  pending: "ring-amber-400",
  risk: "ring-red-500",
};

const sizes = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-16 h-16",
};

export function StatusAvatar({ src, name, status, size = "md" }: StatusAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Avatar className={`${sizes[size]} ring-4 ${statusColors[status]}`}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback className="bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
