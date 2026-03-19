import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-code">404</div>
      <h2 className="notfound-title">Libro no encontrado</h2>
      <p className="notfound-sub">
        El libro que buscas no existe en nuestro catálogo.
      </p>
      <Link href="/" className="btn btn-primary">
        Volver al catálogo
      </Link>
    </div>
  );
}
