import ArrowRight from 'lucide-solid/icons/arrow-right';
import { type JSX, Show, children, createUniqueId } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { Badge, type BadgeVariant } from '../components/Badge';
import { Button, type ButtonVariant } from '../components/Button';
import type { StaticColor } from '../core/control';
import { cn } from '../utils';

/** Colour treatments for photo-led hero banners. */
export type HeroBannerVariant =
  | 'inverse'
  | 'neutral'
  | 'positive'
  | 'informative'
  | 'indigo'
  | 'purple'
  | 'highlight'
  | 'light';

/** `start` puts the text on the leading side; `center` centres it over the whole photo. */
export type HeroBannerAlign = 'start' | 'center';
/** Which side of a split banner holds the copy. */
export type HeroBannerContentSide = 'start' | 'end';
/** How the photo fills its frame. */
export type HeroBannerImageFit = 'cover' | 'contain';
/** Where the photo is anchored inside its frame. */
export type HeroBannerImagePosition = 'center' | 'left' | 'right' | 'top';

/**
 * `overlay` keeps content over the photo; `split` gives the image its own
 * column and fades it into the band; `framed` puts the photo in its own
 * rounded panel beside the copy, with a clean edge and no fade.
 */
export type HeroBannerLayout = 'overlay' | 'split' | 'framed';

interface Look {
  root: string;
  scrimStart: string;
  scrimCenter: string;
  text: string;
  primary: { variant?: ButtonVariant; staticColor?: StaticColor };
  secondary: { variant?: ButtonVariant; staticColor?: StaticColor };
}

/*
 * Editorial palettes pair cool blues, rich purple and warm amber accents.
 * Every colour comes from a semantic or categorical token, so a site's theme
 * restyles the banners without any change here.
 */
const Looks: Record<HeroBannerVariant, Look> = {
  inverse: {
    root: 'scheme-light bg-surface-inverse',
    scrimStart:
      'bg-linear-to-t from-surface-inverse/98 via-surface-inverse/88 to-surface-inverse/65 md:bg-linear-to-r md:from-surface-inverse md:via-surface-inverse/90 md:via-45% md:to-transparent md:to-95%',
    scrimCenter: 'bg-surface-inverse/72',
    text: 'text-foreground-inverse',
    primary: { variant: 'secondary', staticColor: 'white' },
    secondary: { variant: 'secondary', staticColor: 'white' },
  },
  neutral: {
    root: 'scheme-light bg-neutral',
    scrimStart:
      'bg-linear-to-t from-neutral/98 via-neutral/88 to-neutral/65 md:bg-linear-to-r md:from-neutral md:via-neutral/90 md:via-45% md:to-transparent md:to-95%',
    scrimCenter: 'bg-neutral/75',
    text: 'text-neutral-foreground',
    primary: { variant: 'secondary', staticColor: 'white' },
    secondary: { variant: 'secondary', staticColor: 'white' },
  },
  positive: {
    root: 'scheme-light bg-positive',
    scrimStart:
      'bg-linear-to-t from-positive/98 via-positive/88 to-positive/65 md:bg-linear-to-r md:from-positive md:via-positive/90 md:via-45% md:to-transparent md:to-95%',
    scrimCenter: 'bg-positive/78',
    text: 'text-positive-foreground',
    primary: { variant: 'secondary', staticColor: 'white' },
    secondary: { variant: 'secondary', staticColor: 'white' },
  },
  informative: {
    root: 'scheme-light bg-informative',
    scrimStart:
      'bg-linear-to-t from-informative/98 via-informative/88 to-informative/65 md:bg-linear-to-r md:from-informative md:via-informative/90 md:via-45% md:to-transparent md:to-95%',
    scrimCenter: 'bg-informative/78',
    text: 'text-informative-foreground',
    primary: { variant: 'secondary', staticColor: 'white' },
    secondary: { variant: 'secondary', staticColor: 'white' },
  },
  indigo: {
    root: 'scheme-light bg-indigo',
    scrimStart:
      'bg-linear-to-t from-indigo/98 via-indigo/88 to-indigo/65 md:bg-linear-to-r md:from-indigo md:via-indigo/90 md:via-45% md:to-transparent md:to-95%',
    scrimCenter: 'bg-indigo/78',
    text: 'text-indigo-foreground',
    primary: { variant: 'secondary', staticColor: 'white' },
    secondary: { variant: 'secondary', staticColor: 'white' },
  },
  purple: {
    root: 'scheme-light bg-purple',
    scrimStart:
      'bg-linear-to-t from-purple/98 via-purple/88 to-purple/65 md:bg-linear-to-r md:from-purple md:via-purple/90 md:via-45% md:to-transparent md:to-95%',
    scrimCenter: 'bg-purple/78',
    text: 'text-purple-foreground',
    primary: { variant: 'secondary', staticColor: 'white' },
    secondary: { variant: 'secondary', staticColor: 'white' },
  },
  highlight: {
    root: 'scheme-light bg-highlight-subtle',
    scrimStart:
      'bg-linear-to-t from-highlight-subtle/98 via-highlight-subtle/92 to-highlight-subtle/75 md:bg-linear-to-r md:from-highlight-subtle md:via-highlight-subtle/92 md:via-45% md:to-transparent md:to-95%',
    scrimCenter:
      'bg-radial from-highlight-subtle/95 via-highlight-subtle/85 via-55% to-highlight-subtle/35',
    text: 'text-foreground-strongest',
    primary: { variant: 'highlight' },
    secondary: { variant: 'secondary' },
  },
  light: {
    root: 'scheme-light bg-surface-muted',
    scrimStart:
      'bg-linear-to-t from-surface-muted/98 via-surface-muted/92 to-surface-muted/75 md:bg-linear-to-r md:from-surface-muted md:via-surface-muted/95 md:via-45% md:to-transparent md:to-95%',
    scrimCenter: 'bg-surface-muted/88',
    text: 'text-foreground-strongest',
    primary: { variant: 'accent' },
    secondary: { variant: 'accent' },
  },
};

/*
 * In split banners, the photo fades into the band's surface.
 */
const SplitScrims: Record<HeroBannerVariant, { start: string; end: string }> = {
  informative: {
    start:
      'bg-linear-to-b from-transparent via-transparent to-informative-subtle md:bg-linear-to-r md:from-informative-subtle md:via-informative-subtle/95 md:via-42% md:to-transparent md:to-70%',
    end: 'bg-linear-to-b from-transparent via-transparent to-informative-subtle md:bg-linear-to-l md:from-informative-subtle md:via-informative-subtle/95 md:via-42% md:to-transparent md:to-70%',
  },
  positive: {
    start:
      'bg-linear-to-b from-transparent via-transparent to-positive-subtle md:bg-linear-to-r md:from-positive-subtle md:via-positive-subtle/95 md:via-42% md:to-transparent md:to-70%',
    end: 'bg-linear-to-b from-transparent via-transparent to-positive-subtle md:bg-linear-to-l md:from-positive-subtle md:via-positive-subtle/95 md:via-42% md:to-transparent md:to-70%',
  },
  indigo: {
    start:
      'bg-linear-to-b from-transparent via-transparent to-indigo-subtle md:bg-linear-to-r md:from-indigo-subtle md:via-indigo-subtle/95 md:via-42% md:to-transparent md:to-70%',
    end: 'bg-linear-to-b from-transparent via-transparent to-indigo-subtle md:bg-linear-to-l md:from-indigo-subtle md:via-indigo-subtle/95 md:via-42% md:to-transparent md:to-70%',
  },
  purple: {
    start:
      'bg-linear-to-b from-transparent via-transparent to-purple-subtle md:bg-linear-to-r md:from-purple-subtle md:via-purple-subtle/95 md:via-42% md:to-transparent md:to-70%',
    end: 'bg-linear-to-b from-transparent via-transparent to-purple-subtle md:bg-linear-to-l md:from-purple-subtle md:via-purple-subtle/95 md:via-42% md:to-transparent md:to-70%',
  },
  highlight: {
    start:
      'bg-linear-to-b from-transparent via-transparent to-highlight-subtle md:bg-linear-to-r md:from-highlight-subtle md:via-highlight-subtle/95 md:via-42% md:to-transparent md:to-70%',
    end: 'bg-linear-to-b from-transparent via-transparent to-highlight-subtle md:bg-linear-to-l md:from-highlight-subtle md:via-highlight-subtle/95 md:via-42% md:to-transparent md:to-70%',
  },
  inverse: {
    start:
      'bg-linear-to-b from-transparent via-transparent to-surface-muted md:bg-linear-to-r md:from-surface-muted md:via-surface-muted/95 md:via-42% md:to-transparent md:to-70%',
    end: 'bg-linear-to-b from-transparent via-transparent to-surface-muted md:bg-linear-to-l md:from-surface-muted md:via-surface-muted/95 md:via-42% md:to-transparent md:to-70%',
  },
  neutral: {
    start:
      'bg-linear-to-b from-transparent via-transparent to-surface-muted md:bg-linear-to-r md:from-surface-muted md:via-surface-muted/95 md:via-42% md:to-transparent md:to-70%',
    end: 'bg-linear-to-b from-transparent via-transparent to-surface-muted md:bg-linear-to-l md:from-surface-muted md:via-surface-muted/95 md:via-42% md:to-transparent md:to-70%',
  },
  light: {
    start:
      'bg-linear-to-b from-transparent via-transparent to-surface-muted md:bg-linear-to-r md:from-surface-muted md:via-surface-muted/95 md:via-42% md:to-transparent md:to-70%',
    end: 'bg-linear-to-b from-transparent via-transparent to-surface-muted md:bg-linear-to-l md:from-surface-muted md:via-surface-muted/95 md:via-42% md:to-transparent md:to-70%',
  },
};

export interface HeroBannerAction {
  label: string;
  href: string;
}

export interface HeroBannerProps {
  /** URL of the banner photo, shown behind the content. It is decorative. */
  image: string;
  imageFit?: HeroBannerImageFit;
  imagePosition?: HeroBannerImagePosition;
  /** Optional colour wash for the photo. */
  imageTone?: 'natural' | 'cool' | 'warm' | 'purple';
  /**
   * How far the colour wash behind the copy reaches into the photo.
   * `soft` keeps more of the photo clear, for pictures that should be seen,
   * and narrows the copy to under half the banner to match.
   */
  scrim?: 'default' | 'soft';
  eyebrow?: string;
  eyebrowVariant?: BadgeVariant;
  title: string;
  description?: string;
  /** @deprecated Accepted for compatibility, but no longer displayed. */
  items?: string[];
  primaryAction: HeroBannerAction;
  secondaryAction?: HeroBannerAction;
  /** The colour of the band over the photo. Defaults to `inverse`. */
  variant?: HeroBannerVariant;
  align?: HeroBannerAlign;
  contentSide?: HeroBannerContentSide;
  layout?: HeroBannerLayout;
  headingLevel?: 1 | 2;
  children?: JSX.Element;
  mediaContent?: JSX.Element;
  bottomContent?: JSX.Element;
  note?: string;
  fullWidth?: boolean;
  imageCredit?: { text: string; href?: string };
  class?: string;
}

/**
 * A photo-led hero with a clear title, useful description and one or two
 * actions. Rounded framing, a soft gradient and a restrained colour wash
 * keep the image expressive while preserving legibility.
 */
export function HeroBanner(props: HeroBannerProps) {
  const overlap = children(() => props.children);
  const mediaContent = children(() => props.mediaContent);
  const bottomContent = children(() => props.bottomContent);
  const titleId = `hero-banner-${createUniqueId()}`;

  const look = () => Looks[props.variant ?? 'inverse'];
  const centered = () => props.align === 'center';
  const framed = () => props.layout === 'framed';
  const split = () => props.layout === 'split' || framed();
  const contentEnd = () => props.contentSide === 'end';

  const paleBand = () =>
    split() || props.variant === 'light' || props.variant === 'highlight';

  const splitSurface = () => {
    switch (props.variant) {
      case 'informative':
        return 'bg-informative-subtle';
      case 'positive':
        return 'bg-positive-subtle';
      case 'indigo':
        return 'bg-indigo-subtle';
      case 'purple':
        return 'bg-purple-subtle';
      case 'highlight':
        return 'bg-highlight-subtle';
      default:
        return 'bg-surface-muted';
    }
  };

  const splitScrim = () => {
    const scrims = SplitScrims[props.variant ?? 'inverse'];
    return contentEnd() ? scrims.end : scrims.start;
  };

  const splitPrimary = (): ButtonVariant => {
    if (props.variant === 'highlight') return 'highlight';
    if (props.variant === 'positive' || framed()) return 'primary';
    return 'accent';
  };

  const overlayScrim = () => {
    let scrim = look().scrimStart;

    if (props.scrim === 'soft') {
      scrim = scrim
        .replace('md:via-45%', 'md:via-40%')
        .replace('md:to-95%', 'md:to-64%');
    }

    return contentEnd()
      ? scrim.replace('md:bg-linear-to-r', 'md:bg-linear-to-l')
      : scrim;
  };

  const imageToneOverlay = () => {
    switch (props.imageTone) {
      case 'warm':
        return 'bg-linear-to-br from-highlight/30 via-notice/15 to-highlight/25';
      case 'cool':
        return 'bg-linear-to-br from-informative/35 via-indigo/20 to-informative/30';
      case 'purple':
        return 'bg-linear-to-br from-purple/60 via-accent/35 to-purple/55';
      default:
        return undefined;
    }
  };

  const copy = () => (
    <>
      <Show when={props.eyebrow}>
        <Badge
          variant={
            props.eyebrowVariant ??
            (paleBand()
              ? props.variant === 'highlight'
                ? 'notice'
                : 'informative'
              : undefined)
          }
          staticColor={props.eyebrowVariant || paleBand() ? undefined : 'white'}
          fillStyle='subtle'
          size='l'
          class='mb-6 border-current/25 tracking-wide backdrop-blur-md'
        >
          {props.eyebrow}
        </Badge>
      </Show>

      <Dynamic
        component={`h${props.headingLevel ?? 1}`}
        id={titleId}
        class={cn(
          'm-0 max-w-3xl font-heading text-fluid-5xl font-semibold tracking-tight text-balance',
          split() ? 'text-foreground-strongest' : look().text
        )}
      >
        {props.title}
      </Dynamic>

      <Show when={props.description}>
        <p
          class={cn(
            'm-0 mt-6 max-w-xl text-fluid-lg leading-relaxed text-pretty',
            split() ? 'text-foreground' : look().text
          )}
        >
          {props.description}
        </p>
      </Show>

      <div
        class={cn(
          'mt-9 flex flex-wrap gap-3',
          centered() && !split() && 'justify-center'
        )}
      >
        <Button
          href={props.primaryAction.href}
          size='xl'
          variant={split() ? splitPrimary() : look().primary.variant}
          staticColor={split() ? undefined : look().primary.staticColor}
          iconEnd={ArrowRight}
        >
          {props.primaryAction.label}
        </Button>

        <Show when={props.secondaryAction}>
          {(action) => (
            <Button
              href={action().href}
              size='xl'
              variant={split() ? 'secondary' : look().secondary.variant}
              fillStyle='outline'
              staticColor={split() ? undefined : look().secondary.staticColor}
            >
              {action().label}
            </Button>
          )}
        </Show>
      </div>

      <Show when={props.note}>
        <p
          class={cn(
            'm-0 mt-4 text-sm',
            split() ? 'text-foreground-muted' : cn(look().text, 'opacity-80')
          )}
        >
          {props.note}
        </p>
      </Show>
    </>
  );

  const credit = (position: string) => (
    <Show when={props.imageCredit}>
      {(item) => (
        <p
          class={cn(
            'absolute z-20 m-0 rounded-full bg-surface-inverse/70 px-3 py-1 text-xs text-foreground-inverse backdrop-blur-sm',
            position
          )}
        >
          <Show when={item().href} fallback={item().text}>
            <a
              href={item().href}
              rel='noopener noreferrer'
              class='text-inherit underline-offset-2 hover:underline'
            >
              {item().text}
            </a>
          </Show>
        </p>
      )}
    </Show>
  );

  const framedSection = () => (
    <section
      aria-labelledby={titleId}
      class={cn(
        'scheme-light relative isolate grid overflow-hidden md:grid-cols-2',
        splitSurface(),
        props.fullWidth
          ? 'rounded-none'
          : 'rounded-3xl shadow-xl shadow-neutral/10'
      )}
    >
      <div
        class={cn(
          'relative z-10 flex flex-col items-start justify-center px-6 py-10 sm:px-10 md:px-12 md:py-14 lg:px-16',
          contentEnd() && 'md:col-start-2 md:row-start-1'
        )}
      >
        {copy()}
      </div>

      <div
        class={cn(
          'relative m-3 min-h-80 overflow-hidden rounded-2xl md:m-4 md:min-h-112',
          contentEnd() && 'md:col-start-1 md:row-start-1'
        )}
      >
        <img
          src={props.image}
          alt=''
          decoding='async'
          fetchpriority='high'
          class={cn(
            'absolute inset-0 size-full',
            props.imageFit === 'contain' ? 'object-contain' : 'object-cover',
            props.imagePosition === 'left' && 'object-left',
            props.imagePosition === 'right' && 'object-right',
            props.imagePosition === 'top' && 'object-top'
          )}
        />

        <Show when={imageToneOverlay()}>
          <div
            aria-hidden='true'
            class={cn(
              'pointer-events-none absolute inset-0 mix-blend-multiply',
              imageToneOverlay()
            )}
          />
        </Show>

        <Show when={mediaContent()}>
          <div class='absolute inset-x-0 bottom-0 z-10 flex justify-center p-3 sm:p-4 md:justify-end'>
            {mediaContent()}
          </div>
        </Show>

        {credit('top-3 right-3')}
      </div>
    </section>
  );

  return (
    <div class={cn('relative w-full', props.class)}>
      <Show when={!framed()} fallback={framedSection()}>
        <section
          aria-labelledby={titleId}
          class={cn(
            'relative isolate overflow-hidden',
            props.fullWidth
              ? 'rounded-none'
              : 'rounded-3xl shadow-xl shadow-neutral/10',
            split()
              ? cn('scheme-light grid min-h-112 md:grid-cols-2', splitSurface())
              : cn(look().root, 'min-h-112')
          )}
        >
          <img
            src={props.image}
            alt=''
            decoding='async'
            fetchpriority='high'
            class={cn(
              props.imageFit === 'contain' ? 'object-contain' : 'object-cover',
              props.imagePosition === 'left' && 'object-left',
              props.imagePosition === 'right' && 'object-right',
              props.imagePosition === 'top' && 'object-top',
              split()
                ? cn(
                    'absolute inset-x-0 top-0 h-64 w-full md:inset-y-0 md:h-full md:w-7/12',
                    contentEnd()
                      ? 'md:left-0 md:right-auto'
                      : 'md:right-0 md:left-auto'
                  )
                : 'absolute inset-0 size-full'
            )}
          />

          <Show when={imageToneOverlay()}>
            <div
              aria-hidden='true'
              class={cn(
                'pointer-events-none absolute inset-0 mix-blend-multiply',
                imageToneOverlay()
              )}
            />
          </Show>

          <div
            aria-hidden='true'
            class={cn(
              'absolute inset-0',
              split()
                ? splitScrim()
                : centered()
                  ? look().scrimCenter
                  : overlayScrim()
            )}
          />

          <div
            class={cn(
              'relative z-10 flex w-full max-w-7xl flex-col px-6 py-14 sm:px-10 md:py-20 lg:px-14',
              split() &&
                (contentEnd()
                  ? 'pt-72 md:col-start-2 md:row-start-1 md:ml-auto md:justify-center md:pt-16 md:pl-12'
                  : 'pt-72 md:col-start-1 md:row-start-1 md:justify-center md:pt-16 md:pr-12'),
              !split() && contentEnd() && 'md:ml-auto',
              !split() &&
                !centered() &&
                (props.scrim === 'soft'
                  ? 'md:w-1/2'
                  : contentEnd() && 'md:w-7/12'),
              centered() && !split()
                ? 'mx-auto items-center text-center'
                : 'items-start',
              overlap()
                ? 'pb-32 md:pb-40'
                : bottomContent()
                  ? 'pb-8 md:pb-10'
                  : 'pb-14 md:pb-20'
            )}
          >
            {copy()}
          </div>

          <Show when={mediaContent()}>
            <div
              class={cn(
                'relative z-10 mx-6 mb-8 flex items-center justify-center sm:mx-10 md:mx-0 md:mb-0 md:px-8',
                split()
                  ? contentEnd()
                    ? 'md:col-start-1 md:row-start-1 md:py-10'
                    : 'md:col-start-2 md:row-start-1 md:py-10'
                  : contentEnd()
                    ? 'md:absolute md:inset-y-0 md:left-0 md:right-auto md:w-5/12'
                    : 'md:absolute md:inset-y-0 md:right-0 md:w-5/12'
              )}
            >
              {mediaContent()}
            </div>
          </Show>

          <Show when={bottomContent()}>
            <div
              class={cn(
                'relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 sm:px-10 lg:px-14',
                split() && 'md:col-span-2 md:row-start-2'
              )}
            >
              {bottomContent()}
            </div>
          </Show>

          {credit('right-3 bottom-3')}
        </section>
      </Show>

      <Show when={overlap()}>
        <div class='relative z-10 mx-auto -mt-16 w-full max-w-7xl px-4 sm:px-6 md:-mt-20 lg:px-8'>
          {overlap()}
        </div>
      </Show>
    </div>
  );
}
