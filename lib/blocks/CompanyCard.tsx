import { type VariantProps, cva } from 'class-variance-authority';
import type { Component } from 'solid-js';
import { Dynamic } from 'solid-js/web';

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

/**
 * Static assets imported by Astro/Vite can be either a URL string or an
 * asset object containing `src`. Solid components are functions and are
 * rendered through Dynamic.
 */
export interface StaticAsset {
  src: string;
}

export interface Props extends VariantProps<typeof variants> {
  logo: string | StaticAsset | Component<any>;
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

function isComponent(value: unknown): value is Component<any> {
  return typeof value === 'function';
}

export default function CompanyCard(props: Props) {
  const content = () => {
    const logo = props.logo;

    // Inline SVG markup supplied as a string.
    if (typeof logo === 'string') {
      const isSvg = logo.trim().startsWith('<svg');

      return isSvg ? (
        <div class='h-12 w-auto max-w-full' innerHTML={logo} />
      ) : (
        <img
          src={logo}
          alt={`${props.companyName} logo`}
          class='max-h-12 w-auto max-w-full object-contain'
        />
      );
    }

    // Astro/Vite imported assets can be ImageMetadata-like objects.
    if (isStaticAsset(logo)) {
      return (
        <img
          src={logo.src}
          alt={`${props.companyName} logo`}
          class='max-h-12 w-auto max-w-full object-contain'
        />
      );
    }

    // Solid component, e.g. an icon or custom logo component.
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
    `${variants({
      variant: props.variant,
      size: props.size,
      effect: props.effect,
    })} ${props.class ?? ''}`;

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
