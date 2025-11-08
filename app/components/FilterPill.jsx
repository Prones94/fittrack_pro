'use client'
import React from "react"
import classNames from "classnames"

export default function FilterPill({ label, selected, onClick }) {
  const pillClasses = classNames(
    "inline-flex items-center whitespace-nowrap",
    "px-3 py-1 rounded-full text-sm",
    "cursor-pointer transition-colors duration-200 outline-none",
    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
    selected
    ? "bg-primary text-primary-foreground"
    : "bg-muted hover:bg-muted/80 dark:bg-gray-800 dark:hover:bg-gray-700",
    className
  )
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      data-testid="filter-pill"
      data-selected={selected ? "true" : "false"}
      className={pillClasses}
      {...props}
    >
      {label}
    </button>
  )
}