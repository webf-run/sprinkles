import { Field as ArkField } from '@ark-ui/solid/field';
import { Switch as ArkSwitch } from '@ark-ui/solid/switch';
import { Show, children, splitProps } from 'solid-js';

import { ControlText, type Size } from '../core/control';
import { cn } from '../utils';
import {
  ToggleCursor,
  ToggleFocusRing,
  ToggleGap,
  ToggleLabel,
  ToggleLine,
  ToggleRow,
  ToggleRowSize,
} from './Checkbox';
import { Field, type FieldOptions } from './Field';

/** Track: twice as wide as it is tall; the 2 px border insets the thumb. */
const TrackSize: Record<Size, string> = {
  s: 'h-3 w-6',
  m: 'h-4 w-8',
  l: 'h-5 w-10',
  xl: 'h-6 w-12',
};

const ThumbSize: Record<Size, string> = {
  s: 'size-2',
  m: 'size-3',
  l: 'size-4',
  xl: 'size-5',
};

/** How far the thumb travels when on: the track's inner width minus the thumb. */
const ThumbTravel: Record<Size, string> = {
  s: 'translate-x-3',
  m: 'translate-x-4',
  l: 'translate-x-5',
  xl: 'translate-x-6',
};

interface SwitchState {
  on: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  emphasized?: boolean;
}

/** Track and thumb colours for one state; hover and press come from the row (`group/switch`). */
function switchTone(state: SwitchState): { track: string; thumb: string } {
  if (state.disabled) {
    return state.on
      ? { track: 'border-border bg-border', thumb: 'bg-surface' }
      : { track: 'border-border bg-neutral-subtle', thumb: 'bg-border' };
  }
  if (state.readOnly) {
    return state.on
      ? {
          track: 'border-foreground-muted bg-foreground-muted',
          thumb: 'bg-surface',
        }
      : {
          track: 'border-border-strong bg-surface-muted',
          thumb: 'bg-border-strong',
        };
  }
  if (state.invalid) {
    return state.on
      ? {
          track:
            'border-negative bg-negative group-hover/switch:border-negative-hover group-hover/switch:bg-negative-hover group-active/switch:border-negative-down group-active/switch:bg-negative-down',
          thumb: 'bg-surface',
        }
      : {
          track:
            'border-negative bg-surface group-hover/switch:border-negative-hover',
          thumb: 'bg-negative group-hover/switch:bg-negative-hover',
        };
  }
  if (state.on && state.emphasized) {
    return {
      track:
        'border-accent bg-accent group-hover/switch:border-accent-hover group-hover/switch:bg-accent-hover group-active/switch:border-accent-down group-active/switch:bg-accent-down',
      thumb: 'bg-surface',
    };
  }
  if (state.on) {
    return {
      track:
        'border-neutral bg-neutral group-hover/switch:border-neutral-hover group-hover/switch:bg-neutral-hover group-active/switch:border-neutral-down group-active/switch:bg-neutral-down',
      thumb: 'bg-surface',
    };
  }
  return {
    track:
      'border-border-strong bg-surface group-hover/switch:border-foreground-strong group-active/switch:border-foreground-strongest group-active/switch:bg-neutral-subtle',
    thumb:
      'bg-border-strong group-hover/switch:bg-foreground-strong group-active/switch:bg-foreground-strongest',
  };
}

export interface SwitchProps extends FieldOptions {
  size?: Size;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Fills the track with the accent colour when on, instead of neutral. */
  emphasized?: boolean;
  /** Submitted with a plain form while on. */
  name?: string;
  /** The value submitted while on. Defaults to `on`. */
  value?: string;
  /** Required when there is no visible `label`. */
  'aria-label'?: string;
  class?: string;
}

/**
 * Turns a setting on or off, taking effect immediately: "Show in navigation",
 * "Allow comments". For a choice that is saved with a form, use Checkbox.
 */
export function Switch(props: SwitchProps) {
  const [field] = splitProps(props, [
    'description',
    'errorText',
    'required',
    'invalid',
    'disabled',
    'readOnly',
    'id',
    'class',
  ]);
  const size = () => props.size ?? 'm';
  // A JSX label is read once: reading it again would create it twice on the server.
  const label = children(() => props.label);

  return (
    <Field {...field}>
      <ArkSwitch.Root
        checked={props.checked}
        defaultChecked={props.defaultChecked}
        onCheckedChange={(details) => props.onCheckedChange?.(details.checked)}
        name={props.name}
        value={props.value}
        class={cn(
          ToggleRow,
          ToggleRowSize[size()],
          'group/switch',
          ToggleCursor({ disabled: props.disabled, readOnly: props.readOnly })
        )}
      >
        <span class={cn('flex items-start', ToggleGap[size()])}>
          <span class={cn('flex shrink-0 items-center', ToggleLine[size()])}>
            <ArkSwitch.Context>
              {(api) => {
                const tone = () =>
                  switchTone({
                    on: api().checked,
                    disabled: props.disabled,
                    readOnly: props.readOnly,
                    invalid: props.invalid,
                    emphasized: props.emphasized,
                  });
                return (
                  <ArkSwitch.Control
                    class={cn(
                      'box-border flex items-center rounded-full border-2',
                      'motion-safe:transition-colors motion-safe:duration-100 motion-safe:ease-standard',
                      TrackSize[size()],
                      ToggleFocusRing,
                      tone().track
                    )}
                  >
                    <ArkSwitch.Thumb
                      class={cn(
                        'block rounded-full',
                        'motion-safe:transition motion-safe:duration-200 motion-safe:ease-emphasized',
                        ThumbSize[size()],
                        api().checked && ThumbTravel[size()],
                        tone().thumb
                      )}
                    />
                  </ArkSwitch.Control>
                );
              }}
            </ArkSwitch.Context>
          </span>
          <Show when={label()}>
            <ArkSwitch.Label class={cn(ToggleLabel, ControlText[size()])}>
              {label()}
              <ArkField.RequiredIndicator
                class='ml-1 text-negative'
                aria-hidden='true'
              >
                *
              </ArkField.RequiredIndicator>
            </ArkSwitch.Label>
          </Show>
        </span>
        <ArkSwitch.HiddenInput aria-label={props['aria-label']} />
      </ArkSwitch.Root>
    </Field>
  );
}
