'use client'

export default function FilterPill({ label, isSelected, onClick }) {
  return (
    <span
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors duration-200 ${
        isSelected
          ? 'bg-blue-500 text-white'
          : 'bg-muted hover:bg-muted/80 dark:gray-800 dark:hover:bg-gray-700'
      }`}
    >
      {label}
    </span>
  )
}