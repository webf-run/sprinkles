#!/usr/bin/env node
/**
 * Guards the design-token rules (doc/design-tokens.md):
 *   1. no component / feature words in token names;
 *   2. no two tokens with the same literal value inside one category;
 *   3. no palette primitive that shadows one of Tailwind's own colours
 *      (`red-600` would silently restyle an app's `bg-red-600`);
 *   4. WCAG 2.2 AA contrast for every text/background pair the roles define
 *      (4.5:1), and 3:1 for control borders and the focus ring, in the light
 *      AND the dark scheme: a `light-dark(a, b)` value is checked as `a`,
 *      then as `b`.
 *
 * Usage:
 *   node scripts/check-tokens.mjs [lib/theme.css] [--theme site/style/themes/x.css …]
 *
 * Each `--theme` file holds a site's overrides (any selector); its values are
 * laid over the base tokens and every contrast pair is checked again, so a
 * second site's theme can't ship an unreadable pairing either.
 */
import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const themes = [];
const files = [];

for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--theme') {
    themes.push(args[(i += 1)]);
  } else {
    files.push(args[i]);
  }
}

if (files.length === 0) files.push('lib/theme.css');

// `notice` is a Spectrum role, so it isn't on this list any more.
const FORBIDDEN =
  /(?<![a-z])(card|badge|tile|banner|button|btn|doc|document|cta|hero|footer|header|navbar|nav|stat|institution|announcement|profile|tab|step|modal|dialog|brand|ink)(?![a-z])/;
const CATEGORY =
  /^--(color|text|leading|tracking|radius|shadow|container|font|background-image|ease|animate)-/;
const TAILWIND_HUES =
  /^--color-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-(50|100|200|300|400|500|600|700|800|900|950)$/;

/** Tailwind's own values for the names tokens may point at. */
const BUILTIN = { '--color-white': '#ffffff', '--color-black': '#000000' };

let failed = false;
const fail = (message) => {
  console.error(message);
  failed = true;
};

function declarations(file) {
  const css = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

  return [...css.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)].map((m) => [
    m[1],
    m[2].replace(/\s+/g, ' ').trim().toLowerCase(),
  ]);
}

// ---------------------------------------------------------------------------
// Naming rules (base files only)
// ---------------------------------------------------------------------------

const base = new Map();

for (const file of files) {
  const tokens = declarations(file);

  for (const [name] of tokens) {
    if (FORBIDDEN.test(name.slice(2)))
      fail(`${file}: "${name}" contains a component/feature word`);
    if (TAILWIND_HUES.test(name)) {
      fail(
        `${file}: "${name}" shadows Tailwind's own colour of that name; pick another shade number`
      );
    }
  }

  const seen = new Map();

  for (const [name, value] of tokens) {
    base.set(name, value);

    const m = name.match(CATEGORY);
    // `--text-fluid-xs--line-height` style sub-properties belong to their step.
    if (
      !m ||
      name.slice(2).includes('--') ||
      /^(var|light-dark)\(/.test(value) ||
      value === 'initial'
    )
      continue;

    const key = `${m[1]}|${value}`;

    if (seen.has(key))
      fail(
        `${file}: "${name}" repeats the value of "${seen.get(key)}" (${value})`
      );
    else seen.set(key, name);
  }
}

// ---------------------------------------------------------------------------
// Contrast
// ---------------------------------------------------------------------------

/** Splits `light-dark(a, b)` at its top-level comma. */
function lightDark(value) {
  if (!value.startsWith('light-dark(') || !value.endsWith(')')) return null;
  const inner = value.slice('light-dark('.length, -1);
  let depth = 0;
  for (let i = 0; i < inner.length; i += 1) {
    if (inner[i] === '(') depth += 1;
    else if (inner[i] === ')') depth -= 1;
    else if (inner[i] === ',' && depth === 0)
      return [inner.slice(0, i).trim(), inner.slice(i + 1).trim()];
  }
  return null;
}

/** A token's value in one scheme, following `var()` references. */
function resolve(tokens, name, scheme, trail = []) {
  if (trail.includes(name))
    throw new Error(`circular token: ${[...trail, name].join(' → ')}`);

  let value = tokens.get(name) ?? BUILTIN[name];

  if (value === undefined) return null;

  const both = lightDark(value);
  if (both) value = scheme === 'dark' ? both[1] : both[0];

  const ref = value.match(/^var\((--[\w-]+)\)$/);

  return ref ? resolve(tokens, ref[1], scheme, [...trail, name]) : value;
}

function rgb(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}

function luminance(hex) {
  const [r, g, b] = rgb(hex).map((c) =>
    c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const ROLES = [
  'accent',
  'neutral',
  'informative',
  'positive',
  'notice',
  'negative',
  'highlight',
];
const CATEGORICAL = ['seafoam', 'indigo', 'purple', 'fuchsia', 'yellow'];
const SURFACES = ['surface', 'surface-muted', 'surface-tint', 'surface-soft'];
const TEXT = [
  'foreground-strongest',
  'foreground-strong',
  'foreground',
  'foreground-muted',
  'foreground-subtle',
];

/** [foreground, background, minimum ratio] */
function pairs() {
  const list = [];

  for (const role of ROLES) {
    for (const fill of [role, `${role}-hover`, `${role}-down`])
      list.push([`${role}-foreground`, fill, 4.5]);
    list.push([`${role}-subtle-foreground`, `${role}-subtle`, 4.5]);
    // A role's own colour is also text on a surface, except highlight, which
    // is only ever text on the inverse surface.
    list.push(
      role === 'highlight'
        ? [role, 'surface-inverse', 4.5]
        : [role, 'surface', 4.5]
    );
  }

  for (const colour of CATEGORICAL) {
    list.push([`${colour}-foreground`, colour, 4.5]);
    list.push([`${colour}-subtle-foreground`, `${colour}-subtle`, 4.5]);
  }

  for (const text of TEXT)
    for (const surface of SURFACES) list.push([text, surface, 4.5]);

  // Role colours as text on the page background, and text on tinted chips.
  for (const role of ROLES)
    if (role !== 'highlight') list.push([role, 'surface-muted', 4.5]);
  list.push(['foreground', 'surface-emphasis', 4.5]);

  list.push(['foreground-inverse', 'surface-inverse', 4.5]);
  list.push(['border-strong', 'surface', 3]);
  list.push(['focus-ring', 'surface', 3]);

  return list;
}

function checkContrast(label, tokens) {
  let checked = 0;

  for (const scheme of ['light', 'dark'])
    checked += checkScheme(`${label} (${scheme})`, tokens, scheme);

  return checked;
}

function checkScheme(label, tokens, scheme) {
  let checked = 0;

  for (const [fg, bg, min] of pairs()) {
    const a = resolve(tokens, `--color-${fg}`, scheme);
    const b = resolve(tokens, `--color-${bg}`, scheme);

    if (!a || !b) {
      fail(`${label}: --color-${!a ? fg : bg} is missing`);
      continue;
    }

    if (
      !/^#([0-9a-f]{3}|[0-9a-f]{6})$/.test(a) ||
      !/^#([0-9a-f]{3}|[0-9a-f]{6})$/.test(b)
    ) {
      fail(
        `${label}: can't check ${fg} on ${bg} (${a} / ${b}); use hex colours`
      );
      continue;
    }

    const contrast = ratio(a, b);
    checked += 1;

    if (contrast < min)
      fail(
        `${label}: ${fg} on ${bg} is ${contrast.toFixed(2)}:1, needs ${min}:1 (${a} on ${b})`
      );
  }

  return checked;
}

let checked = checkContrast('base theme', base);

for (const theme of themes) {
  const layered = new Map(base);
  for (const [name, value] of declarations(theme)) layered.set(name, value);
  checked += checkContrast(theme, layered);
}

if (failed) process.exit(1);
console.log(
  `design tokens OK (${checked} contrast pairs across ${1 + themes.length} theme${themes.length === 0 ? '' : 's'}, light and dark)`
);
