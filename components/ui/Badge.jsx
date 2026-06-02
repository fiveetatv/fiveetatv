import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-accent/10 text-accent border-accent/20",
    secondary: "bg-highlight/20 text-foreground/80 border-highlight/30",
    outline: "border-foreground/20 text-foreground/70",
    luxury: "bg-white/80 backdrop-blur-sm text-foreground/70 border-border/50",
    success: "bg-accent/15 text-accent border-accent/30",
    warning: "bg-highlight/30 text-foreground/70 border-highlight/50",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-light tracking-tight border transition-all duration-500",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }
