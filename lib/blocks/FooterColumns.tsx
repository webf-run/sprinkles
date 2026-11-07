import { For, type JSX, Show } from 'solid-js';

import { Link } from '../components/Link';
import { cn } from '../utils';
import {
  FooterBottom,
  FooterBrand,
  FooterContainer,
  type FooterSocial,
  type FooterSurface,
  FooterSurfaces,
} from './Footer';

export interface FooterColumnLink {
  label: string;
  /** Plain text (e.g. an address line) when omitted. */
  href?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterColumnLink[];
}

export interface FooterColumnsProps {
  surface?: FooterSurface;
  /** Custom brand mark; replaces `logoSrc` and `logoText`. */
  logo?: JSX.Element;
  /** Logo image. `logoText` becomes its alt text. */
  logoSrc?: string;
  logoText?: string;
  description?: string;
  columns: FooterColumn[];
  /** Accessible name of the navigation landmark that holds the columns. */
  label?: string;
  socialLinks?: FooterSocial[];
  /** Defaults to the current year. */
  year?: number;
  copyright?: string;
  class?: string;
}

/**
 * A sitemap footer: the brand and a line about the site, titled columns of
 * links beside it, then the copyright and social links.
 */
export function FooterColumns(props: FooterColumnsProps) {
  const surface = () => props.surface ?? 'default';
  const colours = () => FooterSurfaces[surface()];

  return (
    <footer class={cn('@container w-full', colours().root, props.class)}>
      <div class={FooterContainer}>
        <div class='flex flex-col gap-12 py-12 @4xl:flex-row @4xl:justify-between @4xl:gap-16'>
          <div class='@4xl:max-w-xs'>
            <FooterBrand
              surface={surface()}
              logo={props.logo}
              logoSrc={props.logoSrc}
              logoText={props.logoText}
              description={props.description}
            />
          </div>

          <nav
            aria-label={props.label ?? 'Footer'}
            class='grid grid-cols-2 gap-x-8 gap-y-10 @xl:grid-cols-3 @4xl:flex @4xl:gap-x-16'
          >
            <For each={props.columns}>
              {(column) => (
                <div class='flex min-w-0 flex-col gap-4'>
                  <h2
                    class={cn(
                      'm-0 text-fluid-sm font-semibold',
                      colours().strong
                    )}
                  >
                    {column.title}
                  </h2>
                  <ul
                    class={cn(
                      'm-0 flex list-none flex-col gap-3 p-0 text-fluid-sm',
                      colours().muted
                    )}
                  >
                    <For each={column.links}>
                      {(link) => (
                        <li>
                          <Show when={link.href} fallback={link.label}>
                            {(href) => (
                              <Link
                                href={href()}
                                variant='secondary'
                                quiet
                                class={colours().link}
                              >
                                {link.label}
                              </Link>
                            )}
                          </Show>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              )}
            </For>
          </nav>
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
