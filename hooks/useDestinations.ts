"use client";

import { useState, useEffect } from "react";
import { Destination } from "@/types";
import { fetchDestinations } from "@/lib/api";

interface UseDestinationsResult {
  destinations: Destination[];
  loading: boolean;
  error: string | null;
}

export default function useDestinations(): UseDestinationsResult {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchDestinations();
        if (!cancelled) {
          setDestinations(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load destinations"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { destinations, loading, error };
}
