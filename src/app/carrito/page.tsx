import { getCart, removeFromCart } from "@/actions/cartActions";
import Link from "next/link";
import RemoveFromCartButton from "@/components/RemoveFromCartButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mi Carrito | LibrosStore",
  description: "Revisa y gestiona los libros que has añadido a tu carrito.",
};

export default async function CartPage() {
  const cart = await getCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const itemLabel = cart.length === 1 ? "ítem" : "ítems";

  return (
    <div className="page-wrapper">
      <div className="cart-header">
        <Link href="/" className="back-link">
          ← Volver al catálogo
        </Link>
        <h1 className="cart-title">Mi Carrito</h1>
        <p className="cart-subtitle">
          {cart.length} {itemLabel}
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2 className="cart-empty-title">Tu carrito está vacío</h2>
          <p className="cart-empty-sub">
            Explora el catálogo y agrega los libros que te interesen.
          </p>
          <Link href="/" className="btn btn-primary">
            Explorar catálogo
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Items list */}
          <ul className="cart-items">
            {cart.map((item, index) => (
              <li
                key={`${item.slug}-${index}`}
                className="cart-item"
                style={{ animationDelay: `${index * 55}ms` }}
              >
                <span className="cart-item-num">
                  #{String(index + 1).padStart(2, "0")}
                </span>

                <div className="cart-item-info">
                  <Link
                    href={`/libros/${item.slug}`}
                    className="cart-item-title"
                  >
                    {item.title}
                  </Link>
                  <p className="cart-item-price">
                    Precio: <strong>${item.price}</strong>
                  </p>
                </div>

                <form action={removeFromCart}>
                  <input type="hidden" name="slug" value={item.slug} />
                  <RemoveFromCartButton />
                </form>
              </li>
            ))}
          </ul>

          {/* Summary */}
          <div className="cart-summary">
            <h3 className="cart-summary-title">Resumen del pedido</h3>

            <div className="cart-summary-row">
              <span>
                Subtotal ({cart.length} {itemLabel})
              </span>
              <span>${total}</span>
            </div>
            <div className="cart-summary-row">
              <span>Envío</span>
              <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                Gratis
              </span>
            </div>

            <div className="cart-summary-divider" />

            <div className="cart-summary-total">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-value">${total}</span>
            </div>

            <button className="cart-checkout-btn">Proceder al pago →</button>
          </div>
        </div>
      )}
    </div>
  );
}
