import { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Admin | Jazz",
  robots: { index: false, follow: false },
};

async function AdminContent() {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground font-display">Admin</h1>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-full border border-border px-4 py-2 text-sm text-foreground hover:bg-surface transition-colors"
          >
            Log out
          </button>
        </form>
      </div>
      <p className="text-muted-foreground">
        Logged in. Orders and product management coming next.
      </p>
    </div>
  );
}

export default function AdminPage() {
  return (
    <main className="min-h-[85vh] pt-10 pb-20 px-6 lg:px-12">
      <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
        <AdminContent />
      </Suspense>
    </main>
  );
}