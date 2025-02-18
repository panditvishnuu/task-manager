import { db } from "@/lib/db"; // Database instance
import { tasks } from "@/lib/db/schema"; // Tasks table schema
import { eq } from "drizzle-orm"; // Utility for SQL equality checks
import { NextResponse } from "next/server"; // Next.js response utility

/**
 * GET /api/tasks
 * Fetches all tasks from the database, ordered by creation date.
 */
export async function GET() {
  try {
    // Fetch all tasks from the database, ordered by createdAt
    const allTasks = await db.select().from(tasks).orderBy(tasks.createdAt);
    return NextResponse.json(allTasks); // Return the tasks as JSON
  } catch (error) {
    // Handle errors and return a 500 status code
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tasks
 * Creates a new task in the database.
 */
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Insert a new task into the database and return the created task
    const newTask = await db
      .insert(tasks)
      .values({
        title: body.title, // Task title
        description: body.description, // Task description
        priority: body.priority || 0, // Task priority (defaults to 0 if not provided)
        status: "todo", // Default status for new tasks
      })
      .returning(); // Return the newly created task

    return NextResponse.json(newTask[0]); // Return the created task as JSON
  } catch (error) {
    // Handle errors and return a 500 status code
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/tasks
 * Updates an existing task in the database.
 */
export async function PUT(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Update the task in the database and return the updated task
    const updatedTask = await db
      .update(tasks)
      .set({
        title: body.title, // Updated title
        description: body.description, // Updated description
        priority: body.priority, // Updated priority
        status: body.status, // Updated status
        completed: body.completed, // Updated completion status
        updatedAt: new Date(), // Set the updatedAt timestamp to the current time
      })
      .where(eq(tasks.id, body.id)) // Find the task by its ID
      .returning(); // Return the updated task

    return NextResponse.json(updatedTask[0]); // Return the updated task as JSON
  } catch (error) {
    // Handle errors and return a 500 status code
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tasks
 * Deletes a task from the database.
 */
export async function DELETE(request: Request) {
  try {
    // Extract the task ID from the URL query parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Validate that the task ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    // Delete the task from the database
    await db.delete(tasks).where(eq(tasks.id, id));

    // Return a success message
    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    // Handle errors and return a 500 status code
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
