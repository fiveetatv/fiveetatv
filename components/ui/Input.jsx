import clsx from "clsx";

export default function Input({ label, error, className, icon, ...props }) {
  return (
    <div className="space-y-3 w-full">
      {label && (
        <label className="text-[10px] uppercase tracking-normal font-bold text-foreground/30 block ml-0.5">
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-foreground transition-colors duration-500">
            {icon}
          </span>
        )}
        <input
          className={clsx(
            "w-full bg-transparent border-b border-border py-4 text-base font-light transition-all duration-700 outline-none placeholder:text-foreground/10",
            "focus:border-foreground focus:placeholder:text-foreground/20",
            icon && "pl-12",
            error && "border-red-500/50 focus:border-red-500",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <span className="text-[10px] text-red-500 uppercase tracking-normal block font-bold">
          {error}
        </span>
      )}
    </div>
  );
}
