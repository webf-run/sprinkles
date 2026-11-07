import { Show } from 'solid-js';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { cn } from '../utils';

export interface CtaCardProps {
  /** A short label above the title: one to three words. */
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
 * A left-aligned call to action on a muted card: eyebrow, title,
 * description, a primary button and an optional secondary one. For a
 * full-width band, use `CtaSection`.
 */
export function CtaCard(props: CtaCardProps) {
  return (
    <section
      class={cn(
        'flex w-full flex-col items-start rounded-3xl bg-surface-muted p-6 sm:p-8',
        props.class
      )}
    >
      <Show when={props.eyebrow}>
        <Badge size='l' variant='accent' fillStyle='outline' class='mb-4'>
          {props.eyebrow}
        </Badge>
      </Show>

      <h2 class='m-0 font-heading text-fluid-3xl font-semibold text-balance text-foreground-strongest'>
        {props.title}
      </h2>

      <Show when={props.description}>
        <p class='m-0 mt-3 max-w-2xl text-fluid-lg text-pretty text-foreground-muted'>
          {props.description}
        </p>
      </Show>

      <div class='mt-auto flex flex-wrap gap-3 pt-8'>
        <Button href={props.primaryHref} size='l'>
          {props.primaryLabel}
        </Button>
        <Show when={props.secondaryLabel && props.secondaryHref}>
          <Button
            href={props.secondaryHref}
            size='l'
            variant='secondary'
            fillStyle='outline'
          >
            {props.secondaryLabel}
          </Button>
        </Show>
      </div>
    </section>
  );
}
