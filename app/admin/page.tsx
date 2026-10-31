import { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/data/products";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Admin | Jazz",
  robots: { index: false, follow: false },
};

async function AdminContent() {
  if (!(await isAdmin())) redirect("/admin/login");

  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

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

      <h2 className="text-xl font-semibold text-foreground mb-4">
        Orders ({orders.length})
      </h2>

      {orders.length === 0 ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="font-semibold text-foreground">
                  #{order.id.slice(-8).toUpperCase()}
                </span>
                <span className="text-sm text-muted-foreground">
                  {order.createdAt.toLocaleString("en-GB", {
                    timeZone: "Asia/Colombo",
                  })}
                </span>
                <span className="rounded-full border border-border px-3 py-1 text-xs text-foreground">
                  {order.status}
                </span>
              </div>

              <div className="text-sm text-muted-foreground mb-3">
                <p className="text-foreground">{order.customerName}</p>
                <p>{order.phone}{order.email ? ` · ${order.email}` : ""}</p>
                <p>{order.address}, {order.city}</p>
                {order.notes && <p>Notes: {order.notes}</p>}
              </div>

              <ul className="space-y-1 mb-3 text-sm">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between gap-3">
                    <span className="text-foreground">
                      {item.name}
                      <span className="text-muted-foreground">
                        {" "}({item.color} / {item.size}) x {item.quantity}
                      </span>
                    </span>
                    <span className="text-foreground">
                      {formatPrice(Number(item.unitPrice) * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between border-t border-border pt-3 font-semibold text-foreground">
                <span>Total</span>
                <span>{formatPrice(Number(order.subtotal))}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
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