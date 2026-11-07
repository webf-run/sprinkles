import { cn } from '../utils';

export interface DotTagProps {
  label: string;
  class?: string;
}

/** Outlined tag with a bullet in the highlight colour. */
export function DotTag(props: DotTagProps) {
  return (
    <span
      class={cn(
        'inline-flex items-center gap-2 rounded-xl border border-border-strong bg-surface px-3 py-2',
        'text-fluid-sm leading-120 tracking-tight-30 text-foreground',
        props.class
      )}
    >
      <span
        aria-hidden='true'
        class='size-2 shrink-0 rounded-full bg-highlight'
      />
      {props.label}
    </span>
  );
}
