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
    <div className="p-8 space-y-6 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 text-center pt-4">
        Flatmate Scoreboard
      </h1>

      <div className="relative flex items-end justify-center gap-4 pt-8">
        {rankings.slice(0, 3).map((person) => {
          const rank = person.rank as 1 | 2 | 3;
          const heights = { 1: "h-48", 2: "h-40", 3: "h-32" };
          const bgColors = {
            1: "from-amber-400 to-yellow-500",
            2: "from-slate-300 to-slate-400",
            3: "from-amber-700 to-amber-800",
          };

          return (
            <div
              key={person.rank}
              className="flex flex-col items-center"
              style={{ order: person.rank === 1 ? 0 : person.rank }}
            >
              {person.rank === 1 && (
                <Crown className="w-8 h-8 text-amber-400 fill-amber-400 mb-2 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
              )}
              <StatusAvatar name={person.name} status="safe" size="lg" />
              <div
                className={`${heights[rank]} w-24 mt-2 bg-gradient-to-b ${bgColors[rank]} rounded-t-2xl flex flex-col items-center justify-start pt-4 shadow-lg`}
              >
                <div className="text-2xl font-bold text-white">{person.rank}</div>
                <div className="flex items-center gap-1 mt-2">
                  <StarIcon glow size={16} />
                  <span className="text-white font-semibold">{person.stars}</span>
                </div>
              </div>
              <div className="text-center mt-2">
                <p className="font-semibold text-slate-800">{person.name}</p>
                <p className="text-xs text-slate-500">{person.level}</p>
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

      <GlassCard className="bg-[#f7c884]/20">
        <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <StarIcon glow /> Star Rulebook
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Pay rent on time</span>
            <span className="font-semibold text-emerald-600">+1 ⭐</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Pay bills on time</span>
            <span className="font-semibold text-emerald-600">+1 ⭐</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Don't pay rent on time</span>
            <span className="font-semibold text-red-600">-1 ⭐</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Don't pay bills on time</span>
            <span className="font-semibold text-red-600">-1 ⭐</span>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="font-semibold text-slate-800 mb-2">House Goal Progress</h3>
        <p className="text-sm text-slate-600 mb-3">
          Current Status: <span className="font-semibold text-emerald-600">Cozy Cottage (Lvl 4)</span>
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Level Up every 10 Stars</span>
            <span className="font-semibold">7 / 10</span>
          </div>
          <Progress value={70} className="h-3" />
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="font-semibold text-slate-800 mb-4">Milestone Badges</h3>
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.name}
                className={`flex flex-col items-center p-3 rounded-xl ${
                  badge.earned
                    ? "bg-gradient-to-br from-emerald-100 to-teal-100"
                    : "bg-slate-100"
                }`}
              >
                <Icon
                  className={`w-8 h-8 mb-2 ${
                    badge.earned ? "text-emerald-600" : "text-slate-300"
                  }`}
                />
                <p className={`text-xs text-center ${badge.earned ? "text-slate-800" : "text-slate-400"}`}>
                  {badge.name}
                </p>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
