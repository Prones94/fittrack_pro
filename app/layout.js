"use client";
import "./globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from "react"

export const metadata = {
  title: "Exercise App",
  description: "Browse and build workouts using ExerciseDB API",
};

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 font-sans">
        <QueryClientProvider client={queryClient}>
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

          <header className="space-y-1">
            <h1 className="text-3xl font-bold text-[var(--primary)]">ExerciseDB App</h1>
            <p className="text-sm text-[var(--muted-foreground)]">Your personalized workout companion</p>
          </header>

          <main className="rounded-xl border border-[var(--border)] p-6 space-y-6">
            {children}
          </main>

          <footer className="text-center text-sm text-[var(--muted-foreground)]">
            &copy; {new Date().getFullYear()} ExerciseDB App. All rights reserved.
          </footer>
        </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
