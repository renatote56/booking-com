"use server"

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type CartItem = { title: string; slug: string; price: number };

const CART_COOKIE = "libros_cart";

async function readCart(): Promise<CartItem[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(CART_COOKIE)?.value;
  if (!raw) return [];
  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

async function writeCart(cart: CartItem[]): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE, JSON.stringify(cart), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });
}

export async function addToCart(formData: FormData) {
  const title = formData.get("title");
  if (!title) throw new Error("Error: No se encontró ningún título.");

  const slug = formData.get("slug");
  if (!slug) throw new Error("Error: No se encontró ningún slug.");

  const price = formData.get("price");
  if (!price) throw new Error("Error: No se encontró ningún precio.");

  const cart = await readCart();
  cart.push({
    title: title.toString(),
    slug: slug.toString(),
    price: Number(price),
  });
  await writeCart(cart);

  revalidatePath("/");
  revalidatePath("/carrito");
}

export async function removeFromCart(formData: FormData) {
  const slug = formData.get("slug");
  if (!slug) throw new Error("Error: No se encontró ningún slug para eliminar.");

  const cart = await readCart();
  const index = cart.findIndex((item) => item.slug === slug.toString());
  if (index !== -1) {
    cart.splice(index, 1);
  }
  await writeCart(cart);

  revalidatePath("/");
  revalidatePath("/carrito");
}

export async function getCart(): Promise<CartItem[]> {
  return readCart();
}
