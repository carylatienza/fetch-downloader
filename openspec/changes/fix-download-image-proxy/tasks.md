## 1. API Download Handler Image Proxy Fix

- [x] 1.1 Update `fetch()` call in `src/app/api/download/route.js` to send `User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)` for image downloads
- [x] 1.2 Verify downloaded image file binary headers and OS photo viewer opening end-to-end
