import { SiteHeader, SiteFooter } from "@/components/site-shell"
import { BreadcrumbSchema } from "@/components/schema"
import { IdDeck } from "@/components/id-deck"

// ─────────────────────────────────────────────────────────────────────────
// /five-dimensions/ : what the Primary iD reads, in the patient's words.
//
// Order: what it is → the deck (shared with the home page and /membership/,
// from /id-deck.js) → one plain section per dimension → how the score works
// → the science → one action.
//
// Rails (spec and Brand OS): patients never see instrument names, which live
// only in the citations at the foot; "Family history", never "Genetics";
// the score is directional, not a diagnosis and not biological age; no claim
// that treatment treats sleep apnea, reduces inflammation or extends life;
// no statistic without a confirmed source. Tier bands stay off this page
// until Dr. Gabi rules on them (spec S2).
// ─────────────────────────────────────────────────────────────────────────

const DIMS = [
  {
    n: "01", name: "Oral health", color: "#D4B584", slug: "oral",
    title: "Where it all starts.",
    body: "Your teeth and gums are the part of your health you can see. Bleeding gums are a sign of inflammation, and research links gum disease with heart disease and diabetes. So this is where we begin.",
    asks: ["Sugar between meals", "A new cavity in the last three years", "Bleeding when you brush or floss", "Your last professional cleaning", "A dry mouth", "Grinding or clenching", "How you feel about your smile"],
    href: "/book/preventive/?dim=oral",
  },
  {
    n: "02", name: "Sleep & airway", color: "#7B68EE", slug: "sleep",
    title: "How you breathe, how you heal.",
    body: "Your jaw, your tongue and the back of your throat are visible from a dental chair in a way they rarely are anywhere else. The Primary iD does not diagnose a sleep disorder. It tells us whether a sleep test is worth a conversation with your physician.",
    asks: ["Loud snoring", "Feeling tired during the day", "Anyone noticing you stop breathing at night", "Blood pressure", "How easily you doze off sitting down"],
    href: "/book/airway/?dim=sleep",
  },
  {
    n: "03", name: "Nutrition", color: "#48C28C", slug: "nutrition",
    title: "Your diet reaches your gums first.",
    body: "We do not prescribe diets. We ask about your pattern, not what you ate yesterday, so the one or two changes that would matter most are easy to see.",
    asks: ["Vegetables and fruit", "Olive oil as your main fat", "Red and processed meat", "Sugary drinks", "Water", "Alcohol"],
    href: "/book/longevity/?dim=nutrition",
  },
  {
    n: "04", name: "Family history", color: "#E8985E", slug: "family",
    title: "The part you didn't choose.",
    body: "Some of your risk was set before you were born. What ran in your family changes how closely we watch, and for gum disease it is a better guide than the genetic tests once sold for it.",
    asks: ["A parent or sibling who lost teeth to gum disease", "Diabetes in the family", "Early heart attack or stroke in the family", "Your smoking history", "Autoimmune conditions", "Stress right now"],
    href: "/book/longevity/?dim=genetics",
  },
  {
    n: "05", name: "Longevity", color: "#D97757", slug: "longevity",
    title: "The habits that compound.",
    body: "Tobacco, movement, sleep, weight, blood pressure and blood sugar: the everyday basics that decide how strong your next decades feel. We read them alongside your mouth, so what we find there has context.",
    asks: ["Tobacco or vaping", "Minutes of exercise a week", "Hours of sleep", "Your weight", "Cholesterol, blood sugar and blood pressure", "Your diet overall"],
    href: "/book/longevity/?dim=longevity",
  },
]

const SOURCES = [
  { name: "Oral health", refs: "Featherstone JDB, J Calif Dent Assoc 2007 · Eke PI et al., J Periodontol 2013 · Slade GD, Community Dent Oral Epidemiol 1997" },
  { name: "Sleep & airway", refs: "Chung F et al., Anesthesiology 2008 · Johns MW, Sleep 1991" },
  { name: "Nutrition", refs: "Martínez-González MA et al., PLoS One 2012 · Hedrick VE et al., J Am Diet Assoc 2012" },
  { name: "Family history", refs: "Jepsen S et al., J Periodontol 2018 · Nibali L et al., 2019" },
  { name: "Longevity", refs: "Lloyd-Jones DM et al., Circulation 2022" },
]

const CSS = `
  .fd{--navy:#0E2240;--blue:#24A7E0;--cream:#FAF8F5;--warm:#FEFCF9;--ink-soft:#3a4a66;--muted:#7A8695;--line:rgba(14,34,64,.12);
      background:var(--cream);color:var(--ink-soft)}
  .fd .wrap{max-width:1120px;margin:0 auto;padding:0 24px}
  .fd .eyebrow{display:inline-flex;align-items:center;gap:12px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--blue)}
  .fd .eyebrow::before{content:"";width:26px;height:1px;background:var(--blue)}
  .fd .center .eyebrow::after{content:"";width:26px;height:1px;background:var(--blue)}
  .fd h1,.fd h2,.fd h3{font-family:Georgia,"Times New Roman",serif;font-weight:400;color:var(--navy);letter-spacing:-.02em}
  .fd h1 em,.fd h2 em{color:var(--blue);font-style:italic}
  .fd .lede{font-family:Georgia,"Times New Roman",serif;font-size:19px;line-height:1.62;color:var(--ink-soft);max-width:60ch}
  .fd .center{text-align:center}.fd .center .lede{margin-left:auto;margin-right:auto}
  .fd .btn{display:inline-flex;align-items:center;gap:8px;padding:15px 28px;border-radius:999px;font-size:15px;font-weight:600;text-decoration:none;transition:.2s}
  .fd .btn.solid{background:var(--navy);color:#fff}.fd .btn.solid:hover{background:var(--blue)}
  .fd .btn.ghost{border:1.5px solid rgba(14,34,64,.25);color:var(--navy)}.fd .btn.ghost:hover{border-color:var(--navy)}
  .fd .hero{padding:96px 0 40px}
  .fd .hero h1{font-size:clamp(40px,6vw,68px);line-height:1.04;margin:20px 0 20px;max-width:14ch}
  .fd .hero .row{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin-top:30px}
  .fd .hero .micro{font-size:13px;color:var(--muted);margin-top:18px}
  .fd .sec{padding:88px 0;border-top:1px solid rgba(14,34,64,.06)}
  .fd .sec h2{font-size:clamp(30px,4vw,48px);line-height:1.08;margin:16px 0 14px}
  .fd .deckhead{margin-bottom:36px}
  .fd .dim{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px;align-items:start;padding:64px 0;border-top:1px solid var(--line)}
  .fd .dim:first-of-type{border-top:0}
  .fd .tag{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--dc)}
  .fd .tag::before{content:"";width:10px;height:10px;border-radius:50%;background:var(--dc)}
  .fd .dim h3{font-size:clamp(28px,3.2vw,40px);line-height:1.1;margin:14px 0 14px}
  .fd .dim p{font-family:Georgia,"Times New Roman",serif;font-size:18px;line-height:1.62;margin:0}
  .fd .asks{background:var(--warm);border:1px solid var(--line);border-radius:24px;padding:26px 28px}
  .fd .asks .lab{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:14px}
  .fd .asks ul{list-style:none;margin:0;padding:0}
  .fd .asks li{display:flex;gap:12px;align-items:baseline;padding:10px 0;border-top:1px solid rgba(14,34,64,.07);font-size:15.5px;color:var(--navy)}
  .fd .asks li:first-child{border-top:0}
  .fd .asks li::before{content:"";flex:none;width:7px;height:7px;border-radius:50%;background:var(--dc);transform:translateY(-1px)}
  .fd .asks .foot{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:16px;padding-top:14px;border-top:1px solid var(--line);font-size:13px;color:var(--muted)}
  .fd .asks .foot a{font-weight:600;color:var(--navy);text-decoration:none}.fd .asks .foot a:hover{color:var(--blue)}
  .fd .how{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
  .fd .how div{background:var(--warm);border:1px solid var(--line);border-radius:24px;padding:26px}
  .fd .how b{display:block;font-family:Georgia,"Times New Roman",serif;font-weight:400;font-size:22px;color:var(--navy);margin-bottom:8px}
  .fd .how span{font-size:15px;line-height:1.55}
  .fd .disc{font-size:13px;color:var(--muted);margin-top:22px}
  .fd .src{margin-top:28px;display:grid;gap:10px}
  .fd .src div{display:grid;grid-template-columns:160px 1fr;gap:16px;font-size:13px;padding:12px 0;border-top:1px solid var(--line)}
  .fd .src b{color:var(--navy);font-weight:600}
  .fd .src span{font-family:"JetBrains Mono","Geist Mono",ui-monospace,Menlo,monospace;font-size:12px;color:var(--muted);line-height:1.6}
  .fd .close{background:var(--navy);padding:96px 0}
  .fd .close h2{color:#fff}.fd .close .lede{color:rgba(255,255,255,.74)}
  .fd .close .btn.solid{background:#fff;color:var(--navy)}.fd .close .btn.solid:hover{background:var(--blue);color:#fff}
  .fd .close .btn.ghost{border-color:rgba(255,255,255,.35);color:#fff}
  @media(max-width:860px){.fd .dim{grid-template-columns:1fr;gap:28px}.fd .how{grid-template-columns:1fr}.fd .src div{grid-template-columns:1fr;gap:4px}}
  @media(max-width:620px){.fd .hero{padding:64px 0 24px}.fd .sec{padding:64px 0}.fd .wrap{padding:0 16px}.fd .asks{padding:22px 20px}}
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

        {/* What it is */}
        <section className="hero">
          <div className="wrap">
            <span className="eyebrow">The Primary iD</span>
            <h1>One mouth. <em>Five dimensions of you.</em></h1>
            <p className="lede">
              Your Primary iD reads five parts of your health from the one place they all show up: your mouth. Forty questions, about six minutes, and Dr. Gabi reads your answers before he meets you, so your first visit starts with what matters to you.
            </p>
            <div className="row">
              <a className="btn solid" href="/book/">Build your Primary iD →</a>
              <a className="btn ghost" href="#the-five">See the five</a>
            </div>
            <p className="micro">Private, and yours to keep.</p>
          </div>
        </section>

        {/* The deck, shared with the home page and /membership/ */}
        <section className="sec" aria-labelledby="deck-h">
          <div className="wrap">
            <div className="center deckhead">
              <span className="eyebrow">Five dimensions. One score.</span>
              <h2 id="deck-h">Meet your Primary <em>iD.</em></h2>
              <p className="lede">One card for the whole picture, five underneath it. Turn any card over to see what we look at.</p>
            </div>
            <IdDeck />
          </div>
        </section>

        {/* Each dimension, in plain words */}
        <section className="sec" id="the-five" aria-labelledby="five-h">
          <div className="wrap">
            <span className="eyebrow">What it asks, and why</span>
            <h2 id="five-h">Eight questions each. <em>No forms.</em></h2>
            <p className="lede">Every question is one tap. Here is what each dimension asks about, and why it matters to your mouth.</p>
            {DIMS.map((d) => (
              <div key={d.slug} className="dim" id={d.slug} style={{ ["--dc" as string]: d.color }}>
                <div>
                  <span className="tag">{d.n} / {d.name}</span>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </div>
                <div className="asks">
                  <div className="lab">What we ask about</div>
                  <ul>{d.asks.map((a) => <li key={a}>{a}</li>)}</ul>
                  <div className="foot"><span>Eight questions</span><a href={d.href}>Start here →</a></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How the score works */}
        <section className="sec" aria-labelledby="score-h">
          <div className="wrap">
            <span className="eyebrow">How the score works</span>
            <h2 id="score-h">Five scores, <em>one starting point.</em></h2>
            <div className="how">
              <div><b>Each dimension, 0 to 100.</b><span>Built from its eight answers. Higher means more protective.</span></div>
              <div><b>Your Primary iD.</b><span>The average of the five. One number for the whole picture.</span></div>
              <div><b>Your clearest lever.</b><span>The dimension with the most room to move. It is where your first visit starts.</span></div>
            </div>
            <p className="disc">Your Primary iD is directional. It is not a diagnosis, and it is not a measure of biological age. Dr. Gabi confirms it with you at your visit.</p>
          </div>
        </section>

        {/* The science, kept to its sources */}
        <section className="sec" aria-labelledby="sci-h">
          <div className="wrap">
            <span className="eyebrow">The science</span>
            <h2 id="sci-h">Built on published, <em>validated questionnaires.</em></h2>
            <p className="lede">Each dimension adapts questions from screening tools used in dental and medical research. The scoring is ours, and it is directional. These are the sources.</p>
            <div className="src">
              {SOURCES.map((s) => <div key={s.name}><b>{s.name}</b><span>{s.refs}</span></div>)}
            </div>
          </div>
        </section>

        {/* One action */}
        <section className="close">
          <div className="wrap center">
            <span className="eyebrow">Start here</span>
            <h2>About six minutes. <em>Yours to keep.</em></h2>
            <p className="lede">Request your visit in about two minutes, then build your Primary iD. Your iD Guide calls you to confirm a time.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 28 }}>
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
