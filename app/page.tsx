import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <main className="flex flex-1 bg-background">
      <Hero />
      <Marquee />
    </main>
  );
}
