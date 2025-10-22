import { carMakesData } from "@/app/components/utils/makes";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    // Add IDs to each car make
    const carMakesWithIds = carMakesData.map((make) => ({
      id: uuidv4(),
      ...make,
    }));

    return NextResponse.json(carMakesWithIds);
  } catch (error) {
    console.error("Error fetching car makes:", error);
    return NextResponse.json(
      { error: "Failed to fetch car makes" },
      { status: 500 }
    );
  }
}
