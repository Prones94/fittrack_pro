"use client";

import { useState } from "react";
import { Button } from "@/app/components/Button";

export default function ExercisesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="flex flex-col lg:flex-row gap-8 px-4 py-8 max-w-screen-xl mx-auto">
      <aside className="w-full lg:w-1/4 border border-[var(--border)] rounded-lg p-4 space-y-4">
        <h2 className="text-xl font-bold text-[var(--primary)]">Filters</h2>
        <div>
          <h3 className="text-sm font-semibold mb-2">Body Part</h3>
          <div className="space-y-1 text-sm text-[var(--muted-foreground)]">
            <label><input type="checkbox" /> Chest</label>
            <label><input type="checkbox" /> Legs</label>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Equipment</h3>
          <div className="space-y-1 text-sm text-[var(--muted-foreground)]">
            <label><input type="checkbox" /> Dumbbell</label>
            <label><input type="checkbox" /> Barbell</label>
          </div>
        </div>

        <Button variant="ghost">Clear Filters</Button>
      </aside>

      <section className="flex-1 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-[var(--border)] rounded-md px-4 py-2 bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
          />
          <Button>Search</Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="border border-[var(--border)] rounded-lg p-4 bg-[var(--card)] text-[var(--card-foreground)]"
            >
              <h4 className="font-semibold">Exercise {i + 1}</h4>
              <p className="text-sm text-[var(--muted-foreground)]">Body Part: Legs</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
