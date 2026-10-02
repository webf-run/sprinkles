import { type VariantProps, cva } from 'class-variance-authority';
import { Quote, Star } from 'lucide-solid';
import { Show } from 'solid-js';

import { cn } from '../utils';

const variants = cva(
  'flex w-full flex-col rounded-3xl border transition-shadow duration-200',
  {
    variants: {
      variant: {
        default: 'border-border bg-surface',
        muted: 'border-border bg-surface-muted',
        accent: 'border-surface-accent-strong bg-surface-accent',
        inverse: 'border-accent bg-accent text-accent-foreground',
        purple: 'border-badge-purple-background bg-badge-purple-background',
        orange: 'border-badge-orange-background bg-badge-orange-background',
        green: 'border-badge-green-background bg-badge-green-background',
        blue: 'border-badge-blue-background bg-badge-blue-background',
        neutral: 'border-badge-neutral-background bg-badge-neutral-background',
        /** Borderless white card with a plain quote, name and role. */
        plain: 'rounded-badge-outline border-transparent bg-surface',
      },
      size: {
        sm: 'gap-3 px-5 py-4',
        md: 'gap-4 px-6 py-5',
        lg: 'gap-5 px-8 py-7',
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
const text = cva('', {
  variants: {
    variant: {
      default: 'text-foreground',
      muted: 'text-foreground',
      accent: 'text-foreground',
      inverse: 'text-accent-foreground',
      purple: 'text-badge-purple-foreground',
      orange: 'text-badge-orange-foreground',
      green: 'text-badge-green-foreground',
      blue: 'text-badge-blue-foreground',
      neutral: 'text-badge-neutral-foreground',
      plain: 'text-foreground',
    },
  },
  defaultVariants: { variant: 'default' },
});
const accent = cva('', {
  variants: {
    variant: {
      default: 'text-foreground-subtle',
      muted: 'text-foreground-subtle',
      accent: 'text-primary',
      inverse: 'text-accent-foreground/70',
      purple: 'text-badge-purple-foreground',
      orange: 'text-badge-orange-foreground',
      green: 'text-badge-green-foreground',
      blue: 'text-badge-blue-foreground',
      neutral: 'text-badge-neutral-foreground',
      plain: 'text-foreground-subtle',
    },
  },
  defaultVariants: { variant: 'default' },
});
interface TestimonialCardProps extends VariantProps<typeof variants> {
  quote: string;
  name: string;
  role?: string;
  avatar?: string;
  rating?: number;
  class?: string;
}
export function TestimonialCard(p: TestimonialCardProps) {
  const size = () => p.size ?? 'md';
  const v = () => p.variant ?? 'default';
  const rating = () =>
    p.rating === undefined
      ? undefined
      : Math.min(5, Math.max(0, Math.round(p.rating)));
  const initials = () =>
    p.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((x) => x[0]?.toUpperCase())
      .join('');
  return (
    <Show
      when={p.variant !== 'plain'}
      fallback={
        <div
          class={cn(
            'flex h-full flex-col rounded-badge-outline bg-surface',
            'gap-4 p-6',
            'md:gap-6 md:p-8',
            'xl:gap-2 xl:px-8 xl:py-header',
            p.class
          )}
        >
          <p class='flex-1 text-lead leading-150 font-normal tracking-tight-8 text-foreground'>
            {'\u201C'}
            {p.quote}
            {'\u201D'}
          </p>

          <div class='flex items-center gap-3 xl:gap-4'>
            <div class='flex flex-col'>
              <p class='text-body leading-165 font-bold text-foreground-strong'>
                {p.name}
              </p>
              <p class='text-body-sm leading-160 font-normal text-foreground-muted'>
                {p.role}
              </p>
            </div>
          </div>
        </div>
      }
    >
      <figure
        class={cn(
          variants({ variant: v(), size: size(), effect: p.effect }),
          p.class
        )}
      >
        <Quote
          class={cn(
            'shrink-0',
            size() === 'sm' ? 'size-6' : size() === 'md' ? 'size-7' : 'size-8',
            accent({ variant: v() })
          )}
          fill='currentColor'
          stroke='none'
        />
        {rating() !== undefined && (
          <div
            class='flex items-center gap-0.5'
            aria-label={`Rated ${rating()} out of 5`}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                class={cn(
                  size() === 'sm' ? 'size-3.5' : 'size-4',
                  i < rating()!
                    ? accent({ variant: v() })
                    : 'text-border-subtle'
                )}
                fill={i < rating()! ? 'currentColor' : 'none'}
                strokeWidth={1.75}
              />
            ))}
          </div>
        )}
        <blockquote
          class={cn(
            'flex-1 leading-relaxed font-medium',
            size() === 'sm'
              ? 'text-sm'
              : size() === 'md'
                ? 'text-base'
                : 'text-lg',
            text({ variant: v() })
          )}
        >
          {p.quote}
        </blockquote>
        <figcaption class='mt-1 flex items-center gap-3'>
          {p.avatar ? (
            <img
              src={p.avatar}
              alt={p.name}
              class={cn(
                'shrink-0 rounded-full object-cover',
                size() === 'sm'
                  ? 'size-9'
                  : size() === 'lg'
                    ? 'size-12'
                    : 'size-10'
              )}
            />
          ) : (
            <span
              class={cn(
                'flex shrink-0 items-center justify-center rounded-full bg-current/10 font-semibold',
                size() === 'sm'
                  ? 'size-9 text-xs'
                  : size() === 'lg'
                    ? 'size-12 text-sm'
                    : 'size-10 text-xs',
                accent({ variant: v() })
              )}
            >
              <span class={text({ variant: v() })}>{initials()}</span>
            </span>
          )}
          <div class='flex min-w-0 flex-col'>
            <span
              class={cn(
                'truncate leading-normal font-semibold',
                size() === 'lg' ? 'text-base' : 'text-sm',
                text({ variant: v() })
              )}
            >
              {p.name}
            </span>
            {p.role && (
              <span
                class={cn(
                  'truncate text-xs leading-normal opacity-70',
                  text({ variant: v() })
                )}
              >
                {p.role}
              </span>
            )}
          </div>
        </figcaption>
      </figure>
    </Show>
  );
}
