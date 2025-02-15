"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Task, Category, Project } from "@/lib/types";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

export default function TaskList() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [tasksRes, categoriesRes, projectsRes] = await Promise.all([
        fetch("/api/tasks"),
        fetch("/api/categories"),
        fetch("/api/projects"),
      ]);

      if (!tasksRes.ok || !categoriesRes.ok || !projectsRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const [tasksData, categoriesData, projectsData] = await Promise.all([
        tasksRes.json(),
        categoriesRes.json(),
        projectsRes.json(),
      ]);

      setTasks(Array.isArray(tasksData) ? tasksData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      setProjects(Array.isArray(projectsData) ? projectsData : []);
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
      toast.error("Failed to fetch data");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleTaskStatus = async (task: Task) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, completed: !task.completed }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      await fetchData();
      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task");
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks?id=${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      await fetchData();
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task");
    }
  };

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

  if (loading) {
    return <div className="text-center py-4">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="font-extrabold text-2xl mt-3 mb-3">Pending Tasks</h1>
      {tasks.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No tasks yet. Create one above!
        </p>
      ) : (
        tasks.map((task) => {
          const taskCategory = categories.find(
            (cat) => cat.id === task.categoryId
          );
          const taskProject = projects.find(
            (proj) => proj.id === task.projectId
          );

          return (
            <div
              key={task.id}
              className={`flex flex-col p-4 rounded-lg border shadow-sm ${
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

              {/* Display category and project */}
              <div className="flex gap-2 mt-2 text-sm text-gray-600">
                {taskCategory && (
                  <Badge style={{ backgroundColor: taskCategory.color }}>
                    {taskCategory.name}
                  </Badge>
                )}
                {taskProject && (
                  <Badge variant="secondary">{taskProject.name}</Badge>
                )}
              </div>
            </div>
          );
        })
      )}

      {/* Categories Section */}
      <h1 className="font-extrabold text-2xl mt-6 mb-3">Categories</h1>
      {categories.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No categories found.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      )}

      {/* Projects Section */}
      <h1 className="font-extrabold text-2xl mt-6 mb-3">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-center text-muted-foreground">No projects found.</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-bold">{project.name}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
