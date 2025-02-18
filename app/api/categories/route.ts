import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Fetch all categories
export async function GET() {
  try {
    // Retrieve all categories from the database, ordered by creation date
    const allCategories = await db
      .select()
      .from(categories)
      .orderBy(categories.createdAt);

    return NextResponse.json(allCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// Create a new category
export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Insert new category into the database
    const newCategory = await db
      .insert(categories)
      .values({
        name: body.name,
        color: body.color,
      })
      .returning(); // Return the newly created category

    return NextResponse.json(newCategory[0]);
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

// Update an existing category
export async function PUT(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Update category details in the database
    const updatedCategory = await db
      .update(categories)
      .set({
        name: body.name,
        color: body.color,
      })
      .where(eq(categories.id, body.id))
      .returning(); // Return updated category details

    return NextResponse.json(updatedCategory[0]);
  } catch (error) {
    console.error("Error updating category:", error);
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

    // Ensure category ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    const numericId = Number(id); // Convert string ID to number

    // Validate if ID is a valid number
    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }

    // Delete category from the database
    await db.delete(categories).where(eq(categories.id, numericId));

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
