import Image from "next/image";
import { Destination } from "@/types";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={destination.thumbnail}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-3 sm:p-4">
        <h2 className="truncate text-base font-semibold sm:text-lg">
          {destination.name}
        </h2>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          {destination.countHotels} hotels &middot;{" "}
          {destination.countDestinations} destinations
        </p>
      </div>
    </div>
  );
}
