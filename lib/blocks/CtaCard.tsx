import { cn } from '../utils';
import { Link } from './Link';

export interface CtaCardProps {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  class?: string;
}

/**
 * Light, left-aligned call-to-action card: eyebrow, heading, description and
 * a primary + optional secondary (outline) button.
 */
export function CtaCard(props: CtaCardProps) {
  const buttonSize = 'h-12 px-4 py-0 text-fluid-lg md:h-15.25';

  return (
    <div
      class={cn(
        'flex flex-col justify-center rounded-3xl bg-surface-muted',
        'p-6 md:px-8 md:py-10 xl:min-h-77.5',
        props.class
      )}
    >
      {props.eyebrow && (
        <p class='text-fluid-sm leading-120 font-bold text-primary-dark uppercase 2xl:text-(length:--text-fluid-md)'>
          {props.eyebrow}
        </p>
      )}

      <h2
        class={cn(
          'font-heading text-fluid-2xl leading-126 font-normal text-foreground-strongest',
          props.eyebrow && 'mt-3'
        )}
      >
        {props.title}
      </h2>

      {props.description && (
        <p class='mt-3 text-fluid-lg leading-120 text-foreground-muted'>
          {props.description}
        </p>
      )}

      <div class='mt-6 flex flex-wrap items-center gap-2.5 xl:mt-7'>
        <Link
          href={props.primaryHref}
          variant='brand'
          class={cn(buttonSize, 'hover:bg-primary-dark')}
        >
          {props.primaryLabel}
        </Link>

        {props.secondaryLabel && props.secondaryHref && (
          <Link
            href={props.secondaryHref}
            variant='brand-outline'
            class={buttonSize}
          >
            {props.secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
