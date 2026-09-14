# neala.co

Static landing page for Neala (menopause coaching app). Plain HTML, no build step.

- Hosted on GitHub Pages from `main` (custom domain in `CNAME`).
- Email capture posts to the `waitlist` table on the Neala Supabase project via PostgREST with the publishable anon key (insert-only RLS, see `supabase/migrations/0018_waitlist.sql` in the app repo). A duplicate email returns 409 from the unique constraint, which the page treats as success (no SELECT grant needed for an upsert).
- To read sign-ups: Supabase dashboard → Table editor → `waitlist`.
