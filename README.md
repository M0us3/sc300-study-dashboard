# SC-300 Study Command Center

Responsive React / Vite dashboard hosted with GitHub Pages. User accounts and per-user progress are in Supabase.

- Website: https://m0us3.github.io/sc300-study-dashboard/
- Supabase project: abqvwxgosyjyqustynjh
- Learning: Microsoft Learn, official GitHub labs, John Savill, Microsoft Learn shows / Channel 9, John Christopher Udemy.
- Completion is manually checked; the dashboard does not import progress from outside providers.
- The database migration was already applied to the linked Supabase project. It is protected with row-level security.

## Publish

In repository **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**. Commit/push to main to trigger the provided deployment workflow.

In Supabase **Authentication → URL Configuration**:
- Site URL: https://m0us3.github.io/sc300-study-dashboard/
- Redirect URLs: add https://m0us3.github.io/sc300-study-dashboard/ and http://localhost:5173/

Use the same email sign-in on phone and computer to sync progress. Supabase may pause free projects after inactivity.

## Local development

Requires Node.js 22+. Run:

```bash
cp .env.example .env.local
npm install
npm run dev
```

Never use a service_role key in frontend. The included `sb_publishable_` key is safe for browser usage with RLS. Exam lab resources may require separate licensing or lab tenants. This starter is not a complete SC-300 curriculum.
