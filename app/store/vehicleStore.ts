import { create } from "zustand";

interface VehicleState {
  year: string;
  make: string;
  model: string;
  searchResults: any[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setYear: (year: string) => void;
  setMake: (make: string) => void;
  setModel: (model: string) => void;
  searchVehicles: () => Promise<void>;
  resetFilters: () => void;
}

export const useVehicleStore = create<VehicleState>((set, get) => ({
  // Initial state
  year: "",
  make: "",
  model: "",
  searchResults: [],
  isLoading: false,
  error: null,

  // Actions
  setYear: (year) => set({ year, model: "" }), // Reset model when year changes

  setMake: (make) => set({ make, model: "" }), // Reset model when make changes

  setModel: (model) => set({ model }),

  searchVehicles: async () => {
    const { year, make, model } = get();

    if (!year || !make || !model) {
      set({ error: "Please select year, make, and model" });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await fetch(
        `/api/trims?year=${year}&make=${encodeURIComponent(
          make
        )}&model=${encodeURIComponent(model)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch vehicles");
      }

      const data = await response.json();
      set({ searchResults: data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },

  resetFilters: () =>
    set({
      year: "",
      make: "",
      model: "",
      searchResults: [],
      error: null,
    }),
}));
