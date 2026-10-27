import type { IconComponent } from '../types';

/** Calendar with entries. Takes its colour from `currentColor`. */
export const Calendar: IconComponent = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.size ?? 20}
    height={props.size ?? 20}
    viewBox='0 0 20 20'
    fill='none'
    stroke='currentColor'
    stroke-width='1.6'
    stroke-linecap='round'
    stroke-linejoin='round'
    class={props.class}
    aria-hidden='true'
  >
    <path d='M2.7998 2.80005H16.7998C17.9044 2.80005 18.7998 3.69548 18.7998 4.80005V16.8C18.7998 17.9046 17.9044 18.8 16.7998 18.8H2.7998C1.69524 18.8 0.799805 17.9046 0.799805 16.8V4.80005C0.799805 3.69548 1.69524 2.80005 2.7998 2.80005Z' />
    <path d='M4.7998 0.800049V4.80005M14.7998 0.800049V4.80005M0.799805 7.80005H18.7998' />
    <path d='M4.7998 11.8H7.7998M10.7998 11.8H13.7998M4.7998 14.8H7.7998' />
  </svg>
);
