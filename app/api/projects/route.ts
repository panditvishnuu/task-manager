import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Fetch all projects
export async function GET() {
  try {
    const allProjects = await db
      .select()
      .from(projects)
      .orderBy(projects.createdAt);
    return NextResponse.json(allProjects);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// Create a new project
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProject = await db
      .insert(projects)
      .values({
        name: body.name,
        description: body.description,
      })
      .returning();
    return NextResponse.json(newProject[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

// Update an existing project
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updatedProject = await db
      .update(projects)
      .set({
        name: body.name,
        description: body.description,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, body.id))
      .returning();
    return NextResponse.json(updatedProject[0]);
  } catch (error) {
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

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const numericId = Number(id); // Convert string ID to number

    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    await db.delete(projects).where(eq(projects.id, numericId)); // Pass number

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
