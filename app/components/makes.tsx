"use client";

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

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
  const { data, error, isLoading } = useSWR("/api/makes", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  return (
    <select
      id="make"
      value={value}
      onChange={onChange}
      className="w-full pb-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black transition-shadow"
    >
      <option value="">Select Make</option>
      {data?.map(({ label, id }: CarMakeDataWithIdProps) => (
        <option key={id} value={label}>
          {label}
        </option>
      ))}
    </select>
  );
}
