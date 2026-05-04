import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import {
  Search,
  Star,
  MapPin,
  ArrowRight,
  Car,
  Leaf,
  Mountain,
  Plane,
  Sailboat,
  Snowflake,
  Trees,
  Users,
  Waves,
  Zap,
} from "lucide-react";
import Layout from "@/components/site/Layout";
import SectionRow from "@/components/site/SectionRow";
import { activities, categories, cities, appReviews as defaultAppReviews } from "@/data/activities";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";

const cityCounts = cities.reduce((acc, c) => {
  acc[c] = activities.filter((a) => a.city === c).length;
  return acc;
}, {} as Record<string, number>);

const categoryCounts = categories.reduce((acc, c) => {
  acc[c.name] = activities.filter((a) => a.category === c.name).length;
  return acc;
}, {} as Record<string, number>);

const featuredCities = ["Beirut", "Jounieh", "Batroun", "Byblos", "Faraya", "Cedars", "Zahle", "Jezzine", "Tyre", "Tripoli", "Chouf", "Zaarour"];

const categoryIcons = {
  Waves,
  Zap,
  Mountain,
  Trees,
  Plane,
  Car,
  Snowflake,
  Sailboat,
  Users,
  Leaf,
};

export default function Home() {
  const heroVideoSrc = "/videos/hero-bg.mp4";
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const { recentlyViewed, appReviews, addAppReview } = useApp();

  const reviews = [...appReviews, ...defaultAppReviews];

  const recents = useMemo(
    () => recentlyViewed.map((id) => activities.find((a) => a.id === id)).filter(Boolean) as typeof activities,
    [recentlyViewed]
  );

  const submitSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    navigate(`/activities?${params.toString()}`);
  };

  return (
    <Layout>
      <div className="home-page">
        <section className="home-hero-summer relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover home-hero-video-media"
              aria-hidden="true"
            >
              <source src={heroVideoSrc} type="video/mp4" />
            </video>
            <div className="absolute inset-0 home-hero-video-overlay-primary" />
            <div className="absolute inset-0 home-hero-video-overlay-glow" />
          </div>

          <div className="container relative z-10 grid gap-8 pt-24 pb-0 lg:min-h-screen lg:grid-cols-12 lg:items-center lg:pt-28 lg:pb-10">
            <div className="lg:col-span-12">
              

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.08 }}
                className="home-hero-title"
              >
                Discover Your Next Rush Across Lebanon
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg"
              >
                From the waves to the mountains, discover Lebanon’s most adrenaline-filled experiences.
Ride. Fly. Dive. Explore. All in one place.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, delay: 0.24 }}
                className="mt-6 flex flex-wrap gap-3"
              >
                <Link href="/activities" className="home-browse-button home-browse-button-primary">
                  Browse activities
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>

              <motion.form
                onSubmit={submitSearch}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52, delay: 0.32 }}
                className="home-discovery-search mt-5"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3 px-4">
                  <Search className="h-5 w-5 shrink-0 text-sky-700" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by activity, city, mood, or budget"
                    className="min-w-0 flex-1 bg-transparent py-4 text-sm text-slate-900 outline-none placeholder:text-slate-500 sm:text-base"
                  />
                </div>
                <button className="home-search-button">
                  Search
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.form>
            </div>

          </div>
        </section>

        <section className="container py-12">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="home-section-kicker">Pick your rush</div>
              <h2 className="font-display text-3xl tracking-wide text-slate-950 sm:text-4xl">Categories</h2>
            </div>
            <Link
              href="/categories"
              className="hidden items-center gap-1.5 text-sm font-bold text-sky-800 hover:text-orange-600 sm:flex"
            >
              All categories <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                {(() => {
                  const Icon = categoryIcons[c.icon as keyof typeof categoryIcons] ?? Mountain;
                  return (
                <Link
                  href={`/activities?category=${encodeURIComponent(c.name)}`}
                  className="home-feature-card group"
                  style={{
                    "--feature-card-image": `url(${c.image})`,
                    "--feature-card-position": c.position ?? "center",
                  } as CSSProperties}
                >
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <Icon className="h-5 w-5 text-white" strokeWidth={2.4} />
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/78">
                        {categoryCounts[c.name] ?? 0} {categoryCounts[c.name] === 1 ? "activity" : "activities"}
                      </div>
                      <div className="mt-1 font-display text-xl leading-none text-white">{c.name}</div>
                    </div>
                  </div>
                </Link>
                  );
                })()}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container py-10">
          <div className="home-map-teaser grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="home-map-copy lg:col-span-7">
              <div className="home-section-kicker">Explore by map</div>
              <h2 className="mt-2 font-display text-3xl tracking-wide text-slate-950 sm:text-4xl">
                Explore Lebanon by region
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                From Batroun's coast to the Cedars, find adventures by area.
              </p>
              <Link href="/map" className="home-search-button mt-5 inline-flex">
                Open Interactive Map <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <Link href="/map" className="home-mini-map group lg:col-span-5" aria-label="Open interactive map">
              <div className="home-region-photo-card" aria-hidden="true">
                <div className="home-region-photo-badge">7 regions</div>
                <div className="home-region-photo-content">
                  <div>
                    <div className="home-region-photo-title">Explore by region</div>
                    <div className="home-region-photo-subtitle">Coast, mountains, valleys</div>
                  </div>
                  <div className="home-region-photo-cta">
                    Open full map <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <SectionRow
          kicker="Coast is calling"
          title="TRENDING NOW"
          href="/activities?category=Water"
          activities={activities.filter((a) => a.category === "Water").slice(0, 8)}
        />

        <SectionRow
          kicker="Off the radar"
          title="HIDDEN GEMS"
          activities={activities.filter((a) => ["Akoura", "Tannourine", "Ehden", "Jezzine", "Anfeh", "Baskinta", "Nahr Ibrahim"].includes(a.city)).slice(0, 8)}
        />

        <SectionRow
          kicker="Light on the wallet"
          title="BUDGET-FRIENDLY"
          href="/activities?budget=under20"
          activities={activities.filter((a) => a.price <= 25).slice(0, 8)}
        />

        <section className="container py-16">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="home-section-kicker">Where to?</div>
              <h2 className="font-display text-3xl tracking-wide text-slate-950 sm:text-4xl lg:text-5xl">City explorer</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {featuredCities.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  href={`/activities?city=${encodeURIComponent(c)}`}
                  className="home-city-card group"
                >
                  <MapPin className="h-5 w-5 text-sky-700" />
                  <div>
                    <div className="font-display text-xl tracking-wide text-slate-950">{c}</div>
                    <div className="mt-0.5 text-xs text-slate-600">
                      {cityCounts[c] ?? 0} activit{(cityCounts[c] ?? 0) === 1 ? "y" : "ies"}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {recents.length > 0 && (
          <SectionRow kicker="Where you left off" title="RECENTLY VIEWED" activities={recents} />
        )}

        <section className="container py-16">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <div className="home-section-kicker">App reviews</div>
              <h2 className="font-display text-3xl tracking-wide text-slate-950 sm:text-4xl lg:text-5xl">
                What the community says about us.
              </h2>
              <div className="flex items-center gap-3 pt-2">
                <div className="font-display text-6xl leading-none text-sky-800">4.9</div>
                <div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="mt-1 text-xs text-slate-600">Based on {reviews.length} reviews</div>
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const fd = new FormData(form);
                  const r = {
                    id: `u-${Date.now()}`,
                    user: String(fd.get("name") || "Anonymous"),
                    rating: Number(fd.get("rating")),
                    comment: String(fd.get("comment") || ""),
                    date: new Date().toISOString().slice(0, 10),
                  };
                  if (!r.user || !r.comment || !r.rating) return;
                  addAppReview(r);
                  toast.success("Thanks for the love!");
                  form.reset();
                }}
                className="home-panel mt-4 space-y-3 p-4"
              >
                <div className="text-sm font-bold uppercase tracking-widest text-slate-800">Review Lebanon Rush</div>
                <input name="name" required placeholder="Your name" className="field" />
                <select name="rating" required defaultValue="5" className="field">
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}
                </select>
                <textarea name="comment" required rows={3} placeholder="Tell us what you think..." className="w-full rounded-xl border border-sky-200/80 bg-white/80 px-3 py-2 text-sm text-cyan-950 outline-none placeholder:text-sky-700/50 focus:border-sky-500" />
                <button className="h-11 w-full rounded-lg bg-sky-800 font-bold text-white transition hover:-translate-y-0.5 hover:bg-sky-900">Submit Review</button>
              </form>
            </div>
            <div className="grid gap-4 self-start sm:grid-cols-2 lg:col-span-7">
              {reviews.slice(0, 6).map((r) => (
                <div key={r.id} className="home-panel space-y-2 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-700 to-orange-400 text-sm font-bold text-white">
                        {r.user.slice(0, 1)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{r.user}</div>
                        <div className="text-xs text-slate-500">{r.date}</div>
                      </div>
                    </div>
                    <div className="flex">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
