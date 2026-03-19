"use client"

import { useActionState } from "react";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { publishBook, type BookFormState } from "@/actions/bookActions";
import Image from "next/image";
import Link from "next/link";

const initialState: BookFormState = {};

function SubmitBookButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn btn-primary new-book-submit">
      {pending && <span className="btn-spinner" />}
      {pending ? "Publicando..." : "Publicar Obra ↗"}
    </button>
  );
}

export default function NewBookForm() {
  const [state, formAction] = useActionState(publishBook, initialState);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
      setFileName(null);
    }
  };

  const clearImage = () => {
    setPreview(null);
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (state.success) {
    return (
      <div className="new-book-success">
        <div className="new-book-success-icon">✓</div>
        <h3 className="new-book-success-title">¡Obra publicada!</h3>
        <p className="new-book-success-sub">
          Tu libro ha sido añadido al catálogo con éxito.
        </p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: "var(--sp-4)" }}>
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="new-book-form">
      <div className="form-group">
        <label className="form-label">Portada del Libro</label>

        <div
          className={`upload-zone${preview ? " upload-zone--has-image" : ""}${state.errors?.image ? " upload-zone--error" : ""}`}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        >
          {preview ? (
            <>
              <Image
                src={preview}
                alt="Vista previa de portada"
                fill
                style={{ objectFit: "cover" }}
                unoptimized
              />
              <div className="upload-zone-overlay">
                <span className="upload-zone-overlay-text">Cambiar imagen</span>
              </div>
            </>
          ) : (
            <div className="upload-zone-placeholder">
              <span className="upload-zone-icon">🖼️</span>
              <span className="upload-zone-label">Haz clic para subir portada</span>
              <span className="upload-zone-hint">JPG, PNG o WEBP · Opcional</span>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          id="image"
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        {fileName && (
          <div className="upload-file-info">
            <span className="upload-file-name">📎 {fileName}</span>
            <button type="button" className="upload-clear-btn" onClick={clearImage}>
              ✕
            </button>
          </div>
        )}

        {state.errors?.image && (
          <span className="form-error">{state.errors.image}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Título de la Obra
        </label>
        <input
          id="title"
          type="text"
          name="title"
          className={`form-input${state.errors?.title ? " form-input-error" : ""}`}
          autoComplete="off"
        />
        {state.errors?.title && (
          <span className="form-error">{state.errors.title}</span>
        )}
      </div>


      <div className="form-group">
        <label htmlFor="author" className="form-label">
          Autor/a
        </label>
        <input
          id="author"
          type="text"
          name="author"
          className={`form-input${state.errors?.author ? " form-input-error" : ""}`}
          autoComplete="off"
        />
        {state.errors?.author && (
          <span className="form-error">{state.errors.author}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="synopsis" className="form-label">
          Sinopsis Técnica
        </label>
        <textarea
          id="synopsis"
          name="synopsis"
          rows={4}
          className={`form-input form-textarea${state.errors?.synopsis ? " form-input-error" : ""}`}
        />
        {state.errors?.synopsis && (
          <span className="form-error">{state.errors.synopsis}</span>
        )}
      </div>

      <SubmitBookButton />
    </form>
  );
}
