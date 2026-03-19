import { getCart } from "@/actions/cartActions";

export default async function CartCount() {
  const cart = await getCart();
  return <>{cart.length}</>;
}
