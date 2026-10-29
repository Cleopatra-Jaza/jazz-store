"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Surface the error to the console for debugging.
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">
        A pit stop is in order. Try that again.
      </p>
      <div className="mt-8">
        <Button variant="primary" size="lg" onClick={reset}>
          Try again
        </Button>
      </div>
    </main>
  );
}