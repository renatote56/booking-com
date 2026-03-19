import Image from "next/image";
import Link from "next/link";

type Props = {
  book: {
    image: string;
    title: string;
    author: string;
    price: number;
    slug: string;
  };
};

export default function BookCard({ book }: Props) {
  return (
    <Link href={`/libros/${book.slug}`} className="book-card">
      <div className="book-card-image">
        <Image
          src={book.image}
          alt={book.title}
          fill
          sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 22vw"
          style={{ objectFit: "cover" }}
        />
        <div className="book-card-overlay" />
      </div>

      <div className="book-card-body">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">{book.author}</p>
        <div className="book-card-footer">
          <span className="book-card-price">${book.price}</span>
          <span className="book-card-arrow">→</span>
        </div>
      </div>
    </Link>
  );
}