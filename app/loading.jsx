import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse mb-8">
          <div className="h-12 bg-slate-200 rounded-lg w-64 mb-2"></div>
          <div className="h-5 bg-slate-100 rounded w-96"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="aspect-[3/4] bg-slate-100 rounded-xl mb-4"></div>
              <div className="h-6 bg-slate-100 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}