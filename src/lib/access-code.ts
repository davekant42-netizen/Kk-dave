// ─────────────────────────────────────────────────────────────────────────────
//  MASTER SECRET  ← change this string once before deploying. Keep it private.
//  Never share this — only share the DAILY CODE generated from it.
// ─────────────────────────────────────────────────────────────────────────────
const MASTER_SECRET = "VG#9kLmP!q2xR";
// ─────────────────────────────────────────────────────────────────────────────

/** Returns date string "YYYY-MM-DD" in UTC for a given offset (0 = today) */
export function getDateString(offsetDays = 0): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + offsetDays);
  return d.toISOString().split("T")[0];
}

/** Fast deterministic hash → 6-character alphanumeric code */
function djb2(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash; // keep 32-bit
  }
  return Math.abs(hash);
}

/** Generate the daily access code for a specific date string */
export function generateCodeForDate(dateStr: string): string {
  return djb2(MASTER_SECRET + dateStr)
    .toString(36)
    .toUpperCase()
    .padStart(8, "0")
    .slice(0, 8);
}

/** Generate a unique per-user code based on their name + today's date */
export function generateUserCode(name: string): string {
  const today = getDateString(0);
  // "user:" prefix ensures it never collides with daily codes
  return djb2(MASTER_SECRET + "user:" + name.trim().toLowerCase() + today)
    .toString(36)
    .toUpperCase()
    .padStart(8, "0")
    .slice(0, 8);
}

/**
 * Validate code against EITHER:
 *  1. The per-user code (generated from their name) — primary flow
 *  2. Today's daily code from admin panel          — fallback
 */
export function isValidCode(input: string, userName: string): boolean {
  const clean = input.trim().toUpperCase();
  return (
    clean === generateUserCode(userName) ||
    clean === generateCodeForDate(getDateString(0))
  );
}
