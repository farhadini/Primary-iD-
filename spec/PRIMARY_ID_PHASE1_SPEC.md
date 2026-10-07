# Primary iD · Phase 1 spec (v1.0, 2026-10-01)

From any link on myprimaryid.com to a first visit on the schedule and a completed, validated Primary iD. Phase 1 runs without Subscribili online booking: the call center confirms and books every new patient visit.

**The rule.** This is the spec. The site, the GoHighLevel setup and the call are built to it, tested against it and audited against it. When the flow needs to change, this file changes first and the build follows.

**What it replaces.** For phase 1 this replaces steps 2 to 5 of the Workflow Blueprint (the door, the Primary iD, the booking, the first call). The rest of the Blueprint stands.

Source: the `phase1` section of `primary-id-workflow-blueprint.json` (the Customer Journey OS data file). This file is generated from it. Do not edit by hand.

## Decided

- Every Book link opens the Pathfinder for that visit. One flow, with questions that change by door.
- The Pathfinder is the minimum we need to call someone, and it is stage one of the Primary iD. Nothing in it is asked twice.
- The visit is requested at the end of the Pathfinder, about two minutes in. The patient is then asked to keep going and finish the Primary iD in the same sitting.
- A request triggers the call center. Cesar makes a courtesy onboarding call, confirms the visit and books it in Open Dental.
- Every patient has a completed Primary iD before they arrive, and the Primary team validates it at the visit.
- Subscribili online booking is phase 2. It replaces the manual booking step once the visit types and rules have been proven by hand.
- Agents build, test and audit against this spec. Each check below has an ID so a build, a test run or an audit can report against it.

## What moves

Two things move, and they move separately. A patient can be booked with an unfinished Primary iD, or have a finished one and no visit yet. The card in GoHighLevel tracks the visit. A status on the card tracks the Primary iD.

**The visit**

- **Requested**: The request was submitted. A call is owed. (Stage 1 of 6, renamed 'Visit requested' (today: 'New, assessment started'))
- **Contacted**: Cesar reached them, or logged his tries with an outcome code. (Stage 3, 'Contacted')
- **Booked**: The visit is on the schedule in Open Dental and the card carries the Open Dental patient number. (Stage 4, 'Appointment booked')
- **Seen**: They came to the visit. (Stage 5, 'Seen')

**The Primary iD**

- **Started**: They opened the flow. No contact details yet.
- **Pathfinder**: The request went in with the Pathfinder answers. Trust level: Patient said.
- **Complete**: All chapters answered. Trust level: Patient said.
- **Reviewed**: Cesar confirmed the basics with them on the call. Trust level: Checked by the team.
- **Validated**: Dr. Gabi read it against what he saw and confirmed or corrected it with the patient. Trust level: Confirmed by Dr. Gabi.

The six stage IDs stay as they are, and cards still only move forward. Stage 2, 'Assessment complete', is renamed 'Requested · iD complete': the request is in, the Primary iD is finished, and the call is still owed.

## Touchpoints

### P1-01 · Every link (Request)

*Where the flow starts.* Today: **Partly working**. The doors pass ?door= into the flow. Several links still go somewhere else: see the link map.

**Goal.** Every link that invites someone to book or begin lands in the same flow and carries where they came from.

**The patient.** Taps Book, Schedule, Begin or a door card anywhere on the site, in an ad or on the Google profile.

**The system.** Creates the Primary iD reference and holds the door, page and campaign in the session. Nothing goes to GoHighLevel until the request is submitted.

| Captured | Required | Lands in | Read by |
|---|---|---|---|
| Door | Always | GoHighLevel contact | Call Card |
| Page and button they came from | Always | GoHighLevel contact | Reports |
| Campaign tags (source, medium, campaign) | When present | GoHighLevel contact | Reports |
| Primary iD reference | Created here | Every later record | The join |

**After this step.** Primary iD: Started

**Checks**

- `L1` Every booking link resolves to the Primary iD flow with a door, or to the door chooser.
- `L2` No booking link ends in an email address, a file, or a page with no next step.
- `L3` Door, page and campaign reach the GoHighLevel contact on every request.
- `L4` There is one Pathfinder. No page runs its own quiz whose answers the flow never receives.

### P1-02 · The welcome (Request)

*The guide's promise.* Today: **Partly working**. The welcome screen is live. It does not yet state the two steps or the time.

**Goal.** Before the first question they know what this is, how long it takes and what they get.

**The patient.** One screen. A headline set by the door, and two plain promises: two minutes to request the visit, about six more to build the Primary iD Dr. Gabi reads before he meets them.

**The guide.** States the time honestly. Says a person will call. Says this is a conversation about them, and that nothing here is a diagnosis.

**The system.** Sets the headline and the question track from the door.

**After this step.** Primary iD: Started

**Checks**

- `W1` The time stated matches the measured median for each step.
- `W2` One italic phrase on the screen, no exclamation marks, no promise about a score.

### P1-03 · New or returning, and why (Request)

*Two taps.* Today: **Partly working**. The reason question is live. New or returning is not asked online.

**Goal.** We know whether they are new to Primary and what brings them in.

**The patient.** Chooses new or returning. On a door page the reason is already set; on the general door they pick it.

**The guide.** Opens with them, not with our availability.

**The system.** A returning patient takes a short path: name, mobile and what they need. Their request is tagged existing, kept off the new patient pipeline and sent to Silvia or recare.

| Captured | Required | Lands in | Read by |
|---|---|---|---|
| New, or been to Primary before | Required | GoHighLevel contact (new field) | Call Card |
| Reason: something hurts, something to fix, a blind spot, get ahead of it, curious | Required | GoHighLevel tag (live) | Call Card |

**After this step.** Primary iD: Started

**Checks**

- `R1` A returning patient never lands on the new patient pipeline or in a marketing sequence.
- `R2` The preset reason matches the door.

### P1-04 · The Pathfinder (Request)

*The few questions for this visit.* Today: **Partly working**. Live for implants and built for aligners. The other doors have no Pathfinder questions yet: the tracks below are proposed.

**Goal.** The answers that tell Cesar who he is calling and which conversation it is.

**The patient.** Up to three questions chosen by the door, then one about pain.

**The guide.** Each question carries one line on why it is asked.

**The system.** Pain marks the request urgent: it is called first, and the patient is not pushed to keep going.

| Captured | Required | Lands in | Read by |
|---|---|---|---|
| Pathfinder answers for the door (see the tracks) | Required | GoHighLevel fields and tags | Call Card |
| In pain now | Required, except on the pain door | GoHighLevel priority tag (live) | Call Card, marked urgent |

**After this step.** Primary iD: Started

**Checks**

- `PF1` No door asks more than three Pathfinder questions.
- `PF2` Pathfinder questions are existing questions asked early, or unscored flags. Nothing new is scored.
- `PF3` Pathfinder answers carry into the full Primary iD and are never asked again.
- `PF4` A request with pain is marked urgent and called before anything else.

### P1-05 · How you pay, and the visit (Request)

*The only fork.* Today: **Partly working**. Insurance is asked near the end today. The contact screen lists 3D CBCT imaging as included, which the Express Visit does not include.

**Goal.** They see the visit they are asking for, what it includes and what it costs, before they give us their number.

**The patient.** Says whether they have dental insurance. Sees the matching first visit: the new patient visit billed to their plan, or the $99 Express Visit with what is and is not included. If they are unsure, the screen says we will confirm it on the call.

**The guide.** No surprises: the visit and the fee are stated in full before the request.

**The system.** Maps the answer to a visit from the booking menu in this file. The no-charge partner visit appears only on a partner link.

| Captured | Required | Lands in | Read by |
|---|---|---|---|
| Insurance: PPO, HMO, Medicare or Medicaid, self-pay, not sure | Required | GoHighLevel contact (live, asked late today) | Call Card |
| Carrier | Optional | GoHighLevel contact | Silvia, to verify |
| Visit to book | Set by the answer | GoHighLevel contact (new field) | Call Card |

**After this step.** Primary iD: Started

**Checks**

- `V1` The visit shown matches the booking menu in this file.
- `V2` Any fee is shown with what it includes and what it does not.
- `V3` No credit, no 'free', no 'starting at', no range.
- `V4` The no-charge visit is reachable only from a named partner link.

### P1-06 · The request (Request)

*Their details, and permission to call.* Today: **Partly working**. The contact screen is live with first name and email required and mobile optional. The card is created. No alert goes out, because all four GoHighLevel workflows are still drafts.

**Goal.** A complete request that reaches the call center in seconds.

**The patient.** Gives first and last name, mobile and email, and the best time to call. Can add one line for us. Chooses whether we may text them.

**The guide.** Says exactly what happens when they tap Request my visit.

**The system.** Creates or updates the contact, puts a card in 'Visit requested', fills the Call Card, alerts Cesar and starts the clock on the first call. A second request from the same mobile or email updates the same contact and card.

| Captured | Required | Lands in | Read by |
|---|---|---|---|
| First and last name | Required | GoHighLevel contact (live) | Call Card |
| Mobile | Required (optional today) | GoHighLevel contact (live) | Call Card |
| Email | Required | GoHighLevel contact (live) | For the return link |
| Best time to call, preferred days | Time required | GoHighLevel contact (new fields) | Call Card |
| Anything we should know before we call | Optional, 200 characters | GoHighLevel contact (new field) | Call Card |
| Texting consent: wording, version, time, page | Their choice. Box starts unticked | GoHighLevel contact (live) | Whoever texts |

**After this step.** Visit: Requested · Primary iD: Pathfinder

**Checks**

- `G1` Mobile is required and checked for a valid number.
- `G2` The texting box starts unticked, and the request goes through either way.
- `G3` The contact and card exist within ten seconds of the request.
- `G4` The alert reaches Cesar. Proven with the test patient before any change ships.
- `G5` A repeat request reuses the same contact and card.
- `G6` If GoHighLevel is unreachable, the request is held and retried, and the patient still sees the confirmation.

### P1-07 · The bridge (Build)

*Confirmed, and keep going.* Today: **Not built**. Today the request is the last screen of the flow and it ends on 'We'll reach out shortly'.

**Goal.** The request is acknowledged in one breath, and the patient keeps going while they are here.

**The patient.** Sees that the request is in, who will call, from which number and when. On the same screen, the invitation to finish their Primary iD now, with the progress they have already made. A second option sends a link to finish later.

**The guide.** Says what Dr. Gabi does with it, that it is theirs, and that it takes about six minutes.

**The system.** Shows a call window that is true for the time of day. With pain, it says we are calling first and does not push the rest.

| Captured | Required | Lands in | Read by |
|---|---|---|---|
| Kept going, or chose later | Recorded | Analytics | Reports |

**After this step.** Visit: Requested · Primary iD: Pathfinder

**Checks**

- `B1` The confirmation names the caller, the number and a window that is true for that hour and day.
- `B2` The main button continues the Primary iD.
- `B3` Progress shows the work already done.
- `B4` 'Finish later' sends a link that returns them to the same question.

### P1-08 · The Primary iD (Build)

*Five dimensions and their history.* Today: **Live**. All of this is live. The order is different: today the contact screen comes sixth, and insurance and details come at the end.

**Goal.** A complete Primary iD in one sitting, built so it feels like something they are making, not a form.

**The patient.** What matters to them and why now. The five dimensions, eight questions each. Existing dental work and their last exam. Safety items. Records they already have. Date of birth and address. Last, in their own words, what brings them to Primary.

**The guide.** All four principles apply here. See the guide.

**The system.** Saves every answer as it is given and updates the Primary iD status on the card. On the last answer the status becomes Complete. If nobody has called yet, the card moves to 'Requested · iD complete'.

| Captured | Required | Lands in | Read by |
|---|---|---|---|
| Goals and why now | Asked | GoHighLevel fields (live) |  |
| The 40 scored answers | Asked, any can be skipped | GoHighLevel fields (live) | Dr. Gabi, at the visit |
| Dental history and existing work | Asked | GoHighLevel fields (live) | Leo, Dr. Gabi |
| Safety items: medications and conditions | Asked | GoHighLevel fields (live) | Leo, before anything clinical |
| Records they already have | Asked | GoHighLevel fields (live) | Silvia, Leo |
| Date of birth, address, legal sex | Asked | GoHighLevel contact (live) | Cesar, to create the chart |
| In their own words | Asked | GoHighLevel field (live) | Call Card, Dr. Gabi |

**After this step.** Visit: Requested · Primary iD: Complete

**Checks**

- `I1` Every answer is saved as given. Someone who leaves halfway has their answers so far on the record.
- `I2` Nothing from the request is asked again.
- `I3` Each chapter opens with one line on why it matters, in patient language. No instrument names.
- `I4` Any question can be skipped, and skips are counted.
- `I5` Median time to finish on a phone is eight minutes or less from the first screen.
- `I6` Safety items are asked as a way to keep them safe, and are never scored.

### P1-09 · Their Primary iD (Build)

*What they see when it is done.* Today: **Partly working**. The results screen is live. Every completed score so far reads 'Strong', and once the patient leaves this screen they never see their Primary iD again.

**Goal.** They see what they built, know it is theirs, and know what happens next.

**The patient.** Their five dimensions and their clearest lever. What Dr. Gabi will look at first. Who they will meet. Where their request stands. A link that brings them back to it.

**The guide.** It is theirs. The team confirms it with them at the visit. It is a starting point, not a verdict.

**The system.** Scores the answers. Shows both disclaimers wherever a score appears.

| Captured | Required | Lands in | Read by |
|---|---|---|---|
| Dimension reads and composite | Computed | GoHighLevel fields (live) | Dr. Gabi only. Never the call |

**After this step.** Visit: Requested · Primary iD: Complete

**Checks**

- `S1` Wherever a score appears, both disclaimers appear: not a diagnosis, not a measure of biological age.
- `S2` Until Dr. Gabi rules on the bands, the dimension reads and the lever lead. The composite tier does not.
- `S3` There is no second Book button. The screen shows where the request stands.
- `S4` The return link opens their Primary iD, on the same device at minimum.

### P1-10 · The Call Card (Call)

*What the call center sees.* Today: **Not built**. Today Cesar would open a contact with 36 raw answer fields and tags, with nothing telling him what to say or book.

**Goal.** Cesar knows who he is calling and what to book before he dials.

**The system.** One view inside GoHighLevel, filled from the request and updated as the Primary iD is finished.

**The team.** Cesar opens it before every first call.

| Captured | Required | Lands in | Read by |
|---|---|---|---|
| Name, mobile, best time | Shown | From the request |  |
| Door, new or returning, Pathfinder answers | Shown | From the request |  |
| How they pay, and the visit to book | Shown | From the request |  |
| Urgent, if in pain | Shown first | From the request |  |
| Their note, and their own words if given | Shown | From the request and the Primary iD |  |
| Primary iD status: how far, and what is missing | Shown | From the flow |  |
| Score, tier, weakest dimension | Never shown |  |  |

**After this step.** Visit: Requested

**Checks**

- `C1` Everything needed for the call is on one screen.
- `C2` No score, tier or weakest dimension appears on it.
- `C3` Missing basics are listed so they can be filled in on the call.

### P1-11 · The onboarding call (Call)

*A courtesy call that confirms the visit.* Today: **Partly working**. Cesar is on the phones. Nothing alerts him and there is no Call Card. On 26 September, 43 people had finished a Primary iD and none had been called.

**Goal.** The patient feels expected. The call ends with a visit on the schedule and the basics confirmed.

**The patient.** Gets a call from someone who already knows why they got in touch.

**The system.** Mango records the call.

**The team.** Cesar calls within five minutes during office hours, or in the window the patient was promised. Three tries over two days. He opens with their words, confirms the visit and how they pay, says what the visit includes and costs, and names who they will meet. If the Primary iD is unfinished he fills in the basics with them or sends the link. Almarie reviews the call.

| Captured | Required | Lands in | Read by |
|---|---|---|---|
| Time of first call | Recorded | The card | Reports |
| Outcome code | Required on every call | The card | Almarie |
| Basics confirmed, and anything corrected | Recorded | The card | The building |
| Insurance details | Collected | Open Dental | Silvia, to verify |

**After this step.** Visit: Contacted · Primary iD: Reviewed

**Checks**

- `O1` First call within five minutes during office hours: the median, and the share inside five minutes.
- `O2` Every request has an outcome code within two business days.
- `O3` No price is said other than the $99 Express Visit and the $499 membership.
- `O4` The names are said before the call ends.

### P1-12 · Booked (Call)

*On the schedule in Open Dental.* Today: **Partly working**. Visits are booked by hand in Open Dental. Nothing is written back to the lead: 47 of 514 leads were ever matched to a seen patient.

**Goal.** The right visit is on the schedule, and the lead and the patient are joined for good.

**The patient.** Hears the date and time on the call, then gets a confirmation with the address, what to bring, who they will meet and the link to finish their Primary iD.

**The system.** Moving the card to 'Appointment booked' marks the contact as a patient, which takes them out of every marketing sequence.

**The team.** Cesar books the visit in Open Dental from the booking menu, finds or creates the patient, then records the patient number and the visit on the card and moves it to 'Appointment booked'. He pastes the Call Card summary into the appointment note.

| Captured | Required | Lands in | Read by |
|---|---|---|---|
| Open Dental patient number | Required to mark as booked | The card (new field) | The join |
| Visit date, time and type | Required | The card (new fields) | Reports |
| Call summary | Pasted | Open Dental appointment note | Silvia, Leo, Dr. Gabi |

**After this step.** Visit: Booked

**Checks**

- `K1` Every booked card carries an Open Dental patient number.
- `K2` The visit is within seven days of the request, or the reason is recorded.
- `K3` From the moment of booking the contact receives no marketing messages.
- `K4` The appointment note carries the call summary.

### P1-13 · Before the visit (Visit)

*The Primary iD gets finished.* Today: **Partly working**. The in-office version on the iPad is live. The reminders are not built.

**Goal.** Nobody arrives with an unfinished Primary iD.

**The patient.** Gets a reminder with their link if anything is left.

**The system.** Two days before the visit, an unfinished Primary iD gets a reminder with the return link.

**The team.** Three days before, Cesar calls anyone whose basics are missing and fills them in. Silvia verifies insurance. On the day, Silvia hands the iPad to anyone still unfinished.

| Captured | Required | Lands in | Read by |
|---|---|---|---|
| Primary iD status | Checked 3 days and 2 days before | The card | Cesar |

**After this step.** Visit: Booked · Primary iD: Complete

**Checks**

- `A1` The share of first visits that arrive with a complete Primary iD is reported weekly.
- `A2` A Primary iD finished in the office is tagged in-clinic and kept off the marketing pipeline.

### P1-14 · Validated (Visit)

*At the visit, by the Primary team.* Today: **Not built**. Nothing records the confirmation today, so every Primary iD stays 'patient said'.

**Goal.** The Primary iD stops being only what the patient said.

**The patient.** Hears Dr. Gabi go through what they told us and confirm or correct it with them.

**The team.** Leo confirms the safety items at records. Dr. Gabi reads the Primary iD against what he sees and confirms or corrects it out loud. Leo records the date and who validated it. A correction is kept beside what the patient said, never written over it.

| Captured | Required | Lands in | Read by |
|---|---|---|---|
| Validated on, validated by | Required after every first visit | The card (new fields) | Reports |
| What was corrected | Recorded | Open Dental chart note | Dr. Gabi, Mila |

**After this step.** Visit: Seen · Primary iD: Validated

**Checks**

- `X1` Every seen patient has a validated date within one day of the visit.
- `X2` Corrections are recorded next to the original answer.

## Pathfinder tracks

Each door asks at most three questions before the request. A track only reorders or reuses what is already in the question bank, or adds an unscored flag. The scored 40 never change, so every Primary iD stays comparable.

| Door | Reason, preset | Questions before the request | State | Note |
|---|---|---|---|---|
| Implants and failing teeth (`implants`) | Something to fix | What is going on (missing, failing, old work, dentures); What fixing it would mean; Where they are with it | Live | The live restorative track. |
| Implants, asked on the implant page (`implants`) | Something to fix | What is going on; Where they are with it; How they are thinking of paying | Built, not set up | The consult card on /dental-implant/. The first two are the live track's own questions. The third is a new unscored flag (`pay`). Sent to the same record as the flow. |
| Implants, paying for it (`implants`, track `financing`) | Something to fix | Where they are with it; Whether they have applied for financing before; What would help most | Built, not set up | Opens from the cost section of /dental-implant/. The first is an existing question. The other two are new unscored flags (`fin_applied`, `fin_help`). Never asks for a Social Security number, a date of birth or income. |
| Aligners (`orthofx`) | Something to fix | What they want to change; How much of the day they could wear aligners; Braces or aligners before | Built, not set up | In the question bank since August. Confirm it is live on the door. |
| Cosmetic (`cosmetic`) | Something to fix | What they would change about their smile; How confident they feel about their smile; Where they are with it | Proposed | The second question is an existing scored question, asked early. |
| Preventive (`preventive`) | Get ahead of it | Last professional cleaning; Last full dental exam; How dental visits feel for them | Proposed | All three are existing questions, asked early. |
| Airway and sleep (`airway`) | Get ahead of it | Loud snoring; Tired during the day; Anyone seen them stop breathing in their sleep | Proposed | Existing questions, asked early. Context only: nothing here says dental treatment treats a sleep disorder. |
| Longevity (`longevity`) | A blind spot | Most recent full lab panel; Health platforms they already use; What they want from the next ten years | Proposed | The first two are existing questions. The third is the existing goals question. |
| Second opinion (`second_opinion`) | Something to fix | What they were told they need; Where they are with it; Whether they have the plan or x-rays to share | Proposed | The first and third are new unscored flags. |
| Something hurts (`pain`) | Something hurts | What is going on; How long it has been | Proposed | Two unscored flags, then straight to the request. Called first. The rest of the Primary iD waits. |
| No door (header and home page) (`general`) | They choose | The reason they pick sets which track above they get | Partly working | The reason question is live. Routing it to a track is not. |

**The first visit each answer leads to**

| They say | Visit | Length | Includes | Price |
|---|---|---|---|---|
| Insured, PPO plans Primary accepts | New patient visit · with insurance | About 90 minutes (confirm) | Photos, x-rays, CBCT, vitals; 3D scan when needed. Exam with Dr. Gabi and the plan conversation. | Billed to the plan |
| Self-pay | Express Visit | 40 minutes | Photos on screen, perio screening, x-rays only if needed. Dr. Gabi 15 minutes, plan conversation 10 minutes. No scan, no cleaning, no full plan. | $99 |
| Named partner referrals only | Partner Express Visit | 40 minutes | Same as the Express Visit. | No charge |

## The guide

The guide is the voice that walks a patient through the flow. Its job is to make finishing in one sitting the natural thing to do. Four principles, each with rules a build can be checked against.

### Enable: Take the effort out.

- One question on a screen, answered with one tap wherever possible.
- Every answer is saved as it is given. Nothing is lost by leaving.
- A link brings them back to the same question.
- Any question can be skipped.
- Works one-handed on a phone. No account, no password.

- `E1` Leaving and returning by the link restores the same question.
- `E2` No screen needs typing except names, contact details, date of birth, address and their own words.

### Inspire: Say why it is worth their time.

- Each chapter opens with one line on why it matters, from the question bank's own copy.
- The patient is told Dr. Gabi reads this before he meets them.
- Plain words for clinical ideas. Never spa language, never hype.

- `N1` Every chapter opener is present and in patient language.
- `N2` No exclamation marks and no emoji anywhere in the flow.

### Engage: Let them see it take shape.

- Progress is shown by chapter, and it starts above zero after the request.
- Their Primary iD builds on screen as they answer.
- A short reaction closes each chapter, in the language of what they can do, not what is wrong.

- `Y1` Progress never moves backwards and reaches the end on the last answer.
- `Y2` No reaction names a condition, a risk category or an instrument.

### Empower: Make it theirs.

- They can see their Primary iD and come back to it.
- The team confirms it with them at the visit instead of asking it all again.
- It is a starting point: directional, not a diagnosis, not a measure of biological age.
- Finishing is invited, never required. Care never depends on it.

- `M1` The return link opens their Primary iD.
- `M2` Both disclaimers appear wherever a score appears.

## Data map

Where each piece of information is captured and where it goes. In phase 1 everything lands in GoHighLevel first. The call puts what the building needs into Open Dental by hand. Subscribili receives nothing until phase 2.

| Information | Captured at | GoHighLevel | On the Call Card | Open Dental, phase 1 | Phase 2 |
|---|---|---|---|---|---|
| Door, page, campaign | P1-01 | Contact fields (live) | Source line | In the appointment note | Carried on the booking link |
| Primary iD reference | P1-01 | Contact field |  | In the appointment note | The key Subscribili sends back |
| New or returning | P1-03 | New field | Yes |  | Asked by Subscribili |
| Reason and Pathfinder answers | P1-04 | Fields and tags (partly live) | Yes | In the appointment note |  |
| In pain now | P1-04 | Priority tag (live) | Marked urgent |  |  |
| Insurance type and carrier | P1-05 | Contact fields (live) | Yes | Entered on the call, verified by Silvia | Collected at booking |
| Visit to book | P1-05 | New field | Yes | The appointment type | The booking menu |
| Name, mobile, email | P1-06 | Contact (live) | Yes | The patient record | Filled in for them |
| Best time, days, their note | P1-06 | New fields | Yes |  |  |
| Texting consent | P1-06 | Fields and tag (live) | Yes |  | Subscribili consent |
| The 40 answers, goals, why now | P1-08 | Fields (live) | Status only | Not sent in phase 1 |  |
| Dental history and safety items | P1-08 | Fields (live) | 'Safety items to review' | One line in the appointment note | Medical alerts |
| Date of birth, address, legal sex | P1-08 | Contact (live) | Date of birth | The patient record | Filled in for them |
| In their own words | P1-08 | Field (live) | Yes | In the appointment note |  |
| Score, tier, dimension reads | P1-09 | Fields (live) | Never |  |  |
| Primary iD status and progress | The flow | New field | Yes |  | Shown as done in Subscribili |
| First call time, outcome code | P1-11 | The card (new fields) |  |  |  |
| Open Dental patient number, visit date and type | P1-12 | The card (new fields) |  | Where it comes from | Sent back automatically |
| Validated on, validated by | P1-14 | The card (new fields) |  | Chart note |  |

The exact GoHighLevel field keys are in the site's lead route. The first build task is to list them here so the 'live' column is exact.

## Link map

What the site's links did on 30 September, checked by hand on the live site, and where each should go. This is a sample. The full list comes from the code and replaces this table.

| Where | Today | Should go to | State |
|---|---|---|---|
| Home · door cards | Each opens its door under /book/ | No change | Live |
| Home · five dimension links | Open the flow with a door and a dimension | No change | Live |
| Header and footer · Book | Opens /book/ | The general door: the reason they pick sets the track | Partly working |
| New patient page · Begin your assessment | Opens /diagnostics/, a different page | The preventive door | Not built |
| Implant page · Book a free virtual consult | The Pathfinder's own questions asked on the page, sent to the same record | The same, with the answers carried into the flow so nothing is asked twice (PF3) | Partly working |
| Implant page · Send us your treatment plan | An email address | The second opinion door | Not built |
| Primary iD Plus page · three buttons | All open /book/, including 'Download Sample Protocol' | The longevity door; remove or fix the download button | Not built |
| /membership/ | Redirects to an address that does not load | The membership page | Not built |
| Results screen · Book my first visit | Ends on 'We'll reach out shortly' | Removed. The request happens at P1-06 and this screen shows its status | Not built |
| Header phone number | The same number as the Google profile, so calls cannot be told apart | Cesar asks how they heard of us and logs it, until tracked numbers exist | Partly working |

## The numbers

Six numbers, reported weekly at the Friday all-hands. Targets are set there, not here.

- **Request rate**: Visits requested, out of everyone who starts the Pathfinder. Owner: Farhad. Today: Not measured.
- **Finished in one sitting**: Completed the Primary iD in the same session, out of everyone who requested a visit. Owner: Farhad. Today: Not measured.
- **Minutes to first call**: From the request to Cesar's first call, during office hours. Owner: Cesar · Almarie. Today: 43 finished, none called (26 Sep).
- **Booked on the first call**: Requests that end the first call with a visit on the schedule. Owner: Cesar · Almarie. Today: Not measured.
- **Complete on arrival**: First visits that arrive with a complete Primary iD. Owner: Cesar · Silvia. Today: Not measured.
- **Matched**: Booked cards that carry an Open Dental patient number. Owner: Cesar. Today: 47 of 514 leads ever matched.

## Agents

Three jobs, each working from this spec. The check IDs are how they report.

### Build: Claude Code, in the website repository

- Reads this spec before changing the flow.
- First task: list every link and every field from the code into the link map and the data map, so 'today' is exact.
- Names the touchpoint and the checks each change satisfies.
- Ships to a preview first. Nothing merges with a failing check.

### Test: A test run on every preview

- Takes the test patient, Alex Rivera, through every door at phone width.
- Reports pass or fail for each check ID.
- Uses a tagged test contact so nothing counts as a lead. Preview builds must not write to the live pipeline.

### Audit: A weekly run against the live site and GoHighLevel

- Re-checks the link map and the copy rules on the live site.
- Lists requests with no call inside the standard, and booked cards with no patient number.
- Reports the six numbers and anything that drifted from this spec to the Friday all-hands.

**Rules every build and every audit enforces**

- Dr. Gabi is a prosthodontist. Never 'oral physician' or 'orthodontist'.
- No claim that dental treatment treats a sleep disorder, reduces inflammation or extends life.
- The score is directional: not a diagnosis, not a measure of biological age. Both, wherever a score appears.
- One published price. Never 'free', 'up to', 'as low as' or 'starting at'. $1,500 never appears.
- Nothing about a credit between the $99 visit and the membership.
- No exclamation marks, no emoji.
- Test with Alex Rivera only. No real patient names in any screen, log or report.

## Open decisions

- Where the completed Primary iD lives. Today it is fields on a GoHighLevel contact, which cannot power a return link on another device or the patient's own page. Owner: Farhad. Holds up: P1-09.
- Whether the health answers stay in GoHighLevel, or only what the call needs. Owner: Farhad. Holds up: The data map.
- The score bands. Every completed score reads 'Strong', so the composite cannot lead the results screen yet. Owner: Dr. Gabi. Holds up: P1-09.
- The proposed Pathfinder tracks for six doors, including the new unscored questions for second opinion and pain. Owner: Dr. Gabi · Farhad. Holds up: P1-04.
- Who sends the confirmation, the return link and the reminder. Email can go now; texting needs an approved sender. Owner: Farhad · Mila. Holds up: P1-07, P1-12, P1-13.
- The call window promised outside office hours, and which number shows when Cesar calls. Owner: Almarie · Farhad. Holds up: P1-07.
- Whether Cesar's Open Dental access lets him create a patient and an appointment. Owner: Silvia. Holds up: P1-12.
- What the flow shows for HMO, Medicare and plans Primary does not take. Owner: Silvia. Holds up: P1-05.
- Whether the $99 is a first visit or a membership tier. Owner: Farhad · Sudha · counsel. Holds up: P1-05.
- Requiring both mobile and email at the request. More required fields can cost requests, so measure it. Owner: Farhad. Holds up: P1-06.

## Phase 2

What changes when Subscribili online booking is ready. Everything before the request stays the same.

- After the request, patients who want to can pick a time themselves. The call becomes a welcome call instead of the booking.
- The booking carries the Primary iD reference in, and Subscribili sends the Open Dental patient number back, so the join no longer depends on a person.
- Confirmations, reminders and the return link move to Subscribili, so the patient hears from one sender.
- The summary reaches the Open Dental appointment automatically.
