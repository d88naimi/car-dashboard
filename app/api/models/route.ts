// This a  BE call that fetches car models based on make and year
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const make = searchParams.get("make");
    const year = searchParams.get("year");

    if (!make) {
      return NextResponse.json({ error: "Make is required" }, { status: 400 });
    }

    // Use NHTSA API (completely free!)
    const apiUrl = year
      ? `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(
          make
        )}/modelyear/${year}?format=json`
      : `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${encodeURIComponent(
          make
        )}?format=json`;

    console.log("Fetching from:", apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: `API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // NHTSA returns data in "Results" array
    const models = data.Results.map((item: any, index: number) => ({
      id: `${item.Make_Name}-${item.Model_Name}-${index}`,
      make: item.Make_Name,
      model: item.Model_Name,
      makeId: item.Make_ID,
      modelId: item.Model_ID,
    }));

    return NextResponse.json(models);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
