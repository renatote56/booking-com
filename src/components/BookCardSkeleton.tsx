export default function BookCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image skeleton-line" />
      <div className="skeleton-body">
        <div className="skeleton-line" style={{ height: "18px", width: "78%" }} />
        <div className="skeleton-line" style={{ height: "13px", width: "52%" }} />
        <div className="skeleton-line" style={{ height: "20px", width: "36%" }} />
      </div>
    </div>
  );
}