import { Tabs as ArkTabs } from '@ark-ui/solid/tabs';
import { cva } from 'class-variance-authority';
import {
  type Component,
  For,
  type JSX,
  Show,
  createContext,
  createMemo,
  splitProps,
  useContext,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { Disabled, FocusRing, Transition } from '../core/control';
import { cn } from '../utils';

type IconComponent = Component<{
  class?: string;
  'aria-hidden'?: boolean | 'true';
}>;

export type TabsSize = 's' | 'm' | 'l';
export type TabsOrientation = 'horizontal' | 'vertical';

interface TabsStyle {
  size: TabsSize;
  orientation: TabsOrientation;
}

/** Hands the root's size and orientation to its tabs and panels. */
const TabsStyleContext = /* @__PURE__ */ createContext<TabsStyle>({
  size: 'm',
  orientation: 'horizontal',
});

/** The divider the tabs sit on; selected tabs draw over it. */
const list = cva('m-0 flex p-0', {
  variants: {
    orientation: {
      horizontal: 'flex-row items-stretch border-b border-border-muted',
      vertical: 'flex-col items-stretch border-l border-border-muted',
    },
    size: { s: '', m: '', l: '' },
  },
  compoundVariants: [
    // Horizontal tabs are spaced by gaps, so the line is as wide as the label.
    { orientation: 'horizontal', size: 's', class: 'gap-4' },
    { orientation: 'horizontal', size: 'm', class: 'gap-6' },
    { orientation: 'horizontal', size: 'l', class: 'gap-8' },
  ],
  defaultVariants: { orientation: 'horizontal', size: 'm' },
});

/**
 * One tab. The selected tab's line is an `::after` on the tab itself, so it
 * renders on the server and needs no measuring.
 */
const trigger = cva(
  [
    'relative m-0 box-border inline-flex shrink-0 cursor-pointer items-center rounded-md border-0 bg-transparent p-0 font-medium whitespace-nowrap',
    'text-foreground-muted hover:text-foreground-strongest selected:text-foreground-strongest',
    // The line is a 2 px border on a zero-height `::after`, so it stays on the scale.
    'after:absolute after:rounded-full after:border-transparent hover:after:border-border selected:after:border-foreground-strong selected:hover:after:border-foreground-strong',
    'disabled:text-foreground-subtle disabled:hover:text-foreground-subtle disabled:hover:after:border-transparent',
    Transition,
    Disabled,
  ],
  {
    variants: {
      orientation: {
        // Horizontal tabs have no padding, so labels line up with the content.
        // Their focus ring is a `::before` reaching 8 px past the label
        // (as Spectrum draws it), instead of an outline hugging the text.
        horizontal: [
          '-mb-px after:inset-x-0 after:bottom-0 after:border-b-2',
          'outline-none focus-visible:before:pointer-events-none focus-visible:before:absolute focus-visible:before:-inset-x-2 focus-visible:before:inset-y-1 focus-visible:before:rounded-md focus-visible:before:border-2 focus-visible:before:border-focus-ring',
        ],
        vertical: [
          '-ml-px w-full justify-start after:inset-y-0 after:left-0 after:border-l-2',
          FocusRing,
        ],
      },
      size: {
        s: 'h-8 gap-1 text-xs',
        m: 'h-10 gap-2 text-sm',
        l: 'h-12 gap-2 text-base',
      },
    },
    compoundVariants: [
      { orientation: 'vertical', size: 's', class: 'px-3' },
      { orientation: 'vertical', size: 'm', class: 'px-4' },
      { orientation: 'vertical', size: 'l', class: 'px-5' },
    ],
    defaultVariants: { orientation: 'horizontal', size: 'm' },
  }
);

const TabIconSize: Record<TabsSize, string> = {
  s: 'size-3',
  m: 'size-4',
  l: 'size-5',
};

const panel = cva(['min-w-0 rounded-md text-foreground', FocusRing], {
  variants: {
    // Vertical: the first line sits level with the first tab's label.
    orientation: { horizontal: 'pt-4', vertical: 'flex-1 pt-2 pl-6' },
  },
  defaultVariants: { orientation: 'horizontal' },
});

export interface TabItem {
  value: string;
  label: JSX.Element;
  icon?: IconComponent;
  disabled?: boolean;
  /** The panel's content. */
  content?: JSX.Element;
}

export interface TabsProps {
  /** The tabs and their panels. Leave it out and compose `TabList`, `Tab` and `TabPanel` as children instead. */
  items?: TabItem[];
  /** Selected tab, when you control it. */
  value?: string;
  /** Initially selected tab, when the tabs control themselves. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** `s`, `m` or `l`: 32, 40 and 48 px tall. */
  size?: TabsSize;
  orientation?: TabsOrientation;
  /** `automatic` (default) selects a tab as the arrow keys reach it; `manual` waits for Enter or Space. */
  activationMode?: 'automatic' | 'manual';
  /** Names the tab list for screen readers when nothing visible does (with `items`). */
  'aria-label'?: string;
  id?: string;
  class?: string;
  children?: JSX.Element;
}

/**
 * Tabs switch between views of the same thing (a page's Content, SEO and
 * History). Ark UI provides the keyboard: arrow keys move between tabs,
 * Home and End jump to the first and last.
 */
export function Tabs(props: TabsProps) {
  const [local, rest] = splitProps(props, [
    'items',
    'size',
    'orientation',
    'onValueChange',
    'aria-label',
    'class',
    'children',
  ]);
  // Read `items` once: inline JSX in it would be created anew on every read,
  // and the server and client would then disagree while hydrating.
  const items = createMemo(() => local.items);
  // Getters keep the context reactive to prop changes.
  const style: TabsStyle = {
    get size() {
      return local.size ?? 'm';
    },
    get orientation() {
      return local.orientation ?? 'horizontal';
    },
  };

  return (
    <TabsStyleContext.Provider value={style}>
      <ArkTabs.Root
        {...rest}
        orientation={style.orientation}
        onValueChange={(details) => local.onValueChange?.(details.value)}
        class={cn(
          'flex min-w-0',
          style.orientation === 'vertical'
            ? 'flex-row items-start'
            : 'flex-col',
          local.class
        )}
      >
        <Show when={items()} fallback={local.children}>
          {(list) => (
            <>
              <TabList aria-label={local['aria-label']}>
                <For each={list()}>
                  {(item) => (
                    <Tab
                      value={item.value}
                      icon={item.icon}
                      disabled={item.disabled}
                    >
                      {item.label}
                    </Tab>
                  )}
                </For>
              </TabList>
              <For each={list()}>
                {(item) => (
                  <TabPanel value={item.value}>{item.content}</TabPanel>
                )}
              </For>
            </>
          )}
        </Show>
      </ArkTabs.Root>
    </TabsStyleContext.Provider>
  );
}

export interface TabListProps {
  /** Names the tab list when no heading above it does. */
  'aria-label'?: string;
  class?: string;
  children?: JSX.Element;
}

/** The row (or column) of tabs. */
export function TabList(props: TabListProps) {
  const style = useContext(TabsStyleContext);
  return (
    <ArkTabs.List
      aria-label={props['aria-label']}
      class={cn(
        list({ orientation: style.orientation, size: style.size }),
        props.class
      )}
    >
      {props.children}
    </ArkTabs.List>
  );
}

export interface TabProps {
  value: string;
  icon?: IconComponent;
  disabled?: boolean;
  class?: string;
  children?: JSX.Element;
}

/** One tab: a label, with an optional icon before it. */
export function Tab(props: TabProps) {
  const style = useContext(TabsStyleContext);
  return (
    <ArkTabs.Trigger
      value={props.value}
      disabled={props.disabled}
      class={cn(
        trigger({ orientation: style.orientation, size: style.size }),
        props.class
      )}
    >
      <Show when={props.icon}>
        {(icon) => (
          <Dynamic
            component={icon()}
            class={cn('shrink-0', TabIconSize[style.size])}
            aria-hidden='true'
          />
        )}
      </Show>
      {props.children}
    </ArkTabs.Trigger>
  );
}

export interface TabPanelProps {
  value: string;
  class?: string;
  children?: JSX.Element;
}

/** The content shown while its tab is selected. */
export function TabPanel(props: TabPanelProps) {
  const style = useContext(TabsStyleContext);
  return (
    <ArkTabs.Content
      value={props.value}
      class={cn(panel({ orientation: style.orientation }), props.class)}
    >
      {props.children}
    </ArkTabs.Content>
  );
}
