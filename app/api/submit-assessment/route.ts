import { NextResponse } from "next/server";

// ============================================================================
// Primary iD — assessment submission (marketing layer)
// ============================================================================
// On completion:
//   1) Supabase     -> assessments (contact) + chapter_results (the 5 scores)
//   2) GoHighLevel  -> upsert the lead as a contact (name/email/phone + tags)
//
// Supabase is LIVE by default. It uses the project's *publishable* key, which is
// designed to be public (it ships in every Supabase web app); security comes from
// row-level policies, not from hiding the key. The tables are INSERT-ONLY for this
// key — leads can be written, nothing can be read back. We also mint the record id
// here so no row is ever returned to the client.
// If SUPABASE_SERVICE_ROLE_KEY is set in the environment, we automatically use that
// instead (fully locked down). No secret is committed to this repo.
//
// GoHighLevel stays OFF until GHL_API_TOKEN + GHL_LOCATION_ID are set in Vercel —
// that token is a real secret and must never live in this (public) repo.
//
// Clinical medical/dental history is NOT stored here; it lives in the PMS.
// ============================================================================

const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://yonzgwnxztzkxfbvmjty.supabase.co";
const SUPABASE_PUBLISHABLE = "sb_publishable_yQvyKrIVx5wYqEMMw78g3A_-szeOpk8";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_PUBLISHABLE;

const GHL_TOKEN = process.env.GHL_API_TOKEN;
const GHL_LOCATION = process.env.GHL_LOCATION_ID;
const GHL_LIVE = Boolean(GHL_TOKEN && GHL_LOCATION);

type Chapter = { slug: string; score: number; tier: string; responses?: unknown };

function tierWord(v: number) {
  return v >= 85 ? "Thriving" : v >= 70 ? "Strong" : v >= 50 ? "Foundational" : "Needs focus";
}

async function sbInsert(table: string, body: unknown) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal", // never read rows back
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`supabase ${table} ${res.status}: ${await res.text()}`);
}

async function pushToGHL(user: any, chapters: Chapter[]) {
  const nums = chapters.map((c) => c.score);
  const composite = nums.length ? Math.round(nums.reduce((a, b) => a + b, 0) / nums.length) : 0;
  const res = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GHL_TOKEN}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      locationId: GHL_LOCATION,
      firstName: user?.firstName ?? user?.name ?? undefined,
      email: user?.email ?? undefined,
      phone: user?.mobile ?? undefined,
      source: "Primary iD assessment",
      tags: ["Primary iD Assessment", `Primary iD ${composite}`, `Tier: ${tierWord(composite)}`],
    }),
  });
  if (!res.ok) throw new Error(`ghl ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const chapters: Chapter[] = Array.isArray(body?.chapters) ? body.chapters : [];
    const anonSessionId: string | undefined = body?.anonSessionId;
    const user = body?.user ?? {};

    const assessmentId = crypto.randomUUID();
    let stored = false;

    // 1) Supabase — the marketing record (non-fatal)
    try {
      await sbInsert("assessments", {
        id: assessmentId,
        anon_session_id: anonSessionId ?? null,
        first_name: user.firstName ?? user.name ?? null,
        email: user.email ?? null,
        mobile: user.mobile ?? null,
        completed_at: new Date().toISOString(),
      });
      if (chapters.length) {
        await sbInsert("chapter_results", chapters.map((c) => ({
          assessment_id: assessmentId,
          chapter_slug: c.slug,
          score: c.score,
          tier: c.tier,
          responses: c.responses ?? {},
        })));
      }
      stored = true;
    } catch (e) {
      console.error("[assessment] supabase error:", e);
    }

    // 2) GoHighLevel — the CRM lead (off until env is set; non-fatal)
    if (GHL_LIVE) {
      try {
        await pushToGHL(user, chapters);
      } catch (e) {
        console.error("[assessment] ghl error:", e);
      }
    }

    return NextResponse.json({ success: true, stored, assessmentId, crm: GHL_LIVE });
  } catch (error) {
    console.error("[assessment] submit error:", error);
    // Never block the patient's reveal on a storage hiccup.
    return NextResponse.json({ success: false, stored: false }, { status: 200 });
  }
}
