import ArrowRight from 'lucide-solid/icons/arrow-right';
import { type JSX, Show, children, createUniqueId } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { Badge, type BadgeVariant } from '../components/Badge';
import { Button, type ButtonVariant } from '../components/Button';
import type { StaticColor } from '../core/control';
import { cn } from '../utils';

/**
 * The colour laid over the photo behind the copy, fading out across it:
 * - `inverse`: dark.
 * - `accent`: your brand colour.
 * - `muted`: pale.
 *
 * The exact colours come from the theme, so a site restyles them without
 * changing this prop.
 */
export type HeroBannerSurface = 'inverse' | 'accent' | 'muted';

/** Where the copy sits: on the leading side, or centred over the photo. */
export type HeroBannerAlign = 'start' | 'center';

/** Which side of the banner holds the copy. */
export type HeroBannerContentSide = 'start' | 'end';

/** How the photo fills its frame. */
export type HeroBannerImageFit = 'cover' | 'contain';

/** Where the photo is anchored inside its frame. */
export type HeroBannerImagePosition = 'center' | 'left' | 'right' | 'top';

/**
 * `overlay`: copy over the photo. `split`: the photo in its own column,
 * fading into the band. `framed`: the photo in a rounded panel, no fade.
 */
export type HeroBannerLayout = 'overlay' | 'split' | 'framed';

interface Look {
  root: string;
  title: string;
  body: string;
  /** Fades from the band over the photo. `strip` is the small-screen fade for centred copy. */
  scrim: { overlay: string; soft: string; split: string; strip: string };
  /** A pool of the band's colour behind centred copy. */
  pool: string;
  action: { variant?: ButtonVariant; staticColor?: StaticColor };
  eyebrow: { variant?: BadgeVariant; staticColor?: StaticColor };
}

export interface HeroBannerAction {
  label: string;
  href: string;
}

export interface HeroBannerProps {
  image: string;
  /** Describes the photo. Omit it when the photo is decoration. */
  imageAlt?: string;
  imageFit?: HeroBannerImageFit;
  imagePosition?: HeroBannerImagePosition;
  /** `soft` shows more of the photo and narrows the copy to half the banner. */
  scrim?: 'default' | 'soft';
  eyebrow?: string;
  eyebrowVariant?: BadgeVariant;
  title: string;
  description?: string;
  primaryAction: HeroBannerAction;
  secondaryAction?: HeroBannerAction;
  /** The colour laid over the photo behind the copy: dark (`inverse`, default), brand (`accent`) or pale (`muted`). */
  surface?: HeroBannerSurface;
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

/*
 * Colours are semantic tokens, so a theme restyles the banners. `scheme-light`
 * keeps a banner the same in a dark page, like a photo.
 *
 * The copy sits on a scrim at least 90% opaque, or on the plain band in a
 * narrow banner, so its contrast comes from the tokens, not the photo.
 * Breakpoints are container queries (`@3xl` is 48rem): the layout follows the
 * banner's width, not the window's. Class names are written in full so
 * Tailwind finds them.
 */
const Looks: Record<HeroBannerSurface, Look> = {
  inverse: {
    root: 'scheme-light bg-surface-inverse',
    title: 'text-foreground-inverse',
    body: 'text-foreground-inverse',
    scrim: {
      overlay:
        'bg-linear-to-b from-transparent to-surface-inverse @3xl:bg-linear-to-r @3xl:from-surface-inverse @3xl:via-surface-inverse/92 @3xl:via-60% @3xl:to-transparent @3xl:to-90%',
      soft: 'bg-linear-to-b from-transparent to-surface-inverse @3xl:bg-linear-to-r @3xl:from-surface-inverse @3xl:via-surface-inverse/92 @3xl:via-52% @3xl:to-transparent @3xl:to-80%',
      split:
        'bg-linear-to-b from-transparent to-surface-inverse @3xl:bg-linear-to-r @3xl:from-surface-inverse @3xl:via-surface-inverse/95 @3xl:via-50% @3xl:to-transparent @3xl:to-75%',
      strip: 'bg-linear-to-b from-transparent to-surface-inverse @3xl:hidden',
    },
    pool: '@3xl:before:absolute @3xl:before:-inset-x-16 @3xl:before:-inset-y-12 @3xl:before:-z-10 @3xl:before:bg-radial @3xl:before:from-surface-inverse/92 @3xl:before:via-surface-inverse/92 @3xl:before:via-80% @3xl:before:to-transparent',
    action: { variant: 'secondary', staticColor: 'white' },
    eyebrow: { staticColor: 'white' },
  },
  accent: {
    root: 'scheme-light bg-accent',
    title: 'text-accent-foreground',
    body: 'text-accent-foreground',
    scrim: {
      overlay:
        'bg-linear-to-b from-transparent to-accent @3xl:bg-linear-to-r @3xl:from-accent @3xl:via-accent/92 @3xl:via-60% @3xl:to-transparent @3xl:to-90%',
      soft: 'bg-linear-to-b from-transparent to-accent @3xl:bg-linear-to-r @3xl:from-accent @3xl:via-accent/92 @3xl:via-52% @3xl:to-transparent @3xl:to-80%',
      split:
        'bg-linear-to-b from-transparent to-accent @3xl:bg-linear-to-r @3xl:from-accent @3xl:via-accent/95 @3xl:via-50% @3xl:to-transparent @3xl:to-75%',
      strip: 'bg-linear-to-b from-transparent to-accent @3xl:hidden',
    },
    pool: '@3xl:before:absolute @3xl:before:-inset-x-16 @3xl:before:-inset-y-12 @3xl:before:-z-10 @3xl:before:bg-radial @3xl:before:from-accent/92 @3xl:before:via-accent/92 @3xl:before:via-80% @3xl:before:to-transparent',
    action: { variant: 'secondary', staticColor: 'white' },
    eyebrow: { staticColor: 'white' },
  },
  muted: {
    root: 'scheme-light bg-surface-muted',
    title: 'text-foreground-strongest',
    body: 'text-foreground',
    scrim: {
      overlay:
        'bg-linear-to-b from-transparent to-surface-muted @3xl:bg-linear-to-r @3xl:from-surface-muted @3xl:via-surface-muted/92 @3xl:via-60% @3xl:to-transparent @3xl:to-90%',
      soft: 'bg-linear-to-b from-transparent to-surface-muted @3xl:bg-linear-to-r @3xl:from-surface-muted @3xl:via-surface-muted/92 @3xl:via-52% @3xl:to-transparent @3xl:to-80%',
      split:
        'bg-linear-to-b from-transparent to-surface-muted @3xl:bg-linear-to-r @3xl:from-surface-muted @3xl:via-surface-muted/95 @3xl:via-50% @3xl:to-transparent @3xl:to-75%',
      strip: 'bg-linear-to-b from-transparent to-surface-muted @3xl:hidden',
    },
    pool: '@3xl:before:absolute @3xl:before:-inset-x-16 @3xl:before:-inset-y-12 @3xl:before:-z-10 @3xl:before:bg-radial @3xl:before:from-surface-muted/92 @3xl:before:via-surface-muted/92 @3xl:before:via-80% @3xl:before:to-transparent',
    action: { variant: 'accent' },
    eyebrow: { variant: 'accent' },
  },
};

/** A photo-led hero: a title, a description and one or two actions, readable over any photo. */
export function HeroBanner(props: HeroBannerProps) {
  const overlap = children(() => props.children);
  const mediaContent = children(() => props.mediaContent);
  const bottomContent = children(() => props.bottomContent);
  const titleId = `hero-banner-${createUniqueId()}`;

  const look = () => Looks[props.surface ?? 'inverse'];
  const centered = () => props.align === 'center';
  const framed = () => props.layout === 'framed';
  const split = () => props.layout === 'split' || framed();
  const contentEnd = () => props.contentSide === 'end';

  const scrim = () => {
    if (split()) return look().scrim.split;
    if (centered()) return look().scrim.strip;
    return props.scrim === 'soft' ? look().scrim.soft : look().scrim.overlay;
  };

  const copy = () => (
    <>
      <Show when={props.eyebrow}>
        <Badge
          variant={props.eyebrowVariant ?? look().eyebrow.variant}
          staticColor={
            props.eyebrowVariant ? undefined : look().eyebrow.staticColor
          }
          fillStyle='subtle'
          size='l'
          class='mb-6 border-current/25 backdrop-blur-md'
        >
          {props.eyebrow}
        </Badge>
      </Show>

      <Dynamic
        component={`h${props.headingLevel ?? 1}`}
        id={titleId}
        class={cn(
          'm-0 max-w-3xl font-heading text-fluid-5xl font-semibold text-balance',
          look().title
        )}
      >
        {props.title}
      </Dynamic>

      <Show when={props.description}>
        <p
          class={cn('m-0 mt-6 max-w-xl text-fluid-lg text-pretty', look().body)}
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
          variant={look().action.variant}
          staticColor={look().action.staticColor}
          iconEnd={ArrowRight}
        >
          {props.primaryAction.label}
        </Button>

        <Show when={props.secondaryAction}>
          {(action) => (
            <Button
              href={action().href}
              size='xl'
              variant={look().action.variant}
              fillStyle='outline'
              staticColor={look().action.staticColor}
            >
              {action().label}
            </Button>
          )}
        </Show>
      </div>

      <Show when={props.note}>
        <p class={cn('m-0 mt-4 text-sm', look().body)}>{props.note}</p>
      </Show>
    </>
  );

  const credit = (position: string) => (
    <Show when={props.imageCredit}>
      {(item) => (
        <p
          class={cn(
            'absolute z-20 m-0 rounded-full bg-surface-inverse/90 px-3 py-1 text-xs text-foreground-inverse backdrop-blur-sm',
            position
          )}
        >
          <Show when={item().href} fallback={item().text}>
            <a
              href={item().href}
              rel='noopener noreferrer'
              class='text-inherit no-underline underline-offset-2 hover:underline'
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
        'relative isolate grid grid-cols-1 overflow-hidden @3xl:grid-cols-2',
        look().root,
        props.fullWidth ? 'rounded-none' : 'rounded-3xl shadow-elevated'
      )}
    >
      <div
        class={cn(
          'relative z-10 flex flex-col items-start justify-center px-6 py-10 @xl:px-10 @3xl:px-12 @3xl:py-14 @5xl:px-16',
          contentEnd() && '@3xl:col-start-2 @3xl:row-start-1'
        )}
      >
        {copy()}
      </div>

      <div
        class={cn(
          'relative m-3 min-h-80 overflow-hidden rounded-2xl @3xl:m-4 @3xl:min-h-112',
          contentEnd() && '@3xl:col-start-1 @3xl:row-start-1'
        )}
      >
        <img
          src={props.image}
          alt={props.imageAlt ?? ''}
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

        <Show when={mediaContent()}>
          <div class='absolute inset-x-0 bottom-0 z-10 flex justify-center p-3 @xl:p-4 @3xl:justify-end'>
            {mediaContent()}
          </div>
        </Show>

        {credit('top-3 right-3')}
      </div>
    </section>
  );

  return (
    <div class={cn('HeroBanner', '@container relative w-full', props.class)}>
      <Show when={!framed()} fallback={framedSection()}>
        <section
          aria-labelledby={titleId}
          class={cn(
            'relative isolate min-h-112 overflow-hidden',
            look().root,
            props.fullWidth ? 'rounded-none' : 'rounded-3xl shadow-elevated',
            split() && 'grid grid-cols-1 @3xl:grid-cols-2'
          )}
        >
          <img
            src={props.image}
            alt={props.imageAlt ?? ''}
            decoding='async'
            fetchpriority='high'
            class={cn(
              'absolute inset-x-0 top-0 h-64 w-full @3xl:h-full',
              props.imageFit === 'contain' ? 'object-contain' : 'object-cover',
              props.imagePosition === 'left' && 'object-left',
              props.imagePosition === 'right' && 'object-right',
              props.imagePosition === 'top' && 'object-top',
              split()
                ? cn(
                    '@3xl:inset-y-0 @3xl:w-7/12',
                    contentEnd()
                      ? '@3xl:right-auto @3xl:left-0'
                      : '@3xl:right-0 @3xl:left-auto'
                  )
                : '@3xl:inset-0'
            )}
          />

          <div
            aria-hidden='true'
            class={cn(
              'absolute inset-x-0 top-0 h-64 @3xl:inset-0 @3xl:h-full',
              scrim(),
              contentEnd() && '@3xl:-scale-x-100'
            )}
          />

          <div
            class={cn(
              'relative z-10 flex w-full max-w-7xl flex-col px-6 pt-72 @xl:px-10 @3xl:pt-20 @5xl:px-14',
              split()
                ? cn(
                    '@3xl:row-start-1 @3xl:justify-center @3xl:pt-16',
                    contentEnd()
                      ? '@3xl:col-start-2 @3xl:pl-12'
                      : '@3xl:col-start-1 @3xl:pr-12'
                  )
                : cn(
                    centered()
                      ? 'mx-auto'
                      : props.scrim === 'soft'
                        ? '@3xl:w-1/2'
                        : '@3xl:w-7/12',
                    !centered() && contentEnd() && '@3xl:ml-auto'
                  ),
              centered() && !split()
                ? 'items-center text-center'
                : 'items-start',
              overlap()
                ? 'pb-32 @3xl:pb-40'
                : bottomContent()
                  ? 'pb-8 @3xl:pb-10'
                  : 'pb-14 @3xl:pb-20'
            )}
          >
            <Show when={centered() && !split()} fallback={copy()}>
              {/* The pool wraps the copy block, so it is as wide as the text. */}
              <div
                class={cn(
                  'relative flex w-fit max-w-full flex-col items-center',
                  look().pool
                )}
              >
                {copy()}
              </div>
            </Show>
          </div>

          <Show when={mediaContent()}>
            <div
              class={cn(
                'relative z-10 mx-6 mb-8 flex items-center justify-center @xl:mx-10',
                split()
                  ? cn(
                      '@3xl:mx-0 @3xl:mb-0 @3xl:row-start-1 @3xl:px-8 @3xl:py-10',
                      contentEnd() ? '@3xl:col-start-1' : '@3xl:col-start-2'
                    )
                  : /* A side column from 64rem; narrower, it stays under the copy. */
                    cn(
                      '@5xl:mx-0 @5xl:mb-0 @5xl:px-8',
                      contentEnd()
                        ? '@5xl:absolute @5xl:inset-y-0 @5xl:right-auto @5xl:left-0 @5xl:w-5/12'
                        : '@5xl:absolute @5xl:inset-y-0 @5xl:right-0 @5xl:w-5/12'
                    )
              )}
            >
              {mediaContent()}
            </div>
          </Show>

          <Show when={bottomContent()}>
            <div
              class={cn(
                'relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 @xl:px-10 @5xl:px-14',
                split() && '@3xl:col-span-2 @3xl:row-start-2'
              )}
            >
              {bottomContent()}
            </div>
          </Show>

          {/* Overlapping children cover the bottom edge. */}
          {credit(
            overlap()
              ? 'top-3 right-3'
              : 'top-3 right-3 @3xl:top-auto @3xl:bottom-3'
          )}
        </section>
      </Show>

      <Show when={overlap()}>
        <div class='relative z-10 mx-auto -mt-16 w-full max-w-7xl px-4 @xl:px-6 @3xl:-mt-20 @5xl:px-8'>
          {overlap()}
        </div>
      </Show>
    </div>
  );
}
