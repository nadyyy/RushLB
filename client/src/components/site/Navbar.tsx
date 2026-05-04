import { Link, useLocation } from "wouter";
import { Menu, X, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/activities", label: "Activities" },
  { href: "/categories", label: "Categories" },
  { href: "/map", label: "Map" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const brandLogoSrc = "/images/rushlb-logo.png";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, navigate] = useLocation();
  const { wishlist } = useApp();
  const isHome = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ${
        isHome
          ? scrolled
            ? "border-white/70 bg-white/78 shadow-[0_18px_70px_-48px_rgba(15,76,92,0.55)] backdrop-blur-2xl"
            : "border-white/40 bg-white/26 backdrop-blur-xl"
          : scrolled
            ? "glass border-b border-sky-200/80"
            : "bg-transparent border-transparent"
      }`}
    >
      {isHome && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-0 h-16 w-80 bg-orange-200/25 blur-2xl" />
          <div className="absolute right-10 top-0 h-16 w-96 bg-sky-200/24 blur-2xl" />
        </div>
      )}
      <div className="container flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="flex items-center group">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 overflow-hidden rounded-md border border-white/70 bg-white/15 shadow-sm backdrop-blur-sm sm:h-11 sm:w-11">
              <img
                src={brandLogoSrc}
                alt="RushLB - Chase The Rush"
                className="h-full w-full object-cover object-center mix-blend-multiply saturate-125 contrast-110 transition-transform group-hover:scale-105"
              />
            </div>
            <div className="leading-none">
              <div className={cn("font-display text-[1.25rem] tracking-[0.08em]", isHome ? "text-sky-800" : "text-sky-700")}>
                RushLB
              </div>
              <div className={cn("text-[10px] uppercase tracking-[0.22em] font-semibold mt-1", isHome ? "text-slate-700/85" : "text-muted-foreground")}>
                Chase The Rush
              </div>
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "px-3 py-2 text-sm font-semibold transition-colors relative group",
                isHome ? "text-slate-800/82 hover:text-sky-900" : "text-foreground/80 hover:text-foreground"
              )}
            >
              {l.label}
              <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-gradient-to-r from-sky-700 to-orange-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/wishlist")}
            className={cn(
              "relative h-10 w-10 rounded-full backdrop-blur-xl flex items-center justify-center hover:scale-105 transition",
              isHome ? "border border-white/70 bg-white/44 text-sky-950 hover:border-orange-300/70 hover:text-orange-700" : "glass"
            )}
            aria-label="Wishlist"
          >
            <Heart className="h-4 w-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 bg-gradient-to-br from-sky-700 to-orange-400 rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                {wishlist.length}
              </span>
            )}
          </button>
          <button
            className={cn(
              "lg:hidden h-10 w-10 rounded-full backdrop-blur-xl flex items-center justify-center",
              isHome ? "border border-white/70 bg-white/44 text-sky-950" : "glass"
            )}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "lg:hidden border-t backdrop-blur-2xl",
              isHome ? "border-white/60 bg-white/92 text-slate-950" : "glass border-sky-200/80"
            )}
          >
            <div className="container py-4 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-3 py-3 rounded-lg text-base font-medium",
                    isHome ? "text-slate-800 hover:bg-sky-50/80 hover:text-sky-900" : "hover:bg-cyan-50/80"
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
