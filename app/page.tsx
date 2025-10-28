"use client";

import VehicleSearchForm from "./components/vehicleSearchForm";
import VehicleResults from "./components/vehicleResults";

export default function Home() {
  return (
    <div className="space-y-8">
      <VehicleSearchForm />
      <VehicleResults />
    </div>
  );
}
