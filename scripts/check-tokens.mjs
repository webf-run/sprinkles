#!/usr/bin/env node
/**
 * Guards the design-token rules (see doc/design-tokens.md):
 *   1. no component / feature words in token names
 *   2. no two tokens with the same literal value inside one category
 * Usage: node scripts/check-tokens.mjs [path/to/theme.css ...]
 */
import { readFileSync } from 'node:fs';

const files = process.argv.slice(2);
if (files.length === 0) files.push('lib/theme.css');

const FORBIDDEN =
  /(?<![a-z])(card|badge|tile|banner|button|btn|notice|doc|document|cta|hero|footer|header|navbar|nav|stat|institution|announcement|profile|tab|step|modal|dialog|brand|ink)(?![a-z])/;
const CATEGORY = /^--(color|text|leading|tracking|radius|shadow|container|font|background-image)-/;

let failed = false;
for (const file of files) {
  const css = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const tokens = [...css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [
    m[1],
    m[2].replace(/\s+/g, ' ').trim().toLowerCase(),
  ]);

  for (const [name] of tokens) {
    if (FORBIDDEN.test(name.slice(2))) {
      console.error(`${file}: "${name}" contains a component/feature word`);
      failed = true;
    }
  }

  const seen = new Map();
  for (const [name, value] of tokens) {
    const m = name.match(CATEGORY);
    // `--text-fluid-xs--line-height` style sub-properties belong to their step.
    if (!m || name.slice(2).includes('--') || value.startsWith('var(') || value === 'initial') continue;
    const key = `${m[1]}|${value}`;
    if (seen.has(key)) {
      console.error(`${file}: "${name}" repeats the value of "${seen.get(key)}" (${value})`);
      failed = true;
    } else seen.set(key, name);
  }
}
if (failed) process.exit(1);
console.log('design tokens OK');
