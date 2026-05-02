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
    setStatus("Sign up complete. Check your email to verify before signing in.");
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
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{ backgroundColor: "#EEEBE3" }}
    >
      <div
        className="max-w-md w-full rounded-3xl p-8 border"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#d6d2c9",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold" style={{ color: "#000000" }}>
            FlatTrack Login
          </h1>
          <p className="text-sm mt-2" style={{ color: "#6b6760" }}>
            Use your Supabase account to sign in and connect to the backend.
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            className="flex-1 py-3 rounded-2xl font-semibold transition-colors"
            style={
              mode === "login"
                ? { backgroundColor: "#CA0013", color: "#ffffff" }
                : { backgroundColor: "#EEEBE3", color: "#000000" }
            }
            onClick={() => setMode("login")}
          >
            Log in
          </button>
          <button
            type="button"
            className="flex-1 py-3 rounded-2xl font-semibold transition-colors"
            style={
              mode === "signup"
                ? { backgroundColor: "#CA0013", color: "#ffffff" }
                : { backgroundColor: "#EEEBE3", color: "#000000" }
            }
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium" style={{ color: "#000000" }}>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl px-4 py-3 focus:outline-none focus:ring-2"
              style={{
                border: "1px solid #c8c4bc",
                backgroundColor: "#EEEBE3",
                color: "#000000",
                // @ts-ignore
                "--tw-ring-color": "#CA0013",
              }}
              placeholder="you@example.com"
            />
          </label>

          <label className="block text-sm font-medium" style={{ color: "#000000" }}>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl px-4 py-3 focus:outline-none focus:ring-2"
              style={{
                border: "1px solid #c8c4bc",
                backgroundColor: "#EEEBE3",
                color: "#000000",
                // @ts-ignore
                "--tw-ring-color": "#CA0013",
              }}
              placeholder="Enter a secure password"
            />
          </label>

          {error ? (
            <div className="text-sm" style={{ color: "#CA0013" }}>
              {error}
            </div>
          ) : null}
          {status ? (
            <div className="text-sm" style={{ color: "#1a7a3c" }}>
              {status}
            </div>
          ) : null}

          <button
            type="submit"
            className="w-full py-3 rounded-2xl font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#CA0013", color: "#ffffff" }}
          >
            {mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>

        {userEmail ? (
          <div className="space-y-3 mt-4">
            <div className="text-sm" style={{ color: "#000000" }}>
              Logged in as <span className="font-semibold">{userEmail}</span>
            </div>
            <button
              type="button"
              className="w-full py-3 rounded-2xl font-semibold border transition-colors hover:opacity-80"
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                borderColor: "#000000",
              }}
              onClick={signOut}
            >
              Log out
            </button>
          </div>
        ) : null}

        <div className="mt-6 pt-6 space-y-4" style={{ borderTop: "1px solid #d6d2c9" }}>
          <button
            type="button"
            className="w-full py-3 rounded-2xl font-semibold border transition-colors hover:opacity-80"
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              borderColor: "#000000",
            }}
            onClick={testBackend}
          >
            Test backend auth
          </button>
          <button
            type="button"
            className="w-full py-3 rounded-2xl font-semibold transition-colors hover:opacity-80"
            style={{ backgroundColor: "#EEEBE3", color: "#000000" }}
            onClick={() => navigate("/app")}
          >
            Continue without login
          </button>
        </div>
      </div>
    </div>
  );
}