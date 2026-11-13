import { cn } from '../utils';

const frame = {
  inverse: 'border-border-inverse/50 text-foreground-inverse',
  subtle: 'border-border-subtle bg-surface text-foreground',
  outline: 'border-[0.5px] border-foreground text-foreground',
} as const;

export interface InfoBadgeProps {
  label: string;
  value: string;
  /**
   * `inverse` for dark bands and photos, `subtle` for light surfaces, and
   * `outline` for a transparent box with a dark hairline on a tinted band.
   */
  variant?: keyof typeof frame;
  class?: string;
}

/** Two-line outlined badge, e.g. "NAAC Accredited / B+ Grade". */
export function InfoBadge(props: InfoBadgeProps) {
  const variant = () => props.variant ?? 'inverse';

  return (
    <div
      class={cn(
        'flex w-full max-w-64 flex-col justify-center gap-1 rounded-xl border p-2.5',
        'text-fluid-md leading-120 tracking-normal md:text-fluid-lg md:leading-120 2xl:tracking-tight-30',
        frame[variant()],
        props.class
      )}
    >
      <span>{props.label}</span>
      <span
        class={cn(
          'text-fluid-md leading-120 font-semibold',
          variant() === 'subtle' && 'text-foreground-strong'
        )}
      >
        {props.value}
      </span>
    </div>
  );
}
