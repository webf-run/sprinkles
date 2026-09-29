import { type VariantProps, cva } from 'class-variance-authority';
import type { Component } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { cn } from '../utils';

const variants = cva(
  'flex shrink-0 items-center justify-center rounded-xl border transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-border bg-surface',
        muted: 'border-border-subtle bg-surface-muted',
        accent: 'border-surface-accent-strong bg-surface-accent',
        purple: 'border-badge-purple-background bg-badge-purple-background',
        orange: 'border-badge-orange-background bg-badge-orange-background',
        green: 'border-badge-green-background bg-badge-green-background',
        blue: 'border-badge-blue-background bg-badge-blue-background',
        neutral: 'border-badge-neutral-background bg-badge-neutral-background',
      },
      size: {
        sm: 'h-15 w-30 p-3',
        md: 'h-20 w-40 p-4',
        lg: 'h-28 w-56 p-6',
      },
      effect: {
        none: '',
        lift: 'hover:-translate-y-1 hover:shadow-lg',
        scale: 'hover:scale-105',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      effect: 'scale',
    },
  }
);

/** Asset object returned by Astro/Vite image imports. */
export interface StaticAsset {
  src: string;
}

type LogoComponent = Component<{ class?: string }>;

interface CompanyCardProps extends VariantProps<typeof variants> {
  /** Image URL, static asset, Solid component, or inline `<svg>` string.
   * Inline SVG is not sanitized; pass trusted markup only. */
  logo: string | StaticAsset | LogoComponent;
  companyName: string;
  href?: string;
  class?: string;
}

function isStaticAsset(value: unknown): value is StaticAsset {
  return (
    typeof value === 'object' &&
    value !== null &&
    'src' in value &&
    typeof value.src === 'string'
  );
}

function isComponent(value: unknown): value is LogoComponent {
  return typeof value === 'function';
}

export function CompanyCard(props: CompanyCardProps) {
  const content = () => {
    const logo = props.logo;

    if (typeof logo === 'string') {
      const isSvg = logo.trim().startsWith('<svg');

      return isSvg ? (
        <div
          class='h-12 max-w-full [&>svg]:h-full [&>svg]:w-auto [&>svg]:max-w-full'
          innerHTML={logo}
        />
      ) : (
        <img
          src={logo}
          alt={`${props.companyName} logo`}
          class='max-h-12 w-auto max-w-full object-contain'
        />
      );
    }

    if (isStaticAsset(logo)) {
      return (
        <img
          src={logo.src}
          alt={`${props.companyName} logo`}
          class='max-h-12 w-auto max-w-full object-contain'
        />
      );
    }

    if (isComponent(logo)) {
      return (
        <Dynamic
          component={logo}
          class='max-h-12 w-auto max-w-full object-contain'
        />
      );
    }

    return null;
  };

  const className = () =>
    cn(
      variants({
        variant: props.variant,
        size: props.size,
        effect: props.effect,
      }),
      props.class
    );

  if (props.href) {
    return (
      <a
        href={props.href}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`Visit ${props.companyName}`}
        class={className()}
      >
        {content()}
      </a>
    );
  }

  return <div class={className()}>{content()}</div>;
}
