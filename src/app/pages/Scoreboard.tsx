import { GlassCard } from "../components/shared/GlassCard";
import { StatusAvatar } from "../components/shared/StatusAvatar";
import { StarIcon } from "../components/shared/StarIcon";
import { Progress } from "../components/ui/progress";
import { Crown, TrendingUp, Zap, Award, Target, Shield } from "lucide-react";

const rankings = [
  { rank: 2, name: "Sam Taylor", stars: 42, level: "Silver" },
  { rank: 1, name: "Alex Kim", stars: 58, level: "Gold" },
  { rank: 3, name: "Jordan Lee", stars: 35, level: "Bronze" },
];

const badges = [
  { name: "The Early Bird", icon: TrendingUp, earned: true },
  { name: "Eco-Warrior", icon: Zap, earned: true },
  { name: "6-Month Legend", icon: Award, earned: true },
  { name: "Perfect Month", icon: Target, earned: false },
  { name: "Team Player", icon: Shield, earned: false },
];

export function Scoreboard() {
  return (
    <div className="p-8 space-y-6 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 text-center pt-4">
        Flatmate Scoreboard
      </h1>

      <div className="relative flex items-end justify-center gap-4 pt-8">
        {[rankings[0], rankings[1], rankings[2]].map((person) => {
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
                className={`${heights[person.rank]} w-24 mt-2 bg-gradient-to-b ${bgColors[person.rank]} rounded-t-2xl flex flex-col items-center justify-start pt-4 shadow-lg`}
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
