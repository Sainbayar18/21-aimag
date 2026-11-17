import NotFoundContent from "@/components/NotFoundContent";
import { getDict, langs } from "@/lib/i18n";

/**
 * The 404 inside a language segment. The page itself gets no params, so all
 * six translations are handed to the client component, which picks one from
 * the address — six short strings, not six dictionaries.
 */
export default function NotFound() {
  const texts = Object.fromEntries(langs.map((l) => [l, getDict(l).notFound]));
  return <NotFoundContent texts={texts} />;
}
