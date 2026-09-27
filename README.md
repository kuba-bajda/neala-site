# neala.co

Landing page for Neala (menopause coaching app). Plain HTML, CSS and JS — no
build step, no dependencies.

```
index.html         all markup and copy
assets/styles.css  design system + layout
assets/main.js     scroll reveal, nav, FAQ accordion, waitlist
assets/favicon.png copied from the app (assets/favicon.png in the luna repo)
REVIEW.md          everything that must be signed off before publishing
```

**Read `REVIEW.md` before publishing.** The page contains placeholder
testimonials and store links that don't resolve yet.

## Running it

Any static server, e.g. `python3 -m http.server 8899`, then
<http://localhost:8899>. Opening `index.html` directly over `file://` works too.

## Design system

Colours and type are the app's own tokens (`src/theme/colors.ts` and the Design
System section of the app's `CLAUDE.md`), so the site and the product match:
warm parchment `#FAF7F2`, muted terracotta `#C4795A`, dusty mauve `#A67F8E`,
sage `#8A9E85`, warm charcoal `#2C2825`. Cormorant Garamond for headings only,
DM Sans for everything else. No pure white, no pure black, 8px spacing grid.

Body text is 17px because the audience is 45–65 — same reasoning as the app.

Icons are one inline SVG sprite at the top of `index.html` (lucide geometry,
1.5px stroke). Add new ones as `<symbol>` there and reference with `<use>`.

## Email capture

The form at the bottom posts to the `waitlist` table on the Neala Supabase
project via PostgREST with the publishable anon key. RLS is insert-only — the
anon role has INSERT but no SELECT, so this is a plain insert rather than an
upsert (an upsert needs SELECT). A duplicate email returns 409 from the unique
constraint, which the page treats as success.

Migration: `supabase/migrations/0018_waitlist.sql` in the app repo.
To read sign-ups: Supabase dashboard → Table editor → `waitlist`.

## Hosting

GitHub Pages from `main`, custom domain in `CNAME`.
