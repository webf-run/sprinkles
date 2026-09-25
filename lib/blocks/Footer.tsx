import { type VariantProps, cva } from 'class-variance-authority';
import { Mail, MapPin, Phone } from 'lucide-solid';
import { For, type JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import type { IconComponent } from '../types';
import Link from './Link';

export type { IconComponent };

export interface FooterLink {
  label: string;
  href: string;
}
export interface FooterSocial {
  label: string;
  href: string;
  icon?: IconComponent;
  iconVariant?: FooterColorVariant;
  iconColor?: string;
}
type FooterColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'purple'
  | 'blue'
  | 'pink'
  | 'green'
  | 'orange'
  | 'foreground'
  | 'muted';
const footerVariants = cva(
  'flex w-full flex-col px-4 py-6 md:px-6 md:py-8 xl:px-8 xl:py-10',
  {
    variants: {
      variant: {
        default: 'bg-surface text-foreground',
        muted: 'bg-surface-muted text-foreground',
        inverse: 'bg-accent text-accent-foreground',
        green: 'bg-badge-green-background text-foreground',
      },
      size: { sm: 'px-5', md: 'px-6', lg: 'px-8' },
      effect: {
        none: '',
        shadow: 'shadow-sm',
        lift: 'transition-shadow hover:shadow-lg',
        glow: 'transition-shadow hover:shadow-lg',
      },
    },
    defaultVariants: { variant: 'default', size: 'md', effect: 'none' },
  }
);
const colors: Record<FooterColorVariant, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary-foreground',
  success: 'text-success-foreground',
  purple: 'text-badge-purple-foreground',
  blue: 'text-badge-blue-foreground',
  pink: 'text-badge-pink-foreground',
  green: 'text-badge-green-foreground',
  orange: 'text-badge-orange-foreground',
  foreground: 'text-foreground',
  muted: 'text-foreground-muted',
};
const divider = cva('border-t', {
  variants: {
    variant: {
      default: 'border-footer-subtle',
      muted: 'border-footer-subtle',
      inverse: 'border-accent-foreground/20',
      green: 'border-green-800',
    },
  },
  defaultVariants: { variant: 'default' },
});
const sizes = {
  sm: {
    content: 'max-w-205',
    logo: 'h-10 w-auto',
    description: 'mt-6',
    contact: 'mt-6',
    links: 'mt-8',
    bottom: 'pt-6 pb-8',
  },
  md: {
    content: 'max-w-217',
    logo: 'h-12.25 w-auto',
    description: 'mt-8',
    contact: 'mt-8',
    links: 'mt-10',
    bottom: 'pt-8 pb-10',
  },
  lg: {
    content: 'max-w-240',
    logo: 'h-14 w-auto',
    description: 'mt-9',
    contact: 'mt-9',
    links: 'mt-12',
    bottom: 'pt-9 pb-12',
  },
} as const;
export interface Props extends VariantProps<typeof footerVariants> {
  logoSrc?: string;
  logoText?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  emailLabel?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  quickLinks?: FooterLink[][];
  socialLinks?: FooterSocial[];
  year?: number;
  copyright?: string;
  phoneVariant?: 'primary' | 'secondary' | 'success' | 'purple' | 'blackwhite';
  emailVariant?: 'primary' | 'secondary' | 'success' | 'purple' | 'blackwhite';
  headingVariant?: FooterColorVariant;
  headingColor?: string;
  subtitleVariant?: FooterColorVariant;
  subtitleColor?: string;
  descriptionVariant?: FooterColorVariant;
  descriptionColor?: string;
  linkVariant?: FooterColorVariant;
  linkColor?: string;
  contactVariant?: FooterColorVariant;
  contactColor?: string;
  contactIconVariant?: FooterColorVariant;
  contactIconColor?: string;
  copyrightVariant?: FooterColorVariant;
  copyrightColor?: string;
  logo?: JSX.Element;
  class?: string;
}
export default function Footer(p: Props) {
  const size = () => p.size ?? 'md';
  const s = () => sizes[size()];
  const heading = () => colors[p.headingVariant ?? 'foreground'];
  const subtitle = () => colors[p.subtitleVariant ?? 'muted'];
  const description = () => colors[p.descriptionVariant ?? 'foreground'];
  const links = () => colors[p.linkVariant ?? 'foreground'];
  const contact = () => colors[p.contactVariant ?? 'foreground'];
  const iconColor = () => colors[p.contactIconVariant ?? 'primary'];
  const copyright = () => colors[p.copyrightVariant ?? 'muted'];
  const tel = () => (p.phone ? `tel:${p.phone.replace(/\s+/g, '')}` : '#');
  return (
    <footer
      class={`${footerVariants({ variant: p.variant, size: p.size, effect: p.effect })} flex flex-col ${p.class ?? ''}`}
    >
      <div class='flex min-w-0 flex-col gap-8 pb-5 md:flex-row md:items-center md:justify-between xl:pb-2'>
        <div class='max-w-190 min-w-0'>
          <h2
            class={`font-heading text-subtitle font-semibold ${heading()}`}
            style={p.headingColor ? `color:${p.headingColor}` : undefined}
          >
            {p.ctaTitle ?? "Have Questions? We're here."}
          </h2>
          <p
            class={`text-body mt-3 ${subtitle()}`}
            style={p.subtitleColor ? `color:${p.subtitleColor}` : undefined}
          >
            {p.ctaSubtitle ??
              'Our counselors respond to queries within 1-2 days'}
          </p>
        </div>
        <div class='flex w-full min-w-0 flex-row gap-2 md:w-auto md:max-w-full'>
          {p.phone && (
            <Link
              href={tel()}
              variant={p.phoneVariant ?? 'secondary'}
              size='lg'
              icon={Phone}
              class='flex max-w-full min-w-0 flex-1 items-center justify-center gap-1.5 px-2 text-sm whitespace-nowrap min-[350px]:gap-2 min-[350px]:px-3 md:flex-none md:px-6 md:text-base xl:text-lg'
            >
              {p.phone}
            </Link>
          )}
          {p.email && (
            <Link
              href={`mailto:${p.email}`}
              variant={p.emailVariant ?? 'primary'}
              size='lg'
              icon={Mail}
              class='flex max-w-full min-w-0 flex-1 items-center justify-center gap-1.5 px-2 text-sm whitespace-nowrap min-[350px]:gap-2 min-[350px]:px-3 md:flex-none md:px-6 md:text-base xl:text-lg'
            >
              {p.emailLabel ?? 'Email address'}
            </Link>
          )}
        </div>
      </div>
      <div
        class={`${s().content} mx-auto w-full max-w-full min-w-0 pt-14 pb-8 xl:pt-16 xl:pb-10`}
      >
        <div>
          {p.logo ??
            (p.logoSrc ? (
              <img
                src={p.logoSrc}
                alt={p.logoText ?? 'Logo'}
                class={`${s().logo} w-auto object-contain`}
              />
            ) : (
              p.logoText && (
                <span
                  class={`font-heading font-bold ${heading()} ${size() === 'lg' ? 'text-3xl' : size() === 'sm' ? 'text-xl' : 'text-2xl'}`}
                  style={p.headingColor ? `color:${p.headingColor}` : undefined}
                >
                  {p.logoText}
                </span>
              )
            ))}
        </div>
        {p.description && (
          <p
            class={`${s().description} text-body max-w-2xl ${description()}`}
            style={
              p.descriptionColor ? `color:${p.descriptionColor}` : undefined
            }
          >
            {p.description}
          </p>
        )}
        {(p.address || p.phone || p.email) && (
          <ul
            class={`${s().contact} max-w-2xl space-y-3.5 pb-10 border-footer-subtle border-b md:border-b-0 text-body ${contact()}`}
            style={p.contactColor ? `color:${p.contactColor}` : undefined}
          >
            {p.address && (
              <li class='flex items-start gap-3'>
                <MapPin
                  class={`mt-1 h-5 w-5 shrink-0 ${iconColor()}`}
                  style={
                    p.contactIconColor
                      ? `color:${p.contactIconColor}`
                      : undefined
                  }
                />
                <span>{p.address}</span>
              </li>
            )}
            {p.phone && (
              <li class='flex items-start gap-3'>
                <Phone
                  class={`mt-1 h-5 w-5 shrink-0 ${iconColor()}`}
                  style={
                    p.contactIconColor
                      ? `color:${p.contactIconColor}`
                      : undefined
                  }
                />
                <a href={tel()} class='transition-colors hover:opacity-80'>
                  {p.phone}
                </a>
              </li>
            )}
            {p.email && (
              <li class='flex items-start gap-3'>
                <Mail
                  class={`mt-1 h-5 w-5 shrink-0 ${iconColor()}`}
                  style={
                    p.contactIconColor
                      ? `color:${p.contactIconColor}`
                      : undefined
                  }
                />
                <a
                  href={`mailto:${p.email}`}
                  class='transition-colors hover:opacity-80'
                >
                  {p.email}
                </a>
              </li>
            )}
          </ul>
        )}
        {p.quickLinks?.length && (
          <div class={s().links}>
            <p
              class={`text-eyebrow mb-5 font-semibold ${subtitle()}`}
              style={p.subtitleColor ? `color:${p.subtitleColor}` : undefined}
            >
              Quick Links
            </p>
            <div class='grid max-w-104.75 grid-cols-2 gap-x-10 gap-y-4 md:gap-x-16 xl:gap-x-22.25'>
              <For each={p.quickLinks}>
                {(column) => (
                  <ul class='space-y-3'>
                    <For each={column}>
                      {(link) => (
                        <li>
                          <a
                            href={link.href}
                            class={`text-body font-medium transition-colors ${links()} hover:opacity-70 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`}
                            style={
                              p.linkColor ? `color:${p.linkColor}` : undefined
                            }
                          >
                            {link.label}
                          </a>
                        </li>
                      )}
                    </For>
                  </ul>
                )}
              </For>
            </div>
          </div>
        )}
      </div>
      <div
        class={`${s().bottom} mt-2 flex min-w-0 flex-col gap-6 ${divider({ variant: p.variant })} md:border-t-0 xl:border-t-0`}
      >
        {p.socialLinks?.length && (
          <div class='flex flex-wrap items-center gap-2.5'>
            <For each={p.socialLinks}>
              {(social) => (
                <a
                  href={social.href}
                  aria-label={social.label}
                  class='flex h-7.75 w-7.75 items-center justify-center rounded-full border-foreground-strong border transition-colors focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
                >
                  {social.icon && (
                    <Dynamic
                      component={social.icon}
                      size={18}
                      class={`shrink-0 ${social.iconVariant ? colors[social.iconVariant] : ''}`}
                      style={
                        social.iconColor
                          ? `color:${social.iconColor}`
                          : undefined
                      }
                    />
                  )}
                </a>
              )}
            </For>
          </div>
        )}
        <p
          class={`text-body-sm ${copyright()}`}
          style={p.copyrightColor ? `color:${p.copyrightColor}` : undefined}
        >
          © {p.year ?? new Date().getFullYear()}
          {p.copyright}
        </p>
      </div>
    </footer>
  );
}
