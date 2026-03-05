import Image from "next/image";
import { Destination } from "@/types";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={destination.thumbnail}
          alt={destination.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{destination.name}</h2>
        <p className="mt-1 text-sm text-gray-500">
          {destination.countHotels} hotels &middot;{" "}
          {destination.countDestinations} destinations
        </p>
      </div>
    </div>
  );
}
