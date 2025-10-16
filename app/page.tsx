"use client";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import GeometricSpinner from "./components/loadingSpinner";

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
  const [make, setMake] = useState("");

  const { data, error, isMutating, trigger } = useSWRMutation(
    "/api/cars",
    async (key, { arg }: { arg: string }) => {
      return fetcher(`https://api.api-ninjas.com/v1/cars?make=${arg}`);
    }
  );

  const carsWithId = data?.map((car: Car, index: number) => ({
    ...car,
    id: `${car.make}-${car.model}-${car.year}-${index}`,
  }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const vehicleMake = event.target.value;
    setMake(vehicleMake);
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
            <label
              htmlFor="my-input"
              className="block text-black text-sm font-medium text-slate-700 mb-2"
            >
              Search for a car make
            </label>
            <input
              id="my-input"
              type="text"
              value={make}
              onChange={handleChange}
              placeholder="e.g., Toyota, Honda, Ford..."
              className="w-full px-4 py-3 border text-black border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={isMutating}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isMutating ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Results */}
      {carsWithId && carsWithId.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {carsWithId.map((car) => (
              <div
                key={car.id}
                className="border border-slate-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-lg text-slate-900 mb-3">
                  {car.make} {car.model} ({car.year})
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
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
