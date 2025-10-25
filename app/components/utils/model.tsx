// components/modelSelect.tsx
"use client";

import useSWR from "swr";
import GeometricSpinner from "../loadingSpinner";

interface ModelDropdownProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  year: string;
  make: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ModelDropdown({
  value,
  onChange,
  year,
  make,
}: ModelDropdownProps) {
  // Only fetch if both year and make are selected
  const shouldFetch = year && make;

  const { data, error, isLoading } = useSWR(
    shouldFetch
      ? `/api/models?year=${year}&make=${encodeURIComponent(make)}`
      : null,
    fetcher
  );

  if (!year || !make) {
    return (
      <select
        value={value}
        onChange={onChange}
        disabled
        className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
      >
        <option value="">Select year and make first</option>
      </select>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white flex items-center justify-center">
        <GeometricSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <select
        value={value}
        onChange={onChange}
        disabled
        className="w-full px-4 py-3 border border-red-300 rounded-lg bg-red-50"
      >
        <option value="">Error loading models</option>
      </select>
    );
  }

  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-shadow"
    >
      <option value="">Select Model</option>
      {data?.map((model: any) => (
        <option key={model.id} value={model.model}>
          {model.model}
        </option>
      ))}
    </select>
  );
}
