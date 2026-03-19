import { getAllBooks, getBookBySlug } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartForm from "@/components/AddToCartForm";
import Link from "next/link";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    return { title: "Libro no encontrado | LibrosStore" };
  }

  return {
    title: `${book.title} | LibrosStore`,
    description: book.synopsis,
    openGraph: {
      title: book.title,
      description: book.synopsis,
      images: [{ url: book.image, width: 200, height: 300, alt: book.title }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) notFound();

  return (
    <div className="page-wrapper">
      <Link href="/" className="back-link">
        ← Volver al catálogo
      </Link>

      <div className="detail-layout">
        <div className="detail-image-wrap">
          <Image
            src={book.image}
            alt={book.title}
            width={300}
            height={450}
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </div>

        <div className="detail-content">
          <span className="detail-badge">📖 Libro</span>

          <h1 className="detail-title">{book.title}</h1>
          <p className="detail-author">
            por <span>{book.author}</span>
          </p>

          <div className="detail-divider" />

          <p className="detail-synopsis-label">Sinopsis</p>
          <p className="detail-synopsis">{book.synopsis}</p>

          <div className="detail-price-row">
            <span className="detail-price">${book.price}</span>
          </div>

          <AddToCartForm book={book} />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const books = await getAllBooks();
  return books.slice(0, 10).map((book) => ({ slug: book.slug }));
}