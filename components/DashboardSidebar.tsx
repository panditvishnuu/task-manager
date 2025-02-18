"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Calendar,
  LayoutDashboard,
  List,
  Settings,
  Target,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";

const menuItems = [
  { name: "Home", icon: LayoutDashboard, path: "/" },
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Tasks", icon: List, path: "#" },
  { name: "Calendar", icon: Calendar, path: "#" },
  { name: "Projects", icon: Target, path: "#" },
  { name: "Team", icon: Users, path: "#" },
  { name: "Settings", icon: Settings, path: "#" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "h-screen border-r bg-card flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <div className={cn("flex items-center", collapsed && "justify-center")}>
          <Target className="h-6 w-6" />
          {!collapsed && <span className="ml-2 font-bold">Taskly</span>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                pathname === item.path
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
                collapsed && "justify-center"
              )}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
