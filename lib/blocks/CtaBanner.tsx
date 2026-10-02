import { ArrowRight } from 'lucide-solid';

import { cn } from '../utils';
import { Link } from './Link';

export interface CtaBannerProps {
  text: string;
  ctaLabel: string;
  ctaHref: string;
  class?: string;
}

/** Slim "text + button" banner. */
export function CtaBanner(props: CtaBannerProps) {
  return (
    <div
      class={cn(
        'flex w-full flex-col items-start justify-between gap-4 rounded-badge-tag border border-brand bg-surface p-5',
        'shadow-card-purple',
        'md:flex-row md:items-center md:px-8 md:py-6',
        'xl:px-12 xl:py-7',
        props.class
      )}
    >
      <p
        class={cn(
          'text-body leading-145 text-foreground',
          'xl:text-lead-xl xl:leading-145 xl:tracking-normal'
        )}
      >
        {props.text}
      </p>

      <Link
        href={props.ctaHref}
        variant='outline'
        size='action'
        icon={ArrowRight}
        class='shrink-0 xl:h-16 xl:rounded-lg xl:px-5.5 xl:text-lead-md xl:leading-120 xl:tracking-tight-30'
      >
        {props.ctaLabel}
      </Link>
    </div>
  );
}
