"use client"

import { useEffect } from "react"
import { rememberTouch } from "@/lib/click-ids"

// Keeps the ad click from the page a visitor lands on, so a lead sent from any
// later page still carries it (P1-01 L3). Renders nothing.
export function ClickIdKeeper() {
  useEffect(() => {
    rememberTouch()
  }, [])
  return null
}
