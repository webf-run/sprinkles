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

import { ControlText, FocusRing, type Size, Transition } from '../core/control';
import { ErrorText, HelperText, LabelText } from '../core/field';
import { cn } from '../utils';

/** Space reserved for the thumb, so the track and thumb stay a constant height. */
const ControlSize: Record<Size, string> = {
  s: 'h-4',
  m: 'h-5',
  l: 'h-6',
  xl: 'h-7',
};

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

/** A round thumb. */
const ThumbDefault: Record<Size, string> = {
  s: 'size-3 rounded-full border-2',
  m: 'size-4 rounded-full border-2',
  l: 'size-5 rounded-full border-2',
  xl: 'size-6 rounded-full border-2',
};

/** A narrow bar, for picking a value exactly. */
const ThumbPrecise: Record<Size, string> = {
  s: 'h-3 w-1 rounded-sm',
  m: 'h-4 w-1 rounded-sm',
  l: 'h-5 w-2 rounded-sm',
  xl: 'h-6 w-2 rounded-sm',
};

interface Tone {
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
      range: 'bg-border',
      border: 'border-border',
      fill: 'bg-border',
    };
  }
  if (state.readOnly) {
    return {
      range: 'bg-foreground-muted',
      border: 'border-foreground-muted',
      fill: 'bg-foreground-muted',
    };
  }
  if (state.invalid) {
    return {
      range: 'bg-negative',
      border:
        'border-negative hover:border-negative-hover data-[dragging]:border-negative-down',
      fill: 'bg-negative hover:bg-negative-hover data-[dragging]:bg-negative-down',
    };
  }
  if (state.emphasized) {
    return {
      range: 'bg-accent',
      border:
        'border-accent hover:border-accent-hover data-[dragging]:border-accent-down',
      fill: 'bg-accent hover:bg-accent-hover data-[dragging]:bg-accent-down',
    };
  }
  return {
    range: 'bg-neutral',
    border:
      'border-neutral hover:border-neutral-hover data-[dragging]:border-neutral-down',
    fill: 'bg-neutral hover:bg-neutral-hover data-[dragging]:bg-neutral-down',
  };
}

export interface SliderProps {
  size?: Size;
  /** The current value (controlled). */
  value?: number;
  /** The starting value (uncontrolled). Defaults to `minValue`. */
  defaultValue?: number;
  /** Called continuously while the thumb is dragged or moved with the keyboard. */
  onChange?: (value: number) => void;
  /** Called once a drag ends, or after each keyboard step. */
  onChangeEnd?: (value: number) => void;
  /** The lowest allowed value. Defaults to 0. */
  minValue?: number;
  /** The highest allowed value. Defaults to 100. */
  maxValue?: number;
  /** The gap between allowed values, counted from `minValue`. Defaults to 1. */
  step?: number;
  /** Where the fill starts. Defaults to `minValue`; set it to fill from the middle of a scale that runs both ways. */
  fillOffset?: number;
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
  /** Fill the track with the accent colour instead of neutral. */
  emphasized?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  /** Submitted with a plain form. */
  name?: string;
  /** Required when there is no visible `label`. */
  'aria-label'?: string;
  id?: string;
  class?: string;
}

/**
 * Picks one number between two fixed bounds with a thumb: volume, brightness,
 * a quantity. For a range, use RangeSlider; when the bounds are open ended or
 * people need an exact number, use a NumberInput.
 */
export function Slider(props: SliderProps) {
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

  const [inner, setInner] = createSignal(props.defaultValue ?? min());
  const current = () => props.value ?? inner();

  const format = createMemo(() => {
    const formatter = new Intl.NumberFormat(
      props.locale ?? 'en-US',
      props.formatOptions
    );
    return (n: number) => formatter.format(n);
  });
  const valueText = () => format()(current());

  const colours = () =>
    tone({
      disabled: props.disabled,
      readOnly: props.readOnly,
      invalid: props.invalid,
      emphasized: props.emphasized,
    });
  const precise = () => props.thumbStyle === 'precise';
  const side = () => props.labelPosition === 'side';

  /** A value as a percentage of the scale. */
  const percent = (n: number) => {
    const span = max() - min();
    if (span <= 0) return 0;
    return Math.min(100, Math.max(0, ((n - min()) / span) * 100));
  };
  const hasOffset = () => props.fillOffset !== undefined;
  const fillStart = () =>
    Math.min(percent(props.fillOffset ?? min()), percent(current()));
  const fillEnd = () =>
    Math.max(percent(props.fillOffset ?? min()), percent(current()));

  return (
    <ArkSlider.Root
      id={props.id}
      min={min()}
      max={max()}
      step={props.step ?? 1}
      // With a fill offset the fill is drawn from percentages, so the thumb
      // must sit at exactly that percentage of the track.
      thumbAlignment={hasOffset() ? 'center' : 'contain'}
      value={props.value === undefined ? undefined : [props.value]}
      defaultValue={[props.defaultValue ?? min()]}
      disabled={props.disabled}
      readOnly={props.readOnly}
      invalid={props.invalid}
      name={props.name}
      aria-label={
        props['aria-label'] === undefined ? undefined : [props['aria-label']]
      }
      getAriaValueText={({ value }) => format()(value)}
      onValueChange={(details) => {
        const next = details.value[0] ?? min();
        setInner(next);
        props.onChange?.(next);
      }}
      onValueChangeEnd={(details) => {
        props.onChangeEnd?.(details.value[0] ?? min());
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
                  'tabular-nums text-foreground-muted',
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
            ControlSize[size()],
            side() && 'flex-1'
          )}
        >
          <ArkSlider.Track
            class={cn(
              'relative flex-1 overflow-hidden rounded-full bg-border',
              props.trackStyle === 'thick'
                ? TrackThick[size()]
                : TrackThin[size()]
            )}
          >
            <Show
              when={hasOffset()}
              fallback={
                <ArkSlider.Range class={cn('h-full', colours().range)} />
              }
            >
              <div
                aria-hidden='true'
                class={cn('absolute inset-y-0', colours().range)}
                style={{
                  left: `${fillStart()}%`,
                  width: `${fillEnd() - fillStart()}%`,
                }}
              />
            </Show>
          </ArkSlider.Track>
          <ArkSlider.Thumb
            index={0}
            aria-describedby={describedBy()}
            class={cn(
              'z-1 outline-none',
              precise()
                ? [ThumbPrecise[size()], colours().fill]
                : ['bg-surface', ThumbDefault[size()], colours().border],
              props.disabled
                ? 'cursor-not-allowed'
                : 'cursor-grab data-[dragging]:cursor-grabbing',
              FocusRing,
              Transition
            )}
          >
            <ArkSlider.HiddenInput />
          </ArkSlider.Thumb>
        </ArkSlider.Control>

        <Show when={!props.hideValue && label() && side()}>
          <ArkSlider.ValueText
            class={cn(
              'shrink-0 tabular-nums text-foreground-muted',
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
