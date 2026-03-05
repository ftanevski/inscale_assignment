"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import useLoginRateLimiter from "@/hooks/useLoginRateLimiter";
import Notification from "@/components/Notification";

const ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "Incorrect username or password.",
  server_error: "Temporary server issue. Please try again.",
  network_error: "Something went wrong. Please check your connection.",
};

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lockoutDismissed, setLockoutDismissed] = useState(false);
  const { isLocked, secondsRemaining, recordFailure, reset } =
    useLoginRateLimiter();

  useEffect(() => {
    if (isLocked) {
      setError(null);
      setLockoutDismissed(false);
    }
  }, [isLocked]);

  const disabled = loading || isLocked;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isLocked) return;

    setError(null);
    setLoading(true);

    const result = await login(username, password);

    if (result.success) {
      reset();
      router.push("/destinations");
      return;
    }

    recordFailure();
    setError(ERROR_MESSAGES[result.error!] ?? "An unexpected error occurred.");
    setLoading(false);
  }

  function handleDismissLockout() {
    setLockoutDismissed(true);
  }

  return (
    <>
      {isLocked && !lockoutDismissed && (
        <Notification
          message={`Too many failed attempts. Try again in ${secondsRemaining}s.`}
          type="info"
          autoDismissMs={0}
          onDismiss={handleDismissLockout}
        />
      )}

      {error && !isLocked && (
        <Notification
          message={error}
          type="error"
          onDismiss={() => setError(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="mb-1 block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            disabled={disabled}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            disabled={disabled}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Signing in…" : isLocked ? `Locked (${secondsRemaining}s)` : "Sign in"}
        </button>
      </form>
    </>
  );
}
