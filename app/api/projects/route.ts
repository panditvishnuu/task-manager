import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Fetch all projects
export async function GET() {
  try {
    // Retrieve all projects from the database, ordered by creation date
    const allProjects = await db
      .select()
      .from(projects)
      .orderBy(projects.createdAt);

    return NextResponse.json(allProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}



// Update an existing project
export async function PUT(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Update project details in the database
    const updatedProject = await db
      .update(projects)
      .set({
        name: body.name,
      })
      .where(eq(projects.id, body.id))
      .returning(); // Return updated project details

    return NextResponse.json(updatedProject[0]);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// Delete a project
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Ensure project ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const numericId = Number(id); // Convert string ID to number

    // Validate if ID is a valid number
    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    // Delete project from the database
    await db.delete(projects).where(eq(projects.id, numericId));

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}