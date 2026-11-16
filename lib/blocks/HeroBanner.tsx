import ArrowRight from 'lucide-solid/icons/arrow-right';
import { type JSX, Show, children, createUniqueId } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { Button, type ButtonVariant } from '../components/Button';
import type { StaticColor } from '../core/control';
import { cn } from '../utils';

/**
 * The colour of the band over the photo. Each one is a semantic role, so a
 * site that re-skins its tokens re-skins its banners too.
 * - `inverse`: the default dark band (education, corporate).
 * - `neutral`: charcoal, so the photo does the talking (travel, media).
 * - `positive`: green (charities, health, the environment).
 * - `informative`: blue (finance, public services, clinics).
 * - `indigo`: deep indigo (software, technology).
 * - `highlight`: the warm second emphasis colour, with dark text (food, retail, events).
 * - `light`: a pale band with dark text (wellness, family, lifestyle).
 */
export type HeroBannerVariant =
  | 'inverse'
  | 'neutral'
  | 'positive'
  | 'informative'
  | 'indigo'
  | 'highlight'
  | 'light';

/** `start` puts the text on the leading side, over the calm half of the photo; `center` centres it over the whole photo. */
export type HeroBannerAlign = 'start' | 'center';

/** `overlay` keeps content over the photo; `split` gives the image its own column. */
export type HeroBannerLayout = 'overlay' | 'split';

interface Look {
  /** The band's colour behind the photo, and the colour tokens it resolves in. */
  root: string;
  /** The overlay when the text sits at the start: solid behind the text, clear over the photo. */
  scrimStart: string;
  /** The overlay when the text is centred: even, so every line stays readable. */
  scrimCenter: string;
  /** Title, description and items. */
  text: string;
  primary: { variant?: ButtonVariant; staticColor?: StaticColor };
  secondary: { variant?: ButtonVariant; staticColor?: StaticColor };
}

/*
 * Class names are spelled out in full so Tailwind finds them. Every banner
 * is `scheme-light`: a banner looks the same in the light and the dark
 * scheme, like the photo behind it. Phones get a vertical overlay, because
 * text spans the whole photo there; from `md` it fades from the start side.
 */
const Looks: Record<HeroBannerVariant, Look> = {
  inverse: {
    root: 'scheme-light bg-surface-inverse',
    scrimStart:
      'bg-linear-to-t from-surface-inverse/95 via-surface-inverse/85 to-surface-inverse/80 md:bg-linear-to-r md:from-surface-inverse md:via-surface-inverse/85 md:via-40% md:to-transparent md:to-85%',
    scrimCenter: 'bg-surface-inverse/80',
    text: 'text-foreground-inverse',
    primary: { variant: 'highlight' },
    secondary: { variant: 'secondary', staticColor: 'white' },
  },
  neutral: {
    root: 'scheme-light bg-neutral',
    scrimStart:
      'bg-linear-to-t from-neutral/95 via-neutral/80 to-neutral/60 md:bg-linear-to-r md:from-neutral/95 md:via-neutral/80 md:via-50% md:to-neutral/30',
    scrimCenter: 'bg-neutral/70',
    text: 'text-neutral-foreground',
    primary: { variant: 'secondary', staticColor: 'white' },
    secondary: { variant: 'secondary', staticColor: 'white' },
  },
  positive: {
    root: 'scheme-light bg-positive',
    scrimStart:
      'bg-linear-to-t from-positive/95 via-positive/85 to-positive/80 md:bg-linear-to-r md:from-positive md:via-positive/85 md:via-40% md:to-transparent md:to-85%',
    scrimCenter: 'bg-positive/85',
    text: 'text-positive-foreground',
    primary: { variant: 'highlight' },
    secondary: { variant: 'secondary', staticColor: 'white' },
  },
  informative: {
    root: 'scheme-light bg-informative',
    scrimStart:
      'bg-linear-to-t from-informative/95 via-informative/85 to-informative/80 md:bg-linear-to-r md:from-informative md:via-informative/85 md:via-40% md:to-transparent md:to-85%',
    scrimCenter: 'bg-informative/85',
    text: 'text-informative-foreground',
    primary: { variant: 'secondary', staticColor: 'white' },
    secondary: { variant: 'secondary', staticColor: 'white' },
  },
  indigo: {
    root: 'scheme-light bg-indigo',
    scrimStart:
      'bg-linear-to-t from-indigo/95 via-indigo/85 to-indigo/80 md:bg-linear-to-r md:from-indigo md:via-indigo/85 md:via-40% md:to-transparent md:to-85%',
    scrimCenter: 'bg-indigo/80',
    text: 'text-indigo-foreground',
    primary: { variant: 'secondary', staticColor: 'white' },
    secondary: { variant: 'secondary', staticColor: 'white' },
  },
  highlight: {
    root: 'scheme-light bg-highlight',
    scrimStart:
      'bg-linear-to-t from-highlight/95 via-highlight/90 to-highlight/85 md:bg-linear-to-r md:from-highlight md:via-highlight/90 md:via-40% md:to-transparent md:to-85%',
    scrimCenter: 'bg-highlight/90',
    text: 'text-highlight-foreground',
    primary: { variant: 'secondary', staticColor: 'black' },
    secondary: { variant: 'secondary', staticColor: 'black' },
  },
  light: {
    root: 'scheme-light bg-surface',
    scrimStart:
      'bg-linear-to-t from-surface/95 via-surface/90 to-surface/80 md:bg-linear-to-r md:from-surface md:via-surface/90 md:via-40% md:to-transparent md:to-85%',
    scrimCenter: 'bg-surface/85',
    text: 'text-foreground-strongest',
    primary: { variant: 'accent' },
    secondary: { variant: 'accent' },
  },
};

export interface HeroBannerAction {
  label: string;
  href: string;
}

export interface HeroBannerProps {
  /** URL of the banner photo, shown behind the content. It is decorative: the title says what the page is about. */
  image: string;
  /** Optional short label that sets the context for the banner. */
  eyebrow?: string;
  title: string;
  description?: string;
  /** @deprecated Accepted for compatibility, but no longer displayed. Put the useful details in `description`. */
  items?: string[];
  primaryAction: HeroBannerAction;
  secondaryAction?: HeroBannerAction;
  /** The colour of the band over the photo. Defaults to `inverse`. */
  variant?: HeroBannerVariant;
  /** Where the text sits. Defaults to `start`. */
  align?: HeroBannerAlign;
  /** Layout for the photo and copy. Defaults to `overlay` to preserve the classic hero. */
  layout?: HeroBannerLayout;
  /** Heading level of the title, to fit the page's outline. */
  headingLevel?: 1 | 2;
  /** Content that overlaps the banner's bottom edge, such as a row of `StatCard`s. */
  children?: JSX.Element;
  /** A panel in the hero's right column, over the photo in either layout. */
  mediaContent?: JSX.Element;
  class?: string;
}

/**
 * A large photo with a title, an informative description and one or two
 * buttons. The default overlay uses a coloured scrim for readable text; the
 * split layout gives the image and copy separate columns. `mediaContent` can
 * add a panel in the right column. `variant` picks the band's colour and
 * `align` where the text sits.
 */
export function HeroBanner(props: HeroBannerProps) {
  // Resolved once: Show reads it twice, and JSX passed in is created per read.
  const overlap = children(() => props.children);
  const mediaContent = children(() => props.mediaContent);
  const titleId = `hero-banner-${createUniqueId()}`;
  const look = () => Looks[props.variant ?? 'inverse'];
  const centered = () => props.align === 'center';
  const split = () => props.layout === 'split';

  return (
    <div class={cn('relative w-full', props.class)}>
      <section
        aria-labelledby={titleId}
        class={cn(
          'relative overflow-hidden',
          look().root,
          split()
            ? 'grid md:min-h-112 md:grid-cols-2'
            : mediaContent() && 'md:grid md:min-h-112 md:grid-cols-2'
        )}
      >
        <img
          src={props.image}
          alt=''
          decoding='async'
          fetchpriority='high'
          class={cn(
            'object-cover',
            split()
              ? cn(
                  'relative w-full md:absolute md:inset-y-0 md:right-0 md:h-full md:w-1/2',
                  mediaContent() ? 'h-96' : 'h-64'
                )
              : 'absolute inset-0 size-full'
          )}
        />
        <Show when={split() && mediaContent()}>
          <div class='absolute inset-x-4 top-6 z-10 flex items-center justify-center md:inset-y-0 md:left-1/2 md:right-0 md:px-6 md:py-8'>
            {mediaContent()}
          </div>
        </Show>
        <Show when={!split() && mediaContent()}>
          <div class='relative z-10 mx-auto w-full max-w-7xl min-w-0 px-4 pb-8 sm:px-6 md:col-start-2 md:row-start-1 md:flex md:items-center md:justify-center md:px-8 md:py-8 md:pb-8 lg:px-8'>
            {mediaContent()}
          </div>
        </Show>
        <Show when={!split()}>
          <div
            aria-hidden='true'
            class={cn(
              'absolute inset-0',
              centered() ? look().scrimCenter : look().scrimStart
            )}
          />
        </Show>

        <div
          class={cn(
            'relative mx-auto flex w-full max-w-7xl flex-col px-4 pt-16 sm:px-6 md:pt-24 lg:px-8',
            split() && 'md:col-start-1 md:row-start-1 md:pr-12',
            centered() ? 'items-center text-center' : 'items-start',
            overlap() ? 'pb-32 md:pb-40' : 'pb-16 md:pb-24'
          )}
        >
          <Show when={props.eyebrow}>
            <span
              class={cn(
                'mb-4 font-sans text-sm font-semibold tracking-widest uppercase',
                look().text
              )}
            >
              {props.eyebrow}
            </span>
          </Show>
          <Dynamic
            component={`h${props.headingLevel ?? 1}`}
            id={titleId}
            class={cn(
              'm-0 max-w-3xl font-heading text-fluid-5xl font-semibold text-balance',
              look().text
            )}
          >
            {props.title}
          </Dynamic>

          <Show when={props.description}>
            <p
              class={cn(
                'm-0 mt-5 max-w-xl text-fluid-lg leading-relaxed text-pretty',
                look().text
              )}
            >
              {props.description}
            </p>
          </Show>

          <div
            class={cn(
              'mt-10 flex flex-wrap gap-3',
              centered() && 'justify-center'
            )}
          >
            <Button
              href={props.primaryAction.href}
              size='xl'
              variant={look().primary.variant}
              staticColor={look().primary.staticColor}
              iconEnd={ArrowRight}
            >
              {props.primaryAction.label}
            </Button>
            <Show when={props.secondaryAction}>
              {(action) => (
                <Button
                  href={action().href}
                  size='xl'
                  variant={look().secondary.variant}
                  fillStyle='outline'
                  staticColor={look().secondary.staticColor}
                >
                  {action().label}
                </Button>
              )}
            </Show>
          </div>
        </div>
      </section>

      <Show when={overlap()}>
        <div class='relative z-10 mx-auto -mt-20 w-full max-w-7xl px-4 sm:px-6 md:-mt-24 lg:px-8'>
          {overlap()}
        </div>
      </Show>
    </div>
  );
}
