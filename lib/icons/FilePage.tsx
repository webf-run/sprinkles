import type { IconComponent } from '../types';

/**
 * Document page with a cut corner. It stretches to whatever width and height
 * the caller sets (20 x 24 on desktop, 14 x 21 on mobile) while the stroke stays
 * a constant width. Colours: stroke from `currentColor`, fill from CSS `fill`.
 */
export const FilePage: IconComponent = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 20 24'
    preserveAspectRatio='none'
    stroke='currentColor'
    stroke-width='1.3'
    stroke-linejoin='round'
    class={props.class}
    aria-hidden='true'
  >
    <path
      d='M12.5 0.65H2.15a1.5 1.5 0 0 0-1.5 1.5v19.7a1.5 1.5 0 0 0 1.5 1.5h15.7a1.5 1.5 0 0 0 1.5-1.5V7.65L12.5 0.65Z'
      vector-effect='non-scaling-stroke'
    />
    <path
      d='M12.5 0.65V7.65H19.35'
      fill='none'
      vector-effect='non-scaling-stroke'
    />
  </svg>
);
