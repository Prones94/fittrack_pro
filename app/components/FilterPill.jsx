'use client'
import React from "react"
import classNames from "classnames"

export default function FilterPill({ label, selected, onClick }) {
  const pillClasses = classNames(
    'px-3 py-1 rounded-full text-sm cursor-pointer transition-colors duration-200',
        {
          'bg-primary text-primary-foreground': selected,
          'bg-muted hover:bg-muted/80 dark:bg-gray-800 dark:hover:bg-gray-700': !selected
        }
  )
  return (
    <span
      onClick={onClick}
      data-testid="filter-pill"
      className={pillClasses}
    >
      {label}
    </span>
  )
}