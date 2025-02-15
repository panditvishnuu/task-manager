// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Textarea } from "./ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { toast } from "sonner";

// export default function TaskForm() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     priority: "0",
//     category: "",
//     project: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch("/api/tasks", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...task,
//           priority: parseInt(task.priority),
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create task");
//       }

//       setTask({
//         title: "",
//         description: "",
//         priority: "0",
//         category: "",
//         project: "",
//       });
//       toast.success("Task created successfully");
//       router.refresh();
//     } catch (error) {
//       console.error("Failed to create task:", error);
//       toast.error("Failed to create task. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-4 bg-card p-6 rounded-lg shadow-sm"
//     >
//       <div>
//         <Input
//           placeholder="Task title"
//           value={task.title}
//           onChange={(e) => setTask({ ...task, title: e.target.value })}
//           required
//         />
//       </div>
//       <div>
//         <Textarea
//           placeholder="Task description"
//           value={task.description}
//           onChange={(e) => setTask({ ...task, description: e.target.value })}
//           className="min-h-[100px]"
//         />
//       </div>
//       <div>
//         <Select
//           value={task.priority}
//           onValueChange={(value: any) => setTask({ ...task, priority: value })}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select priority" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="0">Low</SelectItem>
//             <SelectItem value="1">Medium</SelectItem>
//             <SelectItem value="2">High</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       <div>
//         <Input
//           placeholder="Category"
//           value={task.category}
//           onChange={(e) => setTask({ ...task, category: e.target.value })}
//           required
//         />
//       </div>
//       <div>
//         <Input
//           placeholder="Project"
//           value={task.project}
//           onChange={(e) => setTask({ ...task, project: e.target.value })}
//           required
//         />
//       </div>
//       <Button type="submit" disabled={loading}>
//         {loading ? "Creating..." : "Create Task"}
//       </Button>
//     </form>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";

// Define TypeScript types for categories & projects
interface Category {
  id: number;
  name: string;
}

interface Project {
  id: number;
  name: string;
}

export default function TaskForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true); // Track API loading state

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "0",
    categoryId: "",
    projectId: "",
  });

  // Fetch categories & projects on first render
  useEffect(() => {
    const fetchCategoriesAndProjects = async () => {
      try {
        const [categoriesRes, projectsRes] = await Promise.all([
          fetch("/api/categories"), // Make sure these endpoints exist
          fetch("/api/projects"),
        ]);

        if (!categoriesRes.ok || !projectsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const categoriesData = await categoriesRes.json();
        const projectsData = await projectsRes.json();

        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setProjects(Array.isArray(projectsData) ? projectsData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load categories & projects");
      } finally {
        setIsDataLoading(false); // Stop showing loading state
      }
    };

    fetchCategoriesAndProjects();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...task,
          priority: parseInt(task.priority),
          categoryId: task.categoryId ? parseInt(task.categoryId) : null,
          projectId: task.projectId ? parseInt(task.projectId) : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      setTask({
        title: "",
        description: "",
        priority: "0",
        categoryId: "",
        projectId: "",
      });
      toast.success("Task created successfully");
      router.refresh();
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-card p-6 rounded-lg shadow-sm"
    >
      {/* Show a loading message while categories/projects are loading */}
      {isDataLoading ? (
        <p className="text-center text-gray-500">
          Loading categories & projects...
        </p>
      ) : (
        <>
          {/* Task Title */}
          <Input
            placeholder="Task title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />

          {/* Task Description */}
          <Textarea
            placeholder="Task description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="min-h-[100px]"
          />

          {/* Priority Selection */}
          <Select
            value={task.priority}
            onValueChange={(value) => setTask({ ...task, priority: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Low</SelectItem>
              <SelectItem value="1">Medium</SelectItem>
              <SelectItem value="2">High</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Selection */}
          <Select
            value={task.categoryId}
            onValueChange={(value) => setTask({ ...task, categoryId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value={"value"}>No categories found</SelectItem>
              )}
            </SelectContent>
          </Select>

          {/* Project Selection */}
          <Select
            value={task.projectId}
            onValueChange={(value) => setTask({ ...task, projectId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <SelectItem key={project.id} value={project.id.toString()}>
                    {project.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value={"value"}>No projects found</SelectItem>
              )}
            </SelectContent>
          </Select>

          {/* Submit Button */}
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Task"}
          </Button>
        </>
      )}
    </form>
  );
}
