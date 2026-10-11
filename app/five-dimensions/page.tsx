import { SiteHeader, SiteFooter } from "@/components/site-shell"
import { BreadcrumbSchema } from "@/components/schema"
import ChaptersView from "@/components/five-dimensions/chapters-view"
import { CHAPTERS } from "@/components/five-dimensions/chapters"

// ─────────────────────────────────────────────────────────────────────────
// /five-dimensions/ : the Primary iD, taught. The card is broken out into five
// chapters (components/five-dimensions/), each one the questions, why we ask
// them, and what the answers tell Dr. Gabi.
//
// Order (Little Plains build order, Primary Brand OS copy): the plain
// definition → ways in by feeling → five chapters → how it adds up → sources →
// one action.
//
// Rails: patients never see instrument names (sources only); "Family history",
// never "Genetics"; the score is directional, not a diagnosis and not
// biological age; no claim that treatment treats sleep apnea, reduces
// inflammation or extends life; no statistic without a confirmed source;
// no tier bands until Dr. Gabi rules on them (spec S2).
// ─────────────────────────────────────────────────────────────────────────

const CSS = `
  .fd{--navy:#0E2240;--blue:#24A7E0;--cream:#FAF8F5;--warm:#FEFCF9;--ink-soft:#3a4a66;--muted:#7A8695;--line:rgba(14,34,64,.12);background:var(--cream);color:var(--ink-soft)}
  .fd .frame{max-width:1180px;margin:0 auto;padding:0 clamp(16px,4vw,48px)}
  .fd .eyebrow{display:inline-flex;align-items:center;gap:12px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--blue)}
  .fd .eyebrow::before{content:"";width:26px;height:1px;background:var(--blue)}
  .fd h1,.fd h2{font-family:Georgia,"Times New Roman",serif;font-weight:400;color:var(--navy);letter-spacing:-.02em}
  .fd h1 em,.fd h2 em{color:var(--blue);font-style:italic}
  .fd .lede{font-family:Georgia,"Times New Roman",serif;font-size:20px;line-height:1.6;color:var(--ink-soft);max-width:60ch;margin:0}
  .fd .hero{padding:96px 0 40px}
  .fd .hero h1{font-size:clamp(40px,6vw,68px);line-height:1.04;margin:20px 0 22px;max-width:14ch}
  .fd .hero .def{font-family:Georgia,"Times New Roman",serif;font-size:clamp(21px,2.4vw,26px);line-height:1.45;color:var(--navy);max-width:34ch;margin:0 0 18px}
  .fd .sec{padding:96px 0;border-top:1px solid rgba(14,34,64,.06)}
  .fd .sec h2{font-size:clamp(30px,4vw,48px);line-height:1.08;margin:16px 0 14px}
  .fd .how{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
  .fd .how div{background:var(--warm);border:1px solid var(--line);border-radius:24px;padding:26px}
  .fd .how b{display:block;font-family:Georgia,"Times New Roman",serif;font-weight:400;font-size:22px;color:var(--navy);margin-bottom:8px}
  .fd .how span{font-size:15px;line-height:1.55}
  .fd .disc{font-size:13px;color:var(--muted);margin-top:22px}
  .fd .src{margin-top:28px}
  .fd .src div{display:grid;grid-template-columns:160px 1fr;gap:16px;padding:12px 0;border-top:1px solid var(--line)}
  .fd .src b{color:var(--navy);font-weight:600;font-size:13px}
  .fd .src span{font-family:"JetBrains Mono","Geist Mono",ui-monospace,Menlo,monospace;font-size:12px;color:var(--muted);line-height:1.6}
  .fd .closer{background:var(--navy);padding:104px 0;text-align:center}
  .fd .closer .eyebrow{color:#5BC0EC}.fd .closer .eyebrow::before{background:#5BC0EC}
  .fd .closer h2{color:#fff;font-size:clamp(32px,4.4vw,52px);line-height:1.08;margin:16px auto 14px;max-width:18ch}
  .fd .closer .lede{color:rgba(255,255,255,.74);margin:0 auto}
  .fd .btns{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-top:30px}
  .fd .btn{display:inline-flex;align-items:center;gap:8px;padding:15px 28px;border-radius:999px;font-size:15px;font-weight:600;text-decoration:none;transition:.2s}
  .fd .btn.solid{background:#fff;color:var(--navy)}.fd .btn.solid:hover{background:var(--blue);color:#fff}
  .fd .btn.ghost{border:1.5px solid rgba(255,255,255,.35);color:#fff}.fd .btn.ghost:hover{border-color:#fff}
  @media(max-width:860px){.fd .how{grid-template-columns:1fr}.fd .src div{grid-template-columns:1fr;gap:4px}}
  @media(max-width:620px){.fd .hero{padding:64px 0 28px}.fd .sec{padding:64px 0}}
`

export default function FiveDimensionsPage() {
  return (
    <>
      <SiteHeader />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://myprimaryid.com/" },
        { name: "The Five Dimensions", url: "https://myprimaryid.com/five-dimensions/" },
      ]} />
      <main className="fd">
        <style>{CSS}</style>

        {/* The plain definition */}
        <section className="hero">
          <div className="frame">
            <span className="eyebrow">The Primary iD</span>
            <h1>One mouth. <em>Five dimensions of you.</em></h1>
            <p className="def">The Primary iD is a reading of five parts of your health, taken from the one place they all show: your mouth.</p>
            <p className="lede">Forty questions, about six minutes. Below is every one of them, why we ask it, and what your answers tell Dr. Gabi before he meets you.</p>
          </div>
        </section>

        <ChaptersView />

        {/* How it adds up */}
        <section className="sec" id="how" aria-labelledby="how-h">
          <div className="frame">
            <span className="eyebrow">How it adds up</span>
            <h2 id="how-h">Five scores, <em>one starting point.</em></h2>
            <div className="how">
              <div><b>Each dimension, 0 to 100.</b><span>Built from its eight answers. Higher means more protective.</span></div>
              <div><b>Your Primary iD.</b><span>The average of the five. One number for the whole picture.</span></div>
              <div><b>Your clearest lever.</b><span>The dimension with the most room to move. It is where your first visit starts.</span></div>
            </div>
            <p className="disc">Your Primary iD is directional. It is not a diagnosis, and it is not a measure of biological age. Dr. Gabi confirms it with you at your visit.</p>
          </div>
        </section>

        {/* Sources */}
        <section className="sec" aria-labelledby="sci-h">
          <div className="frame">
            <span className="eyebrow">The science</span>
            <h2 id="sci-h">Built on published, <em>validated questionnaires.</em></h2>
            <p className="lede">Each dimension adapts questions from screening tools used in dental and medical research. The scoring is ours, and it is directional. These are the sources.</p>
            <div className="src">
              {CHAPTERS.map((c) => <div key={c.slug}><b>{c.name}</b><span>{c.sources}</span></div>)}
            </div>
          </div>
        </section>

        {/* One action */}
        <section className="closer">
          <div className="frame">
            <span className="eyebrow">Start here</span>
            <h2>You have read the questions. <em>Now answer them.</em></h2>
            <p className="lede">Request your visit in about two minutes, then build your Primary iD in about six more. Your iD Guide calls you to confirm a time.</p>
            <div className="btns">
              <a className="btn solid" href="/book/">Build your Primary iD →</a>
              <a className="btn ghost" href="tel:+13105648990">Call (310) 564-8990</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
