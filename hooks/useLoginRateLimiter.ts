"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const MAX_ATTEMPTS = 3;
const LOCKOUT_SECONDS = 30;

export default function useLoginRateLimiter() {
  const [failCount, setFailCount] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  debugger

  const isLocked = secondsRemaining > 0;

  useEffect(() => {
    if (failCount < MAX_ATTEMPTS) return;

    setSecondsRemaining(LOCKOUT_SECONDS);

    intervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setFailCount(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [failCount]);

  const recordFailure = useCallback(() => {
    setFailCount((prev) => prev + 1);
  }, []);

  const reset = useCallback(() => {
    setFailCount(0);
    setSecondsRemaining(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return { isLocked, secondsRemaining, recordFailure, reset };
}
