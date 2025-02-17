import { ReactNode } from "react";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: number;
  status: string;
  dueDate?: Date;
  projectId?: number;
  categoryId?: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type Color = string; // Define Color type

export interface Project {
  color: Color | undefined;
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  icon: ReactNode;
  id: number;
  name: string;
  color: string;
  createdAt: Date;
}
