## ADDED Requirements

### Requirement: Per-IP extraction rate limiting
The system SHALL limit the number of extraction requests to 10 per 60-second sliding window per client IP address.

#### Scenario: Within rate limit
- **WHEN** a client IP has made fewer than 10 extraction requests in the last 60 seconds
- **THEN** system processes the request normally

#### Scenario: Rate limit exceeded
- **WHEN** a client IP has made 10 or more extraction requests in the last 60 seconds
- **THEN** system returns HTTP 429 with error code `RATE_LIMITED`, a user-friendly message, and a `retryAfter` value in seconds

### Requirement: Concurrent download limiting
The system SHALL limit the number of concurrent active downloads to 3 per client IP address.

#### Scenario: Within concurrent limit
- **WHEN** a client IP has fewer than 3 active downloads
- **THEN** system processes the download request normally

#### Scenario: Concurrent limit exceeded
- **WHEN** a client IP already has 3 active downloads in progress
- **THEN** system returns HTTP 429 with a message to wait until a current download finishes

### Requirement: Rate limit state management
The system SHALL use an in-memory sliding window data structure for rate limiting, keyed by client IP.

#### Scenario: Server restart clears rate limits
- **WHEN** the server restarts
- **THEN** all rate limit state is cleared (acceptable for V1)

#### Scenario: Expired entries cleaned up
- **WHEN** rate limit entries are older than the sliding window period
- **THEN** system removes them from memory during the next cleanup cycle

### Requirement: Client IP detection
The system SHALL determine the client IP from request headers, accounting for reverse proxy headers (X-Forwarded-For).

#### Scenario: Request behind proxy
- **WHEN** a request arrives with an `X-Forwarded-For` header
- **THEN** system uses the first IP in the header chain as the client IP

#### Scenario: Direct request
- **WHEN** a request arrives without proxy headers
- **THEN** system uses the socket remote address as the client IP
