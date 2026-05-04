import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import {
  Star, MapPin, Clock, Mountain, Users, Calendar, Heart, Share2,
  ShieldCheck, Backpack, MessageCircle, Phone, ArrowLeft, ChevronRight,
  Check
} from "lucide-react";
import Layout from "@/components/site/Layout";
import ActivityCard from "@/components/site/ActivityCard";
import { activities, Review } from "@/data/activities";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ActivityDetailPage() {
  const [, params] = useRoute("/activity/:slug");
  const slug = params?.slug;
  const activity = useMemo(() => activities.find((a) => a.slug === slug), [slug]);

  const { addRecent, isWished, toggleWishlist, addReview, extraReviews } = useApp();
  const [activeImage, setActiveImage] = useState(0);
  const [activePackage, setActivePackage] = useState(1);

  useEffect(() => {
    if (activity) addRecent(activity.id);
    window.scrollTo({ top: 0 });
  }, [activity?.id]);

  if (!activity) {
    return (
      <Layout>
        <div className="container py-32 text-center">
          <div className="font-display text-3xl">Activity not found</div>
          <Link href="/activities" className="text-primary mt-4 inline-block">Back to activities</Link>
        </div>
      </Layout>
    );
  }

  const wished = isWished(activity.id);
  const allReviews: Review[] = [...(extraReviews[activity.id] ?? []), ...activity.reviews];
  const avgRating = allReviews.length
    ? (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1)
    : activity.rating.toFixed(1);
  const similar = activities
    .filter((a) => a.category === activity.category && a.id !== activity.id)
    .slice(0, 4);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container pt-6">
        <Link
          href="/activities"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to activities
        </Link>
        <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/activities" className="hover:text-foreground">Activities</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{activity.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="container pt-6">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <div className={cn("relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br border border-sky-200/80", activity.images[activeImage])}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/28 blur-3xl" />
              <div className="absolute top-6 right-6 font-display text-[180px] leading-none text-white/24 tracking-tight">
                {activity.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/45 to-white/8" />
              <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                {activity.badges.map((b) => (
                  <span key={b} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md rush-gradient text-white">{b}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {activity.images.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br border-2",
                    g,
                    activeImage === i ? "border-primary" : "border-transparent"
                  )}
                >
                  <div className="absolute inset-0 bg-white/18" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="px-2 py-1 rounded bg-white/75 border border-sky-200/80">{activity.category}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {activity.city}, {activity.region}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl tracking-wide mt-4">{activity.name}</h1>
            <p className="text-muted-foreground mt-2">{activity.tagline}</p>

            <div className="flex items-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-bold">{avgRating}</span>
                <span className="text-muted-foreground">({allReviews.length} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" /> {activity.duration}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Mountain className="h-4 w-4" /> {activity.difficulty}
              </div>
            </div>

            <div className="glass rounded-2xl p-4 mt-5 flex items-center gap-3">
              <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center font-display text-lg text-white bg-gradient-to-br", activity.providerColor)}>
                {activity.providerInitials}
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Operated by</div>
                <div className="font-bold">{activity.providerName}</div>
              </div>
              <button onClick={() => toggleWishlist(activity.id)} className={cn("h-10 w-10 rounded-xl flex items-center justify-center", wished ? "rush-gradient" : "bg-white/75 border border-sky-200/80")}>
                <Heart className={cn("h-4 w-4", wished ? "fill-white text-white" : "")} />
              </button>
              <button onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success("Link copied"); }} className="h-10 w-10 rounded-xl bg-white/75 border border-sky-200/80 flex items-center justify-center">
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            {/* Price packages */}
            <div className="mt-5 space-y-2">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Choose a package</div>
              {activity.pricePackages.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setActivePackage(i)}
                  className={cn(
                    "w-full text-left rounded-xl p-4 border transition flex items-center justify-between",
                    activePackage === i ? "border-primary bg-primary/10" : "border-sky-200/80 hover:border-cyan-400/60 bg-white/60"
                  )}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="font-bold">{p.name}</div>
                      {i === 1 && <span className="text-[10px] uppercase tracking-widest rush-gradient text-white px-1.5 py-0.5 rounded">Popular</span>}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{p.features.join(" · ")}</div>
                  </div>
                  <div className="font-display text-2xl rush-text">${p.price}</div>
                </button>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              <button onClick={() => toast.success("Booking flow coming soon")} className="col-span-3 sm:col-span-1 h-12 rush-gradient rounded-xl font-bold text-white glow-red">
                Book Now
              </button>
              <button onClick={() => toast("Provider contact coming soon")} className="h-12 rounded-xl border border-sky-200/80 hover:border-cyan-400/70 bg-white/65 font-bold text-sm flex items-center justify-center gap-1.5">
                <Phone className="h-4 w-4" /> Contact
              </button>
              <button onClick={() => toast("WhatsApp link coming soon")} className="h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/40 hover:bg-emerald-500/25 text-emerald-300 font-bold text-sm flex items-center justify-center gap-1.5">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
              <div className="glass rounded-xl p-3">
                <div className="text-muted-foreground uppercase tracking-widest text-[10px] mb-1">Age</div>
                <div className="font-bold">{activity.ageRequirement}</div>
              </div>
              <div className="glass rounded-xl p-3">
                <div className="text-muted-foreground uppercase tracking-widest text-[10px] mb-1">Group</div>
                <div className="font-bold flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {activity.groupSize}</div>
              </div>
              <div className="glass rounded-xl p-3">
                <div className="text-muted-foreground uppercase tracking-widest text-[10px] mb-1">Days</div>
                <div className="font-bold flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {activity.availableDays.length}/wk</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container py-12 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <div>
            <h2 className="font-display text-2xl tracking-wide mb-3">THE EXPERIENCE</h2>
            <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Check className="h-4 w-4 text-emerald-400" />
                <div className="text-sm uppercase tracking-widest font-bold">What's included</div>
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {activity.included.map((i) => <li key={i} className="flex gap-2"><span className="text-emerald-400">✓</span>{i}</li>)}
              </ul>
            </div>
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Backpack className="h-4 w-4 text-amber-400" />
                <div className="text-sm uppercase tracking-widest font-bold">What to bring</div>
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {activity.whatToBring.map((i) => <li key={i} className="flex gap-2"><span className="text-amber-400">•</span>{i}</li>)}
              </ul>
            </div>
            <div className="glass rounded-2xl p-5 sm:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-4 w-4 text-red-400" />
                <div className="text-sm uppercase tracking-widest font-bold">Safety notes</div>
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {activity.safetyNotes.map((i) => <li key={i} className="flex gap-2"><span className="text-red-400">!</span>{i}</li>)}
              </ul>
              <div className="text-xs text-muted-foreground mt-3 pt-3 border-t border-sky-200/70">
                <strong className="text-foreground">Cancellation:</strong> {activity.cancellationPolicy}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="font-display text-2xl tracking-wide mb-4">REVIEWS</h2>
            <div className="glass rounded-2xl p-5 mb-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.target as HTMLFormElement);
                  const r: Review = {
                    id: `u-${Date.now()}`,
                    user: String(fd.get("name") || "Anonymous"),
                    rating: Number(fd.get("rating")),
                    comment: String(fd.get("comment") || ""),
                    date: new Date().toISOString().slice(0, 10),
                    tags: ["Fun"],
                  };
                  if (!r.user || !r.comment) return;
                  addReview(activity.id, r);
                  toast.success("Review submitted!");
                  (e.target as HTMLFormElement).reset();
                }}
                className="grid sm:grid-cols-12 gap-3"
              >
                <input name="name" required placeholder="Your name" className="sm:col-span-4 field" />
                <select name="rating" defaultValue="5" required className="sm:col-span-2 field">
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n}★</option>)}
                </select>
                <input name="comment" required placeholder="Your review…" className="sm:col-span-4 field" />
                <button className="sm:col-span-2 h-11 rush-gradient rounded-lg font-bold text-white">Submit</button>
              </form>
            </div>
            <div className="space-y-3">
              {allReviews.map((r) => (
                <div key={r.id} className="glass rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rush-gradient rounded-full flex items-center justify-center font-bold text-white">
                        {r.user.slice(0, 1)}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{r.user}</div>
                        <div className="text-xs text-muted-foreground">{r.date}</div>
                      </div>
                    </div>
                    <div className="flex">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{r.comment}</p>
                  {r.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {r.tags.map((t) => (
                        <span key={t} className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-white/70 border border-sky-200/80">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="glass rounded-2xl p-5">
            <div className="text-sm uppercase tracking-widest font-bold mb-3">Location</div>
            <div className="relative h-44 rounded-xl overflow-hidden border border-sky-200/80 bg-sky-50">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.34),transparent_60%)]" />
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-5 opacity-20">
                {Array.from({ length: 40 }).map((_, i) => <div key={i} className="border border-sky-300/45" />)}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rush-gradient rounded-full pulse-ring opacity-50 -m-3" />
                  <div className="relative h-8 w-8 rush-gradient rounded-full flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-sm mt-3"><strong>{activity.city}</strong>, {activity.region}</div>
            <div className="text-xs text-muted-foreground font-mono">
              {activity.coordinates.lat.toFixed(3)}, {activity.coordinates.lng.toFixed(3)}
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="text-sm uppercase tracking-widest font-bold mb-3">Available days</div>
            <div className="flex flex-wrap gap-1.5">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <span
                  key={d}
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-md border",
                    activity.availableDays.includes(d) ? "rush-gradient text-white border-transparent" : "border-sky-200/80 bg-white/65 text-muted-foreground"
                  )}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="container pb-20">
          <h2 className="font-display text-2xl sm:text-3xl tracking-wide mb-5">SIMILAR ACTIVITIES</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {similar.map((s) => <ActivityCard key={s.id} activity={s} />)}
          </div>
        </section>
      )}
    </Layout>
  );
}
