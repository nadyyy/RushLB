import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import {
  ArrowRight,
  Bike,
  Clock,
  Compass,
  MapPin,
  Mountain,
  Route,
  Sparkles,
  Waves,
  Wind,
} from "lucide-react";
import Layout from "@/components/site/Layout";
import ActivityCard from "@/components/site/ActivityCard";
import { activities } from "@/data/activities";
import { cn } from "@/lib/utils";

type MapFilter = "All" | "Water" | "Mountain" | "Air" | "Off-Road" | "Budget" | "Near Beirut";

type Region = {
  id: string;
  name: string;
  city: string;
  description: string;
  vibe: string;
  activityCount: number;
  bestCategories: string[];
  exampleActivities: string[];
  bestTime: string;
  distance: string;
  filters: MapFilter[];
  position: [number, number];
  accent: string;
  href: string;
};

const filters: MapFilter[] = ["All", "Water", "Mountain", "Air", "Off-Road", "Budget", "Near Beirut"];

const regions: Region[] = [
  {
    id: "batroun",
    name: "Batroun / North Coast",
    city: "Batroun",
    description: "Salt-stone harbors, clear water, coastal rides, and long golden-hour beach days.",
    vibe: "Best for sunset water days",
    activityCount: 12,
    bestCategories: ["Water Sports", "Sea & Boat Experiences", "Family & Group Activities"],
    exampleActivities: ["Batroun Wakeboarding", "Batroun Sailing Half-Day", "Batroun Coastal Cycling"],
    bestTime: "May to October, especially late afternoon",
    distance: "50 km north of Beirut",
    filters: ["Water", "Budget"],
    position: [34.2553, 35.6581],
    accent: "#0ea5e9",
    href: "/activities?city=Batroun",
  },
  {
    id: "jounieh",
    name: "Jounieh / Keserwan",
    city: "Jounieh",
    description: "A fast coast-to-sky zone with bay views, paragliding launches, and sea sessions close to town.",
    vibe: "Best for quick coast-to-sky escapes",
    activityCount: 8,
    bestCategories: ["Air Adventures", "Water Sports"],
    exampleActivities: ["Paragliding Over Jounieh", "Jet Ski Rush", "Ghosta Sky Flight"],
    bestTime: "March to November on clear wind days",
    distance: "21 km north of Beirut",
    filters: ["Water", "Air", "Near Beirut"],
    position: [33.9808, 35.6178],
    accent: "#f97316",
    href: "/activities?city=Jounieh",
  },
  {
    id: "beirut",
    name: "Beirut",
    city: "Beirut",
    description: "Urban adventure basecamp: rooftop wellness, city rides, indoor challenges, and sea-edge sessions.",
    vibe: "Best for spontaneous city plans",
    activityCount: 9,
    bestCategories: ["Family & Group Activities", "Water Sports", "Wellness & Escape"],
    exampleActivities: ["Escape Room Beirut", "Beirut Night Bike Tour", "Raouche Paddle Board"],
    bestTime: "All year, with sunset slots in spring and summer",
    distance: "0 km from Beirut",
    filters: ["Water", "Budget", "Near Beirut"],
    position: [33.8938, 35.5018],
    accent: "#0369a1",
    href: "/activities?city=Beirut",
  },
  {
    id: "mount-lebanon",
    name: "Mount Lebanon",
    city: "Chouf",
    description: "Green ridges, forest hikes, camping nights, rope parks, and mountain villages within easy reach.",
    vibe: "Best for mountain escapes",
    activityCount: 16,
    bestCategories: ["Hiking & Nature", "Mountain Activities", "Wellness & Escape"],
    exampleActivities: ["Chouf Cedar Sunset Hike", "Aley Forest Camping", "Horseback Ride in Deir El Qamar"],
    bestTime: "April to June and September to November",
    distance: "25-55 km from Beirut",
    filters: ["Mountain", "Budget", "Near Beirut"],
    position: [33.7000, 35.6500],
    accent: "#15803d",
    href: "/activities?city=Chouf",
  },
  {
    id: "cedars",
    name: "Cedars / North Mountains",
    city: "Cedars",
    description: "High-altitude cedar forests, snow routes, big valley views, and cooler summer mountain air.",
    vibe: "Best for alpine air and winter days",
    activityCount: 10,
    bestCategories: ["Snow & Winter", "Mountain Activities", "Hiking & Nature"],
    exampleActivities: ["Cedars Snowmobile Tour", "Cedars Off-Piste Ski Tour", "Qadisha Valley Trek"],
    bestTime: "December to March for snow, June to October for trails",
    distance: "120 km north of Beirut",
    filters: ["Mountain", "Off-Road"],
    position: [34.2497, 36.0492],
    accent: "#166534",
    href: "/activities?city=Cedars",
  },
  {
    id: "tyre",
    name: "Tyre / South Coast",
    city: "Tyre",
    description: "Wide beaches, relaxed southern coast energy, snorkeling, boat days, and easy family rides.",
    vibe: "Best for slow beach adventures",
    activityCount: 7,
    bestCategories: ["Water Sports", "Sea & Boat Experiences", "Family & Group Activities"],
    exampleActivities: ["Tyre Snorkeling Trail", "Tyre Beach Horseback Ride", "Saida Sea Discovery Tour"],
    bestTime: "May to October, mornings for calm water",
    distance: "80 km south of Beirut",
    filters: ["Water", "Budget"],
    position: [33.2733, 35.1939],
    accent: "#0891b2",
    href: "/activities?city=Tyre",
  },
  {
    id: "bekaa",
    name: "Bekaa Valley",
    city: "Zahle",
    description: "Open valley roads, vineyards, balloon flights, big skies, and warm inland day trips.",
    vibe: "Best for valley road trips",
    activityCount: 6,
    bestCategories: ["Air Adventures", "Wellness & Escape", "Off-Road & Motorsports"],
    exampleActivities: ["Bekaa Hot Air Balloon", "Bekaa Wine Tour", "Bekaa Desert Quad Ride"],
    bestTime: "April to June and September to October",
    distance: "55 km east of Beirut",
    filters: ["Air", "Off-Road"],
    position: [33.8463, 35.9019],
    accent: "#d97706",
    href: "/activities?city=Zahle",
  },
];

const regionInitials: Record<string, string> = {
  batroun: "BT",
  jounieh: "JN",
  beirut: "BE",
  "mount-lebanon": "ML",
  cedars: "CD",
  tyre: "TY",
  bekaa: "BK",
};

const filterIcons: Record<MapFilter, typeof Compass> = {
  All: Compass,
  Water: Waves,
  Mountain,
  Air: Wind,
  "Off-Road": Bike,
  Budget: Sparkles,
  "Near Beirut": MapPin,
};

const createRegionIcon = (region: Region, isActive: boolean, isVisible: boolean) => L.divIcon({
  className: "leaflet-region-marker-shell",
  html: `
    <div class="leaflet-region-marker ${isActive ? "leaflet-region-marker-active" : ""} ${!isVisible ? "leaflet-region-marker-muted" : ""}" style="--marker-color: ${region.accent}">
      <span class="leaflet-region-marker-pin"><span>${regionInitials[region.id]}</span></span>
      <span class="leaflet-region-marker-label">${region.name.split(" / ")[0]}</span>
    </div>
  `,
  iconSize: [132, 58],
  iconAnchor: [20, 50],
});

const mapCenter: [number, number] = [33.8547, 35.8623];
const defaultZoom = 8;
const lebanonBounds: [[number, number], [number, number]] = [
  [33.0, 34.8],
  [34.8, 36.9],
];

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

function ResetMapButton() {
  const map = useMap();

  return (
    <button
      type="button"
      onClick={() => map.setView(mapCenter, defaultZoom)}
      className="map-reset-button"
    >
      Reset to Lebanon
    </button>
  );
}

export default function MapPage() {
  const [activeFilter, setActiveFilter] = useState<MapFilter>("All");
  const [selectedId, setSelectedId] = useState("batroun");

  const visibleRegions = useMemo(
    () => regions.filter((region) => activeFilter === "All" || region.filters.includes(activeFilter)),
    [activeFilter]
  );

  const selectedRegion = regions.find((region) => region.id === selectedId) ?? visibleRegions[0] ?? regions[0];
  const selectedIsVisible = visibleRegions.some((region) => region.id === selectedRegion.id);
  const suggestedActivities = activities
    .filter((activity) => activity.city === selectedRegion.city || selectedRegion.exampleActivities.includes(activity.name))
    .slice(0, 4);

  const chooseFilter = (filter: MapFilter) => {
    setActiveFilter(filter);
    const nextRegion = filter === "All" ? selectedRegion : regions.find((region) => region.filters.includes(filter));
    if (nextRegion) setSelectedId(nextRegion.id);
  };

  return (
    <Layout>
      <div className="map-page">
        <section className="container pt-28 pb-8 lg:pt-32">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="home-section-kicker mb-2">Interactive guide</div>
            <h1 className="font-display text-4xl tracking-wide text-slate-950 sm:text-5xl lg:text-6xl">
              Explore Lebanon by map
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              Pick a coast, mountain, or valley and find the best activities nearby.
            </p>
          </motion.div>
        </section>

        <section className="container pb-14">
          <div className="map-filter-scroll mb-5 flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => {
              const Icon = filterIcons[filter];
              return (
                <button
                  key={filter}
                  onClick={() => chooseFilter(filter)}
                  className={cn("map-filter-chip", activeFilter === filter && "map-filter-chip-active")}
                >
                  <Icon className="h-4 w-4" />
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="grid gap-5 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="map-card lg:col-span-8"
            >
              <MapContainer
                center={mapCenter}
                zoom={defaultZoom}
                minZoom={8}
                maxZoom={15}
                scrollWheelZoom
                className="map-canvas"
                maxBounds={lebanonBounds}
                maxBoundsViscosity={1.0}
              >
                <TileLayer
                  attribution={attribution}
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <ResetMapButton />
                {regions.map((region) => {
                  const isActive = selectedRegion.id === region.id;
                  const isVisible = activeFilter === "All" || region.filters.includes(activeFilter);
                  return (
                    <Marker
                      key={region.id}
                      position={region.position}
                      icon={createRegionIcon(region, isActive, isVisible)}
                      eventHandlers={{ click: () => setSelectedId(region.id) }}
                    >
                      <Popup>
                        <div className="map-popup">
                          <strong>{region.name}</strong>
                          <span>{region.vibe}</span>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </motion.div>

            <aside className="lg:col-span-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRegion.id}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  className={cn("map-panel", !selectedIsVisible && "map-panel-muted")}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="home-section-kicker">{selectedRegion.vibe}</div>
                      <h2 className="mt-2 font-display text-3xl leading-none text-slate-950">{selectedRegion.name}</h2>
                    </div>
                    <div className="map-panel-count">{selectedRegion.activityCount}</div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{selectedRegion.description}</p>

                  <div className="mt-5 grid gap-3 text-sm">
                    <div className="map-info-row">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span>{selectedRegion.bestTime}</span>
                    </div>
                    <div className="map-info-row">
                      <Route className="h-4 w-4 text-sky-800" />
                      <span>{selectedRegion.distance}</span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Best categories</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedRegion.bestCategories.map((category) => (
                        <span key={category} className="map-category-pill">{category}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Example activities</div>
                    <div className="mt-2 space-y-2">
                      {selectedRegion.exampleActivities.map((activity) => (
                        <div key={activity} className="map-example-row">
                          <Sparkles className="h-3.5 w-3.5 text-orange-500" />
                          {activity}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <Link href={selectedRegion.href} className="home-search-button justify-center">
                      View Activities <ArrowRight className="h-4 w-4" />
                    </Link>
                    <button className="map-plan-button">Build a day plan</button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </aside>
          </div>
        </section>

        <section className="container pb-20">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className="home-section-kicker">Nearby picks</div>
              <h2 className="font-display text-3xl tracking-wide text-slate-950">Suggested around {selectedRegion.city}</h2>
            </div>
            <Link href={selectedRegion.href} className="hidden items-center gap-1.5 text-sm font-bold text-sky-800 hover:text-orange-600 sm:flex">
              Browse region <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {suggestedActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
