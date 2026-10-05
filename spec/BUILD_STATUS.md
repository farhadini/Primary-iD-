# Primary iD · Phase 1 build status

Updated by Claude Code after every change. Checked against `PRIMARY_ID_PHASE1_SPEC.md`.
Last update: 4 Oct 2026.

## Waiting on Farhad

- [ ] Merge PR #10 (membership page, links) with **Squash and merge**
- [ ] Merge PR #11 (the request flow) with **Squash and merge**, after #10
- [ ] GoHighLevel: create 7 text fields: `new_or_returning`, `visit_to_book`, `best_time_to_call`, `patient_note`, `primary_id_status`, `dental_history`, `partner_referral`
- [ ] GoHighLevel: publish the workflow that alerts Cesar on a new request, and send Claude its ID (G4)
- [ ] GoHighLevel: add "tag is not Test contact" to every marketing workflow
- [ ] The Subscribili join link, for the membership page
- [ ] Decide: what the pain screen says out of hours (is anyone answering the phone?)
- [ ] Decide: the number Cesar calls from (today: (310) 564-8990)
- [ ] Dr. Gabi: Pathfinder questions for cosmetic, preventive, airway, longevity; score bands

## Your requests for Claude

Write anything here, top = most important. Claude reads this list at the start of each session.

-

## Where each touchpoint stands

| Touchpoint | State | Checks passing on preview | Open |
|---|---|---|---|
| P1-01 Every link | PR #10 | L1, L2, L3, L4 | Header Book opens the general door (reason picks the track) |
| P1-02 Welcome | PR #11 | W2 | W1 needs measured times |
| P1-03 New or returning | PR #11 | R1, R2 | — |
| P1-04 Pathfinder | PR #11 | PF1, PF3, PF4 (implants, aligners, second opinion, pain) | Four doors' tracks await Dr. Gabi (PF2) |
| P1-05 Pay and visit | PR #11 | V1, V2, V3, V4 | HMO / Medicare wording (Silvia) |
| P1-06 The request | PR #11 | G1, G2, G5, G6 | G3, G4 need the GHL fields and the alert workflow |
| P1-07 The bridge | PR #11 | B1, B2, B3, B4 (same device) | After-hours window; caller's number |
| P1-08 The Primary iD | PR #11 | I1, I2, E1 | I3 chapter openers, I4 skip any question, I5 timing |
| P1-09 Their Primary iD | PR #10 + #11 | S1, S3, M2; S4 same device | S2 composite still leads (score bands) |
| P1-10 Call Card | Not started | — | Built inside GoHighLevel |
| Membership page | PR #11 | The marketing landing page ("Your smile, the gateway…") at /membership/; its 3 quiz answers carry into the flow | Join button needs the Subscribili link; sample deep-cleaning fee ($350/quadrant) to confirm |

## Next up (Claude)

1. I3 / I4: chapter openers in patient language, and a skip on every question
2. S2: lead the results with the dimensions and the lever, not the composite tier
3. P1-10: the Call Card as a GoHighLevel view (needs GHL access or a screen-share)
4. Patient record ("My Primary iD") once the record decision is made
