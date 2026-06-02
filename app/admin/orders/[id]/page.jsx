import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

async function getOrder(id) {
  await connectDB();
  const order = await Order.findById(id).populate("user", "name email phone").lean();
  return order ? JSON.parse(JSON.stringify(order)) : null;
}

export default async function AdminOrderDetailsPage({ params }) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") notFound();

  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  return (
    <section className="space-y-5">
      <h1 className="font-display text-3xl text-[#36532f]">Order Details</h1>
      <div className="rounded-2xl border border-[#dbe8bf] bg-white p-5 text-sm">
        <p><span className="font-semibold">Order ID:</span> {order.orderId}</p>
        <p><span className="font-semibold">Customer:</span> {order.user?.name}</p>
        <p><span className="font-semibold">Phone:</span> {order.address?.phone || order.user?.phone}</p>
        <p><span className="font-semibold">Address:</span> {order.address?.addressLine}, {order.address?.city}</p>
        <p><span className="font-semibold">Payment:</span> {(order.paymentMethod || "razorpay").toUpperCase()}</p>
        <p><span className="font-semibold">Amount:</span> Rs. {order.amount}</p>
        <p><span className="font-semibold">Status:</span> <span className="capitalize">{order.status}</span></p>
      </div>
      <div className="rounded-2xl border border-[#dbe8bf] bg-white p-5">
        <h2 className="mb-3 text-xl font-semibold text-[#36532f]">Items</h2>
        <div className="space-y-2 text-sm">
          {(order.items || []).map((item) => (
            <div key={`${item.productId}-${item.name}`} className="flex justify-between rounded-lg border border-[#eef3dd] bg-[#fbfdf3] px-3 py-2">
              <span>{item.name} x {item.quantity}</span>
              <span>Rs. {item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
