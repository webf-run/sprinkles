import { For, Show } from 'solid-js';

import { cn } from '../utils';

export type SkeletonShape = 'text' | 'circle' | 'rect';

export interface SkeletonProps {
  /** `text` draws lines, `circle` an avatar or icon, `rect` an image or card. */
  shape?: SkeletonShape;
  /** Number of lines for `text`; the last one is shorter, like a paragraph. */
  lines?: number;
  /** Sets the size: `class='size-12'` for a circle, `class='h-40'` for a rect. */
  class?: string;
}

/**
 * The placeholder fill: the neutral role at 10%, so it shows on white and on
 * tinted surfaces alike (`neutral-subtle` is too faint once it pulses). It
 * pulses gently, and holds still for reduced motion.
 */
const Block = 'block bg-neutral/10 motion-safe:animate-shimmer';

/**
 * Grey shapes that stand in for content while it loads, so the layout
 * doesn't jump when it arrives. Skeletons are hidden from screen readers:
 * mark the loading region with `aria-busy='true'` instead.
 */
export function Skeleton(props: SkeletonProps) {
  const shape = () => props.shape ?? 'text';
  const lines = () => Math.max(1, Math.floor(props.lines ?? 1));

  return (
    <Show
      when={shape() === 'text'}
      fallback={
        <span
          aria-hidden='true'
          class={cn(
            Block,
            shape() === 'circle'
              ? 'size-10 rounded-full'
              : 'h-24 w-full rounded-lg',
            props.class
          )}
        />
      }
    >
      {/* Bars are 12 px with 8 px between: the 20 px rhythm of text-sm. */}
      <span
        aria-hidden='true'
        class={cn('flex w-full flex-col gap-2 py-1', props.class)}
      >
        <For each={Array.from({ length: lines() }, (_, index) => index)}>
          {(index) => (
            <span
              class={cn(
                Block,
                'h-3 rounded-sm',
                lines() > 1 && index === lines() - 1 ? 'w-3/5' : 'w-full'
              )}
            />
          )}
        </For>
      </span>
    </Show>
  );
}
