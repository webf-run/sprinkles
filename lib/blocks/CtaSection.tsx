import ArrowRight from 'lucide-solid/icons/arrow-right';
import { Show, createUniqueId } from 'solid-js';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { cn } from '../utils';

/** The band a call-to-action section sits on. */
export type CtaSectionSurface = 'inverse' | 'muted' | 'default';

const Surfaces: Record<
  CtaSectionSurface,
  { root: string; title: string; description: string }
> = {
  inverse: {
    root: 'bg-surface-inverse bg-glow',
    title: 'text-foreground-inverse',
    description: 'text-foreground-inverse/80',
  },
  muted: {
    root: 'bg-surface-muted',
    title: 'text-foreground-strongest',
    description: 'text-foreground-muted',
  },
  default: {
    root: 'bg-surface',
    title: 'text-foreground-strongest',
    description: 'text-foreground-muted',
  },
};

export interface CtaSectionProps {
  /** A short label above the title: one to three words. */
  eyebrow?: string;
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** `inverse` (default) is a dark band; `muted` and `default` are light. */
  surface?: CtaSectionSurface;
  class?: string;
}

/** A full-width band that asks for one action: eyebrow, title, description and buttons. */
export function CtaSection(props: CtaSectionProps) {
  const surface = () => props.surface ?? 'inverse';
  const colours = () => Surfaces[surface()];
  const inverse = () => surface() === 'inverse';
  const titleId = `cta-section-${createUniqueId()}`;

  return (
    <section
      aria-labelledby={titleId}
      class={cn('w-full', colours().root, props.class)}
    >
      <div class='mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-16 text-center sm:px-6 md:py-24'>
        <Show when={props.eyebrow}>
          <Badge
            size='l'
            variant='accent'
            staticColor={inverse() ? 'white' : undefined}
            class='mb-6'
          >
            {props.eyebrow}
          </Badge>
        </Show>

        <h2
          id={titleId}
          class={cn(
            'm-0 font-heading text-fluid-5xl font-semibold text-balance',
            colours().title
          )}
        >
          {props.title}
        </h2>

        <Show when={props.description}>
          <p
            class={cn(
              'm-0 mt-5 max-w-2xl text-fluid-lg text-pretty',
              colours().description
            )}
          >
            {props.description}
          </p>
        </Show>

        <div class='mt-10 flex flex-wrap justify-center gap-3'>
          <Button
            href={props.primaryHref}
            size='xl'
            iconEnd={ArrowRight}
            staticColor={inverse() ? 'white' : undefined}
          >
            {props.primaryLabel}
          </Button>
          <Show when={props.secondaryLabel && props.secondaryHref}>
            <Button
              href={props.secondaryHref}
              size='xl'
              variant='secondary'
              fillStyle='outline'
              staticColor={inverse() ? 'white' : undefined}
            >
              {props.secondaryLabel}
            </Button>
          </Show>
        </div>
      </div>
    </section>
  );
}
