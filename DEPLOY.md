# PanditJiExpress — Cloudflare Pages Deployment Guide

## Quick Deploy (3 Steps)

### Step 1: Login to Cloudflare
```bash
npx wrangler login
```
This opens your browser → log in to your Cloudflare account.

### Step 2: Deploy to Cloudflare Pages
```bash
npm run deploy
```
Or directly:
```bash
npx wrangler pages deploy . --project-name panditjiexpress
```

### Step 3: Connect Custom Domain
1. Go to **Cloudflare Dashboard → Pages → panditjiexpress**
2. Click **Custom Domains → Add Domain**
3. Enter `panditjiexpress.com`
4. Cloudflare auto-configures DNS if your domain is on Cloudflare

---

## Option B: GitHub Auto-Deploy (Recommended for production)

1. Create a GitHub repo (e.g., `github.com/yourusername/panditjiexpress`)
2. Push code:
   ```bash
   git remote add origin https://github.com/YOURUSERNAME/panditjiexpress.git
   git push -u origin main
   ```
3. Go to **Cloudflare Dashboard → Pages → Create a Project → Connect to Git**
4. Select your repo → choose `main` branch
5. Build settings:
   - **Framework preset**: None
   - **Build command**: (leave empty)
   - **Build output directory**: `.` (dot = root)
6. Click **Save and Deploy** ✅

Every `git push` will auto-deploy! 🚀

---

## Environment Config After Deployment

### Custom Domain Setup
| Record | Type | Value |
|--------|------|-------|
| `@` | CNAME | `panditjiexpress.pages.dev` |
| `www` | CNAME | `panditjiexpress.pages.dev` |

> If domain is already on Cloudflare: Pages auto-creates these records.

### Cloudflare Settings to Enable (Dashboard)
| Setting | Value | Reason |
|---------|-------|--------|
| **Always Use HTTPS** | ON | SEO + security |
| **Automatic HTTPS Rewrites** | ON | Mixed content fix |
| **Brotli compression** | ON | 20-30% smaller files |
| **HTTP/2** | ON | Faster parallel loading |
| **HTTP/3 (QUIC)** | ON | Ultra-fast on mobile |
| **Browser Cache TTL** | Respect Existing Headers | Uses our _headers file |
| **Early Hints** | ON | 103 Early Hints for LCP |
| **Rocket Loader** | OFF | We already defer scripts |
| **Minify JS/CSS/HTML** | ON | Smaller payloads |

---

## File Structure Deployed

```
panditjiexpress.com/          → index.html (Homepage)
panditjiexpress.com/services.html
panditjiexpress.com/booking.html
panditjiexpress.com/pandit-shyam-sundar.html
panditjiexpress.com/wedding-pandit-bangalore.html
panditjiexpress.com/griha-pravesh-pooja-bangalore.html
... (all 25 HTML pages)

301 Redirects (via _redirects):
/pandits.html              → /pandit-shyam-sundar.html
/pandit-rahul-shastri.html → /pandit-shyam-sundar.html
/vastu-shanti-puja-bangalore.html → /services.html
```

---

## After Deployment: SEO Next Steps

1. **Google Search Console** → Add property → Submit `https://panditjiexpress.com/sitemap.xml`
2. **Google Business Profile** → Claim/create listing for "Pandit Ji Express"
3. **Rich Results Test** → https://search.google.com/test/rich-results
4. **PageSpeed Insights** → https://pagespeed.web.dev/?url=https://panditjiexpress.com
