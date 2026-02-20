import { createSignal } from 'solid-js';

import type { Story } from '../Playground/Playground.type.js';
import { Select, type SelectItem, type SelectItemGroup } from './Select.js';

export const Meta = {
  title: 'Select',
  component: Select,
};

// Sample data
const frameworks: SelectItem[] = [
  { label: 'React', value: 'react' },
  { label: 'Vue.js', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid.js', value: 'solid' },
  { label: 'Angular', value: 'angular', disabled: true },
];

const groupedFrameworks: SelectItemGroup[] = [
  {
    label: 'Frontend Frameworks',
    items: [
      { label: 'React', value: 'react' },
      { label: 'Vue.js', value: 'vue' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Solid.js', value: 'solid' },
    ],
  },
  {
    label: 'Meta Frameworks',
    items: [
      { label: 'Next.js', value: 'nextjs' },
      { label: 'Nuxt.js', value: 'nuxtjs' },
      { label: 'SvelteKit', value: 'sveltekit' },
      { label: 'Astro', value: 'astro' },
    ],
  },
];

export const Default: Story = {
  description: 'Basic select with default styling',
  render: () => (
    <Select
      items={frameworks}
      placeholder='Select a framework'
      label='Framework'
    />
  ),
};

export const WithValue: Story = {
  title: 'With Initial Value',
  description: 'Select with a pre-selected value',
  render: () => (
    <Select
      items={frameworks}
      value='react'
      placeholder='Select a framework'
      label='Framework'
    />
  ),
};

export const States: Story = {
  title: 'All States',
  description: 'Select component in different states',
  render: () => (
    <div style='display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; max-width: 600px;'>
      <Select
        items={frameworks}
        placeholder='Default state'
        label='Default'
        description='Choose your preferred framework'
      />
      <Select
        items={frameworks}
        placeholder='Error state'
        label='Error'
        errorMessage='Please select a valid framework'
        invalid={true}
        required={true}
      />
      <Select
        items={frameworks}
        placeholder='Disabled state'
        label='Disabled'
        disabled={true}
      />
      <Select
        items={frameworks}
        value='vue'
        placeholder='Read-only state'
        label='Read Only'
        readOnly={true}
      />
      <Select
        items={frameworks}
        placeholder='Loading...'
        label='Loading'
        loading={true}
      />
      <Select
        items={[]}
        placeholder='No options'
        label='Empty'
        emptyText='No frameworks available'
      />
    </div>
  ),
};

export const WithGroups: Story = {
  title: 'Grouped Options',
  description: 'Select with grouped items for better organization',
  render: () => (
    <Select
      groups={groupedFrameworks}
      placeholder='Select a framework'
      label='Framework'
      description='Options organized by category'
    />
  ),
};

export const Controlled: Story = {
  title: 'Controlled',
  description: 'Select with controlled value state',
  render: () => {
    const [value, setValue] = createSignal<string>();

    return (
      <div style='display: flex; flex-direction: column; gap: 1rem;'>
        <Select
          items={frameworks}
          value={value()}
          onChange={(newValue) => setValue(newValue)}
          placeholder='Select a framework'
          label='Controlled Select'
        />
        <div style='padding: 0.75rem; background: var(--gray-100); border-radius: var(--radius-md); font-size: 0.875rem;'>
          Selected: <strong>{value() || 'None'}</strong>
        </div>
      </div>
    );
  },
};

export const CustomRendering: Story = {
  title: 'Custom Rendering',
  description: 'Select with custom item and value rendering',
  render: () => {
    const customItems: SelectItem<{
      id: number;
      name: string;
      category: string;
    }>[] = [
      {
        label: 'TypeScript',
        value: { id: 1, name: 'TypeScript', category: 'language' },
        description: 'Typed superset of JavaScript',
      },
      {
        label: 'JavaScript',
        value: { id: 2, name: 'JavaScript', category: 'language' },
        description: 'Dynamic programming language',
      },
      {
        label: 'Python',
        value: { id: 3, name: 'Python', category: 'language' },
        description: 'General-purpose programming language',
      },
      {
        label: 'Rust',
        value: { id: 4, name: 'Rust', category: 'language' },
        description: 'Systems programming language',
      },
    ];

    return (
      <Select
        items={customItems}
        placeholder='Select a language'
        label='Programming Language'
        renderItem={(item) => (
          <div style='display: flex; flex-direction: column; gap: 0.25rem;'>
            <span style='font-weight: 500;'>{item.label}</span>
            <span style='font-size: 0.75rem; color: var(--gray-600);'>
              {item.description}
            </span>
          </div>
        )}
        renderValue={(item) => `${item.label} (${item.value.category})`}
      />
    );
  },
};

export const Interactive: Story = {
  title: 'Interactive',
  description: 'Select with event handlers and state management',
  render: () => {
    const [selectedValue, setSelectedValue] = createSignal<string>();
    const [isOpen, setIsOpen] = createSignal(false);
    const [eventLog, setEventLog] = createSignal<string[]>([]);

    const addToLog = (message: string) => {
      setEventLog((prev) => [...prev.slice(-4), message]);
    };

    return (
      <div style='display: flex; flex-direction: column; gap: 1rem;'>
        <Select
          items={frameworks}
          value={selectedValue()}
          onChange={(value) => {
            setSelectedValue(value);
            addToLog(`Value changed: ${value || 'None'}`);
          }}
          onOpenChange={(open) => {
            setIsOpen(open);
            addToLog(`Dropdown ${open ? 'opened' : 'closed'}`);
          }}
          placeholder='Select a framework'
          label='Interactive Select'
          description='Try selecting different options to see events'
        />

        <div style='padding: 0.75rem; background: var(--gray-50); border-radius: var(--radius-md); font-size: 0.875rem;'>
          <div>
            <strong>Current Value:</strong> {selectedValue() || 'None'}
          </div>
          <div>
            <strong>Is Open:</strong> {isOpen() ? 'Yes' : 'No'}
          </div>

          <div style='margin-top: 0.5rem;'>
            <strong>Event Log:</strong>
            <div style='font-family: monospace; font-size: 0.75rem; margin-top: 0.25rem;'>
              {eventLog().length === 0 ? (
                <div style='color: var(--gray-500);'>No events yet</div>
              ) : (
                eventLog().map((event, index) => (
                  <div style='color: var(--gray-700);'>{event}</div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
};
