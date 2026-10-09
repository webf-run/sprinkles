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
  const buttonSize = 'h-12 px-4 py-0 text-lead md:h-15.25';

  return (
    <div
      class={cn(
        'flex flex-col justify-center rounded-3xl bg-brand-wash',
        'p-6 md:px-8 md:py-10 xl:min-h-77.5',
        props.class
      )}
    >
      {props.eyebrow && (
        <p class='text-body-sm leading-120 font-bold text-brand-deep uppercase 2xl:text-card-description-md'>
          {props.eyebrow}
        </p>
      )}

      <h2
        class={cn(
          'font-heading text-subtitle leading-126 font-normal text-ink',
          props.eyebrow && 'mt-3'
        )}
      >
        {props.title}
      </h2>

      {props.description && (
        <p class='mt-3 text-lead leading-120 text-ink-muted'>
          {props.description}
        </p>
      )}

      <div class='mt-6 flex flex-wrap items-center gap-2.5 xl:mt-7'>
        <Link
          href={props.primaryHref}
          variant='brand'
          class={cn(buttonSize, 'hover:bg-brand-deep')}
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
