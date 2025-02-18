import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { and, eq, gt, sql } from "drizzle-orm";

export async function GET() {
  try {
    // Execute a single query to get all statistics
    const stats = await db
      .select({
        totalTasks: sql<number>`count(*)`,
        completedTasks: sql<number>`sum(case when ${tasks.completed} = true then 1 else 0 end)`,
        overdueTasks: sql<number>`sum(case when ${tasks.dueDate} < now() and ${tasks.completed} = false then 1 else 0 end)`,
        highPriorityTasks: sql<number>`sum(case when ${tasks.priority} = 2 then 1 else 0 end)`,
      })
      .from(tasks);

    const data = stats[0];
    const completionPercentage =
      data.totalTasks > 0
        ? Math.round(
            (Number(data.completedTasks) / Number(data.totalTasks)) * 100
          )
        : 0;

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
