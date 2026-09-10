import { SITE } from '@/consts'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const LOCALE = SITE.locale.replace('_', '-')

export function formatMonth(date: Date) {
  return new Intl.DateTimeFormat(LOCALE, {
    year: 'numeric',
    month: 'long',
  }).format(date)
}

/** Rough reading time of an HTML string, in French. */
export function readingTime(html: string) {
  const words = html
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return `${Math.max(1, Math.round(words / 200))} min de lecture`
}
