"use client";
import { useEffect, useRef, useState } from "react";

interface ImageLightboxProps {
  src: string | null;
  alt: string;
  closeLabel: string;
  onClose: () => void;
}

/** Native <dialog> preview: focus trap, Escape and inert background come from the platform. */
export default function ImageLightbox({ src, alt, closeLabel, onClose }: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (src && !dialog.open) dialog.showModal();
    if (!src && dialog.open) dialog.close();
    setZoom(null);
  }, [src]);

  const toggleZoom = (event: React.MouseEvent<HTMLImageElement>) => {
    if (zoom) return setZoom(null);
    const rect = event.currentTarget.getBoundingClientRect();
    setZoom({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      onClose={onClose}
      onClick={(event) => event.target === dialogRef.current && onClose()}
    >
      <button type="button" className="lightbox-close" onClick={onClose} aria-label={closeLabel}>
        ×
      </button>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element -- needs a raw element for transform-origin zoom
        <img
          src={src}
          alt={alt}
          className={`lightbox-image ${zoom ? "is-zoomed" : ""}`}
          style={zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
          onClick={toggleZoom}
        />
      )}
    </dialog>
  );
}
