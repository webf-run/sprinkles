import { ArrowRight } from 'lucide-solid';

import { cn } from '../utils';
import { Badge } from './Badge';
import { Link } from './Link';

export interface CtaSectionProps {
  badge: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
  class?: string;
}

/** Full-width dark call-to-action section. */
export function CtaSection(props: CtaSectionProps) {
  return (
    <section class={cn('w-full bg-glow', props.class)}>
      <div class='mx-auto w-full max-w-site px-5.5 md:px-header xl:px-37.25'>
        <div
          class={cn(
            'mx-auto flex max-w-303 flex-col items-center gap-9 py-12 text-center',
            'md:gap-10 md:py-16',
            'xl:gap-14.5 xl:py-19.5'
          )}
        >
          <Badge
            variant='purple'
            size='section'
            class='mb-6 max-md:h-auto max-md:min-h-badge-md-mobile-height max-md:w-auto max-md:max-w-full max-md:px-5 max-md:py-2.5 max-md:leading-126 max-md:whitespace-normal xl:mb-8.25'
          >
            {props.badge}
          </Badge>

          <h2
            class={cn(
              'mx-auto max-w-303 font-heading text-heading-display leading-115 font-semibold tracking-tight-20 text-white',
              'xl:text-heading-display-xl xl:leading-110 xl:tracking-tight-30'
            )}
          >
            {props.title}
          </h2>

          <p class='mx-auto max-w-135 text-lead leading-150 tracking-tight-8 text-white xl:max-w-190.25'>
            {props.description}
          </p>

          <Link
            variant='highlight'
            size='action-lg'
            icon={ArrowRight}
            href={props.ctaHref}
          >
            {props.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
