"use client";

export default function ProductSkeleton() {
  return (
    <div className="flex flex-col w-full animate-pulse">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200" />
      <div className="pt-5 pb-2 px-1 space-y-3">
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-200 rounded w-1/3" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}