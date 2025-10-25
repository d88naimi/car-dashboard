"use client";
import { useState } from "react";

import YearDropdown from "./components/yearSelect";
import MakeDropdown from "./components/makes";
import ModelDropdown from "./components/utils/model";

export default function Home() {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

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

  const handleVehicleModelChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setModel(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

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
              <label className="block text-slate-700 text-sm font-medium mb-2">
                Year
              </label>
              <YearDropdown value={year} onChange={handleVehicleYearChange} />
            </div>

            <div className="pb-4">
              <label className="block text-slate-700 text-sm font-medium mb-2">
                Make
              </label>
              <MakeDropdown value={make} onChange={handleVehicleMakeChange} />
            </div>
            <ModelDropdown
              value={model}
              year={year}
              make={make}
              onChange={handleVehicleModelChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
