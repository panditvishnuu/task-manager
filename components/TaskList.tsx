"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { toast } from "sonner";

// Define the Task type based on your schema
type Task = {
  id: string;
  title: string;
  description: string | null;
  priority: number;
  dueDate: string | null;
  completed: boolean;
  projectId: number | null;
  categoryId: number | null;
  createdAt: string;
  updatedAt: string;
};

export default function TaskList() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all"); // Filter state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const tasksData = await response.json();
      setTasks(Array.isArray(tasksData) ? tasksData : []);
    } catch (error) {
      setError("Failed to fetch tasks. Please try again later.");
      toast.error("Failed to fetch tasks");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Toggle task completion status
  const toggleTaskStatus = async (task: Task) => {
    try {
      const response = await fetch(`/api/tasks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, completed: !task.completed }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      await fetchTasks(); // Refresh the data
      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task");
    }
  };

  // Delete a task
  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks?id=${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      await fetchTasks(); // Refresh the data
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task");
    }
  };

  // Get priority label with styling
  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 2:
        return <Badge variant="destructive">High</Badge>;
      case 1:
        return <Badge variant="secondary">Medium</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  // Filter tasks based on status and search query
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Loading state
  if (loading) {
    return <div className="text-center py-4">Loading tasks...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  // No tasks state
  if (tasks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">
        No tasks found. Create one to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="font-extrabold text-2xl mt-3 mb-3">Pending Tasks</h1>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2">
          {["all", "completed", "pending"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f as "all" | "completed" | "pending")}
              className="capitalize px-3 py-1 h-8 text-sm"
            >
              {f}
            </Button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-8 text-sm"
          />
          <span className="absolute left-3 top-2 text-muted-foreground">
            🔍
          </span>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex flex-col px-4 py-2 rounded-lg border shadow-sm ${
                task.completed ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskStatus(task)}
                  />
                  <span
                    className={`text-sm font-medium ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {getPriorityLabel(task.priority)}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              {/* Display description if available */}
              {task.description && (
                <div className="mt-1 text-sm text-gray-600">
                  {task.description}
                </div>
              )}

              {/* Display due date if available */}
              {task.dueDate && (
                <div className="mt-2 text-sm text-gray-500">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-4">
          No tasks match your criteria.
        </div>
      )}
    </div>
  );
}
