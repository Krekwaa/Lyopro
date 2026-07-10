# LyoPro Consulting Website

Premium multilingual website for a senior engineering and technology consultancy.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The root redirects to `/en`.

## Production

```bash
npm run build
```

The deployable static output is written to `out/`.

## Deploy to AWS

The production site is exported to static files, uploaded to the `lyopro.tech`
S3 bucket, and served through CloudFront.

```powershell
.\scripts\deploy.ps1
```

The script creates a local backup, builds the site, synchronizes S3, uploads
clean-route objects, and invalidates the CloudFront cache.

## Content and routes

- Locales: `/en`, `/ua`
- Pages: services, case studies, about, experts, certifications, insights, contact, privacy and imprint
- Shared structured content lives in `lib/content.ts`
- Page layouts live in `app/[lang]/[[...slug]]/page.tsx`
- The form posts to `app/api/contact/route.ts`

Before deployment, connect the contact endpoint to the chosen CRM or email provider, replace placeholder expert profiles with approved team information, and add jurisdiction-specific legal copy.
