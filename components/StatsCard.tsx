"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  completionPercentage: number;
  overdueTasks: number;
  highPriorityTasks: number;
}

export const StatsCard = () => {
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/tasks/stats");
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        setStats(data);
        console.log(data);
        
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load stats"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <StatsSkeleton />;
  if (error) return <StatsError error={error} />;
  if (!stats) return null;

  return (
    <Card className="border">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-medium">Task Statistics</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        <StatItem label="Total Tasks" value={stats.totalTasks} />
        <StatItem label="Completed Tasks" value={stats.completedTasks} />
        <StatItem label="Overdue Tasks" value={stats.overdueTasks} />
        <StatItem label="High Priority Tasks" value={stats.highPriorityTasks} />

        <div>
          <p className="text-xs text-muted-foreground mb-1">
            Completion Progress
          </p>
          <Progress
            value={stats.completionPercentage}
            className="h-2 bg-muted"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {stats.completionPercentage}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper components
const StatsSkeleton = () => (
  <Card className="border">
    <CardHeader className="p-4 pb-2">
      <Skeleton className="h-4 w-[120px]" />
    </CardHeader>
    <CardContent className="p-4 pt-0 space-y-3">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-6 w-full" />
      ))}
      <Skeleton className="h-2 w-full" />
    </CardContent>
  </Card>
);

const StatsError = ({ error }: { error: string }) => (
  <Card className="border">
    <CardHeader className="p-4 pb-2">
      <CardTitle className="text-sm font-medium">Task Statistics</CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <p className="text-sm text-red-500">{error}</p>
    </CardContent>
  </Card>
);

const StatItem = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between items-center">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-lg font-bold">{value}</p>
  </div>
);
