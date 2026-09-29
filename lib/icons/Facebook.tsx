import { type JSX, splitProps } from 'solid-js';

interface FacebookProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
  class?: string;
}

export function Facebook(props: FacebookProps): JSX.Element {
  const [local, rest] = splitProps(props, ['size', 'strokeWidth', 'class']);

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={local.size ?? 24}
      height={local.size ?? 24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width={local.strokeWidth ?? 2}
      stroke-linecap='round'
      stroke-linejoin='round'
      class={local.class ?? ''}
      {...rest}
    >
      <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
    </svg>
  );
}
