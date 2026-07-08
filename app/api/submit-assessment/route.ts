import { NextResponse } from "next/server";

// ============================================================================
// Primary iD — assessment submission (marketing layer)
// ============================================================================
// On completion:
//   1) Supabase  -> assessments (+ contact) + chapter_results (the 5 scores)
//   2) GoHighLevel -> upsert the lead as a contact (name/email/phone + tags)
// Both are independent and non-fatal, and each only runs when its env is set,
// so the flow stays demo-safe until you add credentials in Vercel. No secrets
// live in this file — they come from the environment.
//
// Clinical medical/dental history is NOT stored here; it lives in the PMS.
// ============================================================================

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPA_LIVE = Boolean(SUPABASE_URL && SERVICE_KEY);

const GHL_TOKEN = process.env.GHL_API_TOKEN;
const GHL_LOCATION = process.env.GHL_LOCATION_ID;
const GHL_LIVE = Boolean(GHL_TOKEN && GHL_LOCATION);

type Chapter = { slug: string; score: number; tier: string; responses?: unknown };

function tierWord(v: number) {
  return v >= 85 ? "Thriving" : v >= 70 ? "Strong" : v >= 50 ? "Foundational" : "Needs focus";
}

async function sb(path: string, body: unknown) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY as string,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`supabase ${path} ${res.status}: ${await res.text()}`);
  return res.json();
}

async function pushToGHL(user: any, chapters: Chapter[]) {
  const nums = chapters.map((c) => c.score);
  const composite = nums.length ? Math.round(nums.reduce((a, b) => a + b, 0) / nums.length) : 0;
  const tier = tierWord(composite);
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
      tags: ["Primary iD Assessment", `Primary iD ${composite}`, `Tier: ${tier}`],
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

    if (!SUPA_LIVE && !GHL_LIVE) {
      console.log("[assessment] demo mode — not persisted", { dimensions: chapters.length });
      return NextResponse.json({ success: true, stored: false, mode: "demo" });
    }

    let assessmentId: string | null = null;

    // 1) Supabase — the marketing record (independent, non-fatal)
    if (SUPA_LIVE) {
      try {
        const [assessment] = await sb("assessments", {
          anon_session_id: anonSessionId ?? null,
          first_name: user.firstName ?? user.name ?? null,
          email: user.email ?? null,
          mobile: user.mobile ?? null,
          completed_at: new Date().toISOString(),
        });
        assessmentId = assessment.id;
        if (chapters.length) {
          await sb("chapter_results", chapters.map((c) => ({
            assessment_id: assessment.id,
            chapter_slug: c.slug,
            score: c.score,
            tier: c.tier,
            responses: c.responses ?? {},
          })));
        }
      } catch (e) {
        console.error("[assessment] supabase error:", e);
      }
    }

    // 2) GoHighLevel — the CRM lead (independent, non-fatal)
    if (GHL_LIVE) {
      try {
        await pushToGHL(user, chapters);
      } catch (e) {
        console.error("[assessment] ghl error:", e);
      }
    }

    return NextResponse.json({ success: true, stored: true, assessmentId });
  } catch (error) {
    console.error("[assessment] submit error:", error);
    // Never block the patient's reveal on a storage hiccup.
    return NextResponse.json({ success: false, stored: false }, { status: 200 });
  }
}
