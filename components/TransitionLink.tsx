"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ComponentProps, type MouseEvent } from "react";

/*
 * Client-side navigation wrapped in the browser's View Transitions API.
 * Elements that share a `view-transition-name` on both pages (e.g. a card
 * photo and the province hero photo) morph into each other; everything
 * else cross-fades. Browsers without the API just navigate normally.
 */

let pending: (() => void) | null = null;

function finishPending() {
  if (pending) {
    const done = pending;
    pending = null;
    done();
  }
}

type DocWithVT = Document & {
  startViewTransition?: (cb: () => Promise<void> | void) => unknown;
};

export default function TransitionLink({
  href,
  onClick,
  vtPhoto,
  ...rest
}: ComponentProps<typeof Link> & {
  href: string;
  /** CSS selector of a photo elsewhere on the page that should morph into the next hero. */
  vtPhoto?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const doc = document as DocWithVT;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Same-page anchors (e.g. "/#map") keep the default smooth scroll.
    if (!doc.startViewTransition || reduce || href.includes("#") || href === pathname) return;

    e.preventDefault();

    // Only the clicked card's photo morphs into the next page's hero.
    const photo = vtPhoto
      ? document.querySelector<HTMLElement>(vtPhoto)
      : e.currentTarget.querySelector<HTMLElement>("[data-vt-photo]");
    if (photo) {
      document
        .querySelectorAll<HTMLElement>("[data-vt-hero]")
        .forEach((h) => (h.style.viewTransitionName = "none"));
      photo.style.viewTransitionName = "hero-photo";
    }

    doc.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          finishPending();
          pending = resolve;
          router.push(href);
          // Safety net: never leave the page frozen if the route is slow.
          setTimeout(finishPending, 2500);
        }),
    );
  }

  return <Link href={href} onClick={handleClick} {...rest} />;
}

/** Mounted once in the layout: tells a running transition the new page is in the DOM. */
export function ViewTransitionResolver() {
  const pathname = usePathname();
  useEffect(() => {
    finishPending();
  }, [pathname]);
  return null;
}
