import { Link } from "wouter";
import { Heart } from "lucide-react";
import Layout from "@/components/site/Layout";
import ActivityCard from "@/components/site/ActivityCard";
import { activities } from "@/data/activities";
import { useApp } from "@/contexts/AppContext";

export default function WishlistPage() {
  const { wishlist } = useApp();
  const items = activities.filter((a) => wishlist.includes(a.id));

  return (
    <Layout>
      <section className="container pt-12 lg:pt-20 pb-10">
        <div className="text-xs uppercase tracking-[0.3em] rush-text font-bold mb-2">Saved for later</div>
        <h1 className="font-display text-4xl sm:text-5xl tracking-wide">YOUR WISHLIST</h1>
      </section>

      <section className="container pb-24">
        {items.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <Heart className="h-12 w-12 mx-auto rush-text mb-4" />
            <div className="font-display text-2xl">No saved activities yet.</div>
            <p className="text-muted-foreground mt-2">Tap the heart on any activity to save it here.</p>
            <Link
              href="/activities"
              className="inline-block mt-6 h-12 px-6 rush-gradient rounded-xl font-bold text-white"
            >
              Browse activities
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((a) => <ActivityCard key={a.id} activity={a} />)}
          </div>
        )}
      </section>
    </Layout>
  );
}
