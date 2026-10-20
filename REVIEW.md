# Before this page goes live

Page copy now comes from Dominika's **"Neala Website Copy" doc** (Sep 17, 2026),
revised on 2026-10-11 to apply the agreed comment threads between Kuba and
Dominika. Layout follows her **"Neala Design Notes"** doc.

The testimonial and founder-quote placeholders are **gone** — those are her real
quotes now. What's left below is mostly a set of claims that need checking
against what the app actually does.

---

## Blockers

### 1. ~~Supplements~~ — resolved 2026-10-11

All supplement copy is gone (feature card, step 3, FAQ answers, HRT FAQ, the
magnesium line). The comparison table went with it.

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

An Android "Download Neala" button now sits next to the Apple one in the hero
and the closing CTA, but it points at `#` (marked `TODO` in the markup) until the
Play listing is public.

### 4. Testimonial consent

Sarah (54), Laura, Naouel and Salona are real quotes from the copy doc. Confirm
each woman has agreed to appear by name on a public marketing page.

---

## Vocabulary — resolved 2026-10-11

The site now says **menopause profile** to match the app ("profile") and to
avoid the medical-claim feel of "hormonal". "Pattern" survives only where it
means a trend in your logs. Profile names (Wired but Tired, etc.) and the number
of profiles are no longer published.

Kuba's own quote and story paragraph are left out for now, by decision.

---

## Claims to check against the shipped app

| Claim on the page | Status |
|---|---|
| "Takes about 10 minutes" (assessment) | Agreed figure. Time it end to end once to be sure. |
| "Dumbbells, bands and bodyweight — no gym" | Consistent with the app (`announcements.ts`: "Dumbbells up to 15lb at home, no gym"). ✅ |
| "No calorie counting — plate composition and portion guidance" | Matches; the app ships portion strings. ✅ But macro/kcal tracking is in active development (LUN-16), which may contradict this later. |
| "Free to download" | "Core features free forever" removed; confirm the download itself is free. |

---

## Legal pages (/privacy, /terms) — added 2026-10-11

Rewritten from the Notion versions (May/June 2026) against what the app actually
does today. Open items before they replace the Notion links:

- **Registered address + KRS** for Meridian Studios are missing (TODO in `privacy/index.html`).
- **hello@neala.co** is the contact everywhere; it's still marked placeholder in the
  app's `src/lib/links.ts`. Make sure the inbox exists.
- **Slack is disclosed as a processor** because `slack-notify` sends note text and
  food requests. Cleaner fix: stop sending free text to Slack, then drop it here.
- **PostHog DPA** is still unsigned; the policy names PostHog as a processor.
- **"Up to 12 months" analytics retention** — set that in PostHog to make it true.
- **Sign in with Apple** is named on both pages (email/password, Apple, Google). It must ship
  in the app before these pages go public.
- **18+ only**, but the app has no age gate (the age question starts at "Under 35").
- **Subscriptions clause** describes the RevenueCat paywall (7-day trial, auto-renew),
  written as "where offered" since the paywall isn't live yet.
- **The app still links to Notion** (`src/lib/links.ts`, settings, paywall, consent).
  Point it at neala.co/privacy and /terms, and update the consent screen copy
  ("request deletion by contacting us" — deletion is self-serve now).

---

## Assets still needed

| Where | What | Aspect |
|---|---|---|
| Hero | Editorial photo, woman 45–65, candid, warm, unretouched | 4:5 portrait |
| Founder section | Photo of Dominika | 1:1 square |
| "Who's behind Neala" | Headshots of Dominika and Kuba | 1:1, shown in a circle |

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
  not built.
- **Removed by agreement (2026-10-11):** the comparison table (to return later
  against named competitors), "What we won't do", "Built on trust, not
  guesswork", and the FAQs on medical status, data privacy and HRT.

---

## Not built

- **"Take a hormonal quiz"** — Dominika's sixth nav item in the design notes, and
  the single strongest conversion lever available. It mirrors the app's real
  pattern assessment and ends on a natural "now get your plan" handoff. Needs quiz
  logic, a results page and storage, so it's a separate build.
- Separate How It Works and About pages, if you later want the SEO surface.
