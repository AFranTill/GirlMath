import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { CheckCircle2, Users, DollarSign, TrendingUp } from "lucide-react";

export function Landing() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EEEBE3", fontFamily: "'Georgia', serif" }}>
      {/* Nav */}
      <nav
        style={{ borderBottom: "2px solid #000" }}
        className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto"
      >
        <div
          className="text-3xl font-bold tracking-tight"
          style={{ color: "#CA0013", letterSpacing: "-0.03em" }}
        >
          FlatTrack
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button
              variant="ghost"
              style={{ color: "#000", fontFamily: "inherit" }}
              className="font-semibold"
            >
              Log in
            </Button>
          </Link>
          <Link to="/login">
            <Button
              style={{
                backgroundColor: "#CA0013",
                color: "#EEEBE3",
                border: "none",
                fontFamily: "inherit",
                borderRadius: "999px",
              }}
              className="font-semibold px-6"
            >
              Sign up
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1
              className="font-bold leading-none"
              style={{
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                color: "#000",
                letterSpacing: "-0.04em",
                lineHeight: "1.0",
              }}
            >
              <span style={{ color: "#CA0013", display: "block", fontSize: "1.1em" }}>
                Flatting?
              </span>
              <span style={{ display: "block", marginTop: "0.15em" }}>
                Not a Problem.
              </span>
            </h1>
            <p
              className="text-lg"
              style={{ color: "#000", opacity: 0.65, maxWidth: "420px", lineHeight: "1.6" }}
            >
              FlatTrack automatically tracks rent, bills, and shared spending.
            </p>
            <div className="flex gap-4">
              <Link to="/login">
                <Button
                  size="lg"
                  style={{
                    backgroundColor: "#CA0013",
                    color: "#EEEBE3",
                    border: "none",
                    fontFamily: "inherit",
                    letterSpacing: "0.02em",
                    borderRadius: "999px",
                    boxShadow: "0 8px 24px rgba(202,0,19,0.35)",
                  }}
                  className="px-8 font-semibold"
                >
                  Get Started Free
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                style={{
                  border: "2px solid #000",
                  color: "#000",
                  backgroundColor: "transparent",
                  fontFamily: "inherit",
                  borderRadius: "999px",
                }}
                className="font-semibold"
              >
                See How It Works
              </Button>
            </div>
          </div>

          {/* Hero Card */}
          <div
            style={{
              backgroundColor: "#fff",
              border: "1.5px solid rgba(0,0,0,0.10)",
              borderRadius: "24px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
            }}
            className="p-8"
          >
            <div className="space-y-4">
              <div
                style={{
                  backgroundColor: "#EEEBE3",
                  border: "1.5px solid rgba(0,0,0,0.10)",
                  borderRadius: "14px",
                }}
                className="flex items-center justify-between p-4"
              >
                <span className="font-bold text-black" style={{ letterSpacing: "0.02em" }}>
                  Rent Status
                </span>
                <span className="font-bold" style={{ color: "#CA0013" }}>
                  2/3 Paid ✓
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Jordan", paid: true },
                  { name: "Morgan", paid: true },
                  { name: "Alex", paid: false },
                ].map(({ name, paid }) => (
                  <div
                    key={name}
                    style={{
                      backgroundColor: paid ? "#EEEBE3" : "#fff",
                      border: `1.5px solid ${paid ? "rgba(0,0,0,0.10)" : "rgba(202,0,19,0.35)"}`,
                      borderRadius: "14px",
                      boxShadow: paid ? "none" : "0 2px 12px rgba(202,0,19,0.08)",
                    }}
                    className="flex items-center gap-3 p-3"
                  >
                    <div
                      style={{
                        backgroundColor: paid ? "#000" : "#CA0013",
                        color: "#EEEBE3",
                        borderRadius: "10px",
                        boxShadow: paid
                          ? "0 2px 8px rgba(0,0,0,0.25)"
                          : "0 2px 8px rgba(202,0,19,0.35)",
                      }}
                      className="w-9 h-9 flex items-center justify-center font-bold text-sm"
                    >
                      {name[0]}
                    </div>
                    <span className="flex-1 font-medium text-black">{name}</span>
                    {paid ? (
                      <CheckCircle2 className="w-5 h-5" style={{ color: "#000" }} />
                    ) : (
                      <span className="text-sm font-bold" style={{ color: "#CA0013" }}>
                        Pending
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <DollarSign className="w-6 h-6" style={{ color: "#EEEBE3" }} />,
                title: "Automatic Rent Tracking",
                desc: "Connect your flat account and instantly see who's paid.",
                badge: "All Paid ✅",
              },
              {
                icon: <TrendingUp className="w-6 h-6" style={{ color: "#EEEBE3" }} />,
                title: "Shared Expense Tracking",
                desc: "Log and track shared costs like groceries in one place.",
                badge: "On Track",
              },
              {
                icon: <Users className="w-6 h-6" style={{ color: "#EEEBE3" }} />,
                title: "Clear Payment Status",
                desc: "No confusion—everyone can see what's owed at a glance.",
                badge: null,
                progress: true,
              },
            ].map(({ icon, title, desc, badge, progress }) => (
              <div
                key={title}
                style={{
                  backgroundColor: "#fff",
                  border: "1.5px solid rgba(0,0,0,0.08)",
                  borderRadius: "24px",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
                }}
                className="p-8"
              >
                <div
                  style={{
                    backgroundColor: "#CA0013",
                    borderRadius: "14px",
                    boxShadow: "0 6px 20px rgba(202,0,19,0.35)",
                  }}
                  className="w-11 h-11 flex items-center justify-center mb-5"
                >
                  {icon}
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "#000", letterSpacing: "-0.02em" }}
                >
                  {title}
                </h3>
                <p style={{ color: "#000", opacity: 0.6, lineHeight: "1.6" }}>{desc}</p>
                <div
                  style={{
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                    marginTop: "1.5rem",
                    paddingTop: "1.25rem",
                  }}
                >
                  {badge && (
                    <span className="text-sm font-bold" style={{ color: "#000" }}>
                      {badge}
                    </span>
                  )}
                  {progress && (
                    <div
                      style={{
                        backgroundColor: "#EEEBE3",
                        borderRadius: "999px",
                        overflow: "hidden",
                      }}
                      className="h-2"
                    >
                      <div
                        style={{
                          backgroundColor: "#CA0013",
                          width: "66%",
                          borderRadius: "999px",
                        }}
                        className="h-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-8 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="font-bold mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#000", letterSpacing: "-0.03em" }}
          >
            How It Works
          </h2>
          <p style={{ color: "#000", opacity: 0.55, fontSize: "1.125rem" }}>
            No spreadsheets. No reminders. No stress.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-20">
          {[
            { n: "1", title: "Connect flat account", sub: "Secure integration with Akahu API" },
            { n: "2", title: "Invite flatmates via link", sub: "Share a simple invite link with your flat" },
            { n: "3", title: "Track payments automatically", sub: "Sit back and let FlatTrack do the work" },
          ].map(({ n, title, sub }) => (
            <div key={n} className="text-center">
              <div
                style={{
                  backgroundColor: "#CA0013",
                  color: "#EEEBE3",
                  borderRadius: "999px",
                  width: "56px",
                  height: "56px",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  boxShadow: "0 8px 24px rgba(202,0,19,0.40)",
                }}
                className="flex items-center justify-center mx-auto mb-5"
              >
                {n}
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "#000", letterSpacing: "-0.02em" }}
              >
                {title}
              </h3>
              <p style={{ color: "#000", opacity: 0.55 }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          style={{
            backgroundColor: "#CA0013",
            borderRadius: "28px",
            boxShadow: "0 24px 64px rgba(202,0,19,0.35), 0 6px 20px rgba(0,0,0,0.10)",
          }}
          className="p-14 text-center"
        >
          <h2
            className="font-bold mb-6"
            style={{
              color: "#EEEBE3",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Start your stress-free flat
          </h2>
          <Link to="/app">
            <Button
              size="lg"
              style={{
                backgroundColor: "#EEEBE3",
                color: "#000",
                border: "none",
                fontFamily: "inherit",
                fontWeight: "700",
                letterSpacing: "0.02em",
                borderRadius: "999px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.20)",
              }}
              className="px-10 transition-all hover:-translate-y-0.5"
            >
              Create Your Flat
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}