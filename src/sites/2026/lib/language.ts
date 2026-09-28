/* Shared by the server (reads the cookie) and the client (writes it). Keep this file free of "use client". */

export type Language = "en" | "fr";

export const LANGUAGE_COOKIE = "hd-language";

export function parseLanguage(value: string | undefined): Language {
  return value === "fr" ? "fr" : "en";
}
