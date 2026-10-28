import Reveal from "@/components/Reveal";

const reasons = [
  {
    title: "Race-inspired design",
    line: "Built for the track and the street.",
  },
  {
    title: "Premium fabrics",
    line: "Heavyweight, breathable materials.",
  },
  {
    title: "Island-wide delivery",
    line: "Fast shipping across the islands.",
  },
];

export default function WhyJazz() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 100}>
              <div className="rounded-3xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {r.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {r.line}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}