import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // always fetch fresh data, never cache this page

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-extrabold mb-1">Orders</h1>
      <p className="text-sm text-gray-500 mb-6">
        {orders.length} order{orders.length !== 1 ? "s" : ""} total
      </p>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Emirate</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Placed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 font-mono text-xs">{order.id}</td>
                  <td className="px-4 py-3 font-medium">{order.fullName}</td>
                  <td className="px-4 py-3">{order.email}</td>
                  <td className="px-4 py-3">{order.phone}</td>
                  <td className="px-4 py-3">{order.emirate}</td>
                  <td className="px-4 py-3">{order.address}</td>
                  <td className="px-4 py-3">AED {order.amountAed}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
