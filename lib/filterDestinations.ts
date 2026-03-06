import { Destination } from "@/types";

export function filterDestinations(
  destinations: Destination[],
  query: string
): Destination[] {
  const term = query.trim().toLowerCase();
  if (!term) return destinations;

  return destinations.filter((country) => {
    if (country.name.toLowerCase().includes(term)) return true;

    return country.destinations.some(
      (sub) =>
        sub.name.toLowerCase().includes(term) ||
        sub.alias.some((a) => a.toLowerCase().includes(term))
    );
  });
}
