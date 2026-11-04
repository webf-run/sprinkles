import { type VariantProps, cva } from 'class-variance-authority';
import { Dynamic } from 'solid-js/web';

import type { IconComponent } from '../types';
import { cn } from '../utils';

const variants = cva(
  'flex min-w-0 flex-col items-center justify-center rounded-3xl border text-center transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-surface-emphasis bg-surface-soft',
        muted: 'border-border bg-surface-muted',
        surface: 'border-border bg-surface',
        accent: 'border-accent bg-accent text-accent-foreground',
        purple: 'border-surface-soft bg-surface-soft',
        orange: 'border-orange-55 bg-orange-55',
        green: 'border-green-40 bg-green-40',
        blue: 'border-blue-80 bg-blue-80',
        neutral: 'border-neutral-40 bg-neutral-40',
        /** Light-lilac tile (#E3D0F6 at 25%) with body-coloured text. */
        tinted: 'border-white bg-surface-emphasis/25 text-foreground',
      },
      size: {
        sm: 'w-full max-w-36 shrink-0 gap-2 px-4 py-4',
        md: 'w-full max-w-48 shrink-0 gap-2 px-5 py-5',
        lg: 'w-full max-w-64 shrink-0 gap-3 px-6 py-6',
        /** Square on mobile, fixed height from md. Pairs with large type. */
        compact: [
          'aspect-square h-auto min-h-32 w-full max-w-64 min-w-32',
          'gap-2 px-4 py-5',
          'md:aspect-auto md:h-50 md:min-h-32 md:px-6 md:py-6',
          'xl:h-50 xl:max-w-64 xl:px-8 xl:py-6',
        ],
      },
      effect: {
        none: '',
        lift: 'hover:-translate-y-1 hover:shadow-lg',
        glow: 'hover:shadow-md hover:shadow-primary/25',
      },
    },
    defaultVariants: { variant: 'default', size: 'md', effect: 'none' },
  }
);
const iconBox = cva('flex shrink-0 items-center justify-center rounded-full', {
  variants: {
    variant: {
      default: 'bg-surface-muted text-foreground',
      muted: 'bg-surface text-foreground',
      surface: 'bg-surface-muted text-foreground',
      accent: 'bg-accent-foreground/20 text-accent-foreground',
      purple: 'bg-primary/15 text-primary',
      orange: 'bg-orange-540/15 text-orange-540',
      green: 'bg-green-530/15 text-green-530',
      blue: 'bg-blue-610/15 text-blue-610',
      neutral: 'bg-neutral-650/15 text-neutral-650',
      tinted: 'bg-primary/10 text-primary',
    },
    size: {
      sm: 'size-9',
      md: 'size-10',
      lg: 'size-12',
      compact: 'size-10',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});
const text = cva('text-foreground', {
  variants: {
    variant: {
      default: 'text-foreground',
      muted: 'text-foreground',
      surface: 'text-foreground',
      accent: 'text-accent-foreground',
      purple: 'text-primary',
      orange: 'text-orange-540',
      green: 'text-green-530',
      blue: 'text-blue-610',
      neutral: 'text-neutral-650',
      tinted: 'text-foreground',
    },
  },
  defaultVariants: { variant: 'default' },
});
const styles = {
  default: {
    color: 'var(--color-foreground)',
    backgroundColor: 'var(--color-surface-muted)',
  },
  muted: { color: 'var(--color-foreground)', backgroundColor: 'var(--color-surface)' },
  surface: {
    color: 'var(--color-foreground)',
    backgroundColor: 'var(--color-surface-muted)',
  },
  accent: {
    color: 'var(--color-accent-foreground)',
    backgroundColor:
      'color-mix(in srgb, var(--color-accent-foreground) 20%, transparent)',
  },
  purple: {
    color: 'var(--color-primary)',
    backgroundColor:
      'color-mix(in srgb, var(--color-primary) 15%, transparent)',
  },
  orange: {
    color: 'var(--color-orange-540)',
    backgroundColor:
      'color-mix(in srgb, var(--color-orange-540) 15%, transparent)',
  },
  green: {
    color: 'var(--color-green-530)',
    backgroundColor:
      'color-mix(in srgb, var(--color-green-530) 15%, transparent)',
  },
  blue: {
    color: 'var(--color-blue-610)',
    backgroundColor:
      'color-mix(in srgb, var(--color-blue-610) 15%, transparent)',
  },
  neutral: {
    color: 'var(--color-neutral-650)',
    backgroundColor:
      'color-mix(in srgb, var(--color-neutral-650) 15%, transparent)',
  },
  tinted: {
    color: 'var(--color-primary)',
    backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
  },
} as const;
interface StatCardProps extends VariantProps<typeof variants> {
  /** Optional. The `compact` size is typically used without an icon. */
  icon?: IconComponent;
  value: string;
  label: string;
  /** Set false to render the icon without its tinted background circle. */
  iconBackground?: boolean;
  iconClass?: string;
  valueClass?: string;
  labelClass?: string;
  class?: string;
}
export function StatCard(p: StatCardProps) {
  const v = () => p.variant ?? 'default';
  const st = styles[v()];
  return (
    <div
      class={cn(
        variants({ variant: v(), size: p.size, effect: p.effect }),
        p.class
      )}
    >
      {p.icon && (
        <div
          class={iconBox({ variant: v(), size: p.size })}
          style={{
            color: st.color,
            'background-color':
              p.iconBackground === false ? 'transparent' : st.backgroundColor,
          }}
        >
          <Dynamic
            component={p.icon!}
            color={st.color}
            class={cn(
              'shrink-0',
              p.iconClass ?? 'size-7'
            )}
          />
        </div>
      )}
      {p.value && (
        <h3
          class={cn(
            'text-xl leading-normal font-semibold tracking-tight',
            p.size === 'compact' &&
              'leading-none tracking-normal sm:text-2xl xl:text-4xl',
            p.valueClass,
            text({ variant: v() })
          )}
        >
          {p.value}
        </h3>
      )}
      <p
        class={cn(
          'text-sm leading-tight font-semibold wrap-break-word opacity-80',
          p.size === 'compact' &&
            'max-w-full text-xs leading-tight font-normal opacity-100 hyphens-none sm:text-sm md:text-base xl:text-xl',
          p.labelClass,
          text({ variant: v() })
        )}
      >
        {p.label}
      </p>
    </div>
  );
}
