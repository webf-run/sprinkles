import type { IconComponent } from '../types';

/** Notification bell. Takes its colour from `currentColor`. */
export const Bell: IconComponent = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.size ?? 18}
    height={props.size ?? 22}
    viewBox='0 0 18 22'
    fill='none'
    stroke='currentColor'
    stroke-width='1.7'
    stroke-linecap='round'
    stroke-linejoin='round'
    class={props.class}
    aria-hidden='true'
  >
    <path d='M0.850098 14.85H16.8501L14.8501 11.85V6.84998C14.8501 5.25868 14.218 3.73255 13.0927 2.60734C11.9675 1.48212 10.4414 0.849976 8.8501 0.849976C7.2588 0.849976 5.73268 1.48212 4.60746 2.60734C3.48224 3.73255 2.8501 5.25868 2.8501 6.84998V11.85L0.850098 14.85Z' />
    <path d='M5.8501 17.85C5.8501 18.6456 6.16617 19.4087 6.72878 19.9713C7.29139 20.5339 8.05445 20.85 8.8501 20.85C9.64575 20.85 10.4088 20.5339 10.9714 19.9713C11.534 19.4087 11.8501 18.6456 11.8501 17.85' />
  </svg>
);
