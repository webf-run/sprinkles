import type { IconComponent } from '../types';

/** Newspaper page. Takes its colour from `currentColor`. */
export const News: IconComponent = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.size ?? 24}
    height={props.size ?? 24}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    stroke-width='1.7'
    stroke-linejoin='round'
    class={props.class}
    aria-hidden='true'
  >
    <path d='M2.8501 0.849976H20.8501C21.9547 0.849976 22.8501 1.74541 22.8501 2.84998V20.85C22.8501 21.9545 21.9547 22.85 20.8501 22.85H2.8501C1.74553 22.85 0.850098 21.9545 0.850098 20.85V2.84998C0.850098 1.74541 1.74553 0.849976 2.8501 0.849976Z' />
    <path d='M5.8501 6.84998H17.8501M5.8501 11.85H17.8501M5.8501 16.85H13.8501' />
  </svg>
);
