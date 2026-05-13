import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories, cities, hiddenGemCities, type Difficulty } from "@/data/activities";

export type FilterState = {
  query: string;
  category: string;
  city: string;
  difficulty: string;
  maxPrice: number;
  minRating: number;
  people: number;
  duration: string;
  sort: string;
};

export const defaultFilters: FilterState = {
  query: "",
  category: "All",
  city: "All",
  difficulty: "All",
  maxPrice: 200,
  minRating: 0,
  people: 0,
  duration: "All",
  sort: "Recommended",
};

const difficulties: ("All" | Difficulty)[] = ["All", "Easy", "Moderate", "Hard", "Extreme"];
const durations = ["All", "Under 1h", "1-3h", "3-6h", "Full day", "Overnight/Weekend"];
const sorts = ["Recommended", "Price: Low to High", "Price: High to Low", "Newest"];
export default function Filters({
  state,
  onChange,
}: {
  state: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const set = <K extends keyof FilterState>(k: K, v: FilterState[K]) => onChange({ ...state, [k]: v });
  const reset = () => onChange(defaultFilters);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Sort by</div>
        <select
          value={state.sort}
          onChange={(e) => set("sort", e.target.value)}
          className="field"
        >
          {sorts.map((s) => <option key={s} value={s} className="bg-cyan-50 text-cyan-950">{s}</option>)}
        </select>
      </div>

      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Category</div>
        <div className="flex flex-wrap gap-1.5">
          {["All", ...categories.map((c) => c.name)].map((c) => (
            <button
              key={c}
              onClick={() => set("category", c)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-full border transition",
                state.category === c
                  ? "rush-gradient text-white border-transparent shadow-md shadow-blue-500/30"
                  : "bg-white/75 text-cyan-800 border-sky-200/80 hover:border-cyan-400/60 hover:text-blue-700"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">City</div>
        <select
          value={state.city}
          onChange={(e) => set("city", e.target.value)}
          className="field"
        >
          <option value="All" className="bg-cyan-50 text-cyan-950">All cities</option>
          {cities.map((c) => <option key={c} value={c} className="bg-cyan-50 text-cyan-950">{c}</option>)}
        </select>
      </div>

      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Difficulty</div>
        <div className="flex flex-wrap gap-1.5">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => set("difficulty", d)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-full border transition",
                state.difficulty === d
                  ? "bg-cyan-300 text-cyan-950 border-transparent font-bold"
                  : "bg-white/75 text-cyan-800 border-sky-200/80 hover:border-cyan-400/60 hover:text-blue-700"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs uppercase tracking-widest text-muted-foreground mb-2">
          <span>Max price</span>
          <span className="rush-text font-bold">${state.maxPrice}</span>
        </div>
        <input
          type="range"
          min={10}
          max={200}
          step={5}
          value={state.maxPrice}
          onChange={(e) => set("maxPrice", Number(e.target.value))}
          className="w-full accent-cyan-400"
        />
        <div className="flex flex-wrap gap-1.5 mt-2">
          {[20, 50, 100, 200].map((p) => (
            <button
              key={p}
              onClick={() => set("maxPrice", p)}
              className={cn(
                "text-xs px-2.5 py-1 rounded-md border",
                state.maxPrice === p ? "bg-cyan-300 text-cyan-950 border-cyan-300 font-bold" : "bg-white/75 text-cyan-800 border-sky-200/80 hover:border-cyan-400/60"
              )}
            >
              {p === 200 ? "$100+" : `Under $${p}`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs uppercase tracking-widest text-muted-foreground mb-2">
          <span>Number of people</span>
          <span className="rush-text font-bold">{state.people === 0 ? "Any" : state.people}</span>
        </div>
        <input
          type="range"
          min={0}
          max={20}
          step={1}
          value={state.people}
          onChange={(e) => set("people", Number(e.target.value))}
          className="w-full accent-cyan-400"
        />
        <div className="flex flex-wrap gap-1.5 mt-2">
          <button
            onClick={() => set("people", 0)}
            className={cn(
              "text-xs px-2.5 py-1 rounded-md border",
              state.people === 0 ? "bg-cyan-300 text-cyan-950 border-cyan-300 font-bold" : "bg-white/75 text-cyan-800 border-sky-200/80 hover:border-cyan-400/60"
            )}
          >
            Any
          </button>
          {[2, 4, 8, 12, 20].map((count) => (
            <button
              key={count}
              onClick={() => set("people", count)}
              className={cn(
                "text-xs px-2.5 py-1 rounded-md border",
                state.people === count ? "bg-cyan-300 text-cyan-950 border-cyan-300 font-bold" : "bg-white/75 text-cyan-800 border-sky-200/80 hover:border-cyan-400/60"
              )}
            >
              {count === 20 ? "20+" : `${count} people`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Duration</div>
        <select
          value={state.duration}
          onChange={(e) => set("duration", e.target.value)}
          className="field"
        >
          {durations.map((d) => <option key={d} value={d} className="bg-cyan-50 text-cyan-950">{d}</option>)}
        </select>
      </div>

      <button
        onClick={reset}
        className="w-full h-11 rounded-lg bg-white/75 border border-sky-200/80 hover:border-cyan-400/60 hover:bg-cyan-50 text-cyan-800 flex items-center justify-center gap-2 text-sm font-bold transition"
      >
        <X className="h-4 w-4" /> Clear all filters
      </button>
    </div>
  );
}

// helper: applies filters + sort
export function applyFilters<T extends {
  name: string; category: string; city: string; difficulty: string;
  price: number; rating: number; duration: string; id: number; tagline: string; description: string;
  minPeople: number; maxPeople: number;
}>(items: T[], state: FilterState): T[] {
  let out = items.filter((a) => {
    if (state.category === "Hidden Gems") {
      if (!hiddenGemCities.includes(a.city)) return false;
    } else if (state.category !== "All" && a.category !== state.category) {
      return false;
    }
    if (state.city !== "All" && a.city !== state.city) return false;
    if (state.difficulty !== "All" && a.difficulty !== state.difficulty) return false;
    if (a.price > state.maxPrice && state.maxPrice < 200) return false;
    if (a.rating < state.minRating) return false;
    if (state.people > 0 && (state.people < a.minPeople || state.people > a.maxPeople)) return false;
    if (state.query) {
      const q = state.query.toLowerCase();
      if (
        !a.name.toLowerCase().includes(q) &&
        !a.city.toLowerCase().includes(q) &&
        !a.category.toLowerCase().includes(q) &&
        !a.tagline.toLowerCase().includes(q)
      )
        return false;
    }
    if (state.duration !== "All") {
      const d = a.duration.toLowerCase();
      if (state.duration === "Under 1h" && !(d.includes("min") || d.includes("20") || d.includes("30") || d.includes("45"))) return false;
      if (state.duration === "1-3h" && !(d.includes("1 hour") || d.includes("1.5") || d.includes("2 hour") || d.includes("3 hour"))) return false;
      if (state.duration === "3-6h" && !(d.includes("3 hour") || d.includes("4 hour") || d.includes("5 hour") || d.includes("6 hour"))) return false;
      if (state.duration === "Full day" && !d.includes("full")) return false;
      if (state.duration === "Overnight/Weekend" && !(d.includes("over") || d.includes("week"))) return false;
    }
    return true;
  });

  switch (state.sort) {
    case "Price: Low to High":
      out = [...out].sort((a, b) => a.price - b.price); break;
    case "Price: High to Low":
      out = [...out].sort((a, b) => b.price - a.price); break;
    case "Newest":
      out = [...out].sort((a, b) => b.id - a.id); break;
  }
  return out;
}
