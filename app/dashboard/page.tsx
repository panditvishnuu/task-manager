"use client";

import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import { StatsCard } from "@/components/StatsCard";
import { DeadlinesCard } from "@/components/DeadlinesCard";
import { MobileSidebar } from "@/components/MobileSidebar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar/>

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 container mx-auto px-4 md:px-8 py-6 md:py-8">
          <ErrorBoundary>
            <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
              {/* Left Section */}
              <div className="flex flex-col gap-6 lg:w-96 lg:min-w-96">
                <TaskForm />
              </div>

              {/* Right Section */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                  <StatsCard />
                  <DeadlinesCard />
                </div>

                {/* Task List Section */}
                <div className="mt-6 flex-1 overflow-y-auto">
                  <TaskList />
                </div>
              </div>
            </div>
          </ErrorBoundary>
          <Toaster />
        </main>
      </div>
    </div>
  );
}
