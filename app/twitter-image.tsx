// Twitter card image. Reuses the same render as opengraph-image, but
// declares its own runtime export (Next.js 16 doesn't allow re-exporting
// the `runtime` field via `export ... from`).
export { default, alt, size, contentType } from "./opengraph-image"
export const runtime = "edge"
