import ArrowDown from 'lucide-solid/icons/arrow-down';
import ArrowUp from 'lucide-solid/icons/arrow-up';
import ChevronsUpDown from 'lucide-solid/icons/chevrons-up-down';
import {
  type JSX,
  Match,
  Show,
  Switch,
  children,
  createContext,
  splitProps,
  useContext,
} from 'solid-js';

import { FocusRing, Transition } from '../core/control';
import { cn } from '../utils';

export type TableDensity = 'compact' | 'regular';
export type TableAlign = 'start' | 'center' | 'end';
export type TableSort = 'ascending' | 'descending' | 'none';

interface TableStyle {
  density: TableDensity;
  striped: boolean;
  stickyHeader: boolean;
}

/** Hands the table's options to its rows and cells. */
const TableStyleContext = /* @__PURE__ */ createContext<TableStyle>({
  density: 'regular',
  striped: false,
  stickyHeader: false,
});

/** Rows in `<thead>` don't take hover, stripes or selection. */
const TableHeadContext = /* @__PURE__ */ createContext(false);

/** Cell padding per density: 32 and 44 px rows at the default text size. */
const CellDensity: Record<TableDensity, string> = {
  compact: 'h-8 px-3 py-1',
  regular: 'h-11 px-4 py-2',
};

const CellAlign: Record<TableAlign, string> = {
  start: 'text-start',
  center: 'text-center',
  // Numbers and dates line up by their digits, and never wrap.
  end: 'text-end whitespace-nowrap tabular-nums',
};

export interface TableProps {
  /** `compact` for dense admin lists, `regular` (default) elsewhere. */
  density?: TableDensity;
  /** Shades every other body row. */
  striped?: boolean;
  /** Keeps the header row in view while the table scrolls. Give the table a height (e.g. `class='max-h-96'`). */
  stickyHeader?: boolean;
  /** Names the table. Use a visible heading with `aria-labelledby` where there is one. */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /** A visible caption above the table. */
  caption?: JSX.Element;
  id?: string;
  /** Applies to the scroll container around the table. */
  class?: string;
  children?: JSX.Element;
}

/**
 * Styling for a data table: compose `THead`, `TBody`, `TRow`, `TH` and
 * `TCell` inside. Sorting, selection and paging logic stay with the app;
 * these parts only show their state. Wide tables scroll sideways.
 */
export function Table(props: TableProps) {
  const [local, rest] = splitProps(props, [
    'density',
    'striped',
    'stickyHeader',
    'caption',
    'class',
    'children',
  ]);
  // Getters keep the context reactive to prop changes.
  const style: TableStyle = {
    get density() {
      return local.density ?? 'regular';
    },
    get striped() {
      return Boolean(local.striped);
    },
    get stickyHeader() {
      return Boolean(local.stickyHeader);
    },
  };
  const caption = children(() => local.caption);

  return (
    <TableStyleContext.Provider value={style}>
      <div class={cn('relative w-full min-w-0 overflow-auto', local.class)}>
        <table
          {...rest}
          class='m-0 w-full border-separate border-spacing-0 text-sm text-foreground'
        >
          <Show when={caption()}>
            <caption class='pb-3 text-start text-sm font-semibold text-foreground-strong'>
              {caption()}
            </caption>
          </Show>
          {local.children}
        </table>
      </div>
    </TableStyleContext.Provider>
  );
}

export interface TableSectionProps {
  class?: string;
  children?: JSX.Element;
}

/** The header rows. */
export function THead(props: TableSectionProps) {
  return (
    <TableHeadContext.Provider value={true}>
      <thead class={props.class}>{props.children}</thead>
    </TableHeadContext.Provider>
  );
}

/** The body rows. */
export function TBody(props: TableSectionProps) {
  return <tbody class={props.class}>{props.children}</tbody>;
}

export interface TRowProps {
  /** Highlights the row, e.g. while its checkbox is checked. Pair it with a visible control that says so. */
  selected?: boolean;
  id?: string;
  onClick?: JSX.EventHandlerUnion<HTMLTableRowElement, MouseEvent>;
  class?: string;
  children?: JSX.Element;
}

/** A row. Body rows highlight on hover; a selected row takes the accent tint. */
export function TRow(props: TRowProps) {
  const [local, rest] = splitProps(props, ['selected', 'class', 'children']);
  const style = useContext(TableStyleContext);
  const inHead = useContext(TableHeadContext);

  return (
    <tr
      {...rest}
      aria-selected={!inHead && local.selected ? 'true' : undefined}
      class={cn(
        !inHead && [
          'motion-safe:transition-colors motion-safe:duration-100 motion-safe:ease-standard',
          style.striped && 'even:bg-surface-muted',
          'hover:bg-neutral-subtle selected:bg-accent-subtle selected:hover:bg-accent/12',
        ],
        local.class
      )}
    >
      {local.children}
    </tr>
  );
}

export interface TCellProps {
  /** `end` for numbers and dates, so they line up. */
  align?: TableAlign;
  colSpan?: number;
  rowSpan?: number;
  class?: string;
  children?: JSX.Element;
}

/** A data cell. */
export function TCell(props: TCellProps) {
  const style = useContext(TableStyleContext);
  return (
    <td
      colSpan={props.colSpan}
      rowSpan={props.rowSpan}
      class={cn(
        'box-border border-b border-border-muted align-middle',
        CellDensity[style.density],
        CellAlign[props.align ?? 'start'],
        props.class
      )}
    >
      {props.children}
    </td>
  );
}

export interface THProps {
  /** Makes the header sortable: it renders a button and shows the direction. */
  sort?: TableSort;
  /** Called when the header's sort button is pressed; the app decides the next direction. */
  onSort?: () => void;
  align?: TableAlign;
  /** `col` (default) for column headers; `row` for a header cell at the start of a body row. */
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
  colSpan?: number;
  rowSpan?: number;
  class?: string;
  children?: JSX.Element;
}

const SortButton = [
  'm-0 inline-flex cursor-pointer items-center gap-1 rounded-sm border-0 bg-transparent p-0 font-semibold text-inherit',
  'hover:text-foreground-strongest',
  FocusRing,
  Transition,
].join(' ');

/**
 * A header cell. With `sort` or `onSort` it holds a button that shows the
 * sort direction and sets `aria-sort` on the column.
 */
export function TH(props: THProps) {
  const style = useContext(TableStyleContext);
  const inHead = useContext(TableHeadContext);
  const sortable = () => props.sort !== undefined || props.onSort !== undefined;
  const sort = () => props.sort ?? 'none';

  return (
    <th
      scope={props.scope ?? (inHead ? 'col' : 'row')}
      colSpan={props.colSpan}
      rowSpan={props.rowSpan}
      aria-sort={sortable() && sort() !== 'none' ? sort() : undefined}
      class={cn(
        'box-border align-middle font-semibold whitespace-nowrap',
        inHead
          ? 'border-b border-border text-foreground-muted'
          : 'border-b border-border-muted text-foreground-strong',
        CellDensity[style.density],
        CellAlign[props.align ?? 'start'],
        inHead && style.stickyHeader && 'sticky top-0 z-10 bg-surface',
        props.class
      )}
    >
      <Show when={sortable()} fallback={props.children}>
        <button
          type='button'
          class={cn(
            SortButton,
            sort() !== 'none' && 'text-foreground-strongest'
          )}
          onClick={() => props.onSort?.()}
        >
          {props.children}
          <Switch
            fallback={
              <ChevronsUpDown
                class='size-4 shrink-0 text-foreground-subtle'
                aria-hidden='true'
              />
            }
          >
            <Match when={sort() === 'ascending'}>
              <ArrowUp class='size-4 shrink-0' aria-hidden='true' />
            </Match>
            <Match when={sort() === 'descending'}>
              <ArrowDown class='size-4 shrink-0' aria-hidden='true' />
            </Match>
          </Switch>
        </button>
      </Show>
    </th>
  );
}
