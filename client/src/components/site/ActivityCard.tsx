import { Link } from "wouter";
import { motion } from "framer-motion";
import { Heart, MapPin, Star, Clock, Mountain, ArrowUpRight } from "lucide-react";
import { Activity } from "@/data/activities";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

const diffColor: Record<string, string> = {
  Easy: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  Moderate: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  Hard: "text-orange-400 border-orange-400/30 bg-orange-400/10",
  Extreme: "text-red-500 border-red-500/40 bg-red-500/10",
};

function CoverImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/52 via-sky-500/12 to-white/5" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/24 via-transparent to-violet-300/18" />
    </div>
  );
}

export default function ActivityCard({ activity, compact }: { activity: Activity; compact?: boolean }) {
  const { isWished, toggleWishlist } = useApp();
  const wished = isWished(activity.id);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-sky-200/80 bg-card transition-all",
        "shadow-[0_16px_50px_-24px_rgba(14,116,144,0.42)] hover:shadow-[0_22px_70px_-30px_rgba(56,189,248,0.56)] hover:border-cyan-400/60",
        compact ? "min-w-[280px] sm:min-w-[300px]" : ""
      )}
    >
      <Link href={`/activity/${activity.slug}`} className="block">
          <div className="relative h-52 overflow-hidden">
            <CoverImage src={activity.image} alt={activity.name} />
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-white/78 backdrop-blur text-cyan-800 border border-white/70">
                {activity.category}
              </span>
              {activity.badges.slice(0, 1).map((b) => (
                <span
                  key={b}
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md rush-gradient text-white"
                >
                  {b}
                </span>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(activity.id);
              }}
              className={cn(
                "absolute top-3 right-3 h-9 w-9 rounded-full flex items-center justify-center backdrop-blur transition",
                wished ? "rush-gradient" : "bg-white/78 hover:bg-cyan-50"
              )}
              aria-label="Wishlist"
            >
              <Heart className={cn("h-4 w-4", wished ? "fill-white text-white" : "text-cyan-700")} />
            </button>
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div>
                <div className="text-white font-display text-xl leading-tight drop-shadow">
                  {activity.name}
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80 mt-1">
                  <MapPin className="h-3 w-3" />
                  {activity.city}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-sm text-muted-foreground line-clamp-2">{activity.tagline}</p>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-foreground font-semibold">{activity.rating}</span>
                <span>({activity.reviewCount})</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {activity.duration}
              </div>
              <div className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-bold uppercase", diffColor[activity.difficulty])}>
                <Mountain className="h-3 w-3" />
                {activity.difficulty}
              </div>
            </div>

            <div className="flex items-end justify-between pt-2 border-t border-sky-200/70">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">From</div>
                <div className="font-display text-2xl rush-text leading-none">${activity.price}</div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground/90 group-hover:text-primary transition">
                View
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
      </Link>
    </motion.div>
  );
}
