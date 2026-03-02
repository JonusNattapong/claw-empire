export type Lang = "ko" | "en" | "ja" | "zh" | "th";

export const SUPPORTED_LANGS: readonly Lang[] = ["ko", "en", "ja", "zh", "th"] as const;

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && SUPPORTED_LANGS.includes(value as Lang);
}
