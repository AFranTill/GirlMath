import { GlassCard } from "../components/shared/GlassCard";
import { StatusAvatar } from "../components/shared/StatusAvatar";
import { StarIcon } from "../components/shared/StarIcon";
import { StreakFlame } from "../components/shared/StreakFlame";
import { Button } from "../components/ui/button";
import { FileDown, Star, TrendingUp, User as UserIcon } from "lucide-react";

const vouches = [
  { name: "Sam Taylor", quote: "Reliable payer, great flatmate!" },
  { name: "Jordan Lee", quote: "Always on time, very organized." },
  { name: "Morgan Ellis", quote: "Trustworthy and communicative." },
];

export function Profile() {
  return (
    <div className="p-8 space-y-6 max-w-screen-xl mx-auto bg-[#EEEBE3] min-h-screen">
      <div className="flex flex-col items-center pt-8">
        <div className="relative">
          <div className="absolute -inset-2 bg-[#CA0013] rounded-full blur-lg opacity-20"></div>
          <StatusAvatar name="Alex Kim" status="safe" size="lg" />
        </div>
        <h1 className="text-2xl font-bold text-black mt-4">Alex Kim</h1>
        <div className="flex items-center gap-2 mt-2">
          <div className="px-3 py-1 bg-[#CA0013] rounded-full">
            <span className="text-[#EEEBE3] font-semibold text-sm">Gold Renter</span>
          </div>
          <StreakFlame count={4} unit="m" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <GlassCard className="bg-[#EEEBE3]">
          <div className="flex flex-col items-center text-center">
            <Star className="w-8 h-8 mb-2 text-[#CA0013]" />
            <div className="text-2xl font-bold text-black">58</div>
            <div className="text-xs text-black/50">Total Stars</div>
          </div>
        </GlassCard>

        <GlassCard className="bg-[#EEEBE3]">
          <div className="flex flex-col items-center text-center">
            <TrendingUp className="w-8 h-8 mb-2 text-[#CA0013]" />
            <div className="text-2xl font-bold text-black">8m</div>
            <div className="text-xs text-black/50">Longest Streak</div>
          </div>
        </GlassCard>

        <GlassCard className="bg-[#EEEBE3]">
          <div className="flex flex-col items-center text-center">
            <div className="text-sm text-black/50 mb-1">Level</div>
            <div className="text-2xl font-bold text-black">10</div>
          </div>
        </GlassCard>

        <GlassCard className="bg-[#EEEBE3]">
          <div className="flex flex-col items-center text-center">
            <UserIcon className="w-8 h-8 mb-2 text-black" />
            <div className="text-xs text-black/50 mb-2">Profile</div>
            <Button size="sm" variant="outline" className="gap-1 h-7 border-black text-black">
              <FileDown className="w-3 h-3" />
              Download
            </Button>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="bg-[#EEEBE3]">
        <h3 className="font-semibold text-black mb-4 flex items-center gap-2">
          <StarIcon glow /> Flatmate Reviews
        </h3>
        <div className="space-y-3">
          {vouches.map((vouch) => (
            <div
              key={vouch.name}
              className="bg-black/5 rounded-lg p-3 border border-black/10"
            >
              <p className="text-sm text-black/70 italic mb-2">"{vouch.quote}"</p>
              <p className="text-xs text-black/40 font-semibold">— {vouch.name}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
