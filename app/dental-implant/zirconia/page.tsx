import { ImplantPage } from "@/components/implant-page"

// /dental-implant/zirconia/ : the landing page for zirconia and metal-free
// implant searches (BRD-15 Campaign 3). Same page as /dental-implant/ with its
// own first screen; see components/implant-page.tsx.
export default function ZirconiaImplantPage() {
  return <ImplantPage variant="zirconia" />
}
