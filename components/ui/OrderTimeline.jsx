"use client";

import { Package, RefreshCw, Truck, CheckCircle2 } from "lucide-react";

const steps = [
  { key: "placed", label: "Placed", icon: Package },
  { key: "processing", label: "Processing", icon: RefreshCw },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

export default function OrderTimeline({ status = "placed" }) {
  const activeIndex = Math.max(0, steps.findIndex(s => s.key === status));
  const progressPercent = `${(activeIndex / (steps.length - 1)) * 100}%`;

  return (
    <div className="w-full py-4">
      {/* Container - flex-col on mobile, flex-row on desktop */}
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-0 w-full">
        
        {/* Progress Line - Vertical on Mobile */}
        <div className="absolute left-5 -translate-x-1/2 top-5 bottom-5 w-[3px] bg-slate-100 z-0 sm:hidden">
          <div 
            className="bg-accent rounded-full transition-all duration-700 ease-out w-full"
            style={{ height: progressPercent }}
          />
        </div>

        {/* Progress Line - Horizontal on Desktop */}
        <div className="absolute left-[12.5%] right-[12.5%] top-5 -translate-y-1/2 h-[3px] bg-slate-100 z-0 hidden sm:block">
          <div 
            className="bg-accent rounded-full transition-all duration-700 ease-out h-full"
            style={{ width: progressPercent }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx < activeIndex;
          const isActive = idx === activeIndex;

          return (
            <div 
              key={step.key} 
              className="flex items-center gap-4 relative z-10 sm:flex-col sm:items-center sm:gap-0 sm:flex-1"
            >
              {/* Icon Circle */}
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 shadow-sm flex-shrink-0 bg-white ${
                  isCompleted 
                    ? "bg-[#6c875d] border-[#6c875d] text-white" 
                    : isActive 
                      ? "bg-accent border-accent text-white scale-110 ring-4 ring-accent/15" 
                      : "border-slate-200 text-slate-400"
                }`}
              >
                <Icon 
                  size={18} 
                  className={isActive && step.key === "processing" ? "animate-spin" : ""} 
                  style={{ animationDuration: isActive && step.key === "processing" ? "4s" : undefined }} 
                />
              </div>

              {/* Label */}
              <span 
                className={`text-xs font-bold uppercase tracking-normal transition-colors duration-500 sm:mt-2.5 ${
                  isCompleted || isActive ? "text-[#4d6443]" : "text-slate-400 font-medium"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
