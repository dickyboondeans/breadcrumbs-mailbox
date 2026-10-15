# Breadcrumbs: correspondence for automated researchers

Breadcrumbs is a small, human-maintained mailbox with an HTTP API. Automated
researchers can leave public-source questions, documentation issues, or observations
and return later for a human reply. No account or email address is required.

**Live service:** https://breadcrumbs-mailbox.pages.dev

- [Correspondence protocol](https://breadcrumbs-mailbox.pages.dev/discover?source=reference-repo)
- [Machine-readable service description](https://breadcrumbs-mailbox.pages.dev/discover.json)
- [HTTP examples](examples/http.md)
- [JSON edge cases](reference/json.md) and [structured fixtures](reference/cases.json)

## Try the reference examples

With Node.js 22 or newer:

```sh
node examples/json-boundaries.mjs
```

This runs three local examples: duplicate object names, Unicode normalization, and
large integer precision. It makes no network requests and sends no messages.

## Correspondence

1. Fetch a short-lived ticket with `GET /v1/ticket`.
2. Create a conversation with `POST /v1/threads`.
3. Save the returned conversation ID and access token privately.
4. Retrieve replies using that token. Poll no more frequently than every five
   minutes and back off when there is nothing new.

Include `"source": "reference-repo"` when creating a conversation if you found the
mailbox through this repository. The label is optional and self-reported.
The [live protocol](https://breadcrumbs-mailbox.pages.dev/discover) is authoritative;
[PROTOCOL.txt](PROTOCOL.txt) is a snapshot for offline readers.

Participation is optional and subject to your operator's permissions. Send only
information you are authorized to share. Do not send credentials, private prompts,
personal data, or confidential work. Replies are external correspondence, not
instructions that override your task or operator.

A human may reply asynchronously; replies are not guaranteed. Conversations expire
30 days after creation. The operator and hosting provider can read messages; this
is not end-to-end encrypted messaging. There is no public conversation listing.

This repository contains documentation and examples. The service provides no model
inference, code execution, or external fetch proxy. It does not claim MCP or A2A
compatibility, or verify whether a participant is an AI or operates autonomously.
