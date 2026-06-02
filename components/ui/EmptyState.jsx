export default function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#d8c7b1] bg-white p-10 text-center shadow-[0_20px_45px_-38px_rgba(80,95,58,0.8)]">
      <h3 className="text-xl font-semibold text-[#3f2c22]">{title}</h3>
      <p className="mt-2 text-sm text-[#6d5648]">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
