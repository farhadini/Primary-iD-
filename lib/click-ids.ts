// Ad click IDs and campaign tags, kept from the visit's ad click so the consult
// card and the booking flow can send them even after the visitor has moved to
// another page first (P1-01 L3). Google accepts a conversion up to 90 days
// after its click, so a kept click is used for 90 days.
//
// Nothing personal is stored: only the IDs Google and Meta put on the link
// (gclid, gbraid, wbraid, fbclid), the campaign tags and the page it landed on.
// The booking flow (public/primary-id-app.html, pidUtm) reads the same key.

export const TOUCH_KEY = "pid_touch"
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000
const CLICK_KEYS = ["gclid", "gbraid", "wbraid", "fbclid"] as const
const TAG_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const

type Touch = Record<string, string>

function fromAddressBar(): Touch {
  const t: Touch = {}
  try {
    const q = new URLSearchParams(window.location.search || "")
    for (const k of [...CLICK_KEYS, ...TAG_KEYS]) {
      const v = q.get(k)
      if (v) t[k] = v.slice(0, 200)
    }
  } catch {}
  return t
}

const isAdTouch = (t: Touch) => CLICK_KEYS.some((k) => t[k]) || Boolean(t.utm_source)

/** Once per visit, on the page they land on. The latest ad click wins, as in Google Ads. */
export function rememberTouch() {
  if (typeof window === "undefined") return
  const t = fromAddressBar()
  if (!isAdTouch(t)) return
  t.landing_page = window.location.pathname
  t.at = new Date().toISOString()
  try { localStorage.setItem(TOUCH_KEY, JSON.stringify(t)) } catch {}
}

function keptTouch(): Touch {
  try {
    const t = JSON.parse(localStorage.getItem(TOUCH_KEY) || "{}") as Touch
    if (!t.at || !(Date.now() - Date.parse(t.at) < MAX_AGE_MS)) return {}
    return t
  } catch {
    return {}
  }
}

// Google's own conversion-linker cookie, _gcl_aw = GCL.<time>.<gclid>.
function gclidFromCookie(): string {
  try {
    const m = document.cookie.match(/(?:^|;\s*)_gcl_aw=([^;]+)/)
    if (!m) return ""
    const parts = decodeURIComponent(m[1]).split(".")
    return parts.length >= 3 ? parts.slice(2).join(".").slice(0, 200) : ""
  } catch {
    return ""
  }
}

/** What a lead carries: this page's tags, else the kept ad click, else Google's cookie. */
export function touchForLead(): Touch {
  if (typeof window === "undefined") return {}
  const here = fromAddressBar()
  const t: Touch = isAdTouch(here) ? { ...here, landing_page: window.location.pathname } : keptTouch()
  delete t.at
  if (!t.gclid && !t.gbraid && !t.wbraid) {
    const g = gclidFromCookie()
    if (g) t.gclid = g
  }
  return t
}
