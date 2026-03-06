"use client";

import useAuth from "@/hooks/useAuth";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const { checked, authed } = useAuth({
    requireAuth: false,
    redirectTo: "/destinations",
  });

  if (!checked || authed) return null;

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Welcome to TripX
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
