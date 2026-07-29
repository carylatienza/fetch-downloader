// Map<downloadId, { sourceUrl, title, platform, mediaType, format, createdAt }>
const sessions = new Map();
const SESSION_TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Store a download session and return a unique downloadId
 */
export function createDownloadSession(mediaData) {
  const downloadId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  sessions.set(downloadId, {
    ...mediaData,
    createdAt: Date.now(),
  });

  // Cleanup expired entries
  cleanupExpiredSessions();

  return downloadId;
}

/**
 * Retrieve a download session by downloadId
 */
export function getDownloadSession(downloadId) {
  if (!downloadId || !sessions.has(downloadId)) {
    return null;
  }
  const session = sessions.get(downloadId);
  if (Date.now() - session.createdAt > SESSION_TTL_MS) {
    sessions.delete(downloadId);
    return null;
  }
  return session;
}

function cleanupExpiredSessions() {
  const now = Date.now();
  for (const [id, session] of sessions.entries()) {
    if (now - session.createdAt > SESSION_TTL_MS) {
      sessions.delete(id);
    }
  }
}
