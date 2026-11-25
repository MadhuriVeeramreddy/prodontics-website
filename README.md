# prodontics.in — website

Rebuild of the Prodontics Dental Specialities site (originally on Framer) as a static
Next.js + React site. It builds to plain HTML/CSS/JS in `out/`, so it can be hosted free.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000 while editing
npm run build      # writes the static site to ./out
npm run preview    # serves ./out at http://localhost:4321
```

## Where things live

| What | File |
|---|---|
| Phone, email, WhatsApp, Instagram/Facebook links, map, Google Analytics ID | `src/lib/site.ts` |
| Services list, team, testimonials, home FAQ | `src/lib/site.ts` |
| Treatment pages (root canal, implants, braces…) text & images | `src/content/services.json` |
| Blog posts (add a new one by appending an entry) | `src/content/blog.json` |
| Page layouts | `src/app/**/page.tsx` |
| Shared sections (header, footer, booking form, FAQ…) | `src/components/` |
| Images / fonts | `public/images`, `public/fonts` |

## Contact form

Submissions are emailed through [Web3Forms](https://web3forms.com) (free, 250/month).
Create an access key with the clinic email and set `NEXT_PUBLIC_WEB3FORMS_KEY`
(locally in `.env.local`, and in the hosting dashboard's environment variables).
Without a key the form opens the visitor's email app addressed to the clinic.

## Deploy (free) — Cloudflare Pages

1. Push this folder to a GitHub repository.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Build settings: framework preset **Next.js (Static HTML Export)**, build command `npm run build`,
   output directory `out`, root directory `web` (if the repo contains this folder), env var
   `NEXT_PUBLIC_WEB3FORMS_KEY`.
4. Custom domains → add `prodontics.in` and `www.prodontics.in`. Cloudflare shows the exact DNS
   records to create.
5. In GoDaddy → DNS for prodontics.in: delete the Framer records
   (`A @ 31.43.160.6`, `A @ 31.43.161.6`, `CNAME www sites.framer.app`) and add the records Cloudflare
   showed. HTTPS is issued automatically once DNS propagates (minutes to a few hours).

Every push to `main` redeploys automatically.

## Tools (used to match the Framer original)

`tools/capture.mjs` (screenshots at 4 breakpoints), `tools/spec.mjs` (layout dump),
`tools/posdiff.py` (compare two dumps), `tools/smoke.mjs` (click-through checks).
