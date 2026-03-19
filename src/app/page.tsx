import { getAllBooks } from "@/lib/data";
import BookCard from "@/components/BookCard";

export default async function Page() {
  const books = await getAllBooks();

  return (
    <div className="page-wrapper">
      <section className="hero">
        <span className="hero-eyebrow">📚 Colección 2025</span>
        <h1 className="hero-title">
          Los mejores libros de
          <br />
          <span className="highlight">Programación</span>
        </h1>
        <p className="hero-subtitle">
          Explora nuestra selección curada de libros esenciales para
          desarrolladores de todos los niveles.
        </p>
      </section>

      <div className="section-header">
        <h2 className="section-title">Catálogo</h2>
        <span className="section-count">{books.length} títulos</span>
      </div>

      <div className="books-grid">
        {books.map((book) => (
          <BookCard key={book.slug} book={book} />
        ))}
      </div>
    </div>
  );
}
