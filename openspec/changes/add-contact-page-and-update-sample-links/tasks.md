## 1. Sample Links & Extractor Updates

- [x] 1.1 Update `src/components/PlatformBadges/PlatformBadges.js` with active, working public sample URLs for Instagram, Facebook, and X.
- [x] 1.2 Enhance `src/lib/extractors/facebook.js` to handle `/share/p/` share URLs and ensure redirect-following works cleanly.
- [x] 1.3 Update `src/lib/validators.js` to restrict URL domain matching (SSRF security protection).

## 2. Contact API Endpoint & Integration

- [x] 2.1 Create API route `src/app/api/contact/route.js` with payload validation, IP rate limiting, and HTTP POST dispatching to `GOOGLE_SCRIPT_URL`.
- [x] 2.2 Add fallback logic in `/api/contact` when `GOOGLE_SCRIPT_URL` environment variable is not defined.

## 3. Contact Page UI & Navigation

- [x] 3.1 Create contact page `src/app/contact/page.js` with responsive glassmorphism design system, form inputs, validation error feedback, and success modal/banner.
- [x] 3.2 Update `src/components/Header/Header.js` and `src/components/Footer/Footer.js` to include the new "Contact" navigation link.

## 4. Verification & Testing

- [x] 4.1 Test sample links for Instagram, Facebook, and X to verify successful media extraction without errors.
- [x] 4.2 Test contact form submission on `/contact` page for both successful POST and validation errors.
