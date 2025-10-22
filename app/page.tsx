"use client";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import GeometricSpinner from "./components/loadingSpinner";
import { capitalizeWords } from "./components/utils/helpers";
import YearDropdown from "./components/yearSelect";
import MakeDropdown from "./components/makes";

interface Car {
  id: string;
  city_mpg: string | number;
  class: string;
  combination_mpg: string | number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: string | number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export default function Home() {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [search, setSearch] = useState("");

  const { data, error, isMutating, trigger } = useSWRMutation(
    "/api/cars",
    async (key, { arg }: { arg: { make: string; year: string } }) => {
      // const params = new URLSearchParams();
      // if (arg.make) params.append("make", arg.make.toLowerCase());
      // if (arg.year) params.append("year", arg.year);

      return fetcher(`https://api.api-ninjas.com/v1/cars?model=${make}`);
    }
  );

  const carsWithId = data?.map((car: Car, index: number) => ({
    ...car,
    id: `${car.make}-${car.model}-${car.year}-${index}`,
  }));

  const handleVehicleYearChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setYear(event.target.value);
  };
  const handleVehicleMakeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMake(event.target.value);
  };

  const handleVehicleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    trigger(make);
  };

  if (error) return <div>failed to load</div>;
  if (isMutating) return <GeometricSpinner />;

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <form
        onSubmit={handleFormSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="pb-4">
              {/* Year Dropdown */}
              <label className="block text-slate-700 text-sm font-medium mb-2">
                Year
              </label>
              <YearDropdown value={year} onChange={handleVehicleYearChange} />
            </div>

            {/* Make Dropdown */}
            <div className="pb-4">
              <label className="block text-slate-700 text-sm font-medium mb-2">
                Car Make
              </label>
              <MakeDropdown value={make} onChange={handleVehicleMakeChange} />
            </div>

            {/* Search Input */}
            <div>
              <label
                htmlFor="my-input"
                className="block text-slate-700 text-sm font-medium mb-2"
              >
                Or search by model
              </label>
              <input
                id="my-input"
                type="text"
                value={search}
                onChange={handleVehicleSearchChange}
                placeholder="e.g., Camry, Accord, Mustang..."
                className="w-full px-4 py-3 border border-slate-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={isMutating}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isMutating ? <GeometricSpinner /> : "Search"}
            </button>
          </div>
        </div>
      </form>

      {/* Results */}
      {carsWithId && carsWithId.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {carsWithId.map((car: Car) => (
              <div
                key={car.id}
                className="border border-slate-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-lg text-slate-900 mb-3">
                  {capitalizeWords(car.make)} {capitalizeWords(car.model)} (
                  {car.year})
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex justify-between">
                    <span className="font-medium">Class:</span>
                    <span>{car.class}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">MPG:</span>
                    <span>{car.combination_mpg}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Cylinders:</span>
                    <span>{car.cylinders}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Displacement:</span>
                    <span>{car.displacement}L</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Transmission:</span>
                    <span>{car.transmission}L</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Displacement:</span>
                    <span>{car.displacement}L</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
