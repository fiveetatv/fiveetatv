export default function LoadingSkeleton({ rows = 3 }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-6 rounded bg-emerald-100/70" />
      ))}
    </div>
  );
}
