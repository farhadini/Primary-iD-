// GENERATED from public/id-deck.js (the deck's card backs: drawing and "What we look at")
// and the canonical question bank v2.2 (primary-id-bank.json: questions and their
// clinical basis, rewritten for patients). Instrument names stay out of patient copy;
// they live only in `sources`. Edit the page wording here.
//
// note: Dr. Gabi's note for the chapter. null until recorded; the chapter renders
// without it. To add one: { kind: "video" | "audio", src, poster?, title, transcript }.

export type DoctorNote = { kind: "video" | "audio"; src: string; poster?: string; title: string; transcript: string }
export type Chapter = {
  slug: string; n: string; name: string; color: string; feel: string; score: number
  title: [string, string]; definition: string; reframe: string
  svg: string; label: string; look: { b: string; t: string }[]
  qs: { q: string; why: string }[]; tells: string; close: string; sources: string; href: string
  note: DoctorNote | null
}

export const CHAPTERS: Chapter[] = [
  {
    "slug": "oral",
    "n": "01",
    "name": "Oral health",
    "color": "#D4B584",
    "feel": "My gums bleed",
    "title": [
      "Where it all ",
      "starts."
    ],
    "definition": "Oral health is the state of your teeth, your gums and the saliva that protects them.",
    "reframe": "A cavity is not really the problem. It is the sign that the balance in your mouth has tipped, and that balance is what we read.",
    "qs": [
      {
        "q": "How often do you have sugary drinks or snacks between meals?",
        "why": "How often you snack matters more than how much sugar you eat. Each snack starts a new acid attack."
      },
      {
        "q": "Have you had a new cavity in the last 3 years?",
        "why": "A recent cavity is the best single guide to whether more are on the way."
      },
      {
        "q": "Do you use fluoridated toothpaste twice a day?",
        "why": "Twice-daily fluoride toothpaste is one of the best-proven ways to prevent decay."
      },
      {
        "q": "Do your gums bleed when you brush or floss?",
        "why": "Gums that bleed are inflamed. It is the earliest visible sign of gum disease."
      },
      {
        "q": "When was your last professional cleaning?",
        "why": "Tartar and inflammation build up when cleanings are far apart."
      },
      {
        "q": "Do you often feel like your mouth is dry?",
        "why": "Saliva neutralizes acid. A dry mouth leaves your teeth with less protection."
      },
      {
        "q": "Do you grind or clench your teeth?",
        "why": "Grinding wears teeth down, and it is often connected to how you breathe at night."
      },
      {
        "q": "How confident do you feel about your smile?",
        "why": "How you feel about your smile shapes whether you look after it, and whether you see a dentist at all."
      }
    ],
    "tells": "Where decay and gum inflammation are most likely to start, so your first visit begins in the right place.",
    "close": "Every other dimension shows up here first.",
    "sources": "Featherstone JDB, J Calif Dent Assoc 2007 · Eke PI et al., J Periodontol 2013 · Slade GD, Community Dent Oral Epidemiol 1997",
    "href": "/book/preventive/?dim=oral",
    "svg": "<svg class=\"diagram-svg\" viewBox=\"0 0 300 134\" width=\"100%\" aria-label=\"A tooth with the gum line, three pocket depth readings and the bone level\">\n          <path class=\"gz\" d=\"M34,72 C92,58 208,58 266,72 L266,124 L34,124 Z\"/>\n          <path class=\"st\" d=\"M118,26 h64 a11,11 0 0 1 11,11 v34 c0,27 -11,45 -19,54 l-7,-32 -6,32 c-9,-9 -19,-27 -19,-54 v-34 a11,11 0 0 1 11,-11 z\"/>\n          <path class=\"hl\" d=\"M34,72 C92,58 208,58 266,72\"/>\n          <path class=\"st\" d=\"M130,72 v20 M150,72 v30 M170,72 v20\"/>\n          <circle class=\"dot\" cx=\"130\" cy=\"92\" r=\"3.4\"/><circle class=\"dot\" cx=\"150\" cy=\"102\" r=\"3.4\"/><circle class=\"dot\" cx=\"170\" cy=\"92\" r=\"3.4\"/>\n          <path class=\"st\" d=\"M34,116 h232\" stroke-dasharray=\"4 6\"/>\n        </svg>",
    "label": "A tooth with the gum line, three pocket depth readings and the bone level",
    "look": [
      {
        "b": "Pocket depth",
        "t": "at six points on every tooth"
      },
      {
        "b": "Bleeding on probing",
        "t": "where, and how much"
      },
      {
        "b": "Bone level",
        "t": "against the root, on radiograph"
      },
      {
        "b": "Decay",
        "t": ", and the pattern it lands in"
      },
      {
        "b": "Calculus",
        "t": "above and below the gumline"
      }
    ],
    "score": 72,
    "note": null
  },
  {
    "slug": "sleep",
    "n": "02",
    "name": "Sleep & airway",
    "color": "#7B68EE",
    "feel": "I'm tired all the time",
    "title": [
      "How you breathe, ",
      "how you heal."
    ],
    "definition": "Sleep and airway is how well you breathe at night, read from the parts of your airway a dentist can see.",
    "reframe": "Snoring is not just noise. It can be a sign that your airway narrows while you sleep, and some of the signs show up in your mouth first.",
    "qs": [
      {
        "q": "Do you snore loudly, loud enough to be heard through a door?",
        "why": "Loud snoring is the most common sign that the airway narrows at night."
      },
      {
        "q": "Do you often feel tired or sleepy during the day?",
        "why": "Feeling tired after a full night can mean your sleep is being interrupted without you knowing."
      },
      {
        "q": "Has anyone observed you stop breathing or gasp in your sleep?",
        "why": "Pauses someone else notices are one of the clearest signs worth checking."
      },
      {
        "q": "Are you being treated for high blood pressure?",
        "why": "High blood pressure and disrupted breathing at night often travel together."
      },
      {
        "q": "Which best describes your build?",
        "why": "Body size is one of several things that shape the airway."
      },
      {
        "q": "What's your age range?",
        "why": "Breathing problems at night become more common with age, so we weigh this gently."
      },
      {
        "q": "How would you describe your neck?",
        "why": "Neck size is a simple guide to how much room the airway has."
      },
      {
        "q": "Sitting and reading, how likely are you to doze off?",
        "why": "How easily you nod off in the day tells us how rested you really are."
      }
    ],
    "tells": "Whether a sleep test is worth a conversation with your physician. The Primary iD does not diagnose a sleep disorder.",
    "close": "Rest starts with how you breathe.",
    "sources": "Chung F et al., Anesthesiology 2008 · Johns MW, Sleep 1991",
    "href": "/book/airway/?dim=sleep",
    "svg": "<svg class=\"diagram-svg\" viewBox=\"0 0 300 134\" width=\"100%\" aria-label=\"A head in profile with the airway channel, palate and tongue base marked\">\n          <path class=\"st\" d=\"M78,130 C76,64 110,20 158,20 C204,20 234,52 234,86 c0,12 -10,16 -16,18 -6,2 -3,10 -1,16\"/>\n          <path class=\"gz\" d=\"M152,54 C172,74 172,102 154,126 L134,126 C154,102 154,76 134,56 Z\"/>\n          <path class=\"hl\" d=\"M142,55 C162,75 162,103 144,128\"/>\n          <path class=\"st\" d=\"M96,98 q24,-14 42,-3\"/>\n          <circle class=\"dot\" cx=\"153\" cy=\"64\" r=\"3.4\"/><circle class=\"dot\" cx=\"151\" cy=\"106\" r=\"3.4\"/>\n        </svg>",
    "label": "A head in profile with the airway channel, palate and tongue base marked",
    "look": [
      {
        "b": "Palate shape",
        "t": ", and how wide the arch grew"
      },
      {
        "b": "Tongue position",
        "t": ", and the room left for it"
      },
      {
        "b": "Wear facets",
        "t": "what clenching leaves behind"
      },
      {
        "b": "Airway volume",
        "t": "on 3D imaging"
      },
      {
        "b": "What you report",
        "t": "snoring, waking, sleepiness"
      }
    ],
    "score": 68,
    "note": null
  },
  {
    "slug": "nutrition",
    "n": "03",
    "name": "Nutrition",
    "color": "#48C28C",
    "feel": "I think about what I eat",
    "title": [
      "Your diet reaches ",
      "your gums first."
    ],
    "definition": "Nutrition is the pattern of what you eat and drink, which reaches your teeth and gums before anything else.",
    "reframe": "We do not count calories or prescribe a diet. We look for the one or two habits doing the most, to your mouth and to the rest of you.",
    "qs": [
      {
        "q": "Do you use olive oil as your main cooking fat?",
        "why": "Olive oil as your main fat is a hallmark of the Mediterranean pattern, one of the best-studied ways of eating."
      },
      {
        "q": "How many servings of vegetables do you eat per day?",
        "why": "Vegetables bring fiber and protective compounds. More servings means a stronger pattern."
      },
      {
        "q": "How many servings of fruit per day?",
        "why": "Whole fruit adds fiber and nutrients to the pattern."
      },
      {
        "q": "How often do you eat red or processed meat?",
        "why": "A lot of red and processed meat pulls the overall pattern the wrong way."
      },
      {
        "q": "How many sugar-sweetened beverages do you have per week?",
        "why": "Sugary drinks are the strongest single dietary signal for both tooth decay and metabolic health."
      },
      {
        "q": "How many glasses of water do you drink per day?",
        "why": "Water keeps saliva flowing, and saliva protects your teeth."
      },
      {
        "q": "How often do you drink alcohol?",
        "why": "Alcohol dries the mouth and relaxes the airway at night, so it touches two dimensions at once."
      },
      {
        "q": "Are most of the grains you eat whole-grain?",
        "why": "Whole grains change how quickly sugar reaches your bloodstream."
      }
    ],
    "tells": "Which one or two changes would matter most, so any advice is specific to you rather than general.",
    "close": "Everything you eat starts in your mouth.",
    "sources": "Martínez-González MA et al., PLoS One 2012 · Hedrick VE et al., J Am Diet Assoc 2012",
    "href": "/book/longevity/?dim=nutrition",
    "svg": "<svg class=\"diagram-svg\" viewBox=\"0 0 300 134\" width=\"100%\" aria-label=\"A tooth with erosion zones and a timeline of acid exposures\">\n          <path class=\"st\" d=\"M116,26 h68 a11,11 0 0 1 11,11 v32 c0,26 -11,44 -19,52 l-7,-30 -7,30 c-8,-8 -19,-26 -19,-52 v-32 a11,11 0 0 1 11,-11 z\"/>\n          <path class=\"gz\" d=\"M116,26 h68 a11,11 0 0 1 11,11 v11 h-90 v-11 a11,11 0 0 1 11,-11 z\"/>\n          <path class=\"hl\" d=\"M116,44 C140,36 170,36 195,44\"/>\n          <circle class=\"dot\" cx=\"127\" cy=\"76\" r=\"3.4\"/><circle class=\"dot\" cx=\"184\" cy=\"76\" r=\"3.4\"/>\n          <path class=\"st\" d=\"M40,122 h220\"/>\n          <circle class=\"dot\" cx=\"58\" cy=\"122\" r=\"3\"/><circle class=\"dot\" cx=\"92\" cy=\"122\" r=\"3\"/><circle class=\"dot\" cx=\"116\" cy=\"122\" r=\"3\"/><circle class=\"dot\" cx=\"170\" cy=\"122\" r=\"3\"/><circle class=\"dot\" cx=\"198\" cy=\"122\" r=\"3\"/><circle class=\"dot\" cx=\"216\" cy=\"122\" r=\"3\"/>\n        </svg>",
    "label": "A tooth with erosion zones and a timeline of acid exposures",
    "look": [
      {
        "b": "Erosion",
        "t": ", and which surfaces it favors"
      },
      {
        "b": "Where decay lands",
        "t": "between, at the gumline, on the edge"
      },
      {
        "b": "Saliva",
        "t": "flow, and how well it buffers acid"
      },
      {
        "b": "Tissue response",
        "t": "how the gums answer inflammation"
      },
      {
        "b": "How often",
        "t": "you eat — frequency beats quantity here"
      }
    ],
    "score": 81,
    "note": null
  },
  {
    "slug": "family",
    "n": "04",
    "name": "Family history",
    "color": "#E8985E",
    "feel": "It runs in my family",
    "title": [
      "The part you ",
      "didn't choose."
    ],
    "definition": "Family history is the part of your risk you were born with, and the habits that came with it.",
    "reframe": "Your history is not your fate. It is an early warning, and the earlier we know it, the earlier we can watch for it.",
    "qs": [
      {
        "q": "Did a parent or sibling lose teeth to gum disease?",
        "why": "Gum disease in a parent or sibling is the strongest inherited signal we know of."
      },
      {
        "q": "Does diabetes run in your immediate family?",
        "why": "Diabetes and gum disease affect each other, so a family history of one matters to the other."
      },
      {
        "q": "Heart attack or stroke in a parent or sibling before 65?",
        "why": "An early heart attack or stroke in the family changes how carefully we read the rest."
      },
      {
        "q": "What's your smoking history?",
        "why": "Smoking is the biggest risk you can change, for your gums and for the rest of you."
      },
      {
        "q": "Have you lost any teeth to gum disease?",
        "why": "Teeth already lost to gum disease tell us how far it has progressed."
      },
      {
        "q": "Do you or a close relative have an autoimmune condition?",
        "why": "Some autoimmune conditions share inflammatory pathways with gum disease."
      },
      {
        "q": "Did you have gum problems during pregnancy?",
        "why": "Gum changes during pregnancy show how your tissues respond to inflammation."
      },
      {
        "q": "How would you rate your current stress?",
        "why": "Long-term stress affects how your body handles inflammation."
      }
    ],
    "tells": "How closely to watch your gums, and how often you should be seen.",
    "close": "Knowing it early is how you get ahead of it.",
    "sources": "Jepsen S et al., J Periodontol 2018 · Nibali L et al., 2019",
    "href": "/book/longevity/?dim=genetics",
    "svg": "<svg class=\"diagram-svg\" viewBox=\"0 0 300 134\" width=\"100%\" aria-label=\"A dental arch with the bone level traced across it\">\n          <path class=\"st\" d=\"M46,112 C46,40 254,40 254,112\"/>\n          <circle class=\"dot\" cx=\"52\" cy=\"94\" r=\"3\"/><circle class=\"dot\" cx=\"62\" cy=\"74\" r=\"3\"/><circle class=\"dot\" cx=\"80\" cy=\"58\" r=\"3\"/><circle class=\"dot\" cx=\"104\" cy=\"49\" r=\"3\"/><circle class=\"dot\" cx=\"132\" cy=\"45\" r=\"3\"/><circle class=\"dot\" cx=\"168\" cy=\"45\" r=\"3\"/><circle class=\"dot\" cx=\"196\" cy=\"49\" r=\"3\"/><circle class=\"dot\" cx=\"220\" cy=\"58\" r=\"3\"/><circle class=\"dot\" cx=\"238\" cy=\"74\" r=\"3\"/><circle class=\"dot\" cx=\"248\" cy=\"94\" r=\"3\"/>\n          <path class=\"hl\" d=\"M50,118 C92,106 120,126 152,110 C186,94 220,120 250,112\"/>\n        </svg>",
    "label": "A dental arch with the bone level traced across it",
    "look": [
      {
        "b": "Bone loss pattern",
        "t": "even, or localized"
      },
      {
        "b": "Stage and grade",
        "t": ", by the current international system"
      },
      {
        "b": "Rate of progression",
        "t": "measured against your age"
      },
      {
        "b": "Teeth already lost",
        "t": ", and what took them"
      },
      {
        "b": "What ran in your family",
        "t": ", and how early"
      }
    ],
    "score": 75,
    "note": null
  },
  {
    "slug": "longevity",
    "n": "05",
    "name": "Longevity",
    "color": "#D97757",
    "feel": "I'm thinking about the next twenty years",
    "title": [
      "The habits ",
      "that compound."
    ],
    "definition": "Longevity is the everyday habits that shape how strong your next decades feel.",
    "reframe": "There is no single pill or test for this. It is the basics, repeated, and your mouth shows how they are going.",
    "qs": [
      {
        "q": "What's your tobacco or vaping exposure?",
        "why": "Tobacco and vaping are the largest single habit to change."
      },
      {
        "q": "Minutes of moderate exercise per week?",
        "why": "The first hour or so of movement each week does the most."
      },
      {
        "q": "Average hours of sleep per night?",
        "why": "Too little sleep and too much are both worth a closer look."
      },
      {
        "q": "Your weight feels…",
        "why": "Where your weight is heading matters more than any one number."
      },
      {
        "q": "Do you know your current cholesterol numbers?",
        "why": "Not knowing is not a mark against you. It tells us what to check next."
      },
      {
        "q": "Do you have pre-diabetes or diabetes?",
        "why": "Blood sugar and gum disease affect each other."
      },
      {
        "q": "Your blood pressure is…",
        "why": "Blood pressure connects to sleep, stress and diet."
      },
      {
        "q": "Overall, how would you rate your diet?",
        "why": "How you rate your own diet tells us which changes are likely to stick."
      }
    ],
    "tells": "Which habit has the most room to move, read alongside your mouth, so what we find there has context.",
    "close": "The basics compound. So does knowing where you stand.",
    "sources": "Lloyd-Jones DM et al., Circulation 2022",
    "href": "/book/longevity/?dim=longevity",
    "svg": "<svg class=\"diagram-svg\" viewBox=\"0 0 300 134\" width=\"100%\" aria-label=\"Teeth remaining, with three gaps, above a rising trend line\">\n          <g class=\"st\">\n            <path d=\"M44,34 v30 M60,34 v30 M76,34 v30 M92,34 v30\"/>\n            <path d=\"M124,34 v30 M140,34 v30 M156,34 v30\"/>\n            <path d=\"M188,34 v30 M204,34 v30 M236,34 v30 M252,34 v30\"/>\n          </g>\n          <g class=\"st\" stroke-dasharray=\"2 4\" opacity=\".5\"><path d=\"M108,34 v30 M172,34 v30 M220,34 v30\"/></g>\n          <path class=\"st\" d=\"M40,86 h220\" stroke-dasharray=\"4 6\"/>\n          <path class=\"hl\" d=\"M46,116 C96,112 132,102 168,96 C202,90 232,82 254,74\"/>\n          <circle class=\"dot\" cx=\"254\" cy=\"74\" r=\"4\"/>\n        </svg>",
    "label": "Teeth remaining, with three gaps, above a rising trend line",
    "look": [
      {
        "b": "Teeth remaining",
        "t": "and what took the ones that are gone"
      },
      {
        "b": "Total inflammatory load",
        "t": "you are carrying"
      },
      {
        "b": "Tobacco, movement, sleep",
        "t": "the three that compound"
      },
      {
        "b": "How the other four are trending",
        "t": ", year over year"
      },
      {
        "b": "What actually changed",
        "t": "since your last read"
      }
    ],
    "score": 64,
    "note": null
  }
]
