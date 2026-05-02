import { Link, useLocation } from "react-router";
import { Home, DollarSign, Zap, ShoppingCart, Trophy, User } from "lucide-react";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/rent", icon: DollarSign, label: "Rent" },
  { path: "/bills", icon: Zap, label: "Bills" },
  { path: "/groceries", icon: ShoppingCart, label: "Groceries" },
  { path: "/scoreboard", icon: Trophy, label: "Scoreboard" },
  { path: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 shadow-lg">
      <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all ${
                isActive
                  ? "text-emerald-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? "scale-110" : ""}`} />
              <span className="text-xs">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
