import Mail from 'lucide-solid/icons/mail';
import MapPin from 'lucide-solid/icons/map-pin';
import Phone from 'lucide-solid/icons/phone';
import { For, type JSX, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { Button } from '../components/Button';
import { Link } from '../components/Link';
import type { IconComponent } from '../types';
import { cn } from '../utils';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocial {
  /** Names the link for screen readers, e.g. "Instagram". */
  label: string;
  href: string;
  /** A brand mark (`Instagram`, `Facebook`, `Linkedin`) or a lucide-solid icon. */
  icon: IconComponent;
}

/** The band a footer sits on: the page surface, the muted one, or a dark band. */
export type FooterSurface = 'default' | 'muted' | 'inverse';

/** Colours for each footer surface. Text colour is set on the footer and inherited. */
export const FooterSurfaces: Record<
  FooterSurface,
  {
    root: string;
    strong: string;
    muted: string;
    link: string;
    icon: string;
    rule: string;
    /** Social buttons: grey discs on the page surface, outlines elsewhere. */
    social: { fillStyle: 'bold' | 'outline'; staticColor?: 'white' };
  }
> = {
  default: {
    root: 'border-t border-border-muted bg-surface text-foreground',
    strong: 'text-foreground-strongest',
    muted: 'text-foreground-muted',
    link: 'hover:text-foreground-strongest',
    icon: 'text-accent',
    rule: 'border-border-muted',
    social: { fillStyle: 'bold' },
  },
  muted: {
    root: 'bg-surface-muted text-foreground',
    strong: 'text-foreground-strongest',
    muted: 'text-foreground-muted',
    link: 'hover:text-foreground-strongest',
    icon: 'text-accent',
    rule: 'border-border-muted',
    social: { fillStyle: 'outline' },
  },
  inverse: {
    root: 'bg-surface-inverse text-foreground-inverse',
    strong: 'text-foreground-inverse',
    muted: 'text-foreground-inverse/80',
    link: 'hover:text-foreground-inverse',
    icon: 'text-foreground-inverse/70',
    rule: 'border-border-inverse/20',
    social: { fillStyle: 'outline', staticColor: 'white' },
  },
};

/** The page-width container every footer row sits in. */
export const FooterContainer = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

interface FooterBrandProps {
  surface: FooterSurface;
  logo?: JSX.Element;
  logoSrc?: string;
  logoText?: string;
  description?: string;
}

/** The logo (slot, image or text) and an optional line about the site. */
export function FooterBrand(props: FooterBrandProps) {
  const colours = () => FooterSurfaces[props.surface];

  return (
    <div class='flex flex-col items-start gap-4'>
      {props.logo ??
        (props.logoSrc ? (
          <img
            src={props.logoSrc}
            alt={props.logoText ?? ''}
            class='block h-10 w-auto object-contain'
          />
        ) : (
          <Show when={props.logoText}>
            <span
              class={cn(
                'font-heading text-fluid-2xl font-semibold',
                colours().strong
              )}
            >
              {props.logoText}
            </span>
          </Show>
        ))}
      <Show when={props.description}>
        <p class={cn('m-0 max-w-sm text-fluid-sm', colours().muted)}>
          {props.description}
        </p>
      </Show>
    </div>
  );
}

interface FooterBottomProps {
  surface: FooterSurface;
  socialLinks?: FooterSocial[];
  year?: number;
  copyright?: string;
}

/** The last row: copyright on the left, social links on the right. */
export function FooterBottom(props: FooterBottomProps) {
  const colours = () => FooterSurfaces[props.surface];

  return (
    <div
      class={cn(
        'flex flex-col-reverse gap-4 border-t py-6 @2xl:flex-row @2xl:items-center @2xl:justify-between',
        colours().rule
      )}
    >
      <p class={cn('m-0 text-fluid-sm', colours().muted)}>
        © {props.year ?? new Date().getFullYear()} {props.copyright}
      </p>

      <Show when={props.socialLinks?.length}>
        <ul class='m-0 flex list-none flex-wrap items-center gap-2 p-0'>
          <For each={props.socialLinks}>
            {(social) => (
              <li>
                <Button
                  href={social.href}
                  icon={social.icon}
                  aria-label={social.label}
                  size='l'
                  variant='secondary'
                  fillStyle={colours().social.fillStyle}
                  staticColor={colours().social.staticColor}
                  class='rounded-full px-0'
                />
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
}

export interface FooterProps {
  surface?: FooterSurface;
  /** Custom brand mark; replaces `logoSrc` and `logoText`. */
  logo?: JSX.Element;
  /** Logo image. `logoText` becomes its alt text. */
  logoSrc?: string;
  logoText?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  /** Heading of the contact strip at the top. The strip shows when it is set. */
  ctaTitle?: string;
  ctaDescription?: string;
  /** Label of the strip's email button. */
  emailLabel?: string;
  /** Heading above `quickLinks`. */
  linksTitle?: string;
  /** Columns of links, shown side by side under one heading. */
  quickLinks?: FooterLink[][];
  socialLinks?: FooterSocial[];
  /** Defaults to the current year. */
  year?: number;
  copyright?: string;
  class?: string;
}

/** `tel:` links take digits and a leading plus only. */
function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

/** A line of contact details, its icon centred on the first line of text. */
function ContactItem(props: {
  icon: IconComponent;
  iconClass: string;
  children: JSX.Element;
}) {
  return (
    <li class='flex items-start gap-3'>
      <span aria-hidden='true' class='flex h-lh shrink-0 items-center'>
        <Dynamic component={props.icon} class={cn('size-5', props.iconClass)} />
      </span>
      <span class='min-w-0'>{props.children}</span>
    </li>
  );
}

/**
 * A contact footer: an optional "get in touch" strip, the brand with the
 * address, phone and email, a block of quick links, then the copyright and
 * social links.
 */
export function Footer(props: FooterProps) {
  const surface = () => props.surface ?? 'default';
  const colours = () => FooterSurfaces[surface()];
  const inverse = () => surface() === 'inverse';
  const hasContact = () => Boolean(props.address || props.phone || props.email);

  return (
    <footer class={cn('@container w-full', colours().root, props.class)}>
      <div class={FooterContainer}>
        <Show when={props.ctaTitle}>
          <div
            class={cn(
              'flex flex-col gap-6 border-b py-10 @3xl:flex-row @3xl:items-center @3xl:justify-between @3xl:py-12',
              colours().rule
            )}
          >
            <div class='flex max-w-2xl flex-col gap-2'>
              <h2
                class={cn(
                  'm-0 font-heading text-fluid-3xl font-semibold',
                  colours().strong
                )}
              >
                {props.ctaTitle}
              </h2>
              <Show when={props.ctaDescription}>
                <p class={cn('m-0 text-fluid-md', colours().muted)}>
                  {props.ctaDescription}
                </p>
              </Show>
            </div>

            <Show when={props.phone || props.email}>
              <div class='flex flex-wrap gap-3'>
                <Show when={props.phone}>
                  {(phone) => (
                    <Button
                      href={telHref(phone())}
                      icon={Phone}
                      size='l'
                      variant='secondary'
                      fillStyle='outline'
                      staticColor={inverse() ? 'white' : undefined}
                    >
                      {phone()}
                    </Button>
                  )}
                </Show>
                <Show when={props.email}>
                  {(email) => (
                    <Button
                      href={`mailto:${email()}`}
                      icon={Mail}
                      size='l'
                      staticColor={inverse() ? 'white' : undefined}
                    >
                      {props.emailLabel ?? 'Email us'}
                    </Button>
                  )}
                </Show>
              </div>
            </Show>
          </div>
        </Show>

        <div class='grid gap-10 py-12 @3xl:grid-cols-2 @3xl:gap-16'>
          <div class='flex flex-col gap-8'>
            <FooterBrand
              surface={surface()}
              logo={props.logo}
              logoSrc={props.logoSrc}
              logoText={props.logoText}
              description={props.description}
            />

            <Show when={hasContact()}>
              <address class='not-italic'>
                <ul class='m-0 flex list-none flex-col gap-3 p-0 text-fluid-sm'>
                  <Show when={props.address}>
                    <ContactItem icon={MapPin} iconClass={colours().icon}>
                      {props.address}
                    </ContactItem>
                  </Show>
                  <Show when={props.phone}>
                    {(phone) => (
                      <ContactItem icon={Phone} iconClass={colours().icon}>
                        <Link
                          href={telHref(phone())}
                          variant='secondary'
                          quiet
                          class={colours().link}
                        >
                          {phone()}
                        </Link>
                      </ContactItem>
                    )}
                  </Show>
                  <Show when={props.email}>
                    {(email) => (
                      <ContactItem icon={Mail} iconClass={colours().icon}>
                        <Link
                          href={`mailto:${email()}`}
                          variant='secondary'
                          quiet
                          class={colours().link}
                        >
                          {email()}
                        </Link>
                      </ContactItem>
                    )}
                  </Show>
                </ul>
              </address>
            </Show>
          </div>

          <Show when={props.quickLinks?.length}>
            <nav
              aria-label={props.linksTitle ?? 'Quick links'}
              class='flex flex-col gap-5'
            >
              <h2
                class={cn(
                  'm-0 text-fluid-xs font-semibold uppercase',
                  colours().muted
                )}
              >
                {props.linksTitle ?? 'Quick links'}
              </h2>
              <div class='grid grid-cols-2 gap-x-8 gap-y-3 @xl:grid-cols-3'>
                <For each={props.quickLinks}>
                  {(column) => (
                    <ul class='m-0 flex list-none flex-col gap-3 p-0'>
                      <For each={column}>
                        {(link) => (
                          <li>
                            <Link
                              href={link.href}
                              variant='secondary'
                              quiet
                              class={cn(
                                'text-fluid-sm font-medium',
                                colours().link
                              )}
                            >
                              {link.label}
                            </Link>
                          </li>
                        )}
                      </For>
                    </ul>
                  )}
                </For>
              </div>
            </nav>
          </Show>
        </div>

        <FooterBottom
          surface={surface()}
          socialLinks={props.socialLinks}
          year={props.year}
          copyright={props.copyright}
        />
      </div>
    </footer>
  );
}
