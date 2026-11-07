import { type JSX, Show, children, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { FocusRing } from '../core/control';
import { cn } from '../utils';

const CardBase =
  'box-border flex min-w-0 flex-col gap-4 rounded-2xl border border-border-muted bg-surface py-6 text-foreground';

/** A linked card answers the pointer as a whole: a stronger edge and a lift on hover, a tint while pressed. */
const CardLink = [
  'cursor-pointer no-underline hover:border-border hover:shadow-elevated active:bg-surface-muted active:shadow-none',
  'motion-safe:transition motion-safe:duration-200 motion-safe:ease-standard',
  FocusRing,
].join(' ');

export interface CardProps {
  /** The element for an unlinked card: `article` for self-contained content, `li` inside a list of cards. */
  as?: 'div' | 'article' | 'section' | 'li';
  /** Lifts the card off the page with the `elevated` shadow. */
  elevated?: boolean;
  /** Makes the whole card one link. Don't put buttons or other links inside a linked card. */
  href?: string;
  target?: string;
  rel?: string;
  /** Names a linked card when its text alone would be too long to hear as a link. */
  'aria-label'?: string;
  id?: string;
  class?: string;
  children?: JSX.Element;
}

/**
 * A surface that groups one subject: a summary, a setting, a shortcut.
 * Compose `CardHeader`, `CardBody` and `CardFooter` inside; each is padded,
 * and the card spaces them evenly.
 */
export function Card(props: CardProps) {
  const [local, rest] = splitProps(props, [
    'as',
    'elevated',
    'href',
    'class',
    'children',
  ]);
  const classes = () =>
    cn(
      CardBase,
      local.elevated && 'shadow-elevated',
      local.href !== undefined && CardLink,
      local.class
    );

  return (
    <Show
      when={local.href !== undefined}
      fallback={
        <Dynamic component={local.as ?? 'div'} {...rest} class={classes()}>
          {local.children}
        </Dynamic>
      }
    >
      <a {...rest} href={local.href} class={classes()}>
        {local.children}
      </a>
    </Show>
  );
}

export interface CardHeaderProps {
  title?: JSX.Element;
  description?: JSX.Element;
  /** Buttons or a menu at the header's end. Not for linked cards. */
  actions?: JSX.Element;
  /** Heading level of the title, to fit the page's outline. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  class?: string;
  /** Anything else under the title and description (badges, meta). */
  children?: JSX.Element;
}

/** Title, description and actions, in a row. */
export function CardHeader(props: CardHeaderProps) {
  // Each slot is resolved once, so JSX passed in is created once.
  const title = children(() => props.title);
  const description = children(() => props.description);
  const actions = children(() => props.actions);

  return (
    <div class={cn('flex items-start gap-4 px-6', props.class)}>
      <div class='flex min-w-0 flex-1 flex-col gap-1'>
        <Show when={title()}>
          <Dynamic
            component={`h${props.headingLevel ?? 3}`}
            class='m-0 text-base leading-snug font-semibold text-foreground-strongest'
          >
            {title()}
          </Dynamic>
        </Show>
        <Show when={description()}>
          <p class='m-0 text-sm text-foreground-muted'>{description()}</p>
        </Show>
        {props.children}
      </div>
      <Show when={actions()}>
        {/* `-my-1`: an M button (32 px) centres on the title's line. */}
        <div class='-my-1 flex shrink-0 items-center gap-2'>{actions()}</div>
      </Show>
    </div>
  );
}

export interface CardBodyProps {
  class?: string;
  children?: JSX.Element;
}

/** The card's content. */
export function CardBody(props: CardBodyProps) {
  return (
    <div class={cn('min-w-0 px-6 text-sm', props.class)}>{props.children}</div>
  );
}

export interface CardFooterProps {
  class?: string;
  children?: JSX.Element;
}

/** Actions or meta at the bottom, laid out in a row. */
export function CardFooter(props: CardFooterProps) {
  return (
    <div class={cn('flex flex-wrap items-center gap-3 px-6', props.class)}>
      {props.children}
    </div>
  );
}
