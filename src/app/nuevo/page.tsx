import NewBookForm from "@/components/NewBookForm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publicar Obra | LibrosStore",
  description: "Comparte tu obra técnica con la comunidad de desarrolladores.",
};

export default function NuevoPage() {
  return (
    <div className="page-wrapper">
      <Link href="/" className="back-link">
        ← Volver al catálogo
      </Link>

      <div className="new-book-page">
        <h1 className="new-book-title">Comparte tu Obra Técnica</h1>
        <p className="new-book-subtitle">
          Añade un libro que consideres esencial para la comunidad.
        </p>
        <NewBookForm />
      </div>
    </div>
  );
}
