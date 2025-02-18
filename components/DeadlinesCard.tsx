import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton"; // For loading state
import { Check, AlertCircle, Clock, Flag } from "lucide-react"; // Icons for better visuals

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
}

export const DeadlinesCard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Toggle task completion
  const onToggleCompletion = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: "done" }), // Update status to "done"
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      // Update the local state to reflect the change
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, status: "done" } : task
        )
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <Card className="border shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {loading ? (
          // Loading state
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : tasks.length > 0 ? (
          // Display tasks
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  {/* Priority Icon */}
                  {task.priority === "high" ? (
                    <Flag className="h-4 w-4 text-red-500" />
                  ) : task.priority === "medium" ? (
                    <Flag className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <Flag className="h-4 w-4 text-green-500" />
                  )}

                  <div>
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                
              </div>
            ))}
          </div>
        ) : (
          // No tasks state
          <div className="flex flex-col items-center justify-center p-6">
            <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              No upcoming deadlines.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
