import Menu from 'lucide-solid/icons/menu';
import X from 'lucide-solid/icons/x';
import {
  For,
  type JSX,
  Show,
  createSignal,
  createUniqueId,
  onCleanup,
  onMount,
} from 'solid-js';

import {
  ControlHeight,
  ControlMinWidth,
  ControlRadius,
  FocusRing,
  IconSize,
  Transition,
} from '../core/control';
import { cn } from '../utils';

export interface NavItem {
  label: string;
  href: string;
  /** The page being shown: marked with `aria-current='page'` and highlighted. */
  current?: boolean;
}

export interface NavbarProps {
  /** Custom brand mark; replaces `logoSrc` and `logoText`. */
  logo?: JSX.Element;
  /** Logo image. `logoText` becomes its alt text. */
  logoSrc?: string;
  /** The site's name, shown when there is no `logoSrc`. */
  logoText?: string;
  /** Where the logo links to. */
  logoHref?: string;
  navItems?: NavItem[];
  /** Calls to action at the right end, e.g. a `Button`. Stays visible on small screens. */
  actions?: JSX.Element;
  /** Accessible name of the navigation landmark. */
  label?: string;
  /** Accessible name of the menu button on small screens. */
  menuLabel?: string;
  position?: 'static' | 'sticky' | 'fixed';
  class?: string;
  style?: string;
}

const Position = {
  static: 'relative',
  sticky: 'sticky top-0 z-50',
  fixed: 'fixed inset-x-0 top-0 z-50',
} as const;

/** Shared by the inline links and the links in the small-screen menu. */
const NavLink = cn(
  'flex items-center rounded-lg px-3 font-medium text-foreground no-underline',
  'hover:bg-neutral-subtle hover:text-foreground-strongest active:bg-neutral/12',
  'current:bg-accent-subtle current:text-accent-subtle-foreground',
  FocusRing,
  Transition
);

/**
 * The menu button: a secondary outline control at size L. Built from the
 * control classes because it needs `aria-expanded` and a ref for focus.
 */
const MenuButton = cn(
  'inline-flex shrink-0 cursor-pointer items-center justify-center border-2 border-border bg-transparent p-0 text-foreground-strong @4xl:hidden',
  'hover:bg-neutral-subtle active:bg-neutral/12',
  ControlHeight.l,
  ControlMinWidth.l,
  ControlRadius.l,
  FocusRing,
  Transition
);

/**
 * The site's top bar: brand, navigation links and calls to action. It lays
 * out by its own width (a container query), not the viewport's: from 56rem
 * the links sit in the bar, below that they fold into a menu.
 */
export function Navbar(props: NavbarProps) {
  const [open, setOpen] = createSignal(false);
  const items = () => props.navItems ?? [];
  const label = () => props.label ?? 'Main';
  const panelId = `navbar-menu-${createUniqueId()}`;

  let rootRef: HTMLElement | undefined;
  let triggerRef: HTMLButtonElement | undefined;

  const close = () => setOpen(false);

  // Browser-only listeners: close on Escape, on a press outside, and when
  // the bar grows wide enough to show its links inline (the menu button is
  // hidden then).
  onMount(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !open()) return;
      close();
      triggerRef?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (open() && rootRef && !event.composedPath().includes(rootRef)) {
        close();
      }
    };
    const onResize = () => {
      if (triggerRef && getComputedStyle(triggerRef).display === 'none') {
        close();
      }
    };
    const resizeObserver = new ResizeObserver(onResize);

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    if (rootRef) resizeObserver.observe(rootRef);

    onCleanup(() => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      resizeObserver.disconnect();
    });
  });

  const brand = () =>
    props.logo ??
    (props.logoSrc ? (
      <img
        src={props.logoSrc}
        alt={props.logoText ?? 'Home'}
        class='block h-10 w-auto object-contain'
      />
    ) : (
      <span class='text-fluid-xl font-bold text-foreground-strongest'>
        {props.logoText}
      </span>
    ));

  return (
    <header
      ref={rootRef}
      class={cn(
        '@container w-full border-b border-border-muted bg-surface text-foreground',
        Position[props.position ?? 'static'],
        props.class
      )}
      style={props.style}
    >
      <div class='mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 @xl:px-6 @4xl:h-20 @5xl:px-8'>
        <a
          href={props.logoHref ?? '/'}
          class={cn(
            'flex shrink-0 items-center gap-2 rounded-md text-inherit no-underline',
            FocusRing
          )}
        >
          {brand()}
        </a>

        <Show when={items().length > 0}>
          <nav aria-label={label()} class='hidden min-w-0 @4xl:block'>
            <ul class='m-0 flex list-none items-center gap-1 p-0 @5xl:gap-2'>
              <For each={items()}>
                {(item) => (
                  <li>
                    <a
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      class={cn(NavLink, 'h-10 text-sm @5xl:text-base')}
                    >
                      {item.label}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </nav>
        </Show>

        <div class='flex shrink-0 items-center gap-2 @xl:gap-3'>
          {props.actions}

          <Show when={items().length > 0}>
            <button
              ref={triggerRef}
              type='button'
              class={MenuButton}
              aria-label={props.menuLabel ?? 'Menu'}
              aria-expanded={open()}
              aria-controls={panelId}
              onClick={() => setOpen(!open())}
            >
              <Show
                when={open()}
                fallback={<Menu class={IconSize.l} aria-hidden='true' />}
              >
                <X class={IconSize.l} aria-hidden='true' />
              </Show>
            </button>
          </Show>
        </div>
      </div>

      <Show when={items().length > 0}>
        <nav
          id={panelId}
          aria-label={label()}
          hidden={!open()}
          class='border-t border-border-muted @4xl:hidden'
        >
          <ul class='m-0 mx-auto flex w-full max-w-7xl list-none flex-col gap-1 px-4 py-3 @xl:px-6'>
            <For each={items()}>
              {(item) => (
                <li>
                  <a
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    class={cn(NavLink, 'h-12 text-base')}
                    onClick={close}
                  >
                    {item.label}
                  </a>
                </li>
              )}
            </For>
          </ul>
        </nav>
      </Show>
    </header>
  );
}
