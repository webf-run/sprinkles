import { For, type JSX, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { cn } from '../utils';
import type { FooterSocial } from './Footer';

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
  /** Brand mark. From Astro pass it as a named slot: `<Fragment slot='logo'>…</Fragment>`. */
  logo?: JSX.Element;
  description?: string;
  columns: FooterColumn[];
  socialLinks?: FooterSocial[];
  year?: number;
  copyright?: string;
  class?: string;
}

/**
 * Light footer: brand + tagline on the left, titled link columns on the
 * right, then social icons and the copyright line. It renders the content
 * only – wrap it in the page container / background you need.
 */
export function FooterColumns(props: FooterColumnsProps) {
  return (
    <footer class={cn('flex flex-col', props.class)}>
      <div class='flex flex-col gap-10 xl:flex-row xl:gap-20'>
        <div class='xl:w-72 xl:shrink-0'>
          {props.logo}
          <Show when={props.description}>
            <p class='mt-7.5 max-w-60 text-card-description-sm leading-126 text-ink-muted'>
              {props.description}
            </p>
          </Show>
        </div>

        <div class='grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:flex md:flex-wrap md:gap-x-16 2xl:gap-x-44'>
          <For each={props.columns}>
            {(column) => (
              <div class='min-w-0'>
                <h3 class='text-card-tag-md leading-120 font-bold text-ink'>
                  {column.title}
                </h3>
                <ul class='mt-5 flex flex-col gap-4'>
                  <For each={column.links}>
                    {(link) => (
                      <li class='text-card-description-sm leading-120 text-ink-muted'>
                        <Show when={link.href} fallback={link.label}>
                          <a
                            href={link.href}
                            class='transition-colors hover:text-brand hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
                          >
                            {link.label}
                          </a>
                        </Show>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            )}
          </For>
        </div>
      </div>

      <Show when={props.socialLinks?.length}>
        <ul class='mt-12 flex items-center gap-2.5 xl:mt-24'>
          <For each={props.socialLinks}>
            {(social) => (
              <li>
                <a
                  href={social.href}
                  aria-label={social.label}
                  class='flex size-7.75 items-center justify-center rounded-full border border-ink-muted text-ink-muted transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
                >
                  <Show when={social.icon}>
                    <Dynamic
                      component={social.icon!}
                      size={16}
                      class='shrink-0'
                    />
                  </Show>
                </a>
              </li>
            )}
          </For>
        </ul>
      </Show>

      <p class='mt-3.5 text-card-tag-md leading-120 font-semibold tracking-wide-130 text-ink-muted'>
        © {props.year ?? new Date().getFullYear()} {props.copyright}
      </p>
    </footer>
  );
}
