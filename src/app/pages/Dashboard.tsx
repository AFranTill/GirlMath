import { GlassCard } from "../components/shared/GlassCard";
import { StatusAvatar } from "../components/shared/StatusAvatar";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { AlertCircle, Bell } from "lucide-react";
import { Link } from "react-router";

export function Dashboard() {
  return (
    <div className="p-8 space-y-6">
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-amber-900">Rent due in 5 days</p>
          <p className="text-sm text-amber-700">
            Alex still needs to pay their share ($800)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Link to="/app/rent">
            <GlassCard hover className="border-[#e19696]/30">
              <h3 className="font-semibold text-slate-800 mb-4">Rent Payment</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">2/3 paid</span>
                  <span className="font-semibold text-slate-800">$1,600 / $2,400</span>
                </div>
                <Progress value={66.67} className="h-3" />

                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <StatusAvatar name="Jordan Lee" status="safe" size="sm" />
                      <span className="text-sm text-slate-700">Jordan</span>
                    </div>
                    <span className="text-xs text-emerald-600 font-semibold">Paid</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <StatusAvatar name="Morgan Ellis" status="safe" size="sm" />
                      <span className="text-sm text-slate-700">Morgan</span>
                    </div>
                    <span className="text-xs text-emerald-600 font-semibold">Paid</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-amber-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <StatusAvatar name="Alex Kim" status="pending" size="sm" />
                      <span className="text-sm text-slate-700">Alex</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-7 gap-1 text-xs">
                      <Bell className="w-3 h-3" />
                      Ping
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Link>

          <Link to="/app/bills">
            <GlassCard hover className="border-[#c5c09a]/30">
              <h3 className="font-semibold text-slate-800 mb-4">Bills</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Total this month</span>
                  <span className="font-semibold text-slate-800">$186</span>
                </div>
                <Progress value={100} className="h-3" />
                <p className="text-xs text-slate-500 mt-2">All flatmates have paid</p>
              </div>
            </GlassCard>
          </Link>
        </div>

        <div className="col-span-1">
          <Link to="/app/groceries">
            <GlassCard hover className="border-[#f7c884]/30 h-full">
              <h3 className="font-semibold text-slate-800 mb-4">Groceries</h3>
              <div className="flex items-center justify-center py-4">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      stroke="#f7c884"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${377 * 0.84} ${377 * 0.16}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-slate-800">$168</div>
                    <div className="text-xs text-slate-500">of $200</div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-emerald-600 font-semibold">$32 remaining</p>
              </div>
            </GlassCard>
          </Link>
        </div>
      </div>
    </div>
  );
}
