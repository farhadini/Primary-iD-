import { NextResponse, type NextRequest } from "next/server"

// ── Password on private pages ────────────────────────────────
// The browser asks for a username and password before showing these paths.
// Any username works; the password is PRIVATE_PAGE_PASSWORD (set in Vercel,
// never in the code). If it is not set, the pages stay locked.
// Add a path to `config.matcher` below to protect another page.

const REALM = "Primary private page"

function locked() {
  return new NextResponse("This page is private.", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`, "Cache-Control": "no-store" },
  })
}

export function proxy(req: NextRequest) {
  const want = process.env.PRIVATE_PAGE_PASSWORD
  if (!want) return locked()
  const auth = req.headers.get("authorization") ?? ""
  if (!auth.startsWith("Basic ")) return locked()
  let pass = ""
  try {
    const decoded = atob(auth.slice(6))
    pass = decoded.slice(decoded.indexOf(":") + 1)
  } catch {
    return locked()
  }
  if (pass.length !== want.length) return locked()
  let diff = 0
  for (let i = 0; i < want.length; i++) diff |= pass.charCodeAt(i) ^ want.charCodeAt(i)
  if (diff !== 0) return locked()
  const res = NextResponse.next()
  res.headers.set("Cache-Control", "private, no-store")
  return res
}

export const config = {
  matcher: ["/primaryidFarhad", "/primaryidFarhad/:path*"],
}
