import type { Story } from '../Playground/Playground.type.js';
import { Button } from './Button.jsx';

export const Meta = {
  title: 'Button',
  component: Button,
};

export const Default: Story = {
  description: 'Basic button with default styling',
  render: () => <Button>Default Button</Button>,
};

export const Primary: Story = {
  title: 'Primary',
  description: 'Primary button with high visual prominence',
  render: () => (
    <div style='display: flex; gap: 1rem; align-items: center;'>
      <Button variant='primary' size='sm'>
        Small
      </Button>
      <Button variant='primary' size='md'>
        Medium
      </Button>
      <Button variant='primary' size='lg'>
        Large
      </Button>
    </div>
  ),
};

export const Secondary: Story = {
  description: 'Secondary button with moderate visual prominence',
  render: () => (
    <div style='display: flex; gap: 1rem; align-items: center;'>
      <Button variant='secondary' size='sm'>
        Small
      </Button>
      <Button variant='secondary' size='md'>
        Medium
      </Button>
      <Button variant='secondary' size='lg'>
        Large
      </Button>
    </div>
  ),
};

export const Ghost: Story = {
  description: 'Ghost button with minimal emphasis',
  render: () => (
    <div style='display: flex; gap: 1rem; align-items: center;'>
      <Button variant='ghost' size='sm'>
        Small
      </Button>
      <Button variant='ghost' size='md'>
        Medium
      </Button>
      <Button variant='ghost' size='lg'>
        Large
      </Button>
    </div>
  ),
};

export const IconOnly: Story = {
  description: 'Icon-only buttons for compact actions',
  render: () => (
    <div style='display: flex; gap: 1rem; align-items: center;'>
      <Button variant='ghost' size='sm' iconOnly aria-label='Settings'>
        <span aria-hidden='true'>+</span>
      </Button>
      <Button variant='ghost' size='md' iconOnly aria-label='Settings'>
        <span aria-hidden='true'>+</span>
      </Button>
      <Button variant='ghost' size='lg' iconOnly aria-label='Settings'>
        <span aria-hidden='true'>+</span>
      </Button>
    </div>
  ),
};

export const Outline: Story = {
  description: 'Outline button with subtle styling',
  render: () => (
    <div style='display: flex; gap: 1rem; align-items: center;'>
      <Button variant='outline' size='sm'>
        Small
      </Button>
      <Button variant='outline' size='md'>
        Medium
      </Button>
      <Button variant='outline' size='lg'>
        Large
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  description: 'Button in loading state with spinner',
  render: () => (
    <div style='display: flex; gap: 1rem; align-items: center;'>
      <Button variant='primary' loading>
        Loading Primary
      </Button>
      <Button variant='secondary' loading>
        Loading Secondary
      </Button>
      <Button variant='outline' loading>
        Loading Outline
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  description: 'Disabled buttons that cannot be interacted with',
  render: () => (
    <div style='display: flex; gap: 1rem; align-items: center;'>
      <Button variant='primary' disabled>
        Disabled Primary
      </Button>
      <Button variant='secondary' disabled>
        Disabled Secondary
      </Button>
      <Button variant='outline' disabled>
        Disabled Outline
      </Button>
    </div>
  ),
};

export const Interactive: Story = {
  description: 'Buttons with click handlers',
  render: () => (
    <div style='display: flex; gap: 1rem; align-items: center;'>
      <Button variant='primary' onClick={() => alert('Primary clicked!')}>
        Click Me
      </Button>
      <Button
        variant='secondary'
        onClick={() => console.log('Secondary clicked')}
      >
        Log Click
      </Button>
    </div>
  ),
};
