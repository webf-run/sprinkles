import { useFieldContext } from '@ark-ui/solid/field';
import { useLocaleContext } from '@ark-ui/solid/locale';
import {
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
  on,
  onCleanup,
  onMount,
  splitProps,
} from 'solid-js';

import type { Size } from '../core/control';
import { InputGroupBase, InputSize } from '../core/field';
import { cn } from '../utils';
import { Field, type FieldOptions } from './Field';

/** The smallest unit shown: `'hour'` shows only hours, `'second'` adds seconds. */
export type TimeGranularity = 'hour' | 'minute' | 'second';

type Kind = 'hour' | 'minute' | 'second' | 'period';
type Period = 'am' | 'pm';

/** What each segment shows. `hour` is in the displayed cycle: 0-23, or 1-12 with a period. */
interface Parts {
  hour: number | null;
  minute: number | null;
  second: number | null;
  period: Period | null;
}

const Empty: Parts = { hour: null, minute: null, second: null, period: null };

/** Room around the segments; each segment adds its own 4 px. */
const FieldPadding: Record<Size, string> = {
  s: 'px-1',
  m: 'px-2',
  l: 'px-2',
  xl: 'px-3',
};

/** A segment is the field's height minus 8 px, so its highlight sits inside the border. */
const SegmentHeight: Record<Size, string> = {
  s: 'h-4',
  m: 'h-6',
  l: 'h-8',
  xl: 'h-10',
};

/** Two digits wide, so "9" and "10" don't shift the field. */
const SegmentWidth: Record<Size, string> = {
  s: 'min-w-4',
  m: 'min-w-5',
  l: 'min-w-6',
  xl: 'min-w-6',
};

const SegmentRadius: Record<Size, string> = {
  s: 'rounded-sm',
  m: 'rounded-md',
  l: 'rounded-md',
  xl: 'rounded-lg',
};

const SegmentName: Record<Kind, string> = {
  hour: 'Hour',
  minute: 'Minute',
  second: 'Second',
  period: 'AM/PM',
};

function segmentName(kind: Kind, locale: string): string {
  try {
    const field = kind === 'period' ? 'dayPeriod' : kind;
    return (
      new Intl.DisplayNames(locale, { type: 'dateTimeField' }).of(field) ??
      SegmentName[kind]
    );
  } catch {
    return SegmentName[kind];
  }
}

export interface TimeFieldProps extends FieldOptions {
  size?: Size;
  /** The time as ISO text in 24 hours, `HH:mm` or `HH:mm:ss`; `null` is an empty field. */
  value?: string | null;
  defaultValue?: string | null;
  /** Called with a complete time, or `null` once a segment is empty. */
  onValueChange?: (value: string | null) => void;
  /** The smallest unit shown. Defaults to `'minute'`. */
  granularity?: TimeGranularity;
  /** 12 shows AM and PM, 24 does not. Defaults to the locale's. */
  hourCycle?: 12 | 24;
  /** Earliest valid time, `HH:mm` or `HH:mm:ss`. An earlier time marks the field invalid. */
  min?: string;
  /** Latest valid time, `HH:mm` or `HH:mm:ss`. Earlier than `min`, the range runs past midnight. */
  max?: string;
  /** What the arrow keys add to the minutes: 15 steps 9:00, 9:15, 9:30. Defaults to 1. */
  minuteStep?: number;
  /** Where the arrow keys start in an empty field, `HH:mm`. Defaults to midnight. */
  placeholderValue?: string;
  /** Submits the time, as `HH:mm:ss`, with a plain form. */
  name?: string;
  /** BCP 47 locale for the hour cycle, the AM and PM labels and the segment names. Defaults to Ark's locale (en-US). */
  locale?: string;
  /** Required when there is no visible `label`. */
  'aria-label'?: string;
  class?: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** `HH:mm` or `HH:mm:ss` to its parts; anything else is no time. */
function parseTime(iso: string | null | undefined) {
  const match = iso ? /^(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(iso.trim()) : null;
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  const second = match[3] === undefined ? 0 : Number(match[3]);
  if (hour > 23 || minute > 59 || second > 59) return null;
  return { hour, minute, second };
}

const toSeconds = (iso: string | null | undefined) => {
  const time = parseTime(iso);
  return time ? time.hour * 3600 + time.minute * 60 + time.second : null;
};

function toParts(
  iso: string | null | undefined,
  cycle: 12 | 24,
  granularity: TimeGranularity
): Parts {
  const time = parseTime(iso);
  if (!time) return { ...Empty };
  return {
    hour: cycle === 24 ? time.hour : time.hour % 12 || 12,
    minute: granularity === 'hour' ? 0 : time.minute,
    second: granularity === 'second' ? time.second : 0,
    period: cycle === 12 ? (time.hour >= 12 ? 'pm' : 'am') : null,
  };
}

/** The ISO time once every shown segment has a value, otherwise `null`. */
function toValue(
  parts: Parts,
  cycle: 12 | 24,
  granularity: TimeGranularity
): string | null {
  if (parts.hour === null) return null;
  if (granularity !== 'hour' && parts.minute === null) return null;
  if (granularity === 'second' && parts.second === null) return null;
  if (cycle === 12 && parts.period === null) return null;
  const hour =
    cycle === 24
      ? parts.hour
      : (parts.hour % 12) + (parts.period === 'pm' ? 12 : 0);
  const base = `${pad(hour)}:${pad(granularity === 'hour' ? 0 : (parts.minute ?? 0))}`;
  return granularity === 'second' ? `${base}:${pad(parts.second ?? 0)}` : base;
}

/** 12 or 24 hours, as the locale writes the time. */
function localeCycle(locale: string): 12 | 24 {
  try {
    const cycle = new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
    }).resolvedOptions().hourCycle;
    return cycle === 'h11' || cycle === 'h12' ? 12 : 24;
  } catch {
    return 12;
  }
}

/** "AM" and "PM" as the locale writes them. */
function periodLabels(locale: string): Record<Period, string> {
  try {
    const format = new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      hour12: true,
    });
    const label = (hour: number) =>
      format
        .formatToParts(new Date(2000, 0, 1, hour))
        .find((part) => part.type === 'dayPeriod')?.value;
    return { am: label(0) ?? 'AM', pm: label(12) ?? 'PM' };
  } catch {
    return { am: 'AM', pm: 'PM' };
  }
}

/** Whether the locale writes AM and PM before the hour: 오전 9:30. */
function periodFirst(locale: string): boolean {
  try {
    const types = new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      hour12: true,
    })
      .formatToParts(new Date(2000, 0, 1, 9))
      .map((part) => part.type);
    const period = types.indexOf('dayPeriod');
    return period !== -1 && period < types.indexOf('hour');
  } catch {
    return false;
  }
}

/**
 * The editing state: which segments are shown, what each holds, and what
 * typing and the arrow keys do to them. Kept apart from the markup so the
 * field can read `value` (for the range check) before it renders.
 */
function createTimeState(props: TimeFieldProps, cycle: () => 12 | 24) {
  const granularity = () => props.granularity ?? 'minute';
  const initial = props.value !== undefined ? props.value : props.defaultValue;
  let lastControlledValue = props.value;
  let lastEmittedValue: string | null | undefined = initial;
  let previousCycle = cycle();
  const [parts, setParts] = createSignal<Parts>(
    toParts(initial, cycle(), granularity())
  );
  const value = createMemo(() => toValue(parts(), cycle(), granularity()));
  // The last value handed to `onValueChange`, so it only fires on a change.
  let last = value();
  // Digits typed into the segment in focus: "1" then "5" makes 15.
  let buffer = '';
  let bufferKind: Kind | null = null;

  const kinds = createMemo<Kind[]>(() => [
    'hour',
    ...(granularity() === 'hour' ? [] : (['minute'] as const)),
    ...(granularity() === 'second' ? (['second'] as const) : []),
    ...(cycle() === 12 ? (['period'] as const) : []),
  ]);

  // Where the arrows start in an empty segment, and the period an hour gets.
  const seed = () =>
    toParts(props.placeholderValue ?? '00:00', cycle(), 'second');

  const minuteStep = () => {
    const step = props.minuteStep;
    return step !== undefined && Number.isInteger(step) && step > 0 ? step : 1;
  };

  /** Shows `next`, and reports the value if it changed. */
  const commit = (next: Parts) => {
    setParts(next);
    const result = toValue(next, cycle(), granularity());
    if (result === last) return;
    last = result;
    lastEmittedValue = result;
    props.onValueChange?.(result);
  };

  const update = (patch: Partial<Parts>) => commit({ ...parts(), ...patch });

  // A controlled value that differs from what is shown replaces it. A value
  // echoed back from `onValueChange` is equal, so it never interrupts typing.
  createEffect(
    on(
      () => props.value,
      (next) => {
        if (next === undefined) return;
        if (Object.is(next, lastEmittedValue)) {
          lastControlledValue = next;
          return;
        }
        if (Object.is(next, lastControlledValue)) return;
        lastControlledValue = next;
        const fresh = toParts(next, cycle(), granularity());
        setParts(fresh);
        last = toValue(fresh, cycle(), granularity());
        resetBuffer();
      },
      { defer: true }
    )
  );

  // Keeps what's typed when the hour cycle or granularity changes.
  createEffect(
    on(
      () => [cycle(), granularity()] as const,
      ([nextCycle]) => {
        const current = parts();
        let hour = current.hour;
        let period = current.period;

        if (hour !== null && previousCycle !== nextCycle) {
          if (nextCycle === 12) {
            period = hour >= 12 ? 'pm' : 'am';
            hour = hour % 12 || 12;
          } else {
            hour = (hour % 12) + (period === 'pm' ? 12 : 0);
          }
        }
        previousCycle = nextCycle;
        resetBuffer();
        commit({
          hour,
          minute: current.minute,
          second: current.second,
          period: nextCycle === 12 ? period : null,
        });
      },
      { defer: true }
    )
  );

  /** An hour, and with it the period of a 12-hour field that has none yet. */
  const setHour = (hour: number) =>
    update({
      hour,
      period: cycle() === 12 ? (parts().period ?? seed().period ?? 'am') : null,
    });

  const set = (kind: Kind, n: number) => {
    if (kind === 'hour') setHour(n);
    else if (kind === 'minute') update({ minute: n });
    else if (kind === 'second') update({ second: n });
  };

  const resetBuffer = () => {
    buffer = '';
    bufferKind = null;
  };

  /** Types one digit. Returns true once the segment is complete, so focus can move on. */
  const type = (kind: Kind, digit: number): boolean => {
    if (kind === 'period') return false;
    if (bufferKind !== kind) {
      buffer = '';
      bufferKind = kind;
    }
    const twelve = kind === 'hour' && cycle() === 12;
    const max = kind === 'hour' ? (twelve ? 12 : 23) : 59;
    const min = twelve ? 1 : 0;
    // The largest first digit that can still take a second one.
    const lead = Math.floor(max / 10);

    if (buffer === '') {
      if (digit > lead) {
        set(kind, digit);
        return true;
      }
      if (twelve && digit === 0) {
        buffer = '0';
        return false;
      }
      buffer = String(digit);
      set(kind, digit);
      return false;
    }
    if (twelve && buffer === '0') {
      if (digit === 0) return false;
      buffer = '';
      set(kind, digit);
      return true;
    }
    const n = Number(buffer + String(digit));
    if (n >= min && n <= max) {
      buffer = '';
      set(kind, n);
      return true;
    }
    // Doesn't fit (a 7 after a 2 in a 24-hour field): start over with this digit.
    buffer = '';
    return type(kind, digit);
  };

  /** One arrow press. An empty segment starts at the placeholder time. */
  const step = (kind: Kind, direction: 1 | -1, big = false) => {
    resetBuffer();
    const current = parts();
    if (kind === 'period') {
      const from = current.period ?? seed().period ?? 'am';
      update({
        period: current.period === null ? from : from === 'am' ? 'pm' : 'am',
      });
      return;
    }
    if (kind === 'hour') {
      if (current.hour === null) {
        setHour(seed().hour ?? 0);
        return;
      }
      const low = cycle() === 12 ? 1 : 0;
      const size = cycle() === 12 ? 12 : 24;
      const delta = (big ? 3 : 1) * direction;
      setHour(low + ((((current.hour - low + delta) % size) + size) % size));
      return;
    }
    const now = kind === 'minute' ? current.minute : current.second;
    if (now === null) {
      set(kind, (kind === 'minute' ? seed().minute : seed().second) ?? 0);
      return;
    }
    const unit = kind === 'minute' ? minuteStep() : 1;
    let n = now;
    for (let i = 0; i < (big ? 5 : 1); i++) {
      n =
        direction === 1
          ? (Math.floor(n / unit) + 1) * unit
          : (Math.ceil(n / unit) - 1) * unit;
    }
    set(kind, ((n % 60) + 60) % 60);
  };

  /** Home and End: the segment's first and last value. */
  const edge = (kind: Kind, end: boolean) => {
    resetBuffer();
    if (kind === 'period') update({ period: end ? 'pm' : 'am' });
    else if (kind === 'hour')
      setHour(end ? (cycle() === 12 ? 12 : 23) : cycle() === 12 ? 1 : 0);
    else set(kind, end ? 59 : 0);
  };

  const clear = (kind: Kind) => {
    resetBuffer();
    update({ [kind]: null });
  };

  const setPeriod = (period: Period) => {
    resetBuffer();
    update({ period });
  };

  return {
    parts,
    value,
    kinds,
    type,
    step,
    edge,
    clear,
    setPeriod,
    resetBuffer,
  };
}

type TimeState = ReturnType<typeof createTimeState>;

/**
 * A time of day, typed one segment at a time: hour, minute, optionally
 * seconds, and AM or PM. Values go in and out as ISO text (`HH:mm`), the way
 * a form or a CMS stores them. Type digits, or use the arrow keys.
 */
export function TimeField(props: TimeFieldProps) {
  const [field] = splitProps(props, [
    'label',
    'description',
    'errorText',
    'required',
    'disabled',
    'readOnly',
    'id',
    'class',
  ]);
  const arkLocale = useLocaleContext();
  const locale = () => props.locale ?? arkLocale().locale;
  const cycle = () => props.hourCycle ?? localeCycle(locale());
  const [, control] = splitProps(props, ['class']);
  const time = createTimeState(props, cycle);

  // A malformed `min` or `max` is ignored; `min` after `max` runs past midnight.
  const outOfRange = createMemo(() => {
    const now = toSeconds(time.value());
    if (now === null) return false;
    const min = toSeconds(props.min);
    const max = toSeconds(props.max);
    if (min !== null && max !== null && min > max)
      return now < min && now > max;
    return (min !== null && now < min) || (max !== null && now > max);
  });

  // The time as a form sends it: `08:45:00`.
  const formValue = () => {
    const current = time.value();
    return current ? (current.length === 5 ? `${current}:00` : current) : '';
  };

  return (
    <Field {...field} invalid={props.invalid || outOfRange()}>
      <TimeFieldControl
        {...control}
        time={time}
        locale={locale()}
        cycle={cycle()}
      />
      <input
        type='hidden'
        name={props.name}
        value={formValue()}
        disabled={props.disabled}
      />
    </Field>
  );
}

interface ControlProps extends TimeFieldProps {
  time: TimeState;
  cycle: 12 | 24;
  locale: string;
}

/** Rendered inside Field, so it can read the field's ids and states. */
function TimeFieldControl(props: ControlProps) {
  const fieldContext = useFieldContext();
  const size = () => props.size ?? 'm';
  const disabled = () => fieldContext?.().disabled ?? props.disabled ?? false;
  const readOnly = () => fieldContext?.().readOnly ?? props.readOnly ?? false;
  const invalid = () => fieldContext?.().invalid ?? props.invalid ?? false;
  const editable = () => !disabled() && !readOnly();
  const labels = createMemo(() => periodLabels(props.locale));
  // AM/PM goes where the locale writes it: 9:30 AM, but 오전 9:30.
  const kinds = createMemo(() => {
    const shown = props.time.kinds();
    if (!shown.includes('period') || !periodFirst(props.locale)) return shown;
    return ['period', ...shown.filter((kind) => kind !== 'period')] as Kind[];
  });

  let group!: HTMLDivElement;

  const focusFirstSegment = () => {
    const segments = group.querySelectorAll<HTMLElement>('[role="spinbutton"]');
    const empty = [...segments].find(
      (s) => s.dataset.placeholder !== undefined
    );
    (empty ?? segments[0])?.focus();
  };

  // The label points at a segment, which a browser doesn't treat as a
  // labelable control, so it needs its own click handler.
  onMount(() => {
    const label = group.parentElement?.querySelector('label');
    label?.addEventListener('click', focusFirstSegment);
    onCleanup(() => label?.removeEventListener('click', focusFirstSegment));
  });

  // Clicking the field's padding or a colon focuses a segment too.
  const focusFirst = (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest('[role="spinbutton"]')) return;
    focusFirstSegment();
  };

  return (
    // Times read left to right in every locale, right-to-left ones included.
    <div
      ref={group}
      role='group'
      dir='ltr'
      aria-label={props['aria-label']}
      aria-labelledby={
        props['aria-label'] ? undefined : fieldContext?.().ids.label
      }
      data-invalid={invalid() ? '' : undefined}
      data-disabled={disabled() ? '' : undefined}
      data-readonly={readOnly() ? '' : undefined}
      onClick={focusFirst}
      class={cn(
        InputGroupBase,
        'inline-flex w-fit max-w-full items-center gap-1',
        InputSize[size()],
        FieldPadding[size()]
      )}
    >
      <For each={kinds()}>
        {(kind, index) => (
          <>
            <Show when={kind === 'minute' || kind === 'second'}>
              <span aria-hidden='true' class='-mx-1 select-none'>
                :
              </span>
            </Show>
            <Segment
              kind={kind}
              id={index() === 0 ? fieldContext?.().ids.control : undefined}
              time={props.time}
              cycle={props.cycle}
              labels={labels()}
              locale={props.locale}
              size={size()}
              disabled={disabled()}
              readOnly={readOnly()}
              invalid={invalid()}
              editable={editable()}
              required={props.required ?? false}
              describedBy={fieldContext?.().ariaDescribedby}
            />
          </>
        )}
      </For>
    </div>
  );
}

interface SegmentProps {
  kind: Kind;
  id?: string;
  time: TimeState;
  cycle: 12 | 24;
  labels: Record<Period, string>;
  locale: string;
  size: Size;
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
  editable: boolean;
  required: boolean;
  describedBy?: string;
}

function Segment(props: SegmentProps) {
  const raw = () => props.time.parts()[props.kind];

  const text = () => {
    const value = raw();
    if (value === null) return '––';
    if (props.kind === 'period') return props.labels[value as Period];
    // 12-hour hours are written without a leading zero: 9:45 AM.
    return props.kind === 'hour' && props.cycle === 12
      ? String(value)
      : pad(value as number);
  };

  const range = () => {
    if (props.kind === 'hour')
      return props.cycle === 12 ? { min: 1, max: 12 } : { min: 0, max: 23 };
    return props.kind === 'period' ? null : { min: 0, max: 59 };
  };

  /** Moves focus to the next or previous segment, skipping the separators. */
  const move = (from: HTMLElement, direction: 1 | -1) => {
    const group = from.closest('[role="group"]');
    const segments = [
      ...(group?.querySelectorAll<HTMLElement>('[role="spinbutton"]') ?? []),
    ];
    segments[segments.indexOf(from) + direction]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const element = event.currentTarget as HTMLElement;
    const { kind, time } = props;
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        move(element, -1);
        return;
      case 'ArrowRight':
        event.preventDefault();
        move(element, 1);
        return;
      case 'Enter':
        // Submits like a text input; a span would otherwise insert a line break.
        event.preventDefault();
        element.closest('form')?.requestSubmit();
        return;
    }
    if (!props.editable) return;
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        time.step(kind, 1);
        return;
      case 'ArrowDown':
        event.preventDefault();
        time.step(kind, -1);
        return;
      case 'PageUp':
        event.preventDefault();
        time.step(kind, 1, true);
        return;
      case 'PageDown':
        event.preventDefault();
        time.step(kind, -1, true);
        return;
      case 'Home':
        event.preventDefault();
        time.edge(kind, false);
        return;
      case 'End':
        event.preventDefault();
        time.edge(kind, true);
        return;
      case 'Backspace':
      case 'Delete':
        event.preventDefault();
        time.clear(kind);
        return;
    }
  };

  // Typed characters arrive as `beforeinput`, which is also what a phone's
  // on-screen keyboard sends. Nothing is ever inserted into the text itself.
  const onBeforeInput = (event: InputEvent) => {
    event.preventDefault();
    if (!props.editable) return;
    const element = event.currentTarget as HTMLElement;
    if (event.inputType.startsWith('delete')) {
      props.time.clear(props.kind);
      return;
    }
    for (const char of event.data ?? '') {
      if (props.kind === 'period') {
        const lower = char.toLowerCase();
        const period = props.labels.am.toLowerCase().startsWith(lower)
          ? 'am'
          : props.labels.pm.toLowerCase().startsWith(lower)
            ? 'pm'
            : null;
        // Moves on to the hour where AM/PM comes first.
        if (period) {
          props.time.setPeriod(period);
          move(element, 1);
        }
      } else if (char >= '0' && char <= '9') {
        if (props.time.type(props.kind, Number(char))) move(element, 1);
      }
    }
  };

  return (
    <span
      id={props.id}
      role='spinbutton'
      tabindex={props.disabled ? undefined : 0}
      contenteditable={props.editable ? 'true' : undefined}
      inputmode={props.kind === 'period' ? 'text' : 'numeric'}
      spellcheck={false}
      autocapitalize='off'
      aria-label={segmentName(props.kind, props.locale)}
      aria-valuemin={range()?.min}
      aria-valuemax={range()?.max}
      aria-valuenow={
        props.kind === 'period' || raw() === null
          ? undefined
          : (raw() as number)
      }
      aria-valuetext={raw() === null ? 'Empty' : text()}
      aria-describedby={props.describedBy}
      aria-invalid={props.invalid ? 'true' : undefined}
      aria-required={
        props.kind === 'hour' && props.required ? 'true' : undefined
      }
      aria-disabled={props.disabled ? 'true' : undefined}
      aria-readonly={props.readOnly ? 'true' : undefined}
      data-placeholder={raw() === null ? '' : undefined}
      onKeyDown={onKeyDown}
      onBeforeInput={onBeforeInput}
      onFocus={() => props.time.resetBuffer()}
      onBlur={() => props.time.resetBuffer()}
      class={cn(
        'inline-flex shrink-0 items-center justify-center px-1 text-center tabular-nums caret-transparent outline-none select-none',
        SegmentHeight[props.size],
        SegmentWidth[props.size],
        SegmentRadius[props.size],
        'data-placeholder:text-foreground-muted',
        !props.disabled && 'focus:bg-accent focus:text-accent-foreground',
        props.disabled
          ? 'cursor-not-allowed'
          : props.editable
            ? 'cursor-text'
            : 'cursor-default'
      )}
    >
      {text()}
    </span>
  );
}
