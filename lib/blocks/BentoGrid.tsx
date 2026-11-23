import ArrowUpRight from 'lucide-solid/icons/arrow-up-right';
import Check from 'lucide-solid/icons/check';
import Heart from 'lucide-solid/icons/heart';
import { For, Show, createSignal } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { Badge, type BadgeVariant } from '../components/Badge';
import { Button, type ButtonVariant } from '../components/Button';
import { cardIcon, cardSurface } from '../core/card';
import { type FillStyle, FocusRing, Transition } from '../core/control';
import { type Tone, ToneFill } from '../core/tone';
import type { IconComponent } from '../types';
import { cn } from '../utils';

/** Where the photo is anchored inside its tile, so the subject stays in frame as the tile changes shape. */
export type BentoImagePosition = 'center' | 'top' | 'bottom' | 'left' | 'right';

/** Which side the largest tile sits on. */
export type BentoGridLeadSide = 'start' | 'end';

export interface BentoAction {
  label: string;
  href: string;
  /** Defaults to white on a photo, `secondary` on a bold card and `primary` on a subtle one. */
  variant?: ButtonVariant;
}

export interface BentoImage {
  src: string;
  /** Describes the photo for screen readers. Required. */
  alt: string;
  title?: string;
  /** One or two lines under the title. */
  description?: string;
  /** A small label in the top corner: a category, a price, a status. */
  badge?: string;
  /** The badge's colour. Defaults to the grid's `variant`, then white. */
  badgeVariant?: BadgeVariant;
  /** Short check points under the description. */
  checklist?: string[];
  /** A button under the text. */
  action?: BentoAction;
  /** Where the photo is anchored. Defaults to `center`. */
  position?: BentoImagePosition;
  /** Starts the heart as saved, e.g. from the visitor's stored favourites. */
  defaultSaved?: boolean;
  /** Listed under the grid, so licences that ask for attribution are met. */
  credit?: { text: string; href?: string };
}

/**
 * A tile with no photo: a headline figure, a call to action, a short list.
 * It sits in the mosaic like a photo does, so a grid can mix both.
 */
export interface BentoCard {
  /** The card's colour. Defaults to the grid's `variant`, then `accent`. */
  variant?: Tone;
  /** `bold` is a solid card; `subtle` is a tinted one. Defaults to `bold`. */
  fillStyle?: Extract<FillStyle, 'bold' | 'subtle'>;
  icon?: IconComponent;
  badge?: string;
  /** A large figure above the title: “98%”, “12k”. */
  stat?: string;
  title: string;
  description?: string;
  checklist?: string[];
  action?: BentoAction;
  /** A photo set into the card, above the text. Shown where there is room. */
  media?: { src: string; alt: string; position?: BentoImagePosition };
  /** Credit for the `media` photo, listed under the grid. */
  credit?: { text: string; href?: string };
}

export type BentoItem = BentoImage | BentoCard;

export interface BentoGridProps {
  /** Two to six photos or cards, arranged for you; extras beyond six are ignored. */
  items: BentoItem[];
  /**
   * The colour of the photo badges and check marks, and the cards' default
   * colour. Leave it out for white badges and check marks, which suit any photo.
   */
  variant?: Tone;
  /** Defaults to `start`. */
  leadSide?: BentoGridLeadSide;
  /** Adds a heart to every photo that visitors can toggle. */
  favorites?: boolean;
  /** Called when a visitor saves or unsaves a photo. */
  onFavoriteChange?: (image: BentoImage, saved: boolean) => void;
  /** Heading level of each tile's title. Defaults to 3. */
  headingLevel?: 2 | 3 | 4;
  /** Names the group for screen readers. */
  label?: string;
  /** Hides the photo credits line. */
  hideCredits?: boolean;
  class?: string;
}

/*
 * Each tile is [column, row, columnSpan, rowSpan, wide] on a 4-column mosaic.
 * Narrower than 42rem the grid has two columns: `wide` tiles span both, the
 * rest are square. Breakpoints are container queries, so the layout follows
 * the grid's width, not the window's.
 */
type Slot = readonly [number, number, number, number, boolean];

const Slots: Record<number, readonly Slot[]> = {
  1: [[1, 1, 4, 2, true]],
  2: [
    [1, 1, 2, 2, true],
    [3, 1, 2, 2, true],
  ],
  3: [
    [1, 1, 2, 2, true],
    [3, 1, 2, 1, false],
    [3, 2, 2, 1, false],
  ],
  4: [
    [1, 1, 2, 2, true],
    [3, 1, 2, 1, true],
    [3, 2, 1, 1, false],
    [4, 2, 1, 1, false],
  ],
  5: [
    [1, 1, 2, 2, true],
    [3, 1, 1, 1, false],
    [4, 1, 1, 2, false],
    [3, 2, 1, 1, false],
    [1, 3, 4, 1, false],
  ],
  6: [
    [1, 1, 2, 2, true],
    [3, 1, 2, 1, true],
    [3, 2, 1, 1, false],
    [4, 2, 1, 2, false],
    [1, 3, 1, 1, false],
    [2, 3, 2, 1, false],
  ],
};

const Rows: Record<number, 2 | 3> = { 1: 2, 2: 2, 3: 2, 4: 2, 5: 3, 6: 3 };

// Whole class names, so Tailwind can find them.
const ColStart = [
  '',
  '@2xl:col-start-1',
  '@2xl:col-start-2',
  '@2xl:col-start-3',
  '@2xl:col-start-4',
];
const RowStart = [
  '',
  '@2xl:row-start-1',
  '@2xl:row-start-2',
  '@2xl:row-start-3',
];
const ColSpan = [
  '',
  '@2xl:col-span-1',
  '@2xl:col-span-2',
  '@2xl:col-span-3',
  '@2xl:col-span-4',
];
const RowSpan = ['', '@2xl:row-span-1', '@2xl:row-span-2'];

const GridRows = {
  2: '@2xl:grid-rows-2 @2xl:h-112 @4xl:h-136',
  3: '@2xl:grid-rows-3 @2xl:h-144 @4xl:h-176',
} as const;

const Positions: Record<BentoImagePosition, string> = {
  center: 'object-center',
  top: 'object-top',
  bottom: 'object-bottom',
  left: 'object-left',
  right: 'object-right',
};

function place([col, row, colSpan, rowSpan, wide]: Slot, mirror: boolean) {
  const start = mirror ? 6 - col - colSpan : col;

  return cn(
    wide ? 'col-span-2 aspect-4/3' : 'aspect-square',
    '@2xl:aspect-auto',
    ColStart[start],
    RowStart[row],
    ColSpan[colSpan],
    RowSpan[rowSpan]
  );
}

/**
 * Room for the description, check points and a card's photo: `full` at every
 * width, `mosaic` only in the 4-column mosaic, `none` never.
 */
type Room = 'full' | 'mosaic' | 'none';

function roomOf([, , colSpan, rowSpan, wide]: Slot): Room {
  const roomy = colSpan * rowSpan >= 2;

  if (wide && roomy) return 'full';
  return roomy ? 'mosaic' : 'none';
}

/** Text a tile has no room for stays in the page for screen readers. */
const DetailsVisibility: Record<Room, string> = {
  full: '',
  mosaic: '@max-2xl:sr-only',
  none: 'sr-only',
};

const MediaVisibility: Record<Room, string> = {
  full: '',
  mosaic: '@max-2xl:hidden',
  none: 'hidden',
};

/** The button always shows; tiles without room get the smaller size. */
const ActionSize: Record<Room, 's' | 'm'> = {
  full: 'm',
  mosaic: 's',
  none: 's',
};

const Title =
  'm-0 font-heading text-lg leading-snug font-semibold text-balance @2xl:text-xl';

/**
 * Text over a photo sits on at least 56% black, so white text keeps 4.5:1
 * even on a white photo. The scrim grows with the caption and fades out
 * above it.
 */
const Scrim = cn(
  'bg-linear-to-t from-black/72 to-black/56',
  'before:pointer-events-none before:absolute before:inset-x-0 before:bottom-full before:h-12 before:bg-linear-to-t before:from-black/56 before:to-transparent'
);

interface CardTileProps {
  card: BentoCard;
  slot: Slot;
  mirror: boolean;
  variant?: Tone;
  headingLevel: number;
}

/** A solid or tinted card, styled like the other marketing cards. */
function CardTile(props: CardTileProps) {
  const tone = (): Tone => props.card.variant ?? props.variant ?? 'accent';
  const fill = () => props.card.fillStyle ?? 'bold';
  const bold = () => fill() === 'bold';
  const room = () => roomOf(props.slot);

  return (
    <div
      class={cn(
        'relative isolate m-0 box-border flex min-h-0 flex-col gap-3 overflow-hidden rounded-2xl p-4 @2xl:p-5',
        cardSurface(tone(), fill()),
        place(props.slot, props.mirror)
      )}
    >
      <Show when={props.card.icon || props.card.badge}>
        <div class='flex items-start justify-between gap-3'>
          <Show when={props.card.icon}>
            {(icon) => (
              <span
                aria-hidden='true'
                class={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-xl',
                  cardIcon(tone(), fill())
                )}
              >
                <Dynamic component={icon()} class='size-5' />
              </span>
            )}
          </Show>
          <Show when={props.card.badge}>
            <Badge
              size='l'
              class='ml-auto'
              variant={tone()}
              fillStyle={bold() ? 'subtle' : 'bold'}
            >
              {props.card.badge}
            </Badge>
          </Show>
        </div>
      </Show>

      <Show when={props.card.media}>
        {(media) => (
          <div
            class={cn(
              'relative min-h-0 flex-1 overflow-hidden rounded-xl',
              MediaVisibility[room()]
            )}
          >
            <img
              src={media().src}
              alt={media().alt}
              loading='lazy'
              decoding='async'
              class={cn(
                'absolute inset-0 size-full object-cover',
                Positions[media().position ?? 'center']
              )}
            />
          </div>
        )}
      </Show>

      <div class='mt-auto flex flex-col gap-3'>
        <div class='flex flex-col gap-2'>
          <Show when={props.card.stat}>
            <p class='m-0 text-fluid-3xl leading-none font-semibold tracking-tight'>
              {props.card.stat}
            </p>
          </Show>

          <Dynamic component={`h${props.headingLevel}`} class={Title}>
            {props.card.title}
          </Dynamic>
        </div>

        <Show when={props.card.description || props.card.checklist?.length}>
          <div class={cn('flex flex-col gap-3', DetailsVisibility[room()])}>
            <Show when={props.card.description}>
              <p class='m-0 text-sm leading-normal text-pretty'>
                {props.card.description}
              </p>
            </Show>

            <Show when={props.card.checklist?.length}>
              <ul class='m-0 flex list-none flex-col gap-2 p-0 text-sm'>
                <For each={props.card.checklist}>
                  {(point) => (
                    <li class='flex items-center gap-2'>
                      <span
                        aria-hidden='true'
                        class={cn(
                          'flex size-5 shrink-0 items-center justify-center rounded-full',
                          cardIcon(tone(), fill())
                        )}
                      >
                        <Check class='size-3' />
                      </span>
                      {point}
                    </li>
                  )}
                </For>
              </ul>
            </Show>
          </div>
        </Show>

        <Show when={props.card.action}>
          {(action) => (
            <div>
              <Button
                href={action().href}
                size={ActionSize[room()]}
                variant={action().variant ?? (bold() ? 'secondary' : 'primary')}
                iconEnd={ArrowUpRight}
              >
                {action().label}
              </Button>
            </div>
          )}
        </Show>
      </div>
    </div>
  );
}

function isCard(item: BentoItem): item is BentoCard {
  return !('src' in item);
}

interface PhotoTileProps {
  image: BentoImage;
  slot: Slot;
  mirror: boolean;
  /** The first tile, usually on screen when the page opens: not lazy-loaded. */
  lead: boolean;
  favorites?: boolean;
  variant?: Tone;
  headingLevel: number;
  onFavoriteChange?: (image: BentoImage, saved: boolean) => void;
}

/*
 * `scheme-light` keeps a photo tile the same in a dark page: its colours are
 * static white and black, like a photo's.
 */
function PhotoTile(props: PhotoTileProps) {
  const [saved, setSaved] = createSignal(props.image.defaultSaved ?? false);
  const room = () => roomOf(props.slot);
  const hasDetails = () =>
    Boolean(props.image.description || props.image.checklist?.length);
  const hasCaption = () =>
    Boolean(props.image.title || hasDetails() || props.image.action);
  const badgeTone = () => props.image.badgeVariant ?? props.variant;

  const toggle = () => {
    const next = !saved();
    setSaved(next);
    props.onFavoriteChange?.(props.image, next);
  };

  return (
    <figure
      class={cn(
        'relative isolate m-0 min-h-0 scheme-light overflow-hidden rounded-2xl bg-black',
        place(props.slot, props.mirror)
      )}
    >
      <img
        src={props.image.src}
        alt={props.image.alt}
        loading={props.lead ? undefined : 'lazy'}
        decoding='async'
        class={cn(
          'absolute inset-0 size-full object-cover',
          Positions[props.image.position ?? 'center']
        )}
      />

      <Show when={props.image.badge}>
        <div class='absolute top-3 left-3 z-20 @2xl:top-4 @2xl:left-4'>
          <Badge
            size='l'
            fillStyle='bold'
            variant={badgeTone()}
            staticColor={badgeTone() ? undefined : 'white'}
          >
            {props.image.badge}
          </Badge>
        </div>
      </Show>

      <Show when={props.favorites}>
        <button
          type='button'
          aria-pressed={saved()}
          aria-label={`Save ${props.image.title ?? props.image.alt}`}
          onClick={toggle}
          class={cn(
            'absolute top-3 right-3 z-20 m-0 box-border inline-flex size-10 cursor-pointer items-center justify-center rounded-full border-0 bg-black/56 p-0 text-white backdrop-blur-sm hover:bg-black/72 active:bg-black/80 @2xl:top-4 @2xl:right-4',
            FocusRing,
            Transition
          )}
        >
          <Heart
            aria-hidden='true'
            class={cn(
              'size-5 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-emphasized',
              saved() && 'scale-110 fill-current'
            )}
          />
        </button>
      </Show>

      <Show when={hasCaption()}>
        <figcaption
          class={cn(
            'absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-4 text-white @2xl:p-5',
            Scrim
          )}
        >
          <Show when={props.image.title}>
            <Dynamic component={`h${props.headingLevel}`} class={Title}>
              {props.image.title}
            </Dynamic>
          </Show>

          <Show when={hasDetails()}>
            <div class={cn('flex flex-col gap-3', DetailsVisibility[room()])}>
              <Show when={props.image.description}>
                <p class='m-0 text-sm leading-normal text-pretty'>
                  {props.image.description}
                </p>
              </Show>

              <Show when={props.image.checklist?.length}>
                <ul class='m-0 flex list-none flex-col gap-2 p-0 text-sm'>
                  <For each={props.image.checklist}>
                    {(point) => (
                      <li class='flex items-center gap-2'>
                        <span
                          aria-hidden='true'
                          class={cn(
                            'flex size-5 shrink-0 items-center justify-center rounded-full',
                            props.variant
                              ? ToneFill[props.variant].bold
                              : 'bg-white text-black'
                          )}
                        >
                          <Check class='size-3' />
                        </span>
                        {point}
                      </li>
                    )}
                  </For>
                </ul>
              </Show>
            </div>
          </Show>

          <Show when={props.image.action}>
            {(action) => (
              <div>
                <Button
                  href={action().href}
                  size={ActionSize[room()]}
                  variant={action().variant ?? 'secondary'}
                  staticColor={action().variant ? undefined : 'white'}
                  iconEnd={ArrowUpRight}
                >
                  {action().label}
                </Button>
              </div>
            )}
          </Show>
        </figcaption>
      </Show>
    </figure>
  );
}

/**
 * Two to six photos, or cards mixed in with them, in a mosaic led by one
 * large tile. The arrangement follows the number of items and reflows from a
 * 4-column mosaic to two columns when the grid is narrower than 42rem.
 */
export function BentoGrid(props: BentoGridProps) {
  const items = () => props.items.slice(0, 6);
  const count = () => Math.max(items().length, 1);
  const slots = () => Slots[count()];
  const mirror = () => props.leadSide === 'end';
  const level = () => props.headingLevel ?? 3;
  const credits = () => items().filter((item) => item.credit);

  return (
    <div class={cn('@container w-full', props.class)}>
      <div
        role={props.label ? 'group' : undefined}
        aria-label={props.label}
        class={cn(
          'grid grid-cols-2 gap-3 @2xl:grid-cols-4 @2xl:gap-4',
          GridRows[Rows[count()]]
        )}
      >
        <For each={items()}>
          {(item, index) =>
            isCard(item) ? (
              <CardTile
                card={item}
                slot={slots()[index()]}
                mirror={mirror()}
                variant={props.variant}
                headingLevel={level()}
              />
            ) : (
              <PhotoTile
                image={item}
                slot={slots()[index()]}
                mirror={mirror()}
                lead={index() === 0}
                favorites={props.favorites}
                variant={props.variant}
                headingLevel={level()}
                onFavoriteChange={props.onFavoriteChange}
              />
            )
          }
        </For>
      </div>

      <Show when={!props.hideCredits && credits().length > 0}>
        <p class='m-0 mt-3 text-xs leading-normal text-foreground-muted'>
          Photos:{' '}
          <For each={credits()}>
            {(item, index) => (
              <>
                <Show when={index() > 0}>{' · '}</Show>
                <Show when={item.credit?.href} fallback={item.credit?.text}>
                  <a
                    href={item.credit?.href}
                    rel='noopener noreferrer'
                    class='text-inherit underline decoration-current/40 underline-offset-2 hover:decoration-current'
                  >
                    {item.credit?.text}
                  </a>
                </Show>
              </>
            )}
          </For>
        </p>
      </Show>
    </div>
  );
}
