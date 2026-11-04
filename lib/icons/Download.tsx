import type { IconComponent } from '../types';

/** Download arrow (16 x 18). Takes its colour from `currentColor`. */
export const Download: IconComponent = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.size ?? 16}
    height={props.size ?? 18}
    viewBox='0 0 16 18'
    fill='none'
    stroke='currentColor'
    stroke-width='1.8'
    stroke-linecap='round'
    stroke-linejoin='round'
    class={props.class}
    aria-hidden='true'
  >
    <path d='M7.89844 0.900002V12.9M12.8984 7.9L7.89844 12.9L2.89844 7.9M0.898438 16.9H14.8984' />
  </svg>
);
