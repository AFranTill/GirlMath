import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { supabase } from "../../lib/supabaseClient";

export function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserEmail(data.session?.user?.email ?? null);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => data?.subscription?.unsubscribe();
  }, []);

  const backendUrl = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus(null);

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    if (mode === "login") {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        return;
      }
      setUserEmail(data.user?.email ?? null);
      setStatus("Logged in successfully. Redirecting to app...");
      setTimeout(() => navigate("/app"), 450);
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setUserEmail(data.user?.email ?? null);
    setStatus(
      "Sign up complete. Check your email to verify before signing in."
    );
  }

  async function signOut() {
    setError(null);
    setStatus(null);

    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message);
      return;
    }

    setUserEmail(null);
    setStatus("Signed out successfully.");
  }

  async function testBackend() {
    setError(null);
    setStatus(null);

    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) {
      setError("No active session found. Please log in first.");
      return;
    }

    const response = await fetch(`${backendUrl}/api/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? `Backend returned ${response.status}`);
      return;
    }

    const body = await response.json();
    setStatus(`Backend auth successful: ${body.email || body.uid}`);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 border border-slate-200">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">FlatTrack Login</h1>
          <p className="text-sm text-slate-500 mt-2">
            Use your Supabase account to sign in and connect to the backend.
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            className={
              "flex-1 py-3 rounded-2xl font-semibold " +
              (mode === "login"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600")
            }
            onClick={() => setMode("login")}
          >
            Log in
          </button>
          <button
            type="button"
            className={
              "flex-1 py-3 rounded-2xl font-semibold " +
              (mode === "signup"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600")
            }
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="you@example.com"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="Enter a secure password"
            />
          </label>

          {error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : null}
          {status ? (
            <div className="text-sm text-emerald-600">{status}</div>
          ) : null}

          <Button className="w-full py-3" type="submit">
            {mode === "login" ? "Log in" : "Create account"}
          </Button>
        </form>

        {userEmail ? (
          <div className="space-y-3">
            <div className="text-sm text-slate-600">
              Logged in as <span className="font-semibold">{userEmail}</span>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full py-3"
              onClick={signOut}
            >
              Log out
            </Button>
          </div>
        ) : null}

        <div className="mt-6 border-t border-slate-200 pt-6 space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full py-3"
            onClick={testBackend}
          >
            Test backend auth
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full py-3"
            onClick={() => navigate("/app")}
          >
            Continue without login
          </Button>
        </div>
      </div>
    </div>
  );
}
