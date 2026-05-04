import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Activity } from "@/data/activities";
import ActivityCard from "./ActivityCard";

export default function SectionRow({
  title,
  kicker,
  activities,
  href,
}: {
  title: string;
  kicker?: string;
  activities: Activity[];
  href?: string;
}) {
  if (activities.length === 0) return null;
  return (
    <section className="py-10 lg:py-14">
      <div className="container">
        <div className="flex items-end justify-between mb-6">
          <div>
            {kicker && (
              <div className="text-xs uppercase tracking-[0.3em] rush-text font-bold mb-2">{kicker}</div>
            )}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wide">{title}</h2>
          </div>
          {href && (
            <Link
              href={href}
              className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-foreground/80 hover:text-primary group"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        <div className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-2">
            {activities.map((a) => (
              <div key={a.id} className="w-[280px] sm:w-[320px] flex-shrink-0">
                <ActivityCard activity={a} compact />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
