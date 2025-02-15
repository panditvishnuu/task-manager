
import { Toaster } from '@/components/ui/sonner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ThemeToggle } from '@/components/theme-toggle';
import Sidebar  from '@/components/Sidebar';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Taskly Dashboard</h1>
          <ThemeToggle />
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <ErrorBoundary>
          <div className="grid gap-8">
            <Sidebar />
          </div>
        </ErrorBoundary>
        <Toaster />
      </main>
    </div>
  );
}