## ADDED Requirements

### Requirement: Download requests shall stream direct media CDN URLs statelessly
The `/api/download` route SHALL accept direct media URLs (`imageUrl` or `mediaUrl`) and stream the media directly to the client with `Content-Disposition` attachment headers without relying on server RAM sessions.

#### Scenario: User downloads a photo or video
- **WHEN** the user clicks "Download Now" or "Download Photo" in `PreviewCard`
- **THEN** `/api/download` fetches the direct media CDN stream and proxies it with attachment headers
- **AND** the browser triggers a file download cleanly on Vercel and local environments
