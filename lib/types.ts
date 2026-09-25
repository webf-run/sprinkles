import type { Component, JSX } from 'solid-js';

/**
 * The common prop shape every lucide-solid icon (and any custom icon
 * component passed as a slot replacement) accepts. Use this instead of
 * `Component<any>` wherever a block accepts an `icon` prop.
 */
export type IconComponent = Component<{
  size?: number | string;
  class?: string;
  color?: string;
  strokeWidth?: number | string;
  style?: string | JSX.CSSProperties;
}>;
