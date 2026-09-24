"use client";

import { useState } from "react";

// The password form for /brand/internal. On success the API sets an httpOnly
// cookie and we reload — the page is a server component, so the protected
// content is only ever sent to a browser that already has the cookie.

const B = {
  navy: "#0E2240", blue: "#24A7E0", white: "#FFFFFF", rose: "#C8456B",
};

export default function BrandGate() {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(false);
    try {
      const res = await fetch("/api/brand-auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
      const data = await res.json();
      if (data.ok) { window.location.reload(); return; }
      setErr(true);
    } catch { setErr(true); }
    setBusy(false);
  }

  return (
    <main style={{ minHeight: "100vh", background: B.navy, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <form onSubmit={submit} style={{ width: "100%", maxWidth: 400, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 20, padding: "44px 38px", textAlign: "center", boxShadow: "0 40px 90px -50px rgba(0,0,0,0.8)" }}>
        <img src="/brand/logo/primary-logo-on-dark.png" alt="Primary Integrative Dentistry" style={{ height: 24, width: "auto", maxWidth: "84%", margin: "0 auto 26px", display: "block" }} />
        <div style={{ textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 10.5, color: B.blue, fontWeight: 600, marginBottom: 12 }}>Team &amp; partners</div>
        <h1 style={{ fontFamily: "Georgia,serif", fontWeight: 400, fontSize: 27, color: B.white, margin: "0 0 10px", letterSpacing: "-0.01em" }}>The team hub</h1>
        <p style={{ fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif", fontSize: 14, color: "rgba(255,255,255,0.55)", margin: "0 0 26px", lineHeight: 1.6 }}>
          Campaigns, the full voice rules and the working files. Enter the access password to continue — or open the{" "}
          <a href="/brand/" style={{ color: B.blue, textDecoration: "none" }}>identity kit</a>, which needs no password.
        </p>
        <input
          type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter password" autoFocus
          style={{ width: "100%", boxSizing: "border-box", padding: "14px 16px", borderRadius: 10, border: err ? `1px solid ${B.rose}` : "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.05)", color: B.white, fontSize: 15, fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif", outline: "none", marginBottom: 12, textAlign: "center" }}
        />
        {err && <div style={{ color: B.rose, fontSize: 12.5, marginBottom: 12 }}>That password didn&apos;t match. Try again.</div>}
        <button type="submit" disabled={busy} style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: B.white, color: B.navy, fontFamily: "Georgia,serif", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>{busy ? "Checking…" : "Enter"}</button>
      </form>
    </main>
  );
}
