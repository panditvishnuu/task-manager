import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { and, eq, gt, sql } from "drizzle-orm";

export async function GET() {
  try {
    // Fetching task statistics in a single optimized query
    const stats = await db
      .select({
        totalTasks: sql<number>`count(*)`, // Total number of tasks
        completedTasks: sql<number>`sum(case when ${tasks.completed} = true then 1 else 0 end)`, // Count of completed tasks
        overdueTasks: sql<number>`sum(case when ${tasks.dueDate} < now() and ${tasks.completed} = false then 1 else 0 end)`, // Count of overdue tasks
        highPriorityTasks: sql<number>`sum(case when ${tasks.priority} = 2 then 1 else 0 end)`, // Count of high-priority tasks
      })
      .from(tasks);

    const data = stats[0];

    // Calculating completion percentage
    const completionPercentage =
      data.totalTasks > 0
        ? Math.round(
            (Number(data.completedTasks) / Number(data.totalTasks)) * 100
          )
        : 0;

    // Returning formatted response
    return NextResponse.json({
      totalTasks: Number(data.totalTasks),
      completedTasks: Number(data.completedTasks),
      completionPercentage,
      overdueTasks: Number(data.overdueTasks),
      highPriorityTasks: Number(data.highPriorityTasks),
    });
  } catch (error) {
    console.error("Failed to fetch task statistics:", error);
    return NextResponse.json(
      { error: "Failed to fetch task statistics" },
      { status: 500 }
    );
  }
}
