import { Button, Tooltip } from '@webf/sprinkles';
import Eye from 'lucide-solid/icons/eye';
import History from 'lucide-solid/icons/history';
import Redo2 from 'lucide-solid/icons/redo-2';
import Undo2 from 'lucide-solid/icons/undo-2';
import type { Component } from 'solid-js';

const Tools: {
  label: string;
  shortcut?: string;
  icon: Component<{ class?: string }>;
}[] = [
  { label: 'Undo', shortcut: '⌘Z', icon: Undo2 },
  { label: 'Redo', shortcut: '⇧⌘Z', icon: Redo2 },
  { label: 'Preview', icon: Eye },
  { label: 'Revision history', icon: History },
];

export default function Example() {
  return (
    <div role='toolbar' aria-label='Editor' class='flex gap-1'>
      {Tools.map((tool) => (
        <Tooltip
          content={
            tool.shortcut ? `${tool.label} (${tool.shortcut})` : tool.label
          }
          trigger={(props) => (
            <Button
              {...props}
              variant='secondary'
              fillStyle='outline'
              icon={tool.icon}
              aria-label={tool.label}
            />
          )}
        />
      ))}
    </div>
  );
}
