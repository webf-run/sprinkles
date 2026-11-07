// @ts-check
import tsParser from '@typescript-eslint/parser';
import tailwindcss from 'eslint-plugin-tailwindcss';
import { defineConfig } from 'eslint/config';

/**
 * Keeps class names in `lib/` on the design scale (doc/design-tokens.md).
 * eslint-plugin-tailwindcss only reads `class=` attributes and `cn()` calls;
 * this rule reads every string in the library, so class names kept in cva
 * tables and constant maps are checked too. It flags:
 *
 *  - arbitrary values and variable shorthands: `text-[15px]`, `w-(--x)`;
 *  - fractional spacing (`gap-2.5`, `p-7.5`): the grid is 4 px;
 *  - palette primitives (`text-purple-705`): components use semantic tokens,
 *    so a site can re-theme them;
 *  - the deprecated px radius steps (`rounded-15`).
 *
 * A value the scale doesn't have is either a new token or a sign the design
 * should use the scale.
 */
const Spacing =
  'p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y|w|h|size|min-w|min-h|max-w|max-h|inset|inset-x|inset-y|top|right|bottom|left|start|end|translate-x|translate-y|basis|indent|scroll-m|scroll-p';
const Hues =
  'purple|neutral|orange|green|blue|pink|red|yellow|indigo|seafoam|fuchsia|gray|slate|zinc|stone|amber|lime|emerald|teal|cyan|sky|violet|rose';
const ColourUtilities =
  'bg|text|border|border-t|border-r|border-b|border-l|border-x|border-y|from|via|to|fill|stroke|ring|outline|decoration|divide|shadow|caret|placeholder';

const Checks = [
  {
    pattern: /[[(]/,
    message: 'arbitrary value or variable shorthand; use a token utility',
  },
  {
    pattern: new RegExp(`^-?(${Spacing})-\\d+\\.\\d+$`),
    message: 'fractional spacing; use the 4 px grid',
  },
  {
    pattern: new RegExp(`^(${ColourUtilities})-(${Hues})-\\d+(/\\d+)?$`),
    message: 'palette primitive; use a semantic or categorical token',
  },
  {
    pattern: /^rounded(-[a-z]+)?-(10|15|20|30|5xl)$/,
    message: 'deprecated px radius step; use Tailwind’s radius scale',
  },
];

/** Attributes whose values are class names; every other attribute (SVG geometry, URLs, ARIA, …) is skipped. */
const ClassAttributes = new Set(['class', 'className', 'classList']);

/** @param {string} token */
function utilityOf(token) {
  // Drop variants (`md:`, `hover:`, `data-highlighted:`) and the `!` modifier.
  const parts = token.split(':');
  return parts[parts.length - 1].replace(/^!/, '');
}

/** @type {import('eslint').Rule.RuleModule} */
const designScale = {
  meta: {
    type: 'problem',
    schema: [],
    docs: { description: 'Class names stay on the design scale' },
  },
  create(context) {
    /** @param {import('estree').Node} node @param {string} text */
    function check(node, text) {
      for (const token of text.split(/\s+/)) {
        if (!/^[!a-z-]/.test(token) || !token.includes('-')) continue;
        const utility = utilityOf(token);
        for (const { pattern, message } of Checks) {
          if (pattern.test(utility))
            context.report({ node, message: `'${token}': ${message}` });
        }
      }
    }

    /** True for strings inside a JSX attribute that doesn't hold class names. @param {any} node */
    function isNonClassAttributeValue(node) {
      let current = node.parent;
      while (current && current.type !== 'JSXAttribute') {
        if (current.type === 'CallExpression' || current.type === 'Program')
          return false;
        current = current.parent;
      }
      return Boolean(
        current && !ClassAttributes.has(String(current.name.name))
      );
    }

    return {
      Literal(node) {
        if (typeof node.value !== 'string') return;
        const parent = /** @type {any} */ (node).parent;
        if (
          parent?.type === 'ImportDeclaration' ||
          parent?.type === 'ExportNamedDeclaration'
        )
          return;
        if (isNonClassAttributeValue(node)) return;
        check(node, node.value);
      },
      TemplateElement(node) {
        if (isNonClassAttributeValue(node)) return;
        check(node, node.value.cooked ?? '');
      },
    };
  },
};

export default defineConfig([
  { ignores: ['dist/**', 'dist-site/**', 'node_modules/**', 'site/**'] },
  {
    files: ['lib/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      tailwindcss,
      sprinkles: { rules: { 'design-scale': designScale } },
    },
    settings: {
      tailwindcss:
        /** @type {import('eslint-plugin-tailwindcss').PluginSettings} */
        ({ cssConfigPath: './lib/style.css' }),
    },
    rules: {
      'tailwindcss/no-arbitrary-value': 'error',
      'tailwindcss/no-contradicting-classname': 'error',
      'sprinkles/design-scale': 'error',
    },
  },
]);
