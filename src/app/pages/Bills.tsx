import { GlassCard } from "../components/shared/GlassCard";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Zap, Wifi, Droplet } from "lucide-react";

const totalUsageData = [
  { day: "Mon", usage: 21 },
  { day: "Tue", usage: 26 },
  { day: "Wed", usage: 31 },
  { day: "Thu", usage: 24 },
  { day: "Fri", usage: 35 },
  { day: "Sat", usage: 40 },
  { day: "Sun", usage: 29 },
];

const providers = [
  { name: "Electricity", cost: 98, icon: Zap, color: "text-[#CA0013]", bg: "bg-[#EEEBE3]" },
  { name: "Internet", cost: 65, icon: Wifi, color: "text-[#CA0013]", bg: "bg-[#EEEBE3]" },
  { name: "Water", cost: 23, icon: Droplet, color: "text-[#CA0013]", bg: "bg-[#EEEBE3]" },
];

export function Bills() {
  return (
    <div className="p-8 space-y-6 max-w-screen-xl mx-auto bg-[#EEEBE3] min-h-screen">
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-black">Utility Bills</h1>
        <p className="text-sm text-black/50 mt-1">Current billing period: Apr 1 - Apr 30</p>
      </div>

      <GlassCard className="bg-[#EEEBE3]">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-black/50">Estimated Bill</p>
            <p className="text-3xl font-bold text-black">$186</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-black/50">Per Person</p>
            <p className="text-2xl font-bold text-[#CA0013]">$62</p>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-3 gap-4">
        {providers.map((provider) => {
          const Icon = provider.icon;
          return (
            <GlassCard key={provider.name} className="bg-[#EEEBE3]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#EEEBE3]" />
                </div>
                <h3 className="font-semibold text-black">{provider.name}</h3>
              </div>
              <p className="text-2xl font-bold text-black">${provider.cost}</p>
              <p className="text-xs text-black/40 mt-1">This month</p>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard className="bg-[#EEEBE3]">
        <h3 className="font-semibold text-black mb-4">Equal Split - Total Power Usage</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={totalUsageData}>
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#000" }} />
            <YAxis tick={{ fontSize: 12, fill: "#000" }} />
            <Bar dataKey="usage" fill="#CA0013" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard className="bg-[#EEEBE3]">
        <h3 className="font-semibold text-black mb-2">Eco Tip</h3>
        <p className="text-sm text-black/60">
          Your flat used 12% less power this week! Keep it up to earn the "Eco-Warrior" badge. 🌱
        </p>
      </GlassCard>
    </div>
  );
}