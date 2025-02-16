import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { Bell } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Button variant="outline" size="sm">
            Profile
          </Button>
        </div>
      </div>
    </header>
  );
}