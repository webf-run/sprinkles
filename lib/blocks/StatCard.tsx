import { type VariantProps, cva } from 'class-variance-authority';
import { Dynamic } from 'solid-js/web';

import type { IconComponent } from '../types';
import { cn } from '../utils';

const variants = cva(
  'flex min-w-0 flex-col items-center justify-center rounded-3xl border text-center transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-surface-accent-strong bg-surface-accent',
        muted: 'border-border bg-surface-muted',
        surface: 'border-border bg-surface',
        accent: 'border-accent bg-accent text-accent-foreground',
        purple: 'border-badge-purple-background bg-badge-purple-background',
        orange: 'border-badge-orange-background bg-badge-orange-background',
        green: 'border-badge-green-background bg-badge-green-background',
        blue: 'border-badge-blue-background bg-badge-blue-background',
        neutral: 'border-badge-neutral-background bg-badge-neutral-background',
        /** Light-lilac tile (#E3D0F6 at 25%) with body-coloured text. */
        tinted: 'border-white bg-surface-accent-strong/25 text-foreground',
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
      purple: 'bg-badge-purple-foreground/15 text-badge-purple-foreground',
      orange: 'bg-badge-orange-foreground/15 text-badge-orange-foreground',
      green: 'bg-badge-green-foreground/15 text-badge-green-foreground',
      blue: 'bg-badge-blue-foreground/15 text-badge-blue-foreground',
      neutral: 'bg-badge-neutral-foreground/15 text-badge-neutral-foreground',
      tinted: 'bg-brand/10 text-brand',
    },
    size: { sm: 'size-9', md: 'size-10', lg: 'size-12', compact: 'size-10' },
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
      purple: 'text-badge-purple-foreground',
      orange: 'text-badge-orange-foreground',
      green: 'text-badge-green-foreground',
      blue: 'text-badge-blue-foreground',
      neutral: 'text-badge-neutral-foreground',
      tinted: 'text-foreground',
    },
  },
  defaultVariants: { variant: 'default' },
});
const styles = {
  default: {
    color: 'var(--foreground)',
    backgroundColor: 'var(--surface-muted)',
  },
  muted: { color: 'var(--foreground)', backgroundColor: 'var(--surface)' },
  surface: {
    color: 'var(--foreground)',
    backgroundColor: 'var(--surface-muted)',
  },
  accent: {
    color: 'var(--accent-foreground)',
    backgroundColor:
      'color-mix(in srgb, var(--accent-foreground) 20%, transparent)',
  },
  purple: {
    color: 'var(--badge-purple-foreground)',
    backgroundColor:
      'color-mix(in srgb, var(--badge-purple-foreground) 15%, transparent)',
  },
  orange: {
    color: 'var(--badge-orange-foreground)',
    backgroundColor:
      'color-mix(in srgb, var(--badge-orange-foreground) 15%, transparent)',
  },
  green: {
    color: 'var(--badge-green-foreground)',
    backgroundColor:
      'color-mix(in srgb, var(--badge-green-foreground) 15%, transparent)',
  },
  blue: {
    color: 'var(--badge-blue-foreground)',
    backgroundColor:
      'color-mix(in srgb, var(--badge-blue-foreground) 15%, transparent)',
  },
  neutral: {
    color: 'var(--badge-neutral-foreground)',
    backgroundColor:
      'color-mix(in srgb, var(--badge-neutral-foreground) 15%, transparent)',
  },
  tinted: {
    color: 'var(--brand)',
    backgroundColor: 'color-mix(in srgb, var(--brand) 10%, transparent)',
  },
} as const;
interface StatCardProps extends VariantProps<typeof variants> {
  /** Optional. The `compact` size is typically used without an icon. */
  icon?: IconComponent;
  value: string;
  label: string;
  iconClass?: string;
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
          style={{ color: st.color, 'background-color': st.backgroundColor }}
        >
          <Dynamic
            component={p.icon!}
            color={st.color}
            class={cn('shrink-0', p.iconClass ?? 'size-7')}
          />
        </div>
      )}
      {p.value && (
        <h3
          class={cn(
            'text-xl leading-normal font-semibold tracking-tight',
            p.size === 'compact' &&
              'leading-none tracking-normal sm:text-2xl xl:text-4xl',
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
          text({ variant: v() })
        )}
      >
        {p.label}
      </p>
    </div>
  );
}
