import { useState, useEffect } from "react";
import { CheckCircle2, Bell, AlertCircle, Loader } from "lucide-react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Progress } from "../components/ui/progress";
import { supabase } from "../../lib/supabaseClient";

// ─── Palette ────────────────────────────────────────────────────────────────
// #EEEBE3  — off-white / background
// #CA0013  — red accent
// #000000  — black / text / primary
// ────────────────────────────────────────────────────────────────────────────

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

function StatusAvatar({ name, status }: { name: string; status: "safe" | "pending" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
        status === "safe"
          ? "bg-black text-[#EEEBE3]"
          : "bg-[#CA0013] text-[#EEEBE3]"
      }`}
    >
      {initials}
    </div>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface Flatmate {
  id: string;
  name: string;
  paid: boolean;
  amount: number;
  paidDate: string | null;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Rent() {
  const [nudgeOpen, setNudgeOpen] = useState(false);
  const [nudgedPerson, setNudgedPerson] = useState("");
  const [flatmates, setFlatmates] = useState<Flatmate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch users
        const { data: usersData, error: usersError } = await supabase
          .from("users")
          .select("email")
          .order("email");

        if (usersError) {
          console.error("Error loading users:", usersError);
        } else {
          setUsers(usersData || []);
        }

        // Get auth session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
          setError("Not authenticated. Please log in.");
          setLoading(false);
          return;
        }

        const token = session.access_token;

        const response = await fetch("/api/payments/transfers", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const text = await response.text();

        if (!response.ok) {
          throw new Error(`Failed to fetch transfers: ${response.statusText}`);
        }

        const data = JSON.parse(text);
        setFlatmates(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNudge = (name: string) => {
    setNudgedPerson(name);
    setNudgeOpen(true);
  };

  const totalRent = users.length * 250;
  const paidCount = flatmates.filter((f) => f.paid).length;
  const totalPaid = flatmates.filter((f) => f.paid).reduce((sum, f) => sum + f.amount, 0);
  const progressPercent = totalRent > 0 ? (totalPaid / totalRent) * 100 : 0;

  return (
    <div className="p-6 space-y-6 max-w-screen-lg mx-auto bg-[#EEEBE3] min-h-screen">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-black">Rent Payment</h1>
        <p className="text-sm text-black/50 mt-1">Due: May 5, 2026 (3 days remaining)</p>
      </div>

      {/* Error */}
      {error && (
        <GlassCard className="bg-red-50/80 border border-red-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </GlassCard>
      )}

      {/* Loading */}
      {loading ? (
        <GlassCard className="flex items-center justify-center py-12">
          <Loader className="w-6 h-6 text-slate-400 animate-spin" />
          <span className="ml-2 text-slate-600">Loading rent data...</span>
        </GlassCard>
      ) : (
        <>
          {/* Summary card */}
          <GlassCard className="bg-gradient-to-br from-[#e19696]/10 to-[#f7c884]/10">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-slate-600">Total Rent</p>
                <p className="text-3xl font-bold text-slate-800">${totalRent}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">Collected</p>
                <p className="text-2xl font-bold text-[#CA0013]">
                  ${totalPaid} / ${totalRent}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Progress</span>
                <span className="font-semibold">
                  1 / {users.length} paid
                </span>
              </div>
              <Progress value={progressPercent} className="h-3" />
            </div>
          </GlassCard>

          {/* Flatmate list */}
          {flatmates.length === 0 ? (
            <GlassCard className="text-center py-8">
              <p className="text-slate-600">No transfer payments recorded yet</p>
            </GlassCard>
          ) : (
            <div className="space-y-3">
              <h2 className="font-semibold text-slate-800">Transaction History</h2>
              {flatmates.map((flatmate) => (
                <GlassCard key={flatmate.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <StatusAvatar
                        name={flatmate.name}
                        status={flatmate.paid ? "safe" : "pending"}
                      />
                      <div>
                        <p className="font-semibold text-slate-800">{flatmate.name}</p>
                        <p className="text-sm text-slate-600">${flatmate.amount.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {flatmate.paid ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#EEEBE3]" />
                          <div>
                            <p className="text-sm font-semibold text-[#EEEBE3]">Paid</p>
                            <p className="text-xs text-slate-500">{flatmate.paidDate}</p>
                          </div>
                        </div>
                      ) : (
                        <Dialog open={nudgeOpen && nudgedPerson === flatmate.name} onOpenChange={setNudgeOpen}>
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
                              <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
          )}

          {/* Star opportunity banner */}
          <GlassCard className="bg-black">
            <h3 className="font-semibold text-[#EEEBE3] mb-2">Star Opportunity</h3>
            <p className="text-sm text-[#EEEBE3]/60">
              If everyone pays by May 5th, the whole flat earns +1 Bonus Star!
            </p>
          </GlassCard>
        </>
      )}
    </div>
  );
}
