"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import useDestinations from "@/hooks/useDestinations";
import { clearSession, getBookingCode } from "@/lib/auth";
import DestinationCard from "@/components/DestinationCard";
import SearchBar from "@/components/SearchBar";
import { filterDestinations } from "@/lib/filterDestinations";

export default function DestinationsPage() {
  const router = useRouter();
  const { checked, authed } = useAuth({
    requireAuth: true,
    redirectTo: "/login",
  });
  const { destinations, loading, error } = useDestinations();
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => filterDestinations(destinations, search),
    [destinations, search]
  );

  const hasResults = filtered.length > 0;
  const showEmpty = !loading && !error && !hasResults;
  const bookingCode = checked ? getBookingCode() : null;

  function handleLogout() {
    clearSession();
    router.replace("/login");
  }

  if (!checked || !authed) return null;

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center justify-between sm:mb-6">
          <h1 className="text-xl font-bold sm:text-2xl">Destinations</h1>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Log out
          </button>
        </div>

        {bookingCode && (
          <div className="mb-4 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white sm:mb-6">
            Booking Code: {bookingCode}
          </div>
        )}

        {!loading && !error && destinations.length > 0 && (
          <div className="mb-6">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-8 text-center">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {showEmpty && (
          <div className="rounded-lg border border-gray-200 bg-white px-4 py-8 text-center">
            <p className="text-gray-500">
              {search ? "No results found." : "No destinations found."}
            </p>
          </div>
        )}

        {hasResults && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {filtered.map((destination) => (
              <DestinationCard
                key={destination.code}
                destination={destination}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
