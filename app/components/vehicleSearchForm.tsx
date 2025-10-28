"use client";

import YearDropdown from "./yearSelect";
import MakeDropdown from "./makes";
import ModelDropdown from "./utils/model";

import GeometricSpinner from "./loadingSpinner";
import { useVehicleStore } from "../store/vehicleStore";

export default function VehicleSearchForm() {
  // Subscribe only to what you need
  const year = useVehicleStore((state) => state.year);
  const make = useVehicleStore((state) => state.make);
  const model = useVehicleStore((state) => state.model);
  const isLoading = useVehicleStore((state) => state.isLoading);

  // Actions don't cause re-renders
  const setYear = useVehicleStore((state) => state.setYear);
  const setMake = useVehicleStore((state) => state.setMake);
  const setModel = useVehicleStore((state) => state.setModel);
  const searchVehicles = useVehicleStore((state) => state.searchVehicles);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchVehicles();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 space-y-4">
          {/* Year */}
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Year
            </label>
            <YearDropdown
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          {/* Make */}
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Make
            </label>
            <MakeDropdown
              value={make}
              onChange={(e) => setMake(e.target.value)}
            />
          </div>

          {/* Model */}
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Model
            </label>
            <ModelDropdown
              value={model}
              year={year}
              make={make}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={!year || !make || !model || isLoading}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <GeometricSpinner /> : "Search"}
          </button>
        </div>
      </div>
    </form>
  );
}
