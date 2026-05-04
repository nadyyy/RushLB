import { Link } from "wouter";
import { Instagram, Facebook, Twitter, Youtube, Mail } from "lucide-react";
import { categories, cities } from "@/data/activities";
import { toast } from "sonner";

export default function Footer() {
  const brandLogoSrc = "/images/rushlb-logo.png";
  return (
    <footer className="relative mt-32 border-t border-sky-200/80 bg-gradient-to-b from-transparent to-sky-100/85">
      <div className="container py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-lg border border-white/70 bg-white/25 shadow-sm">
              <img
                src={brandLogoSrc}
                alt="RushLB - Chase The Rush"
                className="h-full w-full object-cover object-center mix-blend-multiply saturate-125 contrast-110"
              />
            </div>
            <div className="leading-none">
              <div className="font-display text-2xl tracking-[0.08em] text-sky-700">RushLB</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
                Chase The Rush
              </div>
            </div>
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm">
            Your gateway to discovering unforgettable activities across Lebanon —
            from the coast to the mountains. Built for the doers.
          </p>
          <div className="flex gap-2 pt-2">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <button
                key={i}
                onClick={() => toast("Social link coming soon")}
                className="h-9 w-9 rounded-full glass flex items-center justify-center hover:rush-gradient transition"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Explore</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/activities" className="hover:text-primary">Activities</Link></li>
            <li><Link href="/categories" className="hover:text-primary">Categories</Link></li>
            <li><Link href="/about" className="hover:text-primary">About</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Categories</div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {categories.slice(0, 8).map((c) => (
              <li key={c.name}>
                <Link
                  href={`/activities?category=${encodeURIComponent(c.name)}`}
                  className="hover:text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Newsletter</div>
          <p className="text-sm text-muted-foreground mb-3">
            Get the weekend's best adventures in your inbox.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("You're in. Welcome to the rush.");
              (e.target as HTMLFormElement).reset();
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                required
                type="email"
                placeholder="you@adventure.com"
                className="w-full h-11 pl-10 pr-3 rounded-lg bg-white/75 border border-sky-200/80 focus:border-primary outline-none text-sm text-cyan-950 placeholder:text-sky-600/60"
              />
            </div>
            <button className="h-11 px-5 rush-gradient rounded-lg text-sm font-bold text-white whitespace-nowrap">
              Join
            </button>
          </form>
          <div className="mt-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Top Cities</div>
            <div className="flex flex-wrap gap-1.5">
              {cities.slice(0, 8).map((c) => (
                <Link
                  key={c}
                  href={`/activities?city=${encodeURIComponent(c)}`}
                  className="text-xs px-2 py-1 rounded-md bg-white/70 hover:bg-cyan-50 border border-sky-200/80"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-sky-200/80">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} RushLB. Built for adventurers.</div>
          <div className="font-mono">v1.0 · made in Beirut</div>
        </div>
      </div>
    </footer>
  );
}
