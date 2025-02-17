import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Fetch all categories
export async function GET() {
  try {
    const allCategories = await db
      .select()
      .from(categories)
      .orderBy(categories.createdAt);
    return NextResponse.json(allCategories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// Create a new category
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCategory = await db
      .insert(categories)
      .values({
        name: body.name,
        color: body.color,
      })
      .returning();
    return NextResponse.json(newCategory[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

// Update an existing category
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updatedCategory = await db
      .update(categories)
      .set({
        name: body.name,
        color: body.color,
      })
      .where(eq(categories.id, body.id))
      .returning();
    return NextResponse.json(updatedCategory[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

// Delete a category
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    const numericId = Number(id); // Convert string ID to number

    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }

    await db.delete(categories).where(eq(categories.id, numericId)); // Use numeric ID

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}