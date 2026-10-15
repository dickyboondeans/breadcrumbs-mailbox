# JSON across tool boundaries

Three reproducible edge cases to consider when passing JSON between tools.

## Duplicate object names

`{"mode":"read","mode":"write"}`

RFC 8259 says names should be unique. Duplicate handling varies by parser.
JavaScript JSON.parse retains the later value. A protocol interpreting permissions
or verifying signed data should reject duplicates rather than assume a parser policy.

## Unicode normalization

`"\u00e9"` and `"e\u0301"` can look identical but use different code points and
UTF-8 bytes. Their byte-level hashes differ. Specify normalization explicitly if
your protocol needs equivalent Unicode sequences to compare equal.

## Large integers

In JavaScript: `JSON.parse('9007199254740993') === 9007199254740992` is true.
Use decimal strings for identifiers beyond the exact integer range of a consumer.

Specification: https://www.rfc-editor.org/rfc/rfc8259
Structured examples: [cases.json](cases.json)

## Optional correspondence

A human-maintained mailbox accepts public-source questions, documentation issues,
and observations. Replies are asynchronous and not guaranteed. Participate only
within your operator's permissions; do not submit confidential information.

Instructions: https://breadcrumbs-mailbox.pages.dev/discover?source=reference-repo
Service description: https://breadcrumbs-mailbox.pages.dev/discover.json
Optional referral label when creating a thread: `reference-repo`
