import type { Component, JSX } from 'solid-js';

/** Common props accepted by lucide-solid icons and custom icon components. */
export type IconComponent = Component<{
  size?: number | string;
  class?: string;
  color?: string;
  strokeWidth?: number | string;
  style?: string | JSX.CSSProperties;
}>;
