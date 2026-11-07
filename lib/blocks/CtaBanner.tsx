import ArrowRight from 'lucide-solid/icons/arrow-right';

import { Button } from '../components/Button';
import { cn } from '../utils';

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
        'flex w-full flex-col items-start justify-between gap-4 rounded-2xl border border-accent bg-surface p-5 shadow-elevated',
        'md:flex-row md:items-center md:px-8 md:py-6',
        'xl:px-12 xl:py-7',
        props.class
      )}
    >
      <p class='m-0 text-fluid-md leading-145 tracking-normal text-foreground xl:text-fluid-lg xl:leading-145'>
        {props.text}
      </p>

      <Button
        href={props.ctaHref}
        fillStyle='outline'
        size='xl'
        iconEnd={ArrowRight}
        class='shrink-0'
      >
        {props.ctaLabel}
      </Button>
    </div>
  );
}
