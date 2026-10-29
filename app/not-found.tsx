import Button from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-8xl font-extrabold tracking-tight text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold text-foreground">You took a wrong turn.</h1>
      <p className="mt-2 text-muted-foreground">
        The pit lane doesn't go that way. Let's get you back on track.
      </p>
      <div className="mt-8">
        <Button variant="primary" size="lg" href="/products">
          Back to shop
        </Button>
      </div>
    </main>
  );
}