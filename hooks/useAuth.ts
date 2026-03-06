"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

interface UseAuthOptions {
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function useAuth({
  requireAuth = true,
  redirectTo,
}: UseAuthOptions = {}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const authenticated = isAuthenticated();
    setAuthed(authenticated);

    if (requireAuth && !authenticated && redirectTo) {
      router.replace(redirectTo);
    } else if (!requireAuth && authenticated && redirectTo) {
      router.replace(redirectTo);
    }

    setChecked(true);
  }, [requireAuth, redirectTo, router]);

  return { checked, authed };
}
