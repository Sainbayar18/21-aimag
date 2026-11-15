"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import PhotoCredit from "@/components/PhotoCredit";
import type { Photo } from "@/lib/aimags";
import { getDict, type Lang } from "@/lib/i18n";

/*
 * Province hero with several photos. With the cursor over the hero (and the
 * page at the top), each wheel gesture switches to the next/previous photo.
 * Past the first or last photo the wheel scrolls the page as usual.
 * Arrow buttons, dots, arrow keys and horizontal swipes do the same.
 */

const GESTURE_GAP = 220; // ms of wheel silence that ends a gesture
const MIN_SLIDE_TIME = 850; // ms; matches the wipe animation

export default function PhotoSlider({
  photos,
  label,
  lang,
  className = "",
  children,
}: {
  photos: Photo[];
  lang: Lang;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const N = photos.length;
  const t = getDict(lang);
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);

  const rootRef = useRef<HTMLElement>(null);
  const indexRef = useRef(0);
  const lockUntil = useRef(0);
  const lastWheel = useRef(0);
  const consumed = useRef(false);

  const go = useCallback(
    (target: number) => {
      const from = indexRef.current;
      if (target === from || target < 0 || target >= N) return;
      indexRef.current = target;
      setDir(target > from ? 1 : -1);
      setPrev(from);
      setIndex(target);
    },
    [N],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el || N < 2) return;

    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) < 2 || e.ctrlKey) return;
      if (window.scrollY > 4) return; // only while the hero sits at the top
      const target = indexRef.current + (e.deltaY > 0 ? 1 : -1);
      const now = performance.now();
      const newGesture = now - lastWheel.current > GESTURE_GAP;
      if (newGesture) consumed.current = false;

      if (target < 0 || target >= N) {
        // At the ends the page scrolls on, but not with the leftover
        // momentum of the gesture that just changed the photo.
        if (consumed.current) {
          e.preventDefault();
          lastWheel.current = now;
        }
        return;
      }

      e.preventDefault();
      lastWheel.current = now;
      if (now < lockUntil.current || !newGesture) return;
      lockUntil.current = now + MIN_SLIDE_TIME;
      consumed.current = true;
      go(target);
    }

    let touchX = 0;
    let touchY = 0;
    function onTouchStart(e: TouchEvent) {
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
    }
    function onTouchEnd(e: TouchEvent) {
      const dx = e.changedTouches[0].clientX - touchX;
      const dy = e.changedTouches[0].clientY - touchY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        go(indexRef.current + (dx < 0 ? 1 : -1));
      }
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [go, N]);

  // Preload neighbours so the next photo is ready before it is needed.
  useEffect(() => {
    for (const i of [index + 1, index - 1]) {
      if (i >= 0 && i < N) {
        const img = new window.Image();
        img.src = photos[i].file;
      }
    }
  }, [index, N, photos]);

  function onKeyDown(e: React.KeyboardEvent) {
    const t = e.target as HTMLElement;
    if (t.closest("a")) return;
    if ((e.key === "ArrowRight" || e.key === "ArrowDown") && indexRef.current < N - 1) {
      e.preventDefault();
      go(indexRef.current + 1);
    } else if ((e.key === "ArrowLeft" || e.key === "ArrowUp") && indexRef.current > 0) {
      e.preventDefault();
      go(indexRef.current - 1);
    }
  }

  const photo = photos[index];
  const multi = N > 1;

  return (
    <section
      ref={rootRef}
      className={`hero hero-slider ${className}`}
      aria-roledescription={multi ? "carousel" : undefined}
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      {/* The stage carries the shared-element name, so cards morph into it. */}
      <div className="slider-stage" data-vt-hero="" style={{ viewTransitionName: "hero-photo" }}>
        {prev !== null && prev !== index && (
          <div
            key={`prev-${prev}-${index}`}
            className={`slide-layer slide-out ${dir > 0 ? "to-up" : "to-down"}`}
          >
            <Image src={photos[prev].file} alt="" fill sizes="100vw" />
          </div>
        )}
        <div
          key={`cur-${index}`}
          className={`slide-layer slide-in ${prev === null ? "first" : dir > 0 ? "from-bottom" : "from-top"}`}
        >
          <Image src={photo.file} alt={photo.caption} fill priority={index === 0} sizes="100vw" />
        </div>
        <div className="slider-scrim" aria-hidden="true" />
      </div>

      {children}

      {multi && (
        <>
          <div className="slider-caption" key={`cap-${index}`} aria-live="polite">
            <span className="slider-count">
              {String(index + 1).padStart(2, "0")}
              <span> / {String(N).padStart(2, "0")}</span>
            </span>
            <span className="slider-caption-text">{photo.caption}</span>
          </div>

          <div className="slider-controls">
            <button
              type="button"
              className="slider-arrow"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label={t.prevPhoto}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12l6-6 6 6" />
              </svg>
            </button>
            <ol className="slider-dots">
              {photos.map((p, i) => (
                <li key={p.file}>
                  <button
                    type="button"
                    className={i === index ? "is-active" : undefined}
                    aria-label={t.photoN(i + 1, p.caption)}
                    aria-current={i === index ? "true" : undefined}
                    onClick={() => go(i)}
                  />
                </li>
              ))}
            </ol>
            <button
              type="button"
              className="slider-arrow"
              onClick={() => go(index + 1)}
              disabled={index === N - 1}
              aria-label={t.nextPhoto}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 8l6 6 6-6" />
              </svg>
            </button>
          </div>

          <div className="slider-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${(index + 1) / N})` }} />
          </div>
        </>
      )}

      <PhotoCredit photo={photo} lang={lang} className="hero-credit" key={`credit-${index}`} />
    </section>
  );
}
