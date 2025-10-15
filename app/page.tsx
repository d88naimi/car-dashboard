"use client";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";

export default function Home() {
  const [make, setMake] = useState("");

  const { data, error, isMutating, trigger } = useSWRMutation(
    "/api/cars",
    async (key, { arg }: { arg: string }) => {
      return fetcher(`https://api.api-ninjas.com/v1/cars?make=${arg}`);
    }
  );
  console.log("🚀 ~ Home ~ data:", data);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const vehicleMake = event.target.value;
    setMake(vehicleMake);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    trigger(make);
  };

  if (error) return <div>failed to load</div>;
  if (isMutating) return <div>loading...</div>;

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="my-input">Enter text:</label>
        <input
          id="my-input"
          type="text"
          value={make}
          onChange={handleChange}
          placeholder="Type something..."
        />
        <button type="submit" disabled={isMutating}>
          {isMutating ? "Searching..." : "Search"}
        </button>
      </div>
      Results {data[0].make.toUpperCase()}
    </form>
  );
}
