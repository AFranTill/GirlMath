import { useEffect, useState } from "react";
import { GlassCard } from "../components/shared/GlassCard";
import { StatusAvatar } from "../components/shared/StatusAvatar";
import { StarIcon } from "../components/shared/StarIcon";
import { Progress } from "../components/ui/progress";
import { Crown, TrendingUp, Zap, Award, Target, Shield } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const badges = [
  { name: "The Early Bird", icon: TrendingUp, earned: true },
  { name: "Eco-Warrior", icon: Zap, earned: true },
  { name: "6-Month Legend", icon: Award, earned: true },
  { name: "Perfect Month", icon: Target, earned: false },
  { name: "Team Player", icon: Shield, earned: false },
];

const podiumColors = {
  1: { bg: "#CA0013", text: "#EEEBE3" },
  2: { bg: "#1a1a1a", text: "#EEEBE3" },
  3: { bg: "#3a3a3a", text: "#EEEBE3" },
};

export function Scoreboard() {
  const [rankings, setRankings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRankings() {
      const { data, error } = await supabase
        .from("users")
        .select("email, star")
        .order("star", { ascending: false });

      console.log('Leaderboard data:', data, 'Error:', error);

      if (error) {
        setError(error.message);
      } else {
        // Sort by star descending, treating null as 0
        const sortedData = data.sort((a, b) => (b.star ?? 0) - (a.star ?? 0));
        const ranked = sortedData.map((user, index) => ({
          rank: index + 1,
          name: user.email.split('@')[0],
          stars: user.star ?? 0,
          level: user.star >= 50 ? "Gold" : user.star >= 30 ? "Silver" : "Bronze",
        }));
        setRankings(ranked);
      }
      setLoading(false);
    }

    loadRankings();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div
      className="p-8 space-y-6 max-w-screen-xl mx-auto"
      style={{ backgroundColor: "#EEEBE3", minHeight: "100vh" }}
    >
      <h1 className="text-2xl font-bold text-center pt-4" style={{ color: "#0a0a0a" }}>
        Flatmate Scoreboard
      </h1>

      <div className="relative flex items-end justify-center gap-4 pt-8">
        {rankings.slice(0, 3).map((person) => {
          const rank = person.rank as 1 | 2 | 3;
          const heights = { 1: "h-48", 2: "h-40", 3: "h-32" };
          const colors = podiumColors[person.rank];

          return (
            <div
              key={person.rank}
              className="flex flex-col items-center"
              style={{ order: person.rank === 1 ? 0 : person.rank }}
            >
              {person.rank === 1 && (
                <Crown
                  className="w-8 h-8 mb-2"
                  style={{ color: "#CA0013", fill: "#CA0013", filter: "drop-shadow(0 0 8px rgba(202,0,19,0.5))" }}
                />
              )}
              <StatusAvatar name={person.name} status="safe" size="lg" />
              <div
                className={`${heights[person.rank]} w-24 mt-2 rounded-t-2xl flex flex-col items-center justify-start pt-4 shadow-lg`}
                style={{ backgroundColor: colors.bg }}
              >
                <div className="text-2xl font-bold" style={{ color: colors.text }}>
                  {person.rank}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <StarIcon glow size={16} />
                  <span className="font-semibold" style={{ color: colors.text }}>
                    {person.stars}
                  </span>
                </div>
              </div>
              <div className="text-center mt-2">
                <p className="font-semibold" style={{ color: "#0a0a0a" }}>
                  {person.name}
                </p>
                <p className="text-xs" style={{ color: "#6b6b6b" }}>
                  {person.level}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Other users */}
      {rankings.length > 3 && (
        <div className="space-y-2">
          {rankings.slice(3).map((person) => (
            <div
              key={person.rank}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-slate-700 font-bold text-sm">
                  {person.rank}
                </div>
                <StatusAvatar name={person.name} status="safe" size="sm" />
                <div>
                  <p className="font-semibold text-slate-800">{person.name}</p>
                  <p className="text-xs text-slate-500">{person.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <StarIcon size={14} />
                <span className="font-semibold text-slate-700">{person.stars}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Star Rulebook */}
      <div
        className="rounded-2xl p-5 shadow-md"
        style={{ backgroundColor: "rgba(202,0,19,0.08)", border: "1px solid rgba(202,0,19,0.15)" }}
      >
        <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "#0a0a0a" }}>
          <StarIcon glow /> Star Rulebook
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span style={{ color: "#4a4a4a" }}>Pay rent on time</span>
            <span className="font-semibold" style={{ color: "#0a0a0a" }}>+1 ⭐</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#4a4a4a" }}>Pay bills on time</span>
            <span className="font-semibold" style={{ color: "#0a0a0a" }}>+1 ⭐</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#4a4a4a" }}>Don't pay rent on time</span>
            <span className="font-semibold" style={{ color: "#CA0013" }}>-1 ⭐</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#4a4a4a" }}>Don't pay bills on time</span>
            <span className="font-semibold" style={{ color: "#CA0013" }}>-1 ⭐</span>
          </div>
        </div>
      </div>

      {/* House Goal Progress */}
      <div
        className="rounded-2xl p-5 shadow-md"
        style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}
      >
        <h3 className="font-semibold mb-2" style={{ color: "#0a0a0a" }}>
          House Goal Progress
        </h3>
        <p className="text-sm mb-3" style={{ color: "#4a4a4a" }}>
          Current Status:{" "}
          <span className="font-semibold" style={{ color: "#cda684" }}>
            Cozy Cottage (Lvl 4)
          </span>
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span style={{ color: "#4a4a4a" }}>Level Up every 10 Stars</span>
            <span className="font-semibold" style={{ color: "#0a0a0a" }}>7 / 10</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: "#e0ddd6" }}>
            <div
              className="h-full rounded-full"
              style={{ width: "70%", backgroundColor: "#CA0013" }}
            />
          </div>
        </div>
      </div>

      {/* Milestone Badges */}
      <div
        className="rounded-2xl p-5 shadow-md"
        style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}
      >
        <h3 className="font-semibold mb-4" style={{ color: "#0a0a0a" }}>
          Milestone Badges
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.name}
                className="flex flex-col items-center p-3 rounded-xl"
                style={{
                  backgroundColor: badge.earned ? "rgba(202,0,19,0.08)" : "#f0ede6",
                  border: badge.earned ? "1px solid rgba(202,0,19,0.2)" : "1px solid transparent",
                }}
              >
                <Icon
                  className="w-8 h-8 mb-2"
                  style={{ color: badge.earned ? "#CA0013" : "#c0bdb6" }}
                />
                <p
                  className="text-xs text-center"
                  style={{ color: badge.earned ? "#0a0a0a" : "#a0a0a0" }}
                >
                  {badge.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
