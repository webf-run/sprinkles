import { Slider as ArkSlider } from '@ark-ui/solid/slider';
import CircleExclamationPoint from 'lucide-solid/icons/circle-exclamation-point';
import {
  type JSX,
  Show,
  children,
  createMemo,
  createSignal,
  createUniqueId,
} from 'solid-js';

import {
  ControlHeight,
  ControlText,
  FocusRing,
  type Size,
  Transition,
} from '../core/control';
import { ErrorText, HelperText, LabelText } from '../core/field';
import { cn } from '../utils';

const TrackThin: Record<Size, string> = {
  s: 'h-1',
  m: 'h-1',
  l: 'h-2',
  xl: 'h-2',
};

const TrackThick: Record<Size, string> = {
  s: 'h-2',
  m: 'h-3',
  l: 'h-4',
  xl: 'h-5',
};

/** A round thumb. `box-border` keeps `size-4` 16 px with its 2 px border when the app has no Preflight. */
const ThumbDefault: Record<Size, string> = {
  s: 'box-border size-3 rounded-full border-2',
  m: 'box-border size-4 rounded-full border-2',
  l: 'box-border size-5 rounded-full border-2',
  xl: 'box-border size-6 rounded-full border-2',
};

/** A narrow bar, for picking a value exactly. */
const ThumbPrecise: Record<Size, string> = {
  s: 'h-3 w-1 rounded-sm',
  m: 'h-4 w-1 rounded-sm',
  l: 'h-5 w-2 rounded-sm',
  xl: 'h-6 w-2 rounded-sm',
};

export interface RangeSliderValue {
  start: number;
  end: number;
}

interface Tone {
  /** The unfilled track. */
  track: string;
  /** The filled part of the track. */
  range: string;
  /** The round thumb's outline. */
  border: string;
  /** The precise thumb's fill. */
  fill: string;
}

function tone(state: {
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  emphasized?: boolean;
}): Tone {
  if (state.disabled) {
    return {
      track: 'bg-neutral-subtle',
      range: 'bg-border',
      border: 'border-border',
      fill: 'bg-border',
    };
  }
  if (state.readOnly) {
    return {
      track: 'bg-border-strong',
      range: 'bg-foreground-muted',
      border: 'border-foreground-muted',
      fill: 'bg-foreground-muted',
    };
  }
  if (state.invalid) {
    return {
      track: 'bg-border-strong',
      range: 'bg-negative',
      border:
        'border-negative hover:border-negative-hover data-dragging:border-negative-down',
      fill: 'bg-negative hover:bg-negative-hover data-dragging:bg-negative-down',
    };
  }
  if (state.emphasized) {
    return {
      track: 'bg-border-strong',
      range: 'bg-accent',
      border:
        'border-accent hover:border-accent-hover data-dragging:border-accent-down',
      fill: 'bg-accent hover:bg-accent-hover data-dragging:bg-accent-down',
    };
  }
  return {
    track: 'bg-border-strong',
    range: 'bg-neutral',
    border:
      'border-neutral hover:border-neutral-hover data-dragging:border-neutral-down',
    fill: 'bg-neutral hover:bg-neutral-hover data-dragging:bg-neutral-down',
  };
}

export interface RangeSliderProps {
  size?: Size;
  /** The current range (controlled). */
  value?: RangeSliderValue;
  /** The starting range (uncontrolled). Defaults to the whole scale. */
  defaultValue?: RangeSliderValue;
  /** Called continuously while a thumb is dragged or moved with the keyboard. */
  onChange?: (value: RangeSliderValue) => void;
  /** Called once a drag ends, or after each keyboard step. */
  onChangeEnd?: (value: RangeSliderValue) => void;
  /** The lowest allowed value. Defaults to 0. */
  minValue?: number;
  /** The highest allowed value. Defaults to 100. */
  maxValue?: number;
  /** The gap between allowed values, counted from `minValue`. Defaults to 1. */
  step?: number;
  /** The least the two thumbs must stay apart, in steps. Defaults to 0. */
  minStepsBetweenThumbs?: number;
  /** Visible label. Every slider needs one; use `aria-label` only where a visible label truly can't fit. */
  label?: JSX.Element;
  /** Help shown under the slider; replaced by `errorText` while invalid. */
  description?: JSX.Element;
  /** Shown under the slider while `invalid`. */
  errorText?: JSX.Element;
  /** Put the label above the track (default) or beside it. */
  labelPosition?: 'top' | 'side';
  /** How the value is shown, e.g. `{ style: 'currency', currency: 'USD' }`. */
  formatOptions?: Intl.NumberFormatOptions;
  /** The language numbers are written in. Defaults to `en-US`, so the page renders the same on the server and in the browser. */
  locale?: string;
  /** Hide the value next to the label. */
  hideValue?: boolean;
  trackStyle?: 'thin' | 'thick';
  thumbStyle?: 'default' | 'precise';
  /** Fill the range with the accent colour instead of neutral. */
  emphasized?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  /** Submitted with a plain form: the lower value. */
  startName?: string;
  /** Submitted with a plain form: the upper value. */
  endName?: string;
  /** Names the two thumbs for screen readers. Defaults to Minimum and Maximum. */
  thumbLabels?: [string, string];
  /** Required when there is no visible `label`. */
  'aria-label'?: string;
  id?: string;
  class?: string;
}

/**
 * Picks a range between two fixed bounds with two thumbs: a price range, dates
 * on a timeline. For a single value, use a plain slider; when the bounds are
 * open ended, use two NumberInputs.
 */
export function RangeSlider(props: RangeSliderProps) {
  // JSX passed in these props is read once: reading it twice would create it
  // twice on the server and break hydration.
  const label = children(() => props.label);
  const description = children(() => props.description);
  const errorText = children(() => props.errorText);
  const helpId = createUniqueId();
  const showDescription = () => Boolean(description()) && !props.invalid;
  const showError = () => Boolean(errorText()) && Boolean(props.invalid);
  const describedBy = () =>
    showDescription() || showError() ? helpId : undefined;

  const size = () => props.size ?? 'm';
  const min = () => props.minValue ?? 0;
  const max = () => props.maxValue ?? 100;
  const thumbLabels = () => props.thumbLabels ?? ['Minimum', 'Maximum'];

  const [inner, setInner] = createSignal<RangeSliderValue>(
    props.defaultValue ?? { start: min(), end: max() }
  );
  const current = () => props.value ?? inner();

  const format = createMemo(() => {
    const formatter = new Intl.NumberFormat(
      props.locale ?? 'en-US',
      props.formatOptions
    );
    return (n: number) => formatter.format(n);
  });
  const valueText = () =>
    `${format()(current().start)}–${format()(current().end)}`;

  const colours = () =>
    tone({
      disabled: props.disabled,
      readOnly: props.readOnly,
      invalid: props.invalid,
      emphasized: props.emphasized,
    });
  const precise = () => props.thumbStyle === 'precise';
  const side = () => props.labelPosition === 'side';

  const toValue = (v: number[]): RangeSliderValue => ({
    start: v[0] ?? min(),
    end: v[1] ?? max(),
  });
  const ariaLabel = (index: 0 | 1) =>
    props['aria-label']
      ? `${props['aria-label']} ${thumbLabels()[index]}`
      : thumbLabels()[index];

  return (
    <ArkSlider.Root
      id={props.id}
      min={min()}
      max={max()}
      step={props.step ?? 1}
      minStepsBetweenThumbs={props.minStepsBetweenThumbs ?? 0}
      value={props.value ? [props.value.start, props.value.end] : undefined}
      defaultValue={
        props.defaultValue
          ? [props.defaultValue.start, props.defaultValue.end]
          : [min(), max()]
      }
      disabled={props.disabled}
      readOnly={props.readOnly}
      invalid={props.invalid}
      aria-label={[ariaLabel(0), ariaLabel(1)]}
      getAriaValueText={({ value, index }) =>
        `${thumbLabels()[index === 0 ? 0 : 1]} ${format()(value)}`
      }
      onValueChange={(details) => {
        const next = toValue(details.value);
        setInner(next);
        props.onChange?.(next);
      }}
      onValueChangeEnd={(details) => {
        props.onChangeEnd?.(toValue(details.value));
      }}
      class={cn('grid w-full gap-1', props.class)}
    >
      <div class={side() ? 'flex items-center gap-3' : 'grid gap-1'}>
        <Show when={label()}>
          <div
            class={cn(
              'flex items-baseline justify-between gap-2',
              side() && 'shrink-0 justify-start'
            )}
          >
            <ArkSlider.Label class={cn(LabelText, ControlText[size()])}>
              {label()}
            </ArkSlider.Label>
            <Show when={!props.hideValue && !side()}>
              <ArkSlider.ValueText
                class={cn(
                  'tabular-nums text-foreground-muted data-disabled:text-foreground-subtle',
                  ControlText[size()]
                )}
              >
                {valueText()}
              </ArkSlider.ValueText>
            </Show>
          </div>
        </Show>

        <ArkSlider.Control
          class={cn(
            'relative flex w-full items-center',
            ControlHeight[size()],
            side() && 'flex-1'
          )}
        >
          <ArkSlider.Track
            class={cn(
              'flex-1 overflow-hidden rounded-full',
              colours().track,
              props.trackStyle === 'thick'
                ? TrackThick[size()]
                : TrackThin[size()]
            )}
          >
            <ArkSlider.Range class={cn('h-full', colours().range)} />
          </ArkSlider.Track>
          {([0, 1] as const).map((index) => (
            <ArkSlider.Thumb
              index={index}
              aria-describedby={describedBy()}
              class={cn(
                'z-1',
                precise()
                  ? [ThumbPrecise[size()], colours().fill]
                  : ['bg-surface', ThumbDefault[size()], colours().border],
                props.disabled
                  ? 'cursor-not-allowed'
                  : 'cursor-grab data-dragging:cursor-grabbing',
                FocusRing,
                Transition
              )}
            >
              <ArkSlider.HiddenInput
                name={index === 0 ? props.startName : props.endName}
              />
            </ArkSlider.Thumb>
          ))}
        </ArkSlider.Control>

        <Show when={!props.hideValue && label() && side()}>
          <ArkSlider.ValueText
            class={cn(
              'shrink-0 tabular-nums text-foreground-muted data-disabled:text-foreground-subtle',
              ControlText[size()]
            )}
          >
            {valueText()}
          </ArkSlider.ValueText>
        </Show>
      </div>
      <Show when={showDescription()}>
        <p id={helpId} class={HelperText}>
          {description()}
        </p>
      </Show>
      <Show when={showError()}>
        <p id={helpId} aria-live='polite' class={ErrorText}>
          {/* A line-high box, so the icon stays on the first line when the text wraps. */}
          <span aria-hidden='true' class='flex h-4 shrink-0 items-center'>
            <CircleExclamationPoint class='size-3' />
          </span>
          <span>{errorText()}</span>
        </p>
      </Show>
    </ArkSlider.Root>
  );
}
