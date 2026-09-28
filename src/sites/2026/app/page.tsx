import { cookies } from "next/headers";
import HackDecouverte2026 from "../Page2026";
import { LANGUAGE_COOKIE, parseLanguage } from "../lib/language";

export default async function Home() {
  const language = parseLanguage((await cookies()).get(LANGUAGE_COOKIE)?.value);
  return <HackDecouverte2026 language={language} />;
}
