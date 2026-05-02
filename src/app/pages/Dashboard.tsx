import { GlassCard } from "../components/shared/GlassCard";
import { StatusAvatar } from "../components/shared/StatusAvatar";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { AlertCircle, Bell } from "lucide-react";
import { Link } from "react-router";

export function Dashboard() {
  return (
    <div className="p-8 space-y-6" style={{ backgroundColor: "#EEEBE3", minHeight: "100vh" }}>
      {/* Alert Banner */}
      <div
        style={{
          backgroundColor: "#fff",
          border: "1.5px solid #CA0013",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(202,0,19,0.10), 0 1.5px 4px rgba(0,0,0,0.07)",
        }}
        className="p-4 flex items-start gap-3"
      >
        <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#CA0013" }} />
        <div className="flex-1">
          <p className="font-bold" style={{ color: "#000" }}>
            Rent due in 5 days
          </p>
          <p className="text-sm" style={{ color: "#000", opacity: 0.55 }}>
            Alex still needs to pay their share ($800)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-10">
          {/* Rent Card */}
          <Link to="/app/rent">
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "24px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.07)",
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
              }}
              className="p-6 cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.13)] hover:-translate-y-0.5"
            >
              <h3 className="font-bold mb-4" style={{ color: "#000", letterSpacing: "-0.02em", fontSize: "1.05rem" }}>
                Rent Payment
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: "#000", opacity: 0.45 }}>2/3 paid</span>
                  <span className="font-bold" style={{ color: "#000" }}>$1,600 / $2,400</span>
                </div>
                <div style={{ backgroundColor: "#EEEBE3", borderRadius: "99px" }} className="h-2.5 overflow-hidden">
                  <div
                    style={{
                      backgroundColor: "#CA0013",
                      width: "66.67%",
                      borderRadius: "99px",
                      boxShadow: "0 2px 8px rgba(202,0,19,0.35)",
                    }}
                    className="h-full"
                  />
                </div>

                <div className="space-y-2 mt-4">
                  {[
                    { name: "Jordan", initial: "J", paid: true },
                    { name: "Morgan", initial: "M", paid: true },
                    { name: "Alex", initial: "A", paid: false },
                  ].map(({ name, initial, paid }) => (
                    <div
                      key={name}
                      style={{
                        backgroundColor: paid ? "#EEEBE3" : "rgba(202,0,19,0.05)",
                        border: `1px solid ${paid ? "rgba(0,0,0,0.08)" : "rgba(202,0,19,0.25)"}`,
                        borderRadius: "14px",
                      }}
                      className="flex items-center justify-between p-2.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          style={{
                            backgroundColor: paid ? "#000" : "#CA0013",
                            color: "#EEEBE3",
                            borderRadius: "10px",
                            width: "32px",
                            height: "32px",
                            fontSize: "0.75rem",
                            fontWeight: "700",
                            boxShadow: paid
                              ? "0 2px 8px rgba(0,0,0,0.18)"
                              : "0 2px 8px rgba(202,0,19,0.3)",
                          }}
                          className="flex items-center justify-center flex-shrink-0"
                        >
                          {initial}
                        </div>
                        <span className="text-sm font-medium" style={{ color: "#000" }}>{name}</span>
                      </div>
                      {paid ? (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: "rgba(0,0,0,0.07)", color: "#000" }}>
                          Paid ✓
                        </span>
                      ) : (
                        <button
                          style={{
                            backgroundColor: "#CA0013",
                            color: "#EEEBE3",
                            border: "none",
                            borderRadius: "99px",
                            fontSize: "0.72rem",
                            fontWeight: "700",
                            padding: "5px 14px",
                            letterSpacing: "0.03em",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            boxShadow: "0 2px 10px rgba(202,0,19,0.35)",
                          }}
                        >
                          <Bell className="w-3 h-3" />
                          Ping
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>

          {/* Bills Card */}
          <Link to="/app/bills">
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "24px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.07)",
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
              }}
              className="mt-6 p-6 cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.13)] hover:-translate-y-0.5"
            >
              <h3 className="font-bold mb-4" style={{ color: "#000", letterSpacing: "-0.02em", fontSize: "1.05rem" }}>
                Bills
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: "#000", opacity: 0.45 }}>Total this month</span>
                  <span className="font-bold" style={{ color: "#000" }}>$186</span>
                </div>
                <div style={{ backgroundColor: "#EEEBE3", borderRadius: "99px" }} className="h-2.5 overflow-hidden">
                  <div
                    style={{
                      backgroundColor: "#000",
                      width: "100%",
                      borderRadius: "99px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    }}
                    className="h-full"
                  />
                </div>
                <p className="text-xs font-semibold" style={{ color: "#000", opacity: 0.45 }}>
                  All flatmates have paid
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Groceries Card */}
        <div className="col-span-1">
          <Link to="/app/groceries">
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "24px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.07)",
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
              }}
              className="p-6 h-full cursor-pointer hover:shadow-[0_16px_48px_rgba(0,0,0,0.13)] hover:-translate-y-0.5"
            >
              <h3 className="font-bold mb-4" style={{ color: "#000", letterSpacing: "-0.02em", fontSize: "1.05rem" }}>
                Groceries
              </h3>
              <div className="flex items-center justify-center py-4">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                    {/* Track */}
                    <circle cx="80" cy="80" r="58" stroke="#EEEBE3" strokeWidth="16" fill="none" />
                    {/* Fill */}
                    <circle
                      cx="80"
                      cy="80"
                      r="58"
                      stroke="#CA0013"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${364 * 0.84} ${364 * 0.16}`}
                      strokeLinecap="round"
                      style={{ filter: "drop-shadow(0 2px 6px rgba(202,0,19,0.4))" }}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div
                      className="text-2xl font-bold"
                      style={{ color: "#000", letterSpacing: "-0.04em" }}
                    >
                      $168
                    </div>
                    <div className="text-xs font-medium" style={{ color: "#000", opacity: 0.45 }}>
                      of $200
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                  paddingTop: "0.875rem",
                  textAlign: "center",
                }}
              >
                <p className="text-sm font-bold" style={{ color: "#CA0013" }}>
                  $32 remaining
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div >
    </div >
  );
}