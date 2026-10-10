"use client"

// The Primary iD deck, as one React element. It renders the shared deck from
// /id-deck.js (the same file /membership/ loads), so every page shows one iD.

import { useEffect, useRef } from "react"
import Script from "next/script"

declare global {
  interface Window { PrimaryIdDeck?: { mount: (el: Element) => void } }
}

export function IdDeck() {
  const deck = useRef<HTMLDivElement>(null)

  // Mount on arrival, and again after client-side navigation back to the page.
  useEffect(() => {
    if (deck.current && window.PrimaryIdDeck) window.PrimaryIdDeck.mount(deck.current)
  }, [])

  return (
    <>
      <div ref={deck} data-id-deck />
      <Script src="/id-deck.js" strategy="afterInteractive" />
    </>
  )
}
