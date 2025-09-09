import React from 'react';
import { combineClasses } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  console.log("combineClasses type:", typeof combineClasses);
  return (
    <div
      data-slot="skeleton"
      className={combineClasses("bg-accent animate-pulse rounded-md", className)}
      {...props} />
  );
}

export { Skeleton }
