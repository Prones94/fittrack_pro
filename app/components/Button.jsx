"use client";

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { combineClasses } from "../lib/utils";
export const Button = React.forwardRef(
  ({ className, variant = "primary", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const variants = {
      primary: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90",
      secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:opacity-90",
      ghost: "bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)]",
    };

    return (
      <Comp
        ref={ref}
        className={combineClasses(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
