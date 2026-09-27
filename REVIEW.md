# Before this page goes live

Page copy now comes from Dominika's **"Neala Website Copy" doc** (Sep 17, 2026),
used close to verbatim. Layout follows her **"Neala Design Notes"** doc.

The testimonial and founder-quote placeholders are **gone** — those are her real
quotes now. What's left below is mostly a set of claims that need checking
against what the app actually does.

---

## Blockers

### 1. The site advertises supplement guidance; the app has none

The copy doc gives supplements their own feature card, a line in the comparison
table, a step in "your path", an FAQ answer, and a named stack — *"vitamin D3+K2,
omega-3, magnesium glycinate, plus two pattern-specific additions"*, with
*"interaction risks flagged clearly"*.

Grepping the app repo, **"supplement" appears once in the entire codebase**
(`src/data/plan.ts`), and there is no supplement feature in `CLAUDE.md`'s screen
inventory, no supplement data, no interaction checking.

This is the most serious item on the page, for two reasons:

- It advertises a feature a downloader won't find, which is an App Store
  review problem as well as a conversion problem.
- *"Any interaction risks are flagged clearly"* is a **safety claim**. Promising
  interaction screening that doesn't exist is the kind of thing that matters if
  someone relies on it.

Decide one of: ship the feature first, cut supplements from the site, or reword
to a roadmap framing. Affected copy is in the feature grid, step 3, the
comparison table row, the "Will the coach replace my doctor?" answer, and the
HRT/medication FAQ.

### 2. "Proven on hundreds of women" needs substantiation

Section heading in "What women are saying" (the copy doc says *"100s+ women"*).
A claim like this on a health product needs a real number you can evidence —
coaching clients, beta users, or a study. If it's Dominika's coaching practice,
say so explicitly; the current wording implies the app was validated at that scale.

### 3. The App Store link 404s until the listing is public

Every CTA points at `https://apps.apple.com/app/id6780959532`. Per the app's
`CLAUDE.md`, Neala is an **invite-only TestFlight beta** and **Sign in with Apple
is still an open App Store review blocker for public launch**.

Related: the app is called **Luna** everywhere in code (bundle
`com.lunahealth.app`); the listing needs to say Neala before these links go live,
or a visitor who taps through lands on a differently-named app.

Android was dropped from the page entirely — the copy doc doesn't mention it and
the Play build is internal-testing only. Add it back when there's a public listing.

### 4. Testimonial consent

Sarah (54), Laura, Naouel and Salona are real quotes from the copy doc. Confirm
each woman has agreed to appear by name on a public marketing page.

---

## Vocabulary conflict: "pattern" vs "profile"

The website says **pattern** throughout ("your pattern", "the pattern
assessment", "four hormonal patterns"). The app says **profile** — deliberately,
per its `CLAUDE.md`: *"cluster is internal-only; all user-facing copy says 'your
profile'."* Confirmed in `src/data/plan.ts`, which repeatedly says "for your
profile".

So a woman reads "find your pattern", downloads, and the app never uses the word.
Pick one and align both.

Dominika flagged this herself in a comment on the copy doc:

> "here to avoid medical claims may need to be 'unique menopause profile'"

Her other two open comments, both unaddressed:

> "i think we need to mention it's AI but I wouldn't make it too pronounced —
> think old generation may still be reluctant to the idea."

Handled: the page says "your coach" and "a coach with memory" rather than
"AI coach". Only the FAQ and the feature grid hint at it. Confirm that's the
right level.

> "I think would be good if you added a quote that is yours below — for example
> how you saw potential of personalised coaching for athletes using data in this
> particular space." / "Below here you could put a paragraph about you/your story."

**Not written** — that's Kuba's quote and Kuba's story paragraph. There's a `TODO`
comment at the right spot in the "Our story" section.

---

## Claims to check against the shipped app

| Claim on the page | Status |
|---|---|
| "Takes about 6 minutes" (assessment) | App has 18 questions across 6 steps, **plus** allergens and meal config. Time it end to end. |
| "Four hormonal patterns — Wired but Tired, Metabolic Warrior, Crash & Crave, Futureproof" | Matches the app's four clusters exactly. ✅ |
| "Three full-body sessions a week, two for Wired but Tired" | Confirm against `src/data/plan.ts`. |
| "Dumbbells, bands and bodyweight — no gym" | Consistent with the app (`announcements.ts`: "Dumbbells up to 15lb at home, no gym"). ✅ |
| "No calorie counting — plate composition and portion guidance" | Matches; the app ships portion strings. ✅ But macro/kcal tracking is in active development (LUN-16), which may contradict this later. |
| "Your information is encrypted and never sold" | Supabase is EU-hosted. **PostHog is a sub-processor and its DPA is still unsigned** (open item in the app's `CLAUDE.md`). Clear that before publishing a privacy promise. |
| "You control what your coach remembers" | The coach reads check-ins and notes automatically; there is no user-facing control over its memory. Either build it or reword. |
| "Free to download · Core features free forever" | A commercial commitment. Confirm before it's public. |
| "It never suggests the magnesium you're already taking" | Implies the coach knows your supplements. Tied to blocker 1. |

---

## Assets still needed

| Where | What | Aspect |
|---|---|---|
| Hero | Editorial photo, woman 45–65, candid, warm, unretouched | 4:5 portrait |
| Founder section | Photo of Dominika | 1:1 square |
| "Who's behind Neala" | Headshots of Dominika and Kuba | 1:1, shown in a circle |
| `<head>` | Open Graph share image `assets/og-image.jpg` + the `og:image` tag | 1200×630 |

Every photo slot is a dashed `.ph` block labelled with what goes in it, at the
final aspect ratio — dropping in an `<img>` won't move the layout.

Dominika's reference images in the design notes are stock. License before use.

---

## Deliberate departures from the notes

- **Colour.** Design notes tab 1 specifies terracotta/mauve/sage/parchment; tab 2
  asks for the wedding site's blue/cream/orange. Built on tab 1, which matches the
  app's own tokens exactly. The wedding site's *structure and motion* (sticky nav,
  gradual scroll reveals, editorial restraint) carried across; its blues did not.
- **One page, not three.** The copy doc's Homepage / How It Works / About split is
  folded into a single scroll with anchor nav — fewer page loads between the hook
  and the CTA. "Your path through Neala" and "What's in your plan" came across
  from How It Works; the founder story and "Who's behind Neala" from About.
- **Emoji replaced with line icons**, as the design notes ask ("swap the emoji
  placeholders in the copy doc for matching line icons").
- **Custom CTA buttons, not official store badges.** The notes call for App Store
  and Google Play badge art; those have usage rules, and a terracotta button
  converts better than a small grey badge. Swap in the official assets if you'd
  rather have them.
- **"What we believe"** (three cards in the About section of the copy doc) was
  dropped as a near-duplicate of "Built on trust, not guesswork". Say if you want
  it back.
- **Comparison table** uses the copy doc's five rows verbatim, with sage ticks and
  no red — per the app's "never red for a negative state" rule.

---

## Not built

- **"Take a hormonal quiz"** — Dominika's sixth nav item in the design notes, and
  the single strongest conversion lever available. It mirrors the app's real
  pattern assessment and ends on a natural "now get your plan" handoff. Needs quiz
  logic, a results page and storage, so it's a separate build.
- Separate How It Works and About pages, if you later want the SEO surface.
