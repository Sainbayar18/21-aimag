import Image from "next/image";
import type { ReactNode } from "react";

/*
 * The top of a page that a thing in the ger opens: the photograph, and below
 * it the title on a plain dark ground the colour of where that thing lay —
 * the chest's red felt, the table, the hearth. The title never sits on the
 * photograph, so it reads whatever the photograph shows.
 */

type Props = {
  /** felt: the chest; table: the low table; hearth: the stove */
  bed: "felt" | "table" | "hearth";
  photo: { src: string; alt: string };
  /** where the photograph is cropped from, as object-position */
  focus?: string;
  credit: ReactNode;
  title: string;
  lead: string;
};

export default function PageHero({ bed, photo, focus, credit, title, lead }: Props) {
  return (
    <section className={`page-hero page-hero--${bed}`}>
      <div className="page-hero-photo">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="100vw"
          style={focus ? { objectPosition: focus } : undefined}
        />
        {credit}
      </div>
      <div className="page-hero-bed">
        <div className="page-hero-text container">
          <h1 className="page-hero-title">{title}</h1>
          <p className="page-hero-lead">{lead}</p>
        </div>
      </div>
    </section>
  );
}
