/// <reference types="vite/client" />
// Build-only entry used by `vite build`.
// Importing the stylesheet here makes Vite emit it as `dist/style.css`
// without forcing the docs site (which imports the CSS itself) to load it twice.
import './style/library.css';

export * from './index';
