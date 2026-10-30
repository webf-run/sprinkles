import type { IconComponent } from '../types';

/**
 * 1px horizontal rule drawn as an SVG (731 x 1 in the design). It stretches to
 * the width of its container and takes its colour from `currentColor`.
 */
export const Divider: IconComponent = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='100%'
    height='1'
    viewBox='0 0 731 1'
    preserveAspectRatio='none'
    fill='none'
    class={props.class}
    aria-hidden='true'
  >
    <path d='M0 0.5H731' stroke='currentColor' vector-effect='non-scaling-stroke' />
  </svg>
);
