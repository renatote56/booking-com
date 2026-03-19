"use client"

import { useFormStatus } from "react-dom";

export default function RemoveFromCartButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="btn btn-danger">
      {pending && <span className="btn-spinner" />}
      {pending ? "Eliminando..." : "Eliminar"}
    </button>
  );
}
