import { GlassCard } from "../components/shared/GlassCard";
import { StatusAvatar } from "../components/shared/StatusAvatar";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { CheckCircle2, Bell } from "lucide-react";
import { useState } from "react";

const flatmates = [
  { name: "Amy", paid: true, amount: 650, paidDate: "Apr 28" },
  { name: "Sam Taylor", paid: true, amount: 650, paidDate: "Apr 30" },
  { name: "Jordan Lee", paid: false, amount: 650, paidDate: null },
];

export function Rent() {
  const [nudgeOpen, setNudgeOpen] = useState(false);
  const [nudgedPerson, setNudgedPerson] = useState("");

  const handleNudge = (name: string) => {
    setNudgedPerson(name);
    setNudgeOpen(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-screen-lg mx-auto">
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-slate-800">Rent Payment</h1>
        <p className="text-sm text-slate-600 mt-1">Due: May 5, 2026 (3 days remaining)</p>
      </div>

      <GlassCard className="bg-gradient-to-br from-[#e19696]/10 to-[#f7c884]/10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-slate-600">Total Rent</p>
            <p className="text-3xl font-bold text-slate-800">$2,400</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-600">Collected</p>
            <p className="text-2xl font-bold text-emerald-600">$1,600 / $2,400</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Progress</span>
            <span className="font-semibold">2 / 3 paid</span>
          </div>
          <Progress value={66.67} className="h-3" />
        </div>
      </GlassCard>

      <div className="space-y-3">
        <h2 className="font-semibold text-slate-800">Flatmate Status</h2>
        {flatmates.map((flatmate) => (
          <GlassCard key={flatmate.name}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <StatusAvatar
                  name={flatmate.name}
                  status={flatmate.paid ? "safe" : "pending"}
                  size="md"
                />
                <div>
                  <p className="font-semibold text-slate-800">{flatmate.name}</p>
                  <p className="text-sm text-slate-600">${flatmate.amount}</p>
                </div>
              </div>
              <div className="text-right">
                {flatmate.paid ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-600">Paid</p>
                      <p className="text-xs text-slate-500">{flatmate.paidDate}</p>
                    </div>
                  </div>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleNudge(flatmate.name)}
                      >
                        <Bell className="w-4 h-4" />
                        Send Nudge
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send a Friendly Nudge</DialogTitle>
                        <DialogDescription>
                          Just a friendly poke! Help the flat get that +1 Bonus Star.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <p className="text-sm text-slate-600">
                          Send {flatmate.name} a gentle reminder about the upcoming rent payment?
                        </p>
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                            Send Nudge
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="bg-amber-50/80">
        <h3 className="font-semibold text-slate-800 mb-2">Star Opportunity</h3>
        <p className="text-sm text-slate-600">
          If everyone pays by May 5th, the whole flat earns +1 Bonus Star! 🌟
        </p>
      </GlassCard>
    </div>
  );
}
