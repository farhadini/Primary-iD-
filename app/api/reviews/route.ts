import { NextResponse } from "next/server"

// ── Google reviews, live ─────────────────────────────────────
// Pulls the practice's rating, review count and reviews from the Google
// Places API (New) and caches them for six hours, so the homepage shows
// what Google shows without calling Google on every visit.
//
// Needs GOOGLE_PLACES_API_KEY (a Google Cloud key with "Places API (New)"
// enabled). GOOGLE_PLACE_ID is optional: without it the route looks the
// practice up by name and address once per cache window.
// With no key, it answers { live: false } and the page keeps its saved reviews.
//
// Google returns up to five reviews per place ("most relevant"). Every review
// it returns is passed through as written, with its author and Google credit.

export const revalidate = 21600 // six hours

const KEY = process.env.GOOGLE_PLACES_API_KEY
const QUERY = "Primary Integrative Dentistry, 11980 San Vicente Blvd Suite 902, Los Angeles, CA 90049"
const FIELDS = "id,rating,userRatingCount,googleMapsUri,reviews"

type GReview = {
  rating?: number
  text?: { text?: string }
  originalText?: { text?: string }
  relativePublishTimeDescription?: string
  publishTime?: string
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string }
}

async function placeId(): Promise<string | null> {
  if (process.env.GOOGLE_PLACE_ID) return process.env.GOOGLE_PLACE_ID
  const r = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Goog-Api-Key": KEY!, "X-Goog-FieldMask": "places.id" },
    body: JSON.stringify({ textQuery: QUERY }),
    next: { revalidate },
  })
  if (!r.ok) return null
  const j = await r.json()
  return j.places?.[0]?.id ?? null
}

export async function GET() {
  if (!KEY) return NextResponse.json({ live: false })
  try {
    const id = await placeId()
    if (!id) return NextResponse.json({ live: false, error: "place not found" })
    const r = await fetch(`https://places.googleapis.com/v1/places/${id}`, {
      headers: { "X-Goog-Api-Key": KEY, "X-Goog-FieldMask": FIELDS },
      next: { revalidate },
    })
    if (!r.ok) return NextResponse.json({ live: false, error: `google ${r.status}` })
    const p = await r.json()
    const reviews = ((p.reviews ?? []) as GReview[])
      .map((v) => ({
        name: v.authorAttribution?.displayName ?? "Google reviewer",
        url: v.authorAttribution?.uri ?? null,
        photo: v.authorAttribution?.photoUri ?? null,
        rating: v.rating ?? 5,
        text: (v.originalText?.text ?? v.text?.text ?? "").trim(),
        when: v.relativePublishTimeDescription ?? "",
      }))
      .filter((v) => v.text)
    return NextResponse.json(
      { live: true, rating: p.rating ?? null, count: p.userRatingCount ?? null, mapsUrl: p.googleMapsUri ?? null, reviews },
      { headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400" } },
    )
  } catch {
    return NextResponse.json({ live: false, error: "fetch failed" })
  }
}
