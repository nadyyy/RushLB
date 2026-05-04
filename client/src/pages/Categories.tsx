import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/site/Layout";
import { activities, categories } from "@/data/activities";
import { cn } from "@/lib/utils";

export default function CategoriesPage() {
  const counts = categories.reduce((acc, c) => {
    acc[c.name] = activities.filter((a) => a.category === c.name).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Layout>
      <section className="container pt-10 lg:pt-16 pb-10">
        <div className="text-xs uppercase tracking-[0.3em] rush-text font-bold mb-2">Browse</div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide">CATEGORIES</h1>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Pick the kind of energy you're chasing. Each category is full of curated experiences across Lebanon.
        </p>
      </section>

      <section className="container pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                href={`/activities?category=${encodeURIComponent(c.name)}`}
                className={cn(
                  "group block relative h-64 rounded-3xl overflow-hidden border border-sky-200/80 bg-white/60",
                  "hover:scale-[1.02] transition-transform"
                )}
              >
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: c.position ?? "center" }}
                  />
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 mix-blend-multiply", c.color)} />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/55 via-sky-500/16 to-white/10" />
                  <div className="relative h-full p-6 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <span className="text-xs uppercase tracking-widest text-cyan-800 px-2 py-1 rounded bg-white/78 backdrop-blur border border-white/70">
                        {counts[c.name] ?? 0} {counts[c.name] === 1 ? "activity" : "activities"}
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                    </div>
                    <div>
                      <div className="font-display text-3xl text-white leading-tight">
                        {c.name.toUpperCase()}
                      </div>
                      <div className="text-sm text-white/80 mt-1">Explore experiences →</div>
                    </div>
                  </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
