import { type VariantProps, cva } from 'class-variance-authority';
import type { Component } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { cn } from '../utils';

const variants = cva(
  'flex shrink-0 items-center justify-center rounded-xl border text-inherit no-underline transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-border bg-surface',
        muted: 'border-purple-70 bg-surface-muted',
        accent: 'border-surface-emphasis bg-surface-soft',
        purple: 'border-surface-soft bg-surface-soft',
        orange: 'border-orange-55 bg-orange-55',
        green: 'border-green-40 bg-green-40',
        blue: 'border-blue-80 bg-blue-80',
        neutral: 'border-neutral-40 bg-neutral-40',
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
  /** Show the logo in greyscale; colour returns on hover. */
  grayscale?: boolean;
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
  const imgClass = () =>
    props.grayscale
      ? 'h-12 w-auto max-w-full object-contain opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0'
      : 'max-h-12 w-auto max-w-full object-contain';

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
          class={imgClass()}
          loading='lazy'
          decoding='async'
        />
      );
    }

    if (isStaticAsset(logo)) {
      return (
        <img
          src={logo.src}
          alt={`${props.companyName} logo`}
          class={imgClass()}
          loading='lazy'
          decoding='async'
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
      props.grayscale && 'group',
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
