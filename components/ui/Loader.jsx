export default function Loader({ label = "Loading..." }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-[#5d7653]">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#c6d99a] border-t-[#4f6d3f]" />
      {label}
    </div>
  );
}
