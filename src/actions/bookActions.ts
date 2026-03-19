"use server"

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { addBook } from "@/lib/data";

export type BookFormState = {
  errors?: {
    title?: string;
    author?: string;
    synopsis?: string;
    image?: string;
  };
  success?: boolean;
};

export async function publishBook(
  _prevState: BookFormState,
  formData: FormData
): Promise<BookFormState> {
  const title = formData.get("title")?.toString().trim();
  const author = formData.get("author")?.toString().trim();
  const synopsis = formData.get("synopsis")?.toString().trim();
  const imageFile = formData.get("image") as File | null;

  // Validate required text fields
  const errors: BookFormState["errors"] = {};
  if (!title) errors.title = "El título es requerido";
  if (!author) errors.author = "El autor es requerido";
  if (!synopsis) errors.synopsis = "La sinopsis es requerida";

  // Validate image type if provided
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (imageFile && imageFile.size > 0 && !ALLOWED_TYPES.includes(imageFile.type)) {
    errors.image = "Solo se permiten imágenes JPG, PNG o WEBP";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // Generate slug from title
  const slug = title!
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  // Handle image upload
  let imagePath = "/default-book.jpg";
  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = path.extname(imageFile.name) || ".jpg";
    const filename = `${slug}-${Date.now()}${ext}`;
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadsDir, { recursive: true });
    await writeFile(path.join(uploadsDir, filename), buffer);

    imagePath = `/uploads/${filename}`;
  }

  addBook({
    title: title!,
    author: author!,
    synopsis: synopsis!,
    slug,
    price: 0,
    image: imagePath,
  });

  revalidatePath("/");

  return { success: true };
}
