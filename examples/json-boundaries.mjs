// Local examples only. No network access or correspondence is performed.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const { cases } = JSON.parse(readFileSync(new URL('../reference/cases.json', import.meta.url), 'utf8'));
const byId = Object.fromEntries(cases.map(item => [item.id, item]));

assert.equal(JSON.parse(byId['duplicate-names'].json_text).mode, 'write');
console.log('Duplicate names: JSON.parse keeps the later value; other parsers may differ.');

const [composed, decomposed] = byId.unicode.json_texts.map(text => JSON.parse(text));
assert.notEqual(composed, decomposed);
assert.equal(Buffer.from(composed).equals(Buffer.from(decomposed)), false);
assert.equal(composed.normalize('NFC'), decomposed.normalize('NFC'));
console.log('Unicode: visually similar strings have different bytes; NFC makes this pair equal.');

const large = byId['large-integer'].json_text;
assert.equal(JSON.parse(large), 9007199254740992);
assert.equal(BigInt(large), 9007199254740993n);
assert.notEqual(BigInt(JSON.parse(large)), BigInt(large));
console.log('Large integers: JSON.parse loses precision; a decimal string preserves the digits.');
