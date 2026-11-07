import { useFieldContext } from '@ark-ui/solid/field';
import { FileUpload as ArkFileUpload } from '@ark-ui/solid/file-upload';
import CircleAlert from 'lucide-solid/icons/circle-alert';
import FileText from 'lucide-solid/icons/file-text';
import Upload from 'lucide-solid/icons/upload';
import X from 'lucide-solid/icons/x';
import {
  For,
  type JSX,
  Show,
  children,
  createUniqueId,
  splitProps,
} from 'solid-js';

import { ControlReset, Disabled, FocusRing, Transition } from '../core/control';
import { cn } from '../utils';
import { Field, type FieldOptions } from './Field';

const Dropzone = [
  'box-border flex w-full cursor-pointer flex-col items-center justify-center gap-2 px-6 py-8 text-center',
  'rounded-lg border-2 border-dashed border-border-strong bg-surface',
  'hover:border-foreground-muted hover:bg-surface-muted',
  'data-dragging:border-accent data-dragging:bg-accent-subtle',
  'data-invalid:border-negative',
  'data-disabled:cursor-not-allowed data-disabled:border-border data-disabled:bg-neutral-subtle',
  FocusRing,
  Transition,
].join(' ');

const FileRow =
  'box-border flex items-center gap-3 rounded-lg border border-border-muted bg-surface p-2';

/** A 40 px square at the start of a row: the image itself, or an icon. */
const Thumbnail =
  'flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md';

const RemoveButton = [
  'inline-flex size-8 shrink-0 items-center justify-center rounded-md border-0 bg-transparent p-0',
  ControlReset,
  'cursor-pointer text-foreground-muted hover:bg-neutral-subtle hover:text-foreground-strong active:bg-neutral/12',
  Disabled,
  FocusRing,
  Transition,
].join(' ');

export interface FileUploadProps extends FieldOptions {
  /** The accepted files (controlled). */
  value?: File[];
  defaultValue?: File[];
  onValueChange?: (files: File[]) => void;
  /** MIME types or extensions the picker offers and the drop accepts: `'image/*'`, `['image/png', '.pdf']`. */
  accept?: string | string[];
  /** How many files can be added. Defaults to 1; a new file then replaces the old one. */
  maxFiles?: number;
  /** Largest accepted file, in bytes. */
  maxFileSize?: number;
  /** Submits the files with a plain (multipart) form. */
  name?: string;
  /** A short line in the dropzone, such as "PNG or JPG, up to 5 MB". */
  hint?: JSX.Element;
  class?: string;
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024)
    return `${Math.round((bytes / 1024 / 1024) * 10) / 10} MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${bytes} bytes`;
}

/** Ark's rejection codes, in words. */
function describeError(error: string, props: FileUploadProps): string {
  const maxFiles = props.maxFiles ?? 1;
  switch (error) {
    case 'TOO_MANY_FILES':
      return maxFiles === 1
        ? 'Only one file can be added'
        : `Only ${maxFiles} files can be added`;
    case 'FILE_INVALID_TYPE':
      return 'This type of file isn’t accepted';
    case 'FILE_TOO_LARGE':
      return props.maxFileSize
        ? `Larger than ${formatBytes(props.maxFileSize)}`
        : 'This file is too large';
    case 'FILE_TOO_SMALL':
      return 'This file is too small';
    case 'FILE_EXISTS':
      return 'Already added';
    default:
      return 'This file can’t be added';
  }
}

/**
 * Adds files by dropping them or picking them: a featured image, a PDF to
 * attach. Each file is listed with its size and a remove button; files that
 * break the rules are listed with the reason.
 */
export function FileUpload(props: FileUploadProps) {
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
      <FileUploadBody {...props} />
    </Field>
  );
}

/** Rendered inside Field, so the dropzone can be named by the field's label. */
function FileUploadBody(props: FileUploadProps) {
  const fieldContext = useFieldContext();
  const instructionId = createUniqueId();
  const maxFiles = () => props.maxFiles ?? 1;
  // Read once: reading a JSX prop again would create it twice on the server.
  const hint = children(() => props.hint);

  return (
    <ArkFileUpload.Root
      acceptedFiles={props.value}
      defaultAcceptedFiles={props.defaultValue}
      onFileChange={(details) => props.onValueChange?.(details.acceptedFiles)}
      accept={props.accept as ArkFileUpload.RootProps['accept']}
      maxFiles={maxFiles()}
      maxFileSize={props.maxFileSize}
      name={props.name}
      class='flex w-full flex-col gap-2'
    >
      <Show when={!props.readOnly}>
        <ArkFileUpload.Dropzone
          aria-labelledby={`${fieldContext?.().ids.label ?? ''} ${instructionId}`.trim()}
          class={Dropzone}
        >
          <span
            class={cn(
              'flex size-10 items-center justify-center rounded-full',
              props.disabled
                ? 'bg-neutral-subtle text-foreground-subtle'
                : 'bg-accent-subtle text-accent-subtle-foreground'
            )}
          >
            <Upload class='size-5' aria-hidden='true' />
          </span>
          <span
            id={instructionId}
            class={cn(
              'text-sm',
              props.disabled
                ? 'text-foreground-subtle'
                : 'text-foreground-strong'
            )}
          >
            <span class={cn('font-semibold', !props.disabled && 'text-accent')}>
              {maxFiles() > 1 ? 'Choose files' : 'Choose a file'}
            </span>
            {maxFiles() > 1 ? ' or drag them here' : ' or drag it here'}
          </span>
          <Show when={hint()}>
            <span
              class={cn(
                'text-xs',
                props.disabled
                  ? 'text-foreground-subtle'
                  : 'text-foreground-muted'
              )}
            >
              {hint()}
            </span>
          </Show>
        </ArkFileUpload.Dropzone>
      </Show>

      <ArkFileUpload.Context>
        {(api) => (
          <>
            <Show when={api().acceptedFiles.length > 0}>
              <ArkFileUpload.ItemGroup
                type='accepted'
                class='m-0 flex list-none flex-col gap-2 p-0'
              >
                <For each={api().acceptedFiles}>
                  {(file) => (
                    <ArkFileUpload.Item file={file} class={FileRow}>
                      <Show
                        when={file.type.startsWith('image/')}
                        fallback={
                          <span
                            class={cn(
                              Thumbnail,
                              'bg-neutral-subtle text-foreground-muted'
                            )}
                          >
                            <FileText class='size-5' aria-hidden='true' />
                          </span>
                        }
                      >
                        <ArkFileUpload.ItemPreview
                          type='image/*'
                          class={cn(Thumbnail, 'bg-neutral-subtle')}
                        >
                          <ArkFileUpload.ItemPreviewImage class='block size-10 object-cover' />
                        </ArkFileUpload.ItemPreview>
                      </Show>
                      <span class='flex min-w-0 flex-1 flex-col'>
                        <ArkFileUpload.ItemName class='truncate text-sm font-medium text-foreground-strong' />
                        <ArkFileUpload.ItemSizeText class='text-xs text-foreground-muted' />
                      </span>
                      <Show when={!props.readOnly}>
                        <ArkFileUpload.ItemDeleteTrigger class={RemoveButton}>
                          <X class='size-4' aria-hidden='true' />
                        </ArkFileUpload.ItemDeleteTrigger>
                      </Show>
                    </ArkFileUpload.Item>
                  )}
                </For>
              </ArkFileUpload.ItemGroup>
            </Show>

            <Show when={api().rejectedFiles.length > 0}>
              <ArkFileUpload.ItemGroup
                type='rejected'
                class='m-0 flex list-none flex-col gap-2 p-0'
              >
                <For each={api().rejectedFiles}>
                  {(rejection) => (
                    <ArkFileUpload.Item file={rejection.file} class={FileRow}>
                      <span
                        class={cn(
                          Thumbnail,
                          'bg-negative-subtle text-negative'
                        )}
                      >
                        <CircleAlert class='size-5' aria-hidden='true' />
                      </span>
                      <span class='flex min-w-0 flex-1 flex-col'>
                        <ArkFileUpload.ItemName class='truncate text-sm font-medium text-foreground-strong' />
                        <span class='text-xs font-medium text-negative'>
                          {describeError(rejection.errors[0] ?? '', props)}
                        </span>
                      </span>
                      <ArkFileUpload.ItemDeleteTrigger class={RemoveButton}>
                        <X class='size-4' aria-hidden='true' />
                      </ArkFileUpload.ItemDeleteTrigger>
                    </ArkFileUpload.Item>
                  )}
                </For>
              </ArkFileUpload.ItemGroup>
            </Show>
          </>
        )}
      </ArkFileUpload.Context>

      <ArkFileUpload.HiddenInput />
    </ArkFileUpload.Root>
  );
}
