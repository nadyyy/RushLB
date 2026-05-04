import Layout from "@/components/site/Layout";
import { Mail, MessageCircle, Instagram } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  return (
    <Layout>
      <section className="container pt-12 lg:pt-20 pb-12">
        <div className="text-xs uppercase tracking-[0.3em] rush-text font-bold mb-2">Reach out</div>
        <h1 className="font-display text-4xl sm:text-6xl tracking-wide leading-none">GET IN TOUCH.</h1>
        <p className="text-muted-foreground mt-4 max-w-xl">
          Operator? Question? Idea? Drop us a line and we'll come back fast.
        </p>
      </section>

      <section className="container pb-24 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 glass rounded-3xl p-6 lg:p-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message sent — we'll be in touch soon.");
              (e.target as HTMLFormElement).reset();
            }}
            className="grid sm:grid-cols-2 gap-4"
          >
            <div className="sm:col-span-1">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
              <input required className="mt-1 field h-12" />
            </div>
            <div className="sm:col-span-1">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
              <input required type="email" className="mt-1 field h-12" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Subject</label>
              <input required className="mt-1 field h-12" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea required rows={6} className="mt-1 w-full px-3 py-2 rounded-xl bg-white/80 border border-sky-200/80 outline-none focus:border-primary text-sm text-cyan-950" />
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <button className="h-12 px-6 rush-gradient rounded-xl font-bold text-white">Send Message</button>
            </div>
          </form>
        </div>
        <div className="lg:col-span-4 space-y-4">
          {[
            { i: Mail, t: "Email", d: "hello@lebanonrush.com" },
            { i: MessageCircle, t: "WhatsApp", d: "+961 0 000 000" },
            { i: Instagram, t: "Instagram", d: "@lebanonrush" },
          ].map((c) => (
            <div key={c.t} className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="h-12 w-12 rush-gradient rounded-xl flex items-center justify-center">
                <c.i className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.t}</div>
                <div className="font-bold">{c.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
