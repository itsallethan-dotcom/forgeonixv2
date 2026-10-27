/**
 * Renders one or more JSON-LD blocks as <script type="application/ld+json">.
 * Server component; no client JS. `<` is escaped so a stray "</script>" in data
 * can never break out of the script element.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
