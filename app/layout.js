import "./globals.css";

export const metadata = {
  title: "Exercise App",
  description: "Browse and build workouts using ExerciseDB API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 font-sans">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

          {/* Header */}
          <header className="space-y-1">
            <h1 className="text-3xl font-bold text-[var(--primary)]">ExerciseDB App</h1>
            <p className="text-sm text-[var(--muted-foreground)]">Your personalized workout companion</p>
          </header>

          {/* Main Content */}
          <main className="rounded-xl border border-[var(--border)] p-6 space-y-6">
            {children}
          </main>

          {/* Footer */}
          <footer className="text-center text-sm text-[var(--muted-foreground)]">
            &copy; {new Date().getFullYear()} ExerciseDB App. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
