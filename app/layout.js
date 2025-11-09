import "./globals.css";
import Providers from "./providers"

const metadata = {
  title: "Exercise App",
  description: "Browse and build workouts using ExerciseDB API",
};

export default function RootLayout({ children }) {
  const year = new Date().getFullYear()

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen font-sans bg-background text-gorefround transition-colors duration-300">
        <Providers>
        {/* <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          <header className="space-y-1">
            <h1 className="text-3xl font-bold text-primary">ExerciseDB App</h1>
            <p className="text-sm text-muted-foreground">Your personalized workout companion</p>
          </header>

          <main className="rounded-xl border border-border p-6 space-y-6">
            {children}
          </main>

          <footer className="text-center text-sm text-muted-foreground">
            &copy; <time dateTime={String(year)}>{year}</time> ExerciseDB App. All rights reserved.
          </footer>
        </div> */}
        {children}
        </Providers>
      </body>
    </html>
  );
}
