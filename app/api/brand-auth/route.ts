import { NextResponse } from "next/server";

// ============================================================================
// Brand Hub gate. Checks the submitted password against BRAND_PASSWORD (env)
// and, on a match, sets an httpOnly "brandhub" cookie. /brand/internal is a
// server component that renders its content only when that cookie is present,
// so protected copy is never sent to an unauthenticated browser.
//
// The repo is PUBLIC, so the real password must live in Vercel env vars, never
// here. TODO(farhad): set BRAND_PASSWORD in Vercel → Settings → Environment
// Variables, then redeploy. Until then the placeholder default below applies,
// and anyone reading the repo can see it.
//
// Soft gate for brand material (not PHI): one shared password, no accounts,
// no rate limiting.
// ============================================================================

const BRAND_PASSWORD = process.env.BRAND_PASSWORD ?? "primary-brand";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const ok = typeof password === "string" && password.trim() === BRAND_PASSWORD;
    const res = NextResponse.json({ ok });
    if (ok) {
      res.cookies.set("brandhub", "1", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }
    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
