import { NextResponse } from "next/server";

// ============================================================================
// Brand Hub gate. Checks the submitted password against BRAND_PASSWORD (env).
// The repo is PUBLIC, so the real password must live in Vercel env vars, never
// here. TODO(farhad): set BRAND_PASSWORD in Vercel → Settings → Environment
// Variables, then redeploy. Until then the placeholder default below applies.
// This is a soft gate for brand assets (not PHI); it keeps the hub out of
// casual/public view, it is not high-security auth.
// ============================================================================

const BRAND_PASSWORD = process.env.BRAND_PASSWORD ?? "primary-brand";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const ok = typeof password === "string" && password.trim() === BRAND_PASSWORD;
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
