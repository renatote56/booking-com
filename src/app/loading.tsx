import BookCardSkeleton from "@/components/BookCardSkeleton";

export default function Loading() {
  return (
    <div className="page-wrapper">
      <section className="hero">
        <div
          className="skeleton-line"
          style={{ height: "24px", width: "140px", margin: "0 auto 20px", borderRadius: "50px" }}
        />
        <div
          className="skeleton-line"
          style={{ height: "64px", width: "55%", margin: "0 auto 12px" }}
        />
        <div
          className="skeleton-line"
          style={{ height: "64px", width: "42%", margin: "0 auto 32px" }}
        />
        <div
          className="skeleton-line"
          style={{ height: "18px", width: "320px", margin: "0 auto" }}
        />
      </section>

      <div className="section-header">
        <div className="skeleton-line" style={{ height: "28px", width: "160px" }} />
        <div className="skeleton-line" style={{ height: "14px", width: "64px" }} />
      </div>

      <div className="books-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}