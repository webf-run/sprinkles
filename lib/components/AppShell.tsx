import { Dialog } from '@ark-ui/solid/dialog';
import MenuIcon from 'lucide-solid/icons/menu';
import XIcon from 'lucide-solid/icons/x';
import {
  type Component,
  type JSX,
  Show,
  children,
  createSignal,
  createUniqueId,
  onCleanup,
  onMount,
  splitProps,
} from 'solid-js';
import { Dynamic, Portal } from 'solid-js/web';

import { FocusRing, Transition } from '../core/control';
import { cn } from '../utils';
import { IconButton } from './IconButton';

type IconComponent = Component<{
  class?: string;
  'aria-hidden'?: boolean | 'true';
}>;

export interface AppShellProps {
  /** Product mark and name, at the top of the sidebar and the drawer. */
  brand?: JSX.Element;
  /** What's being managed, e.g. the project's name. Plain text; put controls in `actions`. */
  title?: JSX.Element;
  /** Buttons at the header's end, before the user menu. */
  actions?: JSX.Element;
  /** The account control at the very end of the header (an avatar button or menu). */
  userMenu?: JSX.Element;
  /** The navigation: `AppShellNavGroup`s of `AppShellNavItem`s. Pass it inline (not a stored element): it renders in the sidebar and again in the drawer. */
  sidebar?: JSX.Element;
  /** Pinned to the bottom of the sidebar: help, version, sign out. */
  sidebarFooter?: JSX.Element;
  /** Names the navigation landmark and the drawer. */
  navLabel?: string;
  /** Label of the button that opens the drawer on narrow screens. */
  openNavLabel?: string;
  /** Label of the drawer's close button. */
  closeNavLabel?: string;
  /** The root fills the viewport (`h-dvh`); pass `class='h-full'` to fill a container instead. */
  class?: string;
  /** The page: rendered in `<main>`, which scrolls on its own. */
  children?: JSX.Element;
}

/**
 * The admin's frame: a sidebar with the navigation, a header with the
 * title, actions and user menu, and the page in `<main>`. It responds to its
 * own width (a container query), not the viewport's: from 768 px the sidebar
 * is a fixed column; below that it's hidden and the header's menu button
 * opens it as a modal drawer.
 */
export function AppShell(props: AppShellProps) {
  const [open, setOpen] = createSignal(false);
  const navLabel = () => props.navLabel ?? 'Main';

  let root: HTMLDivElement | undefined;
  let aside: HTMLElement | undefined;

  // Close the drawer once the shell is wide enough to show the sidebar.
  onMount(() => {
    if (typeof ResizeObserver === 'undefined' || !root) return;
    const observer = new ResizeObserver(() => {
      if (open() && aside && getComputedStyle(aside).display !== 'none')
        setOpen(false);
    });
    observer.observe(root);
    onCleanup(() => observer.disconnect());
  });

  // Following a link in the drawer closes it, for apps that route without a page load.
  const closeOnLink = (event: MouseEvent) => {
    if (event.target instanceof Element && event.target.closest('a[href]'))
      setOpen(false);
  };

  const brandRow = (closeButton?: JSX.Element) => (
    <div class='box-border flex h-14 shrink-0 items-center gap-2 border-b border-border-muted px-4'>
      <div class='flex min-w-0 flex-1 items-center gap-2 text-sm font-semibold text-foreground-strongest'>
        {props.brand}
      </div>
      {closeButton}
    </div>
  );

  // Called once for the sidebar and once for the drawer, so each gets its own nodes.
  const navigation = () => {
    const footer = children(() => props.sidebarFooter);
    return (
      <>
        <nav
          aria-label={navLabel()}
          class='box-border flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-3 py-4'
        >
          {props.sidebar}
        </nav>
        <Show when={footer()}>
          <div class='box-border shrink-0 border-t border-border-muted px-3 py-3'>
            {footer()}
          </div>
        </Show>
      </>
    );
  };

  // Header slots are resolved once, so JSX passed in (a menu, say) is created once.
  const actions = children(() => props.actions);
  const userMenu = children(() => props.userMenu);

  return (
    <div
      ref={root}
      class={cn(
        '@container box-border flex h-dvh w-full min-w-0 overflow-hidden bg-surface-muted text-foreground',
        props.class
      )}
    >
      <aside
        ref={aside}
        class='box-border hidden w-64 shrink-0 flex-col border-r border-border-muted bg-surface @3xl:flex'
      >
        {brandRow()}
        {navigation()}
      </aside>

      <div class='flex min-w-0 flex-1 flex-col'>
        <header class='box-border flex h-14 shrink-0 items-center gap-3 border-b border-border-muted bg-surface px-4'>
          <IconButton
            class='-ml-1 @3xl:hidden'
            quiet
            icon={MenuIcon}
            aria-label={props.openNavLabel ?? 'Open navigation'}
            aria-haspopup='dialog'
            aria-expanded={open()}
            onClick={() => setOpen(true)}
          />
          <div class='min-w-0 flex-1 truncate text-sm font-semibold text-foreground-strongest'>
            {props.title}
          </div>
          <Show when={actions()}>
            <div class='flex shrink-0 items-center gap-2'>{actions()}</div>
          </Show>
          <Show when={userMenu()}>
            <div class='flex shrink-0 items-center'>{userMenu()}</div>
          </Show>
        </header>

        <main class='box-border min-h-0 min-w-0 flex-1 overflow-auto p-4 @3xl:p-6'>
          {props.children}
        </main>
      </div>

      <Dialog.Root
        open={open()}
        onOpenChange={(details) => setOpen(details.open)}
        aria-label={navLabel()}
        lazyMount
        unmountOnExit
      >
        <Portal>
          <Dialog.Backdrop class='fixed inset-0 z-40 bg-backdrop motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-standard starting:opacity-0' />
          <Dialog.Positioner class='fixed inset-0 z-50 flex'>
            <Dialog.Content
              onClick={closeOnLink}
              class={cn(
                'box-border flex h-full w-72 max-w-full flex-col bg-surface text-foreground shadow-overlay outline-none',
                'motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-emphasized starting:-translate-x-full'
              )}
            >
              {brandRow(
                <IconButton
                  class='-mr-1'
                  quiet
                  icon={XIcon}
                  aria-label={props.closeNavLabel ?? 'Close navigation'}
                  onClick={() => setOpen(false)}
                />
              )}
              {navigation()}
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
}

export interface AppShellNavGroupProps {
  /** A short heading for the group (“Content”, “Settings”); it names the list for screen readers. */
  label?: JSX.Element;
  class?: string;
  /** `AppShellNavItem`s. */
  children?: JSX.Element;
}

/** A labelled list of sidebar links. */
export function AppShellNavGroup(props: AppShellNavGroupProps) {
  const labelId = `appshell-group-${createUniqueId()}`;
  const label = children(() => props.label);

  return (
    <div class={cn('flex flex-col gap-1', props.class)}>
      <Show when={label()}>
        <div
          id={labelId}
          class='px-3 pb-1 text-xs font-semibold text-foreground-muted'
        >
          {label()}
        </div>
      </Show>
      <ul
        aria-labelledby={label() ? labelId : undefined}
        class='m-0 flex list-none flex-col gap-1 p-0'
      >
        {props.children}
      </ul>
    </div>
  );
}

export interface AppShellNavItemProps {
  href: string;
  /** A lucide-solid icon before the label. */
  icon?: IconComponent;
  /** The page being shown: highlighted, and announced as the current page. */
  current?: boolean;
  /** A count or badge at the end, e.g. drafts waiting for review. */
  end?: JSX.Element;
  onClick?: JSX.EventHandlerUnion<HTMLAnchorElement, MouseEvent>;
  class?: string;
  children?: JSX.Element;
}

const NavLink = [
  'box-border flex h-8 items-center gap-2 rounded-lg px-3 text-sm font-medium text-foreground no-underline',
  'hover:bg-neutral-subtle hover:text-foreground-strongest active:bg-neutral/12',
  'current:bg-accent-subtle current:text-accent-subtle-foreground current:hover:bg-accent-subtle current:hover:text-accent-subtle-foreground',
  FocusRing,
  Transition,
].join(' ');

/** A sidebar link with an icon; `current` marks the page being shown. */
export function AppShellNavItem(props: AppShellNavItemProps) {
  const [local, rest] = splitProps(props, [
    'icon',
    'current',
    'end',
    'class',
    'children',
  ]);
  const end = children(() => local.end);

  return (
    <li class='m-0 p-0'>
      <a
        {...rest}
        aria-current={local.current ? 'page' : undefined}
        class={cn(NavLink, local.class)}
      >
        <Show when={local.icon}>
          {(icon) => (
            <Dynamic
              component={icon()}
              class='size-4 shrink-0'
              aria-hidden='true'
            />
          )}
        </Show>
        <span class='min-w-0 flex-1 truncate'>{local.children}</span>
        <Show when={end()}>
          <span class='shrink-0 text-xs tabular-nums'>{end()}</span>
        </Show>
      </a>
    </li>
  );
}
