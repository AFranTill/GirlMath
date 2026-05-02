import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { CheckCircle2, Users, DollarSign, TrendingUp } from "lucide-react";

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ebdebe] via-white to-[#f7c884]">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-slate-800">FlatTrack</div>
        <div className="flex items-center gap-4">
          <Link to="/app">
            <Button variant="ghost" className="text-slate-700">
              Log in
            </Button>
          </Link>
          <Link to="/app">
            <Button variant="outline" className="border-slate-300 text-slate-700">
              Sign up
            </Button>
          </Link>
        </div>
      </nav>

      <section className="px-8 py-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-slate-900 leading-tight">
              No more chasing rent. No more awkward money talks.
            </h1>
            <p className="text-xl text-slate-600">
              FlatTrack automatically tracks rent, bills, and shared spending—so your flat just
              works.
            </p>
            <div className="flex gap-4">
              <Link to="/app">
                <Button
                  size="lg"
                  className="bg-[#e19696] hover:bg-[#d18585] text-white px-8"
                >
                  Get Started Free
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 text-slate-700"
              >
                See How It Works
              </Button>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/40">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#c5c09a]/20 to-[#f7c884]/20 rounded-xl">
                <span className="font-semibold text-slate-800">Rent Status</span>
                <span className="text-emerald-600 font-bold">2/3 Paid ✓</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                    J
                  </div>
                  <span className="flex-1 text-slate-700">Jordan</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <span className="flex-1 text-slate-700">Morgan</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <span className="flex-1 text-slate-700">Alex</span>
                  <span className="text-amber-600 text-sm font-semibold">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-20 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/60">
              <div className="w-12 h-12 bg-[#e19696] rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Automatic Rent Tracking
              </h3>
              <p className="text-slate-600">
                Connect your flat account and instantly see who's paid.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="inline-flex items-center gap-2 text-sm text-emerald-600 font-semibold">
                  All Paid ✅
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/60">
              <div className="w-12 h-12 bg-[#c5c09a] rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Shared Expense Tracking
              </h3>
              <p className="text-slate-600">
                Log and track shared costs like groceries in one place.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="text-sm text-slate-600">
                  Flat Status: <span className="font-semibold text-slate-800">On Track</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/60">
              <div className="w-12 h-12 bg-[#f7c884] rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Clear Payment Status</h3>
              <p className="text-slate-600">
                No confusion—everyone can see what's owed at a glance.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-emerald-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-xl text-slate-600">
            No spreadsheets. No reminders. No stress.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#e19696] to-[#f7c884] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Connect flat account
            </h3>
            <p className="text-slate-600">Secure integration with Akahu API</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#c5c09a] to-[#e19696] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Invite flatmates via link</h3>
            <p className="text-slate-600">Share a simple invite link with your flat</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#f7c884] to-[#c5c09a] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Track payments automatically
            </h3>
            <p className="text-slate-600">Sit back and let FlatTrack do the work</p>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-[#e19696] to-[#f7c884] rounded-3xl p-12 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Start your stress-free flat</h2>
          <Link to="/app">
            <Button
              size="lg"
              className="bg-white text-slate-800 hover:bg-slate-100 px-8"
            >
              Create Your Flat
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
