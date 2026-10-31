"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function AdminLoginPage() {
  const [error, formAction, pending] = useActionState(login, null);

  return (
    <main className="min-h-[85vh] pt-10 pb-20 px-6 lg:px-12">
      <div className="max-w-sm mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6 font-display">
          Admin login
        </h1>
        <form action={formAction} className="space-y-4">
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Admin password"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {error && (
            <p role="alert" className="text-sm text-red-500">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-accent px-6 py-3 text-lg font-medium text-white hover:bg-accent-hover transition-colors disabled:opacity-60"
          >
            {pending ? "Checking..." : "Log in"}
          </button>
        </form>
      </div>
    </main>
  );
}