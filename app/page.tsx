import HeroPage from "@/components/HeroPage";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Define the Home component as the default export
export default function Home() {
  return (
    // Main container with Tailwind CSS classes for styling
    <main className="container mx-auto px-4 py-8">
      {/* Wrap the HeroPage component with an ErrorBoundary to catch and handle errors */}
      <ErrorBoundary>
        <HeroPage />
      </ErrorBoundary>
      {/* Include the Toaster component for displaying toast notifications */}
      <Toaster />
    </main>
  );
}
