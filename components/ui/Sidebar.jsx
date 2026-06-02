import clsx from "clsx";

export default function Sidebar({ items, activeKey, onChange, className }) {
  return (
    <aside className={clsx("h-fit rounded-2xl border border-[#dbe8bf] bg-white p-3 shadow-[0_16px_34px_-28px_rgba(62,93,49,0.65)]", className)}>
      {items.map((item) => {
        const active = item.key === activeKey;
        const Icon = item.icon;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className={clsx(
              "mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition",
              active ? "bg-[#eef5d7] text-[#35512d]" : "text-[#607759] hover:bg-[#f6fae8]"
            )}
          >
            {Icon ? <Icon className="h-4 w-4" /> : null}
            {item.label}
          </button>
        );
      })}
    </aside>
  );
}
