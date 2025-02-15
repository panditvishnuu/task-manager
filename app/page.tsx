
import HeroPage from '@/components/HeroPage';
import { Toaster } from '@/components/ui/sonner';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <ErrorBoundary>
        <HeroPage />
      </ErrorBoundary>
      <Toaster />
    </main>
  );
}