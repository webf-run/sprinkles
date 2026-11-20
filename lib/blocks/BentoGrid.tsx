import ArrowUpRight from 'lucide-solid/icons/arrow-up-right';
import Check from 'lucide-solid/icons/check';
import Heart from 'lucide-solid/icons/heart';
import { For, Show, createSignal } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { Badge, type BadgeVariant } from '../components/Badge';
import { Button, type ButtonVariant } from '../components/Button';
import { CardLift } from '../core/card';
import { FocusRing, type FillStyle, Transition } from '../core/control';
import { type Tone, ToneFill } from '../core/tone';
import type { IconComponent } from '../types';
import { cn } from '../utils';

/** Where the photo is anchored inside its tile, so the subject stays in frame as the tile changes shape. */
export type BentoImagePosition = 'center' | 'top' | 'bottom' | 'left' | 'right';

/** `start` puts the largest photo on the leading side; `end` mirrors the arrangement. */
export type BentoGridLayout = 'start' | 'end';

export interface BentoAction {
  label: string;
  href: string;
  /** Defaults to a white button, which reads on any photo. */
  variant?: ButtonVariant;
}

export interface BentoImage {
  src: string;
  /** Describes the photo for screen readers. Required. */
  alt: string;
  /** A short heading shown over the photo. */
  title?: string;
  /** One or two lines shown with the title. */
  description?: string;
  /** A small label in the top corner: a category, a price, a status. */
  badge?: string;
  badgeVariant?: BadgeVariant;
  /** Short “check points” listed over the photo. Best on the larger tiles. */
  checklist?: string[];
  /** A button over the photo. Best on the larger tiles. */
  action?: BentoAction;
  /** Where the photo is anchored. Defaults to `center`. */
  position?: BentoImagePosition;
  /** Shown under the grid, so licences that ask for attribution are met. */
  credit?: { text: string; href?: string };
}

/**
 * A solid tile with no photo: a headline figure, a call to action, a short
 * list. It sits in the mosaic like a photo does, so a grid can mix both.
 */
export interface BentoCard {
  /** The tile's colour. Defaults to the grid's `tone`, then `accent`. */
  tone?: Tone;
  /** `bold` is a solid tile; `subtle` is a tinted one. Defaults to `bold`. */
  fillStyle?: Extract<FillStyle, 'bold' | 'subtle'>;
  icon?: IconComponent;
  badge?: string;
  /** A large figure above the title: “98%”, “12k”. */
  stat?: string;
  title: string;
  description?: string;
  checklist?: string[];
  action?: BentoAction;
  /** A photo set into the card, filling the space above the text. Shown where there is room. */
  media?: { src: string; alt: string; position?: BentoImagePosition };
  /** Credit for the `media` photo, listed under the grid. */
  credit?: { text: string; href?: string };
}

export type BentoItem = BentoImage | BentoCard;

export interface BentoGridProps {
  /** Two to six photos or cards, arranged for you; extras beyond six are ignored. */
  images: BentoItem[];
  /**
   * The colour of the badges, check marks and buttons. Leave it out for the
   * basic look: white glass badges and white buttons that suit any photo.
   */
  tone?: Tone;
  /** Mirrors the arrangement. Defaults to `start`. */
  layout?: BentoGridLayout;
  /** Adds a heart on every tile that visitors can toggle. */
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
 * Each tile is [column, row, columnSpan, rowSpan, wide] on a 4-column grid
 * (md and up). `wide` tiles span the full width on a phone, where the grid is
 * two columns. Everything else is one cell.
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
  'md:col-start-1',
  'md:col-start-2',
  'md:col-start-3',
  'md:col-start-4',
];
const RowStart = ['', 'md:row-start-1', 'md:row-start-2', 'md:row-start-3'];
const ColSpan = [
  '',
  'md:col-span-1',
  'md:col-span-2',
  'md:col-span-3',
  'md:col-span-4',
];
const RowSpan = ['', 'md:row-span-1', 'md:row-span-2'];

const GridRows = {
  2: 'md:grid-rows-2 md:h-112 lg:h-136',
  3: 'md:grid-rows-3 md:h-144 lg:h-176',
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
    'md:aspect-auto',
    ColStart[start],
    RowStart[row],
    ColSpan[colSpan],
    RowSpan[rowSpan]
  );
}

/** Which tiles have room for the description, check points and button at each size. */
function detailsVisibility([, , colSpan, rowSpan, wide]: Slot) {
  const roomy = colSpan * rowSpan >= 2;

  if (wide && roomy) return '';
  if (roomy) return 'max-md:hidden';
  return 'hidden';
}

const ActionBase = cn(
  'box-border inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold whitespace-nowrap no-underline',
  'motion-safe:transition motion-safe:duration-100 motion-safe:ease-standard hover:opacity-90',
  FocusRing
);

interface ActionLinkProps {
  action: BentoAction;
  /** The grid's tone; without one, the action is a white Button. */
  tone?: Tone;
  /** Overrides the tone's colours, e.g. on a solid card. */
  look?: string;
  iconEnd: IconComponent;
}

/** The button over a tile: white by default, in the grid's tone when it has one. */
function ActionLink(props: ActionLinkProps) {
  return (
    <Show
      when={props.tone || props.look}
      fallback={
        <Button
          href={props.action.href}
          size='m'
          variant={props.action.variant ?? 'secondary'}
          staticColor={props.action.variant ? undefined : 'white'}
          iconEnd={props.iconEnd}
        >
          {props.action.label}
        </Button>
      }
    >
      <a
        href={props.action.href}
        class={cn(
          ActionBase,
          props.look ?? (props.tone ? ToneFill[props.tone].bold : undefined)
        )}
      >
        {props.action.label}
        <Dynamic component={props.iconEnd} aria-hidden='true' class='size-4' />
      </a>
    </Show>
  );
}

interface CardTileProps {
  card: BentoCard;
  slot: Slot;
  mirror: boolean;
  tone?: Tone;
  headingLevel: number;
}

function CardTile(props: CardTileProps) {
  const tone = (): Tone => props.card.tone ?? props.tone ?? 'accent';
  const fill = () => props.card.fillStyle ?? 'bold';
  const bold = () => fill() === 'bold';

  return (
    <div
      class={cn(
        'group relative isolate m-0 flex min-h-0 scheme-light flex-col gap-3 overflow-hidden rounded-2xl p-4 md:p-5',
        ToneFill[tone()][fill()],
        CardLift,
        place(props.slot, props.mirror)
      )}
    >
      <Show when={props.card.icon || props.card.badge}>
        <div class='flex items-start justify-between gap-3'>
          <Show when={props.card.icon}>
            {(icon) => (
              <span
                aria-hidden='true'
                class='flex size-10 shrink-0 items-center justify-center rounded-xl bg-current/16'
              >
                <Dynamic component={icon()} class='size-5' />
              </span>
            )}
          </Show>
          <Show when={props.card.badge}>
            <Badge
              size='l'
              class='ml-auto'
              fillStyle={bold() ? 'subtle' : 'bold'}
              variant={bold() ? undefined : tone()}
              staticColor={bold() ? 'white' : undefined}
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
              detailsVisibility(props.slot)
            )}
          >
            <img
              src={media().src}
              alt={media().alt}
              loading='lazy'
              decoding='async'
              class={cn(
                'absolute inset-0 size-full object-cover',
                Positions[media().position ?? 'center'],
                'motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-standard group-hover:scale-105'
              )}
            />
          </div>
        )}
      </Show>

      <div class='mt-auto flex flex-col gap-2'>
        <Show when={props.card.stat}>
          <p class='m-0 text-fluid-3xl leading-none font-semibold tracking-tight'>
            {props.card.stat}
          </p>
        </Show>

        <Dynamic
          component={`h${props.headingLevel}`}
          class='m-0 text-lg leading-snug font-semibold text-balance md:text-xl'
        >
          {props.card.title}
        </Dynamic>

        <Show
          when={
            props.card.description ||
            props.card.checklist?.length ||
            props.card.action
          }
        >
          <div class={cn('flex flex-col gap-3', detailsVisibility(props.slot))}>
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
                        class='flex size-5 shrink-0 items-center justify-center rounded-full bg-current/16'
                      >
                        <Check class='size-3' />
                      </span>
                      {point}
                    </li>
                  )}
                </For>
              </ul>
            </Show>

            <Show when={props.card.action}>
              {(action) => (
                <div>
                  <ActionLink
                    action={action()}
                    look={
                      bold()
                        ? 'bg-surface text-foreground-strongest'
                        : ToneFill[tone()].bold
                    }
                    iconEnd={ArrowUpRight}
                  />
                </div>
              )}
            </Show>
          </div>
        </Show>
      </div>
    </div>
  );
}

function isCard(item: BentoItem): item is BentoCard {
  return !('src' in item);
}

interface TileProps {
  image: BentoImage;
  slot: Slot;
  mirror: boolean;
  favorites?: boolean;
  tone?: Tone;
  headingLevel: number;
  onFavoriteChange?: (image: BentoImage, saved: boolean) => void;
}

function PhotoTile(props: TileProps) {
  const [saved, setSaved] = createSignal(false);
  const hasText = () => Boolean(props.image.title || props.image.description);
  const hasDetails = () =>
    Boolean(
      props.image.description ||
      props.image.checklist?.length ||
      props.image.action
    );

  const badgeTone = () => props.image.badgeVariant ?? props.tone;

  const toggle = () => {
    const next = !saved();
    setSaved(next);
    props.onFavoriteChange?.(props.image, next);
  };

  return (
    <figure
      class={cn(
        'group relative isolate m-0 min-h-0 scheme-light overflow-hidden rounded-2xl bg-black',
        'motion-safe:transition-shadow motion-safe:duration-200 motion-safe:ease-standard hover:shadow-elevated',
        place(props.slot, props.mirror)
      )}
    >
      <img
        src={props.image.src}
        alt={props.image.alt}
        loading='lazy'
        decoding='async'
        class={cn(
          'absolute inset-0 size-full object-cover',
          Positions[props.image.position ?? 'center'],
          'motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-standard',
          'group-hover:scale-105 group-focus-within:scale-105'
        )}
      />

      <Show when={hasText() || props.image.checklist || props.image.action}>
        <div
          aria-hidden='true'
          class='pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent'
        />
      </Show>

      <Show when={props.image.badge}>
        <div class='absolute top-3 left-3 z-10 md:top-4 md:left-4'>
          <Badge
            size='l'
            fillStyle={badgeTone() ? 'bold' : 'subtle'}
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
            'absolute top-3 right-3 z-10 box-border inline-flex size-10 cursor-pointer items-center justify-center rounded-full border-0 bg-black/40 p-0 text-white backdrop-blur-sm hover:bg-black/60 md:top-4 md:right-4',
            FocusRing,
            Transition
          )}
        >
          <Heart
            aria-hidden='true'
            class={cn(
              'size-5 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-emphasized',
              saved() && 'scale-110 fill-current text-negative'
            )}
          />
        </button>
      </Show>

      <Show when={hasText() || hasDetails()}>
        <figcaption class='absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-4 text-white md:p-5'>
          <Show when={props.image.title}>
            <Dynamic
              component={`h${props.headingLevel}`}
              class='m-0 text-lg leading-snug font-semibold text-balance md:text-xl'
            >
              {props.image.title}
            </Dynamic>
          </Show>

          <Show when={hasDetails()}>
            <div
              class={cn(
                'flex flex-col gap-3 overflow-hidden py-1',
                // Fine pointers see a clean photo and reveal the details on
                // hover or focus; touch screens always show them.
                'pointer-fine:max-h-0 pointer-fine:opacity-0 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-standard',
                'pointer-fine:group-hover:max-h-64 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-within:max-h-64 pointer-fine:group-focus-within:opacity-100',
                detailsVisibility(props.slot)
              )}
            >
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
                            props.tone
                              ? ToneFill[props.tone].bold
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

              <Show when={props.image.action}>
                {(action) => (
                  <div>
                    <ActionLink
                      action={action()}
                      tone={props.tone}
                      iconEnd={ArrowUpRight}
                    />
                  </div>
                )}
              </Show>
            </div>
          </Show>
        </figcaption>
      </Show>
    </figure>
  );
}

/**
 * A bento grid: two to six photos, or solid cards mixed in with them, in a mosaic where one photo is larger than
 * the rest. The arrangement is chosen from the number of images, keeps one gap
 * between every tile, and reflows from a 4-column mosaic (tablet and desktop)
 * to a 2-column stack on phones. Photos can carry a title, a badge, check
 * points and a button, and fine pointers reveal the details on hover.
 */
export function BentoGrid(props: BentoGridProps) {
  const images = () => props.images.slice(0, 6);
  const count = () => Math.max(images().length, 1);
  const slots = () => Slots[count()];
  const mirror = () => props.layout === 'end';
  const credits = () => images().filter((item) => item.credit);

  return (
    <div class={cn('w-full', props.class)}>
      <div
        role={props.label ? 'group' : undefined}
        aria-label={props.label}
        class={cn(
          'grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4',
          GridRows[Rows[count()]]
        )}
      >
        <For each={images()}>
          {(item, index) => {
            const slot = () => slots()[index()];
            const level = () => props.headingLevel ?? 3;

            return isCard(item) ? (
              <CardTile
                card={item}
                slot={slot()}
                mirror={mirror()}
                tone={props.tone}
                headingLevel={level()}
              />
            ) : (
              <PhotoTile
                image={item}
                slot={slot()}
                mirror={mirror()}
                favorites={props.favorites}
                tone={props.tone}
                headingLevel={level()}
                onFavoriteChange={props.onFavoriteChange}
              />
            );
          }}
        </For>
      </div>

      <Show when={!props.hideCredits && credits().length > 0}>
        <p class='m-0 mt-3 text-xs leading-normal text-foreground-muted'>
          Photos:{' '}
          <For each={credits()}>
            {(image, index) => (
              <>
                <Show when={index() > 0}>{' · '}</Show>
                <Show when={image.credit?.href} fallback={image.credit?.text}>
                  <a
                    href={image.credit?.href}
                    rel='noopener noreferrer'
                    class='text-inherit underline-offset-2 hover:underline'
                  >
                    {image.credit?.text}
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
