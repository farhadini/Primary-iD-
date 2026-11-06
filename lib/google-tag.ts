// ─────────────────────────────────────────────────────────────────────────
// The Google tag and the one website conversion Google Ads counts.
//
// Source of truth: Primary iD Project, "7 Systems/Google Ads account reset
// (27 Oct 2026).md", section 4 (Asset Map OPS-18). Change the record first,
// then this file.
//
// GT-NNXWS9P8 is the Google tag "Primary Integrative Dentistry by Dr. Gabi".
// Its destination is the Google Ads account AW-11002991578. Both are public
// identifiers that appear in the page source of any site that carries a tag;
// they are not secrets. NEXT_PUBLIC_GOOGLE_TAG_ID can override the tag ID.
//
// The conversion is "Consult card submitted" (label hGeLCNqYgYUYENqn0f4o),
// counted once per click. It fires only after /api/lead/ confirms the request
// landed, never on the button. Nothing about the person goes with it: no name,
// phone, answers or value. Enhanced conversions are off in the account.
// ─────────────────────────────────────────────────────────────────────────

export const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || "GT-NNXWS9P8"

export const CONSULT_CONVERSION = "AW-11002991578/hGeLCNqYgYUYENqn0f4o"

type Gtag = (...args: unknown[]) => void

// Conversions count only on the live site. Vercel previews load the same tag,
// so a test submit there would otherwise be counted in Google Ads as a real one.
const LIVE_HOST = /(^|\.)myprimaryid\.com$/

// Fire "Consult card submitted" once for this request. The request's own
// reference is the transaction ID, so Google drops a repeat; the session note
// stops a second tap or a retried send from firing twice in the first place.
export function trackConsultSubmitted(requestId: string) {
  if (typeof window === "undefined" || !requestId) return
  if (!LIVE_HOST.test(window.location.hostname)) return
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  if (typeof gtag !== "function") return
  const key = `pid:conv:${requestId}`
  try {
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, "1")
  } catch {}
  try {
    gtag("event", "conversion", { send_to: CONSULT_CONVERSION, transaction_id: requestId })
  } catch {}
}
