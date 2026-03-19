"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="error-page">
      <div className="error-glyph">!</div>
      <h2 className="error-title">Algo salió mal</h2>
      <p className="error-msg">{error.message}</p>
      <button onClick={() => reset()} className="btn btn-primary">
        Intentar de nuevo
      </button>
    </div>
  );
}