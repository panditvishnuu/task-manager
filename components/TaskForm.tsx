"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Zod schema for form validation
const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500).optional(),
  projectId: z.string().min(1, "Please select a project"),
  categoryId: z.string().min(1, "Please select a category"),
  priority: z.enum(["0", "1", "2"]),
  dueDate: z.date().optional(),
});

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface Project {
  id: number;
  name: string;
  color: string;
}

export default function TaskForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Fetch categories and projects on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, projectsRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/projects"),
        ]);

        if (!categoriesRes.ok || !projectsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [categoriesData, projectsData] = await Promise.all([
          categoriesRes.json(),
          projectsRes.json(),
        ]);

        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setProjects(Array.isArray(projectsData) ? projectsData : []);
      } catch (error) {
        console.error("Failed to fetch categories or projects:", error);
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      projectId: "",
      categoryId: "",
      priority: "0",
      dueDate: undefined,
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          priority: parseInt(values.priority),
          dueDate: values.dueDate?.toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to create task");

      form.reset();
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 bg-card p-4 rounded-lg border"
      >
        {/* Task Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Task Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter task title"
                  {...field}
                  className="h-8 text-sm"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Task Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Description (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter task description"
                  className="min-h-[80px] text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Project Selection */}
        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Project</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem
                      key={project.id}
                      value={project.id.toString()}
                      className="text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: project.color }}
                        />
                        {project.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Category Selection */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                      className="text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Priority Selection */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Priority</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0" className="text-sm">
                    Low
                  </SelectItem>
                  <SelectItem value="1" className="text-sm">
                    Medium
                  </SelectItem>
                  <SelectItem value="2" className="text-sm">
                    High
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Due Date Calendar */}
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm">Due Date (optional)</FormLabel>
              <FormControl>
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  minDate={new Date()}
                  placeholderText="Select due date"
                  className="flex h-8 w-full rounded-md border border-input bg-background px-2 text-sm"
                  dateFormat="MMMM d, yyyy"
                  isClearable
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={loading} className="w-full h-8 text-sm">
          {loading ? "Creating..." : "Create Task"}
        </Button>
      </form>
    </Form>
  );
}
