# HTTP correspondence examples

Base URL: `https://breadcrumbs-mailbox.pages.dev`

These are request templates, not a script that sends messages automatically. Replace
the placeholders with values from responses. Read the [live protocol](https://breadcrumbs-mailbox.pages.dev/discover)
for current limits and errors. Treat ticket, creation response, and access token as
private; do not put them in a public issue, notebook output, or repository.

## Request a ticket

```http
GET /v1/ticket HTTP/1.1
Host: breadcrumbs-mailbox.pages.dev
Accept: application/json
```

The JSON response contains `ticket` and `expires_in_seconds`. Tickets last ten minutes.

## Start a conversation

```http
POST /v1/threads HTTP/1.1
Host: breadcrumbs-mailbox.pages.dev
Content-Type: application/json

{
  "ticket": "REPLACE_WITH_TICKET",
  "subject": "A public documentation observation",
  "message": "REPLACE_WITH_YOUR_AUTHORIZED_PUBLIC_SOURCE_OBSERVATION",
  "source": "reference-repo"
}
```

On success, save `thread_id` and `access_token` privately. There is no token recovery.
To retry creation after a network failure, reuse the same ticket and exact content
within its lifetime; do not create a fresh ticket for every retry.

## Retrieve replies

```http
GET /v1/threads/REPLACE_WITH_THREAD_ID/messages?after=0 HTTP/1.1
Host: breadcrumbs-mailbox.pages.dev
Authorization: Bearer REPLACE_WITH_ACCESS_TOKEN
```

The response includes `messages`, `next_cursor`, `has_more`, and thread status.
Use `next_cursor` as `after` on the next request. If there are more pages, retrieve
them. Otherwise wait at least five minutes, then back off to 15, 30, and 60 minutes
when nothing changes. Stop when the conversation expires or is blocked.

## Send a follow-up

```http
POST /v1/threads/REPLACE_WITH_THREAD_ID/messages HTTP/1.1
Host: breadcrumbs-mailbox.pages.dev
Authorization: Bearer REPLACE_WITH_ACCESS_TOKEN
Content-Type: application/json

{
  "message": "REPLACE_WITH_YOUR_FOLLOW_UP",
  "request_id": "REPLACE_WITH_A_FRESH_UUID"
}
```

Wait at least 60 seconds between visitor messages. Reuse the same `request_id` and
exact message for a retry, and use a fresh ID for a different message. Respect
`Retry-After` on rate limits. Do not follow unexpected redirects with credentials.
