import {
  DatePicker as ArkDatePicker,
  type DateValue,
  parseDate,
} from '@ark-ui/solid/date-picker';
import { useFieldContext } from '@ark-ui/solid/field';
import CalendarIcon from 'lucide-solid/icons/calendar';
import ChevronLeft from 'lucide-solid/icons/chevron-left';
import ChevronRight from 'lucide-solid/icons/chevron-right';
import { Index, createMemo, createSignal, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';

import {
  ControlReset,
  Disabled,
  FocusRing,
  IconSize,
  type Size,
  Transition,
} from '../core/control';
import { InputBase, InputSize } from '../core/field';
import { PopoverSurface } from '../core/popover';
import { cn } from '../utils';
import {
  InputTrailingPadding,
  TrailingButton,
  TrailingButtonSize,
} from './Combobox';
import { Field, type FieldOptions } from './Field';

/** Previous and next month (or year, or decade). */
const NavButton = [
  'inline-flex size-8 shrink-0 items-center justify-center rounded-md border-0 bg-transparent p-0',
  ControlReset,
  'cursor-pointer text-foreground-muted hover:bg-neutral-subtle hover:text-foreground-strong active:bg-neutral/12',
  'disabled:bg-transparent disabled:text-foreground-subtle',
  Disabled,
  FocusRing,
  Transition,
].join(' ');

/** "November 2026": switches to the month view, then the year view. */
const TitleButton = [
  'inline-flex h-8 items-center rounded-md border-0 bg-transparent px-2',
  ControlReset,
  'cursor-pointer text-sm font-semibold text-foreground-strong hover:bg-neutral-subtle active:bg-neutral/12',
  FocusRing,
  Transition,
].join(' ');

const Table = 'm-0 w-full border-collapse outline-none';
const HeaderCell =
  'h-8 p-0 text-center text-xs font-medium text-foreground-muted';

/** States shared by day, month and year cells. Today is bold accent; the selection is filled. */
const CellState = [
  'flex cursor-pointer items-center justify-center rounded-md text-sm text-foreground-strong select-none',
  'hover:bg-neutral-subtle active:bg-neutral/12',
  'data-today:font-semibold data-today:text-accent',
  'data-selected:bg-accent data-selected:text-accent-foreground data-selected:hover:bg-accent-hover data-today:data-selected:text-accent-foreground',
  'data-disabled:cursor-not-allowed data-disabled:bg-transparent data-disabled:font-normal data-disabled:text-foreground-subtle',
  'data-unavailable:line-through',
  FocusRing,
  Transition,
].join(' ');

/** Days outside the shown month leave their cell empty. */
const DayCell = cn(CellState, 'mx-auto size-9 data-outside-range:invisible');
const PeriodCell = cn(CellState, 'h-10 w-full');

export interface DatePickerProps extends FieldOptions {
  size?: Size;
  /** The date as ISO text, `YYYY-MM-DD`; `null` is an empty field. */
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  /** Earliest selectable date, `YYYY-MM-DD`. */
  min?: string;
  /** Latest selectable date, `YYYY-MM-DD`. */
  max?: string;
  /** Submits the ISO date (not the formatted text) with a plain form. */
  name?: string;
  placeholder?: string;
  /** BCP 47 locale for the typed format and the calendar. Defaults to Ark's locale (en-US). */
  locale?: string;
  /** Required when there is no visible `label`. */
  'aria-label'?: string;
  class?: string;
}

/** `YYYY-MM-DD` to Ark's date; anything unparsable is no date. */
function toDate(iso: string | null | undefined): DateValue | undefined {
  if (!iso) return undefined;
  try {
    return parseDate(iso);
  } catch {
    return undefined;
  }
}

function toDates(iso: string | null | undefined): DateValue[] | undefined {
  if (iso === undefined) return undefined;
  const date = toDate(iso);
  return date ? [date] : [];
}

/**
 * One date, typed or picked from a calendar: a publish date, an event date.
 * Values go in and out as ISO text (`YYYY-MM-DD`), the way the CMS stores them.
 */
export function DatePicker(props: DatePickerProps) {
  const [field] = splitProps(props, [
    'label',
    'description',
    'errorText',
    'required',
    'invalid',
    'disabled',
    'readOnly',
    'id',
    'class',
  ]);

  return (
    <Field {...field}>
      <DatePickerControl {...props} />
    </Field>
  );
}

/** Rendered inside Field, so it can read the field's ids: Ark's date picker doesn't do that itself. */
function DatePickerControl(props: DatePickerProps) {
  const fieldContext = useFieldContext();
  const size = () => props.size ?? 'm';

  // The ISO value, kept for the hidden form input when uncontrolled.
  const [picked, setPicked] = createSignal(props.defaultValue ?? null);
  const current = () => (props.value !== undefined ? props.value : picked());
  const value = createMemo(() => toDates(props.value));

  return (
    <>
      <ArkDatePicker.Root
        ids={{
          label: () => fieldContext?.().ids.label ?? '',
          input: () => fieldContext?.().ids.control ?? '',
        }}
        value={value()}
        defaultValue={toDates(props.defaultValue)}
        onValueChange={(details) => {
          const iso = details.value[0]?.toString() ?? null;
          setPicked(iso);
          props.onValueChange?.(iso);
        }}
        min={toDate(props.min)}
        max={toDate(props.max)}
        locale={props.locale}
        placeholder={props.placeholder}
        disabled={props.disabled}
        readOnly={props.readOnly}
        invalid={props.invalid}
        required={props.required}
        positioning={{ placement: 'bottom-start', gutter: 4 }}
        lazyMount
        unmountOnExit
        class='w-full'
      >
        <ArkDatePicker.Control class='group/control relative flex items-center'>
          <ArkDatePicker.Input
            aria-label={props['aria-label']}
            aria-describedby={fieldContext?.().ariaDescribedby}
            class={cn(
              InputBase,
              InputSize[size()],
              InputTrailingPadding[size()],
              'group-hover/control:border-foreground-muted'
            )}
          />
          <ArkDatePicker.Trigger
            disabled={props.disabled || props.readOnly}
            class={cn(
              TrailingButton,
              TrailingButtonSize[size()],
              FocusRing,
              'rounded-md'
            )}
          >
            <CalendarIcon class={IconSize[size()]} aria-hidden='true' />
          </ArkDatePicker.Trigger>
        </ArkDatePicker.Control>

        <Portal>
          <ArkDatePicker.Positioner>
            <ArkDatePicker.Content class={cn(PopoverSurface, 'w-72 p-3')}>
              <ArkDatePicker.View view='day'>
                <ArkDatePicker.Context>
                  {(api) => (
                    <>
                      <ViewHeader />
                      <ArkDatePicker.Table class={Table}>
                        <ArkDatePicker.TableHead>
                          <ArkDatePicker.TableRow>
                            <Index each={api().weekDays}>
                              {(weekDay) => (
                                <ArkDatePicker.TableHeader
                                  abbr={weekDay().long}
                                  class={HeaderCell}
                                >
                                  {weekDay().narrow}
                                </ArkDatePicker.TableHeader>
                              )}
                            </Index>
                          </ArkDatePicker.TableRow>
                        </ArkDatePicker.TableHead>
                        <ArkDatePicker.TableBody>
                          <Index each={api().weeks}>
                            {(week) => (
                              <ArkDatePicker.TableRow>
                                <Index each={week()}>
                                  {(day) => (
                                    <ArkDatePicker.TableCell
                                      value={day()}
                                      class='p-0'
                                    >
                                      <ArkDatePicker.TableCellTrigger
                                        class={DayCell}
                                      >
                                        {day().day}
                                      </ArkDatePicker.TableCellTrigger>
                                    </ArkDatePicker.TableCell>
                                  )}
                                </Index>
                              </ArkDatePicker.TableRow>
                            )}
                          </Index>
                        </ArkDatePicker.TableBody>
                      </ArkDatePicker.Table>
                    </>
                  )}
                </ArkDatePicker.Context>
              </ArkDatePicker.View>

              <ArkDatePicker.View view='month'>
                <ArkDatePicker.Context>
                  {(api) => (
                    <>
                      <ViewHeader />
                      <ArkDatePicker.Table columns={4} class={Table}>
                        <ArkDatePicker.TableBody>
                          <Index
                            each={api().getMonthsGrid({
                              columns: 4,
                              format: 'short',
                            })}
                          >
                            {(months) => (
                              <ArkDatePicker.TableRow>
                                <Index each={months()}>
                                  {(month) => (
                                    <ArkDatePicker.TableCell
                                      value={month().value}
                                      class='p-1'
                                    >
                                      <ArkDatePicker.TableCellTrigger
                                        class={PeriodCell}
                                      >
                                        {month().label}
                                      </ArkDatePicker.TableCellTrigger>
                                    </ArkDatePicker.TableCell>
                                  )}
                                </Index>
                              </ArkDatePicker.TableRow>
                            )}
                          </Index>
                        </ArkDatePicker.TableBody>
                      </ArkDatePicker.Table>
                    </>
                  )}
                </ArkDatePicker.Context>
              </ArkDatePicker.View>

              <ArkDatePicker.View view='year'>
                <ArkDatePicker.Context>
                  {(api) => (
                    <>
                      <ViewHeader />
                      <ArkDatePicker.Table columns={4} class={Table}>
                        <ArkDatePicker.TableBody>
                          <Index each={api().getYearsGrid({ columns: 4 })}>
                            {(years) => (
                              <ArkDatePicker.TableRow>
                                <Index each={years()}>
                                  {(year) => (
                                    <ArkDatePicker.TableCell
                                      value={year().value}
                                      class='p-1'
                                    >
                                      <ArkDatePicker.TableCellTrigger
                                        class={PeriodCell}
                                      >
                                        {year().label}
                                      </ArkDatePicker.TableCellTrigger>
                                    </ArkDatePicker.TableCell>
                                  )}
                                </Index>
                              </ArkDatePicker.TableRow>
                            )}
                          </Index>
                        </ArkDatePicker.TableBody>
                      </ArkDatePicker.Table>
                    </>
                  )}
                </ArkDatePicker.Context>
              </ArkDatePicker.View>
            </ArkDatePicker.Content>
          </ArkDatePicker.Positioner>
        </Portal>
      </ArkDatePicker.Root>
      <input
        type='hidden'
        name={props.name}
        value={current() ?? ''}
        disabled={props.disabled}
      />
    </>
  );
}

/** Previous, the visible period (press it to zoom out), next. */
function ViewHeader() {
  return (
    <ArkDatePicker.ViewControl class='mb-2 flex items-center justify-between gap-1'>
      <ArkDatePicker.PrevTrigger class={NavButton}>
        <ChevronLeft class='size-4' aria-hidden='true' />
      </ArkDatePicker.PrevTrigger>
      <ArkDatePicker.ViewTrigger class={TitleButton}>
        <ArkDatePicker.RangeText />
      </ArkDatePicker.ViewTrigger>
      <ArkDatePicker.NextTrigger class={NavButton}>
        <ChevronRight class='size-4' aria-hidden='true' />
      </ArkDatePicker.NextTrigger>
    </ArkDatePicker.ViewControl>
  );
}
