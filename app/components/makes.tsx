"use client";

import { v4 as uuidv4 } from "uuid";
import { CarMakeData, carMakesData } from "./utils/makes";

export interface CarMakeDataWithIdProps {
  id: string;
  value: string;
  label: string;
  country: string;
}

export default function MakeDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const carMakesDataWithId = carMakesData.map((make) => {
    return {
      ...make,
      id: uuidv4(),
    };
  });
  console.log("🚀 ~ MakeDropdown ~ carMakesDataWithId:", carMakesDataWithId);

  return (
    <select
      id="year-make"
      value={value}
      onChange={onChange}
      className="w-full pb-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-shadow"
    >
      <option value="">Select Make</option>
      {carMakesDataWithId?.map(({ label, id }: CarMakeDataWithIdProps) => (
        <option key={id} value={label}>
          {label}
        </option>
      ))}
    </select>
  );
}
