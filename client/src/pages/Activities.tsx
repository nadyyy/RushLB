import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Search, SlidersHorizontal, LayoutGrid, List, X } from "lucide-react";
import Layout from "@/components/site/Layout";
import ActivityCard from "@/components/site/ActivityCard";
import Filters, { FilterState, applyFilters, defaultFilters } from "@/components/site/Filters";
import { activities } from "@/data/activities";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function ActivitiesPage() {
  const [location] = useLocation();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const [state, setState] = useState<FilterState>(() => {
    const url = typeof window !== "undefined" ? new URL(window.location.href) : null;
    const sp = url?.searchParams;
    return {
      ...defaultFilters,
      query: sp?.get("q") ?? "",
      category: sp?.get("category") ?? "All",
      city: sp?.get("city") ?? "All",
      maxPrice: sp?.get("budget") === "under20" ? 20 : defaultFilters.maxPrice,
    };
  });

  // Re-sync when URL changes
  useEffect(() => {
    const url = new URL(window.location.href);
    const sp = url.searchParams;
    setState((s) => ({
      ...s,
      query: sp.get("q") ?? s.query,
      category: sp.get("category") ?? s.category,
      city: sp.get("city") ?? s.city,
      maxPrice: sp.get("budget") === "under20" ? 20 : s.maxPrice,
    }));
  }, [location]);

  useEffect(() => {
    if (!filterPanelOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [filterPanelOpen]);

  const results = useMemo(() => applyFilters(activities, state), [state]);

  return (
    <Layout>
      <div className="activities-page">
        <section className="activities-hero relative overflow-hidden">
          <div className="container activities-hero-content py-10 lg:py-14">
            <div className="home-section-kicker mb-2">All adventures</div>
            <h1 className="font-display text-4xl tracking-wide text-slate-950 sm:text-5xl lg:text-6xl">
              <span className="sm:hidden">FIND YOUR RUSH</span>
              <span className="hidden sm:inline">EXPLORE LEBANON</span>
            </h1>
            <p className="mt-1 max-w-xl text-sm text-slate-700 sm:mt-3 sm:text-lg">
              <span className="sm:hidden">Pick a vibe. Go.</span>
              <span className="hidden sm:inline">Filter by city, category, budget and difficulty to find the next thing to do.</span>
            </p>

            <div className="mt-3 flex max-w-4xl flex-col gap-2 sm:mt-6 sm:gap-3 sm:flex-row">
              <div className="home-discovery-search flex-1">
                <div className="flex min-w-0 flex-1 items-center gap-3 px-4">
                  <Search className="h-5 w-5 shrink-0 text-sky-700" />
                  <input
                    value={state.query}
                    onChange={(e) => setState({ ...state, query: e.target.value })}
                    placeholder="Search activities, cities, or experiences..."
                    className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-500 sm:py-4 sm:text-base"
                  />
                  {state.query && (
                    <button
                      onClick={() => setState({ ...state, query: "" })}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={() => setFilterPanelOpen((open) => !open)}
                className="filters-solid-button inline-flex min-h-10 h-auto items-center justify-center gap-2 rounded-full px-4 text-sm font-extrabold text-white transition sm:min-h-14 sm:px-5"
                style={{
                  background: "#0f5f79",
                  backgroundImage: "none",
                  boxShadow: "none",
                  filter: "none",
                  backdropFilter: "none",
                  WebkitBackdropFilter: "none",
                }}
                aria-expanded={filterPanelOpen}
                aria-controls="activities-filter-panel"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
            </div>
          </div>
          <div className="activities-hero-bottom-fade" aria-hidden="true" />
        </section>

        <section className="activities-results-section container">
          <div className="activities-results-shell">
          <div className="mb-5 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              <span className="font-display text-2xl rush-text mr-2">{results.length}</span>
              activit{results.length === 1 ? "y" : "ies"} found
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView("grid")}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg border transition",
                  view === "grid" ? "border-transparent bg-sky-800 text-white" : "border-white/90 bg-white/75 text-sky-900"
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg border transition",
                  view === "list" ? "border-transparent bg-sky-800 text-white" : "border-white/90 bg-white/75 text-sky-900"
                )}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="home-panel p-10 text-center">
              <div className="font-display mb-2 text-2xl text-slate-950">No activities match these filters.</div>
              <p className="text-slate-600">Try clearing some filters or broadening your search.</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {results.map((a) => (
                <ActivityCard key={a.id} activity={a} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((a) => (
                <div key={a.id} className="home-panel flex flex-col gap-4 p-4 transition hover:-translate-y-0.5 sm:flex-row">
                  <div className="relative h-28 flex-shrink-0 overflow-hidden rounded-xl sm:h-auto sm:w-44">
                    <img src={a.image} alt={a.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-white/10" />
                    <div className="absolute bottom-2 left-2 rounded border border-white/80 bg-white/85 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-900">
                      {a.category}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-2">
                    <div>
                      <div className="font-display text-xl text-slate-950">{a.name}</div>
                      <div className="mt-1 flex gap-3 text-xs text-slate-500">
                        <span>{a.city}</span>
                        <span>{a.duration}</span>
                        <span>Star {a.rating}</span>
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-sm text-slate-600">{a.tagline}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-display text-2xl rush-text">${a.price}</div>
                      <a href={`/activity/${a.slug}`} className="flex h-9 items-center rounded-lg bg-sky-800 px-4 text-sm font-bold text-white">
                        View
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          </div>
        </section>

        <AnimatePresence>
          {filterPanelOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/24 backdrop-blur-sm"
              onClick={() => setFilterPanelOpen(false)}
            >
              <motion.div
                id="activities-filter-panel"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-0 right-0 top-0 flex w-[92%] max-w-md flex-col overflow-hidden border-l border-white/80 bg-[#fffaf0] shadow-[-28px_0_70px_-46px_rgba(15,76,92,0.72)]"
                role="dialog"
                aria-modal="true"
                aria-label="Activity filters"
              >
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/80 bg-white/78 p-5 backdrop-blur-xl">
                  <div>
                    <div className="home-section-kicker">Refine results</div>
                    <div className="font-display text-2xl text-slate-950">FILTERS</div>
                  </div>
                  <button
                    onClick={() => setFilterPanelOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/90 bg-white/75 text-slate-700 transition hover:text-slate-950"
                    aria-label="Close filters"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-5">
                  <Filters state={state} onChange={setState} />
                </div>
                <div className="border-t border-white/80 bg-white/78 p-5 backdrop-blur-xl">
                  <button
                    onClick={() => setFilterPanelOpen(false)}
                    className="filters-solid-button inline-flex h-12 w-full items-center justify-center rounded-full px-5 text-sm font-extrabold text-white transition"
                  >
                    Show {results.length} results
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
