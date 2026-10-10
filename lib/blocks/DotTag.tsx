import { Dot } from '../icons/Dot';
import { cn } from '../utils';

export interface DotTagProps {
  label: string;
  class?: string;
}

/** Outlined tag with an orange bullet. */
export function DotTag(props: DotTagProps) {
  return (
    <span
      class={cn(
        'inline-flex items-center gap-2.5 rounded-badge-outline border-[0.5px] border-foreground bg-surface p-2.5',
        'leading-120 tracking-tight-30 text-foreground',
        'md:text-card-tag-md',
        props.class
      )}
    >
      <Dot class='shrink-0' />
      {props.label}
    </span>
  );
}
