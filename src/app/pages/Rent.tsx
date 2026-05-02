import { useState } from "react";
import { CheckCircle2, Bell } from "lucide-react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";

// ─── Palette ────────────────────────────────────────────────────────────────
// #EEEBE3  — off-white / background
// #CA0013  — red accent
// #000000  — black / text / primary
// ────────────────────────────────────────────────────────────────────────────

const flatmates = [
  { name: "Amy", paid: true, amount: 650, paidDate: "Apr 28" },
  { name: "Sam Taylor", paid: true, amount: 650, paidDate: "Apr 30" },
  { name: "Jordan Lee", paid: false, amount: 650, paidDate: null },
];

// ─── Primitives ──────────────────────────────────────────────────────────────

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-black/10 shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-5 ${className}`}
    >
      {children}
    </div>
  );
}

function Progress({ value }: { value: number }) {
  return (
    <div className="h-3 w-full rounded-full bg-black/10 overflow-hidden">
      <div
        className="h-full rounded-full bg-black transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function StatusAvatar({ name, status }: { name: string; status: "safe" | "pending" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${status === "safe"
        ? "bg-black text-[#EEEBE3]"
        : "bg-[#CA0013] text-[#EEEBE3]"
        }`}
    >
      {initials}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Rent() {
  const [nudgedPerson, setNudgedPerson] = useState("");

  const handleNudge = (name: string) => setNudgedPerson(name);

  return (
    <div className="p-6 space-y-6 max-w-screen-lg mx-auto bg-[#EEEBE3] min-h-screen">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-black">Rent Payment</h1>
        <p className="text-sm text-black/50 mt-1">Due: May 5, 2026 (3 days remaining)</p>
      </div>

      {/* Summary card */}
      <GlassCard className="bg-[#CA0013]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-[#EEEBE3]/70">Total Rent</p>
            <p className="text-3xl font-bold text-[#EEEBE3]">$2,400</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#EEEBE3]/70">Collected</p>
            <p className="text-2xl font-bold text-[#EEEBE3]">$1,600 / $2,400</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#EEEBE3]/70">Progress</span>
            <span className="font-semibold text-[#EEEBE3]">2 / 3 paid</span>
          </div>
          {/* Progress bar on red card uses white track / off-white fill */}
          <div className="h-3 w-full rounded-full bg-[#EEEBE3]/25 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#EEEBE3] transition-all duration-500"
              style={{ width: "66.67%" }}
            />
          </div>
        </div>
      </GlassCard>

      {/* Flatmate list */}
      <div className="space-y-3">
        <h2 className="font-semibold text-black">Flatmate Status</h2>

        {flatmates.map((flatmate) => (
          <GlassCard key={flatmate.name} className="bg-white/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <StatusAvatar
                  name={flatmate.name}
                  status={flatmate.paid ? "safe" : "pending"}
                />
                <div>
                  <p className="font-semibold text-black">{flatmate.name}</p>
                  <p className="text-sm text-black/50">${flatmate.amount}</p>
                </div>
              </div>

              <div className="text-right">
                {flatmate.paid ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-black" />
                    <div>
                      <p className="text-sm font-semibold text-black">Paid</p>
                      <p className="text-xs text-black/40">{flatmate.paidDate}</p>
                    </div>
                  </div>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 border-[#CA0013] text-[#CA0013] hover:bg-[#CA0013] hover:text-[#EEEBE3]"
                        onClick={() => handleNudge(flatmate.name)}
                      >
                        <Bell className="w-4 h-4" />
                        Send Nudge
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="bg-[#EEEBE3] border border-black/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.14)]">
                      <DialogHeader>
                        <DialogTitle className="text-black">Send a Friendly Nudge</DialogTitle>
                        <DialogDescription className="text-black/50">
                          Just a friendly poke! Help the flat get that +1 Bonus Star.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <p className="text-sm text-black/60">
                          Send {flatmate.name} a gentle reminder about the upcoming rent payment?
                        </p>
                        <Button className="w-full bg-[#CA0013] text-[#EEEBE3] hover:bg-black">
                          Send Nudge
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Star opportunity banner */}
      <GlassCard className="bg-black">
        <h3 className="font-semibold text-[#EEEBE3] mb-2">Star Opportunity</h3>
        <p className="text-sm text-[#EEEBE3]/60">
          If everyone pays by May 5th, the whole flat earns +1 Bonus Star!
        </p>
      </GlassCard>
    </div>
  );
}
