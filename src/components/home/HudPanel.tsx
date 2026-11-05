import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const CORNERS = [
  "-top-px -left-px border-t-2 border-l-2",
  "-top-px -right-px border-t-2 border-r-2",
  "-bottom-px -left-px border-b-2 border-l-2",
  "-right-px -bottom-px border-r-2 border-b-2",
];

/** A see-through panel with a faint grid, HUD corner brackets and an accent bar. */
export function HudPanel({
  className,
  children,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn("relative bg-panel hud-grid backdrop-blur-sm", className)}
      {...props}
    >
      {CORNERS.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={cn("absolute size-4 border-frame", position)}
        />
      ))}
      <span
        aria-hidden="true"
        className="absolute -bottom-px left-[30px] h-0.5 w-12 bg-frame"
      />
      {children}
    </section>
  );
}
