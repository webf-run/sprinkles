import type { IconComponent } from '../types';

/** Small orange bullet used by `DotTag`. */
export const Dot: IconComponent = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.size ?? 10}
    height={props.size ?? 10}
    viewBox='0 0 10 10'
    fill='none'
    class={props.class}
    aria-hidden='true'
  >
    <rect width='10' height='10' rx='5' fill='#FFA037' />
  </svg>
);
