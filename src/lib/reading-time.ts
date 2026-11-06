import type { Locale } from '../data/locales';

export function calculateReadingTimeMinutes(text: string, locale: Locale = 'en'): number {
  const clean = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/[#>*_~\-[\]()]/g, ' ')
    .trim();

  if (!clean) return 1;

  if (locale === 'ja' || locale === 'zh' || locale === 'ko') {
    const charCount = clean.replace(/\s+/g, '').length;
    return Math.max(1, Math.round(charCount / 450));
  }

  const wordCount = clean.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / 210));
}
