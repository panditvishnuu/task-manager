"use client";

import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import { toast } from "sonner";
import { useState } from "react";
import { StatsCard } from "@/components/StatsCard";
import { DeadlinesCard } from "@/components/DeadlinesCard";

const mockTasks = [
  {
    id: "1",
    title: "Complete project proposal",
    dueDate: "2024-05-20",
    completed: false,
  },
  { id: "2", title: "Fix UI bugs", dueDate: "2024-05-18", completed: true },
  {
    id: "3",
    title: "Prepare presentation",
    dueDate: "2024-05-22",
    completed: false,
  },
];

export default function DashboardPage() {
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Upcoming deadlines (tasks due in the next 7 days)
  const upcomingDeadlines = tasks
    .filter((task) => {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      const nextWeek = new Date(today.setDate(today.getDate() + 7));
      return dueDate >= new Date() && dueDate <= nextWeek && !task.completed;
    })
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

  // Handle task completion toggle
  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    toast.success("Task status updated");
  };

  // Handle task deletion
  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast.success("Task deleted");
  };

  // Calendar events for tasks
  const calendarEvents = tasks.map((task) => ({
    title: task.title,
    date: new Date(task.dueDate),
    completed: task.completed,
  }));

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

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
                  <DeadlinesCard
                    deadlines={upcomingDeadlines}
                    onToggleCompletion={toggleTaskCompletion}
                  />
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
