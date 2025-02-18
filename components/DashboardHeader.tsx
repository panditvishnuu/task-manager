import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";
import { UserButton } from "@clerk/nextjs"; // Import the UserButton component
import { SignedIn, SignedOut } from "@clerk/nextjs"; // Import SignedIn and SignedOut for conditional rendering

export function DashboardHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold ml-12">Dashboard</h1>

        <div className="flex items-center space-x-4">
          {/* Notification Bell Button */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Conditional Rendering for User Profile */}
          <SignedIn>
            {/* Show the UserButton when the user is signed in */}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            {/* Show a login button or profile button when the user is signed out */}
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
