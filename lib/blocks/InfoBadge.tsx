import { cn } from '../utils';

const frame = {
  inverse: 'border-white/50',
  subtle: 'border-purple-70 bg-surface',
} as const;

const text = {
  inverse: { label: 'text-white', value: 'text-white' },
  subtle: { label: 'text-foreground', value: 'text-foreground-strong' },
} as const;

export interface InfoBadgeProps {
  label: string;
  value: string;
  /** `inverse` for dark/purple backgrounds, `subtle` for light ones. */
  variant?: keyof typeof frame;
  class?: string;
}

/** Two-line outlined badge, e.g. "NAAC Accredited / B+ Grade". */
export function InfoBadge(props: InfoBadgeProps) {
  const variant = () => props.variant ?? 'inverse';

  return (
    <div
      class={cn(
        'flex h-20.75 w-full max-w-63.5 flex-col gap-0.5',
        'justify-center rounded-10 border-[0.5px] p-2.5',
        frame[variant()],
        props.class
      )}
    >
      <span
        class={cn(
          'text-(length:--text-fluid-md) leading-120',
          'md:text-(length:--text-fluid-lg)',
          '2xl:text-(length:--text-fluid-lg) 2xl:tracking-tight-30',
          text[variant()].label
        )}
      >
        {props.label}
      </span>

      <span
        class={cn(
          'text-(length:--text-fluid-md) leading-120 font-semibold',
          'md:text-(length:--text-fluid-lg)',
          '2xl:text-(length:--text-fluid-lg) 2xl:tracking-tight-30',
          text[variant()].value
        )}
      >
        {props.value}
      </span>
    </div>
  );
}
