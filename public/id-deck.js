/* ============================================================
   PRIMARY iD: the deck. One file, used by /membership/ and the home page.
   Generated from public/membership.html (scratch build_deck.py, Oct 2026):
   the deck's markup, its styles (scoped under .idd) and its behaviour.
   Edit the deck HERE now; membership.html no longer carries its own copy.

   Use:  <div data-id-deck></div>  then load /id-deck.js.
   The deck tells the page which dimension is in front with a
   "id-deck:field" event (detail = colour), so a page can tint itself.
   ============================================================ */
(function(){
  var CSS = ".idd{--blue:#24A7E0;--d-family:#E8985E;--d-longevity:#D97757;--d-nutrition:#48C28C;--d-oral:#D4B584;--d-sleep:#7B68EE;--ease-emph:cubic-bezier(.22,1,.36,1);--ease-enter:cubic-bezier(.16,1,.3,1);--ease-exit:cubic-bezier(.4,0,.2,1);--ink-soft:#3a4a66;--line:rgba(14,34,64,.12);--line-soft:rgba(14,34,64,.06);--mono:\"JetBrains Mono\",\"Geist Mono Variable\",ui-monospace,Menlo,monospace;--muted:#7A8695;--navy:#0E2240;--r-chip:8px;--r-panel:24px;--r-pill:999px;--sans:\"Inter\",\"Geist Variable\",system-ui,-apple-system,\"Helvetica Neue\",Arial,sans-serif;--serif:Georgia,\"Times New Roman\",serif;--t-in:.14s;--t-out:.40s;--t-reveal:.5s;--warm:#FEFCF9;--dcur:#24A7E0;position:relative}\n.idd,.idd *{box-sizing:border-box}.idd *{margin:0;padding:0}.idd{font-family:var(--sans);color:var(--ink-soft);line-height:1.5;-webkit-font-smoothing:antialiased}.idd h3{font-family:var(--serif);font-weight:400;color:var(--navy);letter-spacing:-.02em;line-height:1.06;text-wrap:balance}.idd em{font-family:var(--serif)}.idd a{text-decoration:none;color:inherit}.idd button{font:inherit;color:inherit}\n.idd .lede,.idd .stp p,.idd .rcard p,.idd .kard .ev{text-wrap:pretty}\n.idd .decktabs{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:44px 0 40px}\n.idd .dtab{font-family:var(--sans);font-size:12.5px;font-weight:500;color:var(--ink-soft);background:transparent;border:1px solid var(--line);border-radius:var(--r-pill);padding:9px 17px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;line-height:1;\n    transition:color var(--t-out) var(--ease-exit),border-color var(--t-out) var(--ease-exit),background var(--t-out) var(--ease-exit)}\n.idd .dtab:hover,.idd .dtab[aria-selected=\"true\"]{transition-duration:var(--t-in);transition-timing-function:var(--ease-enter)}\n.idd .dtab::before{transition:transform var(--t-out) var(--ease-exit)}\n.idd .dtab[aria-selected=\"true\"]::before{transform:scale(1.35)}\n.idd .dtab::before{content:\"\";width:8px;height:8px;border-radius:50%;background:var(--dc,var(--navy));flex:0 0 auto}\n.idd .dtab.home::before{background:linear-gradient(135deg,var(--d-oral),var(--d-sleep),var(--d-nutrition),var(--d-family),var(--d-longevity))}\n.idd .dtab:hover{border-color:var(--navy);color:var(--navy)}\n.idd .dtab[aria-selected=\"true\"]{background:var(--navy);color:#fff;border-color:var(--navy)}\n.idd .dtab:focus-visible{outline:2px solid var(--blue);outline-offset:3px}\n.idd .deckstage.grabbing .kard.front{cursor:grabbing}\n.idd .deckstage{position:relative;perspective:1400px;height:610px;margin:0 auto;max-width:420px;touch-action:pan-y;user-select:none}\n@media(max-width:520px){.idd .deckstage{height:640px;max-width:340px}}\n.idd .kard{position:absolute;left:50%;top:0;width:380px;min-height:472px;background:var(--warm);border:1px solid var(--line);border-radius:var(--r-panel);padding:32px 30px;\n    box-shadow:0 26px 60px -30px rgba(14,34,64,.42);cursor:pointer;\n    transform:translateX(-50%);transform-style:preserve-3d;will-change:transform;\n    transition:transform .62s var(--ease-emph),opacity var(--t-reveal) var(--ease-exit),box-shadow .62s var(--ease-exit);\n    display:flex;flex-direction:column;overflow:hidden}\n@media(max-width:520px){.idd .kard{width:320px;min-height:500px;padding:28px 24px}}\n.idd .kard::after{content:\"\";position:absolute;inset:0;border-radius:var(--r-panel);background:var(--navy);opacity:0;transition:opacity .45s ease;pointer-events:none}\n.idd .kard.behind::after{opacity:.045}\n.idd .kard.behind{box-shadow:0 14px 30px -20px rgba(14,34,64,.35)}\n.idd .kard > *:not(.tab){transition:opacity .4s ease,transform .5s cubic-bezier(.22,.9,.28,1)}\n.idd .kard.behind > *:not(.tab){opacity:0;transform:translateY(10px)}\n.idd .kard.dragging{transition:none!important}\n.idd .kard.front{cursor:grab;\n    box-shadow:0 40px 90px -38px rgba(14,34,64,.5),\n               0 24px 70px -34px color-mix(in srgb, var(--dc,var(--navy)) 62%, transparent);\n    transition-duration:.62s,var(--t-in),.62s;transition-timing-function:var(--ease-emph),var(--ease-enter),var(--ease-enter)}\n.idd .kard .tab{position:absolute;top:0;left:30px;width:40px;height:5px;border-radius:0 0 4px 4px;background:var(--dc)}\n.idd .kard .dime{font-family:var(--sans);font-size:10.5px;font-weight:600;letter-spacing:.11em;text-transform:uppercase;color:var(--dc);margin:8px 0 0}\n.idd .kard h3{font-size:26px;line-height:1.14;margin:20px 0 0}\n.idd .kard .ev{font-size:15px;line-height:1.55;color:var(--ink-soft);margin-top:12px}\n.idd .kard .foot{margin-top:auto;padding-top:22px;display:flex;align-items:center;justify-content:space-between;gap:14px}\n.idd .kard .inst{font-family:var(--mono);font-size:9.5px;color:var(--muted);letter-spacing:.03em;line-height:1.5}\n.idd .kard .go{font-family:var(--sans);font-size:12.5px;font-weight:600;color:var(--navy);white-space:nowrap;border-bottom:1px solid rgba(14,34,64,.22);padding-bottom:2px}\n.idd .kard .go:hover{color:var(--blue);border-color:var(--blue)}\n.idd .kring{display:block;margin:26px auto 0}\n.idd .kring .trk{fill:none;stroke:var(--line);stroke-width:7}\n.idd .kring .fl{fill:none;stroke-width:7;stroke-linecap:round;transform:rotate(-90deg);transform-origin:center;stroke:var(--dc);transition:stroke-dasharray .9s cubic-bezier(.3,.9,.3,1)}\n.idd .kring .rn{font-family:var(--serif);font-size:38px;fill:var(--navy);text-anchor:middle}\n.idd .kring .ro{font-family:var(--sans);font-size:9.5px;fill:var(--muted);text-anchor:middle;letter-spacing:.08em}\n.idd .ksample{display:block;width:max-content;margin:14px auto 0;font-family:var(--sans);font-size:9px;font-weight:600;letter-spacing:.11em;text-transform:uppercase;color:var(--muted);background:rgba(14,34,64,.05);padding:5px 12px;border-radius:var(--r-pill)}\n.idd .kard.homecard .hc{font-family:var(--serif);font-size:64px;line-height:.9;color:var(--navy);letter-spacing:-.03em;margin-top:14px}\n.idd .kard.homecard .hc small{font-family:var(--serif);font-size:20px;color:var(--muted);font-style:italic;letter-spacing:0}\n.idd .kard.homecard .hcap{font-size:13px;color:var(--muted);margin-top:8px}\n.idd .hrow{display:grid;grid-template-columns:1fr auto;gap:5px 12px;align-items:center;padding:10px 0;border-top:1px solid var(--line);cursor:pointer}\n.idd .hrow:hover .hn{color:var(--dc);transition-duration:var(--t-in);transition-timing-function:var(--ease-enter)}\n.idd .hrow .hn{font-family:var(--serif);font-size:14.5px;color:var(--navy);display:flex;align-items:center;gap:9px;transition:color var(--t-out) var(--ease-exit)}\n.idd .hrow .hn::before{content:\"\";width:8px;height:8px;border-radius:50%;background:var(--dc);transition:transform var(--t-out) var(--ease-exit)}\n.idd .hrow:hover .hn::before{transform:scale(1.4)}\n.idd .hrow .hs{font-family:var(--serif);font-size:15px;color:var(--navy)}\n.idd .hrow .hb{grid-column:1/-1;height:5px;background:var(--line);border-radius:var(--r-chip);overflow:hidden}\n.idd .hrow .hf{display:block;height:100%;border-radius:var(--r-chip);background:var(--dc);width:0;transition:width 1s var(--ease-emph)}\n.idd .deckhint{text-align:center;margin-top:26px;font-family:var(--sans);font-size:12px;color:var(--muted);letter-spacing:.02em}\n.idd .deckhint kbd{font-family:var(--mono);font-size:11px;background:rgba(14,34,64,.06);border:1px solid var(--line);border-radius:5px;padding:2px 6px;color:var(--navy)}\n.idd .foot{display:grid;grid-template-columns:auto 1fr;gap:36px}\n@media(max-width:820px){.idd .foot{grid-template-columns:1fr}}\n.idd .kard.flip{padding:0;overflow:visible}\n.idd .kard .tab{z-index:3}\n.idd .flipper{position:relative;flex:1;min-height:472px;transform-style:preserve-3d;\n    transition:transform .82s var(--ease-emph)}\n@media(max-width:520px){.idd .flipper{min-height:500px}}\n.idd .kard.flipped .flipper{transform:rotateY(180deg)}\n.idd .face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;\n    display:flex;flex-direction:column;padding:32px 30px;border-radius:var(--r-panel)}\n@media(max-width:520px){.idd .face{padding:28px 24px}}\n.idd .fb{transform:rotateY(180deg);pointer-events:none}\n.idd .kard.flipped .fb{pointer-events:auto}\n.idd .kard.flipped .fa{pointer-events:none}\n.idd .flipbtn{font-family:var(--sans);font-size:12.5px;font-weight:600;color:var(--navy);background:transparent;\n    border:1px solid rgba(14,34,64,.2);border-radius:var(--r-pill);padding:9px 16px;cursor:pointer;white-space:nowrap;\n    transition:border-color var(--t-out) var(--ease-exit),color var(--t-out) var(--ease-exit)}\n.idd .flipbtn:hover{border-color:var(--dc);color:var(--dc);transition-duration:var(--t-in)}\n.idd .bkhead{font-family:var(--sans);font-size:10.5px;font-weight:600;letter-spacing:.11em;text-transform:uppercase;color:var(--dc)}\n.idd .bkmap{display:block;flex:0 0 auto;width:100%;height:104px;margin:14px auto 4px}\n.idd .kring{flex:0 0 auto}\n.idd .bkmap .st{fill:none;stroke:rgba(14,34,64,.22);stroke-width:1.4}\n.idd .bkmap .hl{fill:none;stroke:var(--dc);stroke-width:2.2;stroke-linecap:round}\n.idd .bkmap .dot{fill:var(--dc)}\n.idd .bkmap .gz{fill:var(--dc);opacity:.13}\n.idd .bklist{list-style:none;margin:12px 0 0;padding:0}\n.idd .bklist{flex:1 1 auto}\n.idd .bklist li{font-size:12.8px;line-height:1.42;color:var(--ink-soft);padding:6px 0 6px 19px;position:relative;border-top:1px solid var(--line-soft)}\n.idd .bklist li:first-child{border-top:none}\n.idd .bklist li::before{content:\"\";position:absolute;left:2px;top:14px;width:6px;height:6px;border-radius:50%;background:var(--dc)}\n.idd .bklist li b{color:var(--navy);font-weight:600}\n@media (max-width:560px){.idd .decktabs{gap:6px;margin:32px 0 32px}.idd .dtab{font-size:11.5px;padding:8px 13px}}";
  var HTML = "<div class=\"decktabs\" role=\"tablist\" aria-label=\"Primary iD dimensions\">\n      <button class=\"dtab home\" role=\"tab\" aria-selected=\"true\" data-go=\"0\">All five</button>\n      <button class=\"dtab\" role=\"tab\" aria-selected=\"false\" data-go=\"1\" style=\"--dc:var(--d-oral)\">Oral health</button>\n      <button class=\"dtab\" role=\"tab\" aria-selected=\"false\" data-go=\"2\" style=\"--dc:var(--d-sleep)\">Sleep &amp; airway</button>\n      <button class=\"dtab\" role=\"tab\" aria-selected=\"false\" data-go=\"3\" style=\"--dc:var(--d-nutrition)\">Nutrition</button>\n      <button class=\"dtab\" role=\"tab\" aria-selected=\"false\" data-go=\"4\" style=\"--dc:var(--d-family)\">Family history</button>\n      <button class=\"dtab\" role=\"tab\" aria-selected=\"false\" data-go=\"5\" style=\"--dc:var(--d-longevity)\">Longevity</button>\n    </div>\n    <div class=\"deckstage\">\n      <article class=\"kard homecard flip\" data-i=\"0\" style=\"--dc:var(--blue)\" aria-label=\"Your Primary iD \u2014 all five dimensions\">\n       <div class=\"flipper\">\n        <div class=\"face fa\">\n        <div style=\"display:flex;align-items:baseline;justify-content:space-between\">\n          <span style=\"font-family:var(--serif);font-size:18px;color:var(--navy);font-weight:500\">Primary <em style=\"color:var(--blue);font-style:italic\">iD</em></span>\n          <span style=\"font-family:var(--sans);font-size:9px;font-weight:600;letter-spacing:.11em;text-transform:uppercase;color:var(--muted)\">Sample</span>\n        </div>\n        <div class=\"hc\">72<small> / 100</small></div>\n        <div class=\"hcap\">Five dimensions. One score.</div>\n        <div style=\"margin-top:14px\">\n          <div class=\"hrow\" style=\"--dc:var(--d-oral)\" data-go=\"1\" role=\"button\" tabindex=\"0\" aria-label=\"Open Oral health\">\n            <span class=\"hn\">Oral health</span><span class=\"hs\">72</span>\n            <span class=\"hb\"><span class=\"hf\" data-w=\"72\"></span></span>\n          </div>\n          <div class=\"hrow\" style=\"--dc:var(--d-sleep)\" data-go=\"2\" role=\"button\" tabindex=\"0\" aria-label=\"Open Sleep &amp; airway\">\n            <span class=\"hn\">Sleep &amp; airway</span><span class=\"hs\">68</span>\n            <span class=\"hb\"><span class=\"hf\" data-w=\"68\"></span></span>\n          </div>\n          <div class=\"hrow\" style=\"--dc:var(--d-nutrition)\" data-go=\"3\" role=\"button\" tabindex=\"0\" aria-label=\"Open Nutrition\">\n            <span class=\"hn\">Nutrition</span><span class=\"hs\">81</span>\n            <span class=\"hb\"><span class=\"hf\" data-w=\"81\"></span></span>\n          </div>\n          <div class=\"hrow\" style=\"--dc:var(--d-family)\" data-go=\"4\" role=\"button\" tabindex=\"0\" aria-label=\"Open Family history\">\n            <span class=\"hn\">Family history</span><span class=\"hs\">75</span>\n            <span class=\"hb\"><span class=\"hf\" data-w=\"75\"></span></span>\n          </div>\n          <div class=\"hrow\" style=\"--dc:var(--d-longevity)\" data-go=\"5\" role=\"button\" tabindex=\"0\" aria-label=\"Open Longevity\">\n            <span class=\"hn\">Longevity</span><span class=\"hs\">64</span>\n            <span class=\"hb\"><span class=\"hf\" data-w=\"64\"></span></span>\n          </div>\n        </div>\n        <div class=\"foot\"><button class=\"flipbtn\" type=\"button\">How this is built \u2192</button><span class=\"inst\">Tap a dimension<br>to open its card</span></div>\n        </div>\n        <div class=\"face fb\">\n        <div class=\"bkhead\">How this score is built</div>\n        <svg class=\"bkmap\" viewBox=\"0 0 300 108\" width=\"100%\" height=\"104\" aria-label=\"Forty questions, eight in each of the five dimensions\">\n          <g fill=\"var(--d-oral)\"><circle cx=\"24\" cy=\"14\" r=\"5\"/><circle cx=\"62\" cy=\"14\" r=\"5\"/><circle cx=\"100\" cy=\"14\" r=\"5\"/><circle cx=\"138\" cy=\"14\" r=\"5\"/><circle cx=\"176\" cy=\"14\" r=\"5\"/><circle cx=\"214\" cy=\"14\" r=\"5\"/><circle cx=\"252\" cy=\"14\" r=\"5\"/><circle cx=\"290\" cy=\"14\" r=\"5\"/></g>\n          <g fill=\"var(--d-sleep)\"><circle cx=\"24\" cy=\"36\" r=\"5\"/><circle cx=\"62\" cy=\"36\" r=\"5\"/><circle cx=\"100\" cy=\"36\" r=\"5\"/><circle cx=\"138\" cy=\"36\" r=\"5\"/><circle cx=\"176\" cy=\"36\" r=\"5\"/><circle cx=\"214\" cy=\"36\" r=\"5\"/><circle cx=\"252\" cy=\"36\" r=\"5\"/><circle cx=\"290\" cy=\"36\" r=\"5\"/></g>\n          <g fill=\"var(--d-nutrition)\"><circle cx=\"24\" cy=\"58\" r=\"5\"/><circle cx=\"62\" cy=\"58\" r=\"5\"/><circle cx=\"100\" cy=\"58\" r=\"5\"/><circle cx=\"138\" cy=\"58\" r=\"5\"/><circle cx=\"176\" cy=\"58\" r=\"5\"/><circle cx=\"214\" cy=\"58\" r=\"5\"/><circle cx=\"252\" cy=\"58\" r=\"5\"/><circle cx=\"290\" cy=\"58\" r=\"5\"/></g>\n          <g fill=\"var(--d-family)\"><circle cx=\"24\" cy=\"80\" r=\"5\"/><circle cx=\"62\" cy=\"80\" r=\"5\"/><circle cx=\"100\" cy=\"80\" r=\"5\"/><circle cx=\"138\" cy=\"80\" r=\"5\"/><circle cx=\"176\" cy=\"80\" r=\"5\"/><circle cx=\"214\" cy=\"80\" r=\"5\"/><circle cx=\"252\" cy=\"80\" r=\"5\"/><circle cx=\"290\" cy=\"80\" r=\"5\"/></g>\n          <g fill=\"var(--d-longevity)\"><circle cx=\"24\" cy=\"102\" r=\"5\"/><circle cx=\"62\" cy=\"102\" r=\"5\"/><circle cx=\"100\" cy=\"102\" r=\"5\"/><circle cx=\"138\" cy=\"102\" r=\"5\"/><circle cx=\"176\" cy=\"102\" r=\"5\"/><circle cx=\"214\" cy=\"102\" r=\"5\"/><circle cx=\"252\" cy=\"102\" r=\"5\"/><circle cx=\"290\" cy=\"102\" r=\"5\"/></g>\n        </svg>\n        <p style=\"font-size:12.6px;line-height:1.5;color:var(--ink-soft);margin-top:10px\">Forty questions, eight in each dimension, each one drawn from a published, validated questionnaire. The sources are listed at the foot of this page.</p>\n        <ul class=\"bklist\" style=\"margin-top:10px\">\n          <li style=\"--dc:var(--d-oral)\"><b>Oral health</b></li>\n          <li style=\"--dc:var(--d-sleep)\"><b>Sleep &amp; airway</b></li>\n          <li style=\"--dc:var(--d-nutrition)\"><b>Nutrition</b></li>\n          <li style=\"--dc:var(--d-family)\"><b>Family history</b></li>\n          <li style=\"--dc:var(--d-longevity)\"><b>Longevity</b></li>\n        </ul>\n        <div class=\"foot\"><button class=\"flipbtn\" type=\"button\">\u2190 Back</button><span class=\"inst\">Directional.<br>Not a diagnosis.</span></div>\n        </div>\n       </div>\n      </article>\n      <article class=\"kard flip\" data-i=\"1\" style=\"--dc:var(--d-oral)\" aria-label=\"01 / Oral health\">\n       <div class=\"flipper\">\n        <div class=\"face fa\">\n        <div class=\"dime\">01 / Oral health</div>\n        <svg class=\"kring\" width=\"150\" height=\"150\" viewBox=\"0 0 128 128\" aria-label=\"Sample score 72 of 100\">\n          <circle class=\"trk\" cx=\"64\" cy=\"64\" r=\"42\"/>\n          <circle class=\"fl\" cx=\"64\" cy=\"64\" r=\"42\" stroke-dasharray=\"190.0 263.9\"/>\n          <text class=\"rn\" x=\"64\" y=\"70\">72</text><text class=\"ro\" x=\"64\" y=\"86\">/ 100</text>\n        </svg>\n        <span class=\"ksample\">Sample score</span>\n        <h3>Where it all starts.</h3>\n        <p class=\"ev\">Decay, gums, and the inflammatory load your mouth is putting on the rest of you.</p>\n        <div class=\"foot\"><button class=\"flipbtn\" type=\"button\">What we look at \u2192</button><a class=\"go\" href=\"/book/preventive/?dim=oral\">Get your score \u2192</a></div>\n        </div>\n        <div class=\"face fb\">\n        <div class=\"bkhead\">What we look at</div>\n        <svg class=\"bkmap\" viewBox=\"0 0 300 134\" width=\"100%\" height=\"116\" aria-label=\"A tooth with the gum line, three pocket depth readings and the bone level\">\n          <path class=\"gz\" d=\"M34,72 C92,58 208,58 266,72 L266,124 L34,124 Z\"/>\n          <path class=\"st\" d=\"M118,26 h64 a11,11 0 0 1 11,11 v34 c0,27 -11,45 -19,54 l-7,-32 -6,32 c-9,-9 -19,-27 -19,-54 v-34 a11,11 0 0 1 11,-11 z\"/>\n          <path class=\"hl\" d=\"M34,72 C92,58 208,58 266,72\"/>\n          <path class=\"st\" d=\"M130,72 v20 M150,72 v30 M170,72 v20\"/>\n          <circle class=\"dot\" cx=\"130\" cy=\"92\" r=\"3.4\"/><circle class=\"dot\" cx=\"150\" cy=\"102\" r=\"3.4\"/><circle class=\"dot\" cx=\"170\" cy=\"92\" r=\"3.4\"/>\n          <path class=\"st\" d=\"M34,116 h232\" stroke-dasharray=\"4 6\"/>\n        </svg>\n        <ul class=\"bklist\">\n          <li><b>Pocket depth</b> at six points on every tooth</li>\n          <li><b>Bleeding on probing</b> \u2014 where, and how much</li>\n          <li><b>Bone level</b> against the root, on radiograph</li>\n          <li><b>Decay</b>, and the pattern it lands in</li>\n          <li><b>Calculus</b> above and below the gumline</li>\n        </ul>\n        <div class=\"foot\"><button class=\"flipbtn\" type=\"button\">\u2190 Back</button><span class=\"inst\">Decay, gums and daily comfort</span></div>\n        </div>\n       </div>\n       <span class=\"tab\"></span>\n      </article>\n      <article class=\"kard flip\" data-i=\"2\" style=\"--dc:var(--d-sleep)\" aria-label=\"02 / Sleep &amp; airway\">\n       <div class=\"flipper\">\n        <div class=\"face fa\">\n        <div class=\"dime\">02 / Sleep &amp; airway</div>\n        <svg class=\"kring\" width=\"150\" height=\"150\" viewBox=\"0 0 128 128\" aria-label=\"Sample score 68 of 100\">\n          <circle class=\"trk\" cx=\"64\" cy=\"64\" r=\"42\"/>\n          <circle class=\"fl\" cx=\"64\" cy=\"64\" r=\"42\" stroke-dasharray=\"179.4 263.9\"/>\n          <text class=\"rn\" x=\"64\" y=\"70\">68</text><text class=\"ro\" x=\"64\" y=\"86\">/ 100</text>\n        </svg>\n        <span class=\"ksample\">Sample score</span>\n        <h3>How you breathe, how you heal.</h3>\n        <p class=\"ev\">The first signs of a broken airway show up in your mouth, not your lungs.</p>\n        <div class=\"foot\"><button class=\"flipbtn\" type=\"button\">What we look at \u2192</button><a class=\"go\" href=\"/book/airway/?dim=sleep\">Get your score \u2192</a></div>\n        </div>\n        <div class=\"face fb\">\n        <div class=\"bkhead\">What we look at</div>\n        <svg class=\"bkmap\" viewBox=\"0 0 300 134\" width=\"100%\" height=\"116\" aria-label=\"A head in profile with the airway channel, palate and tongue base marked\">\n          <path class=\"st\" d=\"M78,130 C76,64 110,20 158,20 C204,20 234,52 234,86 c0,12 -10,16 -16,18 -6,2 -3,10 -1,16\"/>\n          <path class=\"gz\" d=\"M152,54 C172,74 172,102 154,126 L134,126 C154,102 154,76 134,56 Z\"/>\n          <path class=\"hl\" d=\"M142,55 C162,75 162,103 144,128\"/>\n          <path class=\"st\" d=\"M96,98 q24,-14 42,-3\"/>\n          <circle class=\"dot\" cx=\"153\" cy=\"64\" r=\"3.4\"/><circle class=\"dot\" cx=\"151\" cy=\"106\" r=\"3.4\"/>\n        </svg>\n        <ul class=\"bklist\">\n          <li><b>Palate shape</b>, and how wide the arch grew</li>\n          <li><b>Tongue position</b>, and the room left for it</li>\n          <li><b>Wear facets</b> \u2014 what clenching leaves behind</li>\n          <li><b>Airway volume</b> on 3D imaging</li>\n          <li><b>What you report</b> \u2014 snoring, waking, sleepiness</li>\n        </ul>\n        <div class=\"foot\"><button class=\"flipbtn\" type=\"button\">\u2190 Back</button><span class=\"inst\">Breathing and daytime sleepiness</span></div>\n        </div>\n       </div>\n       <span class=\"tab\"></span>\n      </article>\n      <article class=\"kard flip\" data-i=\"3\" style=\"--dc:var(--d-nutrition)\" aria-label=\"03 / Nutrition\">\n       <div class=\"flipper\">\n        <div class=\"face fa\">\n        <div class=\"dime\">03 / Nutrition</div>\n        <svg class=\"kring\" width=\"150\" height=\"150\" viewBox=\"0 0 128 128\" aria-label=\"Sample score 81 of 100\">\n          <circle class=\"trk\" cx=\"64\" cy=\"64\" r=\"42\"/>\n          <circle class=\"fl\" cx=\"64\" cy=\"64\" r=\"42\" stroke-dasharray=\"213.8 263.9\"/>\n          <text class=\"rn\" x=\"64\" y=\"70\">81</text><text class=\"ro\" x=\"64\" y=\"86\">/ 100</text>\n        </svg>\n        <span class=\"ksample\">Sample score</span>\n        <h3>Your diet hits your gums first.</h3>\n        <p class=\"ev\">Long before it ever reaches your gut.</p>\n        <div class=\"foot\"><button class=\"flipbtn\" type=\"button\">What we look at \u2192</button><a class=\"go\" href=\"/book/longevity/?dim=nutrition\">Get your score \u2192</a></div>\n        </div>\n        <div class=\"face fb\">\n        <div class=\"bkhead\">What we look at</div>\n        <svg class=\"bkmap\" viewBox=\"0 0 300 134\" width=\"100%\" height=\"116\" aria-label=\"A tooth with erosion zones and a timeline of acid exposures\">\n          <path class=\"st\" d=\"M116,26 h68 a11,11 0 0 1 11,11 v32 c0,26 -11,44 -19,52 l-7,-30 -7,30 c-8,-8 -19,-26 -19,-52 v-32 a11,11 0 0 1 11,-11 z\"/>\n          <path class=\"gz\" d=\"M116,26 h68 a11,11 0 0 1 11,11 v11 h-90 v-11 a11,11 0 0 1 11,-11 z\"/>\n          <path class=\"hl\" d=\"M116,44 C140,36 170,36 195,44\"/>\n          <circle class=\"dot\" cx=\"127\" cy=\"76\" r=\"3.4\"/><circle class=\"dot\" cx=\"184\" cy=\"76\" r=\"3.4\"/>\n          <path class=\"st\" d=\"M40,122 h220\"/>\n          <circle class=\"dot\" cx=\"58\" cy=\"122\" r=\"3\"/><circle class=\"dot\" cx=\"92\" cy=\"122\" r=\"3\"/><circle class=\"dot\" cx=\"116\" cy=\"122\" r=\"3\"/><circle class=\"dot\" cx=\"170\" cy=\"122\" r=\"3\"/><circle class=\"dot\" cx=\"198\" cy=\"122\" r=\"3\"/><circle class=\"dot\" cx=\"216\" cy=\"122\" r=\"3\"/>\n        </svg>\n        <ul class=\"bklist\">\n          <li><b>Erosion</b>, and which surfaces it favors</li>\n          <li><b>Where decay lands</b> \u2014 between, at the gumline, on the edge</li>\n          <li><b>Saliva</b> flow, and how well it buffers acid</li>\n          <li><b>Tissue response</b> \u2014 how the gums answer inflammation</li>\n          <li><b>How often</b> you eat \u2014 frequency beats quantity here</li>\n        </ul>\n        <div class=\"foot\"><button class=\"flipbtn\" type=\"button\">\u2190 Back</button><span class=\"inst\">What you eat and drink</span></div>\n        </div>\n       </div>\n       <span class=\"tab\"></span>\n      </article>\n      <article class=\"kard flip\" data-i=\"4\" style=\"--dc:var(--d-family)\" aria-label=\"04 / Family history\">\n       <div class=\"flipper\">\n        <div class=\"face fa\">\n        <div class=\"dime\">04 / Family history</div>\n        <svg class=\"kring\" width=\"150\" height=\"150\" viewBox=\"0 0 128 128\" aria-label=\"Sample score 75 of 100\">\n          <circle class=\"trk\" cx=\"64\" cy=\"64\" r=\"42\"/>\n          <circle class=\"fl\" cx=\"64\" cy=\"64\" r=\"42\" stroke-dasharray=\"197.9 263.9\"/>\n          <text class=\"rn\" x=\"64\" y=\"70\">75</text><text class=\"ro\" x=\"64\" y=\"86\">/ 100</text>\n        </svg>\n        <span class=\"ksample\">Sample score</span>\n        <h3>The part you didn't choose.</h3>\n        <p class=\"ev\">Heritable risk, graded the way academic periodontists grade it.</p>\n        <div class=\"foot\"><button class=\"flipbtn\" type=\"button\">What we look at \u2192</button><a class=\"go\" href=\"/book/longevity/?dim=genetics\">Get your score \u2192</a></div>\n        </div>\n        <div class=\"face fb\">\n        <div class=\"bkhead\">What we look at</div>\n        <svg class=\"bkmap\" viewBox=\"0 0 300 134\" width=\"100%\" height=\"116\" aria-label=\"A dental arch with the bone level traced across it\">\n          <path class=\"st\" d=\"M46,112 C46,40 254,40 254,112\"/>\n          <circle class=\"dot\" cx=\"52\" cy=\"94\" r=\"3\"/><circle class=\"dot\" cx=\"62\" cy=\"74\" r=\"3\"/><circle class=\"dot\" cx=\"80\" cy=\"58\" r=\"3\"/><circle class=\"dot\" cx=\"104\" cy=\"49\" r=\"3\"/><circle class=\"dot\" cx=\"132\" cy=\"45\" r=\"3\"/><circle class=\"dot\" cx=\"168\" cy=\"45\" r=\"3\"/><circle class=\"dot\" cx=\"196\" cy=\"49\" r=\"3\"/><circle class=\"dot\" cx=\"220\" cy=\"58\" r=\"3\"/><circle class=\"dot\" cx=\"238\" cy=\"74\" r=\"3\"/><circle class=\"dot\" cx=\"248\" cy=\"94\" r=\"3\"/>\n          <path class=\"hl\" d=\"M50,118 C92,106 120,126 152,110 C186,94 220,120 250,112\"/>\n        </svg>\n        <ul class=\"bklist\">\n          <li><b>Bone loss pattern</b> \u2014 even, or localized</li>\n          <li><b>Stage and grade</b>, by the current international system</li>\n          <li><b>Rate of progression</b> measured against your age</li>\n          <li><b>Teeth already lost</b>, and what took them</li>\n          <li><b>What ran in your family</b>, and how early</li>\n        </ul>\n        <div class=\"foot\"><button class=\"flipbtn\" type=\"button\">\u2190 Back</button><span class=\"inst\">How gum disease is graded</span></div>\n        </div>\n       </div>\n       <span class=\"tab\"></span>\n      </article>\n      <article class=\"kard flip\" data-i=\"5\" style=\"--dc:var(--d-longevity)\" aria-label=\"05 / Longevity\">\n       <div class=\"flipper\">\n        <div class=\"face fa\">\n        <div class=\"dime\">05 / Longevity</div>\n        <svg class=\"kring\" width=\"150\" height=\"150\" viewBox=\"0 0 128 128\" aria-label=\"Sample score 64 of 100\">\n          <circle class=\"trk\" cx=\"64\" cy=\"64\" r=\"42\"/>\n          <circle class=\"fl\" cx=\"64\" cy=\"64\" r=\"42\" stroke-dasharray=\"168.9 263.9\"/>\n          <text class=\"rn\" x=\"64\" y=\"70\">64</text><text class=\"ro\" x=\"64\" y=\"86\">/ 100</text>\n        </svg>\n        <span class=\"ksample\">Sample score</span>\n        <h3>The habits that compound.</h3>\n        <p class=\"ev\">What actually decides how strong your next decades feel.</p>\n        <div class=\"foot\"><button class=\"flipbtn\" type=\"button\">What we look at \u2192</button><a class=\"go\" href=\"/book/longevity/?dim=longevity\">Get your score \u2192</a></div>\n        </div>\n        <div class=\"face fb\">\n        <div class=\"bkhead\">What we look at</div>\n        <svg class=\"bkmap\" viewBox=\"0 0 300 134\" width=\"100%\" height=\"116\" aria-label=\"Teeth remaining, with three gaps, above a rising trend line\">\n          <g class=\"st\">\n            <path d=\"M44,34 v30 M60,34 v30 M76,34 v30 M92,34 v30\"/>\n            <path d=\"M124,34 v30 M140,34 v30 M156,34 v30\"/>\n            <path d=\"M188,34 v30 M204,34 v30 M236,34 v30 M252,34 v30\"/>\n          </g>\n          <g class=\"st\" stroke-dasharray=\"2 4\" opacity=\".5\"><path d=\"M108,34 v30 M172,34 v30 M220,34 v30\"/></g>\n          <path class=\"st\" d=\"M40,86 h220\" stroke-dasharray=\"4 6\"/>\n          <path class=\"hl\" d=\"M46,116 C96,112 132,102 168,96 C202,90 232,82 254,74\"/>\n          <circle class=\"dot\" cx=\"254\" cy=\"74\" r=\"4\"/>\n        </svg>\n        <ul class=\"bklist\">\n          <li><b>Teeth remaining</b> \u2014 an old mortality signal</li>\n          <li><b>Total inflammatory load</b> you are carrying</li>\n          <li><b>Tobacco, movement, sleep</b> \u2014 the three that compound</li>\n          <li><b>How the other four are trending</b>, year over year</li>\n          <li><b>What actually changed</b> since your last read</li>\n        </ul>\n        <div class=\"foot\"><button class=\"flipbtn\" type=\"button\">\u2190 Back</button><span class=\"inst\">The everyday habits that compound</span></div>\n        </div>\n       </div>\n       <span class=\"tab\"></span>\n      </article>\n    </div>\n    <p class=\"deckhint\">Drag the deck, tap a card behind, or use <kbd>\u2190</kbd> <kbd>\u2192</kbd></p>";
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var BLUE = '#24A7E0';
  var DIM = ['#D4B584','#7B68EE','#48C28C','#E8985E','#D97757'];

  function mount(root){
    if(root.__idDeck) return; root.__idDeck = true;
    if(!document.getElementById('id-deck-css')){
      var st=document.createElement('style'); st.id='id-deck-css'; st.textContent=CSS; document.head.appendChild(st);
    }
    root.classList.add('idd');
    root.innerHTML = HTML;
    function setField(c){
      if(!c) return;
      root.style.setProperty('--dcur', c);
      root.dispatchEvent(new CustomEvent('id-deck:field', { detail: c, bubbles: true }));
    }
    function setDim(i){ setField(DIM[i] || BLUE); }
    root.querySelectorAll('.hrow').forEach(function(r){
      r.addEventListener('pointerenter',function(){ setDim(+r.dataset.go-1); });
    });
  /* ── THE DECK ────────────────────────────────────────── */
  var deck=root.querySelector('.deckstage');
  if(deck){
    var kards=[].slice.call(deck.querySelectorAll('.kard')),
        tabs=[].slice.call(root.querySelectorAll('.dtab')),
        N=kards.length, active=0, barsDone=false,
        dealt=reduce, dragging=false, x0=0, dx=0, tiltX=0, tiltY=0;

    // stash each ring's target arc so it can animate in on arrival
    kards.forEach(function(k){
      var fl=k.querySelector('.kring .fl');
      if(fl){ k._arc=fl.getAttribute('stroke-dasharray'); fl.setAttribute('stroke-dasharray','0 264'); }
    });

    function layout(){
      var prog = dragging ? Math.min(Math.abs(dx)/150,1) : 0;
      kards.forEach(function(k,i){
        var d=(i-active+N)%N, front=(d===0);
        k.classList.toggle('front',front);
        k.classList.toggle('behind',!front);
        k.classList.toggle('dragging',dragging&&front);

        var y,s,o,tx=0,rot=0,tilt='';
        if(!dealt){                       // pre-deal: squared-up stack
          y=0; s=1; o=0;
        } else if(front){
          y=0; s=1; o=1; tx=dx; rot=dx*0.035;
          if(!dragging&&!reduce) tilt=' rotateY('+tiltY+'deg) rotateX('+tiltX+'deg)';
        } else {
          var dd = d - (d===1?prog:0);    // next card rises as you drag
          y=28+(dd-1)*19; s=1-dd*0.038; o=d>4?0:1-dd*0.09;
        }
        k.style.transform='translateX(calc(-50% + '+tx+'px)) translateY('+y+'px) scale('+s+') rotate('+rot+'deg)'+tilt;
        k.style.opacity=o;
        k.style.zIndex=String(60-d);
        k.style.pointerEvents=d>4?'none':'auto';
        k.setAttribute('aria-hidden',front?'false':'true');

        var fl=k.querySelector('.kring .fl');
        if(fl&&k._arc) fl.setAttribute('stroke-dasharray', front?k._arc:'0 264');
      });
      tabs.forEach(function(t){ t.setAttribute('aria-selected',String(+t.dataset.go===active)); });
      if(active===0&&dealt) fillHome();
    }
    function go(i){
      kards.forEach(function(k){ k.classList.remove('flipped'); });   // a card you leave turns back over
      active=((i%N)+N)%N; dx=0; layout();
      setField(active===0 ? BLUE : DIM[active-1]);
    }

    /* turning a card over — capture phase, so it never reaches the card's own click */
    deck.addEventListener('click',function(e){
      var fb=e.target.closest&&e.target.closest('.flipbtn');
      if(!fb) return;
      e.stopPropagation(); e.preventDefault();
      var k=fb.closest('.kard');
      if(k&&k.classList.contains('front')) k.classList.toggle('flipped');
    },true);

    /* deal-in: fan the squared stack open, staggered */
    function deal(){
      if(dealt) return; dealt=true;
      kards.forEach(function(k,i){
        var d=(i-active+N)%N;
        k.style.transitionDelay=(d*0.075)+'s';
      });
      layout();
      setTimeout(function(){ kards.forEach(function(k){ k.style.transitionDelay=''; }); },1000);
      setTimeout(peek,900);
    }

    /* First landing: the top card turns over and comes back, so you learn there
       is a back without being told. Once per session. The listeners arm at deck
       setup, not inside peek() — otherwise an early tap loses the race and the
       demo fires on top of the person. */
    var peeked=false, acted=false, owned=false;
    function markActed(e){
      if(e&&e.target&&e.target.closest&&e.target.closest('.flipbtn')){ owned=true; return; }
      acted=true;
    }
    deck.addEventListener('pointerdown',markActed,true);
    tabs.forEach(function(t){ t.addEventListener('click',markActed); });

    function peek(){
      if(peeked||reduce||acted) return;
      peeked=true;
      var k=kards[active];
      if(!k||!k.classList.contains('flip')) return;
      setTimeout(function(){ if(!acted&&!owned) k.classList.add('flipped'); },500);
      setTimeout(function(){ if(!owned) k.classList.remove('flipped'); },2300);
    }
    var dealIO=new IntersectionObserver(function(es){
      es.forEach(function(en){ if(en.isIntersecting){ deal(); dealIO.disconnect(); } });
    },{threshold:.3});
    dealIO.observe(deck);

    /* selection */
    kards.forEach(function(k){
      k.addEventListener('click',function(){ if(Math.abs(dx)<6&&!k.classList.contains('front')) go(+k.dataset.i); });
    });
    tabs.forEach(function(t){ t.addEventListener('click',function(){ go(+t.dataset.go); }); });
    deck.querySelectorAll('.hrow').forEach(function(r){
      r.addEventListener('click',function(e){ e.stopPropagation(); go(+r.dataset.go); });
      r.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); e.stopPropagation(); go(+r.dataset.go); } });
    });

    /* keyboard, when the deck is on screen */
    addEventListener('keydown',function(e){
      if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight') return;
      var r=deck.getBoundingClientRect();
      if(r.top>innerHeight*0.8||r.bottom<innerHeight*0.2) return;
      e.preventDefault(); go(active+(e.key==='ArrowRight'?1:-1));
    });

    /* swipe / drag — the front card follows your finger */
    /* Capture only once a real drag begins. Capturing on pointerdown retargets the
       subsequent click to the deck, which silently ate every button and link on the
       front card — including "Get your score". */
    var pend=false, pid=null;
    deck.addEventListener('pointerdown',function(e){
      if(!dealt) return;
      if(e.target.closest&&e.target.closest('button,a')) return;   // controls stay controls
      pend=true; pid=e.pointerId; x0=e.clientX; dx=0;
    });
    deck.addEventListener('pointermove',function(e){
      if(pend&&!dragging&&Math.abs(e.clientX-x0)>6){
        dragging=true; deck.classList.add('grabbing');
        deck.setPointerCapture&&deck.setPointerCapture(pid);
      }
      if(dragging){ dx=e.clientX-x0; layout(); return; }
      if(reduce||!dealt) return;
      /* hold the tilt steady over a control. Otherwise the card keeps moving
         out from under the cursor and the button becomes impossible to hit. */
      if(e.target.closest&&e.target.closest('.flipbtn,.go')) return;
      var r=deck.getBoundingClientRect();               // idle parallax tilt
      tiltY=((e.clientX-(r.left+r.width/2))/r.width)*5;
      tiltX=-((e.clientY-(r.top+r.height/2))/r.height)*3.5;
      layout();
    });
    deck.addEventListener('pointerleave',function(){
      if(dragging) return; tiltX=0; tiltY=0; layout();
    });
    function endDrag(){
      pend=false;
      if(!dragging) return;
      var moved=dx; dragging=false; deck.classList.remove('grabbing');
      if(Math.abs(moved)>70){ go(active+(moved<0?1:-1)); }
      else { dx=0; layout(); }
      setTimeout(function(){ dx=0; },50);
    }
    deck.addEventListener('pointerup',endDrag);
    deck.addEventListener('pointercancel',endDrag);

    function fillHome(){
      if(barsDone) return; barsDone=true;
      deck.querySelectorAll('.hf').forEach(function(el,i){
        setTimeout(function(){ el.style.width=el.dataset.w+'%'; }, reduce?0:260+i*95);
      });
    }
    layout();
    if(reduce) deal();
  }

  }

  function mountAll(){ [].slice.call(document.querySelectorAll('[data-id-deck]')).forEach(mount); }
  window.PrimaryIdDeck = { mount: mount, mountAll: mountAll };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountAll); else mountAll();
})();
