import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Package } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MyOrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signin");

  const orders = await prisma.order.findMany({
    where: { userId: (session.user as any).id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-extrabold mb-1">My orders</h1>
      <p className="text-sm text-gray-500 mb-8">
        Orders placed while signed in to this account.
      </p>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <Package size={32} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 mb-4">You haven&apos;t placed an order yet.</p>
          <Link href="/product" className="font-semibold underline">
            Explore Sleep Guard
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-sm">Order #{order.id.slice(-8)}</p>
                <p className="text-xs text-gray-500">
                  {order.address}, {order.emirate}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">AED {order.amountAed}</p>
                <span className="text-xs font-medium text-green-600 capitalize">{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
