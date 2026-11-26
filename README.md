# Heer's-crafty website

Static, enquiry-only catalogue site: HTML5, CSS3, vanilla JS, GSAP + ScrollTrigger, Lenis, Swiper (all from CDN). No build step, no backend.

## Run locally
```bash
cd heer-crafty
python3 -m http.server 8000      # then open http://localhost:8000
```
(Opening files with `file://` also works for browsing, but use a server to test the enquiry form.)

## Structure
- `index, about, products, bedsheets, clothing, candles, home-decor, journal, contact, faq, thank-you, 404 .html`
- `product.html?p=<id>`: one reusable product page (every product has a unique, refresh-safe URL).
- `article.html?a=<id>`: one reusable Journal article page.
- `js/products-data.js`: the single source of product data (47 products, 159 photos).
- `js/journal.js`: the four Journal articles. `js/enquiry-form.js`: FormSubmit configuration.
- `css/`: variables, base, components, pages, animations, responsive. `assets/products/<category>/`: optimised photos.

## 1. Connect the enquiry form (REQUIRED before launch)
1. Open `js/enquiry-form.js` and set `RECEIVING_EMAIL` to the real inbox (currently `YOUR_RECEIVING_EMAIL@example.com`).
   The address is only used in the request URL, it is never printed on the site.
2. Deploy the site, then submit one real test enquiry from the live URL.
3. FormSubmit sends a one-time **activation email** to that inbox the first time. Open it and click **Activate**. Check spam.
4. Submit a second test enquiry and confirm it arrives. Each email includes name, email, phone, city, category, product name, product page URL and message.
5. Until the placeholder is replaced, the form shows an honest "not connected" message and sends nothing. The thank-you page only opens after FormSubmit confirms success.

Notes: FormSubmit's AJAX endpoint is meant for sites served over http(s), not `file://`. For heavier traffic or spam, consider adding a FormSubmit key/captcha (see their docs).

## 2. Replace placeholders
- `https://YOUR-DOMAIN.example` in every page's `<link rel="canonical">`, in `robots.txt` and in `sitemap.xml`. Search-and-replace across the folder.
- Logo: the header/footer load your logo from the supplied export4tradeindia URL and hide it if it fails. For reliability, download it into `assets/logo/` and change `HC.LOGO_URL` in `js/components.js`.

## 3. Deploy
Upload the whole folder to any static host (Netlify, Vercel static, Cloudflare Pages, GitHub Pages, cPanel). `404.html` is picked up automatically on Netlify, Cloudflare Pages and GitHub Pages. Serve over HTTPS.

## Content notes (please review)
- Product **names** come from the existing Heer's-crafty listing. Photos in the supplied galleries had no captions, so photos were grouped by visible pattern/colour into products. Check the grouping, and the names marked below, against your catalogue:
  - Descriptive names written from the photos (not on the old listing): the four tiered dresses, Resin Ocean Wave Tray, Resin Shell Dish, Resin Side/River/Coffee Tables, Resin Stool, Wall Hanging Pair, Textured Wall Clock, Heart Candle, Seashell Gel Candle, Floral Candle Tray Set, Foliage / Floral Stem / Tree Motif bedsheets.
  - Third-party brand names (Casa Pasa, CLOTHOLOGY, Stephie) and specs such as "240 TC" were left out on purpose.
- Descriptions only state what the photos show. No prices, materials, sizes or availability are claimed. Add verified details in `products-data.js` (`description`) when you have them.
- The two supplied branded promo images (candle holders, resin tray) contain "Shop Now" text, so they were not used. Provide clean crops if you want them in.
- Business address/phone from the old listing are deliberately not shown (brief says no public contact details).

## Accessibility & motion
Keyboard-navigable menus, skip link, visible focus, labelled form with inline validation, `prefers-reduced-motion` disables Lenis and all GSAP motion (content stays visible). If a CDN script fails, the site still works with native scrolling and no animation.
