import Layout from "@/components/site/Layout";
import { Mountain, Waves, Wind, Compass } from "lucide-react";

export default function AboutPage() {
  return (
    <Layout>
      <section className="container pt-12 lg:pt-20 pb-12">
        <div className="text-xs uppercase tracking-[0.3em] rush-text font-bold mb-2">Our story</div>
        <h1 className="font-display text-4xl sm:text-6xl tracking-wide leading-none">
          BUILT FOR PEOPLE WHO<br />ACTUALLY GO OUTSIDE.
        </h1>
        <p className="text-lg text-muted-foreground mt-6 max-w-2xl">
          Lebanon Rush is your gateway to discovering unforgettable activities across Lebanon —
          from the coast to the mountains. We curate operators, surface what's good,
          and stay out of your way so you can plan your weekend in 30 seconds.
        </p>
      </section>

      <section className="container pb-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { i: Mountain, t: "Mountain", d: "Cedars, Mzaar, Laklouk and beyond." },
          { i: Waves, t: "Coast", d: "Batroun, Tyre, Anfeh and the bay." },
          { i: Wind, t: "Sky", d: "Paragliding, ziplines, sky flights." },
          { i: Compass, t: "Hidden", d: "Akoura, Tannourine, Nahr Ibrahim." },
        ].map((b) => (
          <div key={b.t} className="glass rounded-2xl p-6">
            <div className="h-12 w-12 rush-gradient rounded-xl flex items-center justify-center mb-4">
              <b.i className="h-6 w-6 text-white" />
            </div>
            <div className="font-display text-2xl">{b.t.toUpperCase()}</div>
            <div className="text-sm text-muted-foreground mt-1">{b.d}</div>
          </div>
        ))}
      </section>

      <section className="container pb-24">
        <div className="glass rounded-3xl p-10 lg:p-16 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl tracking-wide">OUR MISSION.</h2>
            <p className="text-muted-foreground mt-4">
              Lebanon has world-class adventures hidden behind broken websites and outdated
              Facebook pages. Lebanon Rush brings them all into one fast, beautiful index —
              with real prices, real photos and real reviews.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { n: "01", t: "Curate", d: "We hand-pick operators that actually deliver." },
              { n: "02", t: "Surface", d: "Filters, badges, ratings — find your fit in seconds." },
              { n: "03", t: "Send", d: "One click to book, contact, or hit them on WhatsApp." },
            ].map((s) => (
              <div key={s.n} className="flex gap-4">
                <div className="font-display text-3xl rush-text leading-none">{s.n}</div>
                <div>
                  <div className="font-bold">{s.t}</div>
                  <div className="text-sm text-muted-foreground">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
