const words = ["RACE", "DRIFT", "JAZZ", "REPEAT"];

const row = (
  <>
    {words.map((word) => (
      <>
        <span className="text-muted-foreground">{word}</span>
        <span className="text-accent mx-1.5">•</span>
      </>
    ))}
  </>
);

export default function Marquee() {
  return (
    <div className="border-y border-border bg-surface h-[3rem] overflow-hidden">
      <div
        className="flex items-center gap-x-8 animate-marquee hover:paused whitespace-nowrap px-6"
        style={{ animationDuration: "24s" }}
      >
        {row}{row}
      </div>
    </div>
  );
}
