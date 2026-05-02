import { Link, useLocation, useNavigate } from "react-router";
import { Home, DollarSign, Zap, ShoppingCart, Trophy, User, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { supabase } from "../../../lib/supabaseClient";
import { useEffect, useState } from "react";

const navItems = [
  { path: "/app", icon: Home, label: "Home" },
  { path: "/app/rent", icon: DollarSign, label: "Rent" },
  { path: "/app/bills", icon: Zap, label: "Bills" },
  { path: "/app/groceries", icon: ShoppingCart, label: "Groceries" },
  { path: "/app/scoreboard", icon: Trophy, label: "Scoreboard" },
  { path: "/app/profile", icon: User, label: "Profile" },
];

export function LeftSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    async function loadStars() {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !sessionData.session?.user?.id) {
        setError("Not logged in");
        setLoading(false);
        return;
      }

      const userId = sessionData.session.user.id;

      const { data, error } = await supabase
        .from("users")
        .select("star")
        .eq("auth_user_id", userId)
        .maybeSingle();

      if (error) {
        setError(error.message);
      } else {
        setStars(data?.star ?? 0);
      }
      setLoading(false);
    }

    loadStars();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed", error);
    }
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-slate-800">FlatTrack</h1>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-[#e19696]/10 text-[#e19696] font-semibold"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
              {label === "Profile" && (
                <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                  {loading ? "..." : error ? "!" : stars}
                </span>
              )}

            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <Button
          variant="outline"
          className="w-full justify-start gap-3"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </Button>
      </div>
    </aside>
  );
}
