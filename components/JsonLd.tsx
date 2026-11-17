/**
 * A structured-data block for search engines. Nothing is rendered to the page;
 * Google reads it to show the province as a place rather than a plain result.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The escape keeps a "</script>" inside any string from ending the tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
