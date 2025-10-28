"use client";

import { useVehicleStore } from "../store/vehicleStore";
import { capitalizeWords } from "./utils/helpers";

export default function VehicleResults() {
  const searchResults = useVehicleStore((state) => state.searchResults);
  const isLoading = useVehicleStore((state) => state.isLoading);
  const error = useVehicleStore((state) => state.error);
  const year = useVehicleStore((state) => state.year);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        Found {searchResults.length}{" "}
        {searchResults.length === 1 ? "vehicle" : "vehicles"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((vehicle: any) => (
          <div
            key={vehicle.id}
            className="border border-slate-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-lg text-slate-900 mb-2">
              {capitalizeWords(vehicle.make)} {capitalizeWords(vehicle.model)}
            </h3>
            {year && <p className="text-sm text-slate-500">Year: {year}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
