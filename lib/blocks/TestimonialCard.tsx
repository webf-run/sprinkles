import { type VariantProps, cva } from 'class-variance-authority';
import { Quote, Star } from 'lucide-solid';

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
    },
  },
  defaultVariants: { variant: 'default' },
});
export interface Props extends VariantProps<typeof variants> {
  quote: string;
  name: string;
  role?: string;
  avatar?: string;
  rating?: number;
  class?: string;
}
export default function TestimonialCard(p: Props) {
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
    <figure
      class={`${variants({ variant: v(), size: size(), effect: p.effect })} ${p.class ?? ''}`}
    >
      <Quote
        class={`shrink-0 ${size() === 'sm' ? 'size-6' : size() === 'md' ? 'size-7' : 'size-8'} ${accent({ variant: v() })}`}
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
              class={`${size() === 'sm' ? 'size-3.5' : 'size-4'} ${i < rating()! ? accent({ variant: v() }) : 'text-border-subtle'}`}
              fill={i < rating()! ? 'currentColor' : 'none'}
              strokeWidth={1.75}
            />
          ))}
        </div>
      )}
      <blockquote
        class={`flex-1 leading-relaxed font-medium ${size() === 'sm' ? 'text-sm' : size() === 'md' ? 'text-base' : 'text-lg'} ${text({ variant: v() })}`}
      >
        {p.quote}
      </blockquote>
      <figcaption class='mt-1 flex items-center gap-3'>
        {p.avatar ? (
          <img
            src={p.avatar}
            alt={p.name}
            class={`shrink-0 rounded-full object-cover ${size() === 'sm' ? 'size-9' : size() === 'lg' ? 'size-12' : 'size-10'}`}
          />
        ) : (
          <span
            class={`flex shrink-0 items-center justify-center rounded-full font-semibold ${size() === 'sm' ? 'size-9 text-xs' : size() === 'lg' ? 'size-12 text-sm' : 'size-10 text-xs'} ${accent({ variant: v() })} bg-current/10`}
          >
            <span class={text({ variant: v() })}>{initials()}</span>
          </span>
        )}
        <div class='flex min-w-0 flex-col'>
          <span
            class={`truncate leading-normal font-semibold ${size() === 'lg' ? 'text-base' : 'text-sm'} ${text({ variant: v() })}`}
          >
            {p.name}
          </span>
          {p.role && (
            <span
              class={`truncate text-xs leading-normal opacity-70 ${text({ variant: v() })}`}
            >
              {p.role}
            </span>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
