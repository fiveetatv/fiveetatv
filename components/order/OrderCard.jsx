import Image from "next/image";
import OrderTimeline from "@/components/ui/OrderTimeline";
import { Badge } from "@/components/ui/Badge";
import { Calendar, CreditCard, ShoppingBag } from "lucide-react";

export default function OrderCard({ order }) {
  const paymentMethod = order.paymentMethod || "razorpay";
  const items = order.items || [];
  
  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.025)] transition-all duration-500 flex flex-col gap-6">
      
      {/* 1. Header Information */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-5">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-normal text-slate-400">Order ID</span>
          <p className="font-mono text-sm font-semibold text-slate-800">{order.orderId}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <div className="text-left">
              <span className="text-[9px] font-bold uppercase tracking-normal text-slate-400 block leading-none">Date</span>
              <span className="text-xs text-slate-600 font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CreditCard size={16} className="text-slate-400" />
            <div className="text-left">
              <span className="text-[9px] font-bold uppercase tracking-normal text-slate-400 block leading-none">Payment</span>
              <Badge variant={paymentMethod === "cod" ? "warning" : "success"} className="capitalize mt-0.5 text-[10px] py-0 px-2 font-medium">
                {paymentMethod === "cod" ? "Cash on Delivery" : "Online"}
              </Badge>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[9px] font-bold uppercase tracking-normal text-slate-400 block leading-none">Grand Total</span>
            <span className="text-lg font-bold text-accent">₹{order.amount}</span>
          </div>
        </div>
      </div>

      {/* 2. Timeline Section */}
      <div className="bg-slate-50/50 border border-slate-100/50 rounded-2xl p-6">
        <OrderTimeline status={order.status} />
      </div>

      {/* 3. Items Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-400">
          <ShoppingBag size={14} />
          <span className="text-[10px] font-bold uppercase tracking-normal">Items ({items.length})</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <div 
              key={`${order._id}-${item.productId}`} 
              className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-[#fbfdf3]/30 p-3 hover:bg-[#fbfdf3]/60 transition-colors duration-300"
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white border border-slate-100 shadow-sm flex-shrink-0">
                <Image src={item.image} alt={item.name} fill sizes="56px" className="object-contain p-1" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-800 truncate">{item.name}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
