// Phone-line opening hours, evaluated server-side against UK (Europe/London)
// local time so the header status banner is always accurate regardless of the
// visitor's own timezone or the server's clock.
//
// Note: these are the CALL LINE hours, which differ slightly from the workshop
// opening hours (Saturday lines close at 12:30, not 13:00).
//   Mon–Fri: 08:30–17:30
//   Saturday: 08:30–12:30
//   Sunday:  closed
const LINE_HOURS: Record<string, { open: number; close: number } | null> = {
  Monday: { open: 8 * 60 + 30, close: 17 * 60 + 30 },
  Tuesday: { open: 8 * 60 + 30, close: 17 * 60 + 30 },
  Wednesday: { open: 8 * 60 + 30, close: 17 * 60 + 30 },
  Thursday: { open: 8 * 60 + 30, close: 17 * 60 + 30 },
  Friday: { open: 8 * 60 + 30, close: 17 * 60 + 30 },
  Saturday: { open: 8 * 60 + 30, close: 12 * 60 + 30 },
  Sunday: null,
}

// Returns true when the phone lines are currently open in Fareham (UK) time.
export function getLinesOpen(now: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now)

  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? ''
  // Intl renders midnight as "24" under hour12:false in some runtimes; clamp it.
  const rawHour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0')
  const hour = rawHour === 24 ? 0 : rawHour
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0')

  const window = LINE_HOURS[weekday]
  if (!window) return false

  const minutesOfDay = hour * 60 + minute
  return minutesOfDay >= window.open && minutesOfDay < window.close
}
