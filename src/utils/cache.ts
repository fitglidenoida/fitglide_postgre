interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  timestamp: number;
}

const tokenCache = new Map<string, TokenData>();
const TOKEN_TTL_SECONDS = 24 * 60 * 60; // 24 hours TTL

// Function to clean up expired tokens
function cleanupExpiredTokens() {
  const now = Date.now();
  for (const [athleteId, tokenData] of tokenCache.entries()) {
    if ((now - tokenData.timestamp) / 1000 > TOKEN_TTL_SECONDS) {
      tokenCache.delete(athleteId);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupExpiredTokens, 5 * 60 * 1000);

export { tokenCache };
